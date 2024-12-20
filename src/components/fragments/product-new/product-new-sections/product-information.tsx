import { Field } from '@/components/ui/field';
import { ProductType } from '@/types/types';
import { Flex, Group, Input, InputAddon, Text } from '@chakra-ui/react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ContentContainer } from '../../container/contentContainer';
import { FieldInput } from '../product-new-fields/field-input';
import CategoryInput from './category-input';

interface Props {
  register: UseFormRegister<ProductType>;
  setValue: UseFormSetValue<ProductType>;
}

export function ProductInformationSection({ register, setValue }: Props) {
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
                <Input placeholder={'product-url-name'} {...register('url')} />
              </Group>
            </Field>
            <CategoryInput setValue={setValue} />
          </Flex>
        </Flex>
      </ContentContainer>
    </>
  );
}
