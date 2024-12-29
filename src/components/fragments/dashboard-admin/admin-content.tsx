import { Box, Spinner, Text, Textarea } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import {
  useGetAdminWithdraw,
  usePostResponseAdmintWithdraw,
} from './dashboard-admin-hooks/admin-tanstack';
import { formatRupiah } from '@/utils/format-rp';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminSchema, AdminTypes } from '@/validators/admin/admin';
import { useState } from 'react';
import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogHeader,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { filterStatus } from '../common/filter-status';
import { TransactionAdmin } from '@/types/dashboard-page-types';
import { Toaster } from '@/components/ui/toaster';

export default function AdminContent() {
  const [dialog, setDialog] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>('');
  const { data, isFetching } = useGetAdminWithdraw();
  const { mutateAsync } = usePostResponseAdmintWithdraw({
    setDialog,
  });
  const { register, setValue, handleSubmit, reset } = useForm<AdminTypes>({
    resolver: zodResolver(adminSchema),
  });

  const [table, setTable] = useState(1);
  const startRange = (table - 1) * 4;
  const endRange = startRange + 4;
  const rangedData = data?.slice(startRange, endRange);

  return (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      <Text
        fontSize="1.2rem"
        fontWeight="semibold"
        as="h1"
        fontFamily="sans-serif"
      >
        Seller Request
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        border="1px solid #e6e6e6"
        borderRadius="1rem"
        padding="1rem"
        shadow="lg"
      >
        {isFetching && (
          <Box
            height="50vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" />
          </Box>
        )}
        {!isFetching &&
          data
            ?.map((data: TransactionAdmin) => (
              <Box
                display="flex"
                alignItems="center"
                borderRadius="1rem"
                gap="1rem"
                border="1px solid #e6e6e6"
                justifyContent="space-around"
                padding="0.8rem"
                fontSize="0.9rem"
                cursor="pointer"
                onClick={() => {
                  if (data.status != 'pending') {
                    return;
                  }
                  setId(data.id);
                  setDialog(true);
                }}
              >
                <Text fontFamily="sans-serif" fontWeight="semibold">
                  {data?.Shop.name}
                </Text>
                <Text fontFamily="sans-serif" fontWeight="semibold">
                  {data?.Shop?.User?.email}
                </Text>
                <Text fontFamily="sans-serif">
                  {moment(data?.created_at).format('MMM Do YY')}
                </Text>
                <Text fontFamily="sans-serif" fontWeight="semibold">
                  {formatRupiah(data?.amount)}
                </Text>
                {filterStatus(data?.status)}
              </Box>
            ))
            .reverse()}
      </Box>
      <Box display="flex" justifyContent="center">
        <PaginationRoot
          count={rangedData?.length}
          pageSize={1}
          page={table}
          onPageChange={(e) => setTable(e.page)}
        >
          <HStack wrap="wrap">
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Box>
      <DialogRoot open={dialog} size="lg">
        <DialogContent>
          <form onSubmit={handleSubmit((data) => mutateAsync({ ...data, id }))}>
            <DialogHeader>
              <Text
                fontWeight="semibold"
                fontFamily="sans-serif"
                fontSize="1.2rem"
              >
                Enter your response
              </Text>
            </DialogHeader>
            <DialogBody>
              <Field>
                <Textarea
                  {...register('notes')}
                  cols={5}
                  rows={5}
                  fontFamily="sans-serif"
                  placeholder="Add notes if necessary"
                />
              </Field>
            </DialogBody>
            <DialogFooter>
              <Box display="flex" gap="1rem">
                <Button
                  backgroundColor="transparent"
                  color="black"
                  border="1px solid gray"
                  borderRadius="2rem"
                  height="2rem"
                  fontSize="0.8rem"
                  type="submit"
                  onClick={() => setValue('status', 'accepted')}
                >
                  Accept
                </Button>
                <Button
                  backgroundColor="transparent"
                  color="black"
                  border="1px solid gray"
                  borderRadius="2rem"
                  height="2rem"
                  fontSize="0.8rem"
                  type="submit"
                  onClick={() => setValue('status', 'rejected')}
                >
                  Decline
                </Button>
              </Box>
            </DialogFooter>
            <DialogCloseTrigger
              onClick={() => {
                setDialog(false);
                reset();
              }}
            />
          </form>
        </DialogContent>
      </DialogRoot>
      <Toaster />
    </Box>
  );
}
