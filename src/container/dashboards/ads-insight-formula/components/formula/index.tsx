import { Card, CardContent, CardHeader } from '@mui/material';

export default function Formula() {
  return (
    <Card>
      <CardHeader title="Formula" subheader="This is the formula used to calculate your advertise insights" />
      <CardContent>
        <ol className="list-decimal list-inside space-y-2 text-base">
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
          <li>
            <strong>Advertise Cost (VND): </strong>
            <ul className="pl-3 list-inside space-y-2">
              <li>- Discount percentage = advertise budget * min(score / 100, MAX_DISCOUNT)</li>
              <li>- Discount amount = advertise budget * discount percentage</li>
              <li>- Advertise cost = advertise budget - discount amount</li>
              <li>*Note: MAX_DISCOUNT = 30%</li>
            </ul>
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
