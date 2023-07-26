<template>
  <n-layout>
    <n-layout has-sider>
      <n-layout has-sider class="navBar">
        <siderMenu
          :collapsed="collapsed"
          :menuOptions="menuOptions"
          @change-router="addRouter($event)"
        />
        <n-layout>
          <n-layout-header>
            <headerComponent :collapsed="collapsed" @change-collapsed="collapsed = $event" />
            <clickComponent />
          </n-layout-header>
          <n-layout-content class="content">
            <RouterView />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, h, computed, type Component } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutContent, NIcon } from 'naive-ui'
import headerComponent from './headerComponent.vue'
import clickComponent from './clickComponent.vue'
import siderMenu from './siderMenu.vue'
import { BookmarkTwotone } from '@vicons/material'
import { useClickComponentStore } from '../../stores/clickComponent'
// import { useRouterStore } from '../../stores/router'
import { useI18n } from 'vue-i18n'
import type { IClickPageHistory } from '@/dao/interface/IClickPageHistory'

const { t } = useI18n()
const collapsed = ref(true)

const router = useRouter()
const clickComponentStore = useClickComponentStore()
// const routerStore = useRouterStore()

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const addRouter = (route: IClickPageHistory) => {
  clickComponentStore.addComponent(route.name, route.label)
  router.push({ name: route.name })
}

const menuOptions = computed(() => {
  // let router = routerStore.routers
  // 透過 store 拿出後端的 router 傳換成 menuOptions
  return [
    {
      label: t('toolList.index'),
      key: 'toolList',
      icon: renderIcon(BookmarkTwotone),
      children: [
        {
          label: t('toolList.home'),
          key: 'home'
        },
        {
          label: t('toolList.about'),
          key: 'about'
        }
      ]
    }
  ]
})
</script>

<style scoped>
.navBar {
  height: 100vh;
}

.navBar-content {
  height: 100%;
}

.content {
  max-height: 100%;
  margin: 10px 30px;
}
</style>
