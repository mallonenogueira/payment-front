import { tokenService } from "@/services/token.service";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const token = tokenService.find();

  return token ? <Outlet /> : <Navigate to="/entrar" />;
}
