import { Flex } from '@chakra-ui/react';

interface LeftBarProps {
  children: React.ReactNode;
}

export function RightBarlayout({ children }: LeftBarProps) {
  return (
    <>
      <Flex
        as={'nav'}
        direction={'column'}
        gap={'1.5rem'}
        pos={'sticky'}
        top={'78px'}
        width={'100%'}
        padding={'1rem'}
        backgroundColor={'rgba(255, 255, 255, 1)'}
        height={'89vh'}
      >
        {children}
      </Flex>
    </>
  );
}
