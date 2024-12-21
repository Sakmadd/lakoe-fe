import { toaster } from '@/components/ui/toaster';
import {
  settingsTemplateSchema,
  SettingsTemplateTypes,
} from '@/validators/settings/settings-template';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { resetTemplate } from '../../constant/form';
import {
  useCreateTemplate,
  useDeleteTemplate,
  useGetTemplate,
  useUpdateTemplate,
} from './tanstack-template';

export function useSettTempMessage() {
  const [templateMessage, setTemplateMessage] =
    useState<SettingsTemplateTypes[]>();
  const [dialogMode, setDialogMode] = useState('add');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [templateMessageId, setTemplateMessageId] = useState<
    string | undefined
  >('');
  const [templateMessageTitle, setTemplateMessageTitle] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SettingsTemplateTypes>({
    defaultValues: {
      id: '',
    },
    resolver: zodResolver(settingsTemplateSchema),
  });
  const queryClient = useQueryClient();

  const { isFetching: FetchingTemplate } = useGetTemplate({
    setTemplateMessage,
  });

  const { mutateAsync: addTemplateMutateAsync, isPending: pendingAdd } =
    useCreateTemplate({
      onSuccess: () => {
        reset(resetTemplate);
        setOpenDialog(false);
        queryClient.invalidateQueries({ queryKey: ['template-message'] });
        toaster.dismiss();
        toaster.success({
          title: 'Success adding new template message',
        });
      },
      onError: () => {
        setOpenDialog(true);
        toaster.dismiss();
        toaster.error({
          title: 'Failed adding new template message',
        });
      },
      onMutate: () => {
        toaster.dismiss();
        toaster.loading({
          title: 'Adding new template message',
        });
      },
    });

  const { mutateAsync: updateTemplateMutateAsync, isPending: pendingUpdate } =
    useUpdateTemplate({
      onSuccess: () => {
        reset(resetTemplate);
        setOpenDialog(false);
        queryClient.invalidateQueries({ queryKey: ['template-message'] });
        toaster.dismiss();
        toaster.success({
          title: 'Success updating template message',
        });
      },
      onError: () => {
        setOpenDialog(true);
        toaster.dismiss();
        toaster.error({
          title: 'Failed updating template message',
        });
      },
      onMutate: () => {
        toaster.dismiss();
        toaster.loading({
          title: 'Updating template message',
        });
      },
    });

  const { mutateAsync: deleteTemplateMutateAsync, isPending: pendingDelete } =
    useDeleteTemplate({
      onSuccess: () => {
        setOpenDeleteDialog(false);
        queryClient.invalidateQueries({ queryKey: ['template-message'] });
        toaster.dismiss();
        toaster.success({
          title: 'Success deleting template message',
        });
      },
      onError: () => {
        setOpenDialog(true);
        toaster.dismiss();
        toaster.error({
          title: 'Failed deleting template message',
        });
      },
      onMutate: () => {
        toaster.dismiss();
        toaster.loading({
          title: 'Updating deleting message',
        });
      },
    });

  const templateSubmit: SubmitHandler<SettingsTemplateTypes> = (data) => {
    if (dialogMode != 'add') {
      updateTemplateMutateAsync(data);
      return;
    }
    if (!data) {
      setOpenDialog(true);
    }
    addTemplateMutateAsync(data);
  };

  function deleteSubmit(id: string | undefined) {
    deleteTemplateMutateAsync(id);
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

  return {
    pendingAdd,
    pendingUpdate,
    pendingDelete,
    deleteSubmit,
    handleSubmit,
    templateSubmit,
    register,
    onOpenDialog,
    templateMessage,
    setTemplateMessageId,
    setTemplateMessageTitle,
    setOpenDeleteDialog,
    reset,
    getValues,
    FetchingTemplate,
    templateMessageId,
    onCloseDialog,
    setValue,
    openDialog,
    openDeleteDialog,
    templateMessageTitle,
    errors,
    dialogMode,
  };
}
