import Service, { Dispatch } from './service';

class RestaurantsService {
  private readonly service = new Service();

  public getList(args?: Partial<Dispatch>) {
    return this.service.dispatch ({
      ...args,
      method: 'GET',
      path: '/restaurants',
    })
  }
  public sendData(args?: Partial<Dispatch>) {
    const payload = {
      data: args?.payload
    }
    return this.service.dispatch ({
      ...args,
      method: 'POST',
      path: '/restaurants',
      payload
    })
  }
}

export default new RestaurantsService();


