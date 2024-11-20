import { Card, CardContent, CardHeader } from '@mui/material';

export default function Explain() {
  return (
    <Card>
      <CardHeader title="Key Metrics Explained" subheader="Detailed explanation of important ad performance metrics" />
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li><strong>CPM (Cost per 1000 Impressions):</strong> Average cost for each 1000 impressions.</li>
          <li><strong>CPC (Cost per Click):</strong> Average cost for each click on the ad.</li>
          <li><strong>CTR (Click-Through Rate):</strong> Percentage of impressions that resulted in a click.</li>
          <li><strong>Engagement Rate:</strong> Percentage of users who interacted with the ad in some way.</li>
          <li><strong>Impressions:</strong> Number of times the ad was displayed.</li>
          <li><strong>Advertise Score:</strong> The higher the more your advertise is efficient and your advertise cost more cheaper.</li>
          <li><strong>Advertise Cost:</strong> The cost of your advertise after applying the discount.</li>
        </ul>
      </CardContent>
    </Card>
  );
}
