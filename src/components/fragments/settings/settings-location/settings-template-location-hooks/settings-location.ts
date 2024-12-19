import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import {
  settingsLocationSchema,
  SettingsLocationType,
} from '@/validators/settings/settings-location';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMapEvents } from 'react-leaflet';

export function useSettLocation() {
  const [dialogMode, setDialogMode] = useState('add');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const resetForm = {
    is_main: false,
    name: '',
    postal_code: '',
    address: '',
    city: '',
    province: '',
    district: '',
    subdistrict: '',
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
    control,
    formState: { errors },
  } = useForm<SettingsLocationType>({
    // defaultValues: resetForm,
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

  const { mutateAsync: addMutateAsync, isPending: addIsPending } = useMutation({
    mutationKey: ['locations'],
    mutationFn: async (data: SettingsLocationType) => {
      const hit = await api.ADDLOCATION(data);
      console.log(hit);
      return hit;
    },
    onSuccess: () => {
      reset(resetForm);
      setOpenDialog(false);
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

  const handleSubmitStore: SubmitHandler<SettingsLocationType> = (data) => {
    // if (dialogMode != 'add') {
    //   setStore((prevData) =>
    //     prevData.map((item) =>
    //       item.id === data.id ? { ...item, ...data } : item
    //     )
    //   );
    //   reset(resetForm);
    //   setOpenDialog(false);
    //   toaster.success({
    //     title: 'Success editing location',
    //   });
    //   return;
    // }
    if (!data) {
      setOpenDialog(true);
    }
    if (store.length == 0) {
      // data.main = true;
    }
    // data.id = crypto.randomUUID();
    // setStore((current) => {
    //   return [...current, data];
    // });
    // reset(resetForm);
    // setOpenDialog(false);
    // toaster.success({
    //   title: 'Success adding location',
    // });
    // console.log(data);
    addMutateAsync(data);
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
    },
    locationMutation: {
      handleDelete,
      handleMain,
    },
    locationData: {
      store,
    },
    locationDialog: {
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
