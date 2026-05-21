import { useQuery } from "@tanstack/react-query";
import { getUserAdmin } from "../actions/get-userAdmin";

export const useUserAdmin = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      //La consulta
      getUserAdmin(),
    staleTime: 1000 * 60 * 5, // Mantiene la consulta por 5 minutos si no hay cambios
  });
};
