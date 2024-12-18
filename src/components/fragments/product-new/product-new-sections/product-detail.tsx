import { ProductType } from '@/types/types';
import { Flex, Text } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { ContentContainer } from '../../container/contentContainer';
import { FieldInputDescription } from '../product-new-fields/field-input-description';
import { FieldInputImage } from '../product-new-fields/field-input-imge';

interface Props {
  register: UseFormRegister<ProductType>;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export function ProductDetailSection({ register, setImages }: Props) {
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
        <FieldInputImage label="Product Image" setImages={setImages} />
      </Flex>
    </ContentContainer>
  );
}
