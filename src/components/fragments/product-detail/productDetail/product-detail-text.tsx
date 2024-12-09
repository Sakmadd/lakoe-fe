import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { ProductDetailVariant } from './product-detail-variant';
import { ProductType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import {
  NumberInputField,
  NumberInputRoot,
} from '@/components/ui/number-input';
import { useEffect, useState } from 'react';

interface Props {
  product: ProductType;
}

export function ProductDetailText({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(product.minimum_order);
  const [selectedVariantOption, setSelectedVariantOption] = useState<string[]>(
    []
  );

  useEffect(() => {
    console.log(selectedVariantOption);
  });

  return (
    <>
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
        <Flex marginY={'1rem'} alignItems={'center'} gap={'2rem'}>
          <Text padding={'.5rem'} minWidth={'7rem'}>
            Quantity
          </Text>
          <Flex gap={'.2rem'}>
            <Button
              variant={'outline'}
              onClick={() =>
                quantity > product.minimum_order && setQuantity(quantity - 1)
              }
            >
              -
            </Button>
            <NumberInputRoot value={quantity.toString()}>
              <NumberInputField />
            </NumberInputRoot>
            <Button
              variant={'outline'}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </Flex>
        </Flex>
        <Spacer />
        <Flex gap={'1rem'}>
          <Button variant="outline" size={'2xl'} width={'50%'}>
            Add to cart
          </Button>
          <Button variant="solid" size={'2xl'} width={'50%'}>
            Buy now
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
