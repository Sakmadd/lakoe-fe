import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/utils/format-rp';
import { Box, Table, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import useDashboardHooks from '../dashboard-hooks/dashboard-hooks';
import { useGetDashboardStats } from '../dashboard-hooks/dashboard-tanstack';
import StatsCard from '../dashboardStats/stats-card';
import DashboardWithdrawDialog from './dashboard-withdraw-component/dashboard-withdraw-dialog';
import DashboardWithdrawInformationCard from './dashboard-withdraw-component/dashboard-withdraw-information-card';
import { Tag } from '@/components/ui/tag';

const items = [
  { id: 1, amount: '10000', date: '1-11-1111', status: 'accepted' },
  { id: 2, amount: '10000', date: '1-11-1111', status: 'rejected' },
  { id: 3, amount: '10000', date: '1-11-1111', status: 'rejected' },
  { id: 4, amount: '10000', date: '1-11-1111', status: 'accepted' },
  { id: 5, amount: '10000', date: '1-11-1111', status: 'accepted' },
];

export default function DashboardWithdrawContent() {
  const { form } = useDashboardHooks();
  const [openWd, setOpenWd] = useState(false);
  const { data: statsData, isFetching } = useGetDashboardStats();

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box display="flex" gap="1rem">
        <StatsCard
          title="Current balance"
          amount={statsData ? formatRupiah(statsData?.balance) : 'Rp 0'}
          isFetching={isFetching}
        />
        <Button
          backgroundColor="transparent"
          border="1px solid #e6e6e6"
          color="black"
          width="50%"
          borderRadius="1rem"
          height="5.5rem"
          fontWeight="medium"
          fontFamily="sans-serif"
          _hover={{ backgroundColor: 'whitesmoke', transition: '0.3s' }}
          onClick={() => setOpenWd(true)}
        >
          Withdraw <LuPlus />
        </Button>
      </Box>
      <DashboardWithdrawInformationCard />
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        borderRadius="1rem"
        border="1px solid #e6e6e6"
        padding="1rem"
      >
        <Text fontFamily="sans-serif" fontWeight="semibold" fontSize="1rem">
          Withdraw activity
        </Text>
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Amount</Table.ColumnHeader>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.amount}</Table.Cell>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell textAlign="end">
                  <Tag
                    colorPalette={item.status != 'rejected' ? 'green' : 'red'}
                  >
                    {item.status}
                  </Tag>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <DashboardWithdrawDialog
        setValue={form.setValue}
        setOpenWd={setOpenWd}
        openWd={openWd}
        register={form.register}
        errors={form.errors}
        handleSubmit={form.handleSubmit}
      />
    </Box>
  );
}
