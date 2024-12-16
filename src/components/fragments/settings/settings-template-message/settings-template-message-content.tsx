import { Box, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import SettingsDeleteDialog from '../global-settings-components/settings-delete-dialog';
import { Toaster } from '@/components/ui/toaster';
import { useSettTempMessage } from './settings-template-message-hooks/settings-template-message';
import SettingsTemplateMessageBox from './settings-template-message-components/settings-template-message-box';
import SettingsTemplateMessageForm from './settings-template-message-components/settings-template-message-form';

export default function SettingsTemplateMessageContent() {
  const {
    deleteSubmit,
    handleSubmit,
    templateSubmit,
    register,
    onOpenDialog,
    setTemplateMessageId,
    setTemplateMessageTitle,
    onCloseDialog,
    setOpenDeleteDialog,
    reset,
    templateMessage,
    templateMessageId,
    openDialog,
    openDeleteDialog,
    templateMessageTitle,
    errors,
    dialogMode,
  } = useSettTempMessage();

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
          onClick={() => onOpenDialog('add')}
        >
          Create Template
        </Button>
      </Box>
      {templateMessage
        .map((template) => (
          <SettingsTemplateMessageBox
            key={template.id}
            template={template}
            setTemplateMessageId={setTemplateMessageId}
            setTemplateMessageTitle={setTemplateMessageTitle}
            setOpenDeleteDialog={setOpenDeleteDialog}
            reset={reset}
            onOpenDialog={onOpenDialog}
          />
        ))
        .reverse()}
      <SettingsTemplateMessageForm
        openDialog={openDialog}
        handleSubmit={handleSubmit}
        templateSubmit={templateSubmit}
        errors={errors}
        register={register}
        onCloseDialog={onCloseDialog}
        dialogMode={dialogMode}
      />
      <SettingsDeleteDialog
        id={templateMessageId}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        deleteSubmit={deleteSubmit}
        header={'Delete Template Message'}
        title={templateMessageTitle}
      />
      <Toaster />
    </Box>
  );
}
