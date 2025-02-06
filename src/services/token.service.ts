export interface SaveInput {
  token: string;
}
export class TokenService {
  save(input: SaveInput) {
    localStorage.setItem("token", input.token);
  }

  find(): string | null {
    return localStorage.getItem("token") ?? null;
  }
}

export const tokenService = new TokenService();
