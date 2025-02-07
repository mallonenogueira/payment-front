import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, ButtonLoader } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputControl } from "@/components/control/input-control";
import { InputPasswordControl } from "@/components/control/input-password-control";
import { Link, useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { accountService } from "@/services/accounts.service";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as AuthLayout from "@/components/layouts/auth.layout";

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

      ctx.addIssue({
        code: "custom",
        message: "",
        path: ["password"],
      });
    }
  });

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    if (loading) return;

    setLoading(true);

    try {
      await accountService.create(values);
      toast({
        title: "Parabéns! Conta criada com sucesso",
        description: "Acesse sua conta",
      });
      navigate("/entrar");
    } catch (error) {
      console.error(error);

      toast({
        title: "Infelizmente não foi desta vez :(",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout.Container>
      <AuthLayout.Title>Criar uma conta</AuthLayout.Title>

      <AuthLayout.Text>
        Entre com dados da empresa para criar uma conta
      </AuthLayout.Text>

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
            <Button type="submit" className="w-full my-4" disabled={loading}>
              {loading && <ButtonLoader />}
              Criar conta
            </Button>
          </div>

          <Separator />

          <div>
            <AuthLayout.Text>
              Acesse o sistema se já possuir uma conta
            </AuthLayout.Text>

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
    </AuthLayout.Container>
  );
}

export default RegisterPage;
