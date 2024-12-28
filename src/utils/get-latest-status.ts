import { OrderHistoryType } from '@/types/invoice-types';

export function getLatestStatus(data: OrderHistoryType[]): string {
  const sortedData = data.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return sortedData[0].status;
}
