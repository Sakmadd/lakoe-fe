import { Button } from '@/components/ui/button';
import { ProductType } from '@/types/types';
import { Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  product: ProductType;
  selectedVariantOption: string[];
}

export function QuantityInput({ product, selectedVariantOption }: Props) {
  const [quantity, setQuantity] = useState<number>(product.minimum_order);

  useEffect(() => {
    setQuantity(product.minimum_order);
  }, [selectedVariantOption, product.minimum_order]);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, product.minimum_order));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setQuantity(0); // Allow clearing input temporarily
      return;
    }

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setQuantity(
        Math.min(Math.max(numericValue, product.minimum_order), product.stock)
      );
    }
  };

  const handleBlur = () => {
    if (quantity < product.minimum_order) {
      setQuantity(product.minimum_order);
    }
    if (quantity > product.stock) {
      setQuantity(product.stock);
    }
  };

  return (
    <>
      <Flex marginY={'1rem'} alignItems={'center'} gap={'2rem'}>
        <Text padding={'.5rem'} minWidth={'7rem'}>
          Quantity
        </Text>
        <Flex gap={'.2rem'} alignItems={'center'}>
          <Button
            variant={'outline'}
            onClick={handleDecrement}
            disabled={
              quantity <= product.minimum_order ||
              selectedVariantOption.length < 2
            }
          >
            -
          </Button>
          <Input
            value={quantity}
            textAlign={'center'}
            width={'4rem'}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={selectedVariantOption.length < 2}
          />
          <Button
            variant={'outline'}
            onClick={handleIncrement}
            disabled={
              quantity >= product.stock || selectedVariantOption.length < 2
            }
          >
            +
          </Button>
          <Text paddingX={'1rem'} fontSize={'sm'}>
            {product.stock} In Stock
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
