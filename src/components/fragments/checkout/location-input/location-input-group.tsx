import { useState, useEffect } from 'react';
import { LocationInputDisctrict } from './location-input-district';
import { LocationInputProvince } from './location-input-province';
import { LocationInputSubdisctrict } from './location-input-subdistrict';
import { LocationInputCity } from './locatoin-input-city';
import { LocationType, recipientType } from '@/types/types';
import { UseFormSetValue } from 'react-hook-form';

interface Props {
  setValue: UseFormSetValue<recipientType>;
}

export function LocationInputGroup({ setValue }: Props) {
  const [province, setProvince] = useState<LocationType>({
    id: '404',
    nama: 'Please select your province',
  });
  const [city, setCity] = useState<LocationType>({
    id: '404',
    nama: 'Please select your city',
  });
  const [district, setDisctrict] = useState<LocationType>({
    id: '404',
    nama: 'Please select your district',
  });
  const [subdistrict, setSubdistrict] = useState<LocationType>({
    id: '404',
    nama: 'Please select your subdistrict',
  });

  useEffect(() => {
    setValue('province', province.nama);
  }, [province, setValue]);

  useEffect(() => {
    setValue('city', city.nama);
  }, [city, setValue]);

  useEffect(() => {
    setValue('district', district.nama);
  }, [district, setValue]);

  useEffect(() => {
    setValue('subdistrict', subdistrict.nama);
  }, [subdistrict, setValue]);

  return (
    <>
      <LocationInputProvince setProvince={setProvince} />
      <LocationInputCity setCity={setCity} province={province} />
      <LocationInputDisctrict city={city} setDisctrict={setDisctrict} />
      <LocationInputSubdisctrict
        disctrict={district}
        setSubdisctrict={setSubdistrict}
      />
    </>
  );
}
