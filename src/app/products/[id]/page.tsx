'use client'

import productList from '@/data/products.json'
import { Header } from '@/components/ui/header/header'
import Footer from '@/components/ui/footer/footer'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import useCartStore from '@/app/store'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { use } from 'react'
import { Product, ProductCart } from '@/types/product'

// Type assertion for the imported JSON
const typedProductList = productList as Product[]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedWeight, setSelectedWeight] = useState<string>('')
  const [selectedLength, setSelectedLength] = useState<string>('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    const foundProduct = typedProductList.find((p) => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
      // Set default selections if available
      if (foundProduct.sizeOptions && foundProduct.sizeOptions.length > 0) {
        setSelectedSize(foundProduct.sizeOptions[0])
      }
      if (foundProduct.weight && foundProduct.weight.length > 0) {
        setSelectedWeight(foundProduct.weight[0])
      }
      if (foundProduct.lengthOptions && foundProduct.lengthOptions.length > 0) {
        setSelectedLength(foundProduct.lengthOptions[0])
      }
    }
  }, [id])

  if (!product) {
    return <div>Produto não encontrado</div>
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)

    const productCart: ProductCart = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      size: selectedSize,
      weight: selectedWeight,
      length: selectedLength
    }

    // Add the product to the cart with selected options
    addItem(productCart)

    // Show success message
    toast.success('Produto adicionado ao carrinho!')

    // Reset state
    setIsAddingToCart(false)
  }

  return (
    <div className='bg-white min-h-screen'>
      <Header />

      <div className='container mx-auto px-4 py-12'>
        <Card className='overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* Product Image */}
            <div className='relative h-[500px] bg-white'>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className='object-contain p-4'
                priority
              />
            </div>

            {/* Product Details */}
            <CardContent className='p-8 space-y-6'>
              <div className='space-y-4'>
                <Badge
                  variant='outline'
                  className='text-sm'>
                  {product.category}
                </Badge>
                <h1 className='text-4xl font-bold'>{product.name}</h1>
                <p className='text-muted-foreground text-lg'>{product.description}</p>

                <div className='text-3xl font-bold text-primary'>R$ {product.price.toFixed(2)}</div>
              </div>

              {/* Size Options */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className='space-y-4'>
                  <h3 className='text-xl font-semibold'>Tamanhos Disponíveis</h3>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className='grid grid-cols-2 gap-4'>
                    {product.sizeOptions.map((size: string, index: number) => (
                      <div
                        key={index}
                        className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value={size}
                          id={`size-${index}`}
                        />
                        <Label
                          htmlFor={`size-${index}`}
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Weight Options */}
              {product.weight && product.weight.length > 0 && (
                <div className='space-y-4'>
                  <h3 className='text-xl font-semibold'>Gramaturas Disponíveis</h3>
                  <RadioGroup
                    value={selectedWeight}
                    onValueChange={setSelectedWeight}
                    className='grid grid-cols-2 gap-4'>
                    {product.weight.map((weight: string, index: number) => (
                      <div
                        key={index}
                        className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value={weight}
                          id={`weight-${index}`}
                        />
                        <Label
                          htmlFor={`weight-${index}`}
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                          {weight}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Length Options */}
              {product.lengthOptions && product.lengthOptions.length > 0 && (
                <div className='space-y-4'>
                  <h3 className='text-xl font-semibold'>Metragem Disponível</h3>
                  <RadioGroup
                    value={selectedLength}
                    onValueChange={setSelectedLength}
                    className='grid grid-cols-2 gap-4'>
                    {product.lengthOptions.map((length: string, index: number) => (
                      <div
                        key={index}
                        className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value={length}
                          id={`length-${index}`}
                        />
                        <Label htmlFor={`length-${index}`}>{length}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Call to Action */}
              <div className='flex gap-4 pt-6'>
                <Button
                  size='lg'
                  className='flex-1'
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}>
                  {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='flex-1'
                  onClick={() => router.push('/cart')}>
                  Ver Carrinho
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
