export const calculateCostPerClick = (budget: number, totalClicks: number) => {
  if (totalClicks <= 0 && budget <= 0 || totalClicks <= 0 || isNaN(budget) || isNaN(totalClicks))
    return 0;
  const result = Math.round(budget / totalClicks);
  return result;
}

export const calculateTotalCostFromClicks = (totalClicks: number, costPerClick: number) => {
  return totalClicks * costPerClick;
}

// COST PER THOUSAND IMPRESSIONS
export const calculateCPM = (budget: number, totalImpressions: number) => {
  const result = Math.round(budget / totalImpressions);
  return result;
}

export const calculateTotalCostImpressions = (totalImpressions: number, costPerThousandImpressions: number) => {
  const result = Math.round(totalImpressions * costPerThousandImpressions);
  return result;
}

export const calculateTotalCostPerDay = (costFromImpressions: number, costFromClicks: number) => {
  return costFromImpressions + costFromClicks;
}

export const calculateDiscount = (totalCost: number, budget: number, score: number) => {
  const MAX_DISCOUNT = 0.3;
  const discountPercentage = Math.min((score / 100) * MAX_DISCOUNT, MAX_DISCOUNT);
  const discountAmount = budget * discountPercentage;
  const result = (totalCost - discountAmount).toFixed(1);

  return result;
}

export const calculateCostPerView = (discountCost: number, impressions: number) => {
  const result = Math.round(discountCost / impressions);
  return result;
}
