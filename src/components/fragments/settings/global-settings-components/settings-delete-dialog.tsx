import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from '@/components/ui/dialog';
import { Text } from '@chakra-ui/react';

interface Props {
  id: string;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (a: boolean) => void;
  deleteSubmit: (a: string) => void;
  header: string;
  title: string;
}

export default function SettingsDeleteDialog({
  id,
  openDeleteDialog,
  setOpenDeleteDialog,
  deleteSubmit,
  header,
  title,
}: Props) {
  return (
    <DialogRoot open={openDeleteDialog} placement="center">
      <DialogContent>
        <DialogHeader>
          <Text as="h1" fontFamily="sans-serif" fontWeight="bold">
            {header}
          </Text>
        </DialogHeader>
        <DialogBody>
          {' '}
          <Text fontFamily="sans-serif">
            Are you sure to delete the{' '}
            <span style={{ fontWeight: 'bold' }}>{title}</span> ? Because, you
            will not be able to restore things that have been deleted.
          </Text>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outline"
            borderRadius="2rem"
            height="2rem"
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            borderRadius="2rem"
            height="2rem"
            onClick={() => deleteSubmit(id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
