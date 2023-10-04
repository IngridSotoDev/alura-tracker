import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"
import Tarefas from '../views/Tarefas.vue'

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Tarefas',
  component: Tarefas
}]

const router = createRouter({
  history:  createWebHashHistory(),
  routes
})

export default router