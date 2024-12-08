import { Field } from '@/components/ui/field';
import { ProductType } from '@/types/types';
import { Box, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<ProductType>;
}

export function FieldInputDescription({ register }: Props) {
  const [charCount, setCharCount] = useState(0);
  const maxLength = 3000;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(event.target.value.length);
  };
  return (
    <>
      <Field label="Description" required color={'gray'}>
        <Textarea
          placeholder="Enter product description"
          minHeight="200px"
          maxLength={maxLength}
          resize="none"
          {...register('description')}
          onChange={handleInputChange}
        />
        <Box alignSelf="flex-end">
          <Text
            fontSize="sm"
            color={charCount === maxLength ? 'red.500' : 'gray.500'}
          >
            {`${charCount}/${maxLength}`}
          </Text>
        </Box>
      </Field>
    </>
  );
}
