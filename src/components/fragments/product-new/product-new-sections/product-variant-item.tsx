import { Field } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { VariantCombinationFormType } from '@/types/types';
import {
  Flex,
  Group,
  Input,
  InputAddon,
  Separator,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface Props {
  variantOption: string;
  register: UseFormRegister<VariantCombinationFormType>;
  setValue: UseFormSetValue<VariantCombinationFormType>;
  index: number;
  getValues: UseFormGetValues<VariantCombinationFormType>;
}

export function ProductVariantItem({
  variantOption,
  register,
  index,
  setValue,
}: Props) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setValue(`variants.${index}.is_active`, isActive);
    setValue(`variants.${index}.name`, variantOption);
  }, [register, index, setValue, isActive, variantOption]);

  return (
    <>
      <Flex alignItems={'center'} gap={'1rem'}>
        <Text fontWeight={'bold'} fontSize={'sm'}>
          {variantOption}
        </Text>
        <Flex alignItems={'center'} gap={'.5rem'}>
          <Switch
            checked={isActive}
            onCheckedChange={() => setIsActive(!isActive)}
          />
          {isActive ? (
            <Text fontSize={'sm'}>Active</Text>
          ) : (
            <Text fontSize={'sm'}>Inactive</Text>
          )}
        </Flex>
      </Flex>

      <Flex width={'100%'} gap={'1rem'}>
        <Flex flexDir={'column'} gap={'1rem'} width={'60%'}>
          <Input
            type={'hidden'}
            {...register(`variants.${index}.name`)}
            value={variantOption}
            readOnly
          />

          <Field label={'Price'} required color={'gray'}>
            <Group attached width="100%">
              <Input
                type={'number'}
                {...register(`variants.${index}.price`)}
                placeholder="Enter price"
              />
              <InputAddon>Rp</InputAddon>
            </Group>
          </Field>

          <Field label={'SKU (Stock Keeping Unit)'} required color={'gray'}>
            <Group attached width="100%">
              <Input
                {...register(`variants.${index}.sku`)}
                placeholder="Enter SKU"
              />
            </Group>
          </Field>
        </Flex>

        <Flex flexDir={'column'} gap={'1rem'} width={'40%'}>
          <Field label={'Product Stock'} required color={'gray'}>
            <Group attached width="100%">
              <Input
                type={'number'}
                {...register(`variants.${index}.stock`, {
                  valueAsNumber: true,
                })}
                placeholder="Enter stock"
              />
            </Group>
          </Field>

          <Field label={'Product Weight'} required color={'gray'}>
            <Group attached width="100%">
              <Input
                type={'number'}
                {...register(`variants.${index}.weight`, {
                  valueAsNumber: true,
                })}
                placeholder="Enter weight"
              />
              <InputAddon>Gram</InputAddon>
            </Group>
          </Field>
        </Flex>
      </Flex>
      <Separator />
    </>
  );
}
