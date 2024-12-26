import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import {
  settingsInformationSchema,
  SettingsInformationType,
} from '@/validators/settings/settings-information';
import { FileUploadFileAcceptDetails } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useCreateInformation,
  useGetInformation,
} from './tanstack-information';

export function useSettInfo() {
  const [image, setImage] = useState<File>();
  const [imageReader, setImageReader] = useState<string | undefined>();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SettingsInformationType>({
    defaultValues: {
      slogan: '',
      name: '',
      phone: '',
      description: '',
      logo: '',
    },
    resolver: zodResolver(settingsInformationSchema),
  });
  const { isFetching, data } = useGetInformation({ reset, setImageReader });

  function handleFile(detail: FileUploadFileAcceptDetails) {
    if (detail) {
      const file = detail.files[0];
      setImage(file);
      setValue('logo', file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageReader(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const informationSubmit: SubmitHandler<SettingsInformationType> = async (
    data
  ) => {
    if (image) {
      data.logo = image;
    }
    await api.UPDATESHOP(data);
  };

  const onSubmit: SubmitHandler<SettingsInformationType> = (data) => {
    mutateAsync(data);
  };

  const { mutateAsync, isPending } = useCreateInformation({
    informationSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop'] });
      toaster.dismiss();
      toaster.success({
        title: 'Store information is saved',
      });
    },
    onError: () => {
      toaster.dismiss();
      toaster.error({
        title: 'Failed to update store information',
      });
    },
    onMutate: () => {
      toaster.loading({
        title: 'Saving',
      });
    },
  });

  return {
    isFetching,
    isPending,
    onSubmit,
    handleFile,
    errors,
    register,
    handleSubmit,
    imageReader,
    image,
    data,
  };
}
