import { Field } from '@/components/ui/field';
import { Flex, Group, Input, InputAddon, Text } from '@chakra-ui/react';
import { FieldInputAddon } from '../product-new-fields/field-input-addon';
import { ContentContainer } from '../../container/contentContainer';

export function ProductPriceSection() {
  return (
    <>
      <ContentContainer>
        <Flex flexDir="column" gap="1rem">
          <Text fontSize="1xl" fontWeight="bold">
            Product Price
          </Text>
          <FieldInputAddon
            label="Price"
            required
            leftAddon="Rp"
            placeholder="Enter price for one item"
          />
          <Field label={'Minimum Order'} color={'gray'}>
            <Group attached width="100%">
              <Input defaultValue={1} type="number" />
              <InputAddon>Product</InputAddon>
            </Group>
          </Field>
        </Flex>
      </ContentContainer>
    </>
  );
}
