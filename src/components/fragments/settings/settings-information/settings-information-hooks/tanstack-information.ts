import api from '@/networks/api';
import { SettingsInformationType } from '@/validators/settings/settings-information';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, UseFormReset } from 'react-hook-form';

export interface CreateProps {
  onSuccess?: () => void;
  onMutate: () => void;
  onError: () => void;
  informationSubmit: SubmitHandler<SettingsInformationType>;
}

export function useGetInformation({
  reset,
  setImageReader,
}: {
  reset: UseFormReset<SettingsInformationType>;
  setImageReader: (a: string | undefined) => void;
}) {
  return useQuery({
    queryKey: ['store'],
    queryFn: async () => {
      const response = await api.GETSHOP();
      const values = {
        slogan: response?.data?.payload?.slogan,
        name: response?.data?.payload?.name,
        phone: response?.data?.payload?.phone,
        description: response?.data?.payload?.description,
      };
      reset(values);
      setImageReader(response.data.payload.logo);
      return response.data.payload;
    },
    refetchOnWindowFocus: false,
  });
}

export function useCreateInformation({
  onSuccess,
  onMutate,
  onError,
  informationSubmit,
}: CreateProps) {
  return useMutation({
    mutationKey: ['store'],
    mutationFn: async (data: SettingsInformationType) => {
      const response = await informationSubmit(data);
      return response;
    },
    onSuccess,
    onError,
    onMutate,
  });
}
