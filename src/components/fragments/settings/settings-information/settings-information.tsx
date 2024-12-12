import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
// import { Toaster } from '@/components/ui/toaster';
// import { toaster } from '@/components/ui/toaster';
import {
  settingsInformationSchema,
  SettingsInformationType,
} from '@/validators/settings-information';
import {
  Box,
  FileUploadFileAcceptDetails,
  Image,
  Input,
  Separator,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LuImage } from 'react-icons/lu';

export default function SettingsInformation() {
  const [store, setStore] = useState<SettingsInformationType>(() => {
    const local = localStorage.getItem('STORE');
    if (!local) return {};
    const parse = JSON.parse(local);
    const reader = new FileReader();
    // const image = local.file;
    reader.onload = () => {
      setImageReader(reader.result as string);
    };
    // reader.readAsDataURL();
    return parse;
  });
  const [image, setImage] = useState<File>();
  const [imageReader, setImageReader] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = useForm<SettingsInformationType>({
    defaultValues: {
      slogan: store.slogan,
      shop: store.shop,
      description: store.description,
      file: image,
    },
    resolver: zodResolver(settingsInformationSchema),
  });

  useEffect(() => {
    localStorage.setItem('STORE', JSON.stringify(store));
  }, [store]);

  const handleInfo: SubmitHandler<SettingsInformationType> = (data) => {
    console.log(data);
    setStore(data);
    // toaster.success({
    //   title: 'Store information has been saved',
    // });
  };

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

  console.log(store);

  return (
    <Box marginTop="0.9rem" display="flex" flexDirection="column" gap="1rem ">
      <form
        style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(handleInfo)}
      >
        <Text
          as="h1"
          fontSize="0.9rem"
          fontWeight="semibold"
          fontFamily="sans-serif"
        >
          Store Information
        </Text>
        <Box display="flex" gap="1rem">
          <Box width="100%" display="flex" flexDirection="column" gap="0.8rem">
            <Box
              marginTop="1rem"
              border="1px dashed black"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              borderRadius="1rem"
              width="8rem"
              height="8rem"
            >
              <LuImage color="gray" />
              <Text fontSize="0.8rem" fontWeight="lighter">
                Upload Image
              </Text>
            </Box>
            <Field
              label="Slogan"
              errorText={errors.slogan?.message}
              invalid={!!errors.slogan}
            >
              <Input
                {...register('slogan')}
                type="text"
                fontSize="0.8rem"
                placeholder="Come up with a slogan for the shop"
              />
            </Field>
            <Field
              label="Store name"
              errorText={errors.shop?.message}
              invalid={!!errors.shop}
            >
              <Input
                {...register('shop')}
                type="text"
                fontSize="0.8rem"
                placeholder="Your store name"
              />
            </Field>
          </Box>
          <Box width="100%">
            <Field
              label="Description"
              invalid={!!errors.description}
              errorText={errors.description?.message}
            >
              <Textarea
                {...register('description')}
                size="md"
                fontSize="0.8rem"
                placeholder="Write description"
                rows={5}
              />
            </Field>
          </Box>
        </Box>

        <Input type="file" hidden />
        <Box display="flex" justifyContent="flex-end">
          <Button
            width="10%"
            backgroundColor="transparent"
            color="black"
            border="1px solid gray"
            borderRadius="2rem"
            height="2rem"
            fontSize="0.8rem"
            type="submit"
          >
            Save
          </Button>
        </Box>
        <Separator />
      </form>
      <FileUploadRoot onFileAccept={handleFile}>
        <FileUploadTrigger
          asChild
          borderRadius="1rem"
          height="8rem"
          width="15%"
          cursor="pointer"
          border="2px dotted gray"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            alignItems="center"
          >
            {image ? (
              <Image src={imageReader} width="100%" height="100%" />
            ) : (
              <>
                <LuImage color="gray" />
                <Text fontSize="0.8rem" fontWeight="lighter">
                  Upload Image
                </Text>
              </>
            )}
          </Box>
        </FileUploadTrigger>
      </FileUploadRoot>
      {/* <Toaster /> */}
    </Box>
  );
}
