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
  img: string,
  rol: string,
  estado: string,
  google: string,
  nombre: string,
  correo: string,
  uid: string
}

export interface Rol {
  _id: string,
  rol: string
}

export interface Subscripcion {
  estado: boolean,
  _id: string,
  nombre: string,
  valor: string,
}