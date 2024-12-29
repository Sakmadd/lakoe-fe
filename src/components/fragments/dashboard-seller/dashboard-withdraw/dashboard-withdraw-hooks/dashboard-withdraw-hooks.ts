import {
  withdrawSchema,
  WithdrawType,
} from '@/validators/dashboard/dashboard-withdraw';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGetDashboardWithdrawTable } from './dashboard-withdraw-tanstack';
import { useState } from 'react';

export function useDashboardWithdrawHooks() {
  const { data: DashboardTableData } = useGetDashboardWithdrawTable();
  console.log(DashboardTableData);
  const [table, setTable] = useState(1);
  const size = DashboardTableData?.length * 1;
  const startRange = (table - 1) * 4;
  const endRange = startRange + 4;
  const rangedData = DashboardTableData?.slice(startRange, endRange);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<WithdrawType>({
    resolver: zodResolver(withdrawSchema),
  });

  return {
    pagination: {
      rangedData,
      DashboardTableData,
    },
    table: {
      table,
      setTable,
      size,
    },
    form: {
      setValue,
      getValues,
      register,
      handleSubmit,
      errors,
    },
  };
}
