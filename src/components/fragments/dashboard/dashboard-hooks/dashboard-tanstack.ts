import api from '@/networks/api';
import { useQuery } from '@tanstack/react-query';

interface StatType {
  products: number;
  balance: number;
  porductUnpaid: number;
}

export function useGetDashboard({
  setStatsData,
}: {
  setStatsData: (a: StatType) => void;
}) {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.GETDASHBOARDSELLER();
      setStatsData(response);
      return response.data.data.payload;
    },
  });
}
