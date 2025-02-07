import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useProductsQuery } from "./use-products-query";

export default function Page() {
  const productsQuery = useProductsQuery();

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
                  <BreadcrumbPage>Assinar agora</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h1 className="text-2xl font-semibold tracking-tight flex justify-center">
            Conheça nossos planos!
          </h1>

          <div className="flex flex-1 gap-4 justify-center h-[400px] flex-wrap">
            {productsQuery.data?.data &&
              productsQuery.data.data.map((product) => (
                <Card className={"w-[350px]"}>
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>

                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>

                  <CardContent></CardContent>

                  <CardFooter>
                    <Button
                      variant={product.type === "MONTH" ? "outline" : "default"}
                      className="w-full"
                    >
                      Escolher esse
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            {/* <Card className={"w-[500px]"}>
              <CardHeader>
                <CardTitle>Plano Mensal</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>

                <CardDescription></CardDescription>
              </CardHeader>

              <CardContent></CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full">
                  Escolher esse
                </Button>
              </CardFooter>
            </Card>

            <Card className={"w-[500px]"}>
              <CardHeader>
                <CardTitle>Plano Anual</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent></CardContent>

              <CardFooter>
                <Button className="w-full">Escolher esse</Button>
              </CardFooter>
            </Card> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
