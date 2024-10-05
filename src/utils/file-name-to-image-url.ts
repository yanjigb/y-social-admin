export const fileNameToImageUrl = (file: any): string => {
  const imageBlob = new Blob([file], { type: file.type });
  const url = URL.createObjectURL(imageBlob);
  return url;
};
