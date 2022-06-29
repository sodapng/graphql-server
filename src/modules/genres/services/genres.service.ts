import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class GenresService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3001/v1/genres',
    });
  }

  async create(
    name: string,
    description: string,
    country: string,
    year: number,
  ) {
    const res = await this.client.post(
      '/',
      {
        name,
        description,
        country,
        year,
      },
      {
        headers: {
          Authorization: process.env.token,
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
    description: string,
    country: string,
    year: number,
  ) {
    const res = await this.client.put(
      `/${id}`,
      {
        name,
        description,
        country,
        year,
      },
      {
        headers: {
          Authorization: process.env.token,
        },
      },
    );

    return res.data;
  }

  async remove(id: string) {
    const res = await this.client.delete(`/${id}`, {
      headers: {
        Authorization: process.env.token,
      },
    });

    return res.data;
  }
}
