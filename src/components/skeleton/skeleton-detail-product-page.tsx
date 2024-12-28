import { Box, Flex, Spacer, Stack } from '@chakra-ui/react';

import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';

const ProductSkeleton = () => {
  return (
    <MainContent>
      <ContentContainer>
        <Box p={5} bg="white">
          <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
            <Box width={'40%'}>
              <Skeleton height="480px" borderRadius="md" />
              <Flex mt={4} gap={2} justifyContent="center">
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    height="72px"
                    width="72px"
                    borderRadius="md"
                  />
                ))}
              </Flex>
            </Box>

            <Box display={'flex'} flexDir={'column'} width={'60%'}>
              <SkeletonText noOfLines={2} mb={4} />
              <Skeleton height="40px" mb={4} />

              <Stack mb={4}>
                {[...Array(3)].map(() => (
                  <Flex gap={4}>
                    <Skeleton height="40px" width="200px" borderRadius="md" />
                    {[...Array(3)].map((_, index) => (
                      <Skeleton
                        key={index}
                        height="40px"
                        width="80px"
                        borderRadius="md"
                      />
                    ))}
                  </Flex>
                ))}
              </Stack>
              <Spacer />
              <Flex gap={'.5rem'}>
                <Skeleton height={'60px'} width={'50%'} borderRadius="md" />
                <Skeleton height={'60px'} width={'50%'} borderRadius="md" />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </ContentContainer>
    </MainContent>
  );
};

export default ProductSkeleton;
