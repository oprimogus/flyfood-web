import { createRouter, createWebHistory } from 'vue-router'
import ClientView from '@/views/landing-page/ClientView.vue'
import OwnerView from '@/views/landing-page/OwnerView.vue'
import zitadelAuth from '@/services/zitadelAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClientView,
      beforeEnter: (to, from, next) => {
          const isAuthenticated = zitadelAuth.oidcAuth.isAuthenticated
          if (isAuthenticated) {
              next({ name: 'stores' })
          } else {
              next()
          }
      }
    },
    {
      path: '/owner',
      name: 'owner',
      component: OwnerView,
    },
    {
      path: '/stores',
      name: 'stores',
      meta: {
        authName: zitadelAuth.oidcAuth.authName
      },
      component: () => import('@/views/HomeView.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})
zitadelAuth.oidcAuth.useRouter(router)
export default router
