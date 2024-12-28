import { TimelineRoot } from '@/components/ui/timeline';
import OrderTimelineItem from './order-timeline-item';
import { OrderHistoryItem } from '@/types/order-page-types';

export default function OrderTimeline({
  OrderHistory,
}: {
  OrderHistory: OrderHistoryItem[];
}) {
  return (
    <TimelineRoot size="sm">
      {OrderHistory.map((item) => (
        <OrderTimelineItem date={item.timestamp} status={item.status} />
      ))}
    </TimelineRoot>
  );
}
