import { Data } from '@/dummy-data/dummyChartData';
import { tableData } from '@/dummy-data/dummyData';
import {
  withdrawSchema,
  WithdrawType,
} from '@/validators/dashboard/dashboard-withdraw';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface StatType {
  products: number;
  balance: number;
  porductUnpaid: number;
}

export default function useDashboardHooks() {
  const [chartData] = useState(Data);
  const [statsData] = useState<StatType | undefined>();
  const [table, setTable] = useState(1);
  const navigate = useNavigate();
  const startRange = (table - 1) * 4;
  const endRange = startRange + 4;
  const rangedData = tableData.slice(startRange, endRange);
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
    statsData,
    stats: {
      // isFetching,
      statsData,
    },
    chart: {
      chartData,
    },
    table: {
      table,
      setTable,
    },
    router: {
      navigate,
    },
    form: {
      setValue,
      getValues,
      register,
      handleSubmit,
      errors,
    },
    pagination: {
      rangedData,
    },
  };
}
