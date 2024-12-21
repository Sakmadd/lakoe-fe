import { Box, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { LuTrash } from 'react-icons/lu';
import { FaRegEdit } from 'react-icons/fa';
import { SettingsTemplateTypes } from '@/validators/settings/settings-template';

interface Props {
  template: SettingsTemplateTypes;
  setTemplateMessageId: (a: string | undefined) => void;
  setOpenDeleteDialog: (a: boolean) => void;
  reset: (a: object) => void;
  setTemplateMessageTitle: (a: string) => void;
  onOpenDialog: (a: string) => void;
}

export default function SettingsTemplateMessageBox({
  template,
  setTemplateMessageId,
  setTemplateMessageTitle,
  setOpenDeleteDialog,
  reset,
  onOpenDialog,
}: Props) {
  return (
    <Box key={template.id}>
      <Box
        border="1px solid #e6e6e6"
        padding="0.8rem"
        borderRadius="1rem"
        display="flex"
        flexDirection="column"
        gap="0.5rem"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
            {template.contain_message}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
