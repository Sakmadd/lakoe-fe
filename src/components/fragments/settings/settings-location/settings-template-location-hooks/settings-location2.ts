// import api from '@/networks/api';
// import { SettingsLocationType } from '@/validators/settings/settings-location';
// import { useMutation } from '@tanstack/react-query';
// import { toaster } from '@/components/ui/toaster';
// import { useState } from 'react';

// export const useSettLocation = () => {
//   const [dialogMode, setDialogMode] = useState('add');
//   const postLocationMutation = useMutation({
//     mutationKey: ['PostLocMutate'],
//     mutationFn: async (data: SettingsLocationType) => {
//       return await api.ADDLOCATION(data);
//     },
//     onSuccess: () => {
//       toaster.dismiss();
//       toaster.success({
//         title: 'Success adding new store location',
//       });
//     },
//     onError: () => {
//       toaster.dismiss();
//       toaster.error({
//         title: 'Failed to add new store location',
//       });
//     },
//     onMutate: () => {
//       toaster.loading({
//         title: 'Adding new store location . . .',
//       });
//     },
//   });
//   return {

//   };
// };
