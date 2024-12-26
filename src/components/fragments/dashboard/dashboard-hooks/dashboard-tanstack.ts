import api from '@/networks/api';
import { useQuery } from '@tanstack/react-query';

export function useGetDashboardStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await api.GETDASHBOARDSELLER();
      return response;
    },
    refetchOnWindowFocus: false,
  });
}
