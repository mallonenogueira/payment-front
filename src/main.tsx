import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/toaster.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query";
import { router } from "@/router.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
