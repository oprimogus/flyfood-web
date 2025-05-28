<script setup lang="ts">
import SignIn from '@/components/button/SignIn.vue'
import { Menu} from 'lucide-vue-next'
</script>

<template>
  <SignIn />
  <nav class="w-screen navbar bg-base-100 justify-between shadow-md fixed top-0 z-50">
    <a href="/" class="flex items-center space-x-3">
      <div class="h-10 w-10 relative">
        <img
          src="@/assets/flyfood/logo/flyfood-red.svg"
          alt="FlyFood Logo"
          fill
          class="object-contain"
          priority />
      </div>
      <span class="text-xl font-bold text-primary">FLYFOOD</span>
    </a>

    <!-- Mobile Menu Button -->
    <div class="btn-primary text-base-content md:hidden">
      <details>
        <!-- Ícone do Menu -->
        <summary class="cursor-pointer flex items-center p-2 rounded">
          <Menu class="h-6 w-6 text-primary" />
        </summary>

        <!-- Conteúdo do Menu -->
        <div class="absolute top-full left-0 w-full bg-base-100 shadow-lg p-4">
          <div class="flex flex-col w-full space-y-4 items-center">
            <!-- Alinhado ao centro -->
            <RouterLink to="/stores" class="text-lg px-4 text-center w-full">
              Anuncie seu negócio
            </RouterLink>
            <SignIn />
          </div>
        </div>
      </details>
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex mx-4 items-center space-x-8">
      <RouterLink to="/owner" class="link-hover">Anuncie seu negócio</RouterLink>
    </div>
    <div class="hidden md:flex mx-4 items-center space-x-8">
      <SignIn />
    </div>
  </nav>
</template>
