import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function Sample() {
  return (
    <Card>
      <CardHeader title="Sample Calculation" subheader="Example of how metrics are calculated using dummy data" />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell>Calculation</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>CPM (Cost per 1000 Impressions) VND</TableCell>
              <TableCell>advertise budget / (impressions / 1000)</TableCell>
              <TableCell>1000000 / (10000 / 1000) = 100000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CPC (Cost per Click) VND</TableCell>
              <TableCell>advertise budget / total clicks</TableCell>
              <TableCell>1000000 / 150 = 6666.67</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Engagement Rate (%)</TableCell>
              <TableCell>(total interactions / impressions) * 100</TableCell>
              <TableCell>(1000 / 10000) * 100 = 10%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CTR (Click-through rate) %</TableCell>
              <TableCell>(total clicks / impressions) * 100</TableCell>
              <TableCell>(150 / 10000) * 100 = 1.5%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Advertise Score (0-100)</TableCell>
              <TableCell>(CTR + Engagement Rate) / 2</TableCell>
              <TableCell>(1.5% + 10%) / 2 = 5.75</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
