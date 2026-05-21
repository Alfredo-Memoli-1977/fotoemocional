import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserUpdate } from "../actions/patch-userUpdate";

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["users"],
    mutationFn:
      //La consulta
      patchUserUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
