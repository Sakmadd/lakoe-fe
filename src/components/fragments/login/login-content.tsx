import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import { LoginType } from '@/types/types';
import { loginSchema } from '@/validators/log/login-schema';
import { Box, Flex, Image, Input, Span, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

export function LoginContent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    toaster.promise(registerHandler(data), {
      success: {
        title: 'Successfully Login!',
        description: 'Welcome Folks!',
      },
      error: {
        title: 'Login Failed',
        description: 'Something wrong :(',
      },
      loading: { title: 'Loading...', description: 'Please wait' },
    });
  };

  async function registerHandler(data: LoginType) {
    await api.LOGIN(data);
    navigate(0);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width={'full'} marginTop={'18vh'}>
          <Flex justifyContent={'center'} margin={'auto'} gap={'2rem'}>
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
                    Login
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
                  Don't have an account yet?{' '}
                  <Span color={'gray.900'} fontWeight={'semibold'}>
                    <ReactLink to="/register">Register</ReactLink>
                  </Span>
                </Text>
              </Box>
            </Flex>
            <Box width={'45%'}>
              <Image src="/login-illustration.svg" />
            </Box>
          </Flex>
        </Box>
      </form>
    </>
  );
}
