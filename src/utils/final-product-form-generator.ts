import {
  ProductType,
  VariantCombinationFormType,
  VariantUIType,
} from '@/types/types';
import { variantsMerger } from './variants-merger';
import { UseFormGetValues } from 'react-hook-form';

interface Props {
  data: ProductType;
  images: File[];
  variantsHooks: {
    variants: VariantUIType[];
    variantOptions: Record<string, string[]>;
    getValues: UseFormGetValues<VariantCombinationFormType>;
  };
}

export function finalProductFormGenerator({
  data,
  images,
  variantsHooks,
}: Props) {
  const body = {
    ...data,
    url_name: data.url,
    is_active: true,
    images: images,
    Variant: variantsMerger(
      variantsHooks.variants,
      variantsHooks.variantOptions
    ),
    VariantOptionCombination: variantsHooks.getValues().variants,
  };

  console.log(body);

  const formData = new FormData();

  formData.append('name', body.name);
  formData.append('url_name', body.url_name);
  formData.append('category_id', body.category_id);
  formData.append('description', body.description);
  formData.append('minimum_order', body.minimum_order.toString());
  formData.append('price', body.price.toString());
  formData.append('stock', body.stock.toString());
  formData.append('sku', body.sku);
  formData.append('weight', body.weight.toString());
  formData.append('length', body.length.toString());
  formData.append('width', body.width.toString());
  formData.append('height', body.height.toString());
  formData.append('is_active', body.is_active.toString());

  body.images.forEach((file) => {
    formData.append('Images', file);
  });

  formData.append('Variant', JSON.stringify(Object(body.Variant)));

  formData.append(
    'VariantOptionCombination',
    JSON.stringify(body.VariantOptionCombination)
  );

  return formData;
}
