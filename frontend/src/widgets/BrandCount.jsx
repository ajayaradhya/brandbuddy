import { useEffect, useState } from "react";
import axios from "axios";

export default function BrandCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/brands/")
      .then(res => setCount(res.data.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-gray-500 text-sm">Total Brands</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
