// import { Button } from '@/components/ui/button';
// import { Field } from '@/components/ui/field';
// import {
//   Box,
//   Input,
//   Text,
//   Textarea,
//   FileUploadFileAcceptDetails,
//   Image,
// } from '@chakra-ui/react';
// import { LuImage } from 'react-icons/lu';
// import {
//   settingsInformationSchema,
//   SettingsInformationType,
// } from '@/validators/settings/settings-information';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useEffect, useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload';
// import { Toaster, toaster } from '@/components/ui/toaster';

// export default function SettingsInformation2() {
//   const [image, setImage] = useState<File>();
//   const [imageReader, setImageReader] = useState<string | undefined>();
//   const [store, setStore] = useState<SettingsInformationType>(() => {
//     const local = localStorage.getItem('STORE');
//     if (!local) return {};
//     const parse = JSON.parse(local);
//     const reader = new FileReader();
//     // const image = local.file;
//     reader.onload = () => {
//       setImageReader(reader.result as string);
//     };
//     // reader.readAsDataURL();
//     return parse;
//   });
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     // reset,
//     formState: { errors },
//   } = useForm<SettingsInformationType>({
//     defaultValues: {
//       id: store.id,
//       slogan: store.slogan,
//       shop: store.shop,
//       phone_number: store.phone_number,
//       description: store.description,
//       file: image,
//     },
//     resolver: zodResolver(settingsInformationSchema),
//   });

//   useEffect(() => {
//     localStorage.setItem('STORE', JSON.stringify(store));
//   }, [store]);

//   function handleFile(detail: FileUploadFileAcceptDetails) {
//     if (detail) {
//       const file = detail.files[0];
//       setImage(file);
//       setValue('file', file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageReader(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   const informationSubmit: SubmitHandler<SettingsInformationType> = (data) => {
//     data.id = crypto.randomUUID();
//     console.log(data);
//     setStore(data);
//     toaster.success({
//       title: 'Store information is saved',
//     });
//   };

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
//               {image ? (
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
//         onSubmit={handleSubmit(informationSubmit)}
//         style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
//       >
//         <Box display="flex" gap="1rem">
//           <Box width="100%" display="flex" flexDirection="column" gap="0.75rem">
//             <Field
//               label="Store name"
//               errorText={errors.shop?.message}
//               invalid={!!errors.shop}
//             >
//               <Input
//                 {...register('shop')}
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
//               errorText={errors.phone_number?.message}
//               invalid={!!errors.phone_number}
//             >
//               <Input
//                 {...register('phone_number')}
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
//           >
//             Save
//           </Button>
//         </Box>
//       </form>
//       <Toaster />
//     </Box>
//   );
// }
