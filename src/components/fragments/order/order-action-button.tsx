import { Box, Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  order: {
    id: number;
    name: string;
    status: string;
    invoice: string;
  };
  setContact: (a: boolean) => void;
  setDelivery: (a: boolean) => void;
  setOpenDialog: (a: boolean) => void;
}

export function OrderActionButton({
  order,
  setContact,
  setDelivery,
  setOpenDialog,
}: Props) {
  const handlerNewOrder = () => console.log('Processing the order...');
  const handlerUnpaidOrder = () => {
    console.log('Contacting customer for payment...');
    setOpenDialog(true);
    setContact(true);
  };
  const handlerReadyOrder = () => {
    console.log('Informing customer...');
    setOpenDialog(true);
    setContact(true);
  };
  const handlerDeliveryOrder = () => {
    console.log('Tracking shipment...');
    setOpenDialog(true);
    setDelivery(true);
  };
  const handlerCompletedOrder = () => console.log('Contacting customer...');
  const handlerCanceledOrder = () => {
    console.log('Handling canceled order...');
  };

  const actionMap: Record<string, { handler: () => void; buttonText: string }> =
    {
      new: { handler: handlerNewOrder, buttonText: 'Process The Order' },
      unpaid: { handler: handlerUnpaidOrder, buttonText: 'Contact Customer' },
      ready: { handler: handlerReadyOrder, buttonText: 'Contact Customer' },
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
        {/* <DialogRoot> */}
        {/* <DialogTrigger asChild> */}
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
        {/* </DialogTrigger> */}
        {/* {contact && (
            <DialogContent>
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
                        defaultValue="react"
                        spaceX="8"
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value);
                          console.log(value);
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          padding="1rem"
                          onClick={() => console.log('tes')}
                        >
                        <Text>Blalala</Text>
                        <Radio value="react">React</Radio>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          padding="1rem"
                        >
                        <Text>Blalala</Text>
                        <Radio value="apa">React</Radio>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          padding="1rem"
                        >
                        <Text>Blalala</Text>
                        <Radio value="aja">React</Radio>
                        </Box>
                      </RadioGroup>
                    )}
                  />
                </form>
              </DialogBody>
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
        </DialogRoot> */}
      </Box>
    </>
  );
}
