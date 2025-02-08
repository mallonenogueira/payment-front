import { api } from "@/lib/api";
import { AxiosInstance } from "axios";

export type Subscription = {
  id: string;
  productId: string;
};

export type InputCreateSubscription = {
  productId: string;
};

export type InputCreateLinkSubscription = {
  id: string;
};

export type OutputCreateLinkSubscription = {
  readonly url: string;
  readonly id: string;
};

export class SubscriptionService {
  constructor(private api: AxiosInstance) {
    this.create = this.create.bind(this);
  }

  async create(input: InputCreateSubscription) {
    const { data } = await this.api.post<Subscription>(
      "/api/subscription",
      input
    );

    return data;
  }

  async createLink(input: InputCreateLinkSubscription) {
    const { data } = await this.api.post<OutputCreateLinkSubscription>(
      `/api/subscription/${input.id}/link`,
      input
    );

    return data;
  }
}

export const subscriptionService = new SubscriptionService(api);
