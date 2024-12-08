import { Flex, Text } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import { FieldInputAddon } from '../product-new-fields/field-input-addon';
import { FieldInputDimension } from '../product-new-fields/field-input-dimension';
import { UseFormRegister } from 'react-hook-form';
import { ProductType } from '@/types/types';

interface Props {
  register: UseFormRegister<ProductType>;
}

export function ProductWeightShipmentSection({ register }: Props) {
  return (
    <>
      <ContentContainer>
        <Flex flexDir="column" gap="1rem">
          <Text fontSize="1xl" fontWeight="bold">
            Wight & Dimension
          </Text>
          <FieldInputAddon
            label="Product Weight"
            required
            type="number"
            rightAddon="Grams"
            register={register}
            registerName="weight"
          />
          <FieldInputDimension register={register} />
        </Flex>
      </ContentContainer>
    </>
  );
}
