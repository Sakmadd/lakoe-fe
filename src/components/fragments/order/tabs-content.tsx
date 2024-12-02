import { OrderType } from '@/types/types';
import { Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { OrderFilter } from './order-filter';
import OrderList from './order-list';
import { useTabContent } from '@/hooks/useTabContent';

interface Props {
  orders: OrderType[];
  tabs_value: string;
  couriers: { label: string; value: string }[];
  sorts: { label: string; value: string }[];
}

export function TabsContent({ orders, tabs_value, couriers, sorts }: Props) {
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('new');
  const [searchInput, setSearchInput] = useState<string>('');

  const { filteredOrders } = useTabContent({
    orders,
    selectedCourier,
    selectedSort,
    searchInput,
  });

  return (
    <>
      <Tabs.Content value={tabs_value}>
        <OrderList
          filter={
            <OrderFilter
              setSearchInput={setSearchInput}
              setSelectedCourier={setSelectedCourier}
              setSelectedSort={setSelectedSort}
              key={tabs_value}
              couriers={couriers}
              sorts={sorts}
            />
          }
          orders={filteredOrders}
        />
      </Tabs.Content>
    </>
  );
}
