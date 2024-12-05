import { ProductType } from '@/types/types';
import { useMemo } from 'react';

interface Props {
  products: ProductType[];
  selectedCategory: string;
  selectedSort: string;
  searchInput: string;
}

export function useFilterProductContent({
  products,
  selectedCategory,
  selectedSort,
  searchInput,
}: Props): { filteredProducts: ProductType[] } {
  const filteredProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.value === selectedCategory.toLowerCase()
      );
    }

    if (searchInput) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (selectedSort === 'new' || selectedSort === '') {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (selectedSort === 'old') {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
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
