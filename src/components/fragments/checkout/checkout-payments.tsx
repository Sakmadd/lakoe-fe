import { OrderResponseType } from '@/types/order-types';
import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Separator,
  Text,
} from '@chakra-ui/react';

interface Props {
  order: OrderResponseType;
}

export function CheckoutPayments({ order }: Props) {
  return (
    <Box borderRadius="lg">
      <Box mb={6} p={4} borderWidth={1} borderRadius="md" bg="white">
        <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray">
          Recipient Information
        </Text>
        <Separator padding={'.5rem'} />
        <Flex gap={'2rem'}>
          <Flex flexDir={'column'} align="start" gap={1} fontSize="md">
            <Text fontWeight={'semibold'}>Name</Text>
            <Text fontWeight={'semibold'}>Email</Text>
            <Text fontWeight={'semibold'}>Phone</Text>
            <Text fontWeight={'semibold'}>City</Text>
            <Text fontWeight={'semibold'}>District</Text>
            <Text fontWeight={'semibold'}>Address</Text>
          </Flex>
          <Flex flexDir={'column'} align="start" gap={1} fontSize="md">
            <Text>{order.Recipient.name}</Text>
            <Text>{order.Recipient.email}</Text>
            <Text>{order.Recipient.phone}</Text>
            <Text>{order.Recipient.city}</Text>
            <Text>{order.Recipient.district}</Text>
            <Text>{order.Recipient.address}</Text>
          </Flex>
        </Flex>
      </Box>

      <Box mb={6} p={4} borderWidth={1} borderRadius="md" bg="white">
        <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray">
          Items
        </Text>
        <Separator padding={'.5rem'} />
        <Flex gap={4} align="flex-start" alignItems={'center'}>
          <Image
            src={order.OrderItem.Product.image}
            alt={order.OrderItem.Product.name}
            boxSize="100px"
            objectFit="cover"
            borderRadius="md"
            shadow="md"
          />
          <Flex flexDir={'column'} align="start" gap={2}>
            <Text fontWeight="semibold" fontSize="md">
              {order.OrderItem.Product.name}
            </Text>

            <HStack>
              <Badge colorScheme="green">
                Price: Rp{order.OrderItem.Product.price}
              </Badge>
              <Badge colorScheme="blue">
                Quantity: {order.OrderItem.quantity}
              </Badge>
            </HStack>
          </Flex>
        </Flex>
      </Box>

      <Separator my={4} />

      <Box mb={6} textAlign="center">
        <Text fontSize="lg" fontWeight="semibold" color="gray">
          Total Price
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          Rp{order.total_price.toLocaleString()}
        </Text>
      </Box>

      <Separator my={4} />
    </Box>
  );
}
