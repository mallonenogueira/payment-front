import { sessionService } from "@/services/token.service";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const token = sessionService.findToken();

  return token ? <Outlet /> : <Navigate to="/entrar" />;
}
