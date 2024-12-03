import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import OrderTimeline from './order-timeline';

export default function OrderHistory() {
  return (
    <AccordionRoot collapsible size="sm">
      <AccordionItem borderBottom="none" value="a">
        <AccordionItemTrigger
          color="cyan.600"
          fontSize="0.8rem"
          indicatorPlacement="start"
        >
          View Order History
        </AccordionItemTrigger>
        <AccordionItemContent
          border="1px solid #e6e6e6"
          borderRadius="0.5rem"
          width="45%"
          padding="1rem"
        >
          <OrderTimeline />
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
