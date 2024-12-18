// import { Button } from '@/components/ui/button';
// import { Field } from '@/components/ui/field';
// import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
// import { Toaster, toaster } from '@/components/ui/toaster';
// import api from '@/networks/api';
// import {
//   settingsInformationSchema,
//   SettingsInformationType,
// } from '@/validators/settings/settings-information';
// import {
//   Box,
//   FileUploadFileAcceptDetails,
//   Image,
//   Input,
//   Text,
//   Textarea,
// } from '@chakra-ui/react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useMutation } from '@tanstack/react-query';
// import { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { LuImage } from 'react-icons/lu';
// import { useSelector } from 'react-redux';
// import { StoreState } from '@/redux/store';

// export default function SettingsInformation2() {
//   const [image, setImage] = useState<File>();
//   const User = useSelector((state: StoreState) => state.loggedUser.value);
//   const [imageReader, setImageReader] = useState<string | undefined>(
//     User?.Shop.logo
//   );

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<SettingsInformationType>({
//     defaultValues: {
//       slogan: User?.Shop.slogan,
//       name: User?.name,
//       phone: User?.Shop.phone,
//       description: User?.Shop.description,
//       logo: image,
//     },
//     resolver: zodResolver(settingsInformationSchema),
//   });

//   function handleFile(detail: FileUploadFileAcceptDetails) {
//     if (detail) {
//       const file = detail.files[0];
//       setImage(file);
//       setValue('logo', file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageReader(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   const informationSubmit: SubmitHandler<SettingsInformationType> = (data) => {
//     if (image) {
//       data.logo = image;
//     }
//     console.log(data);
//     api.UPDATESHOP(data);
//   };

//   const onSubmit: SubmitHandler<SettingsInformationType> = (data) => {
//     console.log(data);
//     mutation.mutateAsync(data);
//   };

//   const mutation = useMutation({
//     mutationKey: ['store'],
//     mutationFn: async (data: SettingsInformationType) => {
//       await informationSubmit(data);
//     },
//     onSuccess: () => {
//       toaster.success({
//         title: 'Store information is saved',
//       });
//     },
//     onError: () => {
//       toaster.error({
//         title: 'Failed to update store information',
//       });
//     },
//   });

//   return (
//     <Box marginTop="0.9rem" display="flex" flexDirection="column" gap="1rem ">
//       <Text
//         as="h1"
//         fontSize="0.9rem"
//         fontWeight="semibold"
//         fontFamily="sans-serif"
//       >
//         Store Information
//       </Text>
//       <Box display="flex" alignItems="center" gap="1rem">
//         <FileUploadRoot onFileAccept={handleFile} width="fit-content">
//           <FileUploadTrigger
//             asChild
//             border="1px dashed lightgray"
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//             borderRadius="50%"
//             width="7rem"
//             height="7rem"
//             cursor="pointer"
//           >
//             <Box
//               display="flex"
//               flexDirection="column"
//               gap="0.5rem"
//               alignItems="center"
//             >
//               {image || User?.Shop.logo ? (
//                 <Image
//                   src={imageReader}
//                   borderRadius="50%"
//                   objectFit="cover"
//                   width="100%"
//                   height="100%"
//                 />
//               ) : (
//                 <>
//                   <LuImage color="gray" />
//                   <Text fontSize="0.8rem" fontWeight="lighter">
//                     Upload Image
//                   </Text>
//                 </>
//               )}
//             </Box>
//           </FileUploadTrigger>
//         </FileUploadRoot>
//         <Box
//           display="flex"
//           gap="0.3rem"
//           flexDirection="column"
//           justifyContent="center"
//         >
//           <Text
//             as="h1"
//             fontSize="0.9rem"
//             fontWeight="semibold"
//             fontFamily="sans-serif"
//           >
//             Store Profile Picture
//           </Text>
//           <Text fontSize="0.7rem" fontFamily="sans-serif">
//             Allowed file extensions: JPG, JPEG, PNG
//           </Text>
//         </Box>
//       </Box>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
//       >
//         <Box display="flex" gap="1rem">
//           <Box width="100%" display="flex" flexDirection="column" gap="0.75rem">
//             <Field
//               label="Store name"
//               errorText={errors.name?.message}
//               invalid={!!errors.name}
//             >
//               <Input
//                 {...register('name')}
//                 type="text"
//                 fontSize="0.8rem"
//                 placeholder="Your store name"
//               />
//             </Field>
//             <Field
//               label="Slogan"
//               errorText={errors.slogan?.message}
//               invalid={!!errors.slogan}
//             >
//               <Input
//                 {...register('slogan')}
//                 type="text"
//                 fontSize="0.8rem"
//                 placeholder="Come up with a slogan for the shop"
//               />
//             </Field>
//             <Field
//               label="Phone number"
//               errorText={errors.phone?.message}
//               invalid={!!errors.phone}
//             >
//               <Input
//                 {...register('phone')}
//                 type="text"
//                 fontSize="0.8rem"
//                 placeholder="Your phone number"
//               />
//             </Field>
//           </Box>
//           <Field
//             label="Description"
//             errorText={errors.description?.message}
//             invalid={!!errors.description}
//           >
//             <Textarea
//               {...register('description')}
//               size="md"
//               fontSize="0.8rem"
//               placeholder="Write description about the store"
//               rows={9}
//             />
//           </Field>
//         </Box>
//         <Box display="flex" justifyContent="flex-end">
//           <Button
//             width="10%"
//             backgroundColor="transparent"
//             color="black"
//             border="1px solid gray"
//             borderRadius="2rem"
//             height="2rem"
//             fontSize="0.8rem"
//             type="submit"
//             loading={mutation.isPending}
//           >
//             Save
//           </Button>
//         </Box>
//       </form>
//       <Toaster />
//     </Box>
//   );
// }
