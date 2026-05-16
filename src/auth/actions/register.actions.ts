import type { BackendAuthResponse } from "@/interfaces/backAuthResp.interface";
import type { AuthResponse } from "../interfaces/auth-response.interface";
import type { AuthRequest } from "../interfaces/auth.interfaces";
import { photosApi } from "@/api/photosApi";

export const registerActions = async ({
  name,
  lastname,
  email,
  password,
}: AuthRequest): Promise<AuthResponse> => {
  try {
    const { data } = await photosApi.post<BackendAuthResponse>("/users", {
      name,
      lastname,
      email,
      password,
    });

    return {
      user: {
        id: data.user.id,
        name: data.user.name,
        lastname: data.user.lastname,
        email: data.user.email,
        isAdmin: data.user.is_admin,
      },
      token: data.token,
    };
  } catch (error) {
    throw new Error("Error al registrarse");
  }
};
