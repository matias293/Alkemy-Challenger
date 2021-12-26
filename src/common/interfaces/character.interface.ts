export interface Characters {
  id?: number;
  name: string;
  age: number;
  weight: number;
  picture: string;
  history: string;
}

export interface Error {
  statusCode?: number;
  message?: string;
}

export interface NewCharacters {
  name: string;
  age: number;
  weight: number;
  history: string;
  picture: string;
}

export interface UpdateCharacters {
  name?: string;
  age?: number;
  weight?: number;
  history?: string;
  picture?: string;
}

export interface Query {
  name?: string;
  age?: number;
  movies?: string;
}
