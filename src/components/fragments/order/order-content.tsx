import { dummyOrders } from '@/dummy-data/dummyData';
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
          couriers={couriers}
          sorts={sorts}
          orders={dummyOrders ? dummyOrders : []}
          tabs_value={'all'}
        />
        <TabsOrderContent
          couriers={couriers}
          sorts={sorts}
          orders={groupedOrders.unpaid ? groupedOrders.unpaid : []}
          tabs_value={'unpaid'}
        />
        <TabsOrderContent
          couriers={couriers}
          sorts={sorts}
          orders={groupedOrders.new ? groupedOrders.new : []}
          tabs_value={'new'}
        />
        <TabsOrderContent
          couriers={couriers}
          sorts={sorts}
          orders={groupedOrders.ready ? groupedOrders.ready : []}
          tabs_value={'ready'}
        />
        <TabsOrderContent
          couriers={couriers}
          sorts={sorts}
          orders={groupedOrders.delivery ? groupedOrders.delivery : []}
          tabs_value={'delivery'}
        />
        <TabsOrderContent
          couriers={couriers}
          sorts={sorts}
          orders={groupedOrders.canceled ? groupedOrders.canceled : []}
          tabs_value={'canceled'}
        />
        <TabsOrderContent
          couriers={couriers}
          sorts={sorts}
          orders={groupedOrders.completed ? groupedOrders.completed : []}
          tabs_value={'completed'}
        />
      </Tabs.Root>
    </>
  );
}

const couriers = [
  { label: 'Jne', value: 'jne' },
  { label: 'Anter aja', value: 'anteraja' },
  { label: 'Jnt', value: 'jnt' },
];

const sorts = [
  { label: 'Newest', value: 'new' },
  { label: 'Oldest', value: 'old' },
];
