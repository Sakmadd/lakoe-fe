import { CategoryType } from '@/types/types';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Category extends CategoryType {
  image: string;
}

interface Props {
  category: Category;
}

export function CategoryItem({ category }: Props) {
  return (
    <>
      <Box
        as={'li'}
        padding={'.5rem'}
        border={'1px solid rgb(234, 234, 234)'}
        width={'7.5rem'}
        _hover={{ shadow: 'sm' }}
        transition={'ease-in-out 200ms'}
      >
        <Link to={`/category/${category.id}`}>
          <Flex flexDir={'column'} alignItems={'center'}>
            <Image
              w={'5rem'}
              src={
                category.image
                  ? category.image
                  : 'https://down-id.img.susercontent.com/file/dcd61dcb7c1448a132f49f938b0cb553@resize_w320_nl.webp'
              }
            />
            <Box>
              <Text textAlign={'center'} fontSize={'sm'}>
                {category.label}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Box>
    </>
  );
}
