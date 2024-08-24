import { FC, memo } from "react";
import isEqual from "react-fast-compare";

import YoutubeEmbed from "../../common/youtube-embed";
import { URL_SPLIT_REGEX, YOUTUBE_REGEX } from "../../../constants/regex";

interface ParagraphWithLinkProps {
  text: string;
  isWithText?: boolean
}

const ParagraphWithLink: FC<ParagraphWithLinkProps> = ({ text, isWithText = true }) => {
  const parts = text?.split("\n");

  const textOverflow = {
    overflow: "hidden",
    display: "inline-block",
    textOverflow: "ellipsis",
  };

  const LinkStyles = {
    ...textOverflow,
    maxWidth: "100%",
    whiteSpace: "nowrap",
  };

  const TextStyles = {
    ...textOverflow,
    maxWidth: "100%",
  };

  return parts?.map((part: any, index) => {
    if (part.match(URL_SPLIT_REGEX)) {
      if (part.match(YOUTUBE_REGEX)) {
        const videoId = part.match(YOUTUBE_REGEX)[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
          <p key={index}>
            {
              isWithText && <a
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-underline text-info"
                style={LinkStyles}
                data-href="youtube-link"
              >
                {part}
              </a>
            }
            <YoutubeEmbed embedURL={embedUrl} />
          </p>
        );
      }

      return (
        <a
          href={part}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-info"
          style={TextStyles}
          data-href="social-link"
        >
          {part}
        </a>
      );
    } else {
      return <p key={index}>{part}</p>;
    }
  });
};

export default memo(ParagraphWithLink, isEqual);
