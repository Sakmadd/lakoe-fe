import { Box, Image, Text } from '@chakra-ui/react';
import { OrderActionButton } from './order-action-button';
import { OrderStatus } from './order-status';
import { formatRupiah } from '@/utils/format-rp';
import { OrderType } from '@/types/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  order: OrderType;
}

export default function OrderItem({ order }: Props) {
  const navigate = useNavigate();
  return (
    <Box border="0.1rem solid #e6e6e6" borderRadius="0.5rem">
      <Box display="flex" justifyContent="space-between" padding="0.8rem">
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <OrderStatus status={order.status} />
          <Text color="grey" fontSize="0.8rem" fontFamily="sans-serif">
            {order.invoice}
          </Text>
        </Box>
        <OrderActionButton order={order} />
      </Box>
      <Box
        borderTop="0.1rem solid #e6e6e6"
        display="flex"
        justifyContent="space-between"
        onClick={() => {
          navigate(`/orders/${order.id}`);
        }}
        cursor={'pointer'}
      >
        <Box padding="0.5rem" display="flex" gap="0.5rem">
          <Image
            width="4rem"
            borderRadius=".3rem"
            objectFit="cover"
            height="4rem"
            border="0.1rem solid #e6e6e6"
            src={order.image.src}
            alt={order.image.alt}
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
              {order.name}
            </Text>
            <Text
              fontWeight="light"
              fontSize="0.7rem"
              color="gray"
              fontFamily="sans-serif"
            >
              {order.quantity} Items
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
            {formatRupiah(order.total_price)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
