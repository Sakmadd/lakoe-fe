import api from '@/networks/api';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface StatusProps {
  onSuccess?: () => void;
  onMutate: () => void;
  onError: () => void;
}

export const useGetLocation = ({
  setStore,
}: {
  setStore: (a: SettingsLocationType[]) => void;
}) => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await api.GETLOCATION();
      setStore(response.location);
      return response.location;
    },
    refetchOnWindowFocus: false,
  });
};

export const useCreateLocation = ({
  onSuccess,
  onMutate,
  onError,
}: StatusProps) => {
  return useMutation({
    mutationKey: ['locations'],
    mutationFn: async (data: SettingsLocationType) => {
      return await api.ADDLOCATION(data);
    },
    onSuccess,
    onMutate,
    onError,
  });
};

export const useUpdateLocation = ({
  onSuccess,
  onMutate,
  onError,
}: StatusProps) => {
  return useMutation({
    mutationKey: ['locations'],
    mutationFn: async (data: SettingsLocationType) => {
      return await api.UPDATELOCATION(data);
    },
    onSuccess,
    onMutate,
    onError,
  });
};

export const useUpdateMainLocation = ({
  onSuccess,
  onMutate,
  onError,
}: StatusProps) => {
  return useMutation({
    mutationKey: ['locations'],
    mutationFn: async (id: string | undefined) => {
      return await api.UPDATEMAINLOCATION(id);
    },
    onSuccess,
    onMutate,
    onError,
  });
};

export const useDeleteLocation = ({
  onSuccess,
  onMutate,
  onError,
}: StatusProps) => {
  return useMutation({
    mutationKey: ['locations'],
    mutationFn: async (id: string | undefined) => {
      return await api.DELETELOCATION(id);
    },
    onSuccess,
    onError,
    onMutate,
  });
};
