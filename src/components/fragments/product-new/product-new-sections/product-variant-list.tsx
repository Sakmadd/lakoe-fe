import { VariantCombinationFormType } from '@/types/types';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import {
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ProductVariantItem } from './product-variant-item';
import { EditAllVariantCombinationsDialog } from '../product-new-fields/edit-all-variant-dialog';

interface Props {
  variantOptionCombinations: string[];
  register: UseFormRegister<VariantCombinationFormType>;
  handleSubmit: UseFormHandleSubmit<VariantCombinationFormType>;
  getValues: UseFormGetValues<VariantCombinationFormType>;
  setValue: UseFormSetValue<VariantCombinationFormType>;
}

export function ProductVariantListSection({
  variantOptionCombinations,
  register,
  getValues,
  handleSubmit,
  setValue,
}: Props) {
  const onSubmit: SubmitHandler<VariantCombinationFormType> = (data) => {
    console.log(data.variants);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="1rem">
        <Flex alignItems={'center'}>
          <Box>
            <Text fontSize="1xl" fontWeight="bold">
              Variant List
            </Text>
            <Text fontSize="1xl" color={'grey'}>
              Add variants so buyers can choose the right product, come on!
            </Text>
          </Box>
          <Spacer />
          <EditAllVariantCombinationsDialog
            getValues={getValues}
            setValue={setValue}
            variantOptionCombinations={variantOptionCombinations}
          />
        </Flex>

        {variantOptionCombinations.map((combination, index) => (
          <ProductVariantItem
            setValue={setValue}
            variantOption={combination}
            key={combination}
            register={register}
            index={index}
          />
        ))}
      </Flex>
    </form>
  );
}
