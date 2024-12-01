import { dummyOrders } from '@/dummy-data/dummyData';
import { OrderGrouper } from '@/utils/order-grouper';
import { Tabs, Text } from '@chakra-ui/react';
import OrderList from './order-list';

export function OrderContent() {
  const groupedOrders = OrderGrouper({ orders: dummyOrders });

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
        <Tabs.Content value="all">
          <OrderList orders={dummyOrders} />
        </Tabs.Content>
        <Tabs.Content value="unpaid">
          <OrderList orders={groupedOrders.unpaid} />
        </Tabs.Content>
        <Tabs.Content value="new">
          <OrderList orders={groupedOrders.new} />
        </Tabs.Content>
        <Tabs.Content value="ready">
          <OrderList orders={groupedOrders.ready} />
        </Tabs.Content>
        <Tabs.Content value="delivery">
          <OrderList orders={groupedOrders.delivery} />
        </Tabs.Content>
        <Tabs.Content value="completed">
          <OrderList orders={groupedOrders.completed} />
        </Tabs.Content>
        <Tabs.Content value="canceled">
          <OrderList orders={groupedOrders.canceled} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
