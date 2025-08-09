<script setup lang="ts">
import { Menu, ShoppingCart, User } from 'lucide-vue-next'
import ModalAddress from '@/components/modal/ModalAddress.vue'
import SignOut from '@/components/button/SignOut.vue'
</script>

<template>
  <nav class="navbar bg-base-100 justify-between shadow-md sticky top-0 z-50">
    <a href="/" class="flex items-center space-x-3">
      <div class="h-10 w-10 relative">
        <img
          src="@/assets/flyfood/logo/flyfood-red.svg"
          alt="FlyFood Logo"
          class="object-contain" />
      </div>
      <span class="hidden md:flex text-xl font-bold text-primary">FLYFOOD</span>
    </a>

    <div>
      <ModalAddress />
    </div>

    <!-- Mobile Menu Button -->
    <div class="btn-primary text-black md:hidden">
      <details>
        <!-- Ícone do Menu -->
        <summary class="cursor-pointer flex items-center p-2 rounded">
          <Menu class="h-6 w-6 text-primary" />
        </summary>

        <!-- Conteúdo do Menu -->
        <div class="absolute top-full left-0 w-full bg-white shadow-lg p-4">
          <div class="flex flex-col w-full space-y-4 items-center">
            {' '}
            <!-- Alinhado ao centro -->
            <a href="/profile" class="text-lg px-4 text-center w-full">Meu Perfil</a>
            <a href="/checkout" class="text-lg px-4 text-center w-full">Carrinho</a>
            <a href="/orders" class="text-lg px-4 text-center w-full">Pedidos</a>
            <SignOut />
          </div>
        </div>
      </details>
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex mx-4 items-center space-x-8">
      <button type="button" class="btn">
        <ShoppingCart class="w-6 h-6" />
      </button>
      <details class="dropdown dropdown-bottom dropdown-end">
        <summary class="btn m-1">
          <User class="w-6 h-6" />
        </summary>
        <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a href="/profile" class="text-lg px-4 text-center w-full">Meu Perfil</a>
          </li>
          <li>
            <a href="/checkout" class="text-lg px-4 text-center w-full">Carrinho</a>
          </li>
          <li>
            <a href="/orders" class="text-lg px-4 text-center w-full">Pedidos</a>
          </li>
          <SignOut />
        </ul>
      </details>
    </div>
  </nav>
</template>
