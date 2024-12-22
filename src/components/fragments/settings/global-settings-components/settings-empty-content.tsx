import { Box, Text } from '@chakra-ui/react';

interface Props {
  content: string;
}

export default function SettingsEmptyContent({ content }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="9rem"
    >
      <Text
        as="h1"
        fontSize="1rem"
        fontFamily="sans-serif"
        fontWeight="bold"
        color="lightgray"
      >
        {content}
      </Text>
    </Box>
  );
}
