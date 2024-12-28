// import { useGetDashboardGraph } from '@/components/fragments/dashboard/dashboard-hooks/dashboard-tanstack';

// export const GetChart = () => {
//   const { data, isLoading } = useGetDashboardGraph();

//   let quantity = {
//     January: 0,
//     Febuary: 0,
//     March: 0,
//     April: 0,
//     May: 0,
//     June: 0,
//     July: 0,
//     August: 0,
//     September: 0,
//     October: 0,
//     November: 0,
//     December: 0,
//   };

//   if (!isLoading) {
//     quantity = data[0].perMonth;
//   }

//   const Data = {
//     labels: [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     datasets: [
//       {
//         label: 'Product Sold',
//         data: [
//           quantity.January,
//           quantity.Febuary,
//           quantity.March,
//           quantity.April,
//           quantity.May,
//           quantity.June,
//           quantity.July,
//           quantity.August,
//           quantity.September,
//           quantity.October,
//           quantity.November,
//           quantity.December,
//         ],
//         tension: 0.5,
//         pointStyle: false,
//         borderWidth: 3,
//       },
//     ],
//   };

//   return { Data };
// };
