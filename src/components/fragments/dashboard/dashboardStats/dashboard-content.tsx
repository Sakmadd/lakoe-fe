import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { FiPackage } from 'react-icons/fi';
import { StatsCard } from './stats-card';
// import { Flex } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import { Data } from '@/dummy-data/dummyChartData';
import { tableData } from '@/dummy-data/dummyData';
import {
  Box,
  HStack,
  Heading,
  Input,
  Stack,
  Table,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentContainer } from '../../../fragments/container/contentContainer';
import { OrderStatus } from '../../order/order-status';
import DashboardChart from './dashboard-chart';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  withdrawSchema,
  WithdrawType,
} from '@/validators/dashboard/dashboard-withdraw';

Chart.register(CategoryScale);

export function DashboardStats() {
  const [chartData] = useState(Data);
  const [table, setTable] = useState(1);
  const navigate = useNavigate();
  const startRange = (table - 1) * 4;
  const endRange = startRange + 4;
  const rangedData = tableData.slice(startRange, endRange);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawType>({
    resolver: zodResolver(withdrawSchema),
  });

  return (
    <>
      <Box display="flex" flexDirection="column" gap="1rem">
        <Tabs.Root defaultValue="stats">
          <ContentContainer>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="semibold" fontFamily="sans-serif" as="h1">
                Dashboard Overview
              </Text>
              <Box display="flex">
                <Tabs.List>
                  <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
                </Tabs.List>
                <Tabs.List>
                  <Tabs.Trigger value="withdraw">Withdraw</Tabs.Trigger>
                </Tabs.List>
              </Box>
            </Box>
          </ContentContainer>
          <Tabs.Content
            value="stats"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <ContentContainer>
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="1rem"
              >
                <StatsCard
                  color="white"
                  icon={<FiPackage />}
                  text="All Products"
                  stats="546"
                />
                <StatsCard
                  color="white"
                  icon={<FiPackage />}
                  text="Unproccessed Order"
                  stats="233"
                />
                <StatsCard
                  color="white"
                  icon={<FaMoneyBill1Wave />}
                  text="Current Balance"
                  stats="Rp. 500.456.000"
                />
              </Box>
            </ContentContainer>
            <ContentContainer>
              <DashboardChart chartData={chartData} />
            </ContentContainer>
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
                      {rangedData.map((item) => (
                        <Table.Row
                          key={item.id}
                          cursor="pointer"
                          onClick={() => navigate(`/orders/${item.id}`)}
                        >
                          <Table.Cell>
                            <Text fontFamily="sans-serif" fontWeight="semibold">
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
                    page={table}
                    onPageChange={(e) => setTable(e.page)}
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
            <ContentContainer>
              <Box>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                    gap="1rem"
                  >
                    <Field
                      label="Amount to withdraw"
                      errorText={errors.amount?.message}
                      invalid={!!errors.amount}
                    >
                      <Input type="text" width="100%" {...register('amount')} />
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
              </Box>
            </ContentContainer>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </>
  );
}
