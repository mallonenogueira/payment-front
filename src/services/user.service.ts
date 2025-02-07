import { api } from "@/lib/api";
import { AxiosInstance } from "axios";

type ResponseWrapper<T> = {
  data: T;
};

export type User = {
  id: string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
  accountId: string;
  password?: string;
};

export interface CreateUserInput {
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  password: string;
}

export interface UpdateUserInput {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  password?: string;
}

export class UserService {
  constructor(private api: AxiosInstance) {
    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
  }

  async list() {
    const { data } = await this.api.get<ResponseWrapper<User[]>>("/api/user");
    return data;
  }

  async create(input: CreateUserInput) {
    await this.api.post("/api/user", input);
  }

  async update(input: UpdateUserInput) {
    await this.api.put(`/api/user/${input.id}`, input);
  }
}

export const userService = new UserService(api);
