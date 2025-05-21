import NavHome from '@/components/nav/nav-home'
import Footer from '@/components/footer/footer'
import * as Progress from '@radix-ui/react-progress'
import { ArrowRight, CheckCircle, Clock, CreditCard, BarChart3, Settings, MapPin, Search, Shield, Star, Users, Smartphone, DollarSign } from 'lucide-react'

const beneficios = [
  {
    icon: <DollarSign className="w-10 h-10 mb-4 text-accent" />,
    titulo: "Zero Comissões",
    desc: "Esqueça taxas de até 30%. Aqui você paga apenas uma assinatura fixa mensal."
  },
  {
    icon: <BarChart3 className="w-10 h-10 mb-4 text-accent" />,
    titulo: "Mais Lucro",
    desc: "Receba pagamentos diretamente dos clientes sem intermediários."
  },
  {
    icon: <Users className="w-10 h-10 mb-4 text-accent" />,
    titulo: "Novos Clientes",
    desc: "Seja descoberto por clientes da sua região que buscam opções de delivery."
  }
]

const comoFunciona = [
  {
    icon: <Search className="w-10 h-10 mb-4 text-accent" />,
    title: '1. Crie sua Loja',
    desc: 'Cadastre-se gratuitamente e configure seu perfil em minutos.'
  },
  {
    icon: <Settings className="w-10 h-10 mb-4 text-accent" />,
    title: '2. Adicione Produtos ou Serviços',
    desc: 'Defina produtos e/ou serviços que você oferece.'
  },
  {
    icon: <Smartphone className="w-10 h-10 mb-4 text-accent" />,
    title: '3. Comece a Vender',
    desc: 'Receba pedidos diretamente no seu celular ou computador.'
  },
  {
    icon: <CreditCard className="w-10 h-10 mb-4 text-accent" />,
    title: '4. Receba Pagamentos',
    desc: 'Aceite Pix, cartão ou dinheiro sem intermediários.'
  }
]

const vantagens = [
  {
    icon: <Shield className="w-12 h-12" />,
    titulo: "Sem Taxas por Pedido",
    desc: "Apenas assinatura fixa, sem surpresas ou comissões abusivas"
  },
  {
    icon: <Clock className="w-12 h-12" />,
    titulo: "Gestão Simplificada",
    desc: "Painel administrativo intuitivo para gerenciar todos seus pedidos"
  },
  {
    icon: <CheckCircle className="w-12 h-12" />,
    titulo: "Suporte Dedicado",
    desc: "Equipe pronta para ajudar em todas as etapas da sua operação"
  }
]

const depoimentos = [
  {
    nome: "Carlos Mendes",
    negocio: "Pizzaria Bella Napoli",
    cidade: "São Paulo, SP",
    texto: "Depois de usar outros apps de delivery, mudei para o FlyFood e minha margem de lucro aumentou 25%. A assinatura fixa vale muito a pena!",
    estrelas: 5
  },
  {
    nome: "Amanda Costa",
    negocio: "Sushi Express",
    cidade: "Rio de Janeiro, RJ",
    texto: "Plataforma simples de usar e sem aquelas taxas absurdas. Em 3 meses, já recuperei o investimento da assinatura.",
    estrelas: 5
  },
  {
    nome: "Roberto Almeida",
    negocio: "Burger House",
    cidade: "Belo Horizonte, MG",
    texto: "O suporte ao cliente é excelente e a possibilidade de receber pagamentos diretos melhorou meu fluxo de caixa.",
    estrelas: 4
  }
]

const planos = [
  {
    nome: "Iniciante",
    preco: "69,90",
    periodo: "/mês",
    popular: false,
    recursos: [
      "Até 50 produtos no catálogo",
      "Processamento de pedidos ilimitados",
      "Painel administrativo básico",
      "Suporte por e-mail"
    ]
  },
  {
    nome: "Profissional",
    preco: "129,90",
    periodo: "/mês",
    popular: true,
    recursos: [
      "Até 200 produtos no catálogo",
      "Processamento de pedidos ilimitados", 
      "Painel administrativo completo",
      "Relatórios de vendas avançados",
      "Suporte prioritário"
    ]
  },
  {
    nome: "Empresarial",
    preco: "199,90",
    periodo: "/mês",
    popular: false,
    recursos: [
      "Produtos ilimitados no catálogo",
      "Múltiplas lojas/filiais",
      "Painel administrativo completo",
      "Relatórios personalizados",
      "Suporte VIP 24/7"
    ]
  }
]

export default function HomeOwner() {
  return (
    <main className='flex flex-col min-h-screen bg-base-100 text-base-content overflow-x-hidden'>
      <NavHome />

      {/* Hero Section - Primeira visualização */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background com overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-primary"></div>
        </div>

        {/* Conteúdo */}
        <div className="container mx-auto px-4 md:px-6 z-10 py-16 md:py-8 flex flex-col justify-center h-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white">
              <span className="inline-block bg-accent text-accent-content px-4 py-1 rounded-full text-sm font-medium mb-6">
                Para Donos de Negócios
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Delivery <span className="text-accent">Sem Comissões</span> para o seu Negócio
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Aumente seu lucro com uma plataforma que não cobra porcentagem sobre suas vendas, apenas uma assinatura fixa mensal.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-accent btn-lg text-accent-content">
                  Cadastrar meu negócio <ArrowRight className="ml-2 w-5 h-5" />
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
                  <p className="text-3xl font-bold text-accent">+1500</p>
                  <p className="text-white/80">Restaurantes parceiros</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">+30%</p>
                  <p className="text-white/80">Aumento médio em lucro</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">0%</p>
                  <p className="text-white/80">Comissão sobre vendas</p>
                </div>
              </div>
            </div>

            {/* Área para imagem ou formulário na versão desktop */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-2xl w-full max-w-md">
                <h3 className="text-white text-xl font-bold text-center mb-6">Comece grátis por 14 dias</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Nome do seu estabelecimento" className="input input-bordered w-full" />
                  <input type="email" placeholder="Seu melhor e-mail" className="input input-bordered w-full" />
                  <input type="tel" placeholder="Telefone com WhatsApp" className="input input-bordered w-full" />
                  <button className="btn btn-accent w-full text-accent-content">
                    Testar Grátis por 14 Dias
                  </button>
                </div>
                <p className="text-white/70 text-xs mt-4 text-center">Sem compromisso. Cancele quando quiser.</p>
              </div>
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <a href="#beneficios" className="text-white/80 hover:text-white">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefícios - Segunda visualização */}
      <section id="beneficios" className="min-h-screen py-16 bg-base-200 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              Benefícios Exclusivos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Por que vender no FlyFood?</h2>
            <p className="text-base-content/70 mt-3 max-w-xl mx-auto">
              Nossa plataforma foi pensada para aumentar a rentabilidade do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {beneficios.map((item) => (
              <div
                key={item.titulo}
                className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-lg transition-duration-300"
              >
                <div className="card-body items-center text-center">
                  {item.icon}
                  <h3 className="card-title text-2xl font-bold">{item.titulo}</h3>
                  <p className="text-base-content/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparativo com concorrência */}
          <div className="mt-16 bg-base-100 p-8 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold text-center mb-8">Como nos comparamos com outros apps:</h3>
            
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="bg-base-200">Características</th>
                    <th className="bg-primary/10 text-primary text-center">FlyFood</th>
                    <th className="bg-base-200 text-center">Apps Tradicionais</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">Modelo de cobrança</td>
                    <td className="text-center bg-primary/5">
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" /> Assinatura fixa
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-error">Comissão de 15-30%</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Recebimento dos pagamentos</td>
                    <td className="text-center bg-primary/5">
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" /> Direto e imediato
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-error">7-14 dias após a venda</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Autonomia no preço</td>
                    <td className="text-center bg-primary/5">
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" /> Controle total
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-error">Pressão para descontos</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Taxas de entrega</td>
                    <td className="text-center bg-primary/5">
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" /> Você define
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-error">Controlada pelo app</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
              É simples começar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Como Funciona?</h2>
            <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
              Em apenas 4 passos rápidos você terá sua loja online funcionando
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Linha conectora (visível apenas em desktop) */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-base-300 z-0"></div>

            {comoFunciona.map((item) => (
              <div
                key={item.title}
                className="card bg-base-100 shadow-xl border border-base-300 z-10"
              >
                <div className="card-body items-center text-center">
                  {item.icon}
                  <h3 className="card-title text-xl font-bold">{item.title}</h3>
                  <p className="text-base-content/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="btn btn-primary">
              Cadastrar Agora <ArrowRight className="ml-2 w-5 h-5" />
            </button>
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
              Vantagens FlyFood
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Tudo que seu negócio precisa</h2>
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
            <h3 className="text-2xl font-bold mb-6">Recursos inclusos em todos os planos:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Painel administrativo",
                "Relatórios de vendas",
                "Cadastro de produtos",
                "Controle de pedidos",
                "Notificações em tempo real",
                "Avaliações de clientes",
                "Suporte técnico",
                "Marketplace local"
              ].map((recurso, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>{recurso}</span>
                </div>
              ))}
            </div>
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
              O que dizem nossos parceiros
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Histórias de Sucesso</h2>
          </div>

          {/* Estatística de satisfação */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="relative w-64 h-4 bg-base-300 rounded-full overflow-hidden">
              <Progress.Root
                value={95}
                className="absolute inset-0 h-full rounded-full bg-accent transition-all duration-700"
                style={{ width: '95%' }}
              />
            </div>
            <span className="text-lg font-medium">95% dos restaurantes parceiros renovam a assinatura</span>
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
                <p className="mt-4 mb-4 italic">&quot;{depoimento.texto}&quot;</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  &quot;{depoimento.nome.charAt(0)}&quot;
                  </div>
                  <div>
                    <p className="font-medium">{depoimento.nome}</p>
                    <p className="text-sm text-base-content/70">{depoimento.negocio}</p>
                    <p className="text-xs text-base-content/70 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {depoimento.cidade}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicador de scroll */}
          <div className="flex justify-center mt-16">
            <a href="#planos" className="text-base-content/60 hover:text-base-content">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Planos - Sexta visualização */}
      <section id="planos" className="min-h-screen py-16 bg-base-100 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              Investimento acessível
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Nossos Planos</h2>
            <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
              Escolha o plano ideal para o tamanho do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {planos.map((plano) => (
              <div 
                key={plano.nome}
                className={`card ${plano.popular ? 'bg-primary text-white' : 'bg-base-100'} shadow-xl border ${plano.popular ? 'border-accent' : 'border-base-300'} relative`}
              >
                {plano.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-content px-4 py-1 rounded-full font-medium">
                    Mais Popular
                  </div>
                )}
                
                <div className="card-body">
                  <h3 className="card-title text-2xl font-bold justify-center">{plano.nome}</h3>
                  
                  <div className="text-center my-4">
                    <div className="flex items-center justify-center">
                      <span className="text-lg">R$</span>
                      <span className="text-4xl font-bold mx-1">{plano.preco}</span>
                      <span>{plano.periodo}</span>
                    </div>
                    <p className={`text-sm mt-1 ${plano.popular ? 'text-white/80' : 'text-base-content/70'}`}>
                      Teste grátis por 14 dias
                    </p>
                  </div>
                  
                  <div className="divider"></div>
                  
                  <ul className="space-y-3">
                    {plano.recursos.map((recurso, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className={`w-5 h-5 mt-0.5 ${plano.popular ? 'text-accent-content' : 'text-accent'}`} />
                        <span className={plano.popular ? 'text-white/90' : 'text-base-content/90'}>{recurso}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="card-actions justify-center mt-6">
                    <button 
                      className={`btn ${plano.popular ? 'btn-accent text-accent-content' : 'btn-primary text-white'} w-full`}
                    >
                      Começar Agora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-base-content/70">
              Todos os planos incluem teste grátis de 14 dias. Cancele a qualquer momento.
            </p>
          </div>

          {/* Indicador de scroll */}
          <div className="flex justify-center mt-16">
            <a href="#cta" className="text-base-content/60 hover:text-base-content">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action - Sétima visualização */}
      <section id="cta" className="min-h-screen py-16 bg-accent text-accent-content flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Comece a Vender Online Hoje</h2>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            Junte-se a mais de 1.500 estabelecimentos que já estão aumentando suas vendas e lucros com o FlyFood.
          </p>

          <div className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-xl font-bold mb-4">Cadastre-se gratuitamente</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Nome do estabelecimento" className="input input-bordered w-full bg-white/20" />
              <input type="email" placeholder="E-mail comercial" className="input input-bordered w-full bg-white/20" />
              <input type="tel" placeholder="WhatsApp com DDD" className="input input-bordered w-full bg-white/20" />
              <select className="select select-bordered w-full bg-white/20">
                <option disabled selected>Tipo de estabelecimento</option>
                <option>Restaurante</option>
                <option>Lanchonete</option>
                <option>Pizzaria</option>
                <option>Doceria</option>
                <option>Outro</option>
              </select>
              <button className="btn btn-primary btn-lg w-full">
                Criar Minha Conta Grátis
              </button>
            </div>
            <p className="text-sm mt-4">Sem cartão de crédito. Teste por 14 dias.</p>
          </div>

          {/* FAQ Rápido */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Perguntas Frequentes</h3>
            <div className="max-w-2xl mx-auto">
              <div className="collapse collapse-arrow bg-white/10 mb-3">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  Como faço para começar?
                </div>
                <div className="collapse-content"> 
                  <p>Basta preencher o formulário acima e você receberá acesso ao painel administrativo. Nossa equipe entrará em contato para ajudar na configuração da sua loja.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Características extras */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-8 h-8" />
              </div>
              <p className="font-semibold">Rápida Configuração</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8" />
              </div>
              <p className="font-semibold">Sem Comissões</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8" />
              </div>
              <p className="font-semibold">Clientes Locais</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="font-semibold">Suporte Premium</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}