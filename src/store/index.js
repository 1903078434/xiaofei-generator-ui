import Vue from 'vue'
import Vuex from 'vuex'

//引入其他store
import generatorEntity from "@/store/generatorEntity";

import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        generatorEntity: generatorEntity
    },
    // 将插件配置到Vuex的plugins中
    plugins: [
        createPersistedstate({
            key: 'xiaofei-generator-ui-store', // 存数据的key名   自定义的  要有语义化
            paths: ['generatorEntity'] // 要把那些模块加入缓存
        })
    ]

})
