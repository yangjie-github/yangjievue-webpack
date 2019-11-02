<template>
<div>
    <h1>app组件</h1>
    <router-link to="/account">Account</router-link>
    <router-link to="/goodsList">GoodsList</router-link>

    <!-- mint-ui -->
    <mt-button type="default" size="large" icon="back">default</mt-button>
    <mt-button type="primary" disabled>primary</mt-button>
    <mt-button type="danger" plain @click="show">弹出消息</mt-button>

    <!-- mui -->
    <button type="button" class="mui-btn mui-btn-royal">
        紫色
    </button>

    <router-view></router-view>
</div>
</template>

<script>
// 简短的消息提示框，支持自定义位置、持续时间和样式
import { Toast } from 'mint-ui';
export default {
    // Toast的使用
    data() {
        return {
            toastInstance: null
        }
    },
    created() {
        this.getList();
    },
    methods: {
        // 在获取数据之前，提示用户正在加载数据
        getList() {
            this.show();
            setTimeout(() => {
                //三秒过后，提示框消失
                this.toastInstance.close();
            }, 3000);
        },
        show() {
            this.toastInstance = Toast({
                message: '正在加载数据',
                position: 'top',
                // duration: 1000,
                iconClass: 'glyphicon glyphicon-heart', //设置图标，需自己准备（引入bootstrap的图标）
                className: 'mytoast', //设置图标样式
                //duration: -1 //弹出之后不消失
            });
        }
    }
}
</script>

<style>

</style>


