<template>
    <div class="login-wrap">
        <div class="login-box">
            <div class="photo-box">
                <img src="../assets/wechat.jpg" alt="">
            </div>
            <!-- ref就是表单的实例对象 -->
            <el-form class="login-form" ref="loginFormRef" :rules="loginFormRules" :model="loginForm" label-width="0">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <el-form-item class="form-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            //表单验证规则
            loginFormRules: {
                //数组名与表单名一致
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
                            
            }
        }
    },
    methods: {
        reset() {
            //this指的就是当前实例对象
            // console.log(this)
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            // 将await紧挨着的函数加一个async
            // 表单验证
            this.$refs.loginFormRef.validate(async (valid) => {
                console.log(valid)
                if(!valid) return;
                const res = await this.$http.post('login', this.loginForm)
                console.log(res.data)
                if (res.data.meta.status === 200) {
                    // 也可以点.success
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    })
                    window.sessionStorage.setItem('token',res.data.data.token)
                    // setInterval(()=> {
                        this.$router.push('/home')
                    // },1000)
                } else {
                    console.log('服务器未响应')
                    this.$message.error('用户名或密码错误')
                }

            })
        }
    }
}
</script>
<!-- scope表示组件只在当前生效 less表示支持less语法 -->
<style lang="less" scoped>
.login-wrap {
    height: 100%;
    background-color:#4576a7;
    background: url('../assets/background5.jpeg');
    background-position: left bottom;
    // background-size: 100%;
}
.login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: url('../assets/background2.jpeg');
    background-position: -168px -68px;


}
.photo-box {
    position: absolute;
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #aaa;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
}
.login-form {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
}
.form-btn {
    display: flex;
    justify-content: flex-end;
}
</style>
