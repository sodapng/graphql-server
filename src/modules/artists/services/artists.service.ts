import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateArtistInput, UpdateArtistInput } from 'src/graphql';
import { IContext } from 'src/types';

@Injectable()
export class ArtistsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3002/v1/artists',
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

  async create(
    createArtistInput: CreateArtistInput,
    config: IContext['config'],
  ) {
    const res = await this.client.post('/', createArtistInput, config);
    return res.data;
  }

  async findAll(limit: number, offset: number) {
    const res = await this.client.get('/', {
      params: { limit, offset },
    });

    return res.data.items;
  }

  async findOne(id: string) {
    if (!id) return null;
    try {
      const res = await this.client.get(`/${id}`);
      return res.data;
    } catch (err) {
      return null;
    }
  }

  async update(
    id: string,
    updateArtistInput: UpdateArtistInput,
    config: IContext['config'],
  ) {
    const res = await this.client.put(`/${id}`, updateArtistInput, config);
    return res.data;
  }

  async remove(id: string, config: IContext['config']) {
    const res = await this.client.delete(`/${id}`, config);
    return res.data;
  }
}
