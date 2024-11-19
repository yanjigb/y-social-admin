import { useMemo } from 'react';

// Custom hook to dynamically calculate reach and follow efficiencies
const useAdEstimator = (budget: number, audienceSize: number, engagementRate: number) => {
  const reachEfficiency = useMemo(() => {
    // Example logic: efficiency decreases slightly with a larger audience
    // Assume a base reach of 10 accounts per 1000 vnd, with audience size affecting it
    const baseReachEfficiency = 10;
    return baseReachEfficiency * (1 - audienceSize / 10000); // Larger audience lowers efficiency
  }, [audienceSize]);

  const followEfficiency = useMemo(() => {
    // Example logic: follow efficiency based on engagement rate
    // Assume 10% engagement on average, scaled by engagementRate
    const baseEngagement = 0.1;
    return reachEfficiency * (baseEngagement * engagementRate / 1000); // Follow efficiency based on engagement
  }, [reachEfficiency, engagementRate]);

  const estimates = useMemo(() => {
    // Calculate based on budget and efficiency
    const accountsReached = Math.round(budget * reachEfficiency);
    const followsOrLikes = Math.round(budget * followEfficiency);

    return {
      accountsReached,
      followsOrLikes,
    };
  }, [budget, reachEfficiency, followEfficiency]);

  return { reachEfficiency, followEfficiency, estimates };
};

export default useAdEstimator;
