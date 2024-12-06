import 'leaflet/dist/leaflet.css';
import '../../../styles/leaftlet.css';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import {
  settingsLocationSchema,
  SettingsLocationType,
} from '@/validators/settings-location';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import SettingsLocationBox from './settings-location-box';
import SettingsLocationForm from './settings-location-form';
import SettingsLocationMaps from './settings-location-maps';

export default function SettingsLocationContent() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsLocationType>({
    defaultValues: { id: '', location: null },
    resolver: zodResolver(settingsLocationSchema),
  });
  const [openForm, setOpenForm] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [store, setStore] = useState<SettingsLocationType[]>(() => {
    const local = localStorage.getItem('store-location');
    if (!local) return [];
    return JSON.parse(local);
  });

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

  const handleStore2: SubmitHandler<SettingsLocationType> = (data) => {
    if (!data) {
      setOpenForm(true);
    }
    data.id = crypto.randomUUID();
    setStore((current) => {
      return [...current, data];
    });
    reset();
    setOpenForm(false);
  };

  function handleDelete(id: string) {
    setStore((current) => current.filter((data) => data.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('store-location', JSON.stringify(store));
  }, [store]);

  return (
    <Box display="flex" flexDirection="column" gap="1.1rem ">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="column" gap="0.5rem">
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
        <DialogRoot size="sm" placement="center" open={openForm}>
          <DialogTrigger asChild>
            <Button
              backgroundColor="transparent"
              color="black"
              border="1px solid gray"
              borderRadius="2rem"
              height="2rem"
              fontSize="0.8rem"
              onClick={() => setOpenForm(true)}
            >
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SettingsLocationForm
              location={location}
              handleStore2={handleStore2}
              handleSubmit={handleSubmit}
              errors={errors}
              register={register}
              setOpenMap={setOpenMap}
              setOpenForm={setOpenForm}
            />
          </DialogContent>
        </DialogRoot>
      </Box>
      {store
        .map((data) => (
          <SettingsLocationBox
            key={data.id}
            data={data}
            handleDelete={handleDelete}
          />
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
    </Box>
  );
}
