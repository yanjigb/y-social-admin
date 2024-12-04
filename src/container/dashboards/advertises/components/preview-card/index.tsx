import { Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ImageIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

interface Props {
  description: string;
  media?: string;
  actions: React.ReactNode;
  title: string;
}

export default function PreviewCard(props: Props) {
  const { description, media, actions, title } = props;

  return (
    <Card className="w-full" sx={{
      background: '#e1f5fe'
    }}>
      {
        media && media.trim() !== "" ? <CardMedia
          image={media}
          title={title}
          sx={{
            objectFit: "contain",
            maxHeight: 400,
          }}
          className="w-full h-full aspect-[400/716] max-h-[25rem]"
        /> : <div className="w-full flex flex-col h-[25rem] bg-gray-200 items-center justify-center">
          <ImageIcon size={50} />
          <Typography variant="h6" className="text-gray-500">
            Your Media will be here
          </Typography>
        </div>
      }
      <CardContent>
        <Typography
          variant="h6"
          className="w-full text-wrap font-bold"
        >
          {title || "No title"}
        </Typography>
        <Chip label="Sponsored" color="primary" variant="outlined" className="mb-2" />
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg w-full text-wrap">
          {description || "No description"}
        </ReactMarkdown>
      </CardContent>
      <CardActions>
        <div className="px-2 pb-2 flex gap-2 w-full bg-red-500">
          {actions}
        </div>
      </CardActions>
    </Card>
  );
}
