import { OrderType } from '@/types/types';
import { useMemo } from 'react';

interface Props {
  orders: OrderType[];
  selectedCourier: string;
  selectedSort: string;
  searchInput: string;
}

export function useFilterOrderContent({
  orders,
  selectedCourier,
  selectedSort,
  searchInput,
}: Props): { filteredOrders: OrderType[] } {
  const filteredOrders = useMemo(() => {
    let filteredOrders = [...orders];

    if (selectedCourier) {
      filteredOrders = filteredOrders.filter(
        (order) => order.courier.toLowerCase() === selectedCourier.toLowerCase()
      );
    }

    if (searchInput) {
      filteredOrders = filteredOrders.filter((order) =>
        order.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (selectedSort === 'new') {
      filteredOrders = filteredOrders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (selectedSort === 'old') {
      filteredOrders = filteredOrders.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return filteredOrders;
  }, [orders, selectedCourier, selectedSort, searchInput]);

  return { filteredOrders };
}
