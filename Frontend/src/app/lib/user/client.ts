import axios from 'axios';
import { DOGGO_API_BASE_URL } from '../../configuration/variables';

class UserClient {
  private readonly instance;

  constructor() {
    this.instance = axios.create({
      baseURL: DOGGO_API_BASE_URL,
    });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    success: string;
    token: string;
    email: string;
    id: number;
  }> {
    return (await this.instance.post('/login', { email, password })).data;
  }

  async register(
    email: string,
    password: string,
    names: string,
    surnames: string,
    termsAccepted: boolean,
  ): Promise<boolean> {
    return await this.instance.post('/register', {
      email,
      password,
      names,
      surnames,
      terms_accepted: termsAccepted,
    });
  }
}

export const userClient = new UserClient();
