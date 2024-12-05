import { CheckboxCard } from '@/components/ui/checkbox-card';
import { VariantUIType } from '@/types/types';

interface Props {
  variantlist: VariantUIType[];
  setVariantList: React.Dispatch<React.SetStateAction<VariantUIType[]>>;
  variant: VariantUIType;
}

export function VariantCheckbox({
  variant,
  variantlist,
  setVariantList,
}: Props) {
  function handleChecked(isChecked: boolean) {
    const newVariantList: VariantUIType[] = variantlist.map((singleVariant) =>
      singleVariant.id === variant.id
        ? { ...singleVariant, is_checked: isChecked }
        : singleVariant
    );

    setVariantList(newVariantList);
  }

  return (
    <CheckboxCard
      cursor="pointer"
      variant="surface"
      maxWidth="150px"
      label={variant.name}
      key={variant.id}
      value={variant.name}
      checked={variant.is_checked}
      onCheckedChange={() => handleChecked(!variant.is_checked)}
    />
  );
}
