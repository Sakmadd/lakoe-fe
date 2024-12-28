import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import OrderTimeline from './order-timeline';
import { OrderHistoryItem } from '@/types/order-page-types';

export default function OrderHistory({
  OrderHistory,
}: {
  OrderHistory: OrderHistoryItem[];
}) {
  return (
    <AccordionRoot collapsible size="sm">
      <AccordionItem borderBottom="none" value="a">
        <AccordionItemTrigger
          color="cyan.600"
          fontSize="0.8rem"
          indicatorPlacement="start"
          cursor="pointer"
        >
          View Order History
        </AccordionItemTrigger>
        <AccordionItemContent
          border="1px solid #e6e6e6"
          borderRadius="0.5rem"
          width="45%"
          padding="1rem"
        >
          <OrderTimeline OrderHistory={OrderHistory} />
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
