import { Button, TextField } from "@mui/material";
import { useState } from "react";

const MAX_DISCOUNT = 0.3;

export default function Calculator() {
  const [budget, setBudget] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [costPerClick, setCostPerClick] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState("");
  const [advertiseScore, setAdvertiseScore] = useState(0);
  const discountPercentage = Math.min((advertiseScore / 100) * MAX_DISCOUNT, MAX_DISCOUNT).toFixed(3);
  const discountAmount = budget * parseFloat(discountPercentage);
  const finalCost = budget - discountAmount;

  const calculateMetrics = () => {
    // Reset error message
    setError("");

    // Validate inputs
    if (budget <= 0 || clicks <= 0 || impressions <= 0) {
      setError("Please enter valid positive numbers for budget, clicks, and impressions.");
      return;
    }

    // Calculate Cost Per Click (CPC)
    const initialCPC = Math.round(budget / clicks);
    const effectiveCPC = (initialCPC * (clicks / impressions)).toFixed(2);
    // Calculate Total Cost
    const totalCost = finalCost;

    // Update state with calculated values
    setCostPerClick(parseFloat(effectiveCPC));
    setTotalCost(totalCost);
  };

  return (
    <div className="box">
      <div className="box-header">
        <h2 className="text-2xl font-bold mb-4">Ad Cost Calculator</h2>
      </div>
      <div className="box-body grid grid-cols-2 gap-6">
        <div>
          <div className="flex flex-col gap-4">
            <label htmlFor="budget">Budget (VND)</label>
            <TextField
              id="budget"
              label="Budget (VND)"
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <label htmlFor="clicks">Total Clicks</label>
            <TextField
              id="clicks"
              label="Total Clicks"
              type="number"
              value={clicks}
              onChange={(e) => setClicks(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <label htmlFor="advertiseScore">Advertise Score</label>
            <TextField
              id="advertiseScore"
              label="Advertise Score"
              type="number"
              value={advertiseScore}
              onChange={(e) => setAdvertiseScore(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <label htmlFor="impressions">Total Impressions</label>
            <TextField
              id="impressions"
              label="Total Impressions"
              type="number"
              value={impressions}
              onChange={(e) => setImpressions(Number(e.target.value))}
              className="input border rounded p-2"
            />
            <Button onClick={calculateMetrics} size="medium" variant="contained">Calculate</Button>
          </div>

          {error && <p className="text-red mt-4">{error}</p>}
        </div>

        <div className="text-base">
          <h3 className="text-xl font-bold">Results:</h3>
          <p>Cost per Click: {costPerClick} VND</p>
          <p>Total Cost for {clicks} Clicks: {totalCost} VND</p>
        </div>
      </div>
    </div>
  );
}
