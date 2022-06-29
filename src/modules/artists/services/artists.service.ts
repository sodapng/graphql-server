import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IContext } from 'src/types';

@Injectable()
export class ArtistsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://localhost:3002/v1/artists',
    });

    this.client.interceptors.response.use((res) => {
      res.data.items = res.data.items?.map((el) => ({ ...el, id: el._id }));
      return res;
    });
  }

  async create(
    firstName: string,
    secondName: string,
    middleName: string,
    birthDate: string,
    birthPlace: string,
    country: string,
    bands: string[],
    instruments: string[],
    params: IContext['params'],
  ) {
    const res = await this.client.post(
      '/',
      {
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bands,
        instruments,
      },
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
    firstName: string,
    secondName: string,
    middleName: string,
    birthDate: string,
    birthPlace: string,
    country: string,
    bands: string[],
    instruments: string[],
    params: IContext['params'],
  ) {
    const res = await this.client.put(
      `/${id}`,
      {
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bands,
        instruments,
      },
      params,
    );

    return res.data;
  }

  async remove(id: string, params: IContext['params']) {
    const res = await this.client.delete(`/${id}`, params);
    return res.data;
  }
}
