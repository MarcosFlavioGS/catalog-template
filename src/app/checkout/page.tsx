'use client'

import { Header } from '@/components/ui/header/header'
import Footer from '@/components/ui/footer/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import useCartStore from '@/app/store'
import { company } from '@/data/company'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { items } = useCartStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Generate the message with cart items
    let message = `Olá! Meu nome é ${name} e estou interessado nos seguintes produtos:\n\n`
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   - Preço: R$ ${item.price.toFixed(2)}\n`
      if (item.size) message += `   - Tamanho: ${item.size}\n`
      if (item.weight) message += `   - Gramatura: ${item.weight}\n`
      if (item.length) message += `   - Metragem: ${item.length}\n\n`
    })
    
    message += `\nMeu email para contato: ${email}\n\n`
    message += `Agradeço a atenção!`

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${company.phone}?text=${encodedMessage}`, '_blank')
    
    setIsSubmitting(false)
    toast.success('Redirecionando para o WhatsApp...')
  }

  return (
    <div className='bg-white min-h-screen'>
      <Header />

      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-3xl font-bold mb-6 text-center'>Finalizar Compra</h1>
          
          <Card>
            <CardContent className='p-6'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Nome</Label>
                  <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Seu nome completo'
                    required
                  />
                </div>
                
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='seu.email@exemplo.com'
                    required
                  />
                </div>
                
                <div className='pt-4'>
                  <Button 
                    type='submit' 
                    className='w-full'
                    disabled={isSubmitting || items.length === 0}
                  >
                    {isSubmitting ? 'Processando...' : 'Enviar Pedido via WhatsApp'}
                  </Button>
                </div>
                
                {items.length === 0 && (
                  <p className='text-center text-red-500 mt-2'>
                    Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
          
          <div className='mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Resumo do Pedido</h2>
            <Card>
              <CardContent className='p-6'>
                {items.length === 0 ? (
                  <p className='text-center text-muted-foreground'>Nenhum item no carrinho</p>
                ) : (
                  <div className='space-y-4'>
                    {items.map((item) => (
                      <div key={item.id} className='flex justify-between items-start border-b pb-2'>
                        <div>
                          <h3 className='font-medium'>{item.name}</h3>
                          {item.size && <p className='text-sm text-muted-foreground'>Tamanho: {item.size}</p>}
                          {item.weight && <p className='text-sm text-muted-foreground'>Gramatura: {item.weight}</p>}
                          {item.length && <p className='text-sm text-muted-foreground'>Metragem: {item.length}</p>}
                        </div>
                        <p className='font-medium'>R$ {item.price.toFixed(2)}</p>
                      </div>
                    ))}
                    <div className='flex justify-between items-center pt-2 font-bold'>
                      <span>Total</span>
                      <span>R$ {items.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}