// import { useEffect, useState } from "react";
// import axios from "axios";
// import StatCard from "../widgets/StatCard";
// import StatusPie from "../widgets/StatusPie";
// import TypeBar from "../widgets/TypeBar";
// import MonthlyChart from "../widgets/MonthlyChart";
// import {
//   Box,
//   Heading,
//   SimpleGrid,
//   Spinner,
//   Center,
// } from "@chakra-ui/react";

// export default function Dashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/dashboard/")
//       .then(res => setData(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   if (!data) {
//     return (
//       <Center minH="100vh">
//         <Spinner size="xl" thickness="4px" color="blue.500" />
//       </Center>
//     );
//   }

//   return (
//     <Box p={6} bg="gray.50" minH="100vh">
//       <Heading size="xl" mb={6} color="gray.700">BrandBuddy Dashboard</Heading>

//       {/* Stat Cards */}
//       <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4} mb={6}>
//         <StatCard title="Total Brands" value={data.total_brands} />
//         <StatCard title="Total Collabs" value={data.total_collabs} />
//         <StatCard title="Paid Amount" value={`₹ ${data.total_paid_amount}`} />
//         <StatCard title="Barter Value" value={`₹ ${data.total_barter_value}`} />
//       </SimpleGrid>

//       <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} mb={6}>
//         <StatCard title="Overdue Followups" value={data.overdue_followups} />
//         <StatCard title="Upcoming Deliveries" value={data.upcoming_deliveries} />
//       </SimpleGrid>

//       {/* Charts Row */}
//       <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mb={6}>
//         <StatusPie data={data.status_counts} />
//         <TypeBar data={data.type_counts} />
//       </SimpleGrid>

//       {/* Monthly Trends Full Width */}
//       <Box>
//         <MonthlyChart data={data.monthly_data} />
//       </Box>
//     </Box>
//   );
// }


import { Box, Heading, Stat, StatLabel } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>Dashboard</Heading>
      <Stat>
        <StatLabel>Followers</StatLabel>
      </Stat>
    </Box>
  );
}
