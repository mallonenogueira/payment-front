"use client";

import { Button, ButtonLoader } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { roleText } from "./model";
import { InputControl } from "@/components/control/input-control";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { InputPasswordControl } from "@/components/control/input-password-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { isAxiosError } from "axios";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "./use-users-query";
import { User } from "@/services/user.service";

const formSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1, "Nome obrigatório."),
    email: z.string().min(1, "E-mail obrigatório.").email("E-mail inválido."),
    role: z.enum(["ADMIN", "USER"]),
    password: z.string(),
    confirmPassword: z.string(),
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

type UserSchema = z.infer<typeof formSchema>;

export function SheetFormUser({
  title,
  user,
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  title: string;
  user: User | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const updateUser = useUpdateUserMutation();
  const createUser = useCreateUserMutation();
  const form = useForm<UserSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      role: "USER",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    form.reset({
      id: user?.id ?? "",
      name: user?.name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "USER",
      password: "",
      confirmPassword: "",
    });
  }, [user, form]);

  async function onSubmit(values: UserSchema) {
    try {
      if (values.id) {
        await updateUser.mutateAsync(values);
        toast({ description: "Usuário alterado" });
      } else {
        await createUser.mutateAsync(values);
        toast({ description: "Usuário cadastrado" });
      }
      onClose();
    } catch (error) {
      /**
       * Criar handler padrão
       */
      console.error(error);

      if (isAxiosError(error) && error.response?.data.message) {
        toast({
          description: error.response?.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: "Erro ao realizar operação.",
          variant: "destructive",
        });
      }
    }
  }
  const loading = updateUser.isLoading || createUser.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={console.log}>
      <SheetContent onClose={onClose} onInteractOutside={onClose}>
        <SheetHeader>
          <SheetTitle>Cadastro de usuário</SheetTitle>
          <SheetDescription>{title}</SheetDescription>
        </SheetHeader>

        <div className="my-4">
          <Form {...form}>
            <form
              id="userform"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              <InputControl
                control={form.control}
                label="Nome *"
                name="name"
                required
              />
              <InputControl
                control={form.control}
                label="Email *"
                name="email"
                required
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissão</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">
                          {roleText["ADMIN"]}
                        </SelectItem>

                        <SelectItem value="USER">{roleText["USER"]}</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </form>
          </Form>
        </div>

        <SheetFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Voltar
          </Button>

          <Button type="submit" form="userform" disabled={loading}>
            {loading && <ButtonLoader />}
            Salvar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
