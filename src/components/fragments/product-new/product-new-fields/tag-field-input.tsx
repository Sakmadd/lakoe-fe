import { Field } from '@/components/ui/field';
import { Tag } from '@/components/ui/tag';
import { Flex, Input } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
  required: boolean;
  variantName: string;
  onOptionsChange: (name: string, options: string[]) => void;
}

export default function TagFieldInput({
  label,
  required,
  variantName,
  onOptionsChange,
}: Props) {
  const [varianOption, setVariantOption] = useState<string[]>([]);
  const previousVarianOption = useRef<string[]>([]);

  useEffect(() => {
    if (
      JSON.stringify(varianOption) !==
      JSON.stringify(previousVarianOption.current)
    ) {
      onOptionsChange(variantName, varianOption);
      previousVarianOption.current = varianOption;
    }
  }, [varianOption, variantName, onOptionsChange]);

  const ref_input = useRef<HTMLInputElement>(null);

  const handleKeyUp = (event: KeyboardEvent) => {
    const newText = ref_input.current!.value.trim().replace(',', '');
    if (['Enter', ','].includes(event.key) && newText) {
      setVariantOption((prev) => [...prev, newText]);
      ref_input.current!.value = '';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newText = ref_input.current!.value.trim().replace(',', '');
    if (['Enter', ','].includes(event.key)) {
      event.preventDefault();
      if (newText) {
        setVariantOption((prev) => [...prev, newText]);
        ref_input.current!.value = '';
      }
    }
  };

  useEffect(() => {
    ref_input.current?.focus();
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  const handleDelItem = (index: number) => {
    setVariantOption((prev) => prev.filter((_, i) => i !== index));
  };

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
          size={'lg'}
          onKeyDown={handleKeyDown}
          required={false}
        />
      </Flex>
    </Field>
  );
}
