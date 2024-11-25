import { Card, CardContent, CardHeader } from '@mui/material';

export default function Explain() {
  return (
    <Card>
      <CardHeader title="Key Metrics Explained" subheader="Detailed explanation of important ad performance metrics" />
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li><strong>CPM (Cost per Impression):</strong> Average cost for each impression.</li>
          <li><strong>CPC (Cost per Click):</strong> Average cost for each click on the ad.</li>
          <li><strong>CTR (Click-Through Rate):</strong> Percentage of impressions that resulted in a click.</li>
          <li><strong>CFI (Total cost from impressions):</strong> Total cost for all impressions.</li>
          <li><strong>Total Interactions:</strong> Total number of interactions with the ad.</li>
          <li><strong>Engagement Rate:</strong> Percentage of users who interacted with the ad in some way.</li>
          <li><strong>Discount Percentage (%):</strong> Percentage of the discount applied to the advertise.</li>
          <li><strong>Discount Amount (VND):</strong> Amount of the discount applied to the advertise.</li>
          <li><strong>Impressions:</strong> Number of times the ad was displayed.</li>
          <li><strong>Advertise Score (0 - 100):</strong> The higher the more your advertise is efficient and your advertise cost more cheaper and your ads will be go to more people.</li>
          <li><strong>Advertise Cost (VND):</strong> The cost of your advertise after applying the discount.</li>
        </ul>
      </CardContent>
    </Card>
  );
}
