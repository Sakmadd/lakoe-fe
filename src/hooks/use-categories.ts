import api from '@/networks/api';
import { Category } from '@/types/product-type';
import { sortAndCleanCategories } from '@/utils/sort-and-clean-categories';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useCategories() {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [currentLevels, setCurrentLevels] = useState<Category[][]>([]);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: api.GET_ALL_CATEGORIES,
  });

  useEffect(() => {
    if (!isLoading && !isError && categories) {
      setCurrentLevels([sortAndCleanCategories(categories)]);
    }
  }, [categories, isLoading, isError]);

  const handleCategoryClick = (category: Category, levelIndex: number) => {
    setSelectedPath((prev) => {
      const newPath = prev.slice(0, levelIndex);
      return [...newPath, category.label];
    });

    setCurrentLevels((prevLevels) => {
      const newLevels = prevLevels.slice(0, levelIndex + 1);
      if (category.children) {
        newLevels.push(category.children);
      }
      return newLevels;
    });

    if (!category.children) {
      setSelectedId(category.id);
      setDropdownVisible(false);
    }
  };

  const getSelectedValue = () => selectedPath.join(' > ');

  return {
    selectedId,
    isDropdownVisible,
    currentLevels,
    selectedPath,
    setDropdownVisible,
    handleCategoryClick,
    getSelectedValue,
    isLoading,
    isError,
    categories,
  };
}
