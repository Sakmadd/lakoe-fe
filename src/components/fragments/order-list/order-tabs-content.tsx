import { useFilterOrderContent } from '@/hooks/use-filter-order-content';
import { CourierType, OrderItemTypeAPI } from '@/types/types';
import { Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FilterBar } from '../common/filter-bar';
import OrderList from './order-list';

interface Props {
  orders: OrderItemTypeAPI[];
  tabs_value: string;
  couriers: CourierType[];
  sorts: { label: string; value: string }[];
  no_message: string;
  setContact: (a: boolean) => void;
  setDelivery: (a: boolean) => void;
  setOpenDialog: (a: boolean) => void;
  setId: (a: string) => void;
  setPhone: (a: string) => void;
  setCourier: (a: string | null) => void;
}

export function TabsOrderContent({
  no_message,
  orders,
  tabs_value,
  couriers,
  sorts,
  setCourier,
  setContact,
  setDelivery,
  setOpenDialog,
  setId,
  setPhone,
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
          setId={setId}
          setCourier={setCourier}
          setContact={setContact}
          setDelivery={setDelivery}
          setOpenDialog={setOpenDialog}
          no_message={no_message}
          setPhone={setPhone}
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
