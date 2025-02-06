import { api } from "@/lib/api";
import { AxiosInstance } from "axios";

export interface CreateAccountInput {
  name: string;
  email: string;
  document: string;
  password: string;
}

export class AccountService {
  constructor(private api: AxiosInstance) {}

  async create(input: CreateAccountInput) {
    const { data } = await this.api.post("/api/account", input);
    return data;
  }
}

export const accountService = new AccountService(api);
