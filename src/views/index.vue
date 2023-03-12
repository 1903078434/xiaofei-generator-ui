<template>
    <div style="max-width: 1200px;margin: 0 auto">

        <!-- 顶部搜素 -->
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <el-input clearable v-model="tableName" placeholder="输入要过滤的表名 / 表备注"></el-input>
            </el-col>
        </el-row>

        <!-- 顶部按钮 -->
        <el-row style="margin: 20px 0" type="flex" class="row-bg" justify="space-around">
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <el-button type="success" @click="tableList">查询</el-button>
            </el-col>
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <el-button type="primary" @click="dialogOpen">生成</el-button>
            </el-col>
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <el-button type="primary" @click="createBySql">导入SQL</el-button>
            </el-col>
        </el-row>

        <!-- 表格展示内容 -->
        <el-row>
            <el-col>
                <el-table ref="multipleTable" :data="page.items" tooltip-effect="dark"
                          style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"/>
                    <el-table-column prop="tableName" label="表名" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="tableComment" label="表备注" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!-- 分页展示 -->
        <el-row>
            <el-col style="margin-top: 20px;">
                <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                               :hide-on-single-page="page.hasNext"
                               :total="page.itemCount" :current-page="page.pageNo" :page-size="page.pageSize" background
                               :page-sizes="[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300]"
                               layout="total, sizes, prev, pager, next">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 生成通用化信息设置 -->
        <el-dialog :before-close="dialogCancel" :title="dialogTitle" :visible.sync="dialogVisible" width="1000px"
                   append-to-body>
            <el-form :model="formData" label-position="left" label-width="230px" :inline="true">
                <el-form-item style="padding: 0 50px 0 0" label="用户" prop="user">
                    <el-input style="width: 180px" v-model="formData.user"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="作者" prop="author">
                    <el-input style="width: 180px" v-model="formData.author"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="包名" prop="packageName">
                    <el-input style="width: 180px" v-model="formData.packageName"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="模块名" prop="moduleName">
                    <el-input style="width: 180px" v-model="formData.moduleName"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="忽略表前缀" prop="ignoreTablePrefix">
                    <el-input style="width: 180px" v-model="formData.ignoreTablePrefix"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="邮箱" prop="email">
                    <el-input style="width: 180px" v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="项目名称" prop="programName">
                    <el-input style="width: 180px" v-model="formData.programName"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="项目名称转大写" prop="programNameUpperCase">
                    <el-input style="width: 180px" v-model="formData.programNameUpperCase"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="项目描述" prop="programDesc">
                    <el-input style="width: 180px" v-model="formData.programDesc"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="项目版本" prop="programVersion">
                    <el-input style="width: 180px" v-model="formData.programVersion"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="数据库IP" prop="dataBaseHost">
                    <el-input style="width: 180px" v-model="formData.dataBaseHost"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="数据库端口" prop="dataBasePort">
                    <el-input style="width: 180px" v-model="formData.dataBasePort"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="数据库名字" prop="dataBaseName">
                    <el-input style="width: 180px" v-model="formData.dataBaseName"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="数据库用户名" prop="dataBaseUserName">
                    <el-input style="width: 180px" v-model="formData.dataBaseUserName"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="数据库密码" prop="dataBasePassword">
                    <el-input style="width: 180px" v-model="formData.dataBasePassword"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="数据库版本 【8.x和5.x】" prop="dataBaseVersion">
                    <el-radio style="width: 90px" v-model="formData.dataBaseVersion" label="5.x">5.x</el-radio>
                    <el-radio v-model="formData.dataBaseVersion" label="8.x">8.x</el-radio>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="使用前端界面配置还是很后端配置" prop="dataBaseVersion">
                    <el-radio style="width: 90px" v-model="isUse" :label="0">前端</el-radio>
                    <el-radio v-model="isUse" :label="1">后端</el-radio>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="是否开启swagger" prop="enableSwagger">
                    <el-radio style="width: 90px" v-model="formData.enableSwagger" :label="false">关闭</el-radio>
                    <el-radio v-model="formData.enableSwagger" :label="true">开启</el-radio>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="是否开启Spring Cache" prop="enableSpringCache">
                    <el-radio style="width: 90px" v-model="formData.enableSpringCache" :label="false">关闭</el-radio>
                    <el-radio v-model="formData.enableSpringCache" :label="true">开启</el-radio>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="是否开启JSR303数据校验" prop="enableValidated">
                    <el-radio style="width: 90px" v-model="formData.enableValidated" :label="false">关闭</el-radio>
                    <el-radio v-model="formData.enableValidated" :label="true">开启</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="code(0)">确 定</el-button>
            </div>
        </el-dialog>

        <!-- SQL信息设置 -->
        <el-dialog :before-close="dialogCancelBySql" :title="dialogTitleBySql" :visible.sync="dialogVisibleBySql"
                   append-to-body>
            <el-form :model="generateBySqlRequestVO" label-position="right">
                <el-form-item style="padding: 0 50px 0 0" label="表语句分隔符" prop="user">
                    <el-input v-model="generateBySqlRequestVO.delimiter"></el-input>
                </el-form-item>
                <el-form-item style="padding: 0 50px 0 0" label="SQL" prop="author">
                    <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 99}"
                              v-model="generateBySqlRequestVO.sql"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancelBySql">取 消</el-button>
                <el-button @click="clearSqlAndDelimiter">重 置</el-button>
                <el-button type="primary" @click="code(1)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {tableList, createCode} from "@/api/gen";
import {saveAs} from 'file-saver'
// 引入vuex中的mapState
import {mapMutations} from 'vuex'

export default {
    created() {
        this.tableList();
        this.formData = this.$store.state.generatorEntity.generatorEntity
        this.isUse = this.$store.state.generatorEntity.isUse
        this.generateBySqlRequestVO = this.$store.state.generatorEntity.generateBySqlRequestVO
    },
    data() {
        return {
            page: {
                pageNo: 1,
                pageSize: 15,
                pageTotal: 3,
                itemCount: 30,
                items: [],
                item: null,
                hasPrevious: true,
                hasNext: false
            },
            tableName: "",
            multipleSelection: [],
            isUse: 0,//使用前端对代码生成的配置还是使用后端给的配置【0：前端   1：后端】
            formData: {},
            //导入的SQL
            generateBySqlRequestVO: {
                sql: "",
                delimiter: ""
            },
            //数据加载动画
            dataListLoading: false,
            //弹窗标题
            dialogTitle: "",
            //弹窗是否显示
            dialogVisible: false,
            //数据加载动画
            dataListLoadingBySql: false,
            //弹窗标题
            dialogTitleBySql: "",
            //弹窗是否显示
            dialogVisibleBySql: false,
        };
    },
    methods: {
        //获取vuex中的函数
        ...mapMutations('generatorEntity', ['setGeneratorEntity', 'setIsUse', 'setGenerateBySqlRequestVO']),
        //获取表信息
        tableList() {
            tableList(this.tableName, this.page.pageNo, this.page.pageSize).then((response) => {
                this.page = response.data;
            });
        },
        //多选框选择触发函数
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //代码生成
        /**
         * 代码生成
         * @param flag 0：选中表生成  1：传SQL生成
         */
        code(flag = 0) {
            if (this.multipleSelection.length > 0 || flag === 1) {
                this.setGeneratorEntity(this.formData)
                this.setGenerateBySqlRequestVO(this.generateBySqlRequestVO)
                this.setIsUse(this.isUse)
                let tableNames = []
                this.multipleSelection.forEach(tableName => {
                    tableNames.push(tableName.tableName)
                })
                createCode(flag, this.formData, this.generateBySqlRequestVO, this.isUse, tableNames).then(response => {
                    const blob = new Blob([response], {type: 'application/zip'})
                    saveAs(blob, "xiaofei-generator");
                })
            } else {
                this.$message.info("请选择需要生成代码的表")
            }
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.tableList()
        },
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.tableList()
        },
        //清空SQL语句填写表单
        clearSqlAndDelimiter() {
            this.generateBySqlRequestVO = {
                sql: "",
                delimiter: ""
            }
            this.setGenerateBySqlRequestVO(this.generateBySqlRequestVO)
        },
        //打开表单
        dialogOpen() {
            if (this.multipleSelection.length > 0) {
                this.dialogVisible = true
            } else {
                this.$message.info("请选择需要生成代码的表")
            }
        },
        //导入SQL
        createBySql() {
            this.dialogVisibleBySql = true
        },
        //dialog中表单清空
        dialogCancel() {
            this.dialogVisible = false
        },
        //dialog中表单清空
        dialogCancelBySql() {
            this.dialogVisibleBySql = false
        },

    },
}
</script>

<style scoped>
.customer-line-height {
    margin: 10px 0;
}
</style>
