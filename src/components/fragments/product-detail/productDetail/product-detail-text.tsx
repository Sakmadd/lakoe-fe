import { ProductType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { ProductDetailVariant } from './product-detail-variant';
import { QuantityInput } from './quantity-input';

interface Props {
  product: ProductType;
  setSelectedVariantOption: React.Dispatch<React.SetStateAction<string[]>>;
  selectedVariantOption: string[];
}

export function ProductDetailText({
  product,
  selectedVariantOption,
  setSelectedVariantOption,
}: Props) {
  return (
    <Flex width={'60%'} flexDir={'column'}>
      <Flex flexDir={'column'} gap={'.5rem'}>
        <Text fontSize={'2xl'}>{product.name}</Text>
        <Text
          width={'full'}
          backgroundColor={'rgba(248, 248, 248, 1)'}
          padding={'1rem'}
          fontWeight={'semibold'}
          letterSpacing={'wide'}
          fontSize={'3xl'}
          borderRadius={'.2rem'}
        >
          {formatRupiah(product.price)}
        </Text>
      </Flex>
      {product.variants && (
        <ProductDetailVariant
          selectedVariantOption={selectedVariantOption}
          setSelectedVariantOption={setSelectedVariantOption}
          variants={product.variants}
        />
      )}
      <QuantityInput
        product={product}
        selectedVariantOption={selectedVariantOption}
      />
      <Spacer />
      <Flex gap={'1rem'}>
        <Button variant="outline" size={'2xl'} width={'50%'}>
          Add to cart
        </Button>
        <Button variant="solid" size={'2xl'} width={'50%'} type="submit">
          Buy now
        </Button>
      </Flex>
    </Flex>
  );
}
