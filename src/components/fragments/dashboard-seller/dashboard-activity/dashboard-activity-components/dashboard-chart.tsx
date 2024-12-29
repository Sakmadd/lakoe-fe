import { Line } from 'react-chartjs-2';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useGetDashboardGraph } from '../dashboard-activity-hooks/dashboard-activity-tanstack';

export default function DashboardChart() {
  const { data, isFetching } = useGetDashboardGraph();

  const [chart, setChart] = useState(Array(12).fill(0));

  useEffect(() => {
    setChart([
      data?.[0]?.perMonth.January || 0,
      data?.[0]?.perMonth.February || 0,
      data?.[0]?.perMonth.March || 0,
      data?.[0]?.perMonth.April || 0,
      data?.[0]?.perMonth.May || 0,
      data?.[0]?.perMonth.June || 0,
      data?.[0]?.perMonth.July || 0,
      data?.[0]?.perMonth.August || 0,
      data?.[0]?.perMonth.September || 0,
      data?.[0]?.perMonth.October || 0,
      data?.[0]?.perMonth.November || 0,
      data?.[0]?.perMonth.December || 0,
    ]);
  }, [data]);

  return (
    <Box
      border="1px solid #e6e6e6"
      borderRadius="1rem"
      padding="2rem"
      marginTop="1rem"
    >
      <Text fontWeight="semibold" fontSize="0.8rem" fontFamily="sans-serif">
        Product Sold
      </Text>
      {isFetching && (
        <Box
          display="flex"
          height="20.45rem"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Box>
      )}
      {!isFetching && (
        <Line
          data={{
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Product Sold',
                data: chart,
                tension: 0.5,
                pointStyle: false,
                borderWidth: 3,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: 5,
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              title: {
                display: true,
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
      )}
    </Box>
  );
}
