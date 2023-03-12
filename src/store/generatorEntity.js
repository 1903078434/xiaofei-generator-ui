export default {
    namespaced: true,
    //用于响应组件中的动作
    actions: {},
    //用于操作数据（state）
    mutations: {
        setGeneratorEntity(state, value) {
            state.generatorEntity = value
        },
        setIsUse(state, value) {
            state.isUse = value
        },
        setGenerateBySqlRequestVO(state, value) {
            state.generateBySqlRequestVO = value
        },
    },
    //用于存储数据
    state: {
        generatorEntity: {
            user: "XiaoFei",
            author: "XiaoFei",
            packageName: "com.xiaofei",
            moduleName: "test",
            ignoreTablePrefix: "t_pm_",
            email: "xxxx@qq.com",
            programName: "test",
            programNameUpperCase: "Test",
            programDesc: "测试",
            programVersion: "1.0",
            enableSwagger: true,
            enableSpringCache: true,
            enableValidated: true,
            dataBaseHost: "127.0.0.1",
            dataBasePort: "3306",
            dataBaseName: "test",
            dataBaseUserName: "root",
            dataBasePassword: "root",
            dataBaseVersion: "8.x"
        },
        isUse: 0,//使用前端对代码生成的配置还是使用后端给的配置【0：前端   1：后端】
        //导入的SQL
        generateBySqlRequestVO: {
            sql: "",
            delimiter: ""
        }
    },
    //用于将state中的数据进行加工，比如state中sum+1
    getters: {},
    //用于存放vuex的各个模块，进行模块化管理时使用
    modules: {}
}
