<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片式图区 -->
        <el-card class="box-card">
            <!-- 权限列表区域 -->
            <el-table
            border
            stripe
            :data="rightsList">
                <!-- 索引列 type=index-->
                <el-table-column
                    type="index"
                    label="#">
                </el-table-column>
                <el-table-column
                    prop="authName"
                    label="权限名称">
                </el-table-column>
                <el-table-column
                    prop="path"
                    label="路径">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="权限等级">
                    <!-- 用户拥有有角色，角色赋予权限 -->
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
                        <el-tag v-else-if="scope.row.level === '2'" type="warning">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userListQuery.pagenum"
            :page-sizes="[1, 3, 5, 10]"
            :page-size="userListQuery.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination> -->
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rightsList: []

        }
    },
    created() {
        this.getRightsList()
    },
    methods: {
        // 获取权限列表·
        async getRightsList() {
            const {data:res} = await this.$http.get('rights/list')
            if(res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.rightsList = res.data
        }
    }
}
</script>
<style lang="less" scoped>
</style>