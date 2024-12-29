import api from '@/networks/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';

export function useGetAdminWithdraw() {
  return useQuery({
    queryKey: ['wd-request-table'],
    queryFn: async () => {
      const response = await api.GETWITHDRAWADMIN();
      console.log(response.data.payload);
      return response.data.payload;
    },
  });
}

export function usePostResponseAdmintWithdraw({
  setDialog,
}: {
  setDialog: (a: boolean) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['wd-response-table'],
    mutationFn: async ({
      id,
      notes,
      status,
    }: {
      notes?: string | undefined;
      status: string;
      id: string | undefined;
    }) => {
      return await api.POSTRESPONSEADMIN({ notes, status, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wd-request-table'] });
      toaster.dismiss();
      setDialog(false);
      toaster.success({
        title: 'Success accepting !',
        description: 'Success accepting Withdraw',
      });
    },
    onMutate: () => {
      toaster.dismiss();
      toaster.loading({
        title: 'Accepting',
        description: 'Accepting withdraw',
      });
    },
    onError: () => {
      setDialog(false);
      toaster.dismiss();
      toaster.error({
        title: 'Failed Accepting',
        description: 'Failed Accepting withdraw',
      });
    },
  });
}
