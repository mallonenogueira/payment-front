import { api } from "@/lib/api";
import { AxiosInstance } from "axios";

type ResponseWrapper<T> = {
  data: T;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "MONTH" | "YEAR";
};

export class ProductService {
  constructor(private api: AxiosInstance) {
    this.list = this.list.bind(this);
  }

  async list() {
    const { data } = await this.api.get<ResponseWrapper<Product[]>>(
      "/api/product"
    );
    return data;
  }
}

export const productService = new ProductService(api);
