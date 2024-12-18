import { Button } from '@/components/ui/button';
import { Product } from '@/types/product-type';
import { Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface Props {
  product: Product;
  selectedVariantOption: string[];
  setvalue: UseFormSetValue<Product>;
}

export function QuantityInput({
  product,
  selectedVariantOption,
  setvalue,
}: Props) {
  const [quantity, setQuantity] = useState<number>(product.minimum_order);

  useEffect(() => {
    setvalue('checkout_quantity', quantity);
  }, [quantity, setvalue]);

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
      setQuantity(0);
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
