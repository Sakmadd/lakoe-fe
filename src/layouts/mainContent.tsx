import { StoreState } from '@/redux/store';
import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

interface MainBarProps {
  children: ReactNode;
}

export function MainContent({ children }: MainBarProps) {
  const loggedUser = useSelector((state: StoreState) => state.loggedUser.value);
  return (
    <Box
      as={'section'}
      borderColor={loggedUser ? 'rgba(230, 230, 230, 1)' : 'rgb(248, 248, 248)'}
      borderWidth={loggedUser ? '0px 1px 0px 1px' : '0px'}
      minHeight={'90vh'}
      width={'full'}
      backgroundColor={'rgba(248, 248, 248, 1)'}
      padding={'1rem'}
    >
      {children}
    </Box>
  );
}
