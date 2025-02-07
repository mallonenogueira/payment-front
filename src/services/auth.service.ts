import { api } from "@/lib/api";
import { AxiosInstance } from "axios";
import { sessionService } from "./token.service";

export interface SinginInput {
  email: string;
  password: string;
}

export interface SinginOutput {
  payload: {
    id: string;
    name: string;
    email: string;
    accountId: string;
    companies: {
      id: string;
      name: string;
    }[];
  };
  token: string;
}

export class AuthService {
  constructor(private api: AxiosInstance) {}

  async signin(input: SinginInput) {
    const { data } = await this.api.post<SinginOutput>("/api/auth", input);

    sessionService.save(data);

    return data;
  }
}

export const authService = new AuthService(api);
