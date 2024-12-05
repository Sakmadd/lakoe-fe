import { Field } from '@/components/ui/field';
import { ProductType } from '@/types/types';
import { Input } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<ProductType>;
  registerName: keyof ProductType;
}

export function FieldInput({
  required,
  placeholder,
  label,
  type,
  defaultValue,
  register,
  registerName,
}: Props) {
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
