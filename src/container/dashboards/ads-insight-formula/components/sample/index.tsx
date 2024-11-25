import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function Sample() {
  return (
    <Card>
      <CardHeader title="Sample Calculation" subheader="Example of how metrics are calculated using dummy data" />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>
                  Metric
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  Calculation
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  Result
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>CPM (Cost per Impression) VND</TableCell>
              <TableCell>advertise budget / impressions</TableCell>
              <TableCell>160000 / 18 = 8888</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CFI (Total cost from impressions) VND</TableCell>
              <TableCell>impressions * CPM</TableCell>
              <TableCell>18 * 8888 = 159984</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CPC (Cost per Click) VND</TableCell>
              <TableCell>advertise budget / total clicks</TableCell>
              <TableCell>160000 / 20 = 8000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CTR (Click-through rate) %</TableCell>
              <TableCell>(total clicks / impressions) * 100</TableCell>
              <TableCell>(20 / 18) * 100 = 111.11%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Interactions</TableCell>
              <TableCell>total items in daily analytics / total clicks in daily analytics</TableCell>
              <TableCell>20 / 20 = 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Engagement Rate %</TableCell>
              <TableCell>(total interactions / impressions) * 100</TableCell>
              <TableCell>(1 / 18) * 100 = 5.56%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Advertise Score (0-100)</TableCell>
              <TableCell>(CTR + Engagement Rate) / 2</TableCell>
              <TableCell>(111.11% + 5.56%) / 2 = 58.335</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Cost Per Day (VND)</TableCell>
              <TableCell>total cost from impressions + total cost from clicks</TableCell>
              <TableCell>159984 + 160000 = 319984</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount Percentage (%)</TableCell>
              <TableCell>( score / 100 ) * 0.3</TableCell>
              <TableCell>
                <div>
                  (58.335 / 100) * 0.3 = 0.175
                </div>
                <sub className="text-xs">
                  (highest discount percentage is 30% so we use 30% if the result is greater than 30%)
                </sub>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount Amount (VND)</TableCell>
              <TableCell>advertise budget * discount percentage</TableCell>
              <TableCell>160000 * 0.175 = 28000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Advertise Cost (VND)</TableCell>
              <TableCell>total cost per day - discount amount</TableCell>
              <TableCell>319984 - 28000 = 291984</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
