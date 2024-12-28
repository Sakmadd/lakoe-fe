import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';
import { MainContent } from '@/layouts/mainContent';
import { Box, Spinner } from '@chakra-ui/react';
import { useGetOrderDetail } from './order-detail-hooks/order-detail-tanstack';
import { useParams } from 'react-router-dom';
import OrderDetailBuyer from './order-detail-components/order-detail-buyer';
import OrderDetailCTA from './order-detail-components/order-detail-cta';
import OrderDetailHistory from './order-detail-components/order-detail-history';
import OrderDetailPayment from './order-detail-components/order-detail-payment';
import OrderDetailProduct from './order-detail-components/order-detail-product';
import OrderDetailShipping from './order-detail-components/order-detail-shipping';
import { Toaster } from '@/components/ui/toaster';

export default function OrderDetailContent() {
  const params = useParams();
  const { data: order, isFetching } = useGetOrderDetail(params.id);

  return (
    <MainContent>
      <>
        <BreadcrumbRoot marginBottom="1rem">
          <BreadcrumbLink href="#" fontWeight="semibold">
            Orders
          </BreadcrumbLink>
          <BreadcrumbCurrentLink>{order?.invoice_number}</BreadcrumbCurrentLink>
        </BreadcrumbRoot>
        {isFetching && (
          <Box
            display="flex"
            height="100vh"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" />
          </Box>
        )}
        {!isFetching && (
          <Box display="flex" flexDirection="column" gap="1rem">
            <OrderDetailHistory orderHistory={order?.OrderHistory || []} />
            <OrderDetailBuyer
              created_at={order?.created_at}
              invoice_number={order?.invoice_number}
              name={order?.Recipient.name}
            />
            <OrderDetailProduct
              name={order?.Product.name}
              image={order?.Product.image}
              quantity={order?.Product.quantity}
              total_price={order?.Product.total_price}
            />
            <OrderDetailShipping
              courier_company={order?.Courier.courier_company}
              waybill_id={order?.Courier.waybill_id}
              address={order?.Recipient.address}
            />
            <OrderDetailPayment
              total_price={order?.Price.total_price}
              total={order?.Price.total}
              discount={order?.Price.discount}
              shipping_cost={order?.Price.shipping_cost}
              service_fee={order?.Price.service_fee}
            />
            {order?.OrderHistory[order.OrderHistory.length - 1]?.status !=
            'new_order' ? null : (
              <OrderDetailCTA id={order?.id} />
            )}
          </Box>
        )}
        <Toaster />
      </>
    </MainContent>
  );
}
