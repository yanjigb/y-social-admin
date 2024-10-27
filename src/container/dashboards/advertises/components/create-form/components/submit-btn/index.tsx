import { UseFormWatch } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  watch: UseFormWatch<IAdvertiseForm>;
  onClose: () => void;
  isLoading: boolean;
}

export default function SubmitBtn(props: Props) {
  const { watch, onClose, isLoading } = props;

  const DisabledSubmitBtn =
    !watch("title") ||
    !watch("description") ||
    !watch("media_content") ||
    !watch("schedule_start") ||
    !watch("schedule_end") ||
    !watch("budget") ||
    !watch("cta") ||
    !watch("link_action") || isLoading;

  return (
    <>
      <Button onClick={onClose} color="error">
        Cancel
      </Button>
      <Button className="disabled:bg-slate-400 flex items-center gap-2" type="submit" variant="contained" disabled={DisabledSubmitBtn}>
        Save {isLoading && <CircularProgress size="20px" />}
      </Button>
    </>
  )
}
