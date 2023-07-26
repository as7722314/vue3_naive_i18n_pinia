<template>
  <div class="container">
    <!-- <div v-for="(item, index) in clickPageHistory" :key="index">
        <n-tag
          type="info"
          closable
          @close="handleClose(item.name)"
          @click="handleClick(item.name, item.label)"
          style="cursor: pointer"
        >
          {{ item.label }}
        </n-tag>
      </div> -->

    <n-tabs
      v-model:value="thisRouter"
      type="card"
      closable
      tab-style="min-width: 80px;"
      @close="handleClose"
      @update:value="handleUpdate"
    >
      <n-tab-pane
        v-for="item in clickPageHistory"
        :key="item.name"
        :tab="t(`toolList.${item.name}`)"
        :name="item.name"
      >
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NTabs, NTabPane, useMessage } from 'naive-ui'
import { useClickComponentStore } from '../../stores/clickComponent'
import { useRouterStore } from '../../stores/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const message = useMessage()
const router = useRouter()
const routerStore = useRouterStore()
const clickComponentStore = useClickComponentStore()
const clickPageHistory = computed(() => clickComponentStore.clickPageHistory)
const thisRouter = ref(router.currentRoute.value.name?.toString())

const handleClose = (name: string) => {
  console.log('handleClose', name)
  if (clickPageHistory.value.length === 1) {
    message.warning('僅剩下當前畫面頁面無法刪除', {
      closable: true,
      duration: 3000
    })
    return
  }
  clickComponentStore.removeComponent(name)
}

// const handleClick = (name: string, label: string) => {
//   clickComponentStore.addComponent(name, label)
//   router.push({ name })
//   routerStore.thisRouter = name
// }

watch(
  () => routerStore.thisRouter,
  (value) => {
    thisRouter.value = value?.toString()
  }
)

const handleUpdate = (name: string) => {
  console.log('handleUpdate', name)
  // 透過當前 Router Name 與 RouterStore 的Router比對出當前是哪一頁
  if (router.currentRoute.value.name == 'home') {
    clickComponentStore.addComponent(name, '首頁')
    router.push({ name })
    routerStore.thisRouter = name
  }
  if (router.currentRoute.value.name == 'about') {
    clickComponentStore.addComponent(name, '關於')
    router.push({ name })
    routerStore.thisRouter = name
  }
}

onMounted(() => {
  // 透過當前 Router Name 與 RouterStore 的Router比對出當前是哪一頁
  if (router.currentRoute.value.name == 'home') {
    clickComponentStore.addComponent('home', '首頁')
  }
  if (router.currentRoute.value.name == 'about') {
    clickComponentStore.addComponent('about', '關於')
  }
})
</script>

<style scoped>
.container {
  margin: 10px 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
