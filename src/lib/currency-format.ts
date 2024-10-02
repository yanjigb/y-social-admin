export function currencytFormat(price: number | null | undefined): string {
  if (typeof price !== "number" || Number.isNaN(price)) {
    return "N/A";
  }

  const formattedNumber = price.toLocaleString("en-US");

  return `${formattedNumber}`;
}
