<script setup lang="ts">
import type { Address } from '@/services/flyfood-api/types'
import { useForm } from '@tanstack/vue-form'
import { useViaCEP } from '@/hooks/useViaCEP'
import { z } from 'zod/v4'
import { useMutateAddress } from '@/hooks/useMutateAddress'

const cepForm = useForm({
  defaultValues: { postalCode: '' },
  onSubmit: async ({ value }) => {
    console.log(value)
  },
})

const addressForm = useForm({
  defaultValues: {} as Address,
  onSubmit: async ({ value }) => {
    addAddressMutation.mutate(value)
  },
})

const { addAddressMutation } = useMutateAddress()

const { cep, data: addressCEP, isLoading, refetch } = useViaCEP()

// Busca CEP e preenche campos
const handleSearchCEP = async () => {
  const data = addressCEP.value
  if (data) {
    addressForm.setFieldValue('addressLine1', data.logradouro || '')
    addressForm.setFieldValue('neighborhood', data.bairro || '')
    addressForm.setFieldValue('city', data.localidade || '')
    addressForm.setFieldValue('state', data.uf || '')
    addressForm.setFieldValue('country', 'Brasil')
    addressForm.setFieldValue('postalCode', data.cep || '')
  }
}
</script>

<template>
  <form class="mt-4" @submit.prevent.stop="cepForm.handleSubmit">
    <div class="flex flex-row space-y-2 space-x-4">
      <cepForm.Field
        name="postalCode"
        :validators="{
          onChange: z
            .string()
            .min(1, 'Campo necessário.')
            .regex(/^\d{5}-\d{3}$/, 'CEP inválido.'),
        }">
        <template v-slot="{ field, state }">
          <div class="flex flex-row space-x-2">
            <label class="input">
              <span class="label">CEP</span>
              <input
                id="postalCode"
                type="text"
                placeholder="00000-000"
                :name="field.name"
                :value="field.state.value"
                @input="
                  (e) => {
                    const input = e.target as HTMLInputElement
                    const numbers = input.value.replace(/\D/g, '')
                    const formatted =
                      numbers.length > 5 ? `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}` : numbers
                    field.handleChange(formatted)
                    cep = formatted
                  }
                " />
            </label>
          </div>
        </template>
      </cepForm.Field>
      <button type="submit" class="btn btn-primary" @click="handleSearchCEP" :disabled="isLoading">
        {{ isLoading ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>
    <div class="flex flex-col text-red-500" v-if="!cepForm.getFieldMeta('postalCode')?.isValid">
      <em
        role="alert"
        v-for="(error, index) in cepForm.getFieldMeta('postalCode')?.errors"
        :key="index">
        {{ error?.message }}
      </em>
    </div>
  </form>

  <form class="mt-6" @submit.prevent.stop="addressForm.handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <addressForm.Field
        name="addressLine1"
        :validators="{ onChange: z.string().min(1, 'Campo necessário') }">
        <template v-slot="{ field, state }">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Endereço</span>
            </label>
            <input
              class="input input-bordered"
              type="text"
              placeholder="Rua Dom Pedro II"
              :name="field.name"
              :value="field.state.value"
              @input="(e) => field.handleChange((e.target as HTMLInputElement).value)" />
            <div class="text-error text-sm mt-1" v-if="!field.state.meta.isValid">
              <em v-for="(error, index) in state.meta.errors" :key="index">{{ error?.message }}</em>
            </div>
          </div>
        </template>
      </addressForm.Field>

      <addressForm.Field
        name="addressLine2"
        :validators="{ onChange: z.string().min(1, 'Campo necessário') }">
        <template v-slot="{ field, state }">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Número</span>
            </label>
            <input
              class="input input-bordered"
              type="text"
              placeholder="594"
              :name="field.name"
              :value="field.state.value"
              @input="(e) => field.handleChange((e.target as HTMLInputElement).value)" />
            <div class="text-error text-sm mt-1" v-if="!field.state.meta.isValid">
              <em v-for="(error, index) in state.meta.errors" :key="index">{{ error?.message }}</em>
            </div>
          </div>
        </template>
      </addressForm.Field>

      <addressForm.Field
        name="neighborhood"
        :validators="{ onChange: z.string().min(1, 'Campo necessário') }">
        <template v-slot="{ field, state }">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Bairro</span>
            </label>
            <input
              class="input input-bordered"
              type="text"
              placeholder="Jardim Liberdade"
              :name="field.name"
              :value="field.state.value"
              @input="(e) => field.handleChange((e.target as HTMLInputElement).value)" />
            <div class="text-error text-sm mt-1" v-if="!field.state.meta.isValid">
              <em v-for="(error, index) in state.meta.errors" :key="index">{{ error?.message }}</em>
            </div>
          </div>
        </template>
      </addressForm.Field>

      <addressForm.Field
        name="city"
        :validators="{ onChange: z.string().min(1, 'Campo necessário') }">
        <template v-slot="{ field, state }">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Cidade</span>
            </label>
            <input
              class="input input-bordered"
              type="text"
              placeholder="São Paulo"
              :name="field.name"
              :value="field.state.value"
              @input="(e) => field.handleChange((e.target as HTMLInputElement).value)" />
            <div class="text-error text-sm mt-1" v-if="!field.state.meta.isValid">
              <em v-for="(error, index) in state.meta.errors" :key="index">{{ error?.message }}</em>
            </div>
          </div>
        </template>
      </addressForm.Field>

      <addressForm.Field
        name="state"
        :validators="{ onChange: z.string().min(1, 'Campo necessário') }">
        <template v-slot="{ field, state }">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Estado</span>
            </label>
            <input
              class="input input-bordered"
              type="text"
              placeholder="SP"
              :name="field.name"
              :value="field.state.value"
              @input="(e) => field.handleChange((e.target as HTMLInputElement).value)" />
            <div class="text-error text-sm mt-1" v-if="!field.state.meta.isValid">
              <em v-for="(error, index) in state.meta.errors" :key="index">{{ error?.message }}</em>
            </div>
          </div>
        </template>
      </addressForm.Field>

      <addressForm.Field
        name="country"
        :validators="{ onChange: z.string().min(1, 'Campo necessário') }">
        <template v-slot="{ field, state }">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">País</span>
            </label>
            <input
              class="input input-bordered"
              type="text"
              placeholder="Brasil"
              :name="field.name"
              :value="field.state.value"
              @input="(e) => field.handleChange((e.target as HTMLInputElement).value)" />
            <div class="text-error text-sm mt-1" v-if="!field.state.meta.isValid">
              <em v-for="(error, index) in state.meta.errors" :key="index">{{ error?.message }}</em>
            </div>
          </div>
        </template>
      </addressForm.Field>

      <addressForm.Field
        name="name"
        :validators="{ onChange: z.string().min(1, 'Campo necessário') }">
        <template v-slot="{ field, state }">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Nome</span>
            </label>
            <input
              class="input input-bordered"
              type="text"
              placeholder="Casa"
              :name="field.name"
              :value="field.state.value"
              @input="(e) => field.handleChange((e.target as HTMLInputElement).value)" />
            <div class="text-error text-sm mt-1" v-if="!field.state.meta.isValid">
              <em v-for="(error, index) in state.meta.errors" :key="index">{{ error?.message }}</em>
            </div>
          </div>
        </template>
      </addressForm.Field>
    </div>

    <div class="mt-6 flex flex-row space-x-4 items-center justify-center">
      <button type="click" class="btn btn-secondary" @click="handleCancel">Cancelar</button>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Salvando...' : 'Salvar endereço' }}
      </button>
    </div>
  </form>
</template>
