export const calculateDateDifferenceInDays = (start: Date | null, end: Date | null): number => {
  if (start && end) {
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
  return 0;
};
