'use client'

import { useAddAddress, useAddress } from '@/hooks/use-api'
import type { Address, FlyFoodValidationError } from '@/service/flyfood-api/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { useViaCEP } from '@/hooks/use-viacep'
import { useToast } from '@/hooks/use-toast'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Home, Building2, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
// import { IMaskInput } from 'react-imask'

const addressTypes = [
  { id: 'home', label: 'Casa', icon: Home },
  { id: 'work', label: 'Trabalho', icon: Building2 },
  { id: 'other', label: 'Outro', icon: MapPin },
] as const

export const FormAddAddress = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [addressType, setAddressType] = useState<typeof addressTypes[number]['id']>('home')

  if (!session) {
    redirect('/')
  }

  const { setSelectedAddress } = useAddress()
  const { mutate: addAddress, isPending } = useAddAddress()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    trigger,
    clearErrors,
    reset,
    formState: { errors, isValid }
  } = useForm<Address>({
    mode: 'onChange'
  })

  const postalCode = watch('postalCode')
  const { addressCEP, isLoading: isLoadingCEP } = useViaCEP(postalCode)
  const { toast } = useToast()

  const handleAddAddress = handleSubmit(async (newAddress: Address) => {
    clearErrors()
    addAddress(
      { ...newAddress },
      {
        onSuccess: () => {
          setSelectedAddress(newAddress)
          toast({
            title: 'Endereço salvo!',
            description: 'O seu novo endereço foi salvo com sucesso.',
            variant: 'default'
          })
          reset()
          setOpen(false)
        },
        onError: (error) => {
          try {
            const err = JSON.parse(error.message) as FlyFoodValidationError
            if (err.details && err.details.length !== 0) {
              for (const key of err.details) {
                setError(key.field.toLowerCase() as keyof Address, {
                  type: 'onChange',
                  message: key.message
                })
              }
            } else {
              toast({
                title: 'Erro ao salvar novo endereço',
                description: err.error,
                variant: 'destructive'
              })
            }
          } catch (e) {
            console.error('Erro ao salvar novo endereço', e)
            toast({
              title: 'Erro ao salvar novo endereço',
              description:
                'Não foi possível salvar novo endereço. Tente novamente mais tarde.',
              variant: 'destructive'
            })
          }
        }
      }
    )
  })

  const handleGetCEP = async () => {
    const isValid = await trigger('postalCode')
    if (!isValid) return
  }

  useEffect(() => {
    if (addressCEP) {
      setValue('addressLine1', addressCEP.logradouro || '')
      setValue('neighborhood', addressCEP.bairro || '')
      setValue('city', addressCEP.localidade || '')
      setValue('state', addressCEP.uf || '')
      setValue('country', 'Brasil')
    }
  }, [addressCEP, setValue])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Adicionar novo endereço</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Adicionar Novo Endereço
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do seu novo endereço de entrega
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddAddress} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Tipo do endereço</CardTitle>
              <CardDescription>Selecione o tipo do seu endereço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {addressTypes.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    type="button"
                    variant="outline"
                    className={cn(
                      "flex-1 flex-col h-auto gap-2 py-4",
                      addressType === id && "border-red-500 bg-red-50"
                    )}
                    onClick={() => setAddressType(id)}
                  >
                    <Icon className={cn(
                      "h-5 w-5",
                      addressType === id ? "text-red-500" : "text-gray-500"
                    )} />
                    <span>{label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="cep" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cep">Buscar por CEP</TabsTrigger>
              <TabsTrigger value="manual">Preenchimento manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cep" className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="postalCode">CEP</Label>
                  <Input
                    id="postalCode"
                    // mask="00000-000"
                    {...register('postalCode', {
                      required: 'Este campo é obrigatório',
                      pattern: {
                        value: /^\d{5}-\d{3}$/,
                        message: 'CEP inválido'
                      }
                    })}
                    placeholder="00000-000"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    // onAccept={(value) => setValue('postalCode', value)}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
                <div className="flex items-end">
                  <Button 
                    type="button" 
                    onClick={handleGetCEP}
                    disabled={isLoadingCEP}
                  >
                    {isLoadingCEP ? 'Buscando...' : 'Buscar CEP'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do endereço</Label>
                <Input
                  id="name"
                  placeholder="Ex: Minha Casa"
                  {...register('name', { required: 'Este campo é obrigatório' })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Número/Complemento</Label>
                <Input
                  id="addressLine2"
                  placeholder="Ex: 123 Apto 101"
                  {...register('addressLine2')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine1">Endereço</Label>
              <Input
                id="addressLine1"
                placeholder="Ex: Rua Example"
                {...register('addressLine1', { required: 'Este campo é obrigatório' })}
              />
              {errors.addressLine1 && (
                <p className="text-red-500 text-sm">{errors.addressLine1.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  placeholder="Ex: Centro"
                  {...register('neighborhood', { required: 'Este campo é obrigatório' })}
                />
                {errors.neighborhood && (
                  <p className="text-red-500 text-sm">{errors.neighborhood.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Ex: São Paulo"
                  {...register('city', { required: 'Este campo é obrigatório' })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  placeholder="Ex: SP"
                  {...register('state', { required: 'Este campo é obrigatório' })}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  placeholder="Ex: Brasil"
                  defaultValue="Brasil"
                  {...register('country', { required: 'Este campo é obrigatório' })}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country.message}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                setOpen(false)
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || !isValid}>
              {isPending ? 'Salvando...' : 'Salvar endereço'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

