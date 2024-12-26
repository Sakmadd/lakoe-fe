import { OrderType } from '@/types/types';
import { Box } from '@chakra-ui/react';
import React from 'react';
import OrderItem from './order-item';

interface Props {
  orders: OrderType[];
  filter: React.ReactNode;
  setOpenDialog: (a: boolean) => void;
  setContact: (a: boolean) => void;
  setDelivery: (a: boolean) => void;
}

export default function OrderList({
  orders,
  filter,
  setOpenDialog,
  setContact,
  setDelivery,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      {filter}
      <Box display="flex" flexDirection="column" gap="0.8rem">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            setOpenDialog={setOpenDialog}
            setContact={setContact}
            setDelivery={setDelivery}
          />
        ))}
      </Box>
    </Box>
  );
}
