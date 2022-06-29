import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class ArtistsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3002/v1/artists',
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
      {
        headers: {
          Authorization: process.env.token || '',
        },
      },
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
