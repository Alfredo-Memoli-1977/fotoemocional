import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPhotoUpload } from "../actions/post-photoUpload";

export const usePhotoUpload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["photos"],
    mutationFn:
      //La consulta
      postPhotoUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });
};
