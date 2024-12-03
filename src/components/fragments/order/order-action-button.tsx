import { Box, Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  order: {
    id: number;
    name: string;
    status: string;
    invoice: string;
  };
}

export function OrderActionButton({ order }: Props) {
  const handlerNewOrder = () => console.log('Processing the order...');
  const handlerUnpaidOrder = () =>
    console.log('Contacting customer for payment...');
  const handlerReadyOrder = () => console.log('Informing customer...');
  const handlerDeliveryOrder = () => console.log('Tracking shipment...');
  const handlerCompletedOrder = () => console.log('Contacting customer...');
  const handlerCanceledOrder = () => {
    console.log('Handling canceled order...');
  };

  const actionMap: Record<string, { handler: () => void; buttonText: string }> =
    {
      new: { handler: handlerNewOrder, buttonText: 'Process The Order' },
      unpaid: { handler: handlerUnpaidOrder, buttonText: 'Contact Customer' },
      ready: { handler: handlerReadyOrder, buttonText: 'Inform Customer' },
      delivery: { handler: handlerDeliveryOrder, buttonText: 'Track Shipment' },
      completed: {
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
