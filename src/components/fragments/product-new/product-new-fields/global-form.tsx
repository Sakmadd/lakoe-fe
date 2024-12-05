import { Flex, Group, Input, InputAddon } from '@chakra-ui/react';

export function EditAllVariantsForm() {
  return (
    <>
      <Flex flexDir="row" gap="1rem" width="100%">
        <Flex flexDir="column" gap="1rem" width="60%">
          <Group attached width="100%">
            <Input
              id="global-price"
              type="number"
              placeholder="Enter price for all"
            />
            <InputAddon>Rp</InputAddon>
          </Group>
          <Input id="global-sku" placeholder="Enter SKU for all" />
        </Flex>
        <Flex flexDir="column" gap="1rem" width="40%">
          <Input
            id="global-stock"
            type="number"
            placeholder="Enter stock for all"
          />
          <Group attached width="100%">
            <Input
              id="global-weight"
              type="number"
              placeholder="Enter weight for all"
            />
            <InputAddon>Gram</InputAddon>
          </Group>
        </Flex>
      </Flex>
    </>
  );
}
