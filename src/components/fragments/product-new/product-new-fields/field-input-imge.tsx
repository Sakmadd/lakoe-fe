import { Field } from '@/components/ui/field';
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
import { imagesType } from '@/types/types';
import {
  Box,
  FileUploadFileAcceptDetails,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';

interface Prosp {
  label?: string;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export function FieldInputImage({ label, setImages }: Prosp) {
  const [previewImageList, setPreviewImageList] = useState<imagesType[]>([]);

  const handleImageUpload = (event: FileUploadFileAcceptDetails) => {
    if (event.files) {
      const files = Array.from(event.files);

      // Simpan gambar-gambar yang diupload ke state images
      setImages((prevImages) => [...prevImages, ...files]);

      const newImages = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      setPreviewImageList((prev) => [...prev, ...newImages]);
    }
  };

  const handleImageRemove = (index: number) => {
    setPreviewImageList((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index)); // Hapus gambar dari state images juga
  };

  return (
    <Field label={label} required color={'gray'}>
      <Flex
        width={'100%'}
        gap={'1rem'}
        flexWrap={'wrap'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        {previewImageList.map((image, index) => (
          <Box key={index} position={'relative'}>
            <Image
              src={image.src}
              alt={image.alt}
              width={'10rem'}
              height={'10rem'}
              borderRadius={'1rem'}
            />
            <Box
              margin={'.3rem'}
              position="absolute"
              top="0"
              right="0"
              width={'1.5rem'}
              height={'1.5rem'}
              aria-label="Remove image"
              onClick={() => handleImageRemove(index)}
              backgroundColor={'red.400'}
              cursor={'pointer'}
              borderRadius={'full'}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color={'white'} fontWeight={'bold'} fontSize={'10px'}>
                X
              </Text>
            </Box>
          </Box>
        ))}

        {previewImageList.length < 5 && (
          <Box>
            <FileUploadRoot
              onFileAccept={(e) => handleImageUpload(e)}
              accept="image/*"
            >
              <FileUploadTrigger asChild>
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  cursor={'pointer'}
                  width={'10rem'}
                  height={'10rem'}
                  borderRadius={'1rem'}
                  border={'0.2rem solid #e6e6e6'}
                  borderStyle={'dashed'}
                >
                  <Flex flexDir={'column'} alignItems={'center'}>
                    <BiImageAdd size={'2rem'} />
                    <Text fontSize={'.8rem'}>Upload Image</Text>
                  </Flex>
                </Flex>
              </FileUploadTrigger>
            </FileUploadRoot>
          </Box>
        )}
      </Flex>
    </Field>
  );
}
