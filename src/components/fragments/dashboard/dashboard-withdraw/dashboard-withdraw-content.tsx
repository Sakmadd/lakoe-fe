import { Button } from '@/components/ui/button';
import { Box, Input, Table, Text } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import {
  DialogRoot,
  DialogBody,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
} from '@/components/ui/dialog';
import StatsCard from '../dashboardStats/stats-card';
import { formatRupiah } from '@/utils/format-rp';
import useDashboardHooks from '../dashboard-hooks/dashboard-hooks';
import { Field } from '@/components/ui/field';
import { useState } from 'react';

const items = [
  { id: 1, amount: '10000', date: '1-11-1111', status: 'accepted' },
  { id: 2, amount: '10000', date: '1-11-1111', status: 'rejected' },
  { id: 3, amount: '10000', date: '1-11-1111', status: 'rejected' },
  { id: 4, amount: '10000', date: '1-11-1111', status: 'accepted' },
  { id: 5, amount: '10000', date: '1-11-1111', status: 'accepted' },
];

export default function DashboardWithdrawContent() {
  const { form, stats } = useDashboardHooks();
  const [openWd, setOpenWd] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box display="flex" gap="1rem">
        <StatsCard
          title="Current balance"
          amount={
            stats.statsData ? formatRupiah(stats.statsData?.balance) : 'Rp 0'
          }
          isFetching={stats.isFetching}
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
      <Box
        display="flex"
        border="1px solid #e6e6e6"
        borderRadius="1rem"
        padding="1rem"
        gap="2rem"
        justifyContent="space-between"
      >
        <Text fontFamily="sans-serif" fontWeight="semibold">
          Bank Account Used
        </Text>
        <Box display="flex" gap="1.5rem" alignItems="center">
          <Text fontFamily="sans-serif" fontWeight="semibold" fontSize="1rem">
            Testing User
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.9rem">
            1234567890123
          </Text>
        </Box>
      </Box>
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
                <Table.Cell textAlign="end">{item.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <DialogRoot open={openWd} size="lg">
        <DialogContent>
          <DialogHeader>
            <Text as="h1" fontWeight="semibold" fontFamily="sans-serif">
              Enter amount to withdraw
            </Text>
          </DialogHeader>
          <DialogBody>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
              <Box display="flex" flexDirection="column" gap="1rem">
                <Box display="flex" gap="1rem">
                  <Button
                    backgroundColor="transparent"
                    color="black"
                    border="1px solid gray"
                    height="2rem"
                  >
                    10.000
                  </Button>
                  <Button
                    backgroundColor="transparent"
                    color="black"
                    border="1px solid gray"
                    height="2rem"
                  >
                    25.000
                  </Button>
                  <Button
                    backgroundColor="transparent"
                    color="black"
                    border="1px solid gray"
                    height="2rem"
                  >
                    50.000
                  </Button>
                  <Button
                    backgroundColor="transparent"
                    color="black"
                    border="1px solid gray"
                    height="2rem"
                  >
                    100.000
                  </Button>
                  <Button
                    backgroundColor="transparent"
                    color="black"
                    border="1px solid gray"
                    height="2rem"
                  >
                    1.000.000
                  </Button>
                </Box>
                <Field
                  errorText={form.errors.amount?.message}
                  invalid={!!form.errors.amount}
                >
                  <Input
                    type="text"
                    width="100%"
                    {...form.register('amount')}
                  />
                </Field>
                <Box display="flex" justifyContent="end">
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
              </Box>
            </form>
          </DialogBody>
          <DialogCloseTrigger onClick={() => setOpenWd(false)} />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
