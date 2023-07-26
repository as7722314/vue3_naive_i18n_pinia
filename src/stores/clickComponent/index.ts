import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRouterStore } from '../router'
import type { IClickPageHistory } from '@/dao/interface/IClickPageHistory'

export const useClickComponentStore = defineStore('clickComponent', () => {
  const clickPageHistory = ref([] as Array<IClickPageHistory>)
  const router = useRouter()
  const routerStore = useRouterStore()

  const addComponent = (name: string, label: string) => {
    // 確定是否有重複
    const samePages = clickPageHistory.value.filter((item) => item.name == name)
    // 沒有重複才執行動作
    if (samePages.length == 0) {
      clickPageHistory.value.push({ name, label })
    }
    // 改變當前 Router
    routerStore.thisRouter = name
  }

  const removeComponent = (name: string) => {
    if (routerStore.thisRouter == name) {
      // 找到當下的 router 在第幾個頁籤
      const thisRemoveIndex = clickPageHistory.value.findIndex((item) => item.name == name)
      // 因為當下的 router 頁籤被刪除，所以需要導頁到下一個頁面
      const nextRouter = clickPageHistory.value[thisRemoveIndex == 0 ? 1 : thisRemoveIndex - 1]
      // 移除 router
      clickPageHistory.value = clickPageHistory.value.filter((item) => item.name != name)
      // 導頁
      router.push(nextRouter)
      // 改變當前 Router
      routerStore.thisRouter = nextRouter.name
    } else {
      clickPageHistory.value = clickPageHistory.value.filter((item) => item.name != name)
    }
  }

  return { clickPageHistory, addComponent, removeComponent }
})
