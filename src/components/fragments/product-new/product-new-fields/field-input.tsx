import { Field } from '@/components/ui/field';
import { Input } from '@chakra-ui/react';

interface Props {
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
}

export function FieldInput({
  required,
  placeholder,
  label,
  type,
  defaultValue,
}: Props) {
  return (
    <>
      <Field label={label} required={required} color={'gray'}>
        <Input
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
        />
      </Field>
    </>
  );
}
