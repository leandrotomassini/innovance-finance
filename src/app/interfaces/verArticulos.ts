export interface VerArticulos {
    ok:        boolean;
    articulos: Articulo[];
}

export interface VerArticulo {
    ok:       boolean;
    articulo: Articulo;
}


export interface Articulo {
    _id:              string;
    titulo:           string;
    descripcionCorta: string;
    fecha:            string;
    portada:          string;
    terminado:        boolean;
    contenido:        string;
    estado:           boolean;
    usuario:          Usuario;
    __v:              number;
}

export interface Usuario {
    nombre: string;
    correo: string;
    rol:    string;
    img:    string;
    estado: boolean;
    uid:    string;
}

