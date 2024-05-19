import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import NoticeListView from '../views/NoticeListView.vue'
import NoticeWriteView from '../views/NoticeWriteView.vue'
import WordEn from '../views/WordEn.vue'
import MediaList from '../views/MediaList.vue'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/noticeList',
        name: 'noticeList',
        component: NoticeListView,
        props: {
            default: true
        }
    },
    {
        path:'/noticeWrite',
        name: 'noticeWrite',
        component: NoticeWriteView,
        props: {
            default: true
        }
    },
    {
        path:'/workEn',
        name: 'workEn',
        component: WordEn,
        props: {
            default: true
        }
    },
    {
        path:'/mediaList',
        name: 'mediaList',
        component: MediaList,
        props: {
            default: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
