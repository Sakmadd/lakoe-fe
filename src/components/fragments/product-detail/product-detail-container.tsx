import { Toaster, toaster } from '@/components/ui/toaster';
import { useProductDetail } from '@/hooks/use-product-detail';
import { MainContent } from '@/layouts/mainContent';
import { Product } from '@/types/product-type';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProductDetailContent } from './product-content';
import { ProductSpecification } from './productDetail/product-specification';

interface Props {
  product: Product;
}

export function ProductDetailContainer({ product }: Props) {
  const navigate = useNavigate();
  const { handleSubmit, setValue } = useForm<Product>();
  const [selectedVariantOption, setSelectedVariantOption] = useState<string[]>(
    []
  );
  const { preparedProduct, selectedCombination } = useProductDetail({
    product,
    selectedVariantOption,
  });

  useEffect(() => {
    console.log(preparedProduct);
  });

  const onSubmit: SubmitHandler<Product> = (data) => {
    if (selectedVariantOption.length < preparedProduct.Variant!.length) {
      toaster.create({
        title: 'Select All Product Variants',
        description: `You must select all ${preparedProduct.Variant!.length} product variants before continuing.`,
        duration: 3000,
        type: 'error',
      });
      return;
    }

    const checkoutProduct = {
      ...preparedProduct,
      price: selectedCombination?.price || preparedProduct.price,
      sku: selectedCombination?.sku || preparedProduct.sku,
      stock: selectedCombination?.stock || preparedProduct.stock,
      weight: selectedCombination?.weight || preparedProduct.weight,
      selected_variant: selectedVariantOption,
      checkout_quantity: data.checkout_quantity,
      variant_option_combination_id: selectedCombination?.id,
    };

    delete checkoutProduct.Variant;
    delete checkoutProduct.VariantOptionCombinations;

    navigate('/checkout', { state: { checkoutProduct } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toaster />
        <MainContent>
          <Flex flexDir={'column'} gap={'1rem'}>
            <ProductDetailContent
              setvalue={setValue}
              selectedVariantOption={selectedVariantOption}
              setSelectedVariantOption={setSelectedVariantOption}
              product={preparedProduct}
            />
            <ProductSpecification product={preparedProduct} />
          </Flex>
        </MainContent>
      </form>
    </>
  );
}
