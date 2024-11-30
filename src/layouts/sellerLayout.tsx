import { NavBar } from '@/components/fragments/bars/navBar/navBar';
import { SideBar } from '@/components/fragments/bars/sideBar/sideBar';
import { TopBar } from '@/components/fragments/bars/topBar/topBar';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export function SellerLayout() {
  return (
    <>
      <Box>
        <TopBar />
        <Grid templateColumns={'repeat(20, 1fr)'}>
          <GridItem colSpan={3} display={{ base: 'none', xl: 'block' }}>
            <NavBar />
          </GridItem>
          <GridItem colSpan={14}>
            <Outlet />
          </GridItem>
          <GridItem colSpan={3} display={{ base: 'none', lg: 'block' }}>
            <SideBar />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
