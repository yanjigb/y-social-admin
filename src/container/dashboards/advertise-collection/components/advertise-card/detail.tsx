import { memo, useEffect, useRef } from "react";
import isEqual from "react-fast-compare";
import { IAdvertise } from "../../../../../types/advertise";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

interface AdvertiseDetailProps {
  ad: IAdvertise;
  toggle: boolean;
  handleToggle: (value: boolean) => void;
}

const AdvertiseDetail = ({ ad, toggle, handleToggle }: AdvertiseDetailProps) => {
  const handleClose = () => {
    handleToggle(false);
  };
  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (toggle) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [toggle]);

  return (
    <Dialog
      open={toggle}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">{ad?.title}</DialogTitle>
      <DialogContent>
        <img src={ad?.media_content} alt={ad.title} className="w-full h-full object-cover aspect-video mb-4" />

        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          className="bg-gray-200 p-4 rounded-sm"
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg break-words">
            {ad.description}
          </ReactMarkdown>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AdvertiseDetail, isEqual);
