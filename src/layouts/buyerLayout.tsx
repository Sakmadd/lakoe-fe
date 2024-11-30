import { TopBar } from '@/components/fragments/bars/topBar/topBar';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export function BuyerLayout() {
  return (
    <>
      <Box>
        <TopBar />
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
