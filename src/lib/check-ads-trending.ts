export const CheckAdsTrending = (score: any) => {
  if (score > 85) {
    return { label: "Trending", className: "bg-primary" };
  } else if (score > 70) {
    return { label: "Good", className: "bg-success" };
  } else if (score > 50) {
    return { label: "Average", className: "bg-warning" };
  } else {
    return { label: "Bad", className: "bg-danger" };
  }
};
