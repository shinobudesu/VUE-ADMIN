import Vue from "vue"
import Router from "vue-router"
import store from "@/store/index.js"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout/index.vue'
import {
    Message
} from 'element-ui'
Vue.use(Router);
/** 
 * 提示函数 
 * 显示2秒后关闭
 */
const tip = msg => {
    Message({
        message: msg,
        type: 'error',
        duration: 2 * 1000
    })
};
const router = new Router({
    routes: [{
        path: "/",
        redirect: 'login',
        component: Layout,
        children: [{
            path: "demo",
            name: "demo",
            meta: {
                title: 'demo',
                requireAuth: true
            },
            component: () =>
                import("@/views/demo/index.vue"),
        }, {
            path: "question",
            name: "question",
            meta: {
                title: 'question',
                requireAuth: true,
                tolink: '/question'
            },
            component: () =>
                import("@/views/question/index.vue"),
        }, {
            path: "logs",
            name: "logs",
            meta: {
                title: 'logs',
                requireAuth: true,
                tolink: '/logs'
            },
            component: () =>
                import("@/views/logs/index.vue"),
        }]
    }, {
        path: "/login",
        name: "login",
        meta: {
            title: '登录',
        },
        component: () =>
            import("@/views/login/index.vue")
    }, {
        path: "*",
        name: "404",
        component: () =>
            import('@/views/404/index.vue')
    },]
});
// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({
    ease: 'ease',
    speed: 500,
    showSpinner: false
});
NProgress.inc(0.2);
// 页面刷新时，重新赋值token
if (localStorage.getItem("token")) {
    store.commit('SETTOKEN', localStorage.getItem("token"));
    store.commit('SETMENUTREE', JSON.parse(localStorage.getItem("menu")));
    store.commit('SETUSERINFO', {
        nickname: localStorage.getItem("nickname"),
        username: localStorage.getItem("username")
    })
}
// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
    // NProgress开始进度条
    NProgress.start();
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.login.token) {
            next();
        } else {
            tip('登陆失效,请求失败！')
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});
// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
    // NProgress结束进度条
    NProgress.done();
});


// requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
export default router;