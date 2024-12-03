import { TimelineRoot } from '@/components/ui/timeline';
import OrderTimelineItem from './order-timeline-item';

export default function OrderTimeline() {
  return (
    <TimelineRoot size="sm">
      <OrderTimelineItem />
    </TimelineRoot>
  );
}
