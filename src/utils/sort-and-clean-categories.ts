import { Category } from '@/types/product-type';

export function sortAndCleanCategories(categories: Category[]): Category[] {
  categories.sort((a, b) => a.label.localeCompare(b.label));
  categories.forEach((category) => {
    if (category.children && category.children.length === 0) {
      delete category.children;
    } else if (category.children) {
      category.children = sortAndCleanCategories(category.children);
    }
  });

  return categories;
}
