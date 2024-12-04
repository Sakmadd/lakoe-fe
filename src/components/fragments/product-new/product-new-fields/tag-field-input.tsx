import { Field } from '@/components/ui/field';
import { Tag } from '@/components/ui/tag';
import { Flex } from '@chakra-ui/react';

interface Props {
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
}

export function TagFieldInput({ required, label }: Props) {
  return (
    <>
      <Field label={label} required={required} color={'gray'}>
        <Flex
          gap={'0.5rem'}
          cursor={'pointer'}
          border={'1px solid #e6e6e6'}
          width={'100%'}
          padding={'0.5rem'}
          borderRadius={'sm'}
        >
          <Tag closable size={'xl'}>
            Closable Tag
          </Tag>
          <Tag closable size={'xl'}>
            Closable Tag
          </Tag>
          <Tag closable size={'xl'}>
            Closable Tag
          </Tag>
        </Flex>
      </Field>
    </>
  );
}
