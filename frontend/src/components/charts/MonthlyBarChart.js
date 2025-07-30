import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

// Format number like ₹27.7k, ₹1.2L etc.
const formatINR = (value) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${value}`;
};

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
        setData(formatted);
      });
  }, []);

  return (
    <Card sx={{ flexGrow: 1, width: '100%', height: 400 }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Monthly Collaborations & Revenue
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 20, left: 0, bottom: 20 }}
          >
            <XAxis
              dataKey="month"
              tickFormatter={(m) =>
                new Date(m + "-01").toLocaleString("default", { month: "short" })
              }
            />
            <YAxis domain={[0, 'auto']} />
            <Tooltip formatter={(value, name) =>
              name === "revenue" ? formatINR(value) : value
            } />
            <Legend />
            <Bar dataKey="collaborations" fill="#8884d8">
              <LabelList dataKey="collaborations" position="top" offset={10} />
            </Bar>
            <Bar dataKey="revenue" fill="#82ca9d">
              <LabelList
                dataKey="revenue"
                position="top"
                offset={10}
                formatter={formatINR}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
