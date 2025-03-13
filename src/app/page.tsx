import NavHome from '@/components/nav/nav-home'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='min-w-full bg-base-100 text-base-content'>
      <NavHome />

      {/* Hero Section */}
      <section className='hero min-h-screen bg-primary-content'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <Image
            src='flyfood/ilustration/deliveries.svg'
            alt='Delivery App Showcase'
            width={600}
            height={400}
            className='max-w-sm rounded-lg'
          />
          <div className='flex flex-col '>
            <h1 className='text-5xl font-bold'>
              Transforme Seu Negócio com Pedidos Online
            </h1>
            <p className='py-6 text-lg'>
              Gerencie sua loja de forma simples, sem taxas abusivas. Cadastre
              seus produtos, receba pedidos e pagamentos diretamente dos seus
              clientes.
            </p>
            <button type='button' className='btn btn-primary btn-lg'>
              Comece Agora
            </button>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className='hero min-h-screen bg-base-300'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Por que Escolher Nossa Plataforma?
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Sem Taxas Abusivas',
                desc: 'Nosso modelo de assinatura permite que você economize e aumente seus lucros sem perder dinheiro com comissões exageradas.'
              },
              {
                title: 'Controle Total',
                desc: 'Gerencie pedidos, estoque e cardápio com facilidade, mantendo controle total sobre sua operação.'
              },
              {
                title: 'Pagamentos Diretos',
                desc: 'Receba diretamente via Pix, cartão ou dinheiro, sem intermediários que reduzam seu faturamento.'
              }
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className='card bg-primary text-base-100 shadow-xl'
              >
                <div className='card-body'>
                  <h3 className='card-title text-2xl font-semibold'>
                    {benefit.title}
                  </h3>
                  <p>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className='hero min-h-screen bg-base-200'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Como Funciona?
          </h2>
          <div className='grid md:grid-cols-4 gap-8'>
            {[
              {
                title: '1. Cadastre sua Loja',
                desc: 'Crie sua conta, personalize sua loja e adicione seus produtos de forma rápida e intuitiva.'
              },
              {
                title: '2. Configure seu Cardápio',
                desc: 'Defina categorias, preços e horários de funcionamento conforme suas necessidades.'
              },
              {
                title: '3. Comece a Receber Pedidos',
                desc: 'Seus clientes acessam seu menu e fazem pedidos de forma fácil e rápida.'
              },
              {
                title: '4. Lucro Direto',
                desc: 'Receba os pagamentos sem intermediários e aumente sua margem de lucro.'
              }
            ].map((step, index) => (
              <div
                key={step.title}
                className='card bg-primary text-white shadow-xl'
              >
                <div className='card-body'>
                  <h3 className='card-title text-xl font-semibold'>
                    {step.title}
                  </h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section className='hero min-h-screen py-20 bg-base-300 text-base-content text-center'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold mb-4'>Pronto para Crescer?</h2>
          <p className='text-lg mb-8'>
            Cadastre-se agora e comece a vender online sem complicações.
          </p>
          <button type='button' className='btn btn-primary btn-lg'>
            Criar Minha Loja Agora
          </button>
        </div>
      </section>
    </main>
  )
}
