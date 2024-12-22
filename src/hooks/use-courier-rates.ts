import api from '@/networks/api';
import { RatesRequestDTO, RatesResponseDTO } from '@/types/rates-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCourierRates() {
  const queryClient = useQueryClient();

  // Mutation untuk fetch data dan menyimpan ke cache
  const { mutateAsync: getCourierRates } = useMutation<
    RatesResponseDTO[],
    Error,
    RatesRequestDTO
  >({
    mutationFn: async (body: RatesRequestDTO) => {
      const response = await api.GET_COURIER_RATES(body);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['courierRates'], data);
    },
  });

  // Ambil data dari cache
  const courierRates = queryClient.getQueryData<RatesResponseDTO[]>([
    'courierRates',
  ]);

  return {
    getCourierRates,
    courierRates,
  };
}
