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

export function useGetFormattedTemplate(id: string | undefined) {
  console.log(id);
  const res = useQuery({
    queryKey: ['template-format'],
    queryFn: async () => {
      console.log(id);
      const response = await api.GETFORMATEDTEMPLATE(id);
      console.log(response);
      return response.data.payload;
    },
    refetchOnWindowFocus: false,
  });
  return res;
}
