import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

export default function MonthlyBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard-view`)
      .then(res => {
        const formatted = res.data.monthly_data.map(item => ({
          month: item.month,
          collaborations: item.count,
          revenue: item.total_amount,
        }));
        
        console.log("formatted:", formatted);
        setData(formatted);
      });
  }, []);

  // const data = [
  //   { month: "2025-01", collaborations: 10, revenue: 10000 },
  //   { month: "2025-02", collaborations: 15, revenue: 12000 },
  //   { month: "2025-03", collaborations: 20, revenue: 15000 },
  //   { month: "2025-04", collaborations: 30, revenue: 18000 },
  //   { month: "2025-05", collaborations: 25, revenue: 20000 },
  //   { month: "2025-06", collaborations: 40, revenue: 25000 },
  //   { month: "2025-07", collaborations: 50, revenue: 198248.46 },
  // ];


  return (
    <Card sx={{ width:"100%", height: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Monthly Collaborations</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="collaborations" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
