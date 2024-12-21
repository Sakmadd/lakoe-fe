import { Category } from '@/types/product-type';

export function sortAndCleanCategories(categories: Category[]): Category[] {
  categories.sort((a, b) => a.label.localeCompare(b.label));
  const othersCategories = categories.filter((category) =>
    category.id.startsWith('z-cat')
  );
  const filteredCategories = categories.filter(
    (category) => !category.id.startsWith('z-cat')
  );
  filteredCategories.forEach((category) => {
    if (category.children && category.children.length > 0) {
      category.children = sortAndCleanCategories(category.children);
    } else {
      delete category.children;
    }
  });
  othersCategories.forEach((category) => {
    delete category.children;
  });
  return [...filteredCategories, ...othersCategories];
}
