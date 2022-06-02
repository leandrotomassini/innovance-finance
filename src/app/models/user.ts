import { Usuario } from "../interfaces/interfaces";

export class User implements Usuario {

  constructor(
    public img: string,
    public rol: string,
    public estado: string,
    public google: string,
    public nombre: string,
    public correo: string,
    public uid: string
  ) {
      this.img = '',
      this.rol = '',
      this.estado = '',
      this.google = '',
      this.nombre = '',
      this.correo = '',
      this.uid = ''
  }

}
