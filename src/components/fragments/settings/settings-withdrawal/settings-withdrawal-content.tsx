import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { bankCollection } from '@/dummy-data/banks-data';
import {
  settingsWithdrawalSchema,
  SettingsWithdrawalTypes,
} from '@/validators/settings/settings-withdrawal';
import { Box, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function SettingsWithdrawalContent() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SettingsWithdrawalTypes>({
    resolver: zodResolver(settingsWithdrawalSchema),
  });

  const banksCol = useMemo(() => {
    return bankCollection;
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="1.1rem">
      <Box marginTop="0.9rem" display="flex" flexDirection="column" gap="2rem">
        <Text fontWeight="semibold" fontSize="0.9rem" fontFamily="sans-serif">
          Withdrawal
        </Text>
        <Box>
          <form
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            onSubmit={handleSubmit(
              (data) => console.log(data),
              (error) => console.log(error)
            )}
          >
            <Box display="flex" flexDirection="column" width="100%" gap="1rem">
              <Field
                label="Name"
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                <Input type="text" width="100%" {...register('name')} />
              </Field>
              <Field
                label="Bank"
                invalid={!!errors.name}
                errorText={errors.bank_name?.message}
              >
                <Controller
                  control={control}
                  name="bank_name"
                  render={({ field }) => (
                    <SelectRoot
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => {
                        field.onChange(value[0]);
                      }}
                      collection={banksCol}
                      colorPalette="black"
                    >
                      <SelectTrigger>
                        <SelectValueText placeholder="Select Bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banksCol.items.map((bank) => (
                          <SelectItem item={bank.label} key={bank.value}>
                            {bank.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  )}
                />
              </Field>
              <Field
                label="Bank Account"
                invalid={!!errors.bank_account}
                errorText={errors.bank_account?.message}
              >
                <Input type="text" width="100%" {...register('bank_account')} />
              </Field>
              <Box display="flex" justifyContent="end">
                <Button
                  type="submit"
                  backgroundColor="transparent"
                  color="black"
                  borderRadius="1rem"
                  border="1px solid gray"
                  width="13%"
                  height="1.8rem"
                  fontSize="0.8rem"
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
