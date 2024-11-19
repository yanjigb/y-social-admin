export const CheckAdsTrending = (score: number) => {
  if (score >= 85) {
    return { label: "Trending", className: "bg-primary" };
  } else if (score > 69) {
    return { label: "Good", className: "bg-success" };
  } else if (score > 49) {
    return { label: "Average", className: "bg-warning" };
  } else {
    return { label: "Bad", className: "bg-danger" };
  }
};
