'use client'
import { useAddAddress, useAddress } from '@/hooks/use-api'
import { Address, FlyFoodValidationError } from '@/service/flyfood-api/types'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { Label } from '../ui/label'
import { useViaCEP } from '@/hooks/use-viacep'
import { useToast } from '@/hooks/use-toast'

export const FormAddAddress = () => {
    const { data: session } = useSession()
    if (!session) {
        redirect('/')
    }

    const { setSelectedAddress } = useAddress(session)
    const { mutate: addAddress, isPending } = useAddAddress(session)
    const { register, handleSubmit, setValue, setError, watch, trigger, clearErrors, reset, formState: { errors } } = useForm<Address>()
    const postalCode = watch("postalCode")
    const { addressCEP } = useViaCEP(postalCode)
    const { toast } = useToast()

    const handleAddAddress = handleSubmit(async (newAddress: Address) => {
        clearErrors()
        addAddress(newAddress, {
            onSuccess: () => {
                setSelectedAddress(newAddress);
                toast({
                    title: "Endereço salvo!",
                    description: "O seu novo endereço foi salvo com sucesso.",
                    variant: "default",
                })
                reset()
            },
            onError: (error) => {
                try {
                    const err = JSON.parse(error.message) as FlyFoodValidationError
                    if (err.details && err.details.length !== 0) {
                        for (const key of err.details) {
                            setError(key.field.toLowerCase() as keyof Address, {
                                type: "manual",
                                message: key.message,
                            })
                        }
                    } else {
                        toast({
                            title: "Erro ao salvar novo endereço",
                            description: err.error,
                            variant: "destructive",
                        })
                    }

                } catch (e) {
                    console.error("Erro ao salvar novo endereço", e)
                    toast({
                        title: "Erro ao salvar novo endereço",
                        description: "Não foi possível salvar novo endereço. Tente novamente mais tarde.",
                        variant: "destructive",
                    })
                } 
            },
        })
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
        <Dialog>
            <DialogTrigger asChild>
                <Button>Adicionar novo endereço</Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-h-[75vh] p-4">
                <DialogDescription></DialogDescription>
                <DialogHeader>
                    <DialogTitle className='text-center'>Adicionar Novo Endereço</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[50vh]"> {/* Contêiner de rolagem */}
                    <form onSubmit={handleAddAddress} className="space-y-4">
                        <div>
                            <Label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">CEP</Label>
                            <div className='flex flex-row justify-center items-center'>
                                <Input
                                    id="postalCode"
                                    type="text"
                                    placeholder="00000-000"
                                    {...register('postalCode', {
                                        required: 'Este campo é obrigatório',
                                        pattern: {
                                            value: /^\d{5}-\d{3}$/,
                                            message: 'CEP inválido'
                                        }
                                    })}
                                    className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                />
                                <Button type='button' onClick={handleGetCEP}>Buscar CEP</Button>
                            </div>
                            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="addressName" className="block text-sm font-medium text-gray-700">Nome do endereço</Label>
                            <Input
                                id="addressName"
                                type="text"
                                placeholder="Casa, Trabalho, etc."
                                {...register('name', { required: 'Este campo é obrigatório' })}
                                className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Endereço</Label>
                            <Input
                                id="addressLine1"
                                type="text"
                                placeholder="Rua Exemplo"
                                {...register('addressLine1', { required: 'Este campo é obrigatório' })}
                                className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Complemento</Label>
                            <Input
                                id="addressLine2"
                                type="text"
                                placeholder="330 Apartamento 101"
                                {...register('addressLine2')}
                                className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <Label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</Label>
                            <Input
                                id="neighborhood"
                                type="text"
                                placeholder="Centro"
                                {...register('neighborhood', { required: 'Este campo é obrigatório' })}
                                className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</Label>
                            <Input
                                id="city"
                                type="text"
                                placeholder="São Paulo"
                                {...register('city', { required: 'Este campo é obrigatório' })}
                                className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</Label>
                            <Input
                                id="state"
                                type="text"
                                placeholder="SP"
                                {...register('state', { required: 'Este campo é obrigatório' })}
                                className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="country" className="block text-sm font-medium text-gray-700">País</Label>
                            <Input
                                id="country"
                                type="text"
                                placeholder="Brasil"
                                {...register('country', { required: 'Este campo é obrigatório' })}
                                className="mt-1 block w-full placeholder:text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="secondary" onClick={() => reset()}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </div>
                    </form>
                </div> {/* Contêiner com rolagem */}
            </DialogContent>
        </Dialog>

    )
}