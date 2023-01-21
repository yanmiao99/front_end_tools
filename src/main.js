import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';

Vue.use(uView);

// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
    props: {
        button: {
            color: '#8486F1'
        }
    }
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
