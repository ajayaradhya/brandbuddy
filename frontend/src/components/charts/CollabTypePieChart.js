import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function CollabTypePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard-view`)
      .then(res => {
        const raw = res.data.type_counts;
        const formatted = Object.entries(raw).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value,
        }));
        
        setData(formatted);
      });
  }, []);

  return (
    <Card sx={{ width:"100%", height: 400 }}>
      <CardContent>
      <Typography variant="h6" gutterBottom>Collaboration Types</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
    </Card>
  );
}
