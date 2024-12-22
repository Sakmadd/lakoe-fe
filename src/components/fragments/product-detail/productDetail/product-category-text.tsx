import { useCategories } from '@/hooks/use-categories';
import { buildCategoryPath } from '@/utils/build-category-path';
import { Box, Flex, Text } from '@chakra-ui/react';
import { GrNext } from 'react-icons/gr';

interface Props {
  id: string;
}

export function ProductCategoryText({ id }: Props) {
  const { categories } = useCategories();

  if (!categories) {
    return <Text>Category Not Bound</Text>;
  }
  const category = buildCategoryPath(categories, id);

  return (
    <Flex align="center">
      {category.map((cat, index) => (
        <Flex key={cat} align="center">
          <Text>{cat}</Text>
          {index < category.length - 1 && (
            <Box paddingX={'1rem'}>
              <GrNext />
            </Box>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
