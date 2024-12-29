import { OrderItemTypeAPI } from '@/types/types';
import { SettingsTemplateTypes } from '@/validators/settings/settings-template';

export function OrderTemplate({
  templateMessage,
  order,
}: {
  templateMessage: SettingsTemplateTypes[];
  order: OrderItemTypeAPI;
}) {
  return templateMessage?.map((template) => {
    const newContent = template.contain_message.replace(
      /\[([^\]]+)\]/g,
      (_, key) => {
        const formattedKey = key.trim().toLowerCase().replace(/ /g, '');
        if (formattedKey == 'customername') {
          return order.customer;
        }
        if (formattedKey == 'productname') {
          return order.name;
        }
        if (formattedKey == 'storename') {
          return 'toko anjing';
        }
        return key;
      }
    );

    return { ...template, content: newContent };
  });
}
