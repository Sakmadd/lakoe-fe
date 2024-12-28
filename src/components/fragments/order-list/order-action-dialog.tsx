import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogFooter,
  DialogCloseTrigger,
} from '@/components/ui/dialog';
import { orderTemplateSchema } from '@/validators/orders/order-template';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa6';
import { RadioCardRoot, RadioCardItem } from '@/components/ui/radio-card';

interface Props {
  openDialog: boolean;
  contact: boolean;
  setOpenDialog: (a: boolean) => void;
  setContact: (a: boolean) => void;
  delivery: boolean;
  setDelivery: (a: boolean) => void;
}

export default function OrderActionDialog({
  openDialog,
  setOpenDialog,
  setContact,
  setDelivery,
  delivery,
  contact,
}: Props) {
  const { control, watch } = useForm({
    resolver: zodResolver(orderTemplateSchema),
  });

  const items = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const value = watch('value');

  return (
    <DialogRoot open={openDialog}>
      {contact && (
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Select message to send</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <RadioCardRoot
                    colorPalette="blue"
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                  >
                    {items.map((item) => (
                      <RadioCardItem
                        key={item.value}
                        value={item.value}
                        label={item.label}
                      />
                    ))}
                  </RadioCardRoot>
                )}
              />
            </form>
          </DialogBody>
          <DialogFooter>
            <Button
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              colorPalette="green"
              disabled={value ? false : true}
            >
              <Text>Whatsapp</Text>
              <FaWhatsapp />
            </Button>
          </DialogFooter>
          <DialogCloseTrigger
            onClick={() => {
              setOpenDialog(false);
              setContact(false);
            }}
          />
        </DialogContent>
      )}
      {delivery && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tracking Reciept</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>Tracking</Text>
          </DialogBody>
          <DialogCloseTrigger
            onClick={() => {
              setOpenDialog(false);
              setDelivery(false);
            }}
          />
        </DialogContent>
      )}
    </DialogRoot>
  );
}
