import type { AuthResponse } from "../interfaces/auth-response.interface";
import { photosApi } from "@/api/photosApi";
import type { BackendAuthResponse } from "@/interfaces/backAuthResp.interface";

export const loginActions = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await photosApi.post<BackendAuthResponse>("/auth/login", {
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
    throw new Error("Error en login");
  }
};
