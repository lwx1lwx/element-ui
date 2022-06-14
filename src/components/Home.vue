<template>
    <div>
        <el-button type="info" @click="logout"></el-button>
    </div>
</template>
<script>
    export default { 
        methods: {
            logout() {
                // 登出原理清空token
                window.sessionStorage.clear()
                this.$router.push('/login')
            }
        }
    }
</script>
<style lang="less" scoped></style>