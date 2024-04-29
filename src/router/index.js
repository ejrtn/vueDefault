import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import NoticeListView from '../views/NoticeListView.vue'
import NoticeWriteView from '../views/NoticeWriteView.vue'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/noticeList',
        name: 'noticeList',
        component: NoticeListView
    },
    {
        path:'/noticeWrite',
        name: 'noticeWrite',
        component: NoticeWriteView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
