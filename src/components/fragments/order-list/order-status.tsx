import { Tag } from '@/components/ui/tag';

interface Props {
  status: string;
}

export function OrderStatus({ status }: Props) {
  const statusMap: Record<string, { color: string; text: string }> = {
    new_order: { color: 'green', text: 'New Order' },
    unpaid: { color: 'yellow', text: 'Unpaid' },
    ready_to_ship: { color: 'blue', text: 'Ready To Ship' },
    on_delivery: { color: 'orange', text: 'On Delivery' },
    done: { color: 'grey', text: 'Order Completed' },
    canceled: { color: 'red', text: 'Order Canceled' },
  };

  const { color, text } = statusMap[status] || {
    color: 'black',
    text: 'Unknown Status',
  };

  return (
    <Tag
      variant="subtle"
      colorPalette={color}
      size="sm"
      width="fit-content"
      fontWeight="semibold"
    >
      {text}
    </Tag>
  );
}
