import api from '@/networks/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';

export function useGetDashboardWithdrawTable() {
  return useQuery({
    queryKey: ['seller-wd-table'],
    queryFn: async () => {
      const response = await api.GETWITHDRAWSELLER();
      return response.data.payload;
    },
    refetchOnWindowFocus: false,
  });
}

export function useGetWdInfo() {
  return useQuery({
    queryKey: ['wd-user-info'],
    queryFn: async () => {
      const res = await api.GETWDINFO();
      return res.data.payload;
    },
    refetchOnWindowFocus: false,
  });
}

export function usePostWithdraw({
  setOpenWd,
}: {
  setOpenWd: (a: boolean) => void;
}) {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ['seller-wd'],
    mutationFn: async ({ amount }: { amount: string }) => {
      return await api.REQUESTWITHDRAW(amount);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['seller-wd-table'] });
      toaster.dismiss();
      setOpenWd(false);
      toaster.success({
        title: 'Success requesting !',
        description: 'Success requesting Withdraw',
      });
    },
    onMutate: () => {
      toaster.dismiss();
      toaster.loading({
        title: 'Requesting',
        description: 'Requesting withdraw',
      });
    },
    onError: () => {
      setOpenWd(false);
      toaster.dismiss();
      toaster.error({
        title: 'Failed Requesting',
        description: 'Failed requesting withdraw',
      });
    },
  });
}
