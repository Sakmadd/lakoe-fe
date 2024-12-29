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

export function useGetDashboardTable() {
  return useQuery({
    queryKey: ['seller-table'],
    queryFn: async () => {
      const response = await api.GETDASHBOARDTABLE();
      return response.data.payload;
    },
  });
}

export function useGetDashboardGraph() {
  return useQuery({
    queryKey: ['chart'],
    queryFn: async () => {
      const response = await api.GETDASHBOARDGRAPHS();
      return response;
    },
    refetchOnWindowFocus: false,
  });
}
