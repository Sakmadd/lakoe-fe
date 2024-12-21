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
import { SubDistrictType } from '@/types/location.types';

interface Props {
  watch: UseFormWatch<SettingsLocationType>;
  control: Control<SettingsLocationType>;
  setValue: UseFormSetValue<SettingsLocationType>;
  id: number;
}

export default function SettingsLocationSelectSubDistrict({
  id,
  watch,
  control,
  setValue,
}: Props) {
  const district = watch('district');

  const [subDistrict, setsubDistrict] = useState<SubDistrictType>();
  useEffect(() => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
      )
      .then((res) => setsubDistrict(res.data))
      .catch(() => []);
  }, [id]);

  const locations = useMemo(() => {
    return createListCollection({
      items: subDistrict?.kelurahan || [],
      itemToString: (item) => item.nama,
      itemToValue: (item) => item.nama,
    });
  }, [subDistrict?.kelurahan]);

  return (
    <>
      <Controller
        control={control}
        name="subdistrict"
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            collection={locations}
            value={[field.value]}
            onValueChange={({ value }) => {
              field.onChange(value[0]);
            }}
            disabled={!district}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select Sub District" />
            </SelectTrigger>
            <SelectContent zIndex="2000">
              {locations.items.map((data) => (
                <SelectItem
                  item={data}
                  key={data.id}
                  onClick={() => {
                    setValue('subdistrict_id', data.id);
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
