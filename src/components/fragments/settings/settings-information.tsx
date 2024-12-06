import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
import {
  settingsInformatinSchema,
  SettingsInformationType,
} from '@/validators/settings-information';
import { Box, Input, Separator, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LuImage } from 'react-icons/lu';
import { useState } from 'react';

export default function SettingsInformation() {
  const [store, setStore] = useState<SettingsInformationType[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsInformationType>({
    resolver: zodResolver(settingsInformatinSchema),
  });

  const handleInfo: SubmitHandler<SettingsInformationType> = (data) => {
    console.log(data);
    setStore((current) => {
      return [...current, data];
    });
  };

  console.log(store);

  return (
    <Box marginTop="0.5rem" display="flex" flexDirection="column" gap="1rem ">
      <Text
        as="h1"
        fontSize="0.9rem"
        fontWeight="semibold"
        fontFamily="sans-serif"
      >
        Store Information
      </Text>
      <form
        style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(handleInfo)}
      >
        <Box display="flex" gap="1rem">
          <Box width="100%" display="flex" flexDirection="column" gap="0.8rem">
            <Field
              label="Slogan"
              errorText={errors.slogan?.message}
              invalid={!!errors.slogan}
            >
              <Input
                fontSize="0.8rem"
                placeholder="Come up with a slogan for the shop"
                {...register('slogan')}
              />
            </Field>
            <Field
              label="Store name"
              errorText={errors.shop?.message}
              invalid={!!errors.shop}
            >
              <Input
                fontSize="0.8rem"
                placeholder="Your store name"
                {...register('shop')}
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
                size="md"
                fontSize="0.8rem"
                placeholder="Write description"
                rows={5}
                {...register('description')}
              />
            </Field>
          </Box>
        </Box>
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
        <Box>
          <Text
            as="h2"
            fontWeight="bold"
            fontSize="0.9rem"
            fontFamily="sans-serif"
          >
            Shop's Logo
          </Text>
        </Box>
        <FileUploadRoot
          allowDrop={true}
          height="8rem"
          display="flex"
          {...register('file')}
        >
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
              <LuImage color="gray" />
              <Text fontSize="0.8rem" fontWeight="lighter">
                Upload Image
              </Text>
            </Box>
          </FileUploadTrigger>
        </FileUploadRoot>
      </form>
    </Box>
  );
}
