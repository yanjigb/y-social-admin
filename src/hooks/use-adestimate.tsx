import { useMemo } from 'react';

// This will show you how much you can reach with per your 1000 VND
const calculateBaseReachEfficiency = (audienceSize: number, budget: number) => {
  // 1000 VND
  return (audienceSize / budget) * 1000;
};

// This will show you how your ads efficiency is
const calculateReachEfficiency = (audienceSize: number, budget: number, baseReachEfficiency: number) => {
  if (audienceSize <= budget) {
    return baseReachEfficiency;
  } else {
    return baseReachEfficiency * (1 - audienceSize / budget); // Decrease efficiency based on audience size
  }
}

// This will show you how much the rate of engagement base on user reached
const calculateEngagementRate = (accountsReached: number): number => {
  // Example logic to calculate engagement rate based on accounts reached
  // This could be based on historical data or other metrics
  if (accountsReached < 1000) {
    return 0.05; // 5% engagement for small audiences
  } else if (accountsReached < 5000) {
    return 0.5; // 50% engagement for medium audiences
  } else {
    return 1; // 100% engagement for large audiences
  }
};

const useAdEstimator = (budget: number, audienceSize: number) => {
  const reachEfficiency = useMemo(() => {
    // Example logic: efficiency decreases slightly with a larger audience
    // Assume a base reach of 10 accounts per 1000 vnd, with audience size affecting it
    // const baseReachEfficiency = 10;
    // return baseReachEfficiency * (1 - audienceSize / 10000); // Larger audience lowers efficiency
    const baseReachEfficiency = calculateBaseReachEfficiency(audienceSize, budget);
    const reachEfficiency = calculateReachEfficiency(audienceSize, budget, baseReachEfficiency);
    return reachEfficiency
  }, [audienceSize]);

  // This will calculate how much you can get follow or like with your reach with the rate of engagement
  const followEfficiency = useMemo(() => {
    // Example logic: follow efficiency based on engagement rate
    // Assume 10% engagement on average, scaled by engagementRate
    // const baseEngagement = 0.1;
    // Follow efficiency based on engagement
    // return reachEfficiency * (baseEngagement * engagementRate / 1000);

    const engagementRate = calculateEngagementRate(reachEfficiency);
    const result = reachEfficiency * engagementRate;
    return result;
    // }, [reachEfficiency, engagementRate]);
  }, [reachEfficiency]);

  const estimates = useMemo(() => {
    // Calculate based on budget and efficiency
    // const accountsReached = Math.round(budget * reachEfficiency);
    const accountsReached = Math.round(budget * reachEfficiency);
    // const followsOrLikes = Math.round(budget * followEfficiency);
    const followsOrLikes = Math.round(budget * followEfficiency);

    return {
      accountsReached,
      followsOrLikes,
    };
  }, [budget, reachEfficiency, followEfficiency]);

  return { reachEfficiency, followEfficiency, estimates };
};

export default useAdEstimator;
