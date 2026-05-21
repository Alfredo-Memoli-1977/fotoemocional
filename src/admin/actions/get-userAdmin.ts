import { photosApi } from "@/api/photosApi";
import type { User } from "@/interfaces/user.interface";
import type { UserBack } from "@/interfaces/userBack.interface";

export const getUserAdmin = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  const { data } = await photosApi.get<UserBack[]>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.map((usr) => ({
    id: usr.id,
    name: usr.name,
    lastname: usr.lastname,
    email: usr.email,
    isAdmin: usr.is_admin,
  }));
};
