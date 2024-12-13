import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ContentContainer } from '../container/contentContainer';

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
      <AccordionRoot collapsible>
        <AccordionItem value={title} border="none">
          <AccordionItemTrigger indicatorPlacement="start" cursor="pointer">
            {title}
          </AccordionItemTrigger>
          <AccordionItemContent
            marginLeft="1.9rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
            border="1px solid lightgray"
            borderRadius="1rem"
            padding="1rem"
            marginTop="0.5rem"
          >
            {nav.map((path) => (
              <Link
                _hover={{ color: 'gray' }}
                fontWeight="semibold"
                textDecoration="none"
                fontSize="sm"
                onClick={() => {
                  navigate(path.path);
                }}
              >
                {path.text}
              </Link>
            ))}
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </ContentContainer>
  );
}
