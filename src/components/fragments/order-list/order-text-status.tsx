import { Text } from '@chakra-ui/react';

interface Props {
  status: string;
}

export default function OrderTextStatus({ status }: Props) {
  const statusText: Record<string, { text: string }> = {
    new_order: {
      text: "Immediately process orders that have been received. Don't make buyers wait too long.",
    },
    unpaid: {
      text: 'Orders will be canceled if payment is not made by 10 August 2023 - 00:00 WIB. Please wait until payment is confirmed before sending the goods.',
    },
    ready_to_ship: {
      text: 'The order has been picked up by the Courier and is ready to be sent.',
    },
    on_delivery: {
      text: 'The order is already in the delivery process. Please wait for the buyer to receive the goods.',
    },
    done: {
      text: 'The product has been received by the buyer and this order is completed.',
    },
    canceled: {
      text: 'The order was canceled because the buyer did not make payment on time.',
    },
  };

  const { text } = statusText[status];

  return (
    <Text fontWeight="light" fontSize="0.9rem">
      {text}
    </Text>
  );
}
