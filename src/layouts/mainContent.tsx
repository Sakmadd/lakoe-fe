import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MainBarProps {
  children: ReactNode;
}

export function MainContent({ children }: MainBarProps) {
  return (
    <Box
      as={'section'}
      borderColor={'rgba(230, 230, 230, 1)'}
      borderWidth={'0px 1px 0px 1px'}
      minHeight={'100vh'}
      width={'full'}
      backgroundColor={'rgba(248, 248, 248, 1)'}
    >
      {children}
    </Box>
  );
}
