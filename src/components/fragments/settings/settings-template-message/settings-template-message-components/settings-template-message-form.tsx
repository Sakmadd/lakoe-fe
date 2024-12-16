import { SettingsTemplateTypes } from '@/validators/settings/settings-template';
import { FormEventHandler } from 'react';
import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Input, Box, For, Textarea, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface Props {
  openDialog: boolean;
  handleSubmit: (a: SubmitHandler<SettingsTemplateTypes>) => FormEventHandler;
  templateSubmit: (a: SettingsTemplateTypes) => void;
  register: UseFormRegister<SettingsTemplateTypes>;
  onCloseDialog: () => void;
  errors: FieldErrors<SettingsTemplateTypes>;
  dialogMode: string;
}

export default function SettingsTemplateMessageForm({
  openDialog,
  handleSubmit,
  templateSubmit,
  errors,
  register,
  onCloseDialog,
  dialogMode,
}: Props) {
  return (
    <DialogRoot open={openDialog}>
      <DialogContent>
        <form onSubmit={handleSubmit(templateSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {dialogMode == 'add'
                ? 'Create new template message'
                : 'Change template message'}
            </DialogTitle>
          </DialogHeader>
          <DialogBody display="flex" flexDirection="column" gap="1rem">
            <Field
              label="Title Message"
              invalid={!!errors.title}
              errorText={errors?.title?.message}
            >
              <Input
                placeholder="Ex. Confirm shipping message"
                {...register('title')}
              />
            </Field>
            <Box>
              <Field
                label="Detail Message"
                display="flex"
                flexDirection="column"
                gap="0.5rem"
                invalid={!!errors.message}
                errorText={errors?.message?.message}
              >
                <Box display="flex" gap="0.7rem">
                  <For
                    each={[
                      {
                        item: 'Customer Name',
                        content:
                          'Add customer name prefix to use customer name',
                      },
                      {
                        item: 'Product Name',
                        content: 'Add product name prefix to use product name',
                      },
                      {
                        item: 'Store Name',
                        content: 'Add store name prefix to use store name',
                      },
                    ]}
                  >
                    {(data) => (
                      <Tooltip content={data.content}>
                        <Box
                          cursor="pointer"
                          border="1px solid #e6e6e6"
                          borderRadius="1rem"
                          padding="0.2rem 0.5rem 0.2rem 0.5rem"
                          height="fit-content"
                        >
                          <Text fontSize="0.7rem" fontFamily="sans-serif">
                            {data.item}
                          </Text>
                        </Box>
                      </Tooltip>
                    )}
                  </For>
                </Box>
                <Textarea
                  rows={5}
                  placeholder="Write message here"
                  {...register('message')}
                />
              </Field>
            </Box>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button
                backgroundColor="transparent"
                color="black"
                border="1px solid gray"
                borderRadius="2rem"
                height="2rem"
                fontSize="0.8rem"
                onClick={onCloseDialog}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              backgroundColor="transparent"
              color="black"
              border="1px solid gray"
              borderRadius="2rem"
              height="2rem"
              type="submit"
              fontSize="0.8rem"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
