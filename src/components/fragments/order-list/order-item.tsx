import { formatRupiah } from '@/utils/format-rp';
import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { OrderActionButton } from './order-action-button';
import { OrderStatus } from './order-status';
import { OrderItemTypeAPI } from '@/types/types';

interface Props {
  order: OrderItemTypeAPI;
  setOpenDialog: (a: boolean) => void;
  setDelivery: (a: boolean) => void;
  setContact: (a: boolean) => void;
  setId: (a: string) => void;
  setPhone: (a: string) => void;
  setCourier: (a: string | null) => void;
}

export default function OrderItem({
  setPhone,
  setId,
  order,
  setOpenDialog,
  setDelivery,
  setContact,
  setCourier,
}: Props) {
  const navigate = useNavigate();

  return (
    <Box
      border="0.1rem solid #e6e6e6"
      borderRadius="0.5rem"
      onClick={() => navigate(`/orders/${order.invoice_id}`)}
      cursor="pointer"
    >
      <Box display="flex" justifyContent="space-between" padding="0.8rem">
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <OrderStatus status={order.status} />
          <Text color="grey" fontSize="0.8rem" fontFamily="sans-serif">
            {order.invoice_number}
          </Text>
        </Box>
        <OrderActionButton
          setCourier={setCourier}
          setPhone={setPhone}
          setId={setId}
          order={order}
          setContact={setContact}
          setDelivery={setDelivery}
          setOpenDialog={setOpenDialog}
        />
      </Box>
      <Box
        borderTop="0.1rem solid #e6e6e6"
        display="flex"
        justifyContent="space-between"
        onClick={() => {
          navigate(`/orders/${order.invoice_id}`);
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
            src={order.product.image}
            alt={order.product.image}
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
              {order.product.name}
            </Text>
            <Text
              fontWeight="light"
              fontSize="0.7rem"
              color="gray"
              fontFamily="sans-serif"
            >
              {order.product.quantity} Items
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
            {formatRupiah(order.product.total_price)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
