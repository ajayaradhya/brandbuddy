import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function TypeBar({ data }) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    type: key,
    count: value,
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="mb-2 text-gray-700 text-sm">Collaboration Types</h3>
      <BarChart width={400} height={250} data={chartData}>
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#00C49F" />
      </BarChart>
    </div>
  );
}
