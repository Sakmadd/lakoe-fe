import { Box, Collapsible, Link } from '@chakra-ui/react';
import { ContentContainer } from '../container/contentContainer';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  nav: {
    text: string;
    path: string;
  }[];
}

export default function SettingsColapsable({ title, nav }: Props) {
  const navigate = useNavigate();

  return (
    <ContentContainer>
      <Collapsible.Root>
        <Collapsible.Trigger
          cursor="pointer"
          as="h1"
          fontWeight="bold"
          fontSize="1rem"
          fontFamily="sans-serif"
        >
          {title}
        </Collapsible.Trigger>
        <Collapsible.Content marginTop="1rem">
          <ContentContainer>
            <Box display="flex" flexDirection="column" gap="1rem">
              {nav.map((data) => (
                <Link
                  _hover={{ color: 'gray' }}
                  fontWeight="semibold"
                  textDecoration="none"
                  onClick={() => {
                    navigate(data.path);
                  }}
                >
                  {data.text}
                </Link>
              ))}
            </Box>
          </ContentContainer>
        </Collapsible.Content>
      </Collapsible.Root>
    </ContentContainer>
  );
}
