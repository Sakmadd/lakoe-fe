import { Tabs, Text } from '@chakra-ui/react';
import OrderAll from './order-all/order-all';

export function OrderContent() {
  return (
    <>
      <Text as="h1" fontWeight="bold" fontFamily="sans-serif">
        Order Page
      </Text>
      <Tabs.Root defaultValue="all">
        <Tabs.List>
          <Tabs.Trigger value="all">Semua</Tabs.Trigger>
          <Tabs.Trigger value="unpaid">Unpaid</Tabs.Trigger>
          <Tabs.Trigger value="new">New Orders</Tabs.Trigger>
          <Tabs.Trigger value="ready">Ready to Ship</Tabs.Trigger>
          <Tabs.Trigger value="delivery">On Delivery</Tabs.Trigger>
          <Tabs.Trigger value="completed">Order Completed</Tabs.Trigger>
          <Tabs.Trigger value="canceled">Dibatalkan</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all">
          <OrderAll />
        </Tabs.Content>
        <Tabs.Content value="unpaid">Unpaid Orders</Tabs.Content>
        <Tabs.Content value="new">New Orders</Tabs.Content>
        <Tabs.Content value="ready">Ready Orders</Tabs.Content>
        <Tabs.Content value="delivery">Delivery Orders</Tabs.Content>
        <Tabs.Content value="completed">Completed Orders</Tabs.Content>
        <Tabs.Content value="canceled">Canceled Orders</Tabs.Content>
      </Tabs.Root>
    </>
  );
}
