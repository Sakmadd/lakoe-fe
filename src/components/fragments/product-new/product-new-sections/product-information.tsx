import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { createListCollection, Flex, Text } from '@chakra-ui/react';
import { FieldInput } from '../product-new-fields/field-input';
import { FieldInputAddon } from '../product-new-fields/field-input-addon';
import { dummyCategories } from '@/dummy-data/dummyData';
import { ContentContainer } from '../../container/contentContainer';

export function ProductInformationSection() {
  const frameworks = createListCollection({
    items: dummyCategories,
  });
  return (
    <>
      <ContentContainer>
        <Flex flexDir={'column'} gap={'1rem'}>
          <Text fontSize={'1xl'} fontWeight={'bold'}>
            Product Information
          </Text>
          <Flex gap={'1rem'} flexDir={'column'}>
            <FieldInput
              label="Product Name"
              placeholder="Enter product name"
              required
            />
            <FieldInputAddon
              required
              label="Product URL"
              leftAddon="lakoe.store/"
              placeholder="product-name"
            />
            <Field label="Select Category" required color={'gray'}>
              <SelectRoot
                collection={frameworks}
                size="sm"
                width="320px"
                minWidth={'100%'}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
          </Flex>
        </Flex>
      </ContentContainer>
    </>
  );
}
