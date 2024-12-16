import { Toaster } from '@/components/ui/toaster';
import { Box, Text } from '@chakra-ui/react';
import SettingsInformationForm from './settings-information-components/settings-information-form';
import SettingsInformationUploadImage from './settings-information-components/settings-information-upload-image';
import { useSettInfo } from './settings-information-hooks/settings-information';

export default function SettingsInformationContent() {
  const {
    register,
    handleSubmit,
    informationSubmit,
    handleFile,
    errors,
    imageReader,
    image,
  } = useSettInfo();

  return (
    <Box marginTop="0.9rem" display="flex" flexDirection="column" gap="1rem ">
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
        handleSubmit={handleSubmit}
        informationSubmit={informationSubmit}
        errors={errors}
        register={register}
      />
      <Toaster />
    </Box>
  );
}
