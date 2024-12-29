import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { formatRupiah } from '@/utils/format-rp';
import { Box, HStack, Table, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { filterStatus } from '../../common/filter-status';
import { useGetDashboardStats } from '../dashboard-activity/dashboard-activity-hooks/dashboard-activity-tanstack';
import StatsCard from '../dashboardStats/stats-card';
import DashboardWithdrawDialog from './dashboard-withdraw-component/dashboard-withdraw-dialog';
import DashboardWithdrawInformationCard from './dashboard-withdraw-component/dashboard-withdraw-information-card';
import { useDashboardWithdrawHooks } from './dashboard-withdraw-hooks/dashboard-withdraw-hooks';
import {
  PaginationRoot,
  PaginationPrevTrigger,
  PaginationNextTrigger,
  PaginationItems,
} from '@/components/ui/pagination';
import { Transaction } from '@/types/dashboard-page-types';
import { useGetWdInfo } from './dashboard-withdraw-hooks/dashboard-withdraw-tanstack';

export default function DashboardWithdrawContent() {
  const { form, pagination, table } = useDashboardWithdrawHooks();
  const [openWd, setOpenWd] = useState(false);
  const { data: statsData, isFetching } = useGetDashboardStats();
  const { data } = useGetWdInfo();

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
          disabled={
            statsData?.balance == '0' || data?.account == '' ? true : false
          }
        >
          Withdraw <LuPlus />
        </Button>
      </Box>
      {data?.account != '' && <DashboardWithdrawInformationCard data={data} />}
      {data?.account == '' && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Text color="#e6e6e6" fontWeight="semibold">
            You haven't fill bank info
          </Text>
        </Box>
      )}
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
              {pagination?.rangedData
                ?.map((item: Transaction) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>
                      <Text fontWeight="semibold" fontFamily="sans-serif">
                        {formatRupiah(item.amount)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell fontFamily="sans-serif">
                      {moment(item.created_at).format('MMM Do YY')}
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      {filterStatus(item.status)}
                    </Table.Cell>
                  </Table.Row>
                ))
                .reverse()}
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
        <Box display="flex" alignItems="center" justifyContent="center">
          <PaginationRoot
            count={table?.size}
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
        </Box>
      </Box>
      <DashboardWithdrawDialog
        balance={statsData?.balance | 0}
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
