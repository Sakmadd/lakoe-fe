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
import { useProduct } from '@/hooks/use-product';
import { SellerProductListType } from '@/types/types';
import { Group, Input, InputAddon } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

interface Props {
  edit: 'price' | 'stock';
  trigerElement: ReactNode;
  product: SellerProductListType;
  leftAddon?: string;
  rightAddon?: string;
  placeholder?: string;
  label: string;
}

export function EditSingleModal({
  trigerElement,
  product,
  leftAddon,
  rightAddon,
  placeholder,
  label,
  edit,
}: Props) {
  const { onEditPrice, onEditStock } = useProduct();
  const [input, setInput] = useState<number | ''>('');
  const [isSaving, setIsSaving] = useState(false);
  const [open, setOpen] = useState(false);

  async function saveHandler(id: string, amount: string[]) {
    setIsSaving(true);
    try {
      if (edit === 'price') {
        onEditPrice(id, amount);
      } else {
        onEditStock(id, amount);
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DialogRoot open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{trigerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field label={label} required color={'gray'}>
            <Group attached width="100%">
              {leftAddon && <InputAddon>{leftAddon}</InputAddon>}
              <Input
                placeholder={placeholder}
                type="number"
                min={0}
                value={input}
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value === '' ? '' : Number(value));
                }}
              />
              {rightAddon && <InputAddon>{rightAddon}</InputAddon>}
            </Group>
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" disabled={isSaving}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            loading={isSaving}
            onClick={() => {
              if (input !== '') {
                saveHandler(product.id, [input.toString()]);
              }
            }}
          >
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
