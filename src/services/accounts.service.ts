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

  create(account: CreateAccountInput) {
    this.api.post("/api/account", account);
  }
}

export const accountService = new AccountService(api);
