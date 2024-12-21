import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { createListCollection } from '@chakra-ui/react/collection';
import { Control, Controller } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { RegencyType } from '@/types/location.types';

interface Props {
  watch: UseFormWatch<SettingsLocationType>;
  control: Control<SettingsLocationType>;
  id: number;
  setId: (a: number) => void;
  setValue: UseFormSetValue<SettingsLocationType>;
}

export default function SettingsLocationSelectRegency({
  watch,
  control,
  id,
  setId,
  setValue,
}: Props) {
  const province = watch('province');

  const [regency, setRegency] = useState<RegencyType>();
  useEffect(() => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
      )
      .then((res) => setRegency(res.data))
      .catch(() => []);
  }, [id]);

  const locations = useMemo(() => {
    return createListCollection({
      items: regency?.kota_kabupaten || [],
      itemToString: (item) => item.nama,
      itemToValue: (item) => item.nama,
    });
  }, [regency?.kota_kabupaten]);

  return (
    <>
      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <SelectRoot
            collection={locations}
            name={field.name}
            value={[field.value]}
            onValueChange={({ value }) => {
              field.onChange(value[0]);
            }}
            disabled={!province}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select Regency" />
            </SelectTrigger>
            <SelectContent zIndex="2000">
              {locations.items.map((data) => (
                <SelectItem
                  item={data}
                  key={data.id}
                  onClick={() => {
                    setId(data.id);
                    setValue('city_id', data.id);
                  }}
                >
                  {data.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </>
  );
}
