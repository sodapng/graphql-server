import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class BandsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3003/v1/bands',
    });
  }

  async create(
    name: string,
    origin: string,
    members: any[],
    website: string,
    genresIds: string[],
  ) {
    const res = await this.client.post(
      '/',
      { name, origin, members, website, genresIds },
      {
        headers: {
          Authorization: process.env.token || '',
        },
      },
    );

    return res.data;
  }

  async findAll() {
    const res = await this.client.get('/');
    return res.data;
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
  ) {
    const res = await this.client.put(
      `/${id}`,
      { name, origin, members, website, genresIds },
      {
        headers: {
          Authorization: process.env.token || '',
        },
      },
    );
    return res.data;
  }

  async remove(id: string) {
    const res = await this.client.delete(`/${id}`, {
      headers: {
        Authorization: process.env.token || '',
      },
    });
    return res.data;
  }
}
