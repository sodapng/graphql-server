import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateTrackInput, UpdateTrackInput } from 'src/graphql';
import { IContext } from 'src/types';

@Injectable()
export class TracksService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL:
        'https://3006-rollingscop-nodegraphql-hegnmr5cj7d.ws-eu51.gitpod.io/v1/tracks',
    });

    this.client.interceptors.response.use((res) => {
      res.data.items = res.data.items?.map((el) => ({ ...el, id: el._id }));
      return res;
    });
  }

  async create(createTrackInput: CreateTrackInput, config: IContext['config']) {
    const res = await this.client.post('/', createTrackInput, config);
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
    updateTrackInput: UpdateTrackInput,
    config: IContext['config'],
  ) {
    const res = await this.client.put(`/${id}`, updateTrackInput, config);
    return res.data;
  }

  async remove(id: string, config: IContext['config']) {
    const res = await this.client.delete(`/${id}`, config);
    return res.data;
  }
}
