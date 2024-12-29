import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import { SettingsWithdrawalTypes } from '@/validators/settings/settings-withdrawal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';

export function useGetWithdrawBank() {
  return useQuery({
    queryKey: ['withdraw-bank'],
    queryFn: async () => {
      const response = await api.GETWITHDRAWBANK();
      return response.data;
    },
  });
}

export function useGetBankInformation({
  reset,
}: {
  reset: UseFormReset<SettingsWithdrawalTypes>;
}) {
  return useQuery({
    queryKey: ['withdraw-info'],
    queryFn: async () => {
      const response = await api.GETWDINFO();
      const data: SettingsWithdrawalTypes = {
        name: response?.data.payload.name,
        account: response?.data.payload.account,
        bank: response?.data.payload.bank,
        bank_code: response?.data.payload.bank_code,
      };
      reset(data);
      return response.data.payload;
    },
  });
}

export function useUpdateBankInformation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['mutate-bank'],
    mutationFn: async (data: SettingsWithdrawalTypes) => {
      const response = await api.PATCHWDINFO(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdraw-info'] });
      toaster.dismiss();
      toaster.success({
        title: 'Withdraw information is saved',
      });
    },
    onError: () => {
      toaster.dismiss();
      toaster.error({
        title: 'Failed to update withdraw informatiom',
      });
    },
    onMutate: () => {
      toaster.dismiss();
      toaster.loading({
        title: 'Saving',
      });
    },
  });
}
