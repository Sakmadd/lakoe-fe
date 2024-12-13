import { TopBar } from '@/components/fragments/bars/topBar/topBar';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';

export function BuyerLayout() {
  const location = useLocation();
  return (
    <>
      <Box>
        <TopBar
          display={
            location.pathname === '/checkout' ||
            location.pathname === '/login' ||
            location.pathname === '/register'
              ? 'none'
              : 'block'
          }
        />
        <Grid templateColumns={'repeat(20, 1fr)'}>
          <GridItem
            colSpan={2}
            display={{ base: 'none', xl: 'block' }}
          ></GridItem>
          <GridItem colSpan={16}>
            <Outlet />
          </GridItem>
          <GridItem
            colSpan={2}
            display={{ base: 'none', lg: 'block' }}
          ></GridItem>
        </Grid>
      </Box>
    </>
  );
}
