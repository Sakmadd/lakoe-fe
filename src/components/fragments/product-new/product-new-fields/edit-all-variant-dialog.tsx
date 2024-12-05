import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { VariantCombinationFormType } from '@/types/types';
import { Flex } from '@chakra-ui/react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { EditAllVariantsForm } from './global-form';
import { useState } from 'react';

interface Props {
  variantOptionCombinations: string[];
  getValues: UseFormGetValues<VariantCombinationFormType>;
  setValue: UseFormSetValue<VariantCombinationFormType>;
}

export function EditAllVariantCombinationsDialog({
  variantOptionCombinations,
  setValue,
}: Props) {
  const [fakeLoad, setFakeLoad] = useState(false);

  const handleApplyChanges = () => {
    setFakeLoad(true);
    const price = (document.getElementById('global-price') as HTMLInputElement)
      ?.value;
    const sku = (document.getElementById('global-sku') as HTMLInputElement)
      ?.value;
    const stock = (document.getElementById('global-stock') as HTMLInputElement)
      ?.value;
    const weight = (
      document.getElementById('global-weight') as HTMLInputElement
    )?.value;

    variantOptionCombinations.forEach((_, index) => {
      if (price) setValue(`variants.${index}.price`, Number(price));
      if (sku) setValue(`variants.${index}.sku`, sku);
      if (stock) setValue(`variants.${index}.stock`, Number(stock));
      if (weight) setValue(`variants.${index}.weight`, Number(weight));
    });

    setTimeout(() => {
      setFakeLoad(false);
    }, 100);
  };

  return (
    <>
      <DialogRoot size={'lg'}>
        <DialogTrigger asChild>
          <Button colorScheme="gray" variant="outline" borderRadius="full">
            <FaRegEdit />
            Edit All Variant
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit All Variant</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex width={'100%'} gap={'1rem'}>
              <EditAllVariantsForm />
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Done</Button>
            </DialogActionTrigger>
            <Button onClick={handleApplyChanges} loading={fakeLoad}>
              Apply To All Variants
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
