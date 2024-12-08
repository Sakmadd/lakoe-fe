import { VariantType } from '@/types/types';
import { Button, Flex, Separator, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface productDetailVariantProps {
  variants: VariantType[];
}

export function ProductDetailVariant({ variants }: productDetailVariantProps) {
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
            <Text padding={'.5rem'}>{variant.name}</Text>
            <Flex gap={'.2rem'} flexWrap={'wrap'}>
              {variant.options!.map((option) => (
                <Button
                  variant={
                    selectedSubVariants.includes(
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
