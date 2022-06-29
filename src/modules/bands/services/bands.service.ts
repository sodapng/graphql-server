import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IContext } from 'src/types';

@Injectable()
export class BandsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3003/v1/bands',
    });

    this.client.interceptors.response.use((res) => {
      res.data.items = res.data.items?.map((el) => ({ ...el, id: el._id }));
      return res;
    });
  }

  async create(
    name: string,
    origin: string,
    members: any[],
    website: string,
    genresIds: string[],
    params: IContext['params'],
  ) {
    const res = await this.client.post(
      '/',
      { name, origin, members, website, genresIds },
      params,
    );

    return res.data;
  }

  async findAll(limit: number, offset: number) {
    const res = await this.client.get('/', {
      params: {
        limit,
        offset,
      },
    });
    return res.data.items;
  }

  async findOne(id: string) {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async update(
    id: string,
    name: string,
    origin: string,
    members: any[],
    website: string,
    genresIds: string[],
    params: IContext['params'],
  ) {
    const res = await this.client.put(
      `/${id}`,
      { name, origin, members, website, genresIds },
      params,
    );
    return res.data;
  }

  async remove(id: string, params: IContext['params']) {
    const res = await this.client.delete(`/${id}`, params);
    return res.data;
  }
}
