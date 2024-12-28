import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import { OrderDetailTypes } from '@/types/order-page-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetOrderDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['order-detail'],
    queryFn: async () => {
      const response = await api.GETORDERDETAIL(id);
      const orderDetail: OrderDetailTypes = response.data;
      console.log(orderDetail);
      return orderDetail;
    },
  });
}

export function usePostAcceptOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['order-accept'],
    mutationFn: async (id: string | undefined) => {
      return await api.ACCEPTORDER(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-detail'] });
      toaster.dismiss();
      toaster.success({
        title: 'Order Accepted!',
        description: 'Accepting this order',
      });
    },
    onMutate: () => {
      toaster.dismiss();
      toaster.loading({
        title: 'Proccessing Order',
        description: 'Proccessing this order',
      });
    },
    onError: () => {
      toaster.dismiss();
      toaster.error({
        title: 'Failed Proccessing Order',
        description: 'Failed to proccess this order',
      });
    },
  });
}

export function usePostDeclineOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['order-decline'],
    mutationFn: async (id: string | undefined) => {
      return await api.DECLINEORDER(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-detail'] });
      toaster.dismiss();
      toaster.success({
        title: 'Order Declined!',
        description: 'Declining this order',
      });
    },
    onMutate: () => {
      toaster.dismiss();
      toaster.loading({
        title: 'Declining Order',
        description: 'Declining this order',
      });
    },
    onError: () => {
      toaster.dismiss();
      toaster.error({
        title: 'Failed declining Order',
        description: 'Failed to declining this order',
      });
    },
  });
}
