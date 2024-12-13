import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { Box, Image, Input, Textarea } from '@chakra-ui/react';
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@chakra-ui/react/dialog';
import { FormEventHandler } from 'react';
import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form';
import offMaps from '../../../assets/offmaps.svg';
import onMaps from '../../../assets/onmaps.svg';
import SettingsLocationSelect from './settings-location-select';

interface Props {
  handleStore2: SubmitHandler<SettingsLocationType>;
  handleSubmit: (data: SubmitHandler<SettingsLocationType>) => FormEventHandler;
  errors: FieldErrors<SettingsLocationType>;
  register: UseFormRegister<SettingsLocationType>;
  setOpenMap: (a: boolean) => void;
  setOpenForm: (a: boolean) => void;
  location:
    | {
        lat: number;
        lng: number;
      }
    | undefined
    | null;
}

export default function SettingsLocationForm({
  handleStore2,
  handleSubmit,
  errors,
  register,
  setOpenMap,
  setOpenForm,
  location,
}: Props) {
  return (
    <form onSubmit={handleSubmit(handleStore2)}>
      <DialogHeader>
        <DialogTitle>Add new location</DialogTitle>
      </DialogHeader>
      <DialogBody pb="4" display="flex" flexDirection="column" gap="1rem">
        <Field
          label="Location Name"
          invalid={!!errors.shop}
          errorText={errors.shop?.message}
        >
          <Input placeholder="Example Someone Store" {...register('shop')} />
        </Field>
        <Field
          label="City / Regency"
          invalid={!!errors.shop}
          errorText={errors.regency?.message}
        >
          <SettingsLocationSelect register={register} />
        </Field>
        <Field
          label="Postal Code"
          invalid={!!errors.postal}
          errorText={errors.postal?.message}
        >
          <Input placeholder="Input Postal Code" {...register('postal')} />
        </Field>
        <Field
          label="Complete address"
          invalid={!!errors.address}
          errorText={errors.address?.message}
        >
          <Textarea
            placeholder="Write down the complete address"
            {...register('address')}
          />
        </Field>
        <Box onClick={() => setOpenMap(true)} cursor="pointer">
          {location ? <Image src={onMaps} /> : <Image src={offMaps} />}
        </Box>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="outline"
          borderRadius="2rem"
          height="2rem"
          onClick={() => setOpenForm(false)}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          type="submit"
          borderRadius="2rem"
          height="2rem"
        >
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}
