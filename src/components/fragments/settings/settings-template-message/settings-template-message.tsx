import { Box, For, Input, Text, Textarea } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { LuTrash } from 'react-icons/lu';
import { FaRegEdit } from 'react-icons/fa';
import { Tooltip } from '@/components/ui/tooltip';
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
import { useEffect, useState } from 'react';
import {
  settingsTemplateSchema,
  SettingsTemplateTypes,
} from '@/validators/settings-template';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SettingsDeleteDialog from '../components/settings-delete-dialog';
import { toaster, Toaster } from '@/components/ui/toaster';

export default function SettingsTemplateMessage() {
  const [templateMessage, setTemplateMessage] = useState<
    SettingsTemplateTypes[]
  >(() => {
    const local = localStorage.getItem('TEMPLATE_MESSAGE');
    if (!local) return [];
    return JSON.parse(local);
  });
  const [dialogMode, setDialogMode] = useState('add');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [templateMessageId, setTemplateMessageId] = useState('');
  const [templateMessageTitle, setTemplateMessageTitle] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsTemplateTypes>({
    defaultValues: {
      id: '',
    },
    resolver: zodResolver(settingsTemplateSchema),
  });

  const resetTemplate = {
    id: '',
    title: '',
    message: '',
  };

  const templateSubmit: SubmitHandler<SettingsTemplateTypes> = (data) => {
    if (dialogMode != 'add') {
      setTemplateMessage((prevData) =>
        prevData.map((item) =>
          item.id === data.id ? { ...item, ...data } : item
        )
      );
      reset(resetTemplate);
      setOpenDialog(false);
      toaster.success({
        title: 'Success editing template message',
      });
      return;
    }
    if (!data) {
      setOpenDialog(true);
    }
    data.id = crypto.randomUUID();
    setTemplateMessage((current) => {
      return [...current, data];
    });
    setOpenDialog(false);
    reset(resetTemplate);
    toaster.success({
      title: 'Success adding template message',
    });
  };

  function deleteSubmit(id: string) {
    setTemplateMessage((templates) =>
      templates.filter((template) => template.id != id)
    );
    setOpenDeleteDialog(false);
    toaster.success({
      title: 'Success deleting template message',
    });
  }

  function onOpenDialog(mode: string) {
    if (mode != 'add') {
      setDialogMode(mode);
      setOpenDialog(true);
    }
    setDialogMode(mode);
    setOpenDialog(true);
  }
  function onCloseDialog() {
    setOpenDialog(false);
    reset(resetTemplate);
  }

  useEffect(() => {
    localStorage.setItem('TEMPLATE_MESSAGE', JSON.stringify(templateMessage));
  }, [templateMessage]);

  return (
    <Box display="flex" flexDirection="column" gap="1.1rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop="0.6rem"
      >
        <Text fontWeight="semibold" fontSize="0.9rem" fontFamily="sans-serif">
          Template Message
        </Text>
        <Button
          backgroundColor="transparent"
          color="black"
          border="1px solid gray"
          borderRadius="2rem"
          height="2rem"
          fontSize="0.8rem"
          // fontFamily="sans-serif"
          onClick={() => onOpenDialog('add')}
        >
          Create Template
        </Button>
      </Box>
      {templateMessage.map((template) => (
        <Box key={template.id}>
          <Box
            border="1px solid #e6e6e6"
            padding="0.8rem"
            borderRadius="1rem"
            display="flex"
            flexDirection="column"
            gap="0.5rem"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontWeight="semibold" fontSize="0.9rem">
                {template.title}
              </Text>
              <Box display="flex" gap="0.5rem">
                <Button
                  backgroundColor="transparent"
                  color="gray"
                  border="1px solid #e6e6e6"
                  borderRadius="50%"
                  width="1rem"
                  onClick={() => {
                    setTemplateMessageId(template.id);
                    setTemplateMessageTitle(template.title);
                    setOpenDeleteDialog(true);
                  }}
                >
                  <LuTrash />
                </Button>
                <Button
                  backgroundColor="transparent"
                  color="gray"
                  border="1px solid #e6e6e6"
                  borderRadius="50%"
                  width="1rem"
                  onClick={() => {
                    reset(template);
                    onOpenDialog('edit');
                  }}
                >
                  <FaRegEdit />
                </Button>
              </Box>
            </Box>
            <Box>
              <Text fontSize="0.8rem" fontFamily="sans-serif" width="85%">
                {template.message}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
      <SettingsDeleteDialog
        id={templateMessageId}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        deleteSubmit={deleteSubmit}
        header={'Delete Template Message'}
        title={templateMessageTitle}
      />
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
                          content:
                            'Add product name prefix to use product name',
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
      <Toaster />
    </Box>
  );
}
