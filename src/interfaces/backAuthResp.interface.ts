export interface BackendAuthResponse {
  user: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    is_admin: boolean;
  };
  token: string;
}
