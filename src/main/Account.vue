<template>
<div>
    <h1>account组件</h1>

    <router-link to="/account/login">登录</router-link>
    <router-link to="/account/register">注册</router-link>

    <router-view></router-view>
</div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
// 只要样式是在组件内部中定义的，都推荐开启scoped属性
/* 普通的style标签只支持普通的样式， 要想支持sass， 需要加上lang */
 body {
    div {
        font-style: italic;
    }
} 
</style>
