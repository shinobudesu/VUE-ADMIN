/**
 * 通用模块接口列表
 */

import axios from '@/api/axios.js'; // 导入http中创建的axios实例

const common = {
    // table列表  
    getList(params) {
        return axios.get(`/admin/common?${params}`);
    },
    // 单条信息详情
    getInfo(id) {
        return axios.get(`/admin/common/${id}`);
    },
    //新增信息
    addInfo(params) {
        return axios.post(`/admin/common`, params);
    },
    //修改信息
    edtInfo(id, params) {
        return axios.put(`/admin/common/${id}`, params);
    },
    //删除信息
    delInfo(id) {
        return axios.delete(`/admin/common/${id}`);
    },
    //excel 导出
    toExcel() {
        return axios.get(`admin/common`, {
            headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' },
            responseType: 'blob'
        });
    },
}
export default {
    common
};