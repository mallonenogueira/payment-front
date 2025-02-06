import { Input, InputProps } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Control, FieldValues, Path } from "react-hook-form";

export function InputControl<T extends FieldValues>({
  name,
  label,
  control,
  ...elementProps
}: {
  name: Path<T>;
  label?: string;
  control: Control<T>;
} & InputProps) {
  const id = elementProps.id || name;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input id={id} {...elementProps} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
