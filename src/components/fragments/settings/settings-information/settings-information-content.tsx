import { Toaster } from '@/components/ui/toaster';
import { Box, Spinner, Text } from '@chakra-ui/react';
import SettingsInformationForm from './settings-information-components/settings-information-form';
import SettingsInformationUploadImage from './settings-information-components/settings-information-upload-image';
import { useSettInfo } from './settings-information-hooks/settings-information2';

export default function SettingsInformationContent() {
  const {
    onSubmit,
    handleFile,
    errors,
    register,
    handleSubmit,
    imageReader,
    image,
    isPending,
    isFetching,
  } = useSettInfo();

  return (
    <Box marginTop="0.9rem" display="flex" flexDirection="column" gap="1rem ">
      {isFetching && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="28rem"
        >
          <Spinner size="xl" />
        </Box>
      )}
      {!isFetching && (
        <>
          <Text
            as="h1"
            fontSize="0.9rem"
            fontWeight="semibold"
            fontFamily="sans-serif"
          >
            Store Information
          </Text>
          <SettingsInformationUploadImage
            handleFile={handleFile}
            image={image}
            imageReader={imageReader}
          />
          <SettingsInformationForm
            isPending={isPending}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
          />
        </>
      )}
      <Toaster />
    </Box>
  );
}
