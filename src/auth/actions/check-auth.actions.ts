import { photosApi } from "@/api/photosApi";
import type { UserBack } from "@/interfaces/userBack.interface";
import type { User } from "@/interfaces/user.interface";

export const checkAuth = async (): Promise<User> => {
  const token = localStorage.getItem("token") || null;

  if (!token) {
    throw new Error("No hay token");
  }

  try {
    const { data } = await photosApi.get<UserBack>("/auth/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      isAdmin: data.is_admin,
    };
  } catch (error) {
    throw new Error("Error al verificar usuario");
  }
};
