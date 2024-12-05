import { Field } from '@/components/ui/field';
import { Flex, Group, Input, InputAddon, Text } from '@chakra-ui/react';
import { FieldInputAddon } from '../product-new-fields/field-input-addon';
import { ContentContainer } from '../../container/contentContainer';
import { UseFormRegister } from 'react-hook-form';
import { ProductType } from '@/types/types';

interface Props {
  register: UseFormRegister<ProductType>;
}

export function ProductPriceSection({ register }: Props) {
  return (
    <>
      <ContentContainer>
        <Flex flexDir="column" gap="1rem">
          <Text fontSize="1xl" fontWeight="bold">
            Product Price
          </Text>
          <FieldInputAddon
            label="Price"
            required
            leftAddon="Rp"
            placeholder="Enter price for one item"
            type="number"
            register={register}
            registerName="price"
          />
          <Field label={'Minimum Order'} color={'gray'}>
            <Group attached width="100%">
              <Input
                defaultValue={1}
                type="number"
                {...register('minimum_order')}
              />
              <InputAddon>Product</InputAddon>
            </Group>
          </Field>
        </Flex>
      </ContentContainer>
    </>
  );
}
