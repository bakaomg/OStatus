import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.config.productionTip = false

Vue.use(VueNoty, {
  killer: true,
  timeout: 4000,
  progressBar: true,
  layout: 'bottomRight'
});

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