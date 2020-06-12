import Vue from 'vue'
import VueRouter from 'vue-router'
import viewMain from '@/views/viewMain'
import notFoundPage from '@/components/pages/notFound'
import MonitorInfoPage from '@/components/pages/MonitorInfo'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: viewMain
  },{
    path: '/Monitor/:id',
    component: MonitorInfoPage
  },{
    path: '*',
    component: notFoundPage
  }
]

const router = new VueRouter({
  routes
})

export default router
