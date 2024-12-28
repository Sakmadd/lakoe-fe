import { Text } from '@chakra-ui/react';

interface Props {
  status: string;
}

export default function OrderTextStatusBuyer({ status }: Props) {
  const statusText: Record<string, { text: string }> = {
    new_order: {
      text: 'Your order has been received. The seller will process it soon. Please wait for updates.',
    },
    unpaid: {
      text: 'Your order will be canceled if payment is not completed by 10 August 2023 - 00:00 WIB. Please complete the payment to proceed.',
    },
    ready_to_ship: {
      text: 'Your order has been picked up by the courier and is ready for delivery.',
    },
    on_delivery: {
      text: 'Your order is on its way. Please wait for the courier to deliver it to you.',
    },
    done: {
      text: 'Your order has been successfully delivered. Thank you for shopping with us!',
    },
    canceled: {
      text: 'Your order has been canceled because the payment was not completed on time.',
    },
  };

  const { text } = statusText[status];

  return (
    <Text fontWeight="light" fontSize="0.9rem">
      {text}
    </Text>
  );
}
