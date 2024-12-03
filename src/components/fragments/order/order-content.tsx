import { dummyCouriers, dummyOrders, dummySorts } from '@/dummy-data/dummyData';
import { OrderGrouper } from '@/utils/order-grouper';
import { Tabs, Text } from '@chakra-ui/react';
import { TabsOrderContent } from './tabs-order-content';

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
        <TabsOrderContent
          couriers={dummyCouriers}
          sorts={dummySorts}
          orders={dummyOrders ? dummyOrders : []}
          tabs_value={'all'}
        />
        <TabsOrderContent
          couriers={dummyCouriers}
          sorts={dummySorts}
          orders={groupedOrders.unpaid ? groupedOrders.unpaid : []}
          tabs_value={'unpaid'}
        />
        <TabsOrderContent
          couriers={dummyCouriers}
          sorts={dummySorts}
          orders={groupedOrders.new ? groupedOrders.new : []}
          tabs_value={'new'}
        />
        <TabsOrderContent
          couriers={dummyCouriers}
          sorts={dummySorts}
          orders={groupedOrders.ready ? groupedOrders.ready : []}
          tabs_value={'ready'}
        />
        <TabsOrderContent
          couriers={dummyCouriers}
          sorts={dummySorts}
          orders={groupedOrders.delivery ? groupedOrders.delivery : []}
          tabs_value={'delivery'}
        />
        <TabsOrderContent
          couriers={dummyCouriers}
          sorts={dummySorts}
          orders={groupedOrders.canceled ? groupedOrders.canceled : []}
          tabs_value={'canceled'}
        />
        <TabsOrderContent
          couriers={dummyCouriers}
          sorts={dummySorts}
          orders={groupedOrders.completed ? groupedOrders.completed : []}
          tabs_value={'completed'}
        />
      </Tabs.Root>
    </>
  );
}
