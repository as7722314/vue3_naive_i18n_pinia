import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

const messages = {
  EN: {
    portal: 'Portal',
    toolList: {
      index: 'ToolList',
      home: 'Home',
      about: 'About'
    }
  },
  TW: {
    portal: '中心',
    toolList: {
      index: '功能列表',
      home: '首頁',
      about: '關於'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'tw',
  fallbackLocale: 'en',
  availableLocales: ['tw', 'en'],
  messages: {
    tw: messages.TW,
    en: messages.EN
  }
})
const app = createApp(App)

app.use(i18n).use(createPinia()).use(router).mount('#app')
