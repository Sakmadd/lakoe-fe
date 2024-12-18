import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { ProvinceType } from '@/types/location.types';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { createListCollection } from '@chakra-ui/react/collection';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { Controller, Control } from 'react-hook-form';
import { useState } from 'react';

export default function SettingsLocationSelectProvince({
  control,
  setId,
}: {
  control: Control<SettingsLocationType>;
  setId: (a: number) => void;
}) {
  const [province, setProvince] = useState<ProvinceType>();
  useEffect(() => {
    axios
      .get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
      .then((res) => setProvince(res.data))
      .catch(() => []);
  }, []);

  const locations = useMemo(() => {
    return createListCollection({
      items: province?.provinsi || [],
      itemToString: (item) => item.nama,
      itemToValue: (item) => item.nama,
    });
  }, [province?.provinsi]);

  return (
    <>
      <Controller
        control={control}
        name="province"
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            collection={locations}
            value={[field.value]}
            onValueChange={({ value }) => {
              field.onChange(value[0]);
            }}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent zIndex="2000">
              {province?.provinsi.map((data) => (
                <SelectItem
                  item={data.nama}
                  key={data.id}
                  onClick={() => setId(data.id)}
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
