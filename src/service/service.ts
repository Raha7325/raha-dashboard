const HTTP_BASE_URL = import.meta.env.VITE_API_URL;

export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	OPTIONS = 'OPTIONS',
	HEAD = 'HEAD'
}
export type Params = (string | number)[]

export type Query = {
	[key: string]: string | number | boolean | (string | number | boolean)[]
}
export interface Payload {
	[key: string]: any
}
export interface Dispatch {
	path: string,
	method: keyof typeof Methods,
	params?: Params,
	query?: Query,
	payload?: Payload,
	headers?: Headers,
	silent?: boolean
}

export interface HTTPSend {
	headers?: {
		[key: string]: string;
	};
	body: Payload;
	error? : Error | string | boolean;
	status?: number;
	ok: boolean;
}

export interface HTTPReturn {
	status: number,
	body: Payload,
	ok: boolean,
}

export default class HTTPService {
    public dispatch(args: Dispatch): Promise<HTTPSend> {
        const url = this.createUrl(args.path, args.params, args.query);
        const isJson = typeof args.payload === 'object' && args.payload !== null;

        const headers = this.createHeaders(args);
        const options: RequestInit = {
            headers,
            body: isJson
                ? JSON.stringify(args.payload)
                : args.payload
                    ? String(args.payload)
                    : null,
            method: args.method,
            credentials: 'include',
            mode: 'cors',
        };
        return this.resolve(url, options, args)
    }
    private async resolve(url: string, options: RequestInit, args: Dispatch) {
		try {
			const response = await fetch(url, options);
			const { status, ok } = response;
			const headers = this.headerParser(response);
			const responseBody = await this.bodyParser(response, headers);
			const hasError = status >= 400;
			if (hasError) {
				return this.errorHandler(status, responseBody.message, responseBody, args);
			}
			const body:any = responseBody.data || responseBody.result;
			return {
				headers,
				body,
				status,
				ok,
				error: false,
			};
		} catch (err: any) {
			return this.errorHandler(0, err, null, args);
		}
	}
    private createHeaders(args: Dispatch): Headers {
		const headers: Headers = new Headers(args.headers);

		const isJson = typeof args.payload === 'object' && args.payload !== null;
		if (isJson) {
			headers.append('Content-Type', 'application/json');
		}

		return headers;
	}
    private createUrl(endpoint: string, params?: Params, query?: Query): string {
		let url: string = HTTP_BASE_URL + endpoint;

		if (params && params.length) {
			url += this.createParams(params);
		}

		if (query) {
			url += this.createQuery(query);
		}

		return url;
	}
    private createParams(params: Params): string {
		return `/${  params.join('/')}`;
	}
    private createQuery(query: Query): string {
		const queryKeys = Object.keys(query);

		const queryString = queryKeys
			.map(key => {
				const value = query[key];
				if (Array.isArray(value)) {
					return value.map(entry => `${key}[]=${entry}`).join('&');
				}
				return `${key}=${query[key]}`;

			})
			.join('&');

		return `?${  queryString}`;
	}
    private headerParser(response: Response) {
		const headers: { [key: string]: string } = {};
		response.headers.forEach(function (value, key) {
			headers[key] = value;
		});

		return headers;
	}
    private async bodyParser(
		response: Response,
		headers: {
			'content-type'?: string,
		},
	) {
		const type = headers['content-type'];
		if (type) {
			if (type.includes('application/json')) {
				return response.json();
			} else if (type.includes('text/')) {
				return response.text();
			} else if (type.includes('multipart/form-data')) {
				return response.formData();
			} else if (type.includes('application/octet-stream')) {
				return response.blob();
			}
		}
	}
    private errorHandler(status: number, err: string | string[], body?: null |  any, args?: Dispatch) {
		// if (status === 401) {
		// }
		// if (args && !args.silent) {
		// 	if (status === 0) {
		// 		this.popError('UNKNOWN_ERROR');
		// 	} else if (status >= 500) {
		// 		this.popError('SERVER_ERROR');
		// 	}
		// 	if (err instanceof TypeError) {
		// 		this.popError('NETWORK_ERROR');
		// 	} else if (Array.isArray(err)) {
		// 		err.forEach(this.popError);
		// 	} else {
		// 		this.popError(String(err));
		// 	}
		// }
		return {
			ok: false,
			body: body || {},
		};
	}
}