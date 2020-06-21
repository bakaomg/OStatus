import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#OStatus')

if (process.env.NODE_ENV === 'production') {
  console.clear();
  console.log(
    " %c ✨ OStatus %c https://github.com/ohmyga233/OStatus",
    "color: #FFFFFF; background: #1E88E5; padding:6px;",
    "color: #FFFFFF; background: #424242; padding:6px;"
  )
}