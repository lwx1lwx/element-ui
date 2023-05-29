<template>
    <div>
         <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片式图区 -->
        <el-card class="box-card">
            <!-- 添加角色按钮 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区域 -->
            <el-table
            border
            stripe
            :data="rolesList">
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <!-- <pre>{{scope.row}}</pre> -->
                        <el-row class="elRow" :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二，三级权限 -->
                            <el-col :span="19">
                                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                                <el-col :span="6">
                                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                                </el-col>
                                </el-row>
                            </el-col>
                            
                        </el-row>
                    </template>
                </el-table-column>
                <!-- 索引列 type=index-->
                <el-table-column
                    type="index"
                    label="#">
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    label="角色名称">
                </el-table-column>
                <el-table-column
                    prop="roleDesc"
                    label="角色描述">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <!-- 用户拥有有角色，角色赋予权限 -->
                    <template slot-scope="scope">
                        <el-tooltip :enterable="false" effect="dark" content="编辑" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" effect="dark" content="删除" placement="top-start">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" effect="dark" content="分配权限" placement="top-start">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRightDialog(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 分配权限对话框 -->
        <el-dialog
        title="分配权限"
        :visible.sync="setRialogVisible"
        width="50%"
        @closed="setDialogClosed">
            <!-- 树形控件 -->
            <el-tree :data="rightsList" :props="treeProps" show-checkbox :default-checked-keys="defKeys" :default-expand-all="true" node-key="id" ref="treeRef"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRight()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rolesList: [],
            // 控制分配权限对话框展示与否
            setRialogVisible: false,
            // 所有权限了列表
            rightsList: [],
            // 树形控件的属性绑定对象
            treeProps: {
                children: 'children',
                label: 'authName'
            },
            defKeys: [],
            roleId: ''
        }
    },
    created() {
        this.getRolesList()
    },
    methods: {
        // 获取所有角色列表
        async getRolesList() {
           const {data:res} = await this.$http.get('roles')
           console.log('getRolesList',res)
           if(res.meta.status !== 200) {
               return this.$message.error(res.meta.msg)
           }
           this.rolesList = res.data
        },
        // 根据id删除权限
        async removeRightById(role,rightId){
            const resultConfirm = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // 捕获错误消息
            }).catch(err => err)
            // 用户确认删除返回字符串confirm 点击取消返回cancel
            if(resultConfirm !=='confirm') {
                return this.$message.info('已经取消删除')
            }
            const {data:res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            if(res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.$message.success(res.meta.msg)
            role.children = res.data
            // 页面会重新渲染 展开合上
            // this.getRolesList()
        },
        // 展示分配权限的对话框
        async showRightDialog(role) {
            // 获取当前角色有的id
            this.getLeafKeys(role,this.defKeys)
            // 保存当前角色的id
            this.roleId = role.id
            // 获取所有权限数据
            const {data:res} = await this.$http.get('rights/tree')
            console.log('showRightDialog',res)
            if(res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.rightsList = res.data
            this.setRialogVisible = true

        },
        // 通过递归获取所有三级权限id保存在数组中
        getLeafKeys(node,arr) {
            // 如果当前节点不包含children属性,则是三级节点
            if(!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach(item => {
                this.getLeafKeys(item,arr)
            });
        },
        setDialogClosed() {
            this.defKeys = []
        },
        // 点击为角色分配权限
        async allotRight() {
            // 拿到所有半选，全选id
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys(),
            ]
            console.log(keys)
            const idStr = keys.join(',')
            console.log(idStr)
            const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.$message.success(res.meta.msg)
            this.setRialogVisible = false
            this.getRolesList()
        }
    }
}
</script>
<style lang="less" scoped>
.el-tag {
    margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}
.elRow {
    margin: 0 30px;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>