import { Box, Image, Text } from '@chakra-ui/react';
import { OrderActionButton } from './order-action-button';
import { OrderStatus } from './order-status';
import { formatRupiah } from '@/utils/format-rp';
import { OrderType } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogCloseTrigger,
} from '@/components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderTemplateSchema } from '@/validators/orders/order-template';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa6';
// import { useSettTempMessage } from '../settings/settings-template-message/settings-template-message-hooks/settings-template-message';

interface Props {
  order: OrderType;
}

export default function OrderItem({ order }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [contact, setContact] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const navigate = useNavigate();
  // const { templateMessage } = useSettTempMessage();

  const templateMessage = [
    {
      id: 1,
      title: 'Sapa pelanggan',
      contain_message: 'Anjing lu',
    },
    {
      id: 2,
      title: 'Ucapkan Selamat Ulang Tahun',
      contain_message: 'Selamat anjing',
    },
  ];

  const { control, watch } = useForm({
    resolver: zodResolver(orderTemplateSchema),
  });

  const value = watch('value');
  console.log(value);

  return (
    <Box
      border="0.1rem solid #e6e6e6"
      borderRadius="0.5rem"
      onClick={() => navigate(`/orders/${order.id}`)}
      cursor="pointer"
    >
      <Box display="flex" justifyContent="space-between" padding="0.8rem">
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <OrderStatus status={order.status} />
          <Text color="grey" fontSize="0.8rem" fontFamily="sans-serif">
            {order.invoice}
          </Text>
        </Box>
        <OrderActionButton
          order={order}
          setContact={setContact}
          setDelivery={setDelivery}
          setOpenDialog={setOpenDialog}
        />
      </Box>
      <Box
        borderTop="0.1rem solid #e6e6e6"
        display="flex"
        justifyContent="space-between"
        onClick={() => {
          navigate(`/orders/${order.id}`);
        }}
        cursor={'pointer'}
      >
        <Box padding="0.5rem" display="flex" gap="0.5rem">
          <Image
            width="4rem"
            borderRadius=".3rem"
            objectFit="cover"
            height="4rem"
            border="0.1rem solid #e6e6e6"
            src={order.image.src}
            alt={order.image.alt}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="0.3rem"
          >
            <Text
              fontWeight="semibold"
              fontSize="0.8rem"
              fontFamily="sans-serif"
            >
              {order.name}
            </Text>
            <Text
              fontWeight="light"
              fontSize="0.7rem"
              color="gray"
              fontFamily="sans-serif"
            >
              {order.quantity} Items
            </Text>
          </Box>
        </Box>
        <Box
          padding="0.5rem 1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text fontSize="0.8rem" color="gray" fontFamily="sans-serif">
            Total Spending
          </Text>
          <Text
            fontSize="0.8rem"
            color="black"
            fontFamily="sans-serif"
            fontWeight="semibold"
          >
            {formatRupiah(order.total_price)}
          </Text>
        </Box>
      </Box>
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
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => {
                        field.onChange(value);
                        console.log(value);
                      }}
                      display="flex"
                      flexDirection="column"
                      gap="1rem"
                    >
                      {templateMessage?.map((data) => (
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          padding="1rem"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          border="1px solid #e6e6e6"
                          borderRadius="1rem"
                        >
                          <Box display="flex" flexDirection="column" gap="1rem">
                            <Text fontWeight="bold">{data.title}</Text>
                            <Text>{data.contain_message}</Text>
                          </Box>
                          <Radio value={data.contain_message}></Radio>
                        </Box>
                      ))}
                    </RadioGroup>
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
            <DialogCloseTrigger onClick={() => setOpenDialog(false)} />
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
          </DialogContent>
        )}
      </DialogRoot>
    </Box>
  );
}
