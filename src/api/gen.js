import request from '@/utils/request'

/**
 * 获取表的信息
 */
export function tableList(tableName, pageNo = 1, pageSize = 10) {
    return request({
        url: `/list`,
        method: "get",
        params: {
            tableName: tableName,
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
}

export function createCode(generatorEntity, isUse, tableNames) {
    return request({
        url: `/create`,
        method: "post",
        responseType: 'blob',
        data: {
            generatorEntity: generatorEntity,
            isUse: isUse,
            tableNames: tableNames
        }
    })
}

