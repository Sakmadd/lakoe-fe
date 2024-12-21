import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import { StoreState } from '@/redux/store';
import {
  settingsInformationSchema,
  SettingsInformationType,
} from '@/validators/settings/settings-information';
import { FileUploadFileAcceptDetails } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export function useSettInfo() {
  const [image, setImage] = useState<File>();
  const User = useSelector((state: StoreState) => state.loggedUser.value);
  const [imageReader, setImageReader] = useState<string | undefined>(
    User?.Shop.logo
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsInformationType>({
    defaultValues: {
      slogan: User?.Shop.slogan,
      name: User?.Shop.name,
      phone: User?.Shop.phone,
      description: User?.Shop.description,
      logo: image,
    },
    resolver: zodResolver(settingsInformationSchema),
  });

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

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['store'],
    mutationFn: async (data: SettingsInformationType) => {
      const response = await informationSubmit(data);
      return response;
    },
    onSuccess: () => {
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
    isPending,
    onSubmit,
    handleFile,
    errors,
    register,
    handleSubmit,
    imageReader,
    image,
  };
}
