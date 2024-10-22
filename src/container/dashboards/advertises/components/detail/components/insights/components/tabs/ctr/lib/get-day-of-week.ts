export default function getDayOfWeek(date: any) {
  return new Date(date).toLocaleDateString('en-US', {weekday: 'short'});
};
