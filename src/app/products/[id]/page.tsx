import { productList } from '@/data/products'
import { Header } from '@/components/ui/header/header'
import Footer from '@/components/ui/footer/footer'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const product = productList.find((p) => p.id === id)

  if (!product) {
    return <div>Produto não encontrado</div>
  }

  return (
    <div className='bg-white'>
      <Header />

      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Product Image */}
          <div className='relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg'>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className='object-contain'
              priority
            />
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <Badge
              variant='outline'
              className='text-sm'>
              {product.category}
            </Badge>
            <h1 className='text-4xl font-bold'>{product.name}</h1>
            <p className='text-muted-foreground text-lg'>{product.description}</p>

            {/* Price */}
            <div className='text-3xl font-bold text-primary'>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>

            {/* Size Options */}
            {product.sizeOptions && (
              <div className='space-y-2'>
                <h3 className='text-xl font-semibold'>Tamanhos Disponíveis</h3>
                <div className='flex flex-wrap gap-2'>
                  {product.sizeOptions.map((size, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='text-sm'>
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Weight Options */}
            {product.weight && (
              <div className='space-y-2'>
                <h3 className='text-xl font-semibold'>Gramaturas Disponíveis</h3>
                <div className='flex flex-wrap gap-2'>
                  {product.weight.map((weight, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='text-sm'>
                      {weight}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className='flex gap-4'>
              <Button
                size='lg'
                className='bg-primary hover:bg-primary/90'>
                Adicionar ao Carrinho
              </Button>
              <Button
                size='lg'
                variant='outline'>
                Fazer Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
