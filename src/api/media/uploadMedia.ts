import axios from "axios";
import { Global } from "../../types/global";
import ErrorType from "../../constants/error";

const appendFormData = (fileSelected: any) => {
  const data = new FormData();
  data.append("file", fileSelected);
  data.append("upload_preset", Global.CLOUD_UPLOAD_PRESET.toString());
  data.append("cloud_name", Global.CLOUD_STORAGE_NAME.toString());
  data.append("folder", Global.CLOUD_IMAGE_FOLDER.toString());
  return data;
}

const handleUpload = async (fileSelected: any, isVideo: boolean = false) => {
  if (fileSelected) {
    try {
      const formData = appendFormData(fileSelected)
      const CLOUD_URL_STORAGE = `https://api.cloudinary.com/v1_1/${Global.CLOUD_STORAGE_NAME}/${isVideo ? "video" : "image"}/upload/`
      const res = await axios.post(CLOUD_URL_STORAGE, formData);
      return res.data;
    } catch (error) {
      console.log(ErrorType.UPLOAD_IMAGE, error);
      throw error;
    }
  }
}

export async function uploadMedia(fileSelected: any, isVideo: boolean = false) {
  return await handleUpload(fileSelected, isVideo)
}