import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#00C49F", "#FF8042", "#8884d8"];

export default function CampaignStatusPie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/collaborations/")
      .then(res => {
        const grouped = res.data.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.keys(grouped).map(key => ({
          name: key,
          value: grouped[key],
        }));
        setData(chartData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-gray-500 text-sm mb-2">Campaigns by Status</h2>
      <PieChart width={250} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={70}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
