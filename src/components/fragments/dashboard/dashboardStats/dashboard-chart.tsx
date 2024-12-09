import { Line } from 'react-chartjs-2';
import { Box, Text } from '@chakra-ui/react';

export default function DashboardChart({ chartData }) {
  return (
    <Box shadow="xl" borderRadius="1rem" padding="2rem" marginTop="1rem">
      <Text fontWeight="semibold" fontSize="0.8rem" fontFamily="sans-serif">
        Product Sold
      </Text>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              // text: 'Seller Sales',
            },
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  weight: 'bold',
                  size: 10,
                  family: 'sans-serif',
                },
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                textAlign: 'right',
              },
            },
          },
        }}
      />
    </Box>
  );
}
