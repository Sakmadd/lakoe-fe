import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Data } from '@/dummy-data/dummyChartData';
import { tableData } from '@/dummy-data/dummyData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  withdrawSchema,
  WithdrawType,
} from '@/validators/dashboard/dashboard-withdraw';
import { useGetDashboard } from './dashboard-tanstack';

interface StatType {
  products: number;
  balance: number;
  porductUnpaid: number;
}

export default function useDashboardHooks() {
  const [chartData] = useState(Data);
  const [statsData, setStatsData] = useState<StatType>();
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

  useGetDashboard({ setStatsData });

  return {
    stats: {
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
      register,
      handleSubmit,
      errors,
    },
    pagination: {
      rangedData,
    },
  };
}
