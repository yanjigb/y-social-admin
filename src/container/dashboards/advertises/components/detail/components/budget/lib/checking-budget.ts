export const CheckingBudget = (budget: number) => {
    if (budget < 50000 || budget > 3000000) {
      return false;
    }
    return true;
}
