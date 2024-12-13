import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { UseFormRegister } from 'react-hook-form';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { createListCollection } from '@chakra-ui/react/collection';

interface Props {
  register: UseFormRegister<SettingsLocationType>;
}

export default function SettingsLocationSelect({ register }: Props) {
  return (
    <SelectRoot
      collection={collection}
      composite={false}
      {...register('regency')}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Select movie" />
      </SelectTrigger>
      <SelectContent zIndex="2000">
        {collection.items.map((data) => (
          <SelectItem item={data} key={data.value}>
            {data.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

const collection = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
});
