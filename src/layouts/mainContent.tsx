import { dummyLoggedUser } from '@/dummy-data/dummyData';
import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MainBarProps {
  children: ReactNode;
}

export function MainContent({ children }: MainBarProps) {
  const loggedUser = dummyLoggedUser;
  return (
    <Box
      as={'section'}
      borderColor={loggedUser ? 'rgba(230, 230, 230, 1)' : 'rgb(248, 248, 248)'}
      borderWidth={'0px 1px 0px 1px'}
      minHeight={'90vh'}
      width={'full'}
      backgroundColor={'rgba(248, 248, 248, 1)'}
      padding={'1rem'}
    >
      {children}
    </Box>
  );
}
