import type { UploadFile } from 'antd';

const getBase64 = (file: any): Promise<string> => {
  if (!file) return Promise.reject(new Error('no file'));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const imagePreview = async (
  file: UploadFile,
  callback: (params: { image: string }) => void
) => {
  const newFile = file;
  if (!newFile.url && !newFile.preview && file.originFileObj) {
    newFile.preview = await getBase64(file.originFileObj);
  }
  const newPreviewImage: string = newFile.url || newFile.preview || '';
  callback({
    image: newPreviewImage,
  });
};

export { imagePreview };
