import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Utensils, Clock, TrendingUp } from 'lucide-react';
import Header from '@/components/header/header-home';
import LoggedHeader from '@/components/header/logged-header';
import { auth } from './auth';

export default async function Root() {
  const session = await auth()

  return (
    <main className="min-h-screen bg-white">
      {session?.user ? <LoggedHeader session={session} /> : <Header />}
      
      {/* Seção Hero */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">
              Expanda seu Negócio com Pedidos Online
            </h1>
            <p className="text-xl text-gray-600">
              Entre para o FlyFood e conecte-se com clientes em busca de experiências gastronômicas incríveis.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Começar Agora
              </Button>
              <Button size="lg" variant="outline">
                Saiba Mais
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img 
              src="/api/placeholder/600/400" 
              alt="Preview do painel de controle" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher o FlyFood?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <TrendingUp className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Crescimento Garantido</h3>
                <p className="text-gray-600">
                  Alcance mais clientes e aumente seu faturamento com nossa plataforma
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Clock className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão Simplificada</h3>
                <p className="text-gray-600">
                  Painel intuitivo para gerenciar pedidos e cardápio
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Utensils className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cardápio Personalizado</h3>
                <p className="text-gray-600">
                  Apresente seus pratos com fotos e descrições atraentes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Planos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Escolha seu Plano
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Pequenos Negócios</h3>
                <p className="text-3xl font-bold mb-4">R$ 149<span className="text-lg text-gray-600">/mês</span></p>
                <ul className="space-y-3">
                  {['Até 100 pedidos/mês', 'Análises básicas', 'Suporte por email'].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">Começar</Button>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm">
                  Mais Popular
                </span>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Médios Negócios</h3>
                <p className="text-3xl font-bold mb-4">R$ 399<span className="text-lg text-gray-600">/mês</span></p>
                <ul className="space-y-3">
                  {['Até 500 pedidos/mês', 'Análises avançadas', 'Suporte 24/7', 'Marca personalizada'].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-red-600">Começar</Button>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Empresarial</h3>
                <p className="text-3xl font-bold mb-4">R$ 999<span className="text-lg text-gray-600">/mês</span></p>
                <ul className="space-y-3">
                  {['Pedidos ilimitados', 'Análises personalizadas', 'Suporte prioritário', 'Acesso à API', 'Múltiplas unidades'].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">Começar</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção CTA */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para fazer seu restaurante crescer?
          </h2>
          <p className="text-xl mb-8">
            Junte-se a milhares de restaurantes de sucesso que já usam o FlyFood
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
            Comece Seu Período Gratuito
          </Button>
        </div>
      </section>
    </main>
  );
}