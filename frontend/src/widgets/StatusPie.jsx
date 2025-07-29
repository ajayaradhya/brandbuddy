import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#00C49F", "#FF8042", "#FFBB28"];

export default function StatusPie({ data }) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="mb-2 text-gray-700 text-sm">Campaigns by Status</h3>
      <PieChart width={400} height={250}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          fill="#8884d8"
        >
          {chartData.map((entry, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
