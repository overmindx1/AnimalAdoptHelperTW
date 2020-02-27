import Vue from 'vue'
const helper = {};
helper.install = vue => {
    vue.prototype.$fetchGet = url => {
        return fetch(url).then(r => r.json()).then(res => {
            
            return res;
        }).catch(err => console.error(err));
    }
    
}

Vue.use(helper)
console.dir(Vue.fetchGet)