import { Field } from '@/components/ui/field';
import { ProductType } from '@/types/types';
import { Group, Input, InputAddon } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  type?: string;
  required?: boolean;
  label: string;
  placeholder?: string;
  leftAddon?: string;
  rightAddon?: string;
  register: UseFormRegister<ProductType>;
  registerName: keyof ProductType;
}

export function FieldInputAddon({
  register,
  registerName,
  type,
  required,
  leftAddon,
  placeholder,
  rightAddon,
  label,
}: Props) {
  return (
    <>
      <Field label={label} required={required} color={'gray'}>
        <Group attached width="100%">
          {leftAddon && <InputAddon>{leftAddon}</InputAddon>}
          <Input
            placeholder={placeholder}
            type={type}
            {...register(registerName)}
          />
          {rightAddon && <InputAddon>{rightAddon}</InputAddon>}
        </Group>
      </Field>
    </>
  );
}
