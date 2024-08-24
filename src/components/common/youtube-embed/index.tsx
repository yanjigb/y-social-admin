import { memo } from "react";
import getYouTubeID from "get-youtube-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import isEqual from "react-fast-compare";

const liteYoutubeEmbedProps = (youtubeId: string) => {
  return {
    title: "YouTube video",
    noCookie: true,
    thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
  };
};

const YoutubeEmbed = ({ embedURL }: { embedURL: string }) => {
  const youtubeId = getYouTubeID(embedURL);

  if (!youtubeId) {
    return <p>Invalid YouTube URL</p>; // Handle null case
  }

  return (
    <LiteYouTubeEmbed id={youtubeId} {...liteYoutubeEmbedProps(youtubeId)} />
  );
};

export default memo(YoutubeEmbed, isEqual);
