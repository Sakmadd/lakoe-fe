import { Box, Button } from '@chakra-ui/react';

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
  const handlerCanceledOrder = () => console.log('Handling canceled order...');

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

  return (
    <>
      <Box display="flex" alignItems="center">
        <Button
          backgroundColor="transparent"
          border="1px solid #e6e6e6"
          color="black"
          borderRadius="2rem"
          fontSize="0.8rem"
          height="2rem"
          onClick={handler}
        >
          {buttonText}
        </Button>
      </Box>
    </>
  );
}
