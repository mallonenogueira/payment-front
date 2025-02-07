export interface Session {
  id: string;
  name: string;
  email: string;
  accountId: string;
  role: "ADMIN" | "USER";
  companies: {
    id: string;
    name: string;
  }[];
}

export interface SaveInput {
  payload: Session;
  token: string;
}
export class SessionService {
  save(input: SaveInput) {
    localStorage.setItem("user", JSON.stringify(input.payload));
    localStorage.setItem("token", input.token);
  }

  remove() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  findToken(): string | null {
    return localStorage.getItem("token") ?? null;
  }

  findPayload(): Session | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

export const sessionService = new SessionService();
