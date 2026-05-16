import { useQuery } from "@tanstack/react-query";
import { getPhotosAction } from "../actions/get-photos.action";
import { useSearchParams } from "react-router-dom";
import type { Orientation } from "../../interfaces/photo.interface";

export const usePhotos = () => {
  const [searchParams] = useSearchParams();
  const minPrice = searchParams.get("minPrice") || "any";
  const maxPrice = searchParams.get("maxPrice") || "any";
  const category =
    searchParams.get("category") === "any"
      ? undefined
      : searchParams.get("category") || undefined;
  const orientation =
    (searchParams.get("orientation") as Orientation) || "landscape";
  const q =
    searchParams.get("q") === ""
      ? undefined
      : searchParams.get("q") || undefined;
  return useQuery({
    queryKey: ["photos", { minPrice, maxPrice, category, orientation, q }],
    queryFn: () =>
      //La consulta
      getPhotosAction({
        minPrice: isNaN(+minPrice) ? undefined : +minPrice,
        maxPrice: isNaN(+maxPrice) ? undefined : +maxPrice,
        category,
        orientation,
        q,
      }),
    staleTime: 1000 * 60 * 5, // Mantiene la consulta por 5 minutos si no hay cambios
  });
};
