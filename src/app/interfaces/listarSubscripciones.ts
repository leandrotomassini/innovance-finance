export interface ListarSubscripciones {
    ok:             boolean;
    subscripciones: Subscripcion[];
}

export interface Subscripcion {
    _id?:    string;
    titulo: string;
    precio: string;
    estado: boolean;
    __v?:    number;
}
