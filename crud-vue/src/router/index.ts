import { createRouter, createWebHistory } from 'vue-router'
import ClientList from '../views/ClientList.vue'
import ClientForm from '../views/ClientForm.vue'

//Se configuran las rutas para listado, alta y edición
const routes = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'ClientList',
    component: ClientList
  },
  {
    path: '/add',
    name: 'AddClient',
    component: ClientForm
  },
  {
    path: '/edit/:id',
    name: 'EditClient',
    component: ClientForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
