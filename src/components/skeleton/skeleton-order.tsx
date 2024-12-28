import { Skeleton } from '@/components/ui/skeleton';
import { MainContent } from '@/layouts/mainContent';
import { Flex, HStack, VStack } from '@chakra-ui/react';
import { ContentContainer } from '../fragments/container/contentContainer';

const OrderSkeleton = () => {
  return (
    <MainContent>
      <Flex flexDir={'column'} gap={'1rem'}>
        <ContentContainer>
          <VStack align="stretch" mb={6}>
            <Flex justify="space-between">
              <Skeleton height="20px" width="150px" />
              <Skeleton height="20px" width="200px" />
            </Flex>
            <Skeleton height="20px" width="100px" />
          </VStack>
        </ContentContainer>

        <ContentContainer>
          <VStack align="stretch" mb={6}>
            <HStack align="start">
              <Skeleton boxSize="100px" borderRadius="md" />
              <VStack align="stretch" flex={1}>
                <Skeleton height="20px" width="full" />
                <Skeleton height="20px" width="80%" />
              </VStack>
              <Skeleton height="20px" width="100px" />
            </HStack>
          </VStack>
        </ContentContainer>

        <ContentContainer>
          <VStack align="stretch" mt={6} mb={6}>
            <VStack align="stretch">
              <Skeleton height="20px" width="150px" />
              <Skeleton height="20px" width="300px" />
              <Skeleton height="20px" width="full" />
            </VStack>
          </VStack>
        </ContentContainer>

        <ContentContainer>
          <VStack align="stretch" mt={6}>
            <VStack align="stretch">
              <Skeleton height="20px" width="200px" />
              <Skeleton height="20px" width="150px" />
              <Skeleton height="20px" width="250px" />
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Skeleton height="20px" width="100px" />
              <Skeleton height="20px" width="150px" />
            </Flex>
          </VStack>
        </ContentContainer>
      </Flex>
    </MainContent>
  );
};

export default OrderSkeleton;
