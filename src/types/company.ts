import { Product } from './product'

export interface Company {
  name: string
  webSite: string
  logoUrl: string
  about: string
  slogan: string
  phone?: string
  products?: Product[]
}
