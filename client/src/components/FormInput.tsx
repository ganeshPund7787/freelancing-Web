import React from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  defaultValue?: any;
  min?: number | undefined;
  max?: number | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  defaultValue = "",
  max = undefined,
  min = undefined,
}) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormMessage className="text-red-600" />
          <FormControl>
            <Input
              placeholder={placeholder}
              className="rounded-[5px] focus:outline-cyan-600 text-slate-300"
              autoFocus
              defaultValue={defaultValue}
              type={type}
              {...field}
              max={max}
              min={min}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
