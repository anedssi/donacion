export interface Donante {
  $key: string;
  direccion?: string;
  telefono?: string;
  cedula: string;
  user: User;
}

export interface TipoDonacion {
  $key: string;
  tipo: string;
}


