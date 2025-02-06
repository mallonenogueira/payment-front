import {
  InputPassword,
  InputPasswordProps,
} from "@/components/ui/input-password";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Control, FieldValues, Path } from "react-hook-form";

export function InputPasswordControl<T extends FieldValues>({
  name,
  label,
  control,
  ...elementProps
}: {
  name: Path<T>;
  label?: string;
  control: Control<T>;
} & InputPasswordProps) {
  const id = elementProps.id || name;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <InputPassword id={id} {...elementProps} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
