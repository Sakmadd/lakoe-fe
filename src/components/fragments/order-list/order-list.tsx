import { OrderItemTypeAPI } from '@/types/types';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import OrderItem from './order-item';

interface Props {
  orders: OrderItemTypeAPI[];
  filter: React.ReactNode;
  setOpenDialog: (a: boolean) => void;
  setContact: (a: boolean) => void;
  setDelivery: (a: boolean) => void;
  setId: (a: string) => void;
  no_message: string;
  setPhone: (a: string) => void;
  setCourier: (a: string | null) => void;
}

export default function OrderList({
  setPhone,
  orders,
  filter,
  setOpenDialog,
  setContact,
  setDelivery,
  setId,
  no_message,
  setCourier,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      {filter}
      <Box display="flex" flexDirection="column" gap="0.8rem">
        {orders.length == 0 && (
          <Box
            height="50vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#e6e6e6"
              fontSize="1.5rem"
            >
              Your Store has no {no_message} activity yet
            </Text>
          </Box>
        )}
        {orders.length != 0 &&
          orders
            .map((order) => (
              <OrderItem
                setCourier={setCourier}
                setPhone={setPhone}
                setId={setId}
                key={order.invoice_id}
                order={order}
                setOpenDialog={setOpenDialog}
                setContact={setContact}
                setDelivery={setDelivery}
              />
            ))
            .reverse()}
      </Box>
    </Box>
  );
}
