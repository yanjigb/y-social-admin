import { Typography } from "@mui/material"
import { memo } from "react"
import isEqual from "react-fast-compare"
import Skeleton from "./skeleton";

interface Props {
  title: string;
  description: string;
}

const Description = (props: Props) => {
  const { title, description } = props;

  if(!title || !description) return <Skeleton />;

  return (
    <div className="box">
      <div className="box-body">
        <Typography
          variant="h5"
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
        >
          {description}
        </Typography>
      </div>
    </div>
  )
}

export default memo(Description, isEqual)
