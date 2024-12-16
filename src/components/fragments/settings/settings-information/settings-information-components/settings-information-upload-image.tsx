import {
  Box,
  Image,
  Text,
  FileUploadFileAcceptDetails,
} from '@chakra-ui/react';
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
import { LuImage } from 'react-icons/lu';

interface Props {
  handleFile: (a: FileUploadFileAcceptDetails) => void;
  image: File | undefined;
  imageReader: string | undefined;
}

export default function SettingsInformationUploadImage({
  handleFile,
  image,
  imageReader,
}: Props) {
  return (
    <Box display="flex" alignItems="center" gap="1rem">
      <FileUploadRoot onFileAccept={handleFile} width="fit-content">
        <FileUploadTrigger
          asChild
          border="1px dashed lightgray"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          width="7rem"
          height="7rem"
          cursor="pointer"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            alignItems="center"
          >
            {image ? (
              <Image
                src={imageReader}
                borderRadius="50%"
                objectFit="cover"
                width="100%"
                height="100%"
              />
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
      <Box
        display="flex"
        gap="0.3rem"
        flexDirection="column"
        justifyContent="center"
      >
        <Text
          as="h1"
          fontSize="0.9rem"
          fontWeight="semibold"
          fontFamily="sans-serif"
        >
          Store Profile Picture
        </Text>
        <Text fontSize="0.7rem" fontFamily="sans-serif">
          Allowed file extensions: JPG, JPEG, PNG
        </Text>
      </Box>
    </Box>
  );
}
