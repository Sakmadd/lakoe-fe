import { SellerProductListType } from '@/types/types';
import { useMemo } from 'react';

interface Props {
  products: SellerProductListType[];
  selectedCategory: string;
  selectedSort: string;
  searchInput: string;
}

export function useFilterProductContent({
  products,
  selectedCategory,
  selectedSort,
  searchInput,
}: Props): { filteredProducts: SellerProductListType[] } {
  const filteredProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.Category.value === selectedCategory.toLowerCase()
      );
    }

    if (searchInput) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (selectedSort === 'new' || selectedSort === '') {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (selectedSort === 'old') {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (selectedSort === 'price_high') {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'price_low') {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    return filteredProducts;
  }, [products, selectedCategory, selectedSort, searchInput]);

  return { filteredProducts };
}
