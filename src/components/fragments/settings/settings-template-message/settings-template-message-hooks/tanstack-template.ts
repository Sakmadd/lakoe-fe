import api from '@/networks/api';
import { SettingsTemplateTypes } from '@/validators/settings/settings-template';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface StatusProps {
  onSuccess?: () => void;
  onMutate: () => void;
  onError: () => void;
}

export const useGetTemplate = ({
  setTemplateMessage,
}: {
  setTemplateMessage: (a: SettingsTemplateTypes[]) => void;
}) => {
  return useQuery({
    queryKey: ['template-message'],
    queryFn: async () => {
      const response = await api.GETTEMPLATE();
      console.log(response);
      setTemplateMessage(response.data.payload);
      return response.data.payload;
    },
    refetchOnWindowFocus: false,
  });
};

export const useCreateTemplate = ({
  onSuccess,
  onMutate,
  onError,
}: StatusProps) => {
  return useMutation({
    mutationKey: ['template-message'],
    mutationFn: async (data: SettingsTemplateTypes) => {
      return await api.ADDTEMPLATE(data);
    },
    onSuccess,
    onMutate,
    onError,
  });
};

export const useUpdateTemplate = ({
  onSuccess,
  onMutate,
  onError,
}: StatusProps) => {
  return useMutation({
    mutationKey: ['template-message'],
    mutationFn: async (data: SettingsTemplateTypes) => {
      return await api.UPDATETEMPLATE(data);
    },
    onSuccess,
    onMutate,
    onError,
  });
};

export const useDeleteTemplate = ({
  onSuccess,
  onMutate,
  onError,
}: StatusProps) => {
  return useMutation({
    mutationKey: ['template-message'],
    mutationFn: async (id: string | undefined) => {
      return await api.DELETETEMPLATE(id);
    },
    onSuccess,
    onMutate,
    onError,
  });
};
