export interface ListarUsuarios {
    ok: boolean;
    usuarios: Usuario[];
}

export interface VerUsuario {
    ok: boolean;
    usuario: Usuario;
}


export interface Usuario {
    nombre: string;
    correo: string;
    img: string;
    rol: string;
    estado?: boolean;
    uid?: string;
}

export interface VerRoles {
    ok: boolean;
    roles: Role[];
}

export interface Role {
    _id: string;
    rol: string;
    estado: boolean;
    __v: number;
}
