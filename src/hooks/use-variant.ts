import { VariantCombinationFormType, VariantUIType } from '@/types/types';
import { generateVariantCombinations } from '@/utils/generate-variant-combination';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export function useVariants() {
  const [variants, setVariants] = useState<VariantUIType[]>([]);
  const [variantOptions, setVariantOptions] = useState<
    Record<string, string[]>
  >({});

  const variantOptionCombinations = useMemo(() => {
    return generateVariantCombinations(variantOptions);
  }, [variantOptions]);

  const { register, handleSubmit, getValues, setValue } =
    useForm<VariantCombinationFormType>({
      defaultValues: {
        variants: variantOptionCombinations.map(() => ({
          name: '',
          is_active: true,
          price: 0,
          stock: 0,
          sku: '',
          weight: 0,
        })),
      },
    });

  return {
    variants,
    setVariants,
    variantOptions,
    setVariantOptions,
    variantOptionCombinations,
    register,
    handleSubmit,
    getValues,
    setValue,
  };
}
