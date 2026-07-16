import { photosApi } from "@/api/photosApi";

type UploadResponse = {
  success: boolean;
  error?: string;
  duplicates?: string[];
};

export const postPhotoUpload = async (
  photoFiles: File[],
): Promise<UploadResponse> => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  photoFiles.forEach((file) => {
    formData.append("photos", file);
  });
  const { data } = await photosApi.post<UploadResponse>("/photos", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
