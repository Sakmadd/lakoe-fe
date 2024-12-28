import { useGetDashboardStats } from './dashboard-activity-hooks/dashboard-activity-tanstack';
import { Box, Heading, HStack, Stack, Table, Text } from '@chakra-ui/react';
import StatsCard from '../dashboardStats/stats-card';
import { ContentContainer } from '../../container/contentContainer';
import DashboardChart from './dashboard-activity-components/dashboard-chart';
import { formatRupiah } from '@/utils/format-rp';
import { useDashboardActivityHooks } from './dashboard-activity-hooks/dashboard-activity-hooks';
import { DashboardTableData } from '@/types/dashboard-page-types';
import moment from 'moment';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { OrderStatus } from '../../order-list/order-status';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
Chart.register(CategoryScale);

export default function DashboardActivityContent() {
  const { data: statsData, isFetching } = useGetDashboardStats();
  const { table, pagination } = useDashboardActivityHooks();
  return (
    <>
      <Box display="flex" justifyContent="space-between" gap="1rem">
        <StatsCard
          isFetching={isFetching}
          title={'Total Product'}
          amount={statsData?.products.toString() || '0'}
        />
        <StatsCard
          isFetching={isFetching}
          title={'Activity'}
          amount={statsData?.porductUnpaid.toString() || '0'}
        />
        <StatsCard
          isFetching={isFetching}
          title={'Current Balance'}
          amount={formatRupiah(statsData?.balance) || '0'}
        />
      </Box>
      <DashboardChart />
      <ContentContainer>
        <Stack width="full" gap="1rem">
          <Heading as="h1" fontSize="0.8rem" fontFamily="sans-serif">
            Recent Activity
          </Heading>
          <Stack width="full" alignItems="center" gap="1.5rem">
            <Table.Root
              colorPalette="blue"
              interactive
              size="sm"
              variant="outline"
              fontSize="0.8rem"
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Product</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Amount</Table.ColumnHeader>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader>Customer</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">
                    Status
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pagination?.rangedData?.map(
                  (item: DashboardTableData, index: number) => (
                    <Table.Row key={index} cursor="pointer">
                      <Table.Cell>
                        <Text fontFamily="sans-serif" fontWeight="semibold">
                          {item.product}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>{item.category}</Table.Cell>
                      <Table.Cell fontFamily="sans-serif" fontWeight="semibold">
                        {formatRupiah(item.payment)}
                      </Table.Cell>
                      <Table.Cell>
                        {moment(item.timestamp).format('MMM Do YY')}
                      </Table.Cell>
                      <Table.Cell fontFamily="sans-serif" fontWeight="semibold">
                        {item.recipient}
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <OrderStatus status={item.status} />
                      </Table.Cell>
                    </Table.Row>
                  )
                )}
              </Table.Body>
            </Table.Root>
            <PaginationRoot
              count={pagination?.rangedData?.length}
              pageSize={5}
              page={table.table}
              onPageChange={(e) => table.setTable(e.page)}
            >
              <HStack wrap="wrap">
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </Stack>
        </Stack>
      </ContentContainer>
    </>
  );
}
