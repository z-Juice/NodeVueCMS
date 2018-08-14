<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banner">
            <a :href="item.url">
                <img :src="item.img" alt="">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    //导出组件
    export default {
        data() {
            return {
                banner: []
            }
        },
        created() {
            this.getlunbo();
        },
        props: ['imgUrl'],
        methods: {
            //获取轮播
            getlunbo(){
                this.$http.get(this.imgUrl).then( (response) => {
                    this.banner = response.body.message;
                })
            }
        }
    }
</script>

<style scoped>
    /*  轮播图的样式 */
    .mint-swipe  {
        height: 250px;
    }

    .mint-swipe img {
        width: 100%;
        height: 100%;
    }
</style>