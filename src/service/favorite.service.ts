import Service, { Dispatch } from './service';

class favoritesService {
  private readonly service = new Service();

  public getList(args?: Partial<Dispatch>) {
    return this.service.dispatch ({
      ...args,
      method: 'GET',
      path: '/favorites'
    })
  }
}

export default new favoritesService();


