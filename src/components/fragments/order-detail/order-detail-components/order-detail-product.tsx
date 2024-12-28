import { Box, Text, Image } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import { formatRupiah } from '@/utils/format-rp';

interface Props {
  image: string | undefined;
  name: string | undefined;
  total_price: number | undefined;
  quantity: number | undefined;
}

export default function OrderDetailProduct({
  image,
  name,
  total_price,
  quantity,
}: Props) {
  return (
    <ContentContainer>
      <Box display="flex" flexDirection="column" gap="0.8rem">
        <Text fontWeight="semibold" fontSize="0.9rem">
          Product Detail
        </Text>
        <Box
          display="flex"
          borderRadius="5px"
          padding="0.5rem"
          border="1px solid #e6e6e6"
          justifyContent="space-between"
          onClick={() => {}}
          cursor="pointer"
        >
          <Box display="flex" gap="0.5rem">
            <Image src={image} width="3rem" height="3rem" />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Text fontWeight="semibold" fontSize="0.9rem" color="black">
                {name}
              </Text>
              <Text fontSize="0.8rem">
                {quantity} x {formatRupiah(total_price)}
              </Text>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="light" fontSize="0.9rem">
              Total expenditure
            </Text>
            <Text fontWeight="semibold" fontSize="0.8rem">
              {formatRupiah(total_price)}
            </Text>
          </Box>
        </Box>
      </Box>
    </ContentContainer>
  );
}
