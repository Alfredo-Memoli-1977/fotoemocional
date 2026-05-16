export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  isAdmin: boolean; // del backend viene is_admin cuidado al recibir
}
