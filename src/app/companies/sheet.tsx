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
import { InputControl } from "@/components/control/input-control";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isAxiosError } from "axios";
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "./use-companies-query";
import { Company } from "@/services/company.service";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome obrigatório."),
});

type CompanySchema = z.infer<typeof formSchema>;

export function SheetFormCompany({
  title,
  company,
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  title: string;
  company: Company | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const updateCompany = useUpdateCompanyMutation();
  const createCompany = useCreateCompanyMutation();
  const form = useForm<CompanySchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  useEffect(() => {
    form.reset({
      id: company?.id ?? "",
      name: company?.name ?? "",
    });
  }, [company, form]);

  async function onSubmit(values: CompanySchema) {
    try {
      if (values.id) {
        await updateCompany.mutateAsync(values);
        toast({ description: "Empresa alterada" });
      } else {
        await createCompany.mutateAsync(values);
        toast({ description: "Empresa cadastrada" });
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
  const loading = updateCompany.isLoading || createCompany.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={console.log}>
      <SheetContent onClose={onClose} onInteractOutside={onClose}>
        <SheetHeader>
          <SheetTitle>Cadastro de empresa</SheetTitle>
          <SheetDescription>{title}</SheetDescription>
        </SheetHeader>

        <div className="my-4">
          <Form {...form}>
            <form
              id="companyform"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              <InputControl
                control={form.control}
                label="Nome *"
                name="name"
                required
              />
            </form>
          </Form>
        </div>

        <SheetFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Voltar
          </Button>

          <Button type="submit" form="companyform" disabled={loading}>
            {loading && <ButtonLoader />}
            Salvar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
