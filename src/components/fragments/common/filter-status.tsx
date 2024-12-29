import { Tag } from '@/components/ui/tag';

export function filterStatus(status: string | undefined) {
  if (status == 'rejected')
    return (
      <Tag
        colorPalette="red"
        color="red"
        fontWeight="semibold"
        variant="subtle"
      >
        Rejected
      </Tag>
    );
  if (status == 'accepted')
    return (
      <Tag
        colorPalette="green"
        color="green"
        fontWeight="semibold"
        variant="subtle"
      >
        Accepted
      </Tag>
    );
  if (status == 'pending')
    return (
      <Tag
        colorPalette="blue"
        color="blue"
        fontWeight="semibold"
        variant="subtle"
      >
        Pending
      </Tag>
    );
}
