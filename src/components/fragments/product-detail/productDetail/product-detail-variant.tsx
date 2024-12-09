import { VariantType } from '@/types/types';
import { Button, Flex, Separator, Text } from '@chakra-ui/react';

interface productDetailVariantProps {
  variants: VariantType[];
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
      sv.startsWith(`${variantName}:`)
    );
    if (currentIndex !== -1) {
      selectedVariantOption.splice(currentIndex, 1);
    }
    setSelectedVariantOption([
      ...selectedVariantOption,
      `${variantName}:${subVariant}`,
    ]);
  };

  return (
    <>
      {variants.map((variant) => (
        <>
          <Flex alignItems={'center'}>
            <Flex
              marginY={'1rem'}
              alignItems={'center'}
              key={variant.name}
              minWidth={'9rem'}
            >
              <Text padding={'.5rem'}>{variant.name}</Text>
            </Flex>
            <Flex gap={'.2rem'} flexWrap={'wrap'}>
              {variant.options!.map((option) => (
                <Button
                  key={option.id}
                  variant={
                    selectedVariantOption.includes(
                      `${variant.name}:${option.name}`
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
        </>
      ))}
    </>
  );
}
