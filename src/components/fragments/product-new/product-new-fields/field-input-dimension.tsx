import { Field } from '@/components/ui/field';
import { Flex, Group, Input, InputAddon } from '@chakra-ui/react';

export function FieldInputDimension() {
  return (
    <>
      <Flex gap={'1rem'}>
        <Field label={'Product Dimension'} required color={'gray'}>
          <Flex width={'100%'} gap={'.5rem'}>
            <Group attached width="100%">
              <Input placeholder={'Length'} type={'number'} />
              <InputAddon>cm</InputAddon>
            </Group>
            <Group attached width="100%">
              <Input placeholder={'Width'} type={'number'} />
              <InputAddon>cm</InputAddon>
            </Group>
            <Group attached width="100%">
              <Input placeholder={'Height'} type={'number'} />
              <InputAddon>cm</InputAddon>
            </Group>
          </Flex>
        </Field>
      </Flex>
    </>
  );
}
