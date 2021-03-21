import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
const hostname = 'http://localhost:8000/'
export const app = axios.create({
    baseURL: hostname
})