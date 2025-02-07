import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, ButtonLoader } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputControl } from "@/components/control/input-control";
import { InputPasswordControl } from "@/components/control/input-password-control";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/auth.service";
import * as AuthLayout from "@/components/layouts/auth.layout";

const formSchema = z.object({
  email: z.string().min(1, "E-mail obrigatório.").email("E-mail inválido."),
  password: z.string().min(1, "Senha obrigatória."),
});

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (loading) return;

    setLoading(true);

    try {
      await authService.signin(values);
      navigate("/inicio");
    } catch (error) {
      console.error(error);

      toast({
        description: "Email ou senha inválido",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout.Container>
      <AuthLayout.Title>Bem-vindo!</AuthLayout.Title>

      <AuthLayout.Text>É sempre bom ter você conosco</AuthLayout.Text>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <InputControl control={form.control} name="email" label="Email" />

          <InputPasswordControl
            control={form.control}
            name="password"
            label="Senha"
          />

          <div>
            <Button type="submit" className="w-full my-4" disabled={loading}>
              {loading && <ButtonLoader />}
              Entrar
            </Button>
          </div>

          <Separator />

          <div>
            <AuthLayout.Text>Crie uma conta agora</AuthLayout.Text>

            <Button
              asChild
              variant="outline"
              type="submit"
              className="w-full mt-4"
            >
              <Link to="/">Criar conta</Link>
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout.Container>
  );
}

export default LoginPage;
