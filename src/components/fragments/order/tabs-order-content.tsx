import { useFilterOrderContent } from '@/hooks/use-filter-order-content';
import { CourierType, OrderType } from '@/types/types';
import { Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FilterBar } from '../common/filter-bar';
import OrderList from './order-list';

interface Props {
  orders: OrderType[];
  tabs_value: string;
  couriers: CourierType[];
  sorts: { label: string; value: string }[];
}

export function TabsOrderContent({
  orders,
  tabs_value,
  couriers,
  sorts,
}: Props) {
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const { filteredOrders } = useFilterOrderContent({
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
            <FilterBar
              filterFor="Orders"
              selectedFirstSort={selectedCourier}
              selectedSecondSort={selectedSort}
              setFirstSort={setSelectedCourier}
              setSecondSort={setSelectedSort}
              setSearchInput={setSearchInput}
              key={tabs_value}
              firstSort={couriers}
              secondSort={sorts}
            />
          }
          orders={filteredOrders}
        />
      </Tabs.Content>
    </>
  );
}
