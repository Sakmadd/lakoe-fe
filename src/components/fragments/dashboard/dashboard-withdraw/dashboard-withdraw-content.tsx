import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Toaster } from '@/components/ui/toaster';
import { formatRupiah } from '@/utils/format-rp';
import { Box, Table, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { useGetDashboardStats } from '../dashboard-activity/dashboard-activity-hooks/dashboard-activity-tanstack';
import StatsCard from '../dashboardStats/stats-card';
import DashboardWithdrawDialog from './dashboard-withdraw-component/dashboard-withdraw-dialog';
import DashboardWithdrawInformationCard from './dashboard-withdraw-component/dashboard-withdraw-information-card';
import { useDashboardWithdrawHooks } from './dashboard-withdraw-hooks/dashboard-withdraw-hooks';

export default function DashboardWithdrawContent() {
  const { form, pagination } = useDashboardWithdrawHooks();
  const [openWd, setOpenWd] = useState(false);
  const { data: statsData, isFetching } = useGetDashboardStats();
  const { data: statsData, isFetching } = useGetDashboardStats();

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box display="flex" gap="1rem">
        <StatsCard
          title="Current balance"
          amount={statsData ? formatRupiah(statsData?.balance) : 'Rp 0'}
          isFetching={isFetching}
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
          {pagination?.rangedData?.length != 0 && (
            <Table.Body>
              {pagination?.rangedData?.map((item) => (
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
          )}
        </Table.Root>
        {pagination?.rangedData?.length == 0 && (
          <Box
            height="8rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontFamily="sans-serif" color="#e6e6e6">
              No Withdraw activity yet
            </Text>
          </Box>
        )}
      </Box>
      <DashboardWithdrawDialog
        setValue={form.setValue}
        setOpenWd={setOpenWd}
        openWd={openWd}
        register={form.register}
        errors={form.errors}
        handleSubmit={form.handleSubmit}
      />
      <Toaster />
    </Box>
  );
}
