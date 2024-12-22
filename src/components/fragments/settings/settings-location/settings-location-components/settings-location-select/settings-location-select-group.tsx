import { Field } from '@/components/ui/field';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import SettingsLocationSelectDistrict from './settings-location-select-district';
import SettingsLocationSelectProvince from './settings-location-select-province';
import SettingsLocationSelectRegency from './settings-location-select-regency';
import SettingsLocationSelectSubDistrict from './settings-location-select-subdistrict';

interface Props {
  errors: FieldErrors<SettingsLocationType>;
  watch: UseFormWatch<SettingsLocationType>;
  control: Control<SettingsLocationType>;
}

export default function SettingsLocationSelectGroup({
  errors,
  watch,
  control,
}: Props) {
  const [provinceId, setProvinceId] = useState(0);
  const [regencyId, setRegencyId] = useState(0);
  const [districtId, setDistrictId] = useState(0);

  return (
    <Box display="flex" width="100%" gap="1rem">
      <Box display="flex" flexDirection="column" width="50%" gap="1rem">
        <Field
          label="Province"
          invalid={!!errors.province}
          errorText={errors.province?.message}
        >
          <SettingsLocationSelectProvince
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
            watch={watch}
            control={control}
            id={districtId}
          />
        </Field>
      </Box>
    </Box>
  );
}
