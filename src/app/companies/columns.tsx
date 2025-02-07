"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Company } from "@/services/company.service";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";

export const getCompanyColumns = (actions: {
  onEdit: (user: Company) => void;
}): ColumnDef<Company>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "active",
    header: "Status",
    maxSize: 10,
    cell: ({ getValue }) => {
      const value = getValue() as Company["active"];

      return (
        <Badge variant={value ? "default" : "outline"}>
          {value ? "Ativa" : "Inativa"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    maxSize: 10,
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="text-right">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.onEdit(user)}
          >
            <Pen />
          </Button>
        </div>
      );
    },
  },
];
