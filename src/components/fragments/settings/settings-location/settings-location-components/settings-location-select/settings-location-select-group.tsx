import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import SettingsLocationSelectProvince from './settings-location-select-province';
import { Box } from '@chakra-ui/react';
import SettingsLocationSelectRegency from './settings-location-select-regency';
import SettingsLocationSelectDistrict from './settings-location-select-district';
import SettingsLocationSelectSubDistrict from './settings-location-select-subdistrict';
import { Field } from '@/components/ui/field';
import { useState } from 'react';

interface Props {
  errors: FieldErrors<SettingsLocationType>;
  watch: UseFormWatch<SettingsLocationType>;
  control: Control<SettingsLocationType>;
  setValue: UseFormSetValue<SettingsLocationType>;
  getValues: UseFormGetValues<SettingsLocationType>;
}

export default function SettingsLocationSelectGroup({
  errors,
  watch,
  control,
  setValue,
  getValues,
}: Props) {
  const [provinceId, setProvinceId] = useState(() => {
    const province_db_id = getValues('province_id');
    if (!province_db_id) return 0;
    return province_db_id;
  });
  const [regencyId, setRegencyId] = useState(() => {
    const regency_db_id = getValues('city_id');
    if (!regency_db_id) return 0;
    return regency_db_id;
  });
  const [districtId, setDistrictId] = useState(() => {
    const district_db_id = getValues('city_id');
    if (!district_db_id) return 0;
    return district_db_id;
  });

  return (
    <Box display="flex" width="100%" gap="1rem">
      <Box display="flex" flexDirection="column" width="50%" gap="1rem">
        <Field
          label="Province"
          invalid={!!errors.province}
          errorText={errors.province?.message}
        >
          <SettingsLocationSelectProvince
            setValue={setValue}
            control={control}
            setId={setProvinceId}
          />
        </Field>
        <Field
          label="Regency"
          invalid={!!errors.city}
          errorText={errors.city?.message}
        >
          <SettingsLocationSelectRegency
            setValue={setValue}
            watch={watch}
            control={control}
            id={provinceId}
            setId={setRegencyId}
          />
        </Field>
      </Box>
      <Box display="flex" flexDirection="column" width="50%" gap="1rem">
        <Field
          label="District"
          invalid={!!errors.district}
          errorText={errors.district?.message}
        >
          <SettingsLocationSelectDistrict
            setValue={setValue}
            watch={watch}
            control={control}
            id={regencyId}
            setId={setDistrictId}
          />
        </Field>
        <Field
          label="Sub District"
          invalid={!!errors.subdistrict}
          errorText={errors.subdistrict?.message}
        >
          <SettingsLocationSelectSubDistrict
            setValue={setValue}
            watch={watch}
            control={control}
            id={districtId}
          />
        </Field>
      </Box>
    </Box>
  );
}
