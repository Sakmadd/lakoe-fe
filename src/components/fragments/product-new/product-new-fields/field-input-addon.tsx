import { Field } from '@/components/ui/field';
import { Group, Input, InputAddon } from '@chakra-ui/react';

interface Props {
  type?: string;
  required?: boolean;
  label: string;
  placeholder?: string;
  leftAddon?: string;
  rightAddon?: string;
}

export function FieldInputAddon({
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
          <Input placeholder={placeholder} type={type} />
          {rightAddon && <InputAddon>{rightAddon}</InputAddon>}
        </Group>
      </Field>
    </>
  );
}
