import { Field } from '@/components/ui/field';
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
import {
  FileUploadFileAcceptDetails,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { imagesType } from '../../product-detail/productDetail/detailImageList';

export function FieldInputImage() {
  const [imageList, setImageList] = useState<imagesType[]>([]);

  const handleImageUpload = (event: FileUploadFileAcceptDetails) => {
    console.log(imageList);

    if (event.files) {
      const files = Array.from(event.files);
      const newImages = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      setImageList((prev) => [...prev, ...newImages]);
    }
  };

  return (
    <>
      <Field label="Product Image" required color={'gray'}>
        <Flex width={'100%'} gap={'1rem'} justifyContent={'center'}>
          {imageList.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={'10rem'}
              height={'10rem'}
              borderRadius={'1rem'}
              border={'0.1rem solid #e6e6e6'}
            />
          ))}
          {imageList.length < 5 && (
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
          )}
        </Flex>
      </Field>
    </>
  );
}
