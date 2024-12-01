import { Box } from '@chakra-ui/react';
import { OrderFilter } from './order-filter';
import OrderItem from './order-item';
import { OrderType } from '@/types/types';

interface Props {
  orders: OrderType[];
}

export default function OrderList({ orders }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <OrderFilter couriers={couriers} sorts={sorts} />
      <Box display="flex" flexDirection="column" gap="0.8rem">
        {orders.map((order) => (
          <OrderItem order={order} />
        ))}
      </Box>
    </Box>
  );
}

const couriers = [
  { label: 'Jne', value: 'jne' },
  { label: 'Anter aja', value: 'anteraja' },
  { label: 'Jnt', value: 'jnt' },
];

const sorts = [
  { label: 'Newest', value: 'new' },
  { label: 'Oldest', value: 'old' },
];
