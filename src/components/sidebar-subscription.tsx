import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export function SidebarSubscription() {
  return (
    <Card className="shadow-none overflow-hidden max-h-[150px]">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Assine agora!</CardTitle>

          <CardDescription>
            Escolha um plano para utilizar todos os nossos recursos.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-2.5 p-4">
          <Button
            asChild
            className="animate-[bounce_0.5s_linear_infinite]"
            size="sm"
          >
            <Link to="/assinar">Escolher plano</Link>
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
