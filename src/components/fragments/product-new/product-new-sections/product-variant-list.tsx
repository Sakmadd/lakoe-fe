import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { ProductVariantItem } from './product-variant-item';

export function ProductVariantListSection() {
  return (
    <Flex flexDir="column" gap="1rem">
      <Flex alignItems={'center'}>
        <Box>
          <Text fontSize="1xl" fontWeight="bold">
            Variant List
          </Text>
          <Text fontSize="1xl" color={'grey'}>
            Add variants so buyers can choose the right product, come on!
          </Text>
        </Box>
        <Spacer />
        <Button
          colorPalette={'gray'}
          variant="surface"
          borderRadius={'full'}
          onClick={() => console.log('ba')}
        >
          <FaRegEdit />
          Edit All Variant
        </Button>
      </Flex>
      <ProductVariantItem />
    </Flex>
  );
}
