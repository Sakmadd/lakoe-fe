import { OrderItemTypeAPI } from '@/types/types';
import { useMemo } from 'react';

interface Props {
  orders: OrderItemTypeAPI[];
  selectedCourier: string;
  selectedSort: string;
  searchInput: string;
}

export function useFilterOrderContent({
  orders,
  selectedCourier,
  selectedSort,
  searchInput,
}: Props): { filteredOrders: OrderItemTypeAPI[] } {
  const filteredOrders = useMemo(() => {
    let filteredOrders = [...orders];

    if (selectedCourier) {
      filteredOrders = filteredOrders.filter(
        (order) => order.courier.toLowerCase() === selectedCourier.toLowerCase()
      );
    }

    if (searchInput) {
      filteredOrders = filteredOrders.filter((order) =>
        order.product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (selectedSort === 'new') {
      filteredOrders = filteredOrders.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (selectedSort === 'old') {
      filteredOrders = filteredOrders.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    return filteredOrders;
  }, [orders, selectedCourier, selectedSort, searchInput]);

  return { filteredOrders };
}
