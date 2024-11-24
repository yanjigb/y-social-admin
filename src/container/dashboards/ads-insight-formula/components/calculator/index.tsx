import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { calculateTotalCostFromClicks, calculateCostPerClick, calculateCostPerView, calculateCPM, calculateDiscount, calculateTotalCostPerDay, calculateTotalCostImpressions } from "./lib/calculate-advertise-fee";
import Results from "./components/results";

const MAX_DISCOUNT = 0.3;

export default function Calculator() {
  const [budget, setBudget] = useState(0);
  const [clicks, setClicks] = useState(0);

  const [impressions, setImpressions] = useState(0);
  const [costPerClick, setCostPerClick] = useState(0);
  const [costPerImpression, setCostPerImpression] = useState(0);
  const [advertiseScore, setAdvertiseScore] = useState(0);

  const [costBeforeDiscount, setCostBeforeDiscount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const [error, setError] = useState("");

  const discountPercentage = Math.min((advertiseScore / 100) * MAX_DISCOUNT, MAX_DISCOUNT).toFixed(3);
  const discountAmount = budget * parseFloat(discountPercentage);

  const calculateMetrics = () => {
    // Reset error message
    setError("");

    // Validate inputs
    if (budget <= 0 || clicks <= 0 || impressions <= 0) {
      setError("Please enter valid positive numbers for budget, clicks, and impressions.");
      return;
    }

    const costPerClick = calculateCostPerClick(Number(budget), Number(clicks));
    const totalCostFromClicks = calculateTotalCostFromClicks(Number(clicks), Number(costPerClick));

    const costPerImpression = calculateCPM(Number(budget), Number(impressions));
    const totalCostImpressions = calculateTotalCostImpressions(Number(impressions), Number(costPerImpression));

    const costPerDay = calculateTotalCostPerDay(Number(totalCostImpressions), Number(totalCostFromClicks));
    const finalCost = calculateDiscount(Number(costPerDay), Number(budget), Number(advertiseScore));

    setCostPerClick(Number(costPerClick));
    setCostPerImpression(Number(costPerImpression));
    setCostBeforeDiscount(Number(costPerDay));
    setTotalCost(Number(finalCost));
  };

  return (
    <div className="box">
      <div className="box-header">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Ad Cost Calculator</h2>
          <p className="text-sm text-slate-500">This will helps you calculate your advertise insights fees</p>
        </div>
      </div>
      <div className="box-body grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-5">Calculator:</h3>

          <div className="flex flex-col gap-5">
            <TextField
              id="budget"
              label="Budget (VND)"
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <TextField
              id="clicks"
              label="Total Clicks"
              type="number"
              value={clicks}
              onChange={(e) => setClicks(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <TextField
              id="impressions"
              label="Total Impressions"
              type="number"
              value={impressions}
              onChange={(e) => setImpressions(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <TextField
              id="advertiseScore"
              label="Advertise Score"
              type="number"
              value={advertiseScore}
              onChange={(e) => setAdvertiseScore(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <Button onClick={calculateMetrics} size="medium" variant="contained">Calculate</Button>
          </div>

          {error && <p className="text-red mt-4">{error}</p>}
        </div>

        <Results
          costPerClick={costPerClick}
          costPerImpression={costPerImpression}
          discountAmount={discountAmount}
          discountPercentage={discountPercentage}
          costBeforeDiscount={costBeforeDiscount}
          finalCost={totalCost}
        />
      </div>
    </div>
  );
}
