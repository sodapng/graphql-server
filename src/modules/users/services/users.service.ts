import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UsersService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3004/v1/users',
    });
  }

  async login(email: string, password: string) {
    const res = await this.client.post('/login', { email, password });
    return res.data;
  }

  async getById(id: string) {
    const res = await this.client.get(id);
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
