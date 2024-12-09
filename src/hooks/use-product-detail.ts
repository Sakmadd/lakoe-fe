import { ProductType } from '@/types/types';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  product: ProductType;
  selectedVariantOption: string[];
}

export function useProductDetail({ product, selectedVariantOption }: Props) {
  const [preparedProduct, setPreparedProduct] = useState<ProductType>(product);
  const selectedCombination = useMemo(() => {
    const selectedValues = selectedVariantOption
      .map((option) => option.split(' - ')[1])
      .sort();

    return product.variant_option_combinations!.find((variant) => {
      const variantValues = variant.name.split(' - ').sort();
      return JSON.stringify(variantValues) === JSON.stringify(selectedValues);
    });
  }, [selectedVariantOption, product.variant_option_combinations]);

  useEffect(() => {
    if (selectedCombination) {
      setPreparedProduct({
        ...product,
        sku: selectedCombination.sku,
        stock: selectedCombination.stock,
        price: selectedCombination.price,
        weight: selectedCombination.weight,
      });
    }
  }, [selectedCombination, product]);

  return { preparedProduct, selectedCombination };
}
