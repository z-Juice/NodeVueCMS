//加载vue
import Vue from 'vue';

//加载mint-UI组件   全局导入
import mintUI from 'mint-ui';
Vue.use(mintUI);

//导入mint-引入mui的样式
import '../node_modules/mint-ui/lib/style.css';

//加载组件
import app from './app.vue';

//加载mui-css
import '../statics/css/mui.min.css';
import '../statics/css/icons-extra.css';
import '../statics/css/style.css';

//导入日期格式化的模块 momentjs
import moment from 'moment';

//写全局过滤器，格式化日期
Vue.filter('fmtDate', (input, formatStr) => {
    return moment(input).format(formatStr);
})

//引用vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

//引入路由模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//加载组件
import home from './components/home/home.vue';
import member from './components/member/member.vue';
import shopcar from './components/shopcar/shopcar.vue';
import search from './components/search/search.vue';

import news from './components/news/news.vue';
import newsdetail from './components/news/newsdetail.vue';

import share from './components/share/share.vue';
import sharedetail from './components/share/sharedetail.vue';

import buy from './components/buy/buy.vue';
import buydetail from './components/buy/buydetail.vue';

import feedback from './components/feedback/feedback.vue';
import video from './components/video/video.vue';
import contact from './components/contact/contact.vue';

//创建路由组件
let router = new VueRouter({
    //配置router-link 标亮当前页面标识
    linkActiveClass: 'mui-active',
    routes: [
        {name: 'root', path: '/', redirect: '/home'},
        {name: 'home', path: '/home', component: home},
        {name: 'member', path: '/member', component: member},
        {name: 'shopcar', path: '/shopcar', component: shopcar},
        {name: 'search', path: '/search', component: search},
        {name: 'news', path: '/news', component: news},
        {name: 'newsdetail', path: '/news/:id', component: newsdetail},
        {name: 'share', path: '/share', component: share},
        {name: 'sharedetail', path: '/share/:id', component: sharedetail},
        {name: 'buy', path: '/buy', component: buy},
        {name: 'buydetail', path: '/buy/:id', component: buydetail},
        {name: 'feedback', path: '/feedback', component: feedback},
        {name: 'video', path: '/video', component: video},
        {name: 'contact', path: '/contact', component: contact}
    ]
})

//配置全局的信息，存储api 的主机地址
Vue.prototype.api = {
    apiHost: 'http://127.0.0.1:8899'
}

var vm = new Vue({
    el: '#app',
    render: h => h(app),
    router: router
})
