<template>
    <div>
        <el-row :gutter="20" style="margin: 50px 0">
            <el-col :span="12" :offset="6">
                <el-col :span="4">
                    <el-input clearable v-model="tableName" placeholder="输入要过滤的表名"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="success" @click="tableList">查询</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="code">生成</el-button>
                </el-col>
            </el-col>
            <el-col :span="12" :offset="6">
                <el-table ref="multipleTable" :data="page.items" tooltip-effect="dark"
                          style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"/>
                    <el-table-column prop="tableName" label="表名" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="tableComment" label="表备注" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                </el-table>
            </el-col>
            <el-col style="margin-top: 20px;" :span="12" :offset="6">
                <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                               :current-page="page.pageNo" :total="page.itemCount" background
                               :page-sizes="[10,20,30,40,50]" :page-size="page.pageSize"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {tableList, createCode} from "@/api/gen";
import {saveAs} from 'file-saver'

export default {
    created() {
        this.tableList();
    },
    data() {
        return {
            page: {
                pageNo: 1,
                pageSize: 10,
                pageTotal: 3,
                itemCount: 30,
                items: [],
                item: null,
                hasPrevious: true,
                hasNext: false
            },
            tableName: "",
            multipleSelection: [],
        };
    },
    methods: {
        tableList() {
            tableList(this.tableName, this.page.pageNo, this.page.pageSize).then((response) => {
                this.page = response.data;
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        code() {
            if (this.multipleSelection.length > 0) {
                let tableNames = []
                this.multipleSelection.forEach(tableName => {
                    tableNames.push(tableName.tableName)
                })
                createCode(tableNames).then(response => {
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
        }
        ,
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.tableList()
        }
        ,
    },
}
;
</script>

<style>
</style>
