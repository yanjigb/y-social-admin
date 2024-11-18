import { Card, CardContent, CardHeader } from '@mui/material';

export default function Formula() {
  return (
    <Card>
      <CardHeader title="Formula" subheader="This is the formula used to calculate your advertise insights" />
      <CardContent>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>CPM (Cost per 1000 Impressions) VND: </strong>
            <span>advertise budget / (impressions / 1000)</span>
          </li>
          <li>
            <strong>CPC (Cost per Click) VND: </strong>
            <span>advertise budget / total clicks</span>
          </li>
          <li>
            <strong>CTR (Click-through rate) %: </strong>
            <span>(total clicks / impressions) * 100</span>
          </li>
          <li>
            <strong>Engagement Rate (%): </strong>
            <span>(total interactions / impressions) * 100</span>
          </li>
          <li>
            <strong>Advertise Score (0-100): </strong>
            <span>(CTR + Engagement Rate) / 2</span>
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
