import { UseFormWatch } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";
import Button from "@mui/material/Button";

interface Props {
  watch: UseFormWatch<IAdvertiseForm>;
  onClose: () => void;

}

export default function SubmitBtn(props: Props) {
  const { watch, onClose } = props;

  const DisabledSubmitBtn =
    !watch("title") ||
    !watch("description") ||
    !watch("media_content") ||
    !watch("schedule_start") ||
    !watch("schedule_end") ||
    !watch("budget") ||
    !watch("cta") ||
    !watch("link_action")

  return (
    <>
      <Button onClick={onClose} color="error">
        Cancel
      </Button>
      <Button className="disabled:bg-slate-400" type="submit" variant="contained" disabled={DisabledSubmitBtn}>
        Save
      </Button>
    </>
  )
}
