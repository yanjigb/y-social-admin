import { Button, styled } from "@mui/material";
import clsx from "clsx";
import { CloudUploadIcon } from "lucide-react";
import React from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

interface Props {
  className?: string;
  onUploadFile?: (file: File | null) => void;
}

export default function AppUploadFile(props: Props) {
  const { className, onUploadFile } = props;
  const [file, setFile] = React.useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
      onUploadFile?.(files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    onUploadFile?.(null);
  };

  return (
    <div className={clsx("flex flex-col gap-3", className)}>
      {file && (
        <div className="flex flex-col items-center">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full max-w-[6.25rem] h-full max-h-[6.25rem] object-cover aspect-square"
            width={100}
            height={100}
          />
          <span className="text-xs text-gray-500">{file.name}</span>
          <Button variant="outlined" color="error" onClick={removeFile}>
            Remove
          </Button>
        </div>
      )}

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{
          background: "blue"
        }}
      >
        Upload files
        <VisuallyHiddenInput type="file" onChange={handleChange} accept=".png, .jpg, .jpeg, .gif" />
      </Button>
    </div>
  );
}
