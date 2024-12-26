// import { Button } from '@/components/ui/button';
// import { Field } from '@/components/ui/field';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import { tableData } from '@/dummy-data/dummyData';
import {
  Box,
  Heading,
  HStack,
  Stack,
  Table,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { ContentContainer } from '../container/contentContainer';
import { OrderStatus } from '../order/order-status';
import useDashboardHooks from './dashboard-hooks/dashboard-hooks';
import DashboardChart from './dashboardStats/dashboard-chart';
import StatsCard from './dashboardStats/stats-card';
import DashboardWithdraw from './dashboard-withdraw';
import { formatRupiah } from '@/utils/format-rp';

Chart.register(CategoryScale);

export function DashboardContent() {
  const { chart, table, router, pagination, stats } = useDashboardHooks();

  console.log(stats.statsData);

  return (
    <>
      <Box display="flex" flexDirection="column" gap="1rem">
        <ContentContainer>
          <Tabs.Root defaultValue="stats">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="semibold" fontFamily="sans-serif" as="h1">
                Dashboard Overview
              </Text>
              <Tabs.List>
                <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
                <Tabs.Trigger value="withdraw">Withdraw</Tabs.Trigger>
              </Tabs.List>
            </Box>
            <Tabs.Content
              value="stats"
              display="flex"
              flexDirection="column"
              gap="1rem"
            >
              <Box display="flex" justifyContent="space-between" gap="1rem">
                <>
                  <StatsCard
                    isFetching={stats.isFetching}
                    title={'Total Product'}
                    amount={stats.statsData?.products.toString()}
                  />
                  <StatsCard
                    isFetching={stats.isFetching}
                    title={'Unprocessed Product'}
                    amount={stats.statsData?.porductUnpaid.toString()}
                  />
                  <StatsCard
                    isFetching={stats.isFetching}
                    title={'Current Balance'}
                    amount={
                      stats.statsData
                        ? formatRupiah(stats.statsData?.balance)
                        : 'Rp 0'
                    }
                  />
                </>
              </Box>
              <DashboardChart chartData={chart.chartData} />
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
                        {pagination.rangedData.map((item) => (
                          <Table.Row
                            key={item.id}
                            cursor="pointer"
                            onClick={() =>
                              router.navigate(`/orders/${item.id}`)
                            }
                          >
                            <Table.Cell>
                              <Text
                                fontFamily="sans-serif"
                                fontWeight="semibold"
                              >
                                {item.name}
                              </Text>
                            </Table.Cell>
                            <Table.Cell>{item.category}</Table.Cell>
                            <Table.Cell
                              fontFamily="sans-serif"
                              fontWeight="semibold"
                            >
                              Rp. {item.price}
                            </Table.Cell>
                            <Table.Cell>{item.date}</Table.Cell>
                            <Table.Cell
                              fontFamily="sans-serif"
                              fontWeight="semibold"
                            >
                              {item.customer}
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                              <OrderStatus status={item.status} />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                    <PaginationRoot
                      count={tableData.length}
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
            </Tabs.Content>
            <Tabs.Content
              value="withdraw"
              display="flex"
              flexDirection="column"
              gap="1rem"
            >
              {/* <ContentContainer> */}
              {/* <Box>
                <form onSubmit={form.handleSubmit((data) => console.log(data))}>
                <Box
                display="flex"
                    flexDirection="column"
                    alignItems="end"
                    gap="1rem"
                  >
                    <Field
                      label="Amount to withdraw"
                      errorText={form.errors.amount?.message}
                      invalid={!!form.errors.amount}
                    >
                      <Input
                        type="text"
                        width="100%"
                        {...form.register('amount')}
                      />
                    </Field>
                    <Button
                      width="fit-content"
                      backgroundColor="transparent"
                      color="black"
                      border="1px solid gray"
                      borderRadius="2rem"
                      height="2rem"
                      fontSize="0.8rem"
                      type="submit"
                    >
                      Request Withdraw
                    </Button>
                  </Box>
                </form>
              </Box> */}
              <DashboardWithdraw />
              {/* </ContentContainer> */}
            </Tabs.Content>
          </Tabs.Root>
        </ContentContainer>
      </Box>
    </>
  );
}
