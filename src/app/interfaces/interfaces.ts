export interface RespuestaPosts {
  ok:     boolean;
  pagina: number;
  posts:  Post[];
}

export interface Post {
  _id?:     string;
  imgs?:    string[];
  coords?:  string;
  mensaje?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}
