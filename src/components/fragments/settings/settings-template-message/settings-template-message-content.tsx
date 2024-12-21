import { Box, Spinner, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import SettingsDeleteDialog from '../global-settings-components/settings-delete-dialog';
import { Toaster } from '@/components/ui/toaster';
import { useSettTempMessage } from './settings-template-message-hooks/settings-template-message';
import SettingsTemplateMessageBox from './settings-template-message-components/settings-template-message-box';
import SettingsTemplateMessageForm from './settings-template-message-components/settings-template-message-form';
import SettingsEmptyContent from '../global-settings-components/settings-empty-content';

export default function SettingsTemplateMessageContent() {
  const {
    deleteSubmit,
    handleSubmit,
    templateSubmit,
    register,
    setValue,
    onOpenDialog,
    setTemplateMessageId,
    setTemplateMessageTitle,
    onCloseDialog,
    setOpenDeleteDialog,
    reset,
    getValues,
    templateMessage,
    templateMessageId,
    openDialog,
    openDeleteDialog,
    templateMessageTitle,
    errors,
    dialogMode,
    FetchingTemplate,
    pendingAdd,
    pendingUpdate,
    pendingDelete,
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
      {FetchingTemplate && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Box>
      )}
      {!FetchingTemplate &&
        templateMessage
          ?.map((template) => (
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
        getValues={getValues}
        setValue={setValue}
        pendingAdd={pendingAdd}
        pendingUpdate={pendingUpdate}
        openDialog={openDialog}
        handleSubmit={handleSubmit}
        templateSubmit={templateSubmit}
        errors={errors}
        register={register}
        onCloseDialog={onCloseDialog}
        dialogMode={dialogMode}
      />
      <SettingsDeleteDialog
        pendingDelete={pendingDelete}
        id={templateMessageId}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        deleteSubmit={deleteSubmit}
        header={'Delete Template Message'}
        title={templateMessageTitle}
      />
      {templateMessage?.length == 0 && (
        <SettingsEmptyContent
          content={"You don't have a message template yet"}
        />
      )}
      <Toaster />
    </Box>
  );
}
