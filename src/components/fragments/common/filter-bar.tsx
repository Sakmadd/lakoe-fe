import {
  Box,
  Button,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@chakra-ui/react';
import { TiDelete } from 'react-icons/ti';

type sortType = {
  label: string;
  value: string;
};

type courierType = {
  label: string;
  value: string;
};

interface Props {
  filterFor: 'Products' | 'Orders';
  firstSort: courierType[];
  secondSort: sortType[];
  selectedFirstSort: string;
  selectedSecondSort: string;
  setFirstSort: React.Dispatch<React.SetStateAction<string>>;
  setSecondSort: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export function FilterBar({
  filterFor,
  firstSort,
  secondSort,
  setFirstSort,
  setSecondSort,
  setSearchInput,
  selectedFirstSort,
  selectedSecondSort,
}: Props) {
  const firstSortCollection = createListCollection({
    items: firstSort,
  });
  const secondSortCollection = createListCollection({
    items: secondSort,
  });

  return (
    <Box display="flex" gap="0.5rem" position="relative">
      <Input
        placeholder={`Search ${filterFor}`}
        type="text"
        width="50%"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <SelectRoot
        collection={firstSortCollection}
        width="25%"
        pos={'relative'}
        onValueChange={(value) => setFirstSort(value.value[0].toString())}
      >
        <SelectTrigger>
          <SelectValueText>
            {selectedFirstSort ||
              `${filterFor == 'Products' ? 'Category' : 'Courier'}`}
          </SelectValueText>
          {selectedFirstSort && (
            <Button
              variant={'ghost'}
              size={'xs'}
              onClick={() => setFirstSort('')}
            >
              <TiDelete />
            </Button>
          )}
        </SelectTrigger>
        <SelectContent
          top={11}
          position="absolute"
          zIndex={10}
          backgroundColor="white"
          boxShadow="md"
          width={'100%'}
        >
          {firstSortCollection.items.map((sort) => (
            <SelectItem item={sort} key={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <SelectRoot
        collection={secondSortCollection}
        width="25%"
        pos={'relative'}
        onValueChange={(value) => setSecondSort(value.value[0].toString())}
      >
        <SelectTrigger>
          <SelectValueText>{selectedSecondSort || 'Sort'} </SelectValueText>
          {selectedSecondSort && (
            <Button
              variant={'ghost'}
              size={'xs'}
              onClick={() => setSecondSort('')}
            >
              <TiDelete />
            </Button>
          )}
        </SelectTrigger>
        <SelectContent
          top={11}
          position="absolute"
          zIndex={10}
          backgroundColor="white"
          boxShadow="md"
          width={'100%'}
        >
          {secondSortCollection.items.map((sort) => (
            <SelectItem item={sort} key={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
}
