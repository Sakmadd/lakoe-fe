import { Field } from '@/components/ui/field';
import { useCategories } from '@/hooks/use-categories';
import { ProductType } from '@/types/types';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { GrNext } from 'react-icons/gr';

interface Props {
  setValue: UseFormSetValue<ProductType>;
}

export default function CategoryInput({ setValue }: Props) {
  const {
    currentLevels,
    getSelectedValue,
    handleCategoryClick,
    isDropdownVisible,
    selectedPath,
    setDropdownVisible,
    selectedId,
  } = useCategories();

  useEffect(() => {
    if (!selectedId) return;
    setValue('category_id', selectedId);
  }, [selectedId, setValue]);

  return (
    <Box position="relative">
      <Field label="Category" required width={'100%'} color={'gray'}>
        <Input
          placeholder="Select Category"
          value={getSelectedValue()}
          onClick={() => setDropdownVisible((prev) => !prev)}
          cursor="pointer"
        />
      </Field>
      <AnimatePresence>
        {isDropdownVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Flex
              position="absolute"
              left="0"
              w="full"
              bg="white"
              boxShadow="sm"
              borderRadius="sm"
              zIndex={1000}
              overflowX="hidden"
              maxHeight={'220px'}
            >
              {currentLevels.map((level, levelIndex) => (
                <Flex
                  flexDir={'column'}
                  gap={'.2rem'}
                  key={levelIndex}
                  w="33%"
                  p={2}
                >
                  {level.map((category) => (
                    <Box
                      key={category.id}
                      p={1}
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => handleCategoryClick(category, levelIndex)}
                      bg={
                        selectedPath[levelIndex] === category.label
                          ? 'blackAlpha.100'
                          : 'transparent'
                      }
                      _hover={{ bg: 'blackAlpha.200' }}
                    >
                      <Flex justify="space-between" align="center">
                        <Text>{category.label}</Text>
                        {category.children && <GrNext />}
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              ))}
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
