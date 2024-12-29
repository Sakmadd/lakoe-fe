import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import {
  settingsWithdrawalSchema,
  SettingsWithdrawalTypes,
} from '@/validators/settings/settings-withdrawal';
import { Box, createListCollection, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  useGetBankInformation,
  useGetWithdrawBank,
  useUpdateBankInformation,
} from './settings-withdrawal-hooks/settings-withdrawal-tanstack';
import { Toaster } from '@/components/ui/toaster';

interface Bank {
  name: string;
  code_bank: string;
  bank: string;
  balance: string;
}

export default function SettingsWithdrawalContent() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SettingsWithdrawalTypes>({
    resolver: zodResolver(settingsWithdrawalSchema),
  });

  const { data } = useGetWithdrawBank();
  const { mutateAsync, isPending } = useUpdateBankInformation();
  const [items, setItem] = useState(data || []);

  const banksCol = useMemo(() => {
    setItem(data);
    return createListCollection({
      items: items || [],
      itemToString: (item: Bank) => item.name,
      itemToValue: (item: Bank) => item.name,
    });
  }, [items, data]);

  useGetBankInformation({ reset });

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
            onSubmit={handleSubmit((data) => {
              mutateAsync(data);
            })}
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
                errorText={errors.bank?.message}
              >
                <Controller
                  control={control}
                  name="bank"
                  render={({ field }) => (
                    <SelectRoot
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => {
                        field.onChange(value[0]);
                        console.log(value[0]);
                      }}
                      collection={banksCol}
                      colorPalette="black"
                    >
                      <SelectTrigger>
                        <SelectValueText placeholder={'Select Bank'} />
                      </SelectTrigger>
                      <SelectContent>
                        {banksCol.items.map((item) => (
                          <SelectItem
                            item={item?.name}
                            key={item?.bank}
                            onClick={() => {
                              setValue('bank_code', item.code_bank);
                            }}
                          >
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  )}
                />
              </Field>
              <Field
                label="Bank Account"
                invalid={!!errors.account}
                errorText={errors.account?.message}
              >
                <Input type="text" width="100%" {...register('account')} />
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
                  loading={isPending}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
}
