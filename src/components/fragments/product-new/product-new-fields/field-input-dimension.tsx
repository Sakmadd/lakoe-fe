import { Field } from '@/components/ui/field';
import { Flex, Group, Input, InputAddon } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { ProductType } from '@/types/types';

interface Props {
  register: UseFormRegister<ProductType>;
}

export function FieldInputDimension({ register }: Props) {
  return (
    <>
      <Flex gap={'1rem'}>
        <Field label={'Product Dimension'} required color={'gray'}>
          <Flex width={'100%'} gap={'.5rem'}>
            <Group attached width="100%">
              <Input
                {...register('length')}
                placeholder={'Length'}
                type={'number'}
              />
              <InputAddon>cm</InputAddon>
            </Group>
            <Group attached width="100%">
              <Input
                {...register('width')}
                placeholder={'Width'}
                type={'number'}
              />
              <InputAddon>cm</InputAddon>
            </Group>
            <Group attached width="100%">
              <Input
                {...register('height')}
                placeholder={'Height'}
                type={'number'}
              />
              <InputAddon>cm</InputAddon>
            </Group>
          </Flex>
        </Field>
      </Flex>
    </>
  );
}
