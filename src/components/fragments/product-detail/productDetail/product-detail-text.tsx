import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { ProductDetailVariant } from './product-detail-variant';

export function ProductDetailText() {
  return (
    <>
      <Flex width={'60%'} flexDir={'column'}>
        <Flex flexDir={'column'} gap={'.5rem'}>
          <Text fontSize={'2xl'}>SOFA PALING MANTAP</Text>
          <Text
            width={'full'}
            backgroundColor={'rgba(248, 248, 248, 1)'}
            padding={'1rem'}
            fontWeight={'bold'}
            letterSpacing={'wide'}
            fontSize={'3xl'}
            borderRadius={'.2rem'}
          >
            Rp. 1.000.000
          </Text>
        </Flex>
        <ProductDetailVariant minimum_order={5} variants={variants} />
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

const variants = [
  {
    variantName: 'Variant1',
    subVariants: ['subVariant1', 'subVariant2', 'subVariant3', 'subVariant4'],
  },
  {
    variantName: 'Variant2',
    subVariants: [
      'subVariant1',
      'subVariant2',
      'subVariant3',
      'subVariant4',
      'subVariant5',
      'subVariant6',
      'subVariant7',
      'subVariant8',
    ],
  },
];
