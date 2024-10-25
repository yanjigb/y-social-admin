export default function calculateAverageCTR(advertiseInsight: { ctr: any; }[]) {
  let total = 0;
  advertiseInsight.forEach((item: { ctr: any; }) => {
    total += item.ctr;
  });
  const result = total / advertiseInsight.length
  return result;
}
