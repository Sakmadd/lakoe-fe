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
import { Input } from '@chakra-ui/react';
import { useState } from 'react';
import { VariantOptionType } from '@/types/types';

interface Props {
  variantId: string;
  onAddOption: (variantId: string, newOption: VariantOptionType) => void;
}

export function AddVariantOptionDialog({ variantId, onAddOption }: Props) {
  const [newOptionName, setNewOptionName] = useState('');

  function handleAddOption() {
    if (!newOptionName.trim()) {
      alert('Option name cannot be empty!');
      return;
    }

    const newOption: VariantOptionType = {
      id: Math.random().toString(),
      name: newOptionName,
    };

    onAddOption(variantId, newOption);
    setNewOptionName('');
  }

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="surface">Add Option</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Option</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Field label="Option Name" required>
            <Input
              placeholder="Enter Option Name"
              value={newOptionName}
              onChange={(e) => setNewOptionName(e.target.value)}
            />
          </Field>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleAddOption}>Save</Button>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
