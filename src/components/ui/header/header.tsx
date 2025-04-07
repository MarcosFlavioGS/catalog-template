'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { company } from '@/data/company'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import useCartStore from '@/app/store'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartCount = useCartStore((state) => state.itemCount)

  return (
    <header className='bg-white shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo and Main Navigation */}
          <div className='flex items-center gap-2'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center gap-2'>
              <span className={`${isMenuOpen ? 'text-1xl' : 'text-2xl'} font-bold text-primary `}>
                {company.name}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className='md:hidden p-2 text-gray-700 hover:text-primary focus:outline-none'
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`
              absolute top-16 left-0 w-full bg-white shadow-md md:static md:shadow-none md:flex md:items-center md:gap-6
              ${isMenuOpen ? 'block' : 'hidden'}`}>
            <Link
              href='/'
              className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors md:inline'>
              Início
            </Link>
            <Link
              href='/about'
              className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors md:inline'>
              Sobre Nós
            </Link>
            <Link
              href='/contact'
              className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors md:inline'>
              Contato
            </Link>
            <Link
              href='/products/new'
              className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors md:inline'>
              Novo Produto
            </Link>
          </nav>

          {/* External Link and Cart */}
          <div className='md:flex items-center gap-4'>
            {/* External Link */}
            <Button
              asChild
              variant='default'>
              <Link
                href={company.webSite}
                target='_blank'
                rel='noopener noreferrer'>
                Acesse nossa Loja Virtual
              </Link>
            </Button>

            {/* Shopping Cart (Optional) */}
            <Button
              variant='ghost'
              size='icon'
              className='relative'
              asChild>
              <Link href='/cart'>
                <ShoppingCart className='h-5 w-5' />
                <span className='sr-only'>Carrinho</span>
                <span className='absolute top-0 right-0 bg-primary text-white rounded-full text-xs px-1.5 py-0.5'>
                  {cartCount}
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
