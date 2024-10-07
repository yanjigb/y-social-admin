import { TextField, Typography } from "@mui/material"
import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { IAdvertise } from "../../../../../../../types/advertise";
import Skeleton from "./skeleton";
import { toast } from "sonner";
import { Update } from "../../../../../../../services/ads.service";
import { useParams } from "react-router-dom";

interface Props {
  budget: number;
  currency: IAdvertise["currency"];
}

const Budget = (props: Props) => {
  const { budget, currency } = props
  const [newBudget, setNewBudget] = useState<number>(Number(budget));
  const [isError, setIsError] = useState<boolean>(false);
  const { id } = useParams();

  const updateBudget = (newBudget: number) => {
    Update(id, { budget: newBudget })
      .then(() => toast.success("Updated successfully"))
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    setNewBudget(budget)
  }, [budget])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (newBudget < 50000) {
        setIsError(true);
        return toast.error("Budget must be at least 50,000");
      } else if (newBudget > 3000000) {
        setIsError(true);
        return toast.error("Budget must be less than 3,000,000");
      } else {
        setIsError(false);
      }
    }, 1000); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [newBudget]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setNewBudget(newValue);
  };

  useEffect(() => {
    if (newBudget !== Number(budget)) {
      const handlerUpdateBudget = setTimeout(() => {
        if (!isError) {
          updateBudget(newBudget);
        }
      }, 2000);

      return () => clearTimeout(handlerUpdateBudget);
    }
  }, [newBudget, isError, budget]);

  if (!budget || !currency) return <Skeleton />

  return (
    <div className="box">
      <div className="box-body flex items-center gap-4">
        <Typography variant="h6">
          Budget per day:
        </Typography>

        <TextField
          type="number"
          value={newBudget}
          onChange={handleChange}
          variant="outlined"
          inputProps={{
            min: 50000,
            maxLength: 3000000,
          }}
        />
        <Typography variant="h4" fontWeight="bold" color="primary">
          {currency}
        </Typography>
      </div>
    </div>
  )
}

export default memo(Budget, isEqual)
