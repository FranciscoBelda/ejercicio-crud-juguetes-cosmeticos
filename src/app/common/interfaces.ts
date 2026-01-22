export interface ApiResponseJuguetesByPage {
  juguetes: JuguetesData
}

export interface JuguetesData {
  info: Info
  juguetes: Juguete[]
}

export interface Info {
  total: number
  pages: number
}

export interface Juguete {
  _id: string
  nombre: string
  imagen: string
  categoria: string
  edadMinima: number
  precio: number
}

export interface JugueteItem extends Juguete{
  quantity: number;
}

export interface ApiResponseDeleteJuguete {
  message: string;
}

/* COSMÉTICOS */
export interface ApiResponseCosmeticos {
  cosmeticos: CosmeticosData
}
export interface ApiResponseMessage {
  message: string
}

export interface CosmeticosData {
  info: Info
  cosmeticos: Cosmetico[]
}

export interface Info {
  total: number
  pages: number
}

export interface Cosmetico {
  _id: string
  name: string
  image: string
  type: string
  brand: string
  price: number
}
export interface CosmeticoItem extends Cosmetico{
  quantity: number
}



export interface Toast{
  text: string;
  className: string;
}
