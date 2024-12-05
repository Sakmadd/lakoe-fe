import { Flex, Text } from '@chakra-ui/react';
import { FieldInput } from '../product-new-fields/field-input';
import { ContentContainer } from '../../container/contentContainer';
import { UseFormRegister } from 'react-hook-form';
import { ProductType } from '@/types/types';

interface Props {
  register: UseFormRegister<ProductType>;
}

export function ProductManagementSection({ register }: Props) {
  return (
    <>
      <ContentContainer>
        <Flex flexDir="column" gap="1rem">
          <Text fontSize="1xl" fontWeight="bold">
            Product Management
          </Text>
          <Flex gap={'1rem'}>
            <FieldInput
              label="Product Stock"
              type="number"
              defaultValue="1"
              required
              register={register}
              registerName="stock"
            />
            <FieldInput
              label="SKU (Stok Keeping Unit)"
              placeholder="Enter SKU"
              required
              register={register}
              registerName="sku"
            />
          </Flex>
        </Flex>
      </ContentContainer>
    </>
  );
}
