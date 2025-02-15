import { Product } from '@/types/product'

export const productList: Product[] = [
  {
    id: '1',
    name: 'ProductName',
    description: 'This is the description',
    price: 45.99,
    category: 'Category',
    imageUrl: '/products/kraft.jpg',
    sizeOptions: ['50cm', '70cm', '120cm', '100cm', '160cm'],
    weight: ['20g/m²']
  }
]
