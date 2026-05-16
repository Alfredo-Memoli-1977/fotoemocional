import { photosApi } from "@/api/photosApi";
import type { Orientation, Photo } from "@/interfaces/photo.interface";

interface Options {
  minPrice?: number | string;
  maxPrice?: number | string;
  category?: string | undefined;
  orientation?: Orientation;
  q?: string;
}

export const getPhotosAction = async (options: Options): Promise<Photo[]> => {
  const { minPrice, maxPrice, category, orientation, q } = options;

  const { data } = await photosApi.get<Photo[]>("/photos", {
    params: {
      min_price: minPrice,
      max_price: maxPrice,
      category,
      orientation,
      q,
    },
  });

  return data.map((photo) => ({
    ...photo,
    preview_url: `${import.meta.env.VITE_API_URL}${photo.preview_url}`,
  }));
};
