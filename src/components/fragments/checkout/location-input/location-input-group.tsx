import { useState } from 'react';
import { LocationInputDisctrict } from './location-input-district';
import { LocationInputProvince } from './location-input-province';
import { LocationInputSubdisctrict } from './location-input-subdistrict';
import { LocationInputCity } from './locatoin-input-city';

export function LocationInputGroup() {
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDisctrict] = useState<string>('');
  const [, setSubdistrict] = useState<string>('');

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
