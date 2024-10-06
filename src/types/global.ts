export enum Global {
  SOCKET_URL = import.meta.env.VITE_SOCKET_URL,
  CLOUD_UPLOAD_PRESET = import.meta.env.VITE_CLOUD_UPLOAD_PRESET,
  CLOUD_STORAGE_NAME = import.meta.env.VITE_CLOUD_STORAGE_NAME,
  CLOUD_AUDIO_FOLDER = import.meta.env.VITE_CLOUD_AUDIO_FOLDER,
  CLOUD_IMAGE_FOLDER = import.meta.env.VITE_CLOUD_IMAGE_FOLDER,
  DEPLOY_URL = import.meta.env.VITE_DEPLOY_URL,
  ADMIN_ID = import.meta.env.VITE_ADMIN_ID,
};

export const getEnv = (key: Global) => import.meta.env[key];
