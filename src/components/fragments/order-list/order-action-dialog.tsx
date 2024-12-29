import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioCardItem, RadioCardRoot } from '@/components/ui/radio-card';
import { orderTemplateSchema } from '@/validators/orders/order-template';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa6';
import { useEffect } from 'react';
import api from '@/networks/api';
import { useState } from 'react';

interface Props {
  openDialog: boolean;
  contact: boolean;
  setOpenDialog: (a: boolean) => void;
  setContact: (a: boolean) => void;
  delivery: boolean;
  phone: string | undefined;
  setDelivery: (a: boolean) => void;
  id: string;
  courier: string | null;
}

type data = {
  title: string;
  contain_message: string;
};

export default function OrderActionDialog({
  id,
  openDialog,
  setOpenDialog,
  setContact,
  setDelivery,
  delivery,
  contact,
  phone,
  courier,
}: Props) {
  const { control, watch, reset } = useForm({
    resolver: zodResolver(orderTemplateSchema),
  });
  const [data, setData] = useState<data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const value = watch('value');

  useEffect(() => {
    async function Init() {
      try {
        setLoading(true);
        const res = await api.GETFORMATEDTEMPLATE(id);
        if (!res) return;
        console.log(res.data.payload);
        setData(res.data.payload);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    Init();
  }, [id]);

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
                    {loading && (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="10rem"
                      >
                        <Spinner size="lg" />
                      </Box>
                    )}
                    {!loading &&
                      data?.map((item, index) => (
                        <RadioCardItem
                          onClick={() => setMessage(item.contain_message)}
                          key={index}
                          value={item.contain_message}
                          title={item.title}
                          label={item.contain_message}
                        />
                      ))}
                    {!loading && data?.length == 0 && (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="10rem"
                      >
                        <Text
                          color="#e6e6e6"
                          fontFamily="sans-serif"
                          fontWeight="semibold"
                        >
                          You haven't created template message yet
                        </Text>
                      </Box>
                    )}
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
              onClick={() => {
                window.open(
                  `https://wa.me/+62${phone?.slice(1, phone?.length)}?text=${encodeURIComponent(message)}`,
                  '_blank'
                );
                setOpenDialog(false);
                setContact(false);
                reset();
              }}
            >
              <Text>Whatsapp</Text>
              <FaWhatsapp />
            </Button>
          </DialogFooter>
          <DialogCloseTrigger
            onClick={() => {
              setOpenDialog(false);
              setContact(false);
              reset();
            }}
          />
        </DialogContent>
      )}
      {delivery && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tracking Reciept</DialogTitle>
          </DialogHeader>
          <DialogBody
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="semibold" fontFamily="sans-serif">
              {courier}
            </Text>
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
