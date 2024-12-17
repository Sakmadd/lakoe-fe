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
import {
  createListCollection,
  Flex,
  Group,
  Input,
  InputAddon,
  Text,
} from '@chakra-ui/react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ContentContainer } from '../../container/contentContainer';
import { FieldInput } from '../product-new-fields/field-input';
import { useState } from 'react';

interface Props {
  register: UseFormRegister<ProductType>;
  setValue: UseFormSetValue<ProductType>;
  control: Control<ProductType>;
  errors: FieldErrors<ProductType>;
}

export function ProductInformationSection({ register, control }: Props) {
  const categories = createListCollection({
    items: dummyCategories,
  });
  const [value, setValue] = useState('');

  // Fungsi untuk mengubah input saat pengguna mengetik
  const formatInput = (input: string) => {
    return input
      .toLowerCase() // Ubah semua huruf menjadi lowercase
      .replace(/\s+/g, '-') // Ganti spasi dengan "-"
      .replace(/[^a-z0-9-]/g, '') // Hilangkan karakter non-alphanumeric selain "-"
      .replace(/-+/g, '-'); // Hindari duplikat "-"
  };

  // Event handler untuk onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatInput(e.target.value);
    setValue(formattedValue);
  };

  const handleBlur = () => {
    setValue((prev) => prev.replace(/-+$/, '')); // Hapus "-" di akhir string
  };

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
            <Field label={'Product URL'} required color={'gray'}>
              <Group attached width="100%">
                leftAddon && <InputAddon>lakoe.store/</InputAddon>
                <Input
                  value={value}
                  placeholder={'product-url-name'}
                  {...register('url')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Group>
            </Field>
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
