<template>
    <div class="mui-content">
        <div class="title">
            <h4>{{img.title}}</h4>
            <span>{{img.add_time | fmtDate('YYYY-MM-DD')}}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>点击次数{{img.click}}</span>
        </div>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <!--<li v-for="(item, index) in images" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
               <img class="preview-img" src="http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230434303.jpg" @click="$preview.open(index, images)">
            </li>-->
            <vue-preview :slides="images" @close="handleClose"></vue-preview>
        </ul>

        <p class="content" v-html="img.content">
        </p>


        <!-- 评论-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import '../../..//statics/css/style.css';
    //导入评论组件
    import comment from '../subcom/comment.vue';
    import Vue from 'vue';
    //导入图片预览的组件
    import VuePreview from 'vue-preview';
    // defalut install
    Vue.use(VuePreview);

    // with parameters install
//  Vue.use(preview, {
//    mainClass: 'pswp--minimal--dark',
//    barsSize: {top: 0, bottom: 0},
//    captionEl: false,
//    fullscreenEl: false,
//    shareEl: false,
//    bgOpacity: 0.85,
//    tapToClose: true,
//    tapToToggleControls: false
//  });
    
    //导出组件
    export default {
        data() {
            return {
                img: {},
                id: -1,
                images: []
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getdetail();
            this.getimages();
        },
        methods: {
          //获取图片的详细内容
          getdetail() {
            let url = this.api.apiHost + '/api/getimageInfo/' + this.id;
            this.$http.get(url).then((response) => {
              this.img = response.body.message[0];
            })
          },
          //获取9宫格中图片的路径
          getimages() {
            let url = this.api.apiHost + '/api/getthumimages/' + this.id;
            this.$http.get(url).then((response) => {
              this.images = response.body.message;
    
              //给数组中的每一个对象增加  w  和 h 属性
              this.images.forEach((item) => {
                item.w = 600;
                item.h = 400;
                item.msrc = item.src;
              })
            })
          }
        },
        components: {
          comment: comment
        }
    }
</script>

<style scoped>
    .title {
        margin: 15px 15px;
    }
    
    .title h4 {
        color: dodgerblue;
    }
    
    .title span {
        font-size: 13px;
        color: rgba(92, 92, 92, 0.6);
    }
    
    /*9宫格样式*/
    .mui-grid-view.mui-grid-9 {
        padding: 15px;
        background-color: #fff;
        border-left: 0px;
    }
    
    .content {
        padding: 15px;
    }
    
</style>