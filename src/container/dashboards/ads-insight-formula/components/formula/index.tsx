import { Card, CardContent, CardHeader } from '@mui/material';

export default function Formula() {
  return (
    <Card>
      <CardHeader title="Formula" subheader="This is the formula used to calculate your advertise insights" />
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="space-y-2">
            <strong>CPM (Cost per impression) VND: </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">advertise budget / impressions</span>
          </div>
          <div className="space-y-2">
            <strong>CFI (Total cost from impressions) VND: </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">impressions * CPM</span>
          </div>
          <div className="space-y-2">
            <strong>CPC (Cost per Click) VND: </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">advertise budget / total clicks</span>
          </div>
          <div className="space-y-2">
            <strong>CTR (Click-through rate) %: </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">(total clicks / impressions) * 100</span>
          </div>
          <div className="space-y-2">
            <strong>Total Interactions: </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">total items in daily analytics / total clicks in daily analytics</span>
          </div>
          <div className="space-y-2">
            <strong>Engagement Rate (%): </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">(total interactions / impressions) * 100</span>
          </div>
          <div className="space-y-2">
            <strong>Advertise Score (0-100): </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">(CTR + Engagement Rate) / 2</span>
          </div>
          <div className="space-y-2">
            <strong>Total Cost Per Day (VND): </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">total cost from impressions + total cost from clicks</span>
          </div>
          <div className="space-y-2">
            <strong>Discount Percentage (%): </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">min ( ( score / 100 ) * MAX_DISCOUNT, MAX_DISCOUNT )</span>
            <span className="text-xs">*Note: MAX_DISCOUNT = 30%</span>
          </div>
          <div className="space-y-2">
            <strong>Discount Amount (VND): </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">advertise budget * discount percentage</span>
          </div>
          <div className="space-y-2">
            <strong>Advertise Cost (VND): </strong>
            <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">total cost per day - discount amount</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
