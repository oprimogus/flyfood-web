import Image from 'next/image'
import NavHome from '@/components/nav/nav-home'
import * as Progress from '@radix-ui/react-progress'
import { ArrowRight, CheckCircle, Clock, MapPin, Search, Shield, Star } from 'lucide-react'
import Footer from '@/components/footer/footer'

const categorias = [
  { nome: 'Pizza', img: '/flyfood/categorias/pizza.svg', popular: true },
  { nome: 'Hambúrguer', img: '/flyfood/categorias/burger.svg', popular: true },
  { nome: 'Salgados', img: '/flyfood/categorias/salgado.svg', popular: false },
  { nome: 'Doces', img: '/flyfood/categorias/doce.svg', popular: false },
  { nome: 'Japonesa', img: '/flyfood/categorias/japonesa.svg', popular: true },
  { nome: 'Vegetariana', img: '/flyfood/categorias/veg.svg', popular: false }
]

const comoFunciona = [
  {
    icon: <Search className="w-10 h-10 mb-4 text-accent" />,
    title: '1. Explore Lojas',
    desc: 'Veja opções perto de você sem precisar baixar app.'
  },
  {
    icon: <CheckCircle className="w-10 h-10 mb-4 text-accent" />,
    title: '2. Faça seu Pedido',
    desc: 'Escolha produtos, adicione ao carrinho e finalize com poucos toques.'
  },
  {
    icon: <Shield className="w-10 h-10 mb-4 text-accent" />,
    title: '3. Pague do seu Jeito',
    desc: 'Pix, cartão ou dinheiro. Combine direto com a loja.'
  }
]

const vantagens = [
  {
    icon: <Shield className="w-12 h-12" />,
    titulo: "Sem Taxas Extras",
    desc: "Pague apenas pelo seu pedido, sem surpresas na fatura"
  },
  {
    icon: <Clock className="w-12 h-12" />,
    titulo: "Entrega Rápida",
    desc: "Monitore em tempo real o status do seu pedido"
  },
  {
    icon: <MapPin className="w-12 h-12" />,
    titulo: "Lojas Próximas",
    desc: "Encontre os melhores restaurantes da sua região"
  }
]

const depoimentos = [
  {
    nome: "Maria Silva",
    cidade: "São Paulo, SP",
    texto: "Consigo pedir meu almoço em menos de 2 minutos e não preciso comprar cupom para pagar o preço normal!",
    estrelas: 5
  },
  {
    nome: "João Oliveira",
    cidade: "Rio de Janeiro, RJ",
    texto: "Ótimos restaurantes e sem aquelas taxas absurdas de outros apps.",
    estrelas: 5
  },
  {
    nome: "Ana Paula",
    cidade: "Belo Horizonte, MG",
    texto: "Uso toda semana e nunca tive problemas. Super recomendo!",
    estrelas: 4
  }
]

export default function HomeCustomer() {
  return (
    <main className='flex flex-col min-h-screen bg-base-100 text-base-content overflow-x-hidden'>
      <NavHome />

      {/* Hero Section - Primeira visualização */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background com overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-primary/85"></div>
        </div>

        {/* Conteúdo */}
        <div className="container mx-auto px-4 md:px-6 z-10 py-16 md:py-8 flex flex-col justify-center h-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white">
              <span className="inline-block bg-accent text-accent-content px-4 py-1 rounded-full text-sm font-medium mb-6">
                Delivery sem complicação
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Peça Comida Rápido e <span className="text-accent">Sem Taxas</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Descubra restaurantes locais, peça pelo celular e receba em casa.
                Sem taxas escondidas, sem complicações.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-accent btn-lg text-accent-content">
                  Encontrar Restaurantes <MapPin className="ml-2 w-5 h-5" />
                </button>
                <a href="#como-funciona" className="inline-block">
                  <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary w-full">
                    Como Funciona <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </a>
              </div>

              {/* Estatísticas rápidas */}
              <div className="mt-8 md:mt-12 flex flex-wrap gap-8">
                <div>
                  <p className="text-3xl font-bold text-accent">+500</p>
                  <p className="text-white/80">Restaurantes parceiros</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">92%</p>
                  <p className="text-white/80">Satisfação</p>
                </div>
                {/* <div>
                  <p className="text-3xl font-bold text-accent">0</p>
                  <p className="text-white/80">Taxa de entrega</p>
                </div> */}
              </div>
            </div>

            {/* Área para imagem ou formulário na versão desktop */}
            {/* <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-2xl w-full max-w-md">
                <Image
                  src="/flyfood/categorias/pizza.svg"
                  alt="FlyFood"
                  width={120}
                  height={120}
                  className="mx-auto mb-6"
                />
                <h3 className="text-white text-xl font-bold text-center mb-6">Pronto para pedir?</h3>
                <button className="btn btn-accent w-full text-accent-content mb-4">
                  Ver cardápio agora
                </button>
              </div>
            </div> */}
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <a href="#categorias" className="text-white/80 hover:text-white">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Categorias Populares - Segunda visualização */}
      <section id="categorias" className="min-h-screen py-16 bg-base-200 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              Comércio & Serviços
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">O que você procura hoje?</h2>
            <p className="text-base-content/70 mt-3 max-w-xl mx-auto">
              Encontre uma variedade de estabelecimentos e serviços essenciais para o seu dia a dia
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categorias.map((cat) => (
              <div
                key={cat.nome}
                className="bg-base-100 rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {cat.popular && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-content text-xs px-2 py-1 rounded-bl-lg font-medium">
                    Popular
                  </div>
                )}
                <div className="bg-base-200 p-3 rounded-full mb-3">
                  <Image src={cat.img} alt={cat.nome} width={48} height={48} />
                </div>
                <span className="font-semibold">{cat.nome}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="btn btn-primary text-white">
              Ver todas as categorias <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Indicador de scroll */}
          <div className="flex justify-center mt-16">
            <a href="#como-funciona" className="text-base-content/60 hover:text-base-content">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Como Funciona - Terceira visualização */}
      <section id="como-funciona" className="min-h-screen py-16 bg-base-100 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              É simples usar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Como Funciona?</h2>
            <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
              Peça seu delivery em apenas 3 passos simples, sem complicação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Linha conectora (visível apenas em desktop) */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-base-300 z-0"></div>

            {comoFunciona.map((item, index) => (
              <div
                key={item.title}
                className="card bg-base-100 shadow-xl border border-base-300 z-10"
              >
                <div className="card-body items-center text-center">
                  {item.icon}
                  <h3 className="card-title text-2xl font-bold">{item.title}</h3>
                  <p className="text-base-content/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Indicador de scroll */}
          <div className="flex justify-center mt-16">
            <a href="#vantagens" className="text-base-content/60 hover:text-base-content">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Vantagens - Quarta visualização */}
      <section id="vantagens" className="min-h-screen py-16 bg-primary text-white flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
              Por que escolher a FlyFood
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Vantagens para você</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {vantagens.map((vantagem) => (
              <div key={vantagem.titulo} className="flex flex-col items-center text-center p-6 bg-primary-focus/20 rounded-xl backdrop-blur-sm">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  {vantagem.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{vantagem.titulo}</h3>
                <p className="text-white/80">{vantagem.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="btn btn-accent btn-lg text-accent-content">
              Ver restaurantes disponíveis
            </button>
          </div>

          {/* Indicador de scroll */}
          <div className="flex justify-center mt-16">
            <a href="#depoimentos" className="text-white/60 hover:text-white">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Depoimentos - Quinta visualização */}
      <section id="depoimentos" className="min-h-screen py-16 bg-base-200 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              O que dizem nossos clientes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Satisfação Garantida</h2>
          </div>

          {/* Estatística de satisfação */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="relative w-64 h-4 bg-base-300 rounded-full overflow-hidden">
              <Progress.Root
                value={92}
                className="absolute inset-0 h-full rounded-full bg-accent transition-all duration-700"
                style={{ width: '92%' }}
              />
            </div>
            <span className="text-lg font-medium">92% dos usuários recomendam o FlyFood</span>
          </div>

          {/* Grid de depoimentos */}
          <div className="grid md:grid-cols-3 gap-6">
            {depoimentos.map((depoimento) => (
              <div key={depoimento.nome} className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < depoimento.estrelas ? 'text-accent fill-accent' : 'text-base-300'}`}
                    />
                  ))}
                </div>
                <p className="mt-4 mb-4 italic">"{depoimento.texto}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {depoimento.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{depoimento.nome}</p>
                    <p className="text-sm text-base-content/70 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {depoimento.cidade}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicador de scroll */}
          <div className="flex justify-center mt-16">
            <a href="#cta" className="text-base-content/60 hover:text-base-content">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action - Sexta visualização */}
      <section id="cta" className="min-h-screen py-16 bg-accent text-accent-content flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Experimente Agora</h2>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            Peça de restaurantes locais sem pagar taxas extras. Faça seu primeiro pedido hoje e descubra por que tantas pessoas escolhem o FlyFood.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button className="btn btn-primary btn-lg text-white ">
              Ver Lojas Perto de Mim <MapPin className="ml-2 w-5 h-5" />
            </button>
            <button className="btn btn-outline btn-lg border-primary text-primary hover:bg-primary hover:text-white">
              Criar Conta Grátis
            </button>
          </div>

          {/* Características extras */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-8 h-8" />
              </div>
              <p className="font-semibold">Rápido</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8" />
              </div>
              <p className="font-semibold">Seguro</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8" />
              </div>
              <p className="font-semibold">Local</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="font-semibold">Confiável</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}