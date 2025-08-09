import zitadelAuth from '@/services/zitadelAuth'
import { computed } from 'vue'

export function useSession() {
  const isAuthenticated = computed(() => zitadelAuth.oidcAuth.isAuthenticated)
  const userProfile = computed(() => zitadelAuth.oidcAuth.userProfile)
  const accessToken = computed(() => zitadelAuth.oidcAuth.accessToken)

  return { isAuthenticated, userProfile, accessToken }
}
