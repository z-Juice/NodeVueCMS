<template>
    <div class="comment">
        <!--添加评论-->
        <h4>提交评论</h4>

        <div class="submitcomment">
            <textarea v-model="content" placeholder="请输入评论内容"></textarea>
            <button @click="sendComment" class="mui-btn mui-btn-primary">发表</button>
        </div>
            
        <div class="title">
            <h4>评论列表</h4>
        </div>
        
        <!--评论列表-->
        <div v-for="(item, index) in comments" :key="index" class="item">
            <div class="content">{{item.content}}</div>
            <div>
                <span class="user">{{item.user_name}}</span>  <span>{{item.add_time | fmtDate("YYYY-MM-DD HH:mm:ss")}}</span>
            </div>
        </div>

        <div class="more">
            <button @click="loadMore" class="mui-btn mui-btn-primary mui-btn-outlined">加载更多</button>
        </div>

    </div>
</template>

<script>
    
    //导出组件
    export default {
        data() {
            return {
                content: '',
                comments: [],
                pageindex: 1
            }
        },
        created () {
            //加载评论列表
            this.loadComments();
        },
        props: ['id'],
        methods: {
            //发表评论
            sendComment() {
                if(!this.content){
                    this.$toast('请输入内容');
                    return;
                }
                let url = this.api.apiHost + '/api/postcomment/' + this.id;
    
                this.$http.post(url, {content: this.content}, {emulateJSON: true}).then((response) => {
                    if(response.body.status == 0){
                        this.$toast('发表成功');
                        
                        this.comments.unshift({
                            user_name: '匿名用户',
                            add_time: new Date(),
                            content: this.content
                        });
                        this.content = '';
                    }else{
                        this.$toast('发表失败');
                    }
                })
            },
            //评论列表
            loadComments() {
                let url = this.api.apiHost + '/api/getcomments/' + this.id + '?pageindex=' + this.pageindex;
    
                this.$http.get(url).then((response) => {
                    this.comments = this.comments.concat(response.body.message);
                })
            },
            loadMore() {
                this.pageindex++;
                this.loadComments();
            }
        }
    }
</script>

<style scoped>
    /*  评论的样式 */
    .submitcomment {
        text-align: center;
    }
    
    .submitcomment textarea {
        margin-top: 10px;
        padding: 0;
        width: 96%;
        height: 60px;
    }
    
    .submitcomment button {
        width: 96%;
    }
    
    .title {
        border-top: 1px solid rgba(92, 92, 92, 0.4);
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        margin: 20px 0 0 0;
        vertical-align: middle;
        padding: 10px 0;
    }
    
    .item {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }
    
    .item div {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .item span {
        font-size: 15px;
    }
    
    .item .user {
        color: skyblue;
    }
    
    .more {
        margin: 10px 0;
        text-align: center;
    }
    
    .more>button {
        width: 96%;
    }
</style>