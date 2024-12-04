import { Switch } from '@/components/ui/switch';
import { Flex, Separator, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldInputAddon } from '../product-new-fields/field-input-addon';

export function ProductVariantItem() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Flex alignItems={'center'} gap={'1rem'}>
        <Text fontWeight={'bold'} fontSize={'sm'}>
          Variant - SubVariant
        </Text>
        <Flex alignItems={'center'} gap={'.5rem'}>
          <Switch onCheckedChange={() => setIsActive(!isActive)} />
          {isActive ? (
            <Text fontSize={'sm'}>Active</Text>
          ) : (
            <Text fontSize={'sm'}>Inactive</Text>
          )}
        </Flex>
      </Flex>
      <Flex width={'100%'} gap={'1rem'}>
        <Flex flexDir={'column'} gap={'1rem'} width={'60%'}>
          <FieldInputAddon
            label="Price"
            leftAddon="Rp"
            required
            type="number"
          />
          <FieldInputAddon label="SKU (Stock Keeping Unit)" required />
        </Flex>
        <Flex flexDir={'column'} gap={'1rem'} width={'40%'}>
          <FieldInputAddon label="Product Stock" required type="number" />
          <FieldInputAddon
            label="Product Weight"
            required
            rightAddon="Gram"
            type="number"
          />
        </Flex>
      </Flex>
      <Separator />
    </>
  );
}
