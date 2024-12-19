import { Variant } from '@/types/product-type';
import { Button, Flex, Separator, Text } from '@chakra-ui/react';
import { Fragment } from 'react/jsx-runtime';

interface productDetailVariantProps {
  variants: Variant[];
  setSelectedVariantOption: React.Dispatch<React.SetStateAction<string[]>>;
  selectedVariantOption: string[];
}

export function ProductDetailVariant({
  variants,
  setSelectedVariantOption,
  selectedVariantOption,
}: productDetailVariantProps) {
  const handleSubVariantClick = (variantName: string, subVariant: string) => {
    const currentIndex = selectedVariantOption.findIndex((sv) =>
      sv.startsWith(`${variantName} -`)
    );
    if (currentIndex !== -1) {
      selectedVariantOption.splice(currentIndex, 1);
    }
    setSelectedVariantOption([
      ...selectedVariantOption,
      `${variantName} - ${subVariant}`,
    ]);
  };

  return (
    <>
      {variants.map((variant) => (
        <Fragment key={variant.name}>
          <Flex alignItems={'center'}>
            <Flex
              marginY={'.5rem'}
              alignItems={'center'}
              key={variant.name}
              minWidth={'9rem'}
            >
              <Text padding={'.5rem'}>{variant.name}</Text>
            </Flex>
            <Flex gap={'.5rem'} flexWrap={'wrap'}>
              {variant.VariantOption!.map((option) => (
                <Button
                  key={option.id}
                  variant={
                    selectedVariantOption.includes(
                      `${variant.name} - ${option.name}`
                    )
                      ? 'solid'
                      : 'outline'
                  }
                  size={'sm'}
                  onClick={() =>
                    handleSubVariantClick(variant.name, option.name)
                  }
                >
                  {option.name}
                </Button>
              ))}
            </Flex>
          </Flex>

          <Separator />
        </Fragment>
      ))}
    </>
  );
}
