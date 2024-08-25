import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import isEqual from 'react-fast-compare';
import Swal from 'sweetalert2';
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IPost } from '../../../../types/post';
import AppPreviewImage from '../../../../components/features/app-preview-image';
import { Image, X } from 'lucide-react';
import { Update } from '../../../../services/post.service';
import BRAND_NAME from '../../../../constants/brand-name';
import { uploadMedia } from '../../../../api/media/uploadMedia';
import MEDIA from '../../../../constants/media';

interface UpsertModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPostList: Function
  post: IPost
}

interface IFormData {
  desc?: string
  img?: string,
  video?: string
}

const PostSchema = z.object({
  desc: z.string().optional(),
  img: z.string().optional(),
  video: z.string().optional()
});

const UpsertModal: React.FC<Readonly<UpsertModalProps>> = ({ open = false, onClose, fetchPostList, post }) => {
  const uploadImg = React.useRef<HTMLInputElement>(null);
  // For upload cloud
  const [videoCloudUrl, setVideoCloud] = React.useState<File | null>(null);
  const [imageCloud, setImageCloud] = React.useState<File | null>(null);
  // For preview image
  const [previewVideo, setPreviewVideo] = React.useState<string>("");
  const [previewImage, setPreviewImage] = React.useState<string>("");

  const [oldVideoSrc, setOldVideoSrc] = React.useState<string>("");
  const [oldImageSrc, setOldImageSrc] = React.useState<string>("");

  const cloudMediaUrl = {
    img: previewImage || "",
    video: previewVideo || ""
  };

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({
    resolver: zodResolver(PostSchema),
  });

  const updateMedia = async (src: any | null, isVideo: boolean) => {
    if (!src) return isVideo ? previewVideo : previewImage;
    const result = await uploadMedia(src, isVideo);
    return result?.secure_url || null;
  };

  const handleUpdatePost = async (formData: IFormData) => {
    try {
      let updatedImgUrl = cloudMediaUrl.img;
      if (imageCloud) {
        const imageURL = await updateMedia(imageCloud, false);
        updatedImgUrl = imageURL;
        await Update(post._id, {
          ...formData,
          img: updatedImgUrl,
          video: null,
        });
      } else if (!oldImageSrc) {
        updatedImgUrl = "";
      }

      if (videoCloudUrl) {
        let updatedVideoUrl = cloudMediaUrl.video;
        const videoURL = await updateMedia(videoCloudUrl, true);
        updatedImgUrl = "";
        updatedVideoUrl = videoURL;

        await Update(post._id, {
          ...formData,
          img: null,
          video: updatedVideoUrl,
        });
      }
      fetchPostList();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update post. Please try again.",
        icon: "error"
      });
    }
  };

  const showConfirmationDialog = async (): Promise<boolean> => {
    const result = await Swal.fire({
      title: "Are you sure to update?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update Now"
    });
    onClose(false);
    return result.isConfirmed;
  };

  const submitData: SubmitHandler<IFormData> = async (data: IFormData, event) => {
    event?.preventDefault();
    onClose(false);

    const confirmed = await showConfirmationDialog();

    if (confirmed) {
      try {
        await handleUpdatePost(data);
        Swal.fire({
          title: "Updated Successfully! 😎",
          text: "This post has been updated",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to update post. Please try again.",
          icon: "error"
        });
      }
    }
  };

  React.useEffect(() => {
    if (post) {
      setOldImageSrc(post.img);
      setOldVideoSrc(post.video);
    }
  }, [post]);

  const handleUploadImgFile = () => {
    if (uploadImg.current) {
      uploadImg.current.click();
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const fileUrl = URL.createObjectURL(file);

    if (!file) return;

    if (file.size > MEDIA.FILE_SIZE_LIMIT) {
      onClose(false);
      Swal.fire({
        title: "Error",
        text: "You cannot upload file more than > 10MB",
      });
      return;
    }

    if (file.type === "video/mp4") {
      // Handle video upload
      setVideoCloud(file);
      setOldVideoSrc("");        // Clear existing video source
      setPreviewVideo(fileUrl);  // Set new video preview
      setImageCloud(null);       // Clear the image file
      setPreviewImage("");       // Clear image preview
      setOldImageSrc("");
    } else {
      // Handle image upload
      setImageCloud(file);
      setOldImageSrc("");        // Clear existing image source
      setPreviewImage(fileUrl);  // Set new image preview
      setVideoCloud(null);       // Clear the video file
      setPreviewVideo("");       // Clear video preview
      setOldVideoSrc("");
    }
  };

  const handleDeleteImage = () => {
    setPreviewImage("");
    setOldImageSrc("");
    setOldVideoSrc("");

    if (uploadImg.current) uploadImg.current.value = "";
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(submitData)
      }}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        Update Post
      </DialogTitle>

      <DialogContent className='grid grid-cols-1 gap-6'>
        <div>
          <label htmlFor="desc" aria-labelledby='post content'>Content</label>
          <textarea
            {...register("desc")}
            id="username"
            placeholder='your content'
            className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0"
            aria-labelledby='username'
            aria-invalid={errors.desc ? "true" : "false"}
            defaultValue={post.desc}
          />
          {errors.desc && <span className='text-red'>{errors.desc.message}</span>}
        </div>

        <div>
          <label htmlFor='media'>Media</label>
          <div className='flex gap-2 items-center'>
            <input
              id="media"
              type="text"
              placeholder='upload file from your device'
              className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0 min-h-10 px-2"
              value={oldImageSrc || oldVideoSrc || ''}
              readOnly
            />
            <div
              style={{ fontSize: "1.8rem", cursor: "pointer" }}
              onClick={handleUploadImgFile}
            >
              <input
                type="file"
                style={{ display: "none" }}
                ref={uploadImg}
                onChange={handleMediaUpload}
                accept=".jpg, .jpeg, .webp, .png, .mp4"
              />
              <span><Image size={20} /></span>
            </div>
          </div>
        </div>

        {(oldImageSrc || previewImage) && (
          <div className="w-100 relative">
            <AppPreviewImage imgSrc={oldImageSrc || previewImage} width='200' height='200' alt={BRAND_NAME.YANJI_SOCIAL} />
            <button
              className="absolute top-0 left-[12.5rem] text-white bg-danger"
              onClick={handleDeleteImage}
            >
              <X size={20} />
            </button>
          </div>
        )}

        {(oldVideoSrc || previewVideo) && (
          <video src={oldVideoSrc || previewVideo} width='200' height='200' controls></video>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose(false)} color='error'>Cancel</Button>
        <Button type="submit" variant='contained'>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(UpsertModal, isEqual);
