/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductType } from '@/types/types';
import { Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FilterBar } from '../common/filter-bar';
import ProductList from './product-list';

interface Props {
  products: ProductType[];
  tabs_value: string;
  categories: { label: string; value: string }[];
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
          products={products}
        />
      </Tabs.Content>
    </>
  );
}
