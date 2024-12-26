import { TopBar } from '@/components/fragments/bars/topBar/topBar';
import { BannerContent } from '@/components/fragments/buyer/banner-content';
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
        {location.pathname === '/' && <BannerContent />}
        <Grid templateColumns={'repeat(20, 1fr)'}>
          <GridItem
            colSpan={2}
            display={{ base: 'none', xl: 'block' }}
            backgroundColor={
              location.pathname === '/checkout' ? 'white' : 'rgb(248, 248, 248)'
            }
          ></GridItem>
          <GridItem colSpan={16}>
            <Outlet />
          </GridItem>
          <GridItem
            colSpan={2}
            display={{ base: 'none', lg: 'block' }}
            backgroundColor={
              location.pathname === '/checkout' ? 'white' : 'rgb(248, 248, 248)'
            }
          ></GridItem>
        </Grid>
      </Box>
    </>
  );
}
