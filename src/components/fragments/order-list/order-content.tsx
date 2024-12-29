import { dummyCouriers, dummySorts } from '@/dummy-data/dummyData';
import { OrderGrouper } from '@/utils/order-grouper';
import { Box, Spinner, Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';
import OrderActionDialog from './order-action-dialog';
import { useGetOrderList } from './order-list-hooks/order-tanstack';
import { TabsOrderContent } from './order-tabs-content';

export function OrderContent() {
  const { data, isFetching } = useGetOrderList();
  const groupedOrders = OrderGrouper({ orders: data });
  const [openDialog, setOpenDialog] = useState(false);
  const [contact, setContact] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [id, setId] = useState<string>('0');
  const [phone, setPhone] = useState<string | undefined>('');
  const [courier, setCourier] = useState<string | null>('');
  return (
    <>
      <Text as="h1" fontWeight="bold" fontFamily="sans-serif">
        Order List
      </Text>
      <Tabs.Root defaultValue="all">
        <Tabs.List>
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="unpaid">Unpaid</Tabs.Trigger>
          <Tabs.Trigger value="new">New Orders</Tabs.Trigger>
          <Tabs.Trigger value="ready">Ready to Ship</Tabs.Trigger>
          <Tabs.Trigger value="delivery">On Delivery</Tabs.Trigger>
          <Tabs.Trigger value="completed">Order Completed</Tabs.Trigger>
          <Tabs.Trigger value="canceled">Canceled Orders</Tabs.Trigger>
        </Tabs.List>
        {isFetching && (
          <Box
            display="flex"
            height="50vh"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" />
          </Box>
        )}
        {!isFetching && (
          <>
            <TabsOrderContent
              setCourier={setCourier}
              setPhone={setPhone}
              setId={setId}
              setContact={setContact}
              setOpenDialog={setOpenDialog}
              setDelivery={setDelivery}
              couriers={dummyCouriers}
              sorts={dummySorts}
              orders={data ? data : []}
              tabs_value={'all'}
              no_message={''}
            />
            <TabsOrderContent
              setCourier={setCourier}
              setPhone={setPhone}
              setId={setId}
              setContact={setContact}
              setOpenDialog={setOpenDialog}
              setDelivery={setDelivery}
              couriers={dummyCouriers}
              sorts={dummySorts}
              orders={groupedOrders?.unpaid ? groupedOrders?.unpaid : []}
              tabs_value={'unpaid'}
              no_message={'Unpaid'}
            />
            <TabsOrderContent
              setCourier={setCourier}
              setPhone={setPhone}
              setId={setId}
              setContact={setContact}
              setOpenDialog={setOpenDialog}
              setDelivery={setDelivery}
              couriers={dummyCouriers}
              sorts={dummySorts}
              orders={groupedOrders?.new_order ? groupedOrders?.new_order : []}
              tabs_value={'new'}
              no_message={'New Order'}
            />
            <TabsOrderContent
              setCourier={setCourier}
              setPhone={setPhone}
              setId={setId}
              setContact={setContact}
              setOpenDialog={setOpenDialog}
              setDelivery={setDelivery}
              couriers={dummyCouriers}
              sorts={dummySorts}
              orders={
                groupedOrders?.ready_to_ship ? groupedOrders?.ready_to_ship : []
              }
              tabs_value={'ready'}
              no_message={'Ready To Ship'}
            />
            <TabsOrderContent
              setCourier={setCourier}
              setPhone={setPhone}
              setId={setId}
              setContact={setContact}
              setOpenDialog={setOpenDialog}
              setDelivery={setDelivery}
              couriers={dummyCouriers}
              sorts={dummySorts}
              orders={
                groupedOrders?.on_delivery ? groupedOrders?.on_delivery : []
              }
              tabs_value={'delivery'}
              no_message={'Shipping'}
            />
            <TabsOrderContent
              setCourier={setCourier}
              setPhone={setPhone}
              setId={setId}
              setContact={setContact}
              setOpenDialog={setOpenDialog}
              setDelivery={setDelivery}
              couriers={dummyCouriers}
              sorts={dummySorts}
              orders={groupedOrders?.canceled ? groupedOrders?.canceled : []}
              tabs_value={'canceled'}
              no_message={'Canceled'}
            />
            <TabsOrderContent
              setCourier={setCourier}
              setPhone={setPhone}
              setId={setId}
              setContact={setContact}
              setOpenDialog={setOpenDialog}
              setDelivery={setDelivery}
              couriers={dummyCouriers}
              sorts={dummySorts}
              orders={groupedOrders?.done ? groupedOrders?.done : []}
              tabs_value={'completed'}
              no_message={'Completed'}
            />
          </>
        )}
      </Tabs.Root>
      <OrderActionDialog
        phone={phone}
        id={id}
        setContact={setContact}
        setOpenDialog={setOpenDialog}
        delivery={delivery}
        openDialog={openDialog}
        contact={contact}
        courier={courier}
        setDelivery={setDelivery}
      />
    </>
  );
}
