import { api } from "@/lib/api";
import { AxiosInstance } from "axios";

type ResponseWrapper<T> = {
  data: T;
};

export type Company = {
  id: string;
  name: string;
  accountId: string;
  active: boolean;
};

export interface CreateCompanyInput {
  name: string;
}

export interface UpdateCompanyInput {
  id: string;
  name: string;
}

export class CompanyService {
  constructor(private api: AxiosInstance) {
    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
  }

  async list() {
    const { data } = await this.api.get<ResponseWrapper<Company[]>>(
      "/api/company"
    );
    return data;
  }

  async create(input: CreateCompanyInput) {
    await this.api.post("/api/company", input);
  }

  async update(input: UpdateCompanyInput) {
    await this.api.put(`/api/company/${input.id}`, input);
  }
}

export const companyService = new CompanyService(api);
