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
import { Field } from '@/components/ui/field';
import { VariantUIType } from '@/types/types';
import { Input } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { RiResetRightLine } from 'react-icons/ri';

interface Props {
  variantList: VariantUIType[];
  setVariantList: React.Dispatch<React.SetStateAction<VariantUIType[]>>;
}

export function AddVariantDialog({ variantList, setVariantList }: Props) {
  const [newVariantName, setNewVariantName] = useState('');

  function handleAddVariant() {
    if (!newVariantName.trim()) {
      alert('Variant name cannot be empty!');
      return;
    }

    const newVariant: VariantUIType = {
      id: Math.random().toString(),
      name: newVariantName,
      is_checked: false,
    };

    setVariantList([...variantList, newVariant]);

    setNewVariantName('');
  }

  return (
    <>
      {variantList.length < 3 && (
        <DialogRoot>
          <DialogTrigger asChild>
            <Button colorPalette="gray" variant="surface" borderRadius="full">
              <FaPlusCircle />
              Add Variant
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Variant</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <Field label="Add Variant" required>
                <Input
                  placeholder="Add Variant Name"
                  variant="outline"
                  value={newVariantName}
                  onChange={(e) => setNewVariantName(e.target.value)}
                />
              </Field>
            </DialogBody>

            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>

              <Button onClick={handleAddVariant}>Save</Button>
            </DialogFooter>

            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      )}
      {variantList.length >= 3 && (
        <Button
          colorPalette="gray"
          variant="surface"
          borderRadius="full"
          onClick={() => setVariantList([])}
        >
          <RiResetRightLine />
          Reset Variant
        </Button>
      )}
    </>
  );
}
