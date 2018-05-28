import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './lib/en.json'
import sc from './lib/sc.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en,
    sc
  }
})

export default i18n
