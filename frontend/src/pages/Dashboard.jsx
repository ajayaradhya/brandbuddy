import BrandCount from "../widgets/BrandCount";
import CampaignStatusPie from "../widgets/CampaignStatusPie";
import UpcomingCampaigns from "../widgets/UpcomingCampaigns";

import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../widgets/StatCard";
import StatusPie from "../widgets/StatusPie";
import TypeBar from "../widgets/TypeBar";
import MonthlyChart from "../widgets/MonthlyChart";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/dashboard/")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <StatCard title="Total Brands" value={data.total_brands} />
      <StatCard title="Total Collabs" value={data.total_collabs} />
      <StatCard title="Overdue Followups" value={data.overdue_followups} />
      <StatCard title="Upcoming Deliveries" value={data.upcoming_deliveries} />
      <StatCard title="Paid Amount" value={`₹ ${data.total_paid_amount}`} />
      <StatCard title="Barter Value" value={`₹ ${data.total_barter_value}`} />

      <div className="col-span-1 md:col-span-2">
        <StatusPie data={data.status_counts} />
      </div>

      <TypeBar data={data.type_counts} />
      <MonthlyChart data={data.monthly_data} />
    </div>
    {/* <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <BrandCount />
      <CampaignStatusPie />
      <UpcomingCampaigns />
    </div> */}
    </>
  );
}

