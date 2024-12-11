import { Flex, Text } from '@chakra-ui/react';
import { FieldInputDescription } from '../product-new-fields/field-input-description';
import { FieldInputImage } from '../product-new-fields/field-input-imge';
import { ContentContainer } from '../../container/contentContainer';
import { UseFormRegister } from 'react-hook-form';
import { ProductType } from '@/types/types';

interface Props {
  register: UseFormRegister<ProductType>;
}

export function ProductDetailSection({ register }: Props) {
  return (
    <ContentContainer>
      <Flex flexDir="column" gap={'1rem'}>
        <Text fontSize="1xl" fontWeight="bold">
          Product Detail
        </Text>
        <FieldInputDescription
          registerName="description"
          label="Description"
          placeholder="Enter description"
          maxLength={3000}
          required
          register={register}
        />
        <FieldInputImage label="Product Image" />
      </Flex>
    </ContentContainer>
  );
}
