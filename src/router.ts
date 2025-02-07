import { createBrowserRouter } from "react-router";
import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import { PrivateRoute } from "@/components/route/private.route";
import UsersPage from "@/pages/users";
import CompaniesPage from "@/pages/companies";
import SubscriptionPage from "@/pages/subscription";

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
      {
        path: "/usuarios",
        Component: UsersPage,
      },
      {
        path: "/empresas",
        Component: CompaniesPage,
      },
      {
        path: "/inscrever-se",
        Component: SubscriptionPage,
      },
    ],
  },
]);

export { router };
