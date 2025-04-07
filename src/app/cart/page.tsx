'use client'

import { Header } from '@/components/ui/header/header'
import Footer from '@/components/ui/footer/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useCartStore from '@/app/store'
import { Trash2 } from 'lucide-react'
import { ProductCart } from '@/types/product'

export default function CartPage() {
  const { items, removeItem } = useCartStore()
  const [cartProducts, setCartProducts] = useState<ProductCart[]>([])

  useEffect(() => {
    // Filter products that are in the cart
    setCartProducts(items)
  }, [items])

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
  }

  return (
    <div className='bg-white'>
      <Header />

      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Seu Carrinho</h1>

        {cartProducts.length === 0 ? (
          <div className='text-center py-12'>
            <h2 className='text-xl font-medium mb-4'>Seu carrinho está vazio</h2>
            <p className='text-muted-foreground mb-6'>
              Adicione produtos ao seu carrinho para continuar comprando.
            </p>
            <Button asChild>
              <Link href='/'>Ver Catálogo</Link>
            </Button>
          </div>
        ) : (
          <div className='space-y-6'>
            {cartProducts.map((product) => (
              <Card
                key={product.id}
                className='p-4'>
                <div className='flex flex-col md:flex-row gap-4 items-center'>
                  <div className='relative h-32 w-32 flex-shrink-0'>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className='object-contain rounded-md'
                    />
                  </div>
                  <div className='flex-grow'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='text-xl font-semibold'>{product.name}</h3>
                        <Badge
                          variant='outline'
                          className='mt-1'>
                          {product.category}
                        </Badge>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleRemoveItem(product.id)}
                        className='text-red-500 hover:text-red-700 hover:bg-red-50'>
                        <Trash2 className='h-5 w-5' />
                      </Button>
                    </div>
                    <p className='text-muted-foreground mt-2'>{product.description}</p>
                    <div className='mt-2'>
                      <span className='font-medium'>Preço: R$ {product.price.toFixed(2)}</span>
                    </div>
                    {product.size && (
                      <div className='mt-2'>
                        <span className='text-sm font-medium'>Tamanho: </span>
                        <span className='text-sm text-muted-foreground'>{product.size}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className='mt-1'>
                        <span className='text-sm font-medium'>Gramatura: </span>
                        <span className='text-sm text-muted-foreground'>{product.weight}</span>
                      </div>
                    )}
                    {product.length && (
                      <div className='mt-1'>
                        <span className='text-sm font-medium'>Metragem: </span>
                        <span className='text-sm text-muted-foreground'>{product.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <div className='flex justify-between items-center mt-8'>
              <div>
                <span className='text-lg font-medium'>Total de itens: {cartProducts.length}</span>
              </div>
              <div className='flex gap-4'>
                <Button
                  variant='outline'
                  asChild>
                  <Link href='/'>Continuar Comprando</Link>
                </Button>
                <Button asChild>
                  <Link href='/checkout'>Pedir via whatsapp</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
