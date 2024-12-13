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
import {
  settingsLocationSchema,
  SettingsLocationType,
} from '@/validators/settings/settings-location';
import { Box, Image, Input, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMapEvents } from 'react-leaflet';
import offMaps from '../../../../assets/offmaps.svg';
import onMaps from '../../../../assets/onmaps.svg';
import '../../../../styles/leaftlet.css';
import { Field } from '@/components/ui/field';
import { Tag } from '@/components/ui/tag';
import { Toaster, toaster } from '@/components/ui/toaster';
import { FaRegEdit } from 'react-icons/fa';
import { LuTrash } from 'react-icons/lu';
import SettingsLocationMaps from './settings-location-maps';
import SettingsLocationSelect from './settings-location-select';
import SettingsDeleteDialog from '../components/settings-delete-dialog';

export default function SettingsLocationContent() {
  const [dialogMode, setDialogMode] = useState('add');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const resetForm = {
    id: '',
    main: false,
    shop: '',
    postal: '',
    address: '',
    regency: '',
    location: null,
  };
  const [store, setStore] = useState<SettingsLocationType[]>(() => {
    const local = localStorage.getItem('store-location');
    if (!local) return [];
    return JSON.parse(local);
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsLocationType>({
    defaultValues: resetForm,
    resolver: zodResolver(settingsLocationSchema),
  });
  const [openMap, setOpenMap] = useState(false);

  const location = watch('location');

  function PinPoint() {
    useMapEvents({
      click(e) {
        const newLocation = e.latlng;
        setValue('location', newLocation);
      },
    });
    return null;
  }

  const handleSubmitStore: SubmitHandler<SettingsLocationType> = (data) => {
    if (dialogMode != 'add') {
      setStore((prevData) =>
        prevData.map((item) =>
          item.id === data.id ? { ...item, ...data } : item
        )
      );
      reset(resetForm);
      setOpenDialog(false);
      toaster.success({
        title: 'Success editing location',
      });
      return;
    }
    if (!data) {
      setOpenDialog(true);
    }
    if (store.length == 0) {
      data.main = true;
    }
    data.id = crypto.randomUUID();
    setStore((current) => {
      return [...current, data];
    });
    reset(resetForm);
    setOpenDialog(false);
    toaster.success({
      title: 'Success adding location',
    });
  };

  function handleMain(id: string) {
    setStore((current) =>
      current.filter((data) => {
        if (data.id == id) {
          data.main = true;
          return data;
        } else {
          data.main = false;
          return data;
        }
      })
    );
    setOpenDialog(false);
    toaster.success({
      title: 'Success changing main location',
    });
  }

  function handleDelete(id: string) {
    setStore((current) => current.filter((data) => data.id !== id));
    setOpenDeleteDialog(false);
    toaster.success({
      title: 'Success deleting location',
    });
  }

  function onOpenDialog(mode: string) {
    setDialogMode(mode);
    if (mode != 'add') setOpenDialog(true);
    reset();
    setOpenDialog(true);
  }

  function onCloseDialog() {
    reset(resetForm);
    setOpenDialog(false);
  }

  useEffect(() => {
    localStorage.setItem('store-location', JSON.stringify(store));
  }, [store]);

  return (
    <Box display="flex" flexDirection="column" gap="1.1rem ">
      <Box
        display="flex"
        justifyContent="space-between"
        marginTop="0.6rem"
        alignItems="center"
      >
        <Box display="flex" gap="0.5rem" alignItems="center">
          <Text
            as="h1"
            fontSize="0.9rem"
            fontWeight="semibold"
            fontFamily="sans-serif"
          >
            Shop's Locations
          </Text>
          <Text fontWeight="lighter" fontSize="0.8rem">
            This address is used as your shipping address
          </Text>
        </Box>
        <DialogRoot size="sm" placement="center" open={openDialog}>
          <DialogTrigger asChild>
            <Button
              backgroundColor="transparent"
              color="black"
              border="1px solid gray"
              borderRadius="2rem"
              height="2rem"
              fontSize="0.8rem"
              onClick={() => onOpenDialog('add')}
            >
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit(handleSubmitStore)}>
              <DialogHeader>
                <DialogTitle>
                  {dialogMode == 'add' ? 'Add new location' : 'Edit location'}
                </DialogTitle>
              </DialogHeader>
              <DialogBody
                pb="4"
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <Field
                  label="Location Name"
                  invalid={!!errors.shop}
                  errorText={errors.shop?.message}
                >
                  <Input
                    placeholder="Example Someone Store"
                    {...register('shop')}
                  />
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
                  <Input
                    placeholder="Input Postal Code"
                    {...register('postal')}
                  />
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
                    onClick={onCloseDialog}
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
      </Box>
      {store
        .map((data) => (
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
                    <Text
                      fontFamily="sans-serif"
                      fontSize="0.8rem"
                      fontWeight="bold"
                    >
                      {data.shop}
                    </Text>
                    {data.main && (
                      <Tag
                        colorPalette="green"
                        variant="solid"
                        fontWeight="semibold"
                      >
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
                    setOpenDeleteDialog(true);
                    setLocationTitle(data.shop);
                    setId(data.id);
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
                    onOpenDialog('edit');
                    reset(data);
                    setId(data.id);
                  }}
                >
                  <FaRegEdit />
                </Button>
              </Box>
            </Box>
          </>
        ))
        .reverse()}
      <DialogRoot size="lg" placement="center" open={openMap}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set your location pin point</DialogTitle>
          </DialogHeader>
          <SettingsLocationMaps location={location} PinPoint={PinPoint} />
          <DialogFooter>
            <Button
              variant="outline"
              borderRadius="2rem"
              height="2rem"
              onClick={() => setOpenMap(false)}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
      <SettingsDeleteDialog
        id={id}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        header={'Delete Address'}
        title={locationTitle}
        deleteSubmit={handleDelete}
      />
      <Toaster />
    </Box>
  );
}
