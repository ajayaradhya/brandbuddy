import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function MonthlyChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md col-span-1 md:col-span-2">
      <h3 className="mb-2 text-gray-700 text-sm">Monthly Collab Trend</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <Line type="monotone" dataKey="total_amount" stroke="#00C49F" />
      </LineChart>
    </div>
  );
}
