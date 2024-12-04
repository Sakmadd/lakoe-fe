import { Switch } from '@/components/ui/switch';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldInputImage } from './field-input-imge';

export function VariantSwitch() {
  const [addImage, setAddImage] = useState(false);

  return (
    <>
      <Flex gap={'1rem'} alignItems={'center'}>
        <Switch
          size={'lg'}
          checked={addImage}
          onCheckedChange={() => setAddImage(!addImage)}
        />
        <Text fontSize={'sm'}>Add Image </Text>
      </Flex>
      <FieldInputImage />
    </>
  );
}
