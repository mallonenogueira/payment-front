"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function SheetFormUser({
  title,
  userId,
  onClose,
}: {
  title: string;
  userId: string;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!userId}>
      <SheetContent>
        <SheetClose onClick={onClose}></SheetClose>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>

          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
