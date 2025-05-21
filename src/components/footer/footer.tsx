import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer md:footer-horizontal bg-primary text-neutral-content p-10">
      {/* Branding */}
      <div className="flex flex-col gap-2 max-w-sm">
        <aside>
          <Image
            src="/flyfood/logo/flyfood-white.svg"
            alt="FlyFood Logo"
            width={50}
            height={50}
            className="text-base-content"
          />
        </aside>
        <p className="font-bold text-lg">FlyFood</p>
        <p className="text-sm leading-relaxed break-words">
          Conectando você ao melhor da sua região, sem taxas extras.
        </p>
      </div>

      {/* Links rápidos */}
      <nav>
        <h6 className="footer-title">Links Rápidos</h6>
        <a href="_blank" className="link link-hover">Sobre nós</a>
      </nav>

      <nav>
        <h6 className="footer-title">Para Lojas</h6>
        <a href="_blank" className="link link-hover">Cadastre seu Negócio</a>
        <a href="_blank" className="link link-hover">Painel do Negócio</a>
        <a href="_blank" className="link link-hover">Benefícios</a>
      </nav>

      <nav>
        <h6 className="footer-title">Contato</h6>
        <a href="_blank" className="link link-hover">contato@flyfood.com.br</a>
        <a href="_blank" className="link link-hover">(13) 99999-9999</a>
      </nav>
    </footer>
  )
}
