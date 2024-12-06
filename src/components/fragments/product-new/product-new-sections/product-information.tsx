import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { dummyCategories } from '@/dummy-data/dummyData';
import { ProductType } from '@/types/types';
import { createListCollection, Flex, Text } from '@chakra-ui/react';
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ContentContainer } from '../../container/contentContainer';
import { FieldInput } from '../product-new-fields/field-input';
import { FieldInputAddon } from '../product-new-fields/field-input-addon';

interface Props {
  register: UseFormRegister<ProductType>;
  setValue: UseFormSetValue<ProductType>;
  control: Control<ProductType>;
}

export function ProductInformationSection({ register, control }: Props) {
  const categories = createListCollection({
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
              register={register}
              registerName="name"
            />
            <FieldInputAddon
              required
              label="Product URL"
              leftAddon="lakoe.store/"
              placeholder="product-name"
              register={register}
              registerName="url"
            />
            <Field label="Select Category" required color={'gray'}>
              <Controller
                control={control}
                name="category_id"
                render={({ field }) => (
                  <SelectRoot
                    size="sm"
                    width="320px"
                    minWidth={'100%'}
                    collection={categories}
                    onValueChange={({ items }) => field.onChange(items[0].id)}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.items.map((category) => (
                        <SelectItem key={category.id} item={category}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
            </Field>
          </Flex>
        </Flex>
      </ContentContainer>
    </>
  );
}
