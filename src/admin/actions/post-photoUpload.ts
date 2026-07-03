import { photosApi } from "@/api/photosApi";

export const postPhotoUpload = async (
  photoFiles: File[],
): Promise<{ success: boolean; error?: string }> => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  photoFiles.forEach((file) => {
    formData.append("photos", file);
  });
  const { data } = await photosApi.post<{ success: boolean; error?: string }>(
    "/photos",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
