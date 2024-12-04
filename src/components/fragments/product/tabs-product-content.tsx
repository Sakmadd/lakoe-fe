import { useFilterProductContent } from '@/hooks/useFilterProductContent';
import { CategoryType, ProductType } from '@/types/types';
import { Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FilterBar } from '../common/filter-bar';
import ProductList from './product-list';

interface Props {
  products: ProductType[];
  tabs_value: string;
  categories: CategoryType[];
  sorts: { label: string; value: string }[];
}

export function TabsProductContent({
  products,
  tabs_value,
  categories,
  sorts,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const { filteredProducts } = useFilterProductContent({
    products,
    selectedCategory,
    selectedSort,
    searchInput,
  });

  return (
    <>
      <Tabs.Content value={tabs_value}>
        <ProductList
          filter={
            <FilterBar
              filterFor="Products"
              selectedFirstSort={selectedCategory}
              selectedSecondSort={selectedSort}
              setFirstSort={setSelectedCategory}
              setSecondSort={setSelectedSort}
              setSearchInput={setSearchInput}
              key={tabs_value}
              firstSort={categories}
              secondSort={sorts}
            />
          }
          products={filteredProducts}
        />
      </Tabs.Content>
    </>
  );
}
