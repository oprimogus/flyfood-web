<script setup lang="ts">
import {
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  BarChart3,
  Settings,
  MapPin,
  Search,
  Shield,
  Star,
  Users,
  Smartphone,
  DollarSign
} from 'lucide-vue-next'

const beneficios = [
  {
    icon: DollarSign,
    titulo: 'Zero Comissões',
    desc: 'Esqueça taxas de até 30%. Aqui você paga apenas uma assinatura fixa mensal.'
  },
  {
    icon: BarChart3,
    titulo: 'Mais Lucro',
    desc: 'Receba pagamentos diretamente dos clientes sem intermediários.'
  },
  {
    icon: Users,
    titulo: 'Novos Clientes',
    desc: 'Seja descoberto por clientes da sua região que buscam opções de delivery.'
  }
]

const comoFunciona = [
  {
    icon: Search,
    title: '1. Crie sua Loja',
    desc: 'Cadastre-se gratuitamente e configure seu perfil em minutos.'
  },
  {
    icon: Settings,
    title: '2. Adicione Produtos ou Serviços',
    desc: 'Defina produtos e/ou serviços que você oferece.'
  },
  {
    icon: Smartphone,
    title: '3. Comece a Vender',
    desc: 'Receba pedidos diretamente no seu celular ou computador.'
  },
  {
    icon: CreditCard,
    title: '4. Receba Pagamentos',
    desc: 'Aceite Pix, cartão ou dinheiro sem intermediários.'
  }
]

const vantagens = [
  {
    icon: Shield,
    titulo: 'Sem Taxas por Pedido',
    desc: 'Apenas assinatura fixa, sem surpresas ou comissões abusivas'
  },
  {
    icon: Clock,
    titulo: 'Gestão Simplificada',
    desc: 'Painel administrativo intuitivo para gerenciar todos seus pedidos'
  },
  {
    icon: CheckCircle,
    titulo: 'Suporte Dedicado',
    desc: 'Equipe pronta para ajudar em todas as etapas da sua operação'
  }
]

const depoimentos = [
  {
    nome: 'Carlos Mendes',
    negocio: 'Pizzaria Bella Napoli',
    cidade: 'São Paulo, SP',
    texto:
      'Depois de usar outros apps de delivery, mudei para o FlyFood e minha margem de lucro aumentou 25%. A assinatura fixa vale muito a pena!',
    estrelas: 5
  },
  {
    nome: 'Amanda Costa',
    negocio: 'Sushi Express',
    cidade: 'Rio de Janeiro, RJ',
    texto:
      'Plataforma simples de usar e sem aquelas taxas absurdas. Em 3 meses, já recuperei o investimento da assinatura.',
    estrelas: 5
  },
  {
    nome: 'Roberto Almeida',
    negocio: 'Burger House',
    cidade: 'Belo Horizonte, MG',
    texto:
      'O suporte ao cliente é excelente e a possibilidade de receber pagamentos diretos melhorou meu fluxo de caixa.',
    estrelas: 4
  }
]

const planos = [
  {
    nome: 'Iniciante',
    preco: '69,90',
    periodo: '/mês',
    popular: false,
    recursos: [
      'Até 50 produtos no catálogo',
      'Processamento de pedidos ilimitados',
      'Painel administrativo básico',
      'Suporte por e-mail'
    ]
  },
  {
    nome: 'Profissional',
    preco: '129,90',
    periodo: '/mês',
    popular: true,
    recursos: [
      'Até 200 produtos no catálogo',
      'Processamento de pedidos ilimitados',
      'Painel administrativo completo',
      'Relatórios de vendas avançados',
      'Suporte prioritário'
    ]
  },
  {
    nome: 'Empresarial',
    preco: '199,90',
    periodo: '/mês',
    popular: false,
    recursos: [
      'Produtos ilimitados no catálogo',
      'Múltiplas lojas/filiais',
      'Painel administrativo completo',
      'Relatórios personalizados',
      'Suporte VIP 24/7'
    ]
  }
]
</script>

<template>
<main class='flex flex-col min-h-screen bg-base-100 text-base-content overflow-x-hidden'>
  <NavHome />

  <!-- Hero Section - Primeira visualização -->
  <section class='relative min-h-screen flex items-center justify-center'>
     <!-- Background com overlay -->
    <div class='absolute inset-0 z-0'>
      <div class='absolute inset-0 bg-cover bg-center' />
      <div class='absolute inset-0 bg-primary' />
    </div>

    <!-- Conteúdo -->
    <div class='container mx-auto px-4 md:px-6 z-10 py-16 md:py-8 flex flex-col justify-center h-full'>
      <div class='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
        <div class='text-white'>
          <span class='inline-block bg-accent text-accent-content px-4 py-1 rounded-full text-sm font-medium mb-6'>
            Para Donos de Negócios
          </span>
          <h1 class='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
            Delivery <span class='text-accent'>Sem Comissões</span> para
            o seu Negócio
          </h1>
          <p class='text-lg md:text-xl opacity-90 mb-8'>
            Aumente seu lucro com uma plataforma que não cobra porcentagem
            sobre suas vendas, apenas uma assinatura fixa mensal.
          </p>

          <!-- Call to Action -->
          <div class='flex flex-col sm:flex-row gap-4'>
            <button
              type='button'
              class='btn btn-accent btn-lg text-accent-content'
            >
              Cadastrar meu negócio <ArrowRight class='ml-2 w-5 h-5' />
            </button>
            <a href='#como-funciona' class='inline-block'>
              <button
                type='button'
                class='btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary w-full'
              >
                Como Funciona <ArrowRight class='ml-2 w-5 h-5' />
              </button>
            </a>
          </div>

          <!-- Estatísticas rápidas -->
          <div class='mt-8 md:mt-12 flex flex-wrap gap-8'>
            <div>
              <p class='text-3xl font-bold text-accent'>+1500</p>
              <p class='text-white/80'>Restaurantes parceiros</p>
            </div>
            <div>
              <p class='text-3xl font-bold text-accent'>+30%</p>
              <p class='text-white/80'>Aumento médio em lucro</p>
            </div>
            <div>
              <p class='text-3xl font-bold text-accent'>0%</p>
              <p class='text-white/80'>Comissão sobre vendas</p>
            </div>
          </div>
        </div>

        <!-- Área para imagem ou formulário na versão desktop -->
        <div class='hidden lg:flex items-center justify-center'>
          <div class='bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-2xl w-full max-w-md'>
            <h3 class='text-white text-xl font-bold text-center mb-6'>
              Comece grátis por 14 dias
            </h3>
            <div class='space-y-4'>
              <input
                type='text'
                placeholder='Nome do seu estabelecimento'
                class='input input-bordered w-full'
              />
              <input
                type='email'
                placeholder='Seu melhor e-mail'
                class='input input-bordered w-full'
              />
              <input
                type='tel'
                placeholder='Telefone com WhatsApp'
                class='input input-bordered w-full'
              />
              <button
                type='button'
                class='btn btn-accent w-full text-accent-content'
              >
                Testar Grátis por 14 Dias
              </button>
            </div>
            <p class='text-white/70 text-xs mt-4 text-center'>
              Sem compromisso. Cancele quando quiser.
            </p>
          </div>
        </div>
      </div>

      <!-- Indicador de scroll -->
      <div class='absolute bottom-8 left-0 right-0 flex justify-center animate-bounce'>
        <a href='#beneficios' class='text-white/80 hover:text-white'>
          <ArrowRight class='w-6 h-6 rotate-90' />
        </a>
      </div>
    </div>
  </section>

  <!-- Benefícios - Segunda visualização -->
  <section
    id='beneficios'
    class='min-h-screen py-16 bg-base-200 flex items-center'
  >
    <div class='container mx-auto px-4 md:px-6'>
      <div class='text-center mb-12'>
        <span class='bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium'>
          Benefícios Exclusivos
        </span>
        <h2 class='text-3xl md:text-4xl font-bold mt-4'>
          Por que vender no FlyFood?
        </h2>
        <p class='text-base-content/70 mt-3 max-w-xl mx-auto'>
          Nossa plataforma foi pensada para aumentar a rentabilidade do seu
          negócio
        </p>
      </div>

      <div class='grid md:grid-cols-3 gap-8 md:gap-12'>
          <div
            v-for="item in beneficios"
            :key=item.titulo
            class='card bg-base-100 shadow-xl border border-base-300 hover:shadow-lg transition-duration-300'
          >
            <div class='card-body items-center text-center'>
              <component :is="item.icon" class="w-10 h-10 text-primary mb-4" />
              <h3 class='card-title text-2xl font-bold'>
                {{ item.titulo }}
              </h3>
              <p class='text-base-content/70'>{{ item.desc }}</p>
            </div>
          </div>
      </div>

      <!-- Comparativo com concorrência -->
      <div class='mt-16 bg-base-100 p-8 rounded-xl shadow-xl'>
        <h3 class='text-2xl font-bold text-center mb-8'>
          Como nos comparamos com outros apps:
        </h3>

        <div class='overflow-x-auto'>
          <table class='table w-full'>
            <thead>
              <tr>
                <th class='bg-base-200'>Características</th>
                <th class='bg-primary/10 text-primary text-center'>
                  FlyFood
                </th>
                <th class='bg-base-200 text-center'>
                  Apps Tradicionais
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class='font-medium'>Modelo de cobrança</td>
                <td class='text-center bg-primary/5'>
                  <span class='flex items-center justify-center gap-2'>
                    <CheckCircle class='w-5 h-5 text-accent' />{' '}
                    Assinatura fixa
                  </span>
                </td>
                <td class='text-center'>
                  <span class='text-error'>Comissão de 15-30%</span>
                </td>
              </tr>
              <tr>
                <td class='font-medium'>Recebimento dos pagamentos</td>
                <td class='text-center bg-primary/5'>
                  <span class='flex items-center justify-center gap-2'>
                    <CheckCircle class='w-5 h-5 text-accent' /> Direto e
                    imediato
                  </span>
                </td>
                <td class='text-center'>
                  <span class='text-error'>7-14 dias após a venda</span>
                </td>
              </tr>
              <tr>
                <td class='font-medium'>Autonomia no preço</td>
                <td class='text-center bg-primary/5'>
                  <span class='flex items-center justify-center gap-2'>
                    <CheckCircle class='w-5 h-5 text-accent' /> Controle
                    total
                  </span>
                </td>
                <td class='text-center'>
                  <span class='text-error'>Pressão para descontos</span>
                </td>
              </tr>
              <tr>
                <td class='font-medium'>Taxas de entrega</td>
                <td class='text-center bg-primary/5'>
                  <span class='flex items-center justify-center gap-2'>
                    <CheckCircle class='w-5 h-5 text-accent' /> Você
                    define
                  </span>
                </td>
                <td class='text-center'>
                  <span class='text-error'>Controlada pelo app</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Indicador de scroll -->
      <div class='flex justify-center mt-16'>
        <a
          href='#como-funciona'
          class='text-base-content/60 hover:text-base-content'
        >
          <ArrowRight class='w-6 h-6 rotate-90' />
        </a>
      </div>
    </div>
  </section>

  <!-- Como Funciona - Terceira visualização -->
  <section
    id='como-funciona'
    class='min-h-screen py-16 bg-base-100 flex items-center'
  >
    <div class='container mx-auto px-4 md:px-6'>
      <div class='text-center mb-12'>
        <span class='bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium'>
          É simples começar
        </span>
        <h2 class='text-3xl md:text-4xl font-bold mt-4'>
          Como Funciona?
        </h2>
        <p class='mt-4 text-lg text-base-content/70 max-w-2xl mx-auto'>
          Em apenas 4 passos rápidos você terá sua loja online funcionando
        </p>
      </div>

      <div class='grid md:grid-cols-4 gap-8 relative'>
        <!-- Linha conectora (visível apenas em desktop) -->
        <div class='hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-base-300 z-0' />
        <div
          v-for="item in comoFunciona"
          :key="item.title"
          class='card bg-base-100 shadow-xl border border-base-300 z-10'
        >
          <div class='card-body items-center text-center'>
            <component :is="item.icon"/>
            <h3 class='card-title text-xl font-bold'>{{ item.title }}</h3>
            <p class='text-base-content/70'>{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <div class='mt-12 text-center'>
        <button type='button' class='btn btn-primary'>
          Cadastrar Agora <ArrowRight class='ml-2 w-5 h-5' />
        </button>
      </div>

      <!-- Indicador de scroll -->
      <div class='flex justify-center mt-16'>
        <a
          href='#vantagens'
          class='text-base-content/60 hover:text-base-content'
        >
          <ArrowRight class='w-6 h-6 rotate-90' />
        </a>
      </div>
    </div>
  </section>

  <!-- Vantagens - Quarta visualização -->
  <section
    id='vantagens'
    class='min-h-screen py-16 bg-primary text-white flex items-center'
  >
    <div class='container mx-auto px-4 md:px-6'>
      <div class='text-center mb-12'>
        <span class='bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium'>
          Vantagens FlyFood
        </span>
        <h2 class='text-3xl md:text-4xl font-bold mt-4'>
          Tudo que seu negócio precisa
        </h2>
      </div>

      <div class='grid md:grid-cols-3 gap-8 md:gap-12'>
          <div
            v-for="vantagem in vantagens"
            :key="vantagem.titulo"
            class='flex flex-col items-center text-center p-6 bg-primary-focus/20 rounded-xl backdrop-blur-sm'
          >
            <div class='bg-white/10 p-4 rounded-full mb-4'>
                <component :is="vantagem.icon"/>
            </div>
            <h3 class='text-xl font-semibold mb-2'>
              {{ vantagem.titulo }}
            </h3>
            <p class='text-white/80'>{{ vantagem.desc }}</p>
          </div>
      </div>

      <div class='mt-16 text-center'>
        <h3 class='text-2xl font-bold mb-6'>
          Recursos inclusos em todos os planos:
        </h3>
        <div class='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div
                v-for="recurso in [
                  'Painel administrativo',
                  'Relatórios de vendas',
                  'Cadastro de produtos',
                  'Controle de pedidos',
                  'Notificações em tempo real',
                  'Avaliações de clientes',
                  'Suporte técnico',
                  'Marketplace local'
                ]"
                :key="recurso"
                class='flex items-center gap-2'>
                <CheckCircle class='w-5 h-5 text-accent' />
                <span>{{ recurso }}</span>
            </div>
        </div>
      </div>

      <!-- Indicador de scroll -->
      <div class='flex justify-center mt-16'>
        <a href='#depoimentos' class='text-white/60 hover:text-white'>
          <ArrowRight class='w-6 h-6 rotate-90' />
        </a>
      </div>
    </div>
  </section>

  <!-- Depoimentos - Quinta visualização -->
  <section
    id='depoimentos'
    className='min-h-screen py-16 bg-base-200 flex items-center'
  >
    <div className='container mx-auto px-4 md:px-6'>
      <div className='text-center mb-12'>
        <span className='bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium'>
          O que dizem nossos parceiros
        </span>
        <h2 className='text-3xl md:text-4xl font-bold mt-4'>
          Histórias de Sucesso
        </h2>
      </div>

      <!-- Estatística de satisfação -->
      <div className='flex flex-col items-center gap-4 mb-12'>
        <div className='relative w-64 h-4 bg-base-300 rounded-full overflow-hidden'>
            <progress class="progress progress-primary" value="95" max="100"></progress>
        </div>
        <span className='text-lg font-medium'>
          95% dos restaurantes parceiros renovam a assinatura
        </span>
      </div>

      <!-- Grid de depoimentos -->
      <div className='grid md:grid-cols-3 gap-6'>
          <div
            v-for="depoimento in depoimentos"
            :key="depoimento.nome"
            className='bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'
          >
              <div className='flex gap-1'>
                <div
                    v-for="i in 5"
                    :key="i"
                  >
                      <Star
                      class="w-4 h-4"
                      :class="i <= depoimento.estrelas ? 'text-accent fill-accent' : 'text-base-300'"
                      />
                </div>
              </div>
              <p className='mt-4 mb-4 italic'>
                &quot;{{ depoimento.texto }}&quot;
              </p>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold'>
                  &quot;{{ depoimento.nome.charAt(0) }}&quot;
                </div>
                <div>
                  <p className='font-medium'>{{ depoimento.nome }}</p>
                  <p className='text-sm text-base-content/70'>
                    {{ depoimento.negocio }}
                  </p>
                  <p className='text-xs text-base-content/70 flex items-center'>
                    <MapPin className='w-3 h-3 mr-1' /> {{ depoimento.cidade }}
                  </p>
                </div>
              </div>
          </div>
      </div>

      <!-- Indicador de scroll -->
      <div className='flex justify-center mt-16'>
        <a
          href='#planos'
          className='text-base-content/60 hover:text-base-content'
        >
          <ArrowRight className='w-6 h-6 rotate-90' />
        </a>
      </div>
    </div>
  </section>

  <!--Planos - Sexta visualização -->
  <section
    id='planos'
    class='min-h-screen py-16 bg-base-100 flex items-center'
  >
    <div class='container mx-auto px-4 md:px-6'>
      <div class='text-center mb-12'>
        <span class='bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium'>
          Investimento acessível
        </span>
        <h2 class='text-3xl md:text-4xl font-bold mt-4'>
          Nossos Planos
        </h2>
        <p class='mt-4 text-lg text-base-content/70 max-w-2xl mx-auto'>
          Escolha o plano ideal para o tamanho do seu negócio
        </p>
      </div>

      <div class='grid md:grid-cols-3 gap-8'>
          <div
            v-for="plano in planos"
            :key="plano.nome"
            class="card shadow-xl border relative"
            :class="plano.popular ? 'bg-primary text-white border-accent' : 'bg-base-100 border-base-300'"
          >
              <div v-if="plano.popular"
                class='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-content px-4 py-1 rounded-full font-medium'>
                Mais Popular
              </div>
              <div class='card-body'>
                <h3 class='card-title text-2xl font-bold justify-center'>
                  {{ plano.nome }}
                </h3>

                <div class='text-center my-4'>
                  <div class='flex items-center justify-center'>
                    <span class='text-lg'>R$</span>
                    <span class='text-4xl font-bold mx-1'>
                      {{ plano.preco }}
                    </span>
                    <span>{{ plano.periodo }}</span>
                  </div>
                  <p
                    class="text-sm mt-1"
                    :class="plano.popular ? 'text-white/80' : 'text-base-content/70'"
                  >
                    Teste grátis por 14 dias
                  </p>
                </div>

                <div class='divider' />

                <ul class='space-y-3'>
                    <li 
                        v-for="recurso in plano.recursos" 
                        :key="recurso" 
                        class="flex items-start gap-2">
                      <CheckCircle
                      class="w-5 h-5 mt-0.5"
                      :class="plano.popular ? 'text-accent-content' : 'text-accent'"
                      />
                      <span
                          :class="plano.popular ? 'text-white/90' : 'text-base-content/90'"
                      >
                        {{ recurso }}
                      </span>
                    </li>
                </ul>

                <div class='card-actions justify-center mt-6'>
                  <button
                    type='button'
                    class="btn w-full"
                    :class="plano.popular ? 'btn-accent text-accent-content' : 'btn-primary text-white'"
                  >
                    Começar Agora
                  </button>
                </div>
              </div>
          </div
      </div>

      <div class='mt-8 text-center'>
        <p class='text-base-content/70'>
          Todos os planos incluem teste grátis de 14 dias. Cancele a
          qualquer momento.
        </p>
      </div>

      <!--Indicador de scroll -->
      <div class='flex justify-center mt-16'>
        <a
          href='#cta'
          class='text-base-content/60 hover:text-base-content'
        >
          <ArrowRight class='w-6 h-6 rotate-90' />
        </a>
      </div>
    </div>
    </div>
  </section>

  <!--Call to Action - Sétima visualização -->
  <section
    id='cta'
    class='min-h-screen py-16 bg-accent text-accent-content flex items-center justify-center'
  >
    <div class='container mx-auto px-4 md:px-6 text-center'>
      <h2 class='text-3xl md:text-5xl font-bold mb-6'>
        Comece a Vender Online Hoje
      </h2>
      <p class='text-lg max-w-2xl mx-auto mb-10'>
        Junte-se a mais de 1.500 estabelecimentos que já estão aumentando
        suas vendas e lucros com o FlyFood.
      </p>

      <div class='max-w-md mx-auto p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
        <h3 class='text-xl font-bold mb-4'>
          Cadastre-se gratuitamente
        </h3>
        <div class='space-y-4'>
          <input
            type='text'
            placeholder='Nome do estabelecimento'
            class='input input-bordered w-full bg-white/20'
          />
          <input
            type='email'
            placeholder='E-mail comercial'
            class='input input-bordered w-full bg-white/20'
          />
          <input
            type='tel'
            placeholder='WhatsApp com DDD'
            class='input input-bordered w-full bg-white/20'
          />
          <select class='select select-bordered w-full bg-white/20'>
            <option disabled selected>
              Tipo de estabelecimento
            </option>
            <option>Restaurante</option>
            <option>Lanchonete</option>
            <option>Pizzaria</option>
            <option>Doceria</option>
            <option>Outro</option>
          </select>
          <button type='button' class='btn btn-primary btn-lg w-full'>
            Criar Minha Conta Grátis
          </button>
        </div>
        <p class='text-sm mt-4'>
          Sem cartão de crédito. Teste por 14 dias.
        </p>
      </div>

      <!--FAQ Rápido -->
      <div class='mt-16'>
        <h3 class='text-2xl font-bold mb-6'>Perguntas Frequentes</h3>
        <div class='max-w-2xl mx-auto'>
          <div class='collapse collapse-arrow bg-white/10 mb-3'>
            <input type='radio' name='faq-accordion' />
            <div class='collapse-title text-xl font-medium'>
              Como faço para começar?
            </div>
            <div class='collapse-content'>
              <p>
                Basta preencher o formulário acima e você receberá acesso ao
                painel administrativo. Nossa equipe entrará em contato para
                ajudar na configuração da sua loja.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!--Características extras -->
      <div class='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16'>
        <div class='flex flex-col items-center'>
          <div class='bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3'>
            <Clock class='w-8 h-8' />
          </div>
          <p class='font-semibold'>Rápida Configuração</p>
        </div>
        <div class='flex flex-col items-center'>
          <div class='bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3'>
            <Shield class='w-8 h-8' />
          </div>
          <p class='font-semibold'>Sem Comissões</p>
        </div>
        <div class='flex flex-col items-center'>
          <div class='bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3'>
            <MapPin class='w-8 h-8' />
          </div>
          <p class='font-semibold'>Clientes Locais</p>
        </div>
        <div class='flex flex-col items-center'>
          <div class='bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3'>
            <CheckCircle class='w-8 h-8' />
          </div>
          <p class='font-semibold'>Suporte Premium</p>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</main>
</template>
