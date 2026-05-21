import { photosApi } from "@/api/photosApi";
import type { User } from "@/interfaces/user.interface";
import type { UserBack } from "@/interfaces/userBack.interface";

export const patchUserUpdate = async (
  users: User[],
): Promise<{ success: boolean; error?: string }> => {
  console.log({ users });
  const token = localStorage.getItem("token");
  const usersBack: UserBack[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    is_admin: user.isAdmin,
  }));
  const { data } = await photosApi.patch<{ success: boolean; error?: string }>(
    "/users",
    usersBack,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
