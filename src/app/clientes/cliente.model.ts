/**
 * Estos son los tipos de datos que vamos a usar en la aplicaciòn.
 */
export interface Cliente {
  id: number;
  nombre: string;
  cif: string;
  direccion: string;
  grupo: number;
}

export interface Grupo {
  id: number;
  nombre: string;
}
