import { photosApi } from "@/api/photosApi";

export const createQrToken = async (): Promise<string> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token");
  }

  const { data } = await photosApi.get<string>("/users/temporary_token", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
