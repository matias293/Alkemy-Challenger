export interface Movies {
  id?: number;
  imagen: string;
  title: string;
  createdAt: string;
  calification: number;
}

export interface MovieQuery {
  title?: string;
  genre?: string;
  order?: string;
}

export interface Error {
  statusCode?: number;
  message?: string;
}

export interface NewMovies {
  imagen: string;
  title: string;
  createdAt: string;
  calification: number;
}

export interface UpdateMovie {
  imagen?: string;
  title?: string;
  createdAt?: string;
  calification?: number;
}
