import { ContentContainer } from '../../container/contentContainer';
import { Box, Text, Separator } from '@chakra-ui/react';
import { formatRupiah } from '@/utils/format-rp';

interface Props {
  total_price: number | undefined;
  shipping_cost: number | undefined;
  discount: number | undefined;
  service_fee: number | undefined;
  total: number | undefined;
}

export default function OrderDetailPayment({
  total_price,
  shipping_cost,
  discount,
  service_fee,
  total,
}: Props) {
  return (
    <ContentContainer>
      <Box display="flex" flexDirection="column" gap="1rem">
        <Text fontWeight="semibold" fontSize="0.9rem">
          Payment details
        </Text>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            justifyContent="center"
          >
            <Text fontWeight="normal" fontSize="0.8rem">
              Total price
            </Text>
            <Text fontWeight="normal" fontSize="0.8rem">
              Total shipping costs
            </Text>
            <Text fontWeight="normal" fontSize="0.8rem">
              Discount
            </Text>
            <Text fontWeight="normal" fontSize="0.8rem">
              Service fee
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            justifyContent="center"
          >
            <Text fontWeight="semibold" fontSize="0.8rem">
              {formatRupiah(total_price)}
            </Text>
            <Text fontWeight="semibold" fontSize="0.8rem">
              {formatRupiah(shipping_cost)}
            </Text>
            <Text fontWeight="semibold" fontSize="0.8rem">
              {formatRupiah(discount)}
            </Text>
            <Text fontWeight="semibold" fontSize="0.8rem">
              {formatRupiah(service_fee)}
            </Text>
          </Box>
        </Box>
        <Separator />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontWeight="semibold">Total sales</Text>
          <Text fontWeight="semibold">{formatRupiah(total)}</Text>
        </Box>
      </Box>
    </ContentContainer>
  );
}
