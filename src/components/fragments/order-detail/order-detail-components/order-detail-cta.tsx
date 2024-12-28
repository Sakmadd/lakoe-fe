import { Box } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '../../container/contentContainer';
import {
  usePostAcceptOrder,
  usePostDeclineOrder,
} from '../order-detail-hooks/order-detail-tanstack';

export default function OrderDetailCTA({ id }: { id: string }) {
  const { mutateAsync, isPending } = usePostAcceptOrder();
  const { mutateAsync: declineMutateAsync, isPending: declineIsPending } =
    usePostDeclineOrder();

  return (
    <ContentContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        padding="0.2rem"
        alignItems="center"
      >
        <Button
          color="red"
          backgroundColor="transparent"
          border="1px solid red"
          borderRadius="1rem"
          height="2rem"
          loading={declineIsPending}
          onClick={() => declineMutateAsync(id)}
        >
          Reject Order
        </Button>
        <Button
          color="black"
          backgroundColor="transparent"
          border="1px solid gray"
          borderRadius="1rem"
          height="2rem"
          loading={isPending}
          onClick={() => mutateAsync(id)}
        >
          Accept Order
        </Button>
      </Box>
    </ContentContainer>
  );
}
