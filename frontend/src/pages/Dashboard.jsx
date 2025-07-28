import BrandCount from "../widgets/BrandCount";
import CampaignStatusPie from "../widgets/CampaignStatusPie";
import UpcomingCampaigns from "../widgets/UpcomingCampaigns";

export default function Dashboard() {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <BrandCount />
      <CampaignStatusPie />
      <UpcomingCampaigns />
      {/* Add more widgets here */}
    </div>
  );
}
