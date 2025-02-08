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
import { subscriptionService } from "@/services/subscription.service";
import { Product } from "@/services/product.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const toast = useToast();
  const productsQuery = useProductsQuery();

  async function submitSubscription(product: Product) {
    try {
      const subscription = await subscriptionService.create({
        productId: product.id,
      });

      const link = await subscriptionService.createLink({
        id: subscription.id,
      });

      window.location.href = link.url;
    } catch (error) {
      console.error(error);
    }
  }

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

                  <CardContent>R$ {product.price},00</CardContent>

                  <CardFooter>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={
                            product.type === "MONTH" ? "outline" : "default"
                          }
                          className="w-full"
                        >
                          Assinar agora
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar pedido?</AlertDialogTitle>
                          <AlertDialogDescription>
                            <h2>{product.title}</h2>

                            <b>R$ {product.price},00</b>

                            <p>
                              Você será direcionado para o nosso meio de
                              pagamento
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Voltar</AlertDialogCancel>
                          <Button onClick={() => submitSubscription(product)}>
                            Ir para pagamento
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
