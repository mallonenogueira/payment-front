import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputControl } from "@/components/control/input-control";
import { InputPasswordControl } from "@/components/control/input-password-control";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

const formSchema = z.object({
  email: z.string().min(1, "E-mail obrigatório.").email("E-mail inválido."),
  password: z.string().min(1, "Senha obrigatória."),
});

function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  
  return (
    <div className="relative h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"></div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 p-6 sm:w-[500px]">
          <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo!</h1>

          <p className="text-sm text-muted-foreground">
            É sempre bom ter você conosco
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <InputControl control={form.control} name="email" label="Email" />

              <InputPasswordControl
                control={form.control}
                name="password"
                label="Senha"
              />

              <div>
                <Button type="submit" className="w-full my-4">
                  Entrar
                </Button>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mt-4">
                  Crie uma conta agora
                </p>

                <Button
                  asChild
                  variant="outline"
                  type="submit"
                  className="w-full mt-4"
                >
                  <Link to="/">Cadastrar-se</Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
