export type User = {
  id: string;
  name: number;
  role: "ADMIN" | "USER";
  email: string;
};

export const roleText = {
  ADMIN: "Administrador",
  USER: "Usuário",
};
