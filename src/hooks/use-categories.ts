import api from '@/networks/api';
import { Category } from '@/types/product-type';
import { sortAndCleanCategories } from '@/utils/sort-and-clean-categories';
import { useEffect, useState } from 'react';

export function useCategories() {
  const [, setCategories] = useState<Category[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [currentLevels, setCurrentLevels] = useState<Category[][]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.GET_ALL_CATEGORIES();
        setCategories(sortAndCleanCategories(response));
        setCurrentLevels([sortAndCleanCategories(response)]);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

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
  };
}
