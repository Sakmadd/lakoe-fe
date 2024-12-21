import { Box, Input } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { SettingsInformationType } from '@/validators/settings/settings-information';
import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { FormEventHandler } from 'react';

interface Props {
  handleSubmit: (a: SubmitHandler<SettingsInformationType>) => FormEventHandler;
  onSubmit: (a: SettingsInformationType) => void;
  errors: FieldErrors<SettingsInformationType>;
  register: UseFormRegister<SettingsInformationType>;
  isPending: boolean;
}

export default function SettingsInformationForm({
  isPending,
  handleSubmit,
  onSubmit,
  errors,
  register,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <Box display="flex" gap="1rem">
        <Box width="100%" display="flex" flexDirection="column" gap="0.75rem">
          <Field
            label="Store name"
            errorText={errors.name?.message}
            invalid={!!errors.name}
          >
            <Input
              {...register('name')}
              type="text"
              fontSize="0.8rem"
              placeholder="Your store name"
            />
          </Field>
          <Field
            label="Slogan"
            errorText={errors.slogan?.message}
            invalid={!!errors.slogan}
          >
            <Input
              {...register('slogan')}
              type="text"
              fontSize="0.8rem"
              placeholder="Come up with a slogan for the shop"
            />
          </Field>
          <Field
            label="Phone number"
            errorText={errors.phone?.message}
            invalid={!!errors.phone}
          >
            <Input
              {...register('phone')}
              type="text"
              fontSize="0.8rem"
              placeholder="Your phone number"
            />
          </Field>
        </Box>
        <Field
          label="Description"
          errorText={errors.description?.message}
          invalid={!!errors.description}
        >
          <Textarea
            {...register('description')}
            size="md"
            fontSize="0.8rem"
            placeholder="Write description about the store"
            rows={9}
          />
        </Field>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          width="10%"
          backgroundColor="transparent"
          color="black"
          border="1px solid gray"
          borderRadius="2rem"
          height="2rem"
          fontSize="0.8rem"
          type="submit"
          loading={isPending}
        >
          Save
        </Button>
      </Box>
    </form>
  );
}
