import { Flex, Text } from '@chakra-ui/react';
import { FieldInput } from '../product-new-fields/field-input';

export function ProductWeightShipmentSection() {
  return (
    <>
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
          />
          <FieldInput label="SKU (Stok Keeping Unit)" placeholder="Enter SKU" />
        </Flex>
      </Flex>
    </>
  );
}
