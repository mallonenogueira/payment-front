import { api } from "@/lib/api";
import { AxiosInstance } from "axios";
import { tokenService } from "./token.service";

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
    const { data } = await this.api.post("/api/auth", input);
    
    tokenService.save(data.token);

    return data;
  }
}

export const authService = new AuthService(api);
