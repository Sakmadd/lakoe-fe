import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from '@/components/ui/timeline';

export default function OrderTimelineItem() {
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
        <TimelineTitle fontSize="0.8rem">Order created</TimelineTitle>
        <TimelineDescription fontSize="0.7rem">
          13th May 2021
        </TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  );
}
