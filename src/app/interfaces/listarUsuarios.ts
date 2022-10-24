export interface ListarUsuarios {
    ok: boolean;
    usuarios: Usuario[];
}

export interface Usuario {
    nombre: string;
    correo: string;
    img: string;
    rol: string;
    estado: boolean;
    uid: string;
}