import { useState, useEffect } from 'react';
import {
  SettingsInformationType,
  settingsInformationSchema,
} from '@/validators/settings/settings-information';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUploadFileAcceptDetails } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';

export function useSettInfo() {
  const [image, setImage] = useState<File>();
  const [imageReader, setImageReader] = useState<string | undefined>();
  const [store, setStore] = useState<SettingsInformationType>(() => {
    const local = localStorage.getItem('STORE');
    if (!local) return {};
    const parse = JSON.parse(local);
    const reader = new FileReader();
    reader.onload = () => {
      setImageReader(reader.result as string);
    };
    return parse;
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsInformationType>({
    defaultValues: {
      id: store.id,
      slogan: store.slogan,
      shop: store.shop,
      phone_number: store.phone_number,
      description: store.description,
      file: image,
    },
    resolver: zodResolver(settingsInformationSchema),
  });
  useEffect(() => {
    localStorage.setItem('STORE', JSON.stringify(store));
  }, [store]);

  function handleFile(detail: FileUploadFileAcceptDetails) {
    if (detail) {
      const file = detail.files[0];
      setImage(file);
      setValue('file', file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageReader(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const informationSubmit: SubmitHandler<SettingsInformationType> = (data) => {
    data.id = crypto.randomUUID();
    console.log(data);
    setStore(data);
    toaster.success({
      title: 'Store information is saved',
    });
  };

  return {
    register,
    handleSubmit,
    informationSubmit,
    handleFile,
    errors,
    imageReader,
    image,
  };
}
