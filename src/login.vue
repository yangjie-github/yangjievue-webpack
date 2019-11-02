<template>
    <div>
        <h1>这是登录组件，使用vue文件定义出来的  --- {{ msg }} --- {{show}}</h1>
    </div>
</template>

<script>
export default { //组件内部的数据， export default向外暴露成员
    data() { //组件中的data必须是function
        return {
            msg: "123"
        }
    },
    methods: {
        show() {
            console.log("调用了组件的show方法")
        }
    }
}
</script>

<style>

</style>


