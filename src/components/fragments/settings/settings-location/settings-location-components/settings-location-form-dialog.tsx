import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SettingsLocationSelectGroup from './settings-location-select/settings-location-select-group';
import { Box, Input, Textarea, Image } from '@chakra-ui/react';
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { Field } from '@/components/ui/field';
import offMaps from '../../../../../assets/offmaps.svg';
import onMaps from '../../../../../assets/onmaps.svg';

interface Props {
  openDialog: boolean;
  onOpenDialog: (a: string) => void;
  handleSubmit: UseFormHandleSubmit<SettingsLocationType>;
  handleSubmitStore: SubmitHandler<SettingsLocationType>;
  dialogMode: string;
  errors: FieldErrors<SettingsLocationType>;
  watch: UseFormWatch<SettingsLocationType>;
  control: Control<SettingsLocationType>;
  setOpenMap: (a: boolean) => void;
  location:
    | {
        lat: number;
        lng: number;
      }
    | null
    | undefined;
  handleMain: (a: string | undefined) => void;
  onCloseDialog: () => void;
  addIsPending: boolean;
  id: string | undefined;
  register: UseFormRegister<SettingsLocationType>;
}

export default function SettingsLocationFormDialog({
  register,
  openDialog,
  onOpenDialog,
  handleSubmit,
  handleSubmitStore,
  dialogMode,
  errors,
  watch,
  control,
  setOpenMap,
  location,
  handleMain,
  onCloseDialog,
  addIsPending,
  id,
}: Props) {
  return (
    <DialogRoot size="lg" placement="center" open={openDialog}>
      <DialogTrigger asChild>
        <Button
          backgroundColor="transparent"
          color="black"
          border="1px solid gray"
          borderRadius="2rem"
          height="2rem"
          fontSize="0.8rem"
          _active={{ transform: 'scale(0.95)' }}
          onClick={() => onOpenDialog('add')}
        >
          Add Location
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleSubmitStore, (error) =>
            console.log(error)
          )}
        >
          <DialogHeader>
            <DialogTitle>
              {dialogMode == 'add' ? 'Add new location' : 'Edit location'}
              {dialogMode == 'add' ? 'Add new location' : 'Edit location'}
            </DialogTitle>
          </DialogHeader>
          <DialogBody pb="4" display="flex" flexDirection="column" gap="1rem">
            <Field
              label="Location Name"
              invalid={!!errors.name}
              errorText={errors.name?.message}
            >
              <Input
                placeholder="Example Someone Store"
                {...register('name')}
              />
            </Field>
            <SettingsLocationSelectGroup
              errors={errors}
              watch={watch}
              control={control}
            />
            <Field
              label="Postal Code"
              invalid={!!errors.postal_code}
              errorText={errors.postal_code?.message}
            >
              <Input
                placeholder="Input Postal Code"
                {...register('postal_code')}
              />
            </Field>
            <Field
              label="Complete address"
              invalid={!!errors.address}
              errorText={errors.address?.message}
            >
              <Textarea
                rows={5}
                placeholder="Write down the complete address"
                {...register('address')}
              />
            </Field>
            <Box onClick={() => setOpenMap(true)} cursor="pointer">
              {location ? (
                <Image src={onMaps} width="100%" />
              ) : (
                <Image src={offMaps} width="100%" />
              )}
            </Box>
          </DialogBody>
          <DialogFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              {dialogMode != 'add' && (
                <Button
                  variant="outline"
                  borderRadius="2rem"
                  height="2rem"
                  _active={{ transform: 'scale(0.95)' }}
                  onClick={() => handleMain(id)}
                >
                  Set as Main
                </Button>
              )}
            </Box>
            <Box
              display="flex"
              gap="0.5rem"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="outline"
                borderRadius="2rem"
                height="2rem"
                _active={{ transform: 'scale(0.95)' }}
                onClick={onCloseDialog}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                type="submit"
                borderRadius="2rem"
                height="2rem"
                _active={{ transform: 'scale(0.95)' }}
                loading={addIsPending}
              >
                Save
              </Button>
            </Box>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
