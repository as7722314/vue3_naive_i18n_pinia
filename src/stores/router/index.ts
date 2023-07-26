import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useRouterStore = defineStore('router', () => {
  const routers = ref()
  const router = useRouter()
  const thisRouter = ref(router.currentRoute.value.name)

  onMounted(() => {
    // Call API Get User Router
  })

  return { routers, thisRouter }
})
