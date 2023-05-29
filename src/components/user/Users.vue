<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片式图区 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="7">
                <el-input clearable v-model="userListQuery.query" placeholder="请输入内容" @clear="getUserList" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table
            border
            stripe
            :data="userList">
                <el-table-column
                    type="index"
                    label="#">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话">
                </el-table-column>
                <el-table-column
                    prop="role_name"
                    label="角色">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch @change="userStateChange(scope.row)" v-model="scope.row.mg_state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 分配角色按钮 -->
                        <el-tooltip :enterable="false" class="item" effect="dark" content="修改" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" class="item" effect="dark" content="删除" placement="top-start">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top-start">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoles(scope.row)"></el-button>
                        </el-tooltip>
                        
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userListQuery.pagenum"
            :page-sizes="[1, 3, 5, 10]"
            :page-size="userListQuery.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加用户的对话框 -->
        <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed">
            <!-- 内容主体 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog
            title="修改用户"
            :visible.sync="editDialogVisible"
            width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editFormConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配角色对话框 -->
        <el-dialog
        title="分配角色"
        :visible.sync="setRoleialogVisible"
        width="50%"
        @closed="setRoleDialogClosed">
            <!-- 当前用户信息 -->
            <p>当前的用户：{{userInfo.username}}</p>
            <p>当前的角色：{{userInfo.role_name}}</p>
            <p>分配新角色：
                <el-select v-model="selectRole" placeholder="请选择">
                    <el-option
                    v-for="item in rolesList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRoleialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="setRolesConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

export default {
    data() {
        // 自定义验证邮箱
        var checkEmail = (rule,value,cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(value)) {
                // 合法的邮箱
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        // 自定义验证手机号
        var checkPhone = (rule,value,cb) => {
             // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (regMobile.test(value)) {
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }
        return {
            userListQuery: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            userList: [],
            total: 0,
            // 控制对话框的显示与隐藏
            addDialogVisible: false,
            // 修改用户对话框是否显示
            editDialogVisible: false,
            // 添加用户表单数据
            addForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            // 添加表单验证规则
            addFormRules: {
                username: [
                    { required: true, message: '请输入用名', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail,trigger: 'blur'}
                ],
                mobile: [
                    { required: true, message: '请输入手机', trigger: 'blur' },
                    { validator: checkPhone,trigger: 'blur'}
                ]
            },
            editForm: {},
            editFormRules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail,trigger: 'blur'}
                ],
                mobile: [
                    { required: true, message: '请输入手机', trigger: 'blur' },
                    { validator: checkPhone,trigger: 'blur'}
                ]
            },
            // 控制分配角色显示与隐藏
            setRoleialogVisible: false,
            // 树形控件的属性绑定
            treeRoleProps:[],
            // 当前用户信息
            userInfo: {},
            // 角色列表
            rolesList: [],
            // 已选中的角色id
            selectRole: ''
        }
    },
    created() {
        this.getUserList()
    },
    methods: {

        async getUserList() {
            const res = await this.$http.get('users', {params: this.userListQuery})
            console.log('getUserList',res)
            if(res.data.meta.status != 200) return this.$message.error('获取用户列表失败！')
            this.userList = res.data.data.users
            this.total = res.data.data.total

        },
        // 拿到最新的pagesize
        handleSizeChange(newSize) {
            console.log('newSize',newSize)
            this.userListQuery.pagesize = newSize
            this.getUserList()
        },
        // 监听页码值改变
        handleCurrentChange(newPage) {
            console.log(newPage)
            this.userListQuery.pagenum = newPage
            this.getUserList()
        },
        // 监听swith状态改变
        async userStateChange(userInfo) {
            console.log(userInfo)
            const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            console.log('userStateChange',res)
            if (res.meta.status !== 200) {
                userInfo.mg_state = !userInfo.mg_state
                return this.$message.error('更新用户状态失败！')

            } 
            this.$message.success('更新用户状态成功！')
        },
        // 监听添加对话框的关闭 表单重置
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                console.log(valid)
                if (!valid) return
                //添加用户请求
                // 解构赋值
                const {data:res} = await this.$http.post('users',this.addForm)
                console.log('addUser',res)
                if (res.meta.status !== 201) {
                    this.$message.error('添加用户失败！')
                }
                this.$message.success('添加用户成功！')
                this.addDialogVisible = false
                // 重新获取用户列表
                this.getUserList()
            })

        },
        // 编辑对话框
        async showEditDialog(id) {
            // console.log(id)
            // 查询用户信息
            const {data:res} = await this.$http.get('users/' + id)
            console.log('showEditDialog',res)
            if(res.meta.status !== 200) {
                return 
            }
            this.editForm = res.data
            this.editDialogVisible = true
        },
        // 监听修改对话框关闭
        // 表单重置
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        editFormConfirm() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return
                const {data:res} = await this.$http.put('users/' + this.editForm.id,{
                    email: this.editForm.email,
                    mobile: this.editForm.mobile
                })
                console.log('editFormConfirm',res)
                if(res.meta.status !== 200) {
                    return this.$message.error('更新用户信息失败！')
                }
                this.$message.success(res.meta.msg)
                this.editDialogVisible = false
                this.getUserList()
            })
        },
        // 根据id删除用户
        async removeUser(id) {
            const resultConfirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // 捕获错误消息
            }).catch(err => err)
            console.log(id)
            console.log(resultConfirm)
            // 用户确认删除返回字符串confirm 点击取消返回cancel
            if(resultConfirm !=='confirm') {
                return this.$message.info('已经取消删除')
            }
            const {data:res} = await this.$http.delete('users/' + id)
            if(res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.$message.success(res.meta.msg)
            this.getUserList()
            
        },
        // 展示分配角色对话框
        setRoles(userInfo) {
            // 保存在前用户信息
            this.userInfo= userInfo
            // 获取所有角色列表
            this.getRolesList()
            this.setRoleialogVisible = true
        },
        // 获取所有角色列表
        async getRolesList() {
           const {data:res} = await this.$http.get('roles')
           console.log('getRolesList',res)
           if(res.meta.status !== 200) {
               return this.$message.error(res.meta.msg)
           }
           this.rolesList = res.data
        },
        // 监听分配权限的对话框关闭
        setRoleDialogClosed() {
            this.selectRole = '',
            this.userInfo = {}
        },
        // 点击确定分配角色
        async setRolesConfirm() {
            if(!this.selectRole) {
                return this.$message.error('请选择要分配的角色')
            }
            const {data:res} = await this.$http.put(`users/${this.userInfo.id}/role`,
            {
                rid:this.selectRole
            })
            console.log('getRolesList',res)
            if(res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.$message.success(res.meta.msg)
            this.getUserList()
            this.setRoleialogVisible = false
        }
    }
}
</script>
<style lang="less" scoped>
.el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)!important;
}

</style>