import { ViaCEPApi } from '@/services/viacep/service'
import type { AddressViaCep } from '@/services/viacep/types'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'

export function useViaCEP() {
  const cep = ref('')
  const cleanCEP = computed(() => cep.value?.replace(/\D/g, '') || '')
  
  function isValidCEP(): boolean {
    return cleanCEP.value.length === 8
  }

  const query = useQuery<AddressViaCep | undefined>({
    queryKey: ['viaCEP', cleanCEP],
    queryFn: async () => {
      const result = await ViaCEPApi.getInstance().getCEP(cleanCEP.value)
      return result
    },
    staleTime: 1000 * 60 * 60,
    enabled: computed(() => isValidCEP()),
    retry: false,
  })

    return { cep, ...query }
}
