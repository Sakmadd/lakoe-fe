import { OrderType } from '@/types/types';
import { Box } from '@chakra-ui/react';
import React from 'react';
import OrderItem from './order-item';

interface Props {
  orders: OrderType[];
  filter: React.ReactNode;
}

export default function OrderList({ orders, filter }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      {filter}
      <Box display="flex" flexDirection="column" gap="0.8rem">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </Box>
    </Box>
  );
}
