import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { UseFormWatch } from 'react-hook-form';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { createListCollection } from '@chakra-ui/react/collection';
import { Control, Controller } from 'react-hook-form';
import { DistrictType } from '@/types/location.types';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

interface Props {
  watch: UseFormWatch<SettingsLocationType>;
  control: Control<SettingsLocationType>;
  id: number;
  setId: (a: number) => void;
}

export default function SettingsLocationSelectDistrict({
  watch,
  control,
  id,
  setId,
}: Props) {
  const regency = watch('regency');

  const [district, setdistrict] = useState<DistrictType>();
  useEffect(() => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
      )
      .then((res) => setdistrict(res.data))
      .catch(() => []);
  }, [id]);

  const locations = useMemo(() => {
    return createListCollection({
      items: district?.kecamatan || [],
      itemToString: (item) => item.nama,
      itemToValue: (item) => item.nama,
    });
  }, [district?.kecamatan]);

  return (
    <>
      <Controller
        control={control}
        name="district"
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            collection={locations}
            value={[field.value]}
            onValueChange={({ value }) => {
              field.onChange(value[0]);
            }}
            disabled={!regency}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select District" />
            </SelectTrigger>
            <SelectContent zIndex="2000">
              {locations.items.map((data) => (
                <SelectItem
                  item={data}
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
