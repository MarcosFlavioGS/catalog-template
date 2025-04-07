import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header/header'
import { company } from '@/data/company'

export default function AboutPage() {
  return (
    <div className='bg-white'>
      <Header />

      {/* Hero Section */}
      <div className='bg-gray-50 py-20'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Sobre a {company.name}</h1>
          <p className='text-lg text-muted-foreground'>Conheça mais sobre nossa história, missão e equipe.</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Nossa Missão</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className='relative h-96'>
            <Image
              src={company.logoUrl} // Replace with your image
              alt='Nossa Missão'
              width={500}
              height={500}
              className='object-cover rounded-lg'
            />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='container mx-auto px-4 py-20 text-center'>
        <h2 className='text-3xl font-bold text-gray-900 mb-6'>Pronto para Trabalhar Conosco?</h2>
        <p className='text-muted-foreground mb-8'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua.
        </p>
        <Button asChild>
          <Link href='/contact'>Entre em Contato</Link>
        </Button>
      </div>
    </div>
  )
}
