"use client";

import { roleText } from "@/app/users/model";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/services/user.service";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";

export const getUserColumns = (actions: {
  onEdit: (user: User) => void;
}): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Permissão",
    maxSize: 10,
    cell: ({ getValue }) => {
      const value = getValue() as User["role"];
      const text = roleText[value];

      return (
        <Badge variant={value === "ADMIN" ? "default" : "outline"}>
          {text}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Ações</div>,
    maxSize: 10,
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
