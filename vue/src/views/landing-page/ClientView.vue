<script lang="ts" setup>
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Star,
  UtensilsCrossed,
  Hammer,
  Wine,
  Scissors,
  Droplet,
  Pill,
} from 'lucide-vue-next'
import NavHome from '@/components/nav/NavHome.vue'
import Footer from '@/components/footer.vue'

const categorias = [
  { nome: 'Restaurantes', icon: UtensilsCrossed, popular: true },
  { nome: 'Serviços', icon: Hammer, popular: true },
  { nome: 'Adegas', icon: Wine, popular: false },
  { nome: 'Barbearias', icon: Scissors, popular: false },
  { nome: 'Água Mineral', icon: Droplet, popular: true },
  { nome: 'Farmácias', icon: Pill, popular: false },
]

const depoimentos = [
  {
    nome: 'Maria Silva',
    cidade: 'São Paulo, SP',
    texto:
      'Consigo pedir meu almoço em menos de 2 minutos e não preciso comprar cupom para pagar o preço normal!',
    estrelas: 5,
  },
  {
    nome: 'João Oliveira',
    cidade: 'Rio de Janeiro, RJ',
    texto: 'Consigo pedir delivery e agendar serviços sem preços abusivos!',
    estrelas: 5,
  },
  {
    nome: 'Ana Paula',
    cidade: 'Belo Horizonte, MG',
    texto:
      'Uso toda semana e nunca tive problemas. Não preciso ligar no restaurante ou pedir pelo whatsapp para pagar mais barato. Super recomendo!',
    estrelas: 4,
  },
]
</script>

<template>
  <main className="flex flex-col min-h-screen bg-base-100 text-base-content overflow-x-hidden">
    <NavHome />

    <!-- Hero -->
    <section class="bg-primary min-h-screen flex items-center justify-center">
      <div
        class="container mx-auto px-4 md:px-6 z-10 py-16 md:py-8 text-center flex flex-col justify-center justify-items-center h-full">
        <div class="text-white">
          <span
            class="inline-block bg-accent text-accent-content px-4 py-1 rounded-full text-sm font-medium mb-6">
            Delivery e serviços sem complicação
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Peça Rápido e
            <span class="text-accent">Sem Taxas</span>
          </h1>
          <p class="text-lg md:text-xl opacity-90 mb-8">
            Descubra restaurantes, lojas, comércios e prestadores de serviços
          </p>
          <p class="text-lg md:text-xl opacity-90 mb-8">Peça pelo celular</p>
          <p class="text-lg md:text-xl opacity-90 mb-8">Sem taxas escondidas, sem complicações.</p>

          <!-- Call to Action -->
          <div class="flex flex-col">
            <div class="flex flex-col sm:flex-row sm:justify-center gap-4">
              <button type="button" class="btn btn-accent btn-lg text-accent-content">
                Pedir agora
                <MapPin class="ml-2 w-5 h-5" />
              </button>
            </div>
            <!-- Estatísticas rápidas -->
            <div class="mt-8 md:mt-12 flex flex-wrap justify-center gap-8">
              <div>
                <p class="text-3xl font-bold text-accent">+500</p>
                <p class="text-white/80">Restaurantes parceiros</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-accent">92%</p>
                <p class="text-white/80">Satisfação</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicador de scroll -->
        <div class="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <a href="#categorias" class="text-white/80 hover:text-white">
            <ArrowRight class="w-6 h-6 rotate-90" />
          </a>
        </div>
      </div>
    </section>

    <!-- Categorias -->
    <section id="categorias" class="min-h-screen py-16 bg-base-200 flex items-center">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-12">
          <span class="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
            Comércio & Serviços
          </span>
          <h2 class="text-3xl md:text-4xl font-bold mt-4">O que você procura hoje?</h2>
          <p class="text-base-content/70 mt-3 max-w-xl mx-auto">
            Encontre uma variedade de estabelecimentos e serviços essenciais para o seu dia a dia
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          <div
            v-for="cat in categorias"
            :key="cat.nome"
            class="bg-base-100 rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div
              v-if="cat.popular"
              class="absolute top-0 right-0 bg-accent text-accent-content text-xs px-2 py-1 rounded-bl-lg font-medium">
              Popular
            </div>
            <div class="bg-base-200 p-3 rounded-full mb-3">
              <component :is="cat.icon" class="w-8 h-8 text-primary" />
            </div>
            <span class="font-semibold">{{ cat.nome }}</span>
          </div>
        </div>

        <!-- Indicador de scroll -->
        <div class="flex justify-center mt-16">
          <a href="#depoimentos" class="text-base-content/60 hover:text-base-content">
            <ArrowRight class="w-6 h-6 rotate-90" />
          </a>
        </div>
      </div>
    </section>

    <!-- Depoimentos - Quinta visualização -->
    <section id="depoimentos" class="min-h-screen py-16 bg-base-200 flex items-center">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-12">
          <span class="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
            O que dizem nossos clientes
          </span>
          <h2 class="text-3xl md:text-4xl font-bold mt-4">Satisfação Garantida</h2>
        </div>

        <!-- Estatística de satisfação -->
        <div class="flex flex-col items-center gap-4 mb-12">
          <div class="relative w-64 h-4 bg-base-300 rounded-full overflow-hidden">
            <progress class="progress progress-primary w-56" value="0" max="100"></progress>
          </div>
          <span class="text-lg font-medium">92% dos usuários recomendam o FlyFood</span>
        </div>

        <!-- Grid de depoimentos -->
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="depoimento in depoimentos"
            :key="depoimento.nome"
            class="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div class="flex gap-1">
              <Star
                v-for="i in 5"
                :key="`${depoimento.nome}-${i}`"
                class="w-4 h-4"
                :class="i <= depoimento.estrelas ? 'text-accent fill-accent' : 'text-base-300'" />
            </div>

            <p class="mt-4 mb-4 italic">“{ depoimento.texto }”</p>

            <div class="flex items-center gap-2">
              <div>
                <p class="font-medium">{ depoimento.nome }</p>
                <p class="text-sm text-base-content/70 flex items-center">
                  <MapPin class="w-3 h-3 mr-1" />
                  { depoimento.cidade }
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicador de scroll -->
        <div class="flex justify-center mt-16">
          <a href="#cta" class="text-base-content/60 hover:text-base-content">
            <ArrowRight class="w-6 h-6 rotate-90" />
          </a>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section
      id="cta"
      class="min-h-screen py-16 bg-accent text-accent-content flex items-center justify-center">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">Experimente Agora</h2>
        <p class="text-lg max-w-2xl mx-auto mb-10">
          Peça delivery e solicite serviços sem pagar taxas extras. Faça seu primeiro pedido hoje e
          descubra por que tantas pessoas escolhem o FlyFood.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <button type="button" class="btn btn-primary btn-lg text-white">
            Ver Lojas Perto de Mim
            <MapPin class="ml-2 w-5 h-5" />
          </button>
        </div>

        <!-- Características extras -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div class="flex flex-col items-center">
            <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <Clock class="w-8 h-8" />
            </div>
            <p class="font-semibold">Rápido</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <Shield class="w-8 h-8" />
            </div>
            <p class="font-semibold">Seguro</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <CheckCircle class="w-8 h-8" />
            </div>
            <p class="font-semibold">Confiável</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>
