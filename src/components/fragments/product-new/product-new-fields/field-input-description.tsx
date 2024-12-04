import { Field } from '@/components/ui/field';
import { Box, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

export function FieldInputDescription() {
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
