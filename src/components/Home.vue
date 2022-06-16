<template>
    <el-container class="home-container">
        <!-- 页面头部 -->
        <!-- 每一个组件名就是类名 -->
        <el-header>
            <div class="home-header">
                <img class="" src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">登出</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="collapse ? '64px' : '200px'">
                <!-- 侧边栏菜单 -->
                <div class="toggle-button" @click="toggleClick">|||</div>
                <!-- 动态绑定属性值才能生效布尔值 -->
                <!-- 开启router，路由为index值 -->
                <el-menu
                    router
                    :collapse="collapse"
                    :collapse-transition="false"
                    :unique-opened = "true"
                    background-color="#92AFC1"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path + ''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                            <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                        </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default { 
        data() {
            return {
                menuList: [],
                iconsObj: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                // 是否折叠
                collapse: false,
                // 动态路径
                activePath: ''
                
            }
        },
        created() {
            this.getMenuList()
            // 页面刷新还是显示当前链接
            this.activePath = window.sessionStorage.getItem('activepath')
        },
        methods: {
            logout() {
                // 登出原理清空token
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            async getMenuList() {
                const {data: res} = await this.$http.get('menus')
                if (res.meta.status === 200) {
                    this.menuList = res.data
                } else {
                    this.$message.error(res.meta.msg)
                }
                console.log(res)
            },
            toggleClick() {
                this.collapse = !this.collapse
            },
            // 保存链接的激活状态
            saveNavState(path) {
                window.sessionStorage.setItem('activepath',path)
                this.activePath = path
            }
        }
    }
</script>
<style lang="less" scoped>
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
}
.el-aside {
    background-color: #92AFC1;
    .el-menu {
        border-right: none;
    }
}
.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.el-main  {
    background-color: #eaedf1;
}
.home-container {
    height: 100%;
}
.home-header {
    display: flex;
    align-items: center;
    img {
        width: 50px;
        margin: auto 10px;
        
    };
}
.iconfont {
  margin-right: 10px;
}
</style>