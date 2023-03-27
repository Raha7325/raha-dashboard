import Service, { Dispatch } from './service';

class CategoriesService {
  private readonly service = new Service();

  public getList(args?: Partial<Dispatch>) {
    return this.service.dispatch ({
      ...args,
      method: 'GET',
      path: '/categories'
    })
  }
}

export default new CategoriesService();


