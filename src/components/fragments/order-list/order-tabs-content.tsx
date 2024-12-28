import { useFilterOrderContent } from '@/hooks/use-filter-order-content';
import { CourierType, OrderItemTypeAPI } from '@/types/types';
import { Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FilterBar } from '../common/filter-bar';
import OrderActionDialog from './order-action-dialog';
import OrderActionDialog from './order-action-dialog';
import OrderList from './order-list';

interface Props {
  orders: OrderItemTypeAPI[];
  tabs_value: string;
  couriers: CourierType[];
  sorts: { label: string; value: string }[];
  no_message: string;
}

export function TabsOrderContent({
  no_message,
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

  const [openDialog, setOpenDialog] = useState(false);
  const [contact, setContact] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contact, setContact] = useState(false);
  const [delivery, setDelivery] = useState(false);

  return (
    <>
      <Tabs.Content value={tabs_value}>
        <OrderList
          setContact={setContact}
          setDelivery={setDelivery}
          setOpenDialog={setOpenDialog}
          no_message={no_message}
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
        <OrderActionDialog
          setContact={setContact}
          setOpenDialog={setOpenDialog}
          delivery={delivery}
          openDialog={openDialog}
          contact={contact}
          setDelivery={setDelivery}
        />
        <OrderActionDialog
          setContact={setContact}
          setOpenDialog={setOpenDialog}
          delivery={delivery}
          openDialog={openDialog}
          contact={contact}
          setDelivery={setDelivery}
        />
      </Tabs.Content>
    </>
  );
}
