"use client"
import { useState, useEffect, useCallback } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, ShoppingBag, ClipboardList, BarChart, Store, Settings, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useOwnerStores } from "@/hooks/use-api"
import { Session } from "next-auth"
import { QueryOwnerStoreList } from "@/service/flyfood-api/types"

export default function DashboardSidebar({ session }: { session: Session }) {
  const { storeList, isLoading } = useOwnerStores(session)

  // Inicializando lojas e selecionando a primeira
  const [selectedStore, setSelectedStore] = useState<QueryOwnerStoreList | null>(null)

  // Caso não haja lojas, definimos um estado padrão
  useCallback(() => {
    if (storeList?.ok && storeList.value.length > 0) {
      setSelectedStore(storeList.value[0])
    }
  }, [storeList])

  const pendingOrders = 3

  const menuSections = [
    {
      label: "Visão Geral",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Relatórios", url: "/dashboard/report", icon: BarChart },
      ],
    },
    {
      label: "Gestão da Loja",
      items: [
        { title: "Produtos", url: "/dashboard/product", icon: ShoppingBag },
        {
          title: "Pedidos",
          url: "/dashboard/order",
          icon: ClipboardList,
          badge: pendingOrders > 0 ? pendingOrders : null,
        },
      ],
    },
    {
      label: "Configurações",
      items: [
        { title: "Configuração da Loja", url: "#", icon: Store },
        { title: "Notificações", url: "#", icon: Bell },
        { title: "Conta e Assinatura", url: "#", icon: Settings },
        { title: "Área de clientes", url: "/restaurants", icon: LogOut },
      ],
    },
  ]

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <Sidebar>
      <SidebarContent>
        {/* Seletor de Loja */}
        <SidebarGroup>
          <SidebarGroupLabel>Loja Selecionada</SidebarGroupLabel>
          <SidebarGroupContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Store className="mr-2 h-5 w-5" />
                  {selectedStore ? selectedStore.name : "Nenhuma loja disponível"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {storeList?.ok ? storeList?.value.map((store) => (
                  <DropdownMenuItem key={store.id} onClick={() => setSelectedStore(store)}>
                    {store.name}
                  </DropdownMenuItem>
                )) : <></>}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menus de Navegação */}
        {menuSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && <Badge variant="destructive">{item.badge}</Badge>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
