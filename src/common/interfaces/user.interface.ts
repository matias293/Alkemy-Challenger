export interface Error {
  statusCode?: number;
  message?: string;
}

export interface newUsuario {
  username: string;
  email: string;
  password: string;
}

export interface Usuario {
  id?: string;
  username: string;
  email: string;
  password: string;
}

export interface UsuarioJ {
  id: string;
  username: string;
  email: string;
  password: string;
}
