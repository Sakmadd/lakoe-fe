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
    queryKey: ['shop'],
    queryFn: async () => {
      const response = await api.GETSHOP();
      const values = {
        slogan: response.slogan,
        name: response.name,
        phone: response.phone,
        description: response.description,
      };
      console.log(response);
      reset(values);
      setImageReader(response.logo);
      return response;
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
    mutationKey: ['shop'],
    mutationFn: async (data: SettingsInformationType) => {
      const response = await informationSubmit(data);
      return response;
    },
    onSuccess,
    onError,
    onMutate,
  });
}
