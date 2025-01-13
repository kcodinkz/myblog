import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'
import kk from '../locales/kk'
import kkArab from '../locales/kk-arab'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    kk,
    // 'kk-arab': kkArab
  }
})

export default i18n 