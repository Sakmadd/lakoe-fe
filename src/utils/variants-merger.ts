import { VariantType } from '@/types/types';

export function variantsMerger(
  variants: { id: string; name: string; is_checked: boolean }[],
  variantOption: Record<string, string[]>
): VariantType[] {
  const imageUrl = '';

  return variants
    .filter((variant) => variant.is_checked)
    .map((variant) => ({
      id: variant.id,
      name: variant.name,
      VariantOption: variantOption[variant.name]?.map((option, index) => ({
        id: (index + 1).toString(),
        name: option,
        alt: option,
        src: imageUrl,
      })),
    }));
}
