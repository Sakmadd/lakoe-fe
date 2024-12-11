import { Field } from '@/components/ui/field';
import { Input } from '@chakra-ui/react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
}

export function FieldInput<T extends FieldValues>({
  required,
  placeholder,
  label,
  type,
  defaultValue,
  register,
  registerName,
}: Props<T>) {
  return (
    <>
      <Field label={label} required={required} color={'gray'}>
        <Input
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
          {...register(registerName)}
        />
      </Field>
    </>
  );
}
