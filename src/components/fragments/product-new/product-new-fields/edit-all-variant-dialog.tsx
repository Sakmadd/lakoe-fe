import { Button } from '@/components/ui/button';
import { CheckboxCard } from '@/components/ui/checkbox-card';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Flex, Group, Input, InputAddon } from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';

interface Props {
  variantOptionCombinations: string[];
}

export function EditAllVariantCombinationsDialog({
  variantOptionCombinations,
}: Props) {
  return (
    <>
      <DialogRoot size={'lg'}>
        <DialogTrigger asChild>
          <Button colorScheme="gray" variant="outline" borderRadius="full">
            <FaRegEdit />
            Edit All Variant
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit All Variant</DialogTitle>
            <Flex flexWrap={'wrap'} gap={'.5rem'} paddingTop={'1rem'}>
              {variantOptionCombinations.map((combination) => (
                <CheckboxCard
                  size={'sm'}
                  cursor="pointer"
                  variant="surface"
                  maxHeight={'40px'}
                  minWidth={'200px'}
                  label={combination}
                  key={combination}
                  value={combination}
                />
              ))}
            </Flex>
          </DialogHeader>
          <DialogBody>
            <Flex width={'100%'} gap={'1rem'}>
              <Flex flexDir={'column'} gap={'1rem'} width={'60%'}>
                <Field label={'Price'} required color={'gray'}>
                  <Group attached width="100%">
                    <Input type={'number'} placeholder="Enter price" />
                    <InputAddon>Rp</InputAddon>
                  </Group>
                </Field>

                <Field
                  label={'SKU (Stock Keeping Unit)'}
                  required
                  color={'gray'}
                >
                  <Group attached width="100%">
                    <Input placeholder="Enter SKU" />
                  </Group>
                </Field>
              </Flex>
              <Flex flexDir={'column'} gap={'1rem'} width={'40%'}>
                <Field label={'Product Stock'} required color={'gray'}>
                  <Group attached width="100%">
                    <Input type={'number'} placeholder="Enter stock" />
                  </Group>
                </Field>

                <Field label={'Product Weight'} required color={'gray'}>
                  <Group attached width="100%">
                    <Input type={'number'} placeholder="Enter weight" />
                    <InputAddon>Gram</InputAddon>
                  </Group>
                </Field>
              </Flex>
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button>Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
