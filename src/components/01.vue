<style scoped>
    .box{
        height: 100px;
        overflow: hidden;
        background: red;
    }
</style>
<template>
    <div class="box">
        <button @click="test">触发01组件事件</button>
        <div>123123123</div>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566187321878&di=347f92e78a751ff4f5eaefe52498a615&imgtype=0&src=http%3A%2F%2Fpic33.nipic.com%2F20131007%2F13639685_123501617185_2.jpg">
    </div>
</template>

<script>
export default {
    name: 'one',
    methods: {
        test() {
            this.$emit('click', 456789)
        }
    }
}
</script>
