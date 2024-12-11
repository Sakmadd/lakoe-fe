import { Box, Flex } from '@chakra-ui/react';
interface TopBarProps {
  children: React.ReactNode;
  display?: string;
}
export function TopBarlayout({ children, display }: TopBarProps) {
  return (
    <>
      <Box
        position={'sticky'}
        top={0}
        zIndex={10}
        borderColor={'rgba(230, 230, 230, 1)'}
        borderWidth={'0px 0px 1px 0px'}
        backgroundColor={'rgba(255, 255, 255, 1)'}
        display={display}
      >
        <Flex justifyContent="space-between" padding={'10px'}>
          {children}
        </Flex>
      </Box>
    </>
  );
}
