export interface Subscriptores {
    ok:            boolean;
    subscriptores: Subscriptor[];
}

export interface Subscriptor {
    _id:         string;
    usuario:     Usuario;
    vencimiento: string;
    estado:      boolean;
    __v:         number;
}

export interface Usuario {
    nombre: string;
    correo: string;
    img:    string;
    rol:    string;
    estado: boolean;
    uid:    string;
}
