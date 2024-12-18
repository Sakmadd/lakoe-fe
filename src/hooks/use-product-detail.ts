import { Product } from '@/types/product-type';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  product: Product;
  selectedVariantOption: string[];
}

export function useProductDetail({ product, selectedVariantOption }: Props) {
  const [preparedProduct, setPreparedProduct] = useState<Product>(product);
  const selectedCombination = useMemo(() => {
    const selectedValues = selectedVariantOption
      .map((option) => option.split(' - ')[1])
      .sort();

    return product.VariantOptionCombinations!.find((variant) => {
      const variantValues = variant.name.split(' - ').sort();
      return JSON.stringify(variantValues) === JSON.stringify(selectedValues);
    });
  }, [selectedVariantOption, product.VariantOptionCombinations]);

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
