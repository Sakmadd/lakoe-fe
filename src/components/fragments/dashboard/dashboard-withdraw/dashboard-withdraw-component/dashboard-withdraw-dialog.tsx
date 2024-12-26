import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { WithdrawType } from '@/validators/dashboard/dashboard-withdraw';
import { Box, Input, Text } from '@chakra-ui/react';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface Props {
  openWd: boolean;
  handleSubmit: UseFormHandleSubmit<WithdrawType>;
  errors: FieldErrors<WithdrawType>;
  register: UseFormRegister<WithdrawType>;
  setOpenWd: (a: boolean) => void;
  setValue: UseFormSetValue<WithdrawType>;
}

const defaultAmount = [
  { id: 1, amount: '10.000', value: '10000' },
  { id: 2, amount: '25.000', value: '25000' },
  { id: 3, amount: '50.000', value: '50000' },
  { id: 4, amount: '100.000', value: '100000' },
  { id: 5, amount: '1.000.000', value: '1000000' },
];

export default function DashboardWithdrawDialog({
  openWd,
  handleSubmit,
  errors,
  register,
  setOpenWd,
  setValue,
}: Props) {
  function fromOption(text: string) {
    setValue('amount', text, {
      shouldValidate: true,
    });
  }

  return (
    <DialogRoot open={openWd} size="lg">
      <DialogContent>
        <DialogHeader>
          <Text as="h1" fontWeight="semibold" fontFamily="sans-serif">
            Enter amount to withdraw
          </Text>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Box display="flex" flexDirection="column" gap="1rem">
              <Box display="flex" gap="1rem">
                {defaultAmount.map((item) => (
                  <Button
                    backgroundColor="transparent"
                    color="black"
                    border="1px solid lightgray"
                    borderRadius="1rem"
                    height="2rem"
                    onClick={() => fromOption(item.value)}
                  >
                    {item.amount}
                  </Button>
                ))}
              </Box>
              <Field
                errorText={errors.amount?.message}
                invalid={!!errors.amount}
              >
                <Input type="text" width="100%" {...register('amount')} />
              </Field>
              <Box display="flex" justifyContent="end">
                <Button
                  width="fit-content"
                  backgroundColor="transparent"
                  color="black"
                  border="1px solid gray"
                  borderRadius="2rem"
                  height="2rem"
                  fontSize="0.8rem"
                  type="submit"
                >
                  Request Withdraw
                </Button>
              </Box>
            </Box>
          </form>
        </DialogBody>
        <DialogCloseTrigger onClick={() => setOpenWd(false)} />
      </DialogContent>
    </DialogRoot>
  );
}
