import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Box, createListCollection, Input } from '@chakra-ui/react';
import OrderBox from './components/order-box';

const dummyData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

export default function OrderAll() {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <Box display="flex" gap="0.5rem">
        <Input placeholder="Cari Pesanan" type="text" width="20rem" />
        <SelectRoot collection={couriers} width="15rem">
          <SelectTrigger>
            <SelectValueText placeholder="Courier" />
          </SelectTrigger>
          <SelectContent>
            {couriers.items.map((courier) => (
              <SelectItem item={courier} key={courier.value}>
                {courier.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot collection={sorts} width="15rem">
          <SelectTrigger>
            <SelectValueText placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {sorts.items.map((sort) => (
              <SelectItem item={sort} key={sort.value}>
                {sort.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Box>
      <Box display="flex" flexDirection="column" gap="0.8rem">
        {dummyData.map(() => (
          <OrderBox />
        ))}
      </Box>
    </Box>
  );
}

const couriers = createListCollection({
  items: [
    { label: 'Jne', value: 'jne' },
    { label: 'Anter aja', value: 'anteraja' },
    { label: 'Jnt', value: 'jnt' },
  ],
});

const sorts = createListCollection({
  items: [
    { label: 'Newest', value: 'new' },
    { label: 'Oldest', value: 'old' },
  ],
});
