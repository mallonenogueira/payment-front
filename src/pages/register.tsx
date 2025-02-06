import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputControl } from "@/components/control/input-control";
import { InputPasswordControl } from "@/components/control/input-password-control";
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import { accountService } from "@/services/accounts.service";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"></div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 p-6 sm:w-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl font-semibold tracking-tight">{children}</h1>;
}

function Text({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

const formSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório."),
    email: z.string().min(1, "E-mail obrigatório.").email("E-mail inválido."),
    document: z.string().min(1, "Nome obrigatório."),
    password: z.string().min(1, "Senha obrigatória."),
    confirmPassword: z.string().min(1, "Confirmar senha obrigatório."),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Senhas não são iguais.",
        path: ["confirmPassword"],
      });
    }
  });

function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      document: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    await accountService.create(values);
  }

  return (
    <Layout>
      <Title>Criar uma conta</Title>

      <Text>
        Entre com dados da empresa para criar uma conta
      </Text>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <InputControl control={form.control} name="name" label="Nome" />
          <InputControl control={form.control} name="email" label="Email" />
          <InputControl control={form.control} name="document" label="Cnpj" />
          <InputPasswordControl
            control={form.control}
            name="password"
            label="Senha"
          />
          <InputPasswordControl
            control={form.control}
            name="confirmPassword"
            label="Confirmar senha"
          />

          <div>
            <Button type="submit" className="w-full my-4">
              Cadastrar-se
            </Button>
          </div>

          <Separator />

          <div>
            <Text>
              Acesse o sistema se já possuir uma conta
            </Text>

            <Button
              asChild
              variant="outline"
              type="submit"
              className="w-full mt-4"
            >
              <Link to="/entrar">Entrar</Link>
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
}

export default RegisterPage;
