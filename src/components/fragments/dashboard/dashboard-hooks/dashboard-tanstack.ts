import api from '@/networks/api';
import { useQuery } from '@tanstack/react-query';

interface StatType {
  products: number;
  balance: number;
  porductUnpaid: number;
}

export function useGetDashboardStats({
  setStatsData,
}: {
  setStatsData: (a: StatType) => void;
}) {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.GETDASHBOARDSELLER();
      setStatsData(response);
      console.log(`Tanstack : ${response}`);
      return response.data.data.payload;
    },
    refetchOnWindowFocus: false,
  });
}
