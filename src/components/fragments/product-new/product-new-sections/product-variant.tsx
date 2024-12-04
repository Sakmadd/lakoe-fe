import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { ContentContainer } from '../../container/contentContainer';

export function ProductVariantSection() {
  return (
    <ContentContainer>
      <Flex flexDir="column" gap="1rem">
        <Flex alignItems={'center'}>
          <Box>
            <Text fontSize="1xl" fontWeight="bold">
              Product Variant
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
            <FaPlusCircle />
            Add Variant
          </Button>
        </Flex>
      </Flex>
    </ContentContainer>
  );
}
