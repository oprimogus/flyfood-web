'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Address } from '@/service/flyfood-api/types'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { MapPin, Trash2, CheckCircle2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSession } from 'next-auth/react'
import { memo } from 'react'

interface AddressCardProps {
    address: Address
    isSelected: boolean
    onSelect: (address: Address) => void
    onRemove: (address: Address) => void
}

export const AddressCard = memo(function AddressCard({
    address,
    isSelected,
    onSelect,
    onRemove
}: AddressCardProps) {
    return (
        <TooltipProvider>
            <Card
                role="button"
                tabIndex={0}
                onClick={() => onSelect(address)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        onSelect(address)
                    }
                }}
                className={`relative group transition-all duration-300 cursor-pointer
                    ${isSelected ? 'ring-2 ring-red-400 shadow-lg' : 'hover:shadow-md'}
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2`}
            >
                {isSelected && (
                    <Badge
                        variant="default"
                        className="absolute -top-2 -right-2 bg-red-500"
                    >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Selecionado
                    </Badge>
                )}

                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-full bg-red-100 text-red-600">
                            <MapPin className="h-5 w-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <h2 className="text-lg font-semibold text-gray-800 truncate">
                                    {address.name}
                                </h2>

                                <AlertDialog>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100
                              hover:text-red-600 hover:bg-red-50"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Remover endereço</span>
                                                </Button>
                                            </AlertDialogTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Remover endereço</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <AlertDialogContent className="bg-white sm:max-w-[425px]">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                                Remover endereço
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Tem certeza que deseja remover o endereço <span className="font-medium text-foreground">"{address.name}"</span>?
                                                Esta ação não pode ser desfeita.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                onClick={(e) => e.stopPropagation()}
                                                className="mt-2 sm:mt-0"
                                            >
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onRemove(address)
                                                }}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                Remover
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>

                            <div className="mt-1 text-sm text-gray-600 space-y-1">
                                <p className="line-clamp-2">
                                    {[
                                        address.addressLine1,
                                        address.addressLine2,
                                        address.neighborhood,
                                        address.postalCode
                                    ]
                                        .filter(Boolean)
                                        .join(', ')}
                                </p>
                                {address.addressLine2 && (
                                    <p className="text-gray-500 italic">
                                        Complemento: {address.addressLine2}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    )
})
