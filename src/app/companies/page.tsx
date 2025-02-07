import { getCompanyColumns } from "@/app/companies/columns";
import { DataTable } from "@/app/companies/data-table";
import { SheetFormCompany } from "@/app/companies/sheet";
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
import { useCompaniesQuery } from "./use-companies-query";
import { Company } from "@/services/company.service";

export default function Page() {
  const [sheetTitle, setSheetTitle] = useState<string>("");
  const [company, setCompany] = useState<Company | null>(null);
  const queryCompanies = useCompaniesQuery();

  function handleCreateCompanyClick() {
    setSheetTitle("Nova Empresa");
    setCompany({
      id: "",
      name: "",
      active: true,
      accountId: "",
    });
  }

  const columns = useMemo(
    () =>
      getCompanyColumns({
        onEdit: (company) => {
          setCompany(company);
          setSheetTitle(company.name);
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
                  <BreadcrumbPage>Empresas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-end">
            <Button onClick={handleCreateCompanyClick}>
              <Plus />
              Empresa
            </Button>
          </div>

          {queryCompanies.data && (
            <DataTable columns={columns} data={queryCompanies.data.data} />
          )}

          <SheetFormCompany
            title={sheetTitle}
            isOpen={!!company}
            company={company}
            onClose={() => {
              setCompany(null);
            }}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
