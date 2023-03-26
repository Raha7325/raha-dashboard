import axios, { AxiosInstance, AxiosResponse } from 'axios';
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api/restaurants',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export const getTodos = async (): Promise<Todo[] | null> => {
    try {
      const response: AxiosResponse<Todo[]> = await api.get('/todos');
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  