import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPhotoUpdate } from "../actions/patch-photoUpdate";

export const usePhotoUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["photo"],
    mutationFn:
      //La consulta
      patchPhotoUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo"] });
    },
  });
};
