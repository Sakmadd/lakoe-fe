import { OrderType } from '@/types/types';

export function OrderGrouper({ orders }: { orders: OrderType[] }) {
  const groupedOrders = orders.reduce(
    (acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = [];
      }
      acc[order.status].push(order);
      return acc;
    },
    {} as Record<string, typeof orders>
  );

  return groupedOrders;
}
