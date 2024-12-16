import { useState, useEffect } from 'react';
import {
  settingsTemplateSchema,
  SettingsTemplateTypes,
} from '@/validators/settings/settings-template';
import { toaster } from '@/components/ui/toaster';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useSettTempMessage() {
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

  return {
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
    templateMessageId,
    onCloseDialog,
    openDialog,
    openDeleteDialog,
    templateMessageTitle,
    errors,
    dialogMode,
  };
}
