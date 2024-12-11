import { Field } from '@/components/ui/field';
import { Group, Input, InputAddon } from '@chakra-ui/react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  type?: string;
  required?: boolean;
  label: string;
  placeholder?: string;
  leftAddon?: string;
  rightAddon?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
}

export function FieldInputAddon<T extends FieldValues>({
  register,
  registerName,
  type,
  required,
  leftAddon,
  placeholder,
  rightAddon,
  label,
}: Props<T>) {
  return (
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
  );
}
