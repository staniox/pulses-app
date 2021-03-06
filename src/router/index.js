import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Tasks'
import TaskForm from "@/components/TaskForm";
import Tasks from "@/components/Tasks";
import TaskTypes from "@/components/TaskTypes";
import TaskTypeForm from "@/components/TaskTypeForm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/tasks',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/task/:id?',
    name: 'TaskForm',
    component: TaskForm
  },
  {
    path: '/task-types',
    name: 'TaskTypes',
    component: TaskTypes
  },
  {
    path: '/task-type/:id?',
    name: 'TaskTypeForm',
    component: TaskTypeForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
