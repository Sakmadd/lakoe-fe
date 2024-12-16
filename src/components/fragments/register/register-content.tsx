import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import api from '@/networks/api';
import { RegisterType } from '@/types/types';
import { Box, Flex, Image, Input, Span, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

export function RegisterContent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterType>();

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
                  <Input
                    placeholder="Name"
                    variant="subtle"
                    {...register('name')}
                  />
                  <Input
                    placeholder="Email"
                    variant="subtle"
                    {...register('email')}
                  />
                  <PasswordInput
                    placeholder="Password"
                    variant={'subtle'}
                    {...register('password')}
                  />
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
