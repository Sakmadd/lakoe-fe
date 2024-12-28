import { OrderHistoryItem } from '@/types/order-page-types';
import { ContentContainer } from '../../container/contentContainer';
import { Box } from '@chakra-ui/react';
import { OrderStatus } from '../../order-list/order-status';
import OrderTextStatus from '../../order-list/order-text-status';
import OrderHistory from './order-history';

export default function OrderDetailHistory({
  orderHistory,
}: {
  orderHistory: OrderHistoryItem[];
}) {
  return (
    <ContentContainer>
      <Box display="flex" gap="0.8rem" flexDirection="column">
        <OrderStatus
          status={orderHistory[orderHistory.length - 1]?.status || ''}
        />
        <OrderTextStatus
          status={orderHistory[orderHistory.length - 1]?.status || ''}
        />
        <OrderHistory OrderHistory={orderHistory || []} />
      </Box>
    </ContentContainer>
  );
}
