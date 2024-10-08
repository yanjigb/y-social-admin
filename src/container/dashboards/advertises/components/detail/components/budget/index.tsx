import { FormHelperText, InputAdornment, OutlinedInput, Typography } from "@mui/material"
import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { IAdvertise } from "../../../../../../../types/advertise";
import Skeleton from "./skeleton";
import { toast } from "sonner";
import { Update } from "../../../../../../../services/ads.service";
import { useParams } from "react-router-dom";
import { CheckingBudget } from "./lib/checking-budget";

interface Props {
  budget: number;
  currency: IAdvertise["currency"];
}

const Budget = (props: Props) => {
  const { budget, currency } = props
  const [newBudget, setNewBudget] = useState<number>(Number(budget));
  const [isError, setIsError] = useState<boolean>(false);
  const { id } = useParams();
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useEffect(() => {
    setNewBudget(budget);
    setHasChanged(false);
  }, [budget])

  useEffect(() => {

  }, [newBudget])

  const updateBudget = async (newBudget: number) => {
    if (isError || !hasChanged) return;

    try {
      const res: any = await Update(id, { budget: newBudget });
      toast.success("Updated successfully");
      console.log(res.budget, res);
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const isValidBudget = CheckingBudget(newBudget);

    const handlerUpdateBudget = setTimeout(() => {
      if (!isValidBudget) {
        setIsError(true);
        toast.error("Budget not valid");
      } else {
        setIsError(false);
        updateBudget(newBudget);
      }
    }, 2000);

    return () => clearTimeout(handlerUpdateBudget);
  }, [newBudget]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = Number(event.target.value);
    setNewBudget(newBudget);
    setHasChanged(true);
  };

  useEffect(() => {
    console.log(newBudget, budget)
  }, [newBudget, budget])

  if (!budget || !currency) return <Skeleton />

  return (
    <div className="box">
      <div className="box-body flex flex-col gap-4">
        <Typography variant="h6">
          Budget per day:
        </Typography>

        <div className="">
          <OutlinedInput
            value={newBudget}
            onChange={handleChange}
            endAdornment={<InputAdornment position="end">{currency}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'budget',
              min: 50000,
              max: 3000000,
              type: 'number',
            }}
            className="w-full"
          />
          <FormHelperText>
            Budget must be &gt; 50000 and &lt; 3.000.000
          </FormHelperText>
        </div>
      </div>
    </div>
  )
}

export default memo(Budget, isEqual)
