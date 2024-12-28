import api from '@/networks/api';
import { useQuery } from '@tanstack/react-query';

export function useGetOrderList() {
  return useQuery({
    queryKey: ['order-list'],
    queryFn: async () => {
      const response = await api.GETORDERLIST();
      console.log(response);
      return response.data;
    },
  });
}
