import { Flex } from '@chakra-ui/react';

interface LeftBarProps {
  children: React.ReactNode;
}

export function LeftBarLayout({ children }: LeftBarProps) {
  return (
    <>
      <Flex
        as={'nav'}
        direction={'column'}
        gap={'1.5rem'}
        pos={'sticky'}
        top={'20'}
        width={'100%'}
        padding={'2rem'}
        backgroundColor={'rgba(255, 255, 255, 1)'}
        height={'90vh'}
      >
        {children}
      </Flex>
    </>
  );
}
