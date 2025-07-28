import { useEffect, useState } from "react";
import axios from "axios";

export default function UpcomingCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/collaborations/")
      .then(res => {
        const upcoming = res.data.results.filter(c => new Date(c.start_date) > new Date());
        setCampaigns(upcoming.slice(0, 5));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-xl col-span-2">
      <h2 className="text-gray-500 text-sm mb-2">Upcoming Collaborations</h2>
      <ul className="divide-y divide-gray-200">
        {campaigns.map(c => (
          <li key={c.id} className="py-2">
            <strong>{c.brand.name}</strong> – starts on {new Date(c.start_date).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
