import { createBrowserRouter } from "react-router";
import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RegisterPage,
  },
  {
    path: "/entrar",
    Component: LoginPage,
  },
]);

export { router };
