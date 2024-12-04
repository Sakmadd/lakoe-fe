import { Flex, Text } from '@chakra-ui/react';
import { FieldInputDescription } from '../product-new-fields/field-input-description';
import { FieldInputImage } from '../product-new-fields/field-input-imge';
import { ContentContainer } from '../../container/contentContainer';

export function ProductDetailSection() {
  return (
    <ContentContainer>
      <Flex flexDir="column" gap="1rem">
        <Text fontSize="1xl" fontWeight="bold">
          Product Detail
        </Text>
        <FieldInputDescription />
        <FieldInputImage label="Product Image" />
      </Flex>
    </ContentContainer>
  );
}
