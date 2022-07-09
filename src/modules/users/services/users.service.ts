import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UsersService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL:
        'https://3004-rollingscop-nodegraphql-h8zzqdszd90.ws-eu53.gitpod.io/v1/users',
    });
  }

  async login(email: string, password: string) {
    const res = await this.client.post('/login', { email, password });
    return res.data;
  }

  async getById(id: string) {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const res = await this.client.post('/register', {
      firstName,
      lastName,
      email,
      password,
    });

    return res.data;
  }
}
