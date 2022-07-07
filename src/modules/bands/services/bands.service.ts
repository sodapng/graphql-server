import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateBandInput, UpdateBandInput } from 'src/graphql';
import { IContext } from 'src/types';

@Injectable()
export class BandsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL:
        'https://rolling-scopes-school-node-graphql-service-4jgwg5jx92j7v9-3003.githubpreview.dev/v1/bands',
    });

    this.client.interceptors.response.use((res) => {
      res.data.items = res.data.items?.map((el) => ({ ...el, id: el._id }));
      return res;
    });
  }

  async create(createBandInput: CreateBandInput, config: IContext['config']) {
    const res = await this.client.post('/', createBandInput, config);
    return res.data;
  }

  async findAll(limit: number, offset: number) {
    const res = await this.client.get('/', {
      params: { limit, offset },
    });

    return res.data.items;
  }

  async findOne(id: string) {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async update(
    id: string,
    updateBandInput: UpdateBandInput,
    config: IContext['config'],
  ) {
    const res = await this.client.put(`/${id}`, updateBandInput, config);
    return res.data;
  }

  async remove(id: string, config: IContext['config']) {
    const res = await this.client.delete(`/${id}`, config);
    return res.data;
  }
}
