import { Field } from '@/components/ui/field';
import { Tag } from '@/components/ui/tag';
import { Flex, Input } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
  required: boolean;
}

export default function TagFieldInput({ label, required }: Props) {
  const [varianOption, setVariantOption] = useState<string[]>([]);

  useEffect(() => {
    console.log(label, varianOption);
  }, [label, varianOption]);

  const [sizeInput, setSizeInput] = useState(1);
  const ref_input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref_input.current?.focus();

    function handleKeyUp(event: KeyboardEvent) {
      const newText = ref_input.current!.value.trim().replace(',', '');
      switch (event.key) {
        case ',':
          if (newText.length > 0) {
            setVariantOption((prev) => [...prev, newText]);
            ref_input.current!.value = '';
          } else {
            ref_input.current!.value = '';
          }
          break;
        case 'Enter':
          if (newText.length > 0) {
            setVariantOption((prev) => [...prev, newText]);
            ref_input.current!.value = '';
          }
          break;
        default:
          break;
      }
    }

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [sizeInput, varianOption]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim().length > 0) {
      setSizeInput(value.length);
    } else {
      ref_input.current!.value = '';
    }
  };

  function handleDelItem(index: number) {
    setVariantOption((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Field label={label} required={required} color={'gray'}>
      <Flex
        alignItems={'center'}
        gap={'0.5rem'}
        border={'1px solid #e6e6e6'}
        width={'100%'}
        padding={'0.5rem'}
        borderRadius={'sm'}
      >
        {varianOption.map((text, i) => (
          <Tag
            key={text}
            colorScheme="cyan"
            closable
            onClick={() => handleDelItem(i)}
          >
            {text}
          </Tag>
        ))}
        <Input
          fontSize={'sm'}
          height={'20%'}
          position={'relative'}
          border={'none'}
          outline={'none'}
          ref={ref_input}
          onChange={handleChangeInput}
          size={'lg'}
        />
      </Flex>
    </Field>
  );
}
