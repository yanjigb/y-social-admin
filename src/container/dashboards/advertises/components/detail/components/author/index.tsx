import { Typography } from "@mui/material"
import { memo, useState } from "react"
import isEqual from "react-fast-compare"
import UserDetail from "../../../../../../../container/dashboards/users/components/user-detail";
import { IUser } from "../../../../../../../types/user";
import Skeleton from "./skeleton";

interface Props {
  user: IUser;
}

const Author = (props: Props) => {
  const { user } = props;

  const [isOpenUserDetail, setIsOpenUserDetail] = useState<boolean>(false);

  const onOpenDetailUser = () => {
    setIsOpenUserDetail(!isOpenUserDetail);
  };

  if(!user) return <Skeleton />;

  return (
    <>
      <button data-hs-overlay="#hs-overlay-contacts" type="button" className="box w-full" onClick={onOpenDetailUser}>
        <div className="box-body">
          <Typography variant="h6">
            View Author
          </Typography>
        </div>
      </button>

      <UserDetail user={user} />
    </>
  )
}

export default memo(Author, isEqual)
