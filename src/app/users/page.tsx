import { getUserColumns } from "@/app/users/columns";
import { DataTable } from "@/app/users/data-table";
import { SheetFormUser } from "@/app/users/sheet";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useUsersQuery } from "./use-users-query";
import { User } from "@/services/user.service";

export default function Page() {
  const [sheetTitle, setSheetTitle] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const queryUsers = useUsersQuery();

  function handleCreateUserClick() {
    setSheetTitle("Novo usuário");
    setUser({
      id: "",
      accountId: "",
      email: "",
      name: "",
      role: "USER",
    });
  }

  const columns = useMemo(
    () =>
      getUserColumns({
        onEdit: (user) => {
          setUser(user);
          setSheetTitle(user.name);
        },
      }),
    []
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Usuários</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-end">
            <Button onClick={handleCreateUserClick}>
              <Plus />
              Usuário
            </Button>
          </div>

          {queryUsers.data && (
            <DataTable columns={columns} data={queryUsers.data.data} />
          )}

          <SheetFormUser
            title={sheetTitle}
            isOpen={!!user}
            user={user}
            onClose={() => {
              setUser(null);
            }}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
