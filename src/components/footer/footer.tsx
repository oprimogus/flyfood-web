import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='footer footer-center bg-primary text-base-100 p-10'>
      <aside>
        <Image
          src='/flyfood/logo/flyfood-white.svg'
          alt='FlyFood Logo'
          width='50'
          height='50'
          className='text-base-content'
        />
        <p className='font-bold'>
          FlyFood Ltda.
          <br />
          Fornecendo tecnologia desde 2025
        </p>
        <p>
          Copyright © {new Date().getFullYear()} - Todos os direitos reservados
        </p>
      </aside>
    </footer>
  )
}
