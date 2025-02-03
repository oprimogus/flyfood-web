"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Home, ShoppingBag, ClipboardList, BarChart, Store, Settings, Bell, LogOut, ChevronsUpDown, Plus, StoreIcon, MenuIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useOwnerStores, useStore } from "@/hooks/use-api"
import { Session } from "next-auth"

export default function DashboardSidebar({ session }: { session: Session }) {
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const { storeList } = useOwnerStores(session)
  const { selectedStore, setSelectedStore } = useStore(session as Session) // Obtém do contexto

  // Atualiza a loja selecionada apenas na primeira renderização
  useEffect(() => {
    if (!selectedStore && storeList?.ok && storeList.value.length > 0) {
      setSelectedStore(storeList.value[0])
    }
  }, [storeList, selectedStore, setSelectedStore])

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
        { title: "Cardápio", url: "/dashboard/menu", icon: MenuIcon },
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

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                    {selectedStore?.profileImage ? (
                      <img
                        src={selectedStore.profileImage}
                        key={selectedStore.profileImage}
                        alt={selectedStore.name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover md:object-contain transition-transform hover:scale-105"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    ) : (
                      <StoreIcon className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {selectedStore?.name}
                    </span>
                    <span className="truncate text-xs">{selectedStore?.active
                      ? 'Ativa'
                      : 'Desativada'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg hover:border-gray-200"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Lojas
                </DropdownMenuLabel>
                {storeList?.ok && storeList.value.map((store, index) => (
                  <DropdownMenuItem
                    key={store.name}
                    onClick={() => setSelectedStore(store)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      {selectedStore?.profileImage ? (
                        <img
                          src={selectedStore.profileImage}
                          key={selectedStore.profileImage}
                          alt={selectedStore.name}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover md:object-contain transition-transform hover:scale-105"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      ) : (
                        <StoreIcon className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {selectedStore?.name}
                      </span>
                      <span className="truncate text-xs">{selectedStore?.active
                        ? 'Ativa'
                        : 'Desativada'}
                      </span>
                    </div>
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Abrir nova loja</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Menus de Navegação */}
        {menuSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={`flex items-center justify-between w-full p-2 rounded ${isActive ? "bg-red-500 text-white" : "hover:bg-gray-200"
                            }`}
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-5 w-5" />
                            <span>{item.title}</span>
                          </div>
                          {item.badge && <Badge variant="destructive">{item.badge}</Badge>}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
