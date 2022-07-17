import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IContext } from 'src/types';

@Injectable()
export class FavouritesService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3007/v1/favourites',
    });

    this.client.interceptors.response.use((res) => {
      if (!res.data) {
        res.data = null;
        return res;
      }

      if (res.data.items) {
        res.data.items = res.data.items.map((el) => ({ ...el, id: el._id }));
      } else {
        res.data = { ...res.data, id: res.data._id };
      }

      return res;
    });
  }

  async add(type: string, id: string, config: IContext['config']) {
    const res = await this.client.put('/add', { type, id }, config);
    return res.data;
  }

  async findAll(config: IContext['config']) {
    const res = await this.client.get('/', config);
    return res.data;
  }

  async remove(type: string, id: string, config: IContext['config']) {
    const res = await this.client.put('/remove', { type, id }, config);
    return res.data;
  }
}
