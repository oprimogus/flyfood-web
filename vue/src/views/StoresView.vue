<script setup lang="ts">
import { SearchIcon, MenuIcon } from 'lucide-vue-next'
import { useForm } from '@tanstack/vue-form'
import { useStores } from '@/hooks/useStores'
import NavLogged from '@/components/nav/NavLogged.vue'
const { storeList, isLoading, queryParams } = useStores()
const form = useForm({
  defaultValues: queryParams.value,
  onSubmit: async (values) => {
  },
})
</script>

<template>
  <NavLogged />
  <div class="space-y-4 h-screen flex flex-col items-center">
    <h1 class="text-base-content font-bold text-center mt-4">
      Veja as lojas disponíveis na sua região
    </h1>
    <div class="flex flex-col items-center">
      <div class="flex items-center">
        <!-- Formulário de pesquisa por nome -->
        <form @submit="form.handleSubmit" class="flex justify-items-center gap-2 px-4 py-2 w-full max-w-2xl">
          <label class="input input-bordered flex items-center gap-2 flex-1 min-w-0">
            <form.Field name="name">
              <template v-slot="{ field }">
                <input
                  :name="field.name"
                  :value="field.state.value"
                  type="text"
                  class="grow w-full"
                  placeholder="Pesquisa por lojas, produtos..." />
              </template>
            </form.Field>
          </label>
          <button type="submit" class="btn btn-primary">
            <SearchIcon />
          </button>
        </form>

        <!-- Botão para abrir o drawer de filtros -->
        <div class="relative drawer-end px-2">
          <!-- <input id="my-drawer-4" type="checkbox" class="drawer-toggle" /> -->
          <!-- <div class="drawer-content">
            <label htmlFor="my-drawer-4" class="btn btn-primary">
              <MenuIcon />
            </label>
          </div> -->

          <!-- Drawer com filtros avançados -->
          <!-- <div class="drawer-side z-50">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" class="drawer-overlay" />
            <form
              @submit="form.handleSubmit"
              class="bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4">
              <p>Tipo de loja</p>
              <select v-model="value.type" class="select w-full max-w-xs">
                <option key="" value="">Nenhum</option>
                <option
                  v-for="[key, value] in Object.entries(storeTypeTranslation)"
                  :key="key"
                  :value="key">
                  {{ value }}
                </option>
              </select>

              <p>Avaliação mínima: {formatRating(score || 0)}</p>
              <div class="w-full max-w-xs">
                <input
                  v-model="score"
                  type="range"
                  min="{0}"
                  max="{500}"
                  step="{50}"
                  class="range" />
                <div class="flex justify-between px-2.5 mt-2 text-xs">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">Filtrar</button>
            </form>
          </div> -->
        </div>

        <!-- Lista de lojas -->
        <!-- <div class="w-full p-4 space-y-4"> -->
          <!-- Loader state -->
          <!-- <div v-if="!storeList && isLoading">
            <div key="skeleton-1" class="block">
              <div
                class="card card-side h-32 m-4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="skeleton h-full w-full py-2" />
              </div>
            </div>
            <div key="skeleton-2" class="block">
              <div
                class="card card-side h-32 m-4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="skeleton h-full w-full py-2" />
              </div>
            </div>
            <div key="skeleton-3" class="block">
              <div
                class="card card-side h-32 m-4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="skeleton h-full w-full py-2" />
              </div>
            </div>
            <div key="skeleton-4" class="block">
              <div
                class="card card-side h-32 m-4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="skeleton h-full w-full py-2" />
              </div>
            </div>
            <div key="skeleton-5" class="block">
              <div
                class="card card-side h-32 m-4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="skeleton h-full w-full py-2" />
              </div>
            </div>
          </div> -->

          <!-- Empty state -->
          <!-- <div
            v-if="storeList?.data.length === 0"
            class="flex flex-col pt-24 items-center text-center space-y-4 px-4">
            <Image
              src="/flyfood/ilustration/quiet_street.svg"
              alt="Nenhuma loja encontrada"
              width="{300}"
              height="{200}"
              class="rounded-lg opacity-80" />
            <h2 class="text-lg font-semibold text-gray-700">
              Nenhuma loja encontrada na sua região
            </h2>
            <p class="text-gray-500 max-w-xs">
              Tente alterar os filtros ou buscar por outra categoria de produtos.
            </p>
            <button type="button" class="btn btn-primary">Explorar categorias</button>
          </div> -->

          <!-- Store list -->
          <!-- <div v-if="storeList && storeList.data.length > 0" class="flex flex-col justify-center">
            <StoreCard v-for="store in storeList.data" :key="store.id" store="store" />
          </div> -->
          <!-- <div class="join justify-center text-center mt-4">
            Botão Anterior
            <button type="button" class="join-item btn">&lt;</button>

            Páginas
            <button v-for="page in visiblePages" :key="page" type="button">
              {{ page }}
            </button>

            Mostrar ... apenas se há mais páginas depois
            <span class="join-item btn btn-disabled">...</span>

            Botão Próximo
            <button type="button" class="join-item btn">&gt;</button>
          </div> -->
        </div>
      </div>
      <!-- </div> -->
    </div>
  <!-- </div> -->
</template>
