<template>
  <n-layout-sider
    bordered
    :collapsed="props.collapsed"
    :show-trigger="false"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
    :inverted="inverted"
    class="navBar-content"
  >
    <n-menu
      v-model:value="thisRouter"
      :inverted="inverted"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      @update:value="handleUpdate"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { NLayoutSider, NMenu, type MenuOption } from 'naive-ui'
import { useRouterStore } from '../../stores/router'
const routerStore = useRouterStore()

const props = defineProps(['collapsed', 'menuOptions'])
const emits = defineEmits(['changeRouter'])

const inverted = ref(false)
const thisRouter = ref()

const handleUpdate = (key: string, item: MenuOption) => {
  emits('changeRouter', { name: key, label: item.label })
}

onMounted(() => {
  thisRouter.value = routerStore.thisRouter
})

watch(
  () => routerStore.thisRouter,
  (value) => {
    thisRouter.value = value
  }
)
</script>
