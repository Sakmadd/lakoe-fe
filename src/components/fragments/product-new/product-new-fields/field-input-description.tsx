import { Field } from '@/components/ui/field';
import { Box, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  registerName: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

export function FieldInputDescription<T extends FieldValues>({
  register,
  registerName,
  label = 'Description',
  placeholder = 'Enter description',
  required = false,
  maxLength = 3000,
}: Props<T>) {
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(event.target.value.length);
  };

  return (
    <Field label={label} required={required} color={'gray'}>
      <Textarea
        placeholder={placeholder}
        minHeight="200px"
        maxLength={maxLength}
        resize="none"
        {...register(registerName)}
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
  );
}
