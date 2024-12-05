import { NumberInputField } from '@/components/ui/number-input';
import {
  Button,
  Flex,
  NumberInputRoot,
  Separator,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

type variantType = {
  variantName: string;
  subVariants: string[];
};

interface productDetailVariantProps {
  variants: variantType[];
  minimum_order: number;
}

export function ProductDetailVariant({
  variants,
  minimum_order,
}: productDetailVariantProps) {
  const [quantity, setQuantity] = useState<number>(minimum_order);
  const [selectedSubVariants, setSelectedSubVariants] = useState<string[]>([]);

  const handleSubVariantClick = (variantName: string, subVariant: string) => {
    const currentIndex = selectedSubVariants.findIndex((sv) =>
      sv.startsWith(`${variantName}:`)
    );
    if (currentIndex !== -1) {
      selectedSubVariants.splice(currentIndex, 1);
    }
    setSelectedSubVariants([
      ...selectedSubVariants,
      `${variantName}:${subVariant}`,
    ]);
  };

  return (
    <>
      {variants.map((variant) => (
        <>
          <Flex marginY={'1rem'} alignItems={'center'} gap={'2rem'}>
            <Text padding={'.5rem'}>{variant.variantName}</Text>
            <Flex gap={'.2rem'} flexWrap={'wrap'}>
              {variant.subVariants.map((subVariant) => (
                <Button
                  variant={
                    selectedSubVariants.includes(
                      `${variant.variantName}:${subVariant}`
                    )
                      ? 'solid'
                      : 'outline'
                  }
                  size={'sm'}
                  onClick={() =>
                    handleSubVariantClick(variant.variantName, subVariant)
                  }
                >
                  {subVariant}
                </Button>
              ))}
            </Flex>
          </Flex>
          <Separator />
        </>
      ))}
      <Flex marginY={'1rem'} alignItems={'center'} gap={'2rem'}>
        <Text padding={'.5rem'}>Quantity</Text>
        <Flex gap={'.2rem'}>
          <Button
            variant={'outline'}
            onClick={() =>
              quantity > minimum_order && setQuantity(quantity - 1)
            }
          >
            -
          </Button>
          <NumberInputRoot value={quantity.toString()}>
            <NumberInputField />
          </NumberInputRoot>
          <Button variant={'outline'} onClick={() => setQuantity(quantity + 1)}>
            +
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
