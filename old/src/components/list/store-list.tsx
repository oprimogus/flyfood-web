'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { StoreIcon, Star, Search, X, SlidersHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAddress, useStoreList } from '@/hooks/use-api'
import type { Session } from 'next-auth'
import { GetStoresByFilterInput, StoreType } from '@/service/flyfood-api/types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const badgeType: Record<StoreType, string> = {
  RESTAURANT: 'Restaurante',
  MARKET: 'Mercado',
  PHARMACY: 'Farmácia',
  CONVENIENCE: 'Conveniência',
  PUB: 'Bar',
  TOBBACO: 'Tabacaria'
}

export default function StoreList({ session }: { session: Session }) {
  const { selectedAddress } = useAddress(session)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const { register, watch, setValue, handleSubmit, reset } = useForm<GetStoresByFilterInput>({
    defaultValues: {
      name: '',
      city: selectedAddress?.city || '',
      type: undefined,
      isOpen: undefined,
      score: 0,
      page: 1,
      maxItems: 10
    }
  })

  const formValues = watch()

  const { storeList, isError, isLoading, refetch } = useStoreList(session, formValues)

  useEffect(() => {
    if (selectedAddress?.city) {
      setValue('city', selectedAddress.city)
    }
  }, [selectedAddress?.city, setValue])

  const onSubmit = (data: GetStoresByFilterInput) => {
    setIsFiltersOpen(false)
    refetch()
  }

  const handleReset = () => {
    reset({
      name: '',
      city: selectedAddress?.city || '',
      type: undefined,
      isOpen: undefined,
      score: 0,
      page: 1,
      maxItems: 10
    })
  }

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <p className='text-red-500 text-xl'>Erro ao carregar os dados.</p>
          <Button
            variant="destructive"
            onClick={() => refetch()}
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  const activeFiltersCount = [
    formValues.name,
    formValues.type,
    formValues.isOpen,
    formValues.score && formValues.score > 0
  ].filter(Boolean).length

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold text-center my-8'>
        Lojas disponíveis em {selectedAddress?.city}
      </h1>

      {/* Mobile Filters Button */}
      <div className='lg:hidden max-w-4xl mx-auto px-4 mb-4'>
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bg-background hover:bg-accent">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-muted text-muted-foreground">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-lg border-r">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <FilterForm
              formValues={formValues}
              register={register}
              setValue={setValue}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              handleReset={handleReset}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className='max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8'>
        {/* Desktop Filters */}
        <div className='hidden lg:block w-64 space-y-6'>
          <Card className="p-4 border bg-card text-card-foreground">
            <CardContent className="p-0">
              <FilterForm
                formValues={formValues}
                register={register}
                setValue={setValue}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                handleReset={handleReset}
              />
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className='flex-1'>
          {/* No results */}
          {storeList?.ok && storeList.value.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-gray-500'>Nenhuma loja encontrada com os filtros selecionados.</p>
            </div>
          )}

          {/* Store List */}
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
            {storeList?.ok &&
              storeList?.value.map((store) => (
                <Link
                  href={`/restaurants/${store.id}`}
                  key={store.id}
                  className='block'
                >
                  <Card className='h-full transition-all duration-200 hover:shadow-xl border bg-card text-card-foreground'>
                    <CardContent className='p-4'>
                      <div className='flex flex-row items-center text-center space-y-4'>
                        <Avatar className='w-20 h-20 sm:w-24 sm:h-24 border-2 border-white'>
                          <AvatarImage
                            src={store.profileImage ?? ''}
                            alt={store.name}
                          />
                          <AvatarFallback className='text-lg'>
                            <div className='w-full h-full bg-gradient-to-r from-red-200 to-red-500 flex items-center justify-center'>
                              <StoreIcon className='w-14 h-14 text-white' />
                            </div>
                          </AvatarFallback>
                        </Avatar>

                        <div className='flex flex-col items-center space-y-2 w-full'>
                          <h2 className='text-lg font-medium line-clamp-2'>
                            {store.name}
                          </h2>
                          <div className='flex flex-col items-center space-y-1'>
                            <div className='flex items-center space-x-1'>
                              <Star size={18} color='#fcbb00' fill='#fcbb00' />
                              <p className='text-[#fcbb00] font-medium'>
                                {(store.score / 100).toFixed(1)}
                              </p>
                              <span className='text-sm text-muted-foreground'>
                                - {badgeType[store.type]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface FilterFormProps {
  formValues: GetStoresByFilterInput
  register: any
  setValue: any
  handleSubmit: any
  onSubmit: (data: GetStoresByFilterInput) => void
  handleReset: () => void
}

function FilterForm({ formValues, register, setValue, handleSubmit, onSubmit, handleReset }: FilterFormProps) {
  const getScoreLabel = (type?: StoreType) => {
    switch (type) {
      case 'RESTAURANT':
      case 'PUB':
        return 'Avaliação da comida'
      case 'MARKET':
      case 'PHARMACY':
      case 'CONVENIENCE':
      case 'TOBBACO':
        return 'Avaliação do atendimento'
      default:
        return 'Avaliação mínima'
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label>Nome</Label>
          <Input
            placeholder="Buscar por nome..."
            {...register('name')}
            className="w-full bg-background text-foreground"
          />
        </div>

        <div className='space-y-2'>
          <Label>Tipo</Label>
          <Select
            value={formValues.type}
            onValueChange={(value: string) => {
              setValue('type', value === 'ALL' ? undefined : value as StoreType)
            }}
          >
            <SelectTrigger className="w-full bg-background text-foreground">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="ALL">Todos</SelectItem>
              {Object.entries(badgeType).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>{getScoreLabel(formValues.type)}</Label>
          <div className='pt-2'>
            <Slider
              value={[formValues.score || 0]}
              onValueChange={([value]) => {
                setValue('score', value)
              }}
              max={5}
              step={0.5}
              className="w-full bg-yellow-400"
            />
            <div className='mt-1 text-sm text-muted-foreground'>
              {formValues.score || 0} estrelas ou mais
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
          <Switch
            id="open-filter"
            checked={formValues.isOpen}
            onCheckedChange={(checked) => {
              setValue('isOpen', checked)
            }}
          />
          <Label htmlFor="open-filter">Aberto agora</Label>
        </div>
      </div>

      <div className='space-y-2'>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="w-full bg-background hover:bg-accent"
        >
          <X className="w-4 h-4 mr-2" />
          Limpar Filtros
        </Button>
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
      </div>
    </form>
  )
}

