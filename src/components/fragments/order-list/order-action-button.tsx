import { OrderItemTypeAPI } from '@/types/types';
import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  order: OrderItemTypeAPI;
  setContact: (a: boolean) => void;
  setDelivery: (a: boolean) => void;
  setOpenDialog: (a: boolean) => void;
  setId: (a: string) => void;
  setPhone: (a: string) => void;
  setCourier: (a: string | null) => void;
}

export function OrderActionButton({
  order,
  setPhone,
  setContact,
  setDelivery,
  setOpenDialog,
  setCourier,
  setId,
}: Props) {
  const navigate = useNavigate();
  const handlerNewOrder = () => {
    navigate(`/orders/${order.invoice_id}`);
    console.log('Processing the order...');
  };
  const handlerUnpaidOrder = () => {
    setId(order.invoice_id);
    setPhone(order.phone);
    setOpenDialog(true);
    setContact(true);
    console.log('Contacting customer for payment...');
  };
  const handlerReadyOrder = () => {
    setId(order.invoice_id);
    setPhone(order.phone);
    setOpenDialog(true);
    setContact(true);
    console.log('Informing customer...');
  };
  const handlerDeliveryOrder = () => {
    setOpenDialog(true);
    setDelivery(true);
    setCourier(order?.courier?.waybill_id);
    console.log('Tracking shipment...');
  };
  const handlerCompletedOrder = () => {
    setId(order.invoice_id);
    setPhone(order.phone);
    setOpenDialog(true);
    setContact(true);
    console.log('Contacting customer...');
  };
  const handlerCanceledOrder = () => {
    setId(order.invoice_id);
    setPhone(order.phone);
    setOpenDialog(true);
    setContact(true);
    console.log('Handling canceled order...');
  };

  const actionMap: Record<string, { handler: () => void; buttonText: string }> =
    {
      new_order: { handler: handlerNewOrder, buttonText: 'Process The Order' },
      unpaid: { handler: handlerUnpaidOrder, buttonText: 'Contact Customer' },
      ready_to_ship: {
        handler: handlerReadyOrder,
        buttonText: 'Contact Customer',
      },
      on_delivery: {
        handler: handlerDeliveryOrder,
        buttonText: 'Track Shipment',
      },
      done: {
        handler: handlerCompletedOrder,
        buttonText: 'Contact Customer',
      },
      canceled: {
        handler: handlerCanceledOrder,
        buttonText: 'Contact Customer',
      },
    };

  const { handler, buttonText } = actionMap[order.status] || {
    handler: () => console.log('No action defined for this status'),
    buttonText: 'No Action',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handler();
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Button
          _hover={{ backgroundColor: '#e6e6e6' }}
          backgroundColor="transparent"
          border="1px solid #e6e6e6"
          color="black"
          borderRadius="2rem"
          fontSize="0.8rem"
          height="2rem"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </Box>
    </>
  );
}
