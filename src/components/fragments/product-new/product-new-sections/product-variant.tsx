import { VariantCombinationFormType, VariantUIType } from '@/types/types';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ContentContainer } from '../../container/contentContainer';
import { AddVariantDialog } from '../product-new-fields/field-add-variant-dialog';
import TagFieldInput from '../product-new-fields/tag-field-input';
import { VariantCheckbox } from '../product-new-fields/variant-checkbox';
import { ProductVariantListSection } from './product-variant-list';

interface Props {
  hooks: {
    variants: VariantUIType[];
    variantOptions: Record<string, string[]>;
    variantOptionCombinations: string[];
    setVariantOptions: React.Dispatch<
      React.SetStateAction<Record<string, string[]>>
    >;
    setVariants: React.Dispatch<React.SetStateAction<VariantUIType[]>>;
    getValues: UseFormGetValues<VariantCombinationFormType>;
    handleSubmit: UseFormHandleSubmit<VariantCombinationFormType, undefined>;
    register: UseFormRegister<VariantCombinationFormType>;
    setValue: UseFormSetValue<VariantCombinationFormType>;
  };
}

export function ProductVariantSection({ hooks }: Props) {
  const {
    getValues,
    handleSubmit,
    register,
    setValue,
    variants,
    variantOptions,
    variantOptionCombinations,
    setVariantOptions,
    setVariants,
  } = hooks;
  const handleOptionsChange = (name: string, options: string[]) => {
    setVariantOptions((prev) => ({ ...prev, [name]: options }));
  };

  return (
    <ContentContainer>
      <Flex flexDir="column" gap="1rem">
        <Flex alignItems={'center'}>
          <Box>
            <Text fontSize="1xl" fontWeight="bold">
              Product Variant
            </Text>
            <Text fontSize="1xl" color={'grey'}>
              Add variants so buyers can choose the right product, come on!
            </Text>
          </Box>
          <Spacer />
          <AddVariantDialog
            setVariantOptions={setVariantOptions}
            setVariants={setVariants}
            variantList={variants}
          />
        </Flex>
        <Flex gap={'1rem'}>
          {variants.map((variant) => (
            <VariantCheckbox
              setVariantList={setVariants}
              key={variant.name}
              variantlist={variants}
              variant={variant}
            />
          ))}
        </Flex>
        {variants.map((variant) =>
          variant.is_checked ? (
            <TagFieldInput
              key={variant.name}
              label={variant.name}
              required
              variantName={variant.name}
              onOptionsChange={handleOptionsChange}
            />
          ) : null
        )}
        {variantOptions && Object.keys(variantOptions).length > 0 && (
          <ProductVariantListSection
            register={register}
            handleSubmit={handleSubmit}
            getValues={getValues}
            setValue={setValue}
            variantOptionCombinations={variantOptionCombinations}
          />
        )}
      </Flex>
    </ContentContainer>
  );
}
