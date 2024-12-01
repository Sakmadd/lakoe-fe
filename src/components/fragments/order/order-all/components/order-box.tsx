import { Box, Image, Text } from '@chakra-ui/react';
import { Tag } from '@/components/ui/tag';
import { Button } from '@/components/ui/button';

export default function OrderBox() {
  return (
    <Box border="0.1rem solid #e6e6e6" borderRadius="0.5rem">
      <Box display="flex" justifyContent="space-between" padding="0.8rem">
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <Tag
            variant="solid"
            colorPalette="yellow"
            size="sm"
            width="fit-content"
            fontWeight="semibold"
          >
            Unpaid
          </Tag>
          <Text color="grey" fontSize="0.8rem" fontFamily="sans-serif">
            INV/20230809/MPL/00000239
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            backgroundColor="transparent"
            border="1px solid #e6e6e6"
            color="black"
            borderRadius="2rem"
            fontSize="0.8rem"
            height="2rem"
          >
            Contact Customers
          </Button>
        </Box>
      </Box>
      <Box
        borderTop="0.1rem solid #e6e6e6"
        display="flex"
        justifyContent="space-between"
      >
        <Box padding="0.5rem" display="flex" gap="0.5rem">
          <Image
            width="4rem"
            borderRadius="1rem"
            objectFit="cover"
            height="4rem"
            border="0.1rem solid #e6e6e6"
            src="https://down-id.img.susercontent.com/file/sg-11134201-22110-xhtlq7aviojvf9"
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="0.3rem"
          >
            <Text
              fontWeight="semibold"
              fontSize="0.8rem"
              fontFamily="sans-serif"
            >
              NAMA BAJU BOY - S
            </Text>
            <Text
              fontWeight="light"
              fontSize="0.7rem"
              color="gray"
              fontFamily="sans-serif"
            >
              1 Item
            </Text>
          </Box>
        </Box>
        <Box
          padding="0.5rem 1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text fontSize="0.8rem" color="gray" fontFamily="sans-serif">
            Total Spending
          </Text>
          <Text
            fontSize="0.8rem"
            color="black"
            fontFamily="sans-serif"
            fontWeight="semibold"
          >
            Rp190.000
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
