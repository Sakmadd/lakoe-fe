import { toaster } from '@/components/ui/toaster';
import {
  settingsLocationSchema,
  SettingsLocationType,
} from '@/validators/settings/settings-location';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMapEvents } from 'react-leaflet';
import {
  useGetLocation,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
  useUpdateMainLocation,
} from './tanstack-location';
import { resetForm } from '../../constant/form';

export function useSettLocation() {
  const queryClient = useQueryClient();
  const [daerah, setDaerah] = useState();
  const [dialogMode, setDialogMode] = useState('add');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState<string | undefined>('');
  const [locationTitle, setLocationTitle] = useState('');
  const [openMap, setOpenMap] = useState(false);
  const [store, setStore] = useState<SettingsLocationType[]>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<SettingsLocationType>({
    defaultValues: resetForm,
    resolver: zodResolver(settingsLocationSchema),
  });

  const location = watch('location');

  const { data: LocationData, isFetching: FetchingLocationData } =
    useGetLocation({ setStore });

  const { mutateAsync: addMutateAsync, isPending: addIsPending } =
    useCreateLocation({
      onSuccess: () => {
        reset(resetForm);
        setOpenDialog(false);
        queryClient.invalidateQueries({ queryKey: ['locations'] });
        toaster.dismiss();
        toaster.success({
          title: 'Success adding location',
        });
      },
      onError: () => {
        setOpenDialog(true);
        toaster.dismiss();
        toaster.error({
          title: 'Failed adding location',
        });
      },
      onMutate: () => {
        toaster.dismiss();
        toaster.loading({
          title: 'Adding location',
        });
      },
    });

  const { mutateAsync: updateMutateAsync } = useUpdateLocation({
    onSuccess: () => {
      reset(resetForm);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toaster.dismiss();
      toaster.success({
        title: 'Success updating location',
      });
    },
    onError: () => {
      setOpenDialog(true);
      toaster.dismiss();
      toaster.error({
        title: 'Failed updating location',
      });
    },
    onMutate: () => {
      toaster.dismiss();
      toaster.loading({
        title: 'Updating location',
      });
    },
  });

  const { mutateAsync: updateMainMutateAsync } = useUpdateMainLocation({
    onSuccess: () => {
      reset(resetForm);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toaster.dismiss();
      toaster.success({
        title: 'Success setting new main location',
      });
    },
    onError: () => {
      setOpenDialog(true);
      toaster.dismiss();
      toaster.error({
        title: 'Failed setting main location',
      });
    },
    onMutate: () => {
      toaster.dismiss();
      toaster.loading({
        title: 'Updating main location',
      });
    },
  });

  const { mutateAsync: deleteMutateAsync, isPending: pendingDelete } =
    useDeleteLocation({
      onSuccess: () => {
        setOpenDeleteDialog(false);
        queryClient.invalidateQueries({ queryKey: ['locations'] });
        toaster.dismiss();
        toaster.success({
          title: 'Success deleting location',
        });
      },
      onError: () => {
        toaster.dismiss();
        toaster.error({
          title: 'Failed deleting location',
        });
      },
      onMutate: () => {
        toaster.dismiss();
        toaster.loading({
          title: 'Deleting location',
        });
      },
    });

  function PinPoint() {
    useMapEvents({
      click(e) {
        const newLocation = e.latlng;
        setValue('location', newLocation);
        setValue('longitude', String(newLocation.lng));
        setValue('latitude', String(newLocation.lat));
      },
    });
    return null;
  }

  const handleDelete = (id: string | undefined) => {
    store?.filter((data) => {
      if (data.id != id && data.is_main == false) {
        updateMainMutateAsync(data.id);
        return;
      }
    });
    deleteMutateAsync(id);
  };

  const handleSubmitStore: SubmitHandler<SettingsLocationType> = (data) => {
    if (dialogMode != 'add') {
      console.log(data);
      updateMutateAsync(data);
      return;
    }
    if (!data) {
      setOpenDialog(true);
    }
    addMutateAsync(data);
  };

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

  return {
    locationComponents: {
      PinPoint,
    },
    locationState: {
      setId,
      setLocationTitle,
      locationTitle,
      id,
      location,
      daerah,
      setDaerah,
    },
    locationMutation: {
      handleDelete,
      handleMain: updateMainMutateAsync,
    },
    locationData: {
      store,
      LocationData,
      FetchingLocationData,
    },
    locationDialog: {
      pendingDelete,
      openMap,
      setOpenMap,
      dialogMode,
      onCloseDialog,
      onOpenDialog,
      setOpenDeleteDialog,
      openDeleteDialog,
      openDialog,
    },
    locationForm: {
      addIsPending,
      control,
      watch,
      handleSubmitStore,
      handleSubmit,
      register,
      reset,
      errors,
    },
  };
}
