'use client';
import { Field } from '@/components/ui/field';
import { createListCollection, Group } from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import React, { useMemo } from 'react';
import { useAsync } from 'react-use';
import { LocationType } from '@/types/types';

interface Props {
  setProvince: React.Dispatch<React.SetStateAction<LocationType>>;
}

export function LocationInputProvince({ setProvince }: Props) {
  const state = useAsync(async (): Promise<LocationType[]> => {
    const response = await fetch(
      `https://ibnux.github.io/data-indonesia/provinsi.json`
    );
    const data: LocationType[] = await response.json();
    return data.sort((a, b) => a.nama.localeCompare(b.nama));
  }, []);

  const locations = useMemo(() => {
    return createListCollection({
      items: state.value || [],
      itemToString: (item) => item.nama,
      itemToValue: (item) => item.nama,
    });
  }, [state.value]);

  return (
    <Field label={'Province'} required color={'gray'}>
      <Group attached width="100%">
        <SelectRoot
          collection={locations}
          color={'gray'}
          onValueChange={(value) => setProvince(value.items[0])}
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
