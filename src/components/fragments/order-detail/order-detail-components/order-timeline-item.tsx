import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from '@/components/ui/timeline';
import moment from 'moment';

export default function OrderTimelineItem({
  date,
  status,
}: {
  date: string;
  status: string;
}) {
  const statusText: Record<string, { text: string }> = {
    new_order: {
      text: 'The buyer has paid, a new order is created.',
    },
    unpaid: {
      text: 'Waiting for the order to be paid by the buyer.',
    },
    ready_to_ship: {
      text: 'The order is ready to be sent to the buyer.',
    },
    on_delivery: {
      text: 'Order is on its way.',
    },
    done: {
      text: 'The order has arrived at the buyer',
    },
    canceled: {
      text: 'Order cancelled.',
    },
  };

  const { text } = statusText[status];

  return (
    <TimelineItem>
      <TimelineConnector
        backgroundColor="cyan.600"
        width="1rem"
        height="1rem"
        marginTop="0.6rem"
        border="3px solid lightblue"
      />
      <TimelineContent gap="0.1rem">
        <TimelineTitle fontSize="0.8rem">{text}</TimelineTitle>
        <TimelineDescription fontSize="0.7rem">
          {moment(date).format('MMM Do YY')}
        </TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  );
}
