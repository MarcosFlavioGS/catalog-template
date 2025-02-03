import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { productList } from '@/data/products'
import { company } from '@/data/company'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function CatalogPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Catálogo de Produtos {company.name}</h1>
        <p className='text-muted-foreground'>{company.slogan}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {productList.map((product) => (
          <Card
            key={product.id}
            className='hover:shadow-lg transition-shadow'>
            <div className='relative h-64'>
              <Link href={'/products/' + product.id}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className='object-contain rounded-t-lg'
                  objectPosition='center'
                />
              </Link>
            </div>
            <div className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-xl font-semibold'>{product.name}</h3>
                <Badge variant='outline'>{product.category}</Badge>
              </div>
              <p className='text-muted-foreground mb-4'>{product.description}</p>

              <div className='space-y-2 mb-4'>
                {product.weight && (
                  <div className='text-sm'>
                    <span className='font-medium'>Gramaturas: </span>
                    {product.weight.join(', ')}
                  </div>
                )}
              </div>

              <div className='flex justify-between items-center mt-4'>
                <span className='text-2xl font-bold'>
                  A partir de R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <Link
                  href={`/products/${product.id}`}
                  passHref>
                  {' '}
                  {/* Use the Link component */}
                  <Button>Ver Detalhes</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
