import { memo, useState } from "react"
import isEqual from "react-fast-compare"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Lightbox from "yet-another-react-lightbox";
import Skeleton from "./skeleton";

interface Props {
  media_content: string;
  media_title: string;
}

const AdvertiseMedia = (props: Props) => {
  const { media_content, media_title } = props;
  const [open, setOpen] = useState<boolean>(false);

  const onOpenLightBox = () => {
    setOpen(!open);
  }

  if (!media_content || !media_title) return <Skeleton />;

  // const handleUpdateMedia = (e: any) => {
    console.log("first")
    // Update()
  // }

  return (
    <>
      <div className="box">
        <div className="box-body">
          <div className="sm:flex items-center">
            <button type="button" onClick={onOpenLightBox} className="flex-1">
              <LazyLoadImage src={media_content} title={media_title} className="object-cover aspect-video h-full w-full max-w-full max-h-[19.8125rem]" />
            </button>
          </div>
        </div>
      </div>

      <Lightbox
        open={open}
        close={onOpenLightBox}
        slides={[
          { src: media_content },
        ]}
      />
    </>
  )
}

export default memo(AdvertiseMedia, isEqual);
