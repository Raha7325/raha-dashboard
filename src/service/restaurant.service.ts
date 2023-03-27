import Service, { Dispatch } from './service';

class RestaurantsService {
  private readonly service = new Service();

  public getList(args?: Partial<Dispatch>) {
    return this.service.dispatch ({
      ...args,
      method: 'GET',
      path: '/restaurants'
    })
  }
  public sendData(args?: Partial<Dispatch>) {
    return this.service.dispatch ({
      ...args,
      method: 'POST',
      path: '/restaurants'
    })
  }
}

export default new RestaurantsService();


