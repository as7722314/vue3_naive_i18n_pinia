<template>
  <n-grid cols="12" item-responsive responsive="self" style="padding: 10px; box-sizing: border-box">
    <n-grid-item span="6">
      <n-button
        text
        :border="false"
        :focusable="false"
        strong
        circle
        type="success"
        @click="changeCollapsed"
        style="margin: 10px"
        size="large"
      >
        <template #icon>
          <n-icon size="x-large">
            <DehazeRound />
          </n-icon>
        </template>
      </n-button>
      <span style="font-size: 20px; margin-left: 10px">{{ $t('portal') }}</span>
    </n-grid-item>
    <n-grid-item span="6" style="text-align: right">
      <n-dropdown trigger="click" size="small" :options="langOptions" @select="handleSelect">
        <n-button quaternary round type="info">系統語系 {{ locale.toUpperCase() }}</n-button>
      </n-dropdown>

      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-button
            text
            :border="false"
            :focusable="false"
            strong
            circle
            type="error"
            size="large"
            style="margin: 10px"
          >
            <template #icon>
              <n-icon size="x-large">
                <LogOutRound />
              </n-icon>
            </template>
          </n-button>
        </template>
        <span>登出</span>
      </n-tooltip>
    </n-grid-item>
  </n-grid>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { NGrid, NGridItem, NButton, NIcon, NTooltip, NDropdown } from 'naive-ui'
import { DehazeRound, LogOutRound } from '@vicons/material'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const langOptions = reactive([
  {
    label: '中文',
    key: 'tw'
  },
  {
    label: '英文',
    key: 'en'
  }
])

const props = defineProps(['collapsed'])
const emits = defineEmits(['changeCollapsed'])

const changeCollapsed = () => {
  emits('changeCollapsed', !props.collapsed)
}

const handleSelect = (lang: string) => {
  locale.value = lang
}
</script>
