<template>
    <div class="mui-content">
        <!--轮播图-->
        <slider :imgUrl="imgUrl"></slider>
        
        <!--九宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="item in menu">
                <router-link :to="item.url">
                    <span class="mui-icon" :class="item.className"></span>
                    <div :class="mui-media-body">{{item.title}}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    //导入轮播图组件
    import slider from '../subcom/slider.vue';
    
    //导出组件
    export default {
        data() {
            return {
                menu: [],
                imgUrl: ''
            }
        },
        created() {
            this.imgUrl = this.api.apiHost + "/api/getlunbo";
            this.getmenu();
        },
        methods: {
            //获取九宫格
            getmenu(){
                let url = this.api.apiHost + "/api/getmenus";
                this.$http.get(url).then( (response) => {
                    this.menu = response.body.message;
                }, () => {
                    
                })
            }
        },
        components: {
            slider: slider
        }
    }
</script>

<style scoped>
    .mui-icon {
        width: 50px;
        height: 50px;
        /*背景图像自动缩放直到适应且填充满整个容器。（CSS3）*/
        background-repeat: round;
    }

    .icon-news {
        background-image: url(../../../statics/images/menu1.png);
    }

    .icon-share {
        background-image: url(../../../statics/images/menu2.png);
    }

    .icon-buy {
        background-image: url(../../../statics/images/menu3.png);
    
    }

    .icon-feedback {
        background-image: url(../../../statics/images/menu4.png);
    
    }

    .icon-video {
        background-image: url(../../../statics/images/menu5.png);
    
    }

    .icon-contact {
        background-image: url(../../../statics/images/menu6.png);
    
    }

    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
    }
    
</style>