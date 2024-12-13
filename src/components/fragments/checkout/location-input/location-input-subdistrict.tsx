'use client';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { LocationType } from '@/types/types';
import { createListCollection, Group } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useAsync } from 'react-use';

interface Props {
  disctrict: string;
  setSubdisctrict: React.Dispatch<React.SetStateAction<string>>;
}

export function LocationInputSubdisctrict({
  setSubdisctrict,
  disctrict,
}: Props) {
  const state = useAsync(async (): Promise<LocationType[]> => {
    if (disctrict == '') {
      return [{ id: '404', nama: 'Please select disctrict' }];
    }

    const response = await fetch(
      `https://ibnux.github.io/data-indonesia/kelurahan/${disctrict}.json`
    );
    const data: LocationType[] = await response.json();
    return data.sort((a, b) => a.nama.localeCompare(b.nama));
  }, [disctrict]);

  const locations = useMemo(() => {
    return createListCollection({
      items: state.value || [],
      itemToString: (item) => item.nama,
      itemToValue: (item) => item.nama,
    });
  }, [state.value]);

  return (
    <Field label={'Subdistrict'} required color={'gray'}>
      <Group attached width="100%">
        <SelectRoot
          collection={locations}
          color={'gray'}
          onValueChange={(value) => setSubdisctrict(value.items[0].id)}
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent maxHeight={'15rem'}>
            {locations.items.map((location) => (
              <SelectItem item={location} key={location.id}>
                {location.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Group>
    </Field>
  );
}
