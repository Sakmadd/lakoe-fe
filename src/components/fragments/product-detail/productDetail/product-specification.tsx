import { Flex, Text } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import { Product } from '@/types/product-type';
import { ProductCategoryText } from './product-category-text';

interface Props {
  product: Product;
}

export function ProductSpecification({ product }: Props) {
  return (
    <>
      <ContentContainer>
        <Flex flexDir={'column'} padding={'1rem'} gap={'2rem'}>
          <Text
            width={'full'}
            backgroundColor={'rgba(248, 248, 248, 1)'}
            padding={'1rem'}
            fontWeight={'semibold'}
            letterSpacing={'wide'}
            fontSize={'1xl'}
            borderRadius={'.2rem'}
          >
            Product Specification
          </Text>
          <Flex gap={'2rem'}>
            <Flex paddingX={'1rem'} flexDir={'column'} gap={'1rem'}>
              <Text color={'grey'}>Category</Text>
              <Text color={'grey'}>Stock</Text>
              <Text color={'grey'}>Weight</Text>
              <Text color={'grey'}>Length</Text>
              <Text color={'grey'}>Width</Text>
              <Text color={'grey'}>Height</Text>
              <Text color={'grey'}>SKU</Text>
            </Flex>
            <Flex paddingX={'1rem'} flexDir={'column'} gap={'1rem'}>
              <ProductCategoryText id={product.category_id} />
              <Text>{product.stock}</Text>
              <Text>{product.weight} Gr</Text>
              <Text>{product.length} Cm</Text>
              <Text>{product.width} Cm</Text>
              <Text>{product.height} Cm</Text>
              <Text>{product.sku}</Text>
            </Flex>
          </Flex>
          <Flex flexDir={'column'} gap={'1rem'}>
            <Text
              width={'full'}
              backgroundColor={'rgba(248, 248, 248, 1)'}
              padding={'1rem'}
              fontWeight={'semibold'}
              letterSpacing={'wide'}
              fontSize={'1xl'}
              borderRadius={'.2rem'}
            >
              Product Description
            </Text>
            <Text paddingX={'1rem'}>{product.description}</Text>
          </Flex>
        </Flex>
      </ContentContainer>
    </>
  );
}
