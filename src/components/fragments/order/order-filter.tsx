import {
  Box,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@chakra-ui/react';

type sortType = {
  label: string;
  value: string;
};

type courierType = {
  label: string;
  value: string;
};

interface Props {
  couriers: courierType[];
  sorts: sortType[];
  setSelectedCourier: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export function OrderFilter({
  couriers,
  sorts,
  setSelectedCourier,
  setSelectedSort,
  setSearchInput,
}: Props) {
  const courierCollection = createListCollection({
    items: couriers,
  });
  const sortCollection = createListCollection({
    items: sorts,
  });
  return (
    <Box display="flex" gap="0.5rem" position="relative">
      <Input
        placeholder="Search Order"
        type="text"
        width="50%"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <SelectRoot
        collection={courierCollection}
        width="25%"
        pos={'relative'}
        onValueChange={(value) => setSelectedCourier(value.value[0].toString())}
      >
        <SelectTrigger>
          <SelectValueText placeholder="Courier" />
        </SelectTrigger>
        <SelectContent
          top={11}
          position="absolute"
          zIndex={10}
          backgroundColor="white"
          boxShadow="md"
          width={'100%'}
        >
          {courierCollection.items.map((courier) => (
            <SelectItem item={courier} key={courier.value}>
              {courier.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <SelectRoot
        collection={sortCollection}
        width="25%"
        pos={'relative'}
        onValueChange={(value) => setSelectedSort(value.value[0].toString())}
      >
        <SelectTrigger>
          <SelectValueText placeholder="Sort" />
        </SelectTrigger>
        <SelectContent
          top={11}
          position="absolute"
          zIndex={10}
          backgroundColor="white"
          boxShadow="md"
          width={'100%'}
        >
          {sortCollection.items.map((sort) => (
            <SelectItem item={sort} key={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
