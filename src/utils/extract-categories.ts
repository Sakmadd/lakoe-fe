import { CategoryType, SellerProductListType } from '@/types/types';

export function extractCategories(
  products: SellerProductListType[]
): CategoryType[] {
  const categories = products.map((product) => product.Category);

  const uniqueCategories = categories.filter(
    (category, index, self) =>
      self.findIndex((cat) => cat.id === category.id) === index
  );

  return uniqueCategories;
}
