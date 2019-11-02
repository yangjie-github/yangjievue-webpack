import account from './main/Account.vue'
import goodsList from './main/GoodsList.vue'
import login from './soncomponent/Login.vue'
import register from './soncomponent/Register.vue'

//使用vue-router, 下载包： npm i vue-router -S
import VueRouter from 'vue-router'

// 创建路由对象
var router = new VueRouter({
    routes: [
        { 
            path: '/account', 
            component: account,
            children: [
                {path: 'login', component: login},
                {path: 'register', component: register}
            ]
        },
        { path: '/goodsList', component: goodsList }
    ]
})

// 把路由对象暴露出去
export default router