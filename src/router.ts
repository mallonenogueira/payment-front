import { createBrowserRouter } from "react-router";
import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";
import DashboardPage from "./pages/dashboard";
import { PrivateRoute } from "./components/route/private.route";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RegisterPage,
  },
  {
    path: "/entrar",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: PrivateRoute,
    children: [
      {
        path: "/inicio",
        Component: DashboardPage,
      },
    ],
  },
]);

export { router };
