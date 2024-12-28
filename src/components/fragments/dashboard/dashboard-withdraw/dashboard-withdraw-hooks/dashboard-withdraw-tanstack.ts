import api from '@/networks/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';

export function useGetDashboardWithdrawTable() {
  return useQuery({
    queryKey: ['seller-wd-table'],
    queryFn: async () => {
      const response = await api.GETWITHDRAWSELLER();
      return response.data.payload;
    },
  });
}

export function usePostWithdraw({
  setOpenWd,
}: {
  setOpenWd: (a: boolean) => void;
}) {
  return useMutation({
    mutationKey: ['seller-wd'],
    mutationFn: async ({ amount }: { amount: string }) => {
      return await api.REQUESTWITHDRAW(amount);
    },
    onSuccess: () => {
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
