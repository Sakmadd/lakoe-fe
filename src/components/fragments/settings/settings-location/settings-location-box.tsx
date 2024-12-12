import { Button } from '@/components/ui/button';
import { SettingsLocationType } from '@/validators/settings-location';
import { Box, Input, Text, Textarea, Image } from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { LuTrash } from 'react-icons/lu';
import { Tag } from '@/components/ui/tag';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import offMaps from '../../../assets/offmaps.svg';
import onMaps from '../../../assets/onmaps.svg';
import { Field } from '@/components/ui/field';
import { SubmitHandler, UseFormRegister } from 'react-hook-form';
import SettingsLocationSelect from './settings-location-select';
import { FormEventHandler } from 'react';

interface Props {
  data: SettingsLocationType;
  handleDelete: (a: string) => void;
  handleMain: (a: string) => void;
  setOpenEdit: (a: boolean) => void;
  openEdit: boolean;
  register: UseFormRegister<SettingsLocationType>;
  handleEdit: (a: SettingsLocationType) => void;
  handleStoreEdit: SubmitHandler<SettingsLocationType>;
  handleSubmit: (data: SubmitHandler<SettingsLocationType>) => FormEventHandler;
  reset: (a: object) => void;
}

export default function SettingsLocationBox({
  data,
  handleDelete,
  reset,
  handleMain,
  handleStoreEdit,
  handleSubmit,
  setOpenEdit,
  openEdit,
  register,
  handleEdit,
}: Props) {
  return (
    <>
      <Box
        border="1px solid #e6e6e6"
        display="flex"
        padding="0.8rem"
        borderRadius="1rem"
        justifyContent="space-between"
      >
        <Box display="flex" gap="3rem">
          <Box display="flex" flexDirection="column" gap="0.3rem">
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              Location Name
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              Address
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              City / Subdistrict
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              Postal Code
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              Pinpoint
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="0.3rem">
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Text fontFamily="sans-serif" fontSize="0.8rem" fontWeight="bold">
                {data.shop}
              </Text>
              {data.main && (
                <Tag colorPalette="green" variant="solid" fontWeight="semibold">
                  Main Address
                </Tag>
              )}
            </Box>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              {data.address}
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              {data.regency}
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              {data.postal}
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              {data.location ? 'Already pin point' : 'No pin point'}
            </Text>
          </Box>
        </Box>
        <Box display="flex" gap="0.5rem">
          <Button
            backgroundColor="transparent"
            color="gray"
            border="1px solid #e6e6e6"
            borderRadius="50%"
            width="1rem"
            onClick={() => {
              handleDelete(data.id);
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
              setOpenEdit(true);
              handleEdit(data);
            }}
          >
            <FaRegEdit />
          </Button>
        </Box>
      </Box>
      <DialogRoot size="sm" open={openEdit} placement="center">
        <DialogContent>
          <form onSubmit={handleSubmit(handleStoreEdit)}>
            <DialogHeader>
              <DialogTitle>Edit location</DialogTitle>
            </DialogHeader>
            <DialogBody pb="4" display="flex" flexDirection="column" gap="1rem">
              <Field label="Location Name">
                <Input
                  placeholder="Example Someone Store"
                  {...register('shop')}
                />
              </Field>
              <Field label="City / Regency">
                <SettingsLocationSelect register={register} />
              </Field>
              <Field label="Postal Code">
                <Input
                  placeholder="Input Postal Code"
                  {...register('postal')}
                />
              </Field>
              <Field label="Complete address">
                <Textarea
                  placeholder="Write down the complete address"
                  {...register('address')}
                />
              </Field>
              <Box onClick={() => console.log('Tes')} cursor="pointer">
                {location ? <Image src={onMaps} /> : <Image src={offMaps} />}
              </Box>
            </DialogBody>
            <DialogFooter display="flex" justifyContent="space-between">
              <Button
                variant="outline"
                borderRadius="2rem"
                height="2rem"
                onClick={() => {
                  handleMain(data.id);
                  setOpenEdit(false);
                  reset({
                    id: '',
                    main: false,
                    shop: '',
                    postal: '',
                    address: '',
                    regency: '',
                    location: null,
                  });
                }}
              >
                Set as Main
              </Button>
              <Box display="flex" gap="0.5rem" alignItems="center">
                <Button
                  variant="outline"
                  borderRadius="2rem"
                  height="2rem"
                  onClick={() => {
                    setOpenEdit(false);
                    reset({
                      id: '',
                      main: false,
                      shop: '',
                      postal: '',
                      address: '',
                      regency: '',
                      location: null,
                    });
                  }}
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
              </Box>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
