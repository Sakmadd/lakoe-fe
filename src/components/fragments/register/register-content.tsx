import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import { RegisterType } from '@/types/types';
import { registerSchema } from '@/validators/log/register-schema';
import { Box, Flex, Image, Input, Span, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

export function RegisterContent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    toaster.promise(registerHandler(data), {
      success: {
        title: 'Successfully Registered!',
        description: 'Welcome Folks!',
      },
      error: {
        title: 'Register Failed',
        description: 'Something wrong :(',
      },
      loading: { title: 'Loading...', description: 'Please wait' },
    });
  };

  async function registerHandler(data: RegisterType) {
    await api.REGISTER(data);
    navigate('/login');
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width={'full'} marginTop={'18vh'}>
          <Flex justifyContent={'center'} margin={'auto'} gap={'2rem'}>
            <Box width={'50%'}>
              <Image src="/register-illustration.svg" />
            </Box>
            <Flex width={'30%'} flexDir={'column'} gap={'1rem'}>
              <Box
                width={'100%'}
                padding={'2rem'}
                borderRadius={'lg'}
                border={'3px solid rgb(245, 245, 242)'}
              >
                <Text
                  color={'blackAlpha.700'}
                  textAlign={'center'}
                  fontSize={'4xl'}
                  fontWeight={'bold'}
                  textDecor={'underline'}
                  textDecorationColor={'blackAlpha.400'}
                  paddingBottom={'2rem'}
                >
                  Lakoe
                </Text>
                <Flex flexDir={'column'} gap={'1.5rem'}>
                  {/* Field Name */}
                  <Field
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                  >
                    <Input
                      placeholder="Username"
                      variant="subtle"
                      {...register('name')}
                    />
                  </Field>

                  {/* Field Email */}
                  <Field
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                  >
                    <Input
                      placeholder="Email"
                      variant="subtle"
                      {...register('email')}
                    />
                  </Field>

                  {/* Field Password */}
                  <Field
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                  >
                    <PasswordInput
                      placeholder="Password"
                      variant={'subtle'}
                      {...register('password')}
                    />
                  </Field>

                  <Button
                    type="submit"
                    variant={'surface'}
                    backgroundColor={'gray'}
                    color={'white'}
                    _hover={{ backgroundColor: 'gray.700' }}
                  >
                    Register
                  </Button>
                </Flex>
              </Box>

              <Box
                width={'100%'}
                padding={'2rem'}
                borderRadius={'lg'}
                border={'3px solid rgb(245, 245, 242)'}
              >
                <Text textAlign={'center'} color={'gray'}>
                  Already have an account?{' '}
                  <Span color={'gray.900'} fontWeight={'semibold'}>
                    <ReactLink to="/login">Login</ReactLink>
                  </Span>
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </form>
    </>
  );
}
