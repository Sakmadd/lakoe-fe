import { Flex } from '@chakra-ui/react';
import CarouselBanner from './carousel-banner';

export function BannerContent() {
  return (
    <>
      <Flex
        justifyContent={'center'}
        padding={'1rem'}
        flexDir={'column'}
        alignItems={'center'}
      >
        <CarouselBanner />
      </Flex>
    </>
  );
}
