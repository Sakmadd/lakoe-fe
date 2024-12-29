import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDashboardTable } from './dashboard-activity-tanstack';

export function useDashboardActivityHooks() {
  const { data: DashboardTableData } = useGetDashboardTable();
  console.log(DashboardTableData);
  const [table, setTable] = useState(1);
  const navigate = useNavigate();
  const startRange = (table - 1) * 4;
  const endRange = startRange + 4;
  const rangedData = DashboardTableData?.slice(startRange, endRange);

  return {
    table: {
      table,
      setTable,
    },
    router: {
      navigate,
    },
    pagination: {
      rangedData,
    },
  };
}
