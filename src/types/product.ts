export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  sizeOptions?: string[]
  weight?: string[]
  lengthOptions?: string[]
}

export type ProductCart = Omit<Product, 'sizeOptions' | 'weight' | 'lengthOptions'> & {
  size: string
  weight: string
  length: string
}
