import Service, { Dispatch } from './service';

class  PostsService {
  private readonly service = new Service();

  public getList(args?: Partial<Dispatch>) {
    return this.service.dispatch ({
      ...args,
      method: 'GET',
      path: '/posts',
    })
  }
  public createPost(args?: Partial<Dispatch>) {
    return this.service.dispatch ({
      ...args,
      method: 'POST',
      path: '/posts'
    })  
  }
}

export default new PostsService();


