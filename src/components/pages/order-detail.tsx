import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';
import { dummyOrderDetail } from '@/dummy-data/dummyData';
import { MainContent } from '@/layouts/mainContent';
import { OrderDetailType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import {
  Box,
  ClipboardRoot,
  ClipboardTrigger,
  Image,
  Text,
  Separator,
} from '@chakra-ui/react';
import { LuCopy } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { ContentContainer } from '../fragments/container/contentContainer';
import OrderHistory from '../fragments/order/order-history';
import { OrderStatus } from '../fragments/order/order-status';
import OrderTextStatus from '../fragments/order/order-text-status';

export default function OrderDetail() {
  const params = useParams();

  function orderById(id: number): OrderDetailType {
    for (const order of dummyOrderDetail) {
      if (order.id == id) {
        return order;
      }
    }
    throw new Error(`Order with ID ${id} not found`);
  }

  const order = orderById(Number(params.id));

  function Current() {
    const current = [];
    for (const order of dummyOrderDetail) {
      if (order.id == Number(params.id)) {
        current.push(
          <BreadcrumbCurrentLink color="black">
            {order.name}
          </BreadcrumbCurrentLink>
        );
        return current;
      }
    }
  }

  return (
    <MainContent>
      <BreadcrumbRoot marginBottom="1rem">
        <BreadcrumbLink href="#" fontWeight="semibold">
          Orders
        </BreadcrumbLink>
        {Current()}
      </BreadcrumbRoot>
      <Box display="flex" flexDirection="column" gap="1rem">
        <ContentContainer>
          <Box display="flex" gap="0.8rem" flexDirection="column">
            <OrderStatus status={order.status} />
            <OrderTextStatus status={order.status} />
            <OrderHistory />
          </Box>
        </ContentContainer>
        <ContentContainer>
          <Box display="flex">
            <Box
              display="flex"
              flexDirection="column"
              width="50%"
              justifyContent="space-between"
              gap="0.7rem"
            >
              <Text fontWeight="semibold" fontSize="0.9rem">
                Date
              </Text>
              <Text fontWeight="semibold" fontSize="0.9rem">
                Invoice
              </Text>
              <Text fontWeight="semibold" fontSize="0.9rem">
                Buyer
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="end"
              justifyContent="space-between"
              width="50%"
            >
              <Text fontWeight="light" fontSize="0.8rem">
                {order.createdAt}
              </Text>
              <Text fontWeight="light" fontSize="0.8rem">
                {order.invoice}
              </Text>
              <Text fontWeight="light" fontSize="0.8rem">
                {order.customer}
              </Text>
            </Box>
          </Box>
        </ContentContainer>
        <ContentContainer>
          <Box display="flex" flexDirection="column" gap="0.8rem">
            <Text fontWeight="semibold" fontSize="0.9rem">
              Product Detail
            </Text>
            <Box
              display="flex"
              borderRadius="5px"
              padding="0.5rem"
              border="1px solid #e6e6e6"
              justifyContent="space-between"
              onClick={() => {}}
              cursor="pointer"
            >
              <Box display="flex" gap="0.5rem">
                <Image src={order.image.src} width="3rem" height="3rem" />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text fontWeight="semibold" fontSize="0.9rem">
                    {order.name}
                  </Text>
                  <Text fontSize="0.8rem">
                    {order.quantity} x {formatRupiah(order.total_price)}
                  </Text>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontWeight="light" fontSize="0.9rem">
                  Total expenditure
                </Text>
                <Text fontWeight="semibold" fontSize="0.8rem">
                  {formatRupiah(order.total_price)}
                </Text>
              </Box>
            </Box>
          </Box>
        </ContentContainer>
        <ContentContainer>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Text fontWeight="semibold" fontSize="0.9rem">
              Shipping details
            </Text>
            <Box display="flex" gap="4rem" alignItems="center">
              <Box display="flex" flexDirection="column" gap="0.5rem">
                <Text fontWeight="normal" fontSize="0.8rem">
                  Courier
                </Text>
                <ClipboardRoot
                  value="Tes"
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <Text fontWeight="normal" fontSize="0.8rem">
                    Receipt Number
                  </Text>
                  <ClipboardTrigger color="gray" cursor="pointer">
                    <LuCopy />
                  </ClipboardTrigger>
                </ClipboardRoot>
                <ClipboardRoot
                  value="Tes"
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <Text fontWeight="normal" fontSize="0.8rem">
                    Address
                  </Text>
                  <ClipboardTrigger color="gray" cursor="pointer">
                    <LuCopy />
                  </ClipboardTrigger>
                </ClipboardRoot>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap="0.5rem"
              >
                <Text fontSize="0.8rem" fontWeight="semibold">
                  {order.courier}
                </Text>
                <Text fontSize="0.8rem" fontWeight="semibold">
                  -
                </Text>
                <Text fontSize="0.8rem">{order.address}</Text>
              </Box>
            </Box>
          </Box>
        </ContentContainer>
        <ContentContainer>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Text fontWeight="semibold" fontSize="0.9rem">
              Payment details
            </Text>
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                justifyContent="center"
              >
                <Text fontWeight="normal" fontSize="0.8rem">
                  Total price
                </Text>
                <Text fontWeight="normal" fontSize="0.8rem">
                  Total shipping costs
                </Text>
                <Text fontWeight="normal" fontSize="0.8rem">
                  Discount
                </Text>
                <Text fontWeight="normal" fontSize="0.8rem">
                  Service fee
                </Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                justifyContent="center"
              >
                <Text fontWeight="semibold" fontSize="0.8rem">
                  {formatRupiah(order.total_price)}
                </Text>
                <Text fontWeight="semibold" fontSize="0.8rem">
                  Rp 0
                </Text>
                <Text fontWeight="semibold" fontSize="0.8rem">
                  Rp 0
                </Text>
                <Text fontWeight="semibold" fontSize="0.8rem">
                  Rp 0
                </Text>
              </Box>
            </Box>
            <Separator />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="semibold">Total sales</Text>
              <Text fontWeight="semibold">
                {formatRupiah(order.total_price)}
              </Text>
            </Box>
          </Box>
        </ContentContainer>
      </Box>
    </MainContent>
  );
}
