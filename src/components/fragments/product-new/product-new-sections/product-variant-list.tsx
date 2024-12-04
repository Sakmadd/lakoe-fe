import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { ProductVariantItem } from './product-variant-item';
import { useEffect } from 'react';

interface Props {
  variantOptions: { name: string; options: string }[];
}
export function ProductVariantListSection({ variantOptions }: Props) {
  useEffect(() => {
    console.log(variantOptions);
  });

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
          colorScheme="gray"
          variant="outline"
          borderRadius="full"
          onClick={() => console.log('Edit All Variant')}
        >
          <FaRegEdit />
          Edit All Variant
        </Button>
      </Flex>
      {variantOptions.map((variantOption) => (
        <ProductVariantItem variantOption={variantOption} />
      ))}
    </Flex>
  );
}
