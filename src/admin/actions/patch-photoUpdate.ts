import { photosApi } from "@/api/photosApi";
import type { Photo } from "@/interfaces/photo.interface";

export const patchPhotoUpdate = async ({
  photo,
}: {
  photo: Photo;
}): Promise<{ success: boolean; error?: string }> => {
  const token = localStorage.getItem("token");
  const { data } = await photosApi.patch<{ success: boolean; error?: string }>(
    "/photos",
    photo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
