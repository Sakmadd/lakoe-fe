import { useState, useMemo, useEffect } from 'react';
import { VariantUIType } from '@/types/types';
import { generateVariantCombinations } from '@/utils/generate-variant-combination';

export function useVariants() {
  const [variants, setVariants] = useState<VariantUIType[]>([]);
  const [variantOptions, setVariantOptions] = useState<
    Record<string, string[]>
  >({});

  const variantOptionCombinations = useMemo(() => {
    return generateVariantCombinations(variantOptions);
  }, [variantOptions]);

  useEffect(() => {
    console.log('variants', variants);
    console.log(
      'variant options',
      Object.values(variantOptions).map((option) => option)
    );
    console.log('variant options combinations', variantOptionCombinations);
  }, [variantOptions, variantOptionCombinations, variants]);

  return {
    variants,
    setVariants,
    variantOptions,
    setVariantOptions,
    variantOptionCombinations,
  };
}
