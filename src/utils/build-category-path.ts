import { Category } from '@/types/product-type';

export function buildCategoryPath(
  categories: Category[],
  targetId: string
): string[] {
  const result: string[] = [];

  const findCategory = (
    categories: Category[],
    id: string
  ): Category | null => {
    for (const category of categories) {
      if (category.id === id) {
        return category;
      }

      if (Array.isArray(category.children) && category.children.length > 0) {
        const found = findCategory(category.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const category = findCategory(categories, targetId);

  if (category) {
    let currentCategory: Category | null = category;
    while (currentCategory) {
      result.unshift(currentCategory.label);
      if (currentCategory.parent_id) {
        currentCategory = findCategory(categories, currentCategory.parent_id);
      } else {
        break;
      }
    }
  }

  return result;
}
