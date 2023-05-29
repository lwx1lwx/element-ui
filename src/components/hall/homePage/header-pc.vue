<template>
  <div class="homePage">
    <div class="w">
      <div class="cookie-main">
        <p>
          浏览该网站表示您接受并同意我们使用cookies为您提供个性化的浏览体验。点击
          Cookies政策
        </p>
      </div>
      <!-- <div class="f1">
                <ul>
                    <li>e商城欢迎您</li>
                    <li> 
                        <a href="#">请登录</a>
                        <a href="#" class="style-red">免费注册</a>
                    </li>
                </ul>
            </div>
            <div class="f2">
                <ul>
                    <li><a href="#">我的订单</a></li>
					<li class="spacer"></li>
					<li>
						<a href="#">我的品优购</a>
					</li>
					<li class="spacer"></li>
					<li><a href="#">品优购会员</a></li>
					<li class="spacer"></li>
					<li><a href="#">企业采购</a></li>
					<li class="spacer"></li>
					<li><a href="#">关注品优购</a></li>
					<li class="spacer"></li>
					<li><a href="#">客户服务</a></li>
					<li class="spacer"></li>
					<li><a href="#">网站导航</a></li>
                </ul>
            </div>
            <div class="clear"></div> -->
    </div>
    <div class="header-default">
      <div class="top-bar">
        <div class="f1">
        <div class="tap-item">
          <ul>
            <li><a href="#">订阅电子杂志</a></li>
            <li class="spacer"></li>
            <li><a href="#">客服中心</a></li>
            <li class="spacer"></li>
            <li>
              <img
                src="https://ecuniplatform-static.kiehls.com.cn/750474837507526656/顺丰包邮_2c97d901-5cf2-4101-aa4d-ed29284c8100/顺丰包邮.png"
                alt=""
              />
            </li>
            <li class="spacer"></li>
            <li><a href="#">微信</a></li>
          </ul>
        </div>
        <div class="tap-select">选择适合您的护肤品</div>
        </div>
        <div class="logo">
          <img src="@/assets/header-logo.png" alt="" />
        </div>
        <div class="f2">
          <div class="account-section">
            <div class="login">
              <span>登录</span>
            </div>
            <div class="user-cart">
              <img class="cart-icon" src="@/assets/index-cart.png" alt="">
              <span>购物袋</span>
              <span>(0)</span>
            </div>
          </div>
          <div class="search-section">
            <div class="see-product">
              <span>查看所有产品</span>
            </div>
            <div class="to-try">
              <span>先试后买计划</span>
            </div>
            <div class="input-section">
              <input type="text" placeholder="淡斑安百瓶">
              <img class="search-icon" src="" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="menu-main">
        <div class="menu-content">
          <div class="menu-list">
            <div
              class="tab-item"
              v-for="(item, index) in tabList"
              :key="index"
            >{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabList: [{
        name: '12·12年终庆典'
      },{
        name: '面部护理'
      },{
        name: '男士护理'
      },{
        name: '头发护理'
      },{
        name: '认识Kiehls'
      },{
        name: 'K星俱乐部'
      }],
    }
  },
  methods: {
    checkComp(value) {
      const componentMap = {
        0: 'BasicInfo',
        1: 'DetailInfo',
        2: 'SelfServiceInfo',
      }
      this.componentName = componentMap[value]
    },
  },
}
</script>
<style lang="less" scoped>
.homePage li {
  float: left;
}
.homePage {
}
.header-default {
  background-color: #000;
  // padding: 0 80px;
  height: 170px;
  .tap-item img {
    display: block;
    width: 15px;
    height: 15px;
  }
}
.top-bar {
  height: 120px;
  padding: 15px 15px 0 15px;
  margin: 0 auto;
  position: relative;
  min-width: 1110px;
  max-width: 1152px;
  font-size: 15px;
}
.top-bar li {
  font-size: 12px;
  height: 15px;
  color: #fff;
  list-style: none;
}
.f1 {
  float: left;
  // height: 15px;
}
.tap-select {
  color: #ffffff;
  font-size: 12px;

}
.clear {
  clear: both;
}
.fixed-tab {
  height: 50px;
  float: left;
}
.fixed-tab::after {
  clear: both;
}
.tab-item {
  float: left;
  height: 100%;
  // width: 120px;
  color: #ffffff;
  // text-align: center;
  margin-right: 80px;
  line-height: 50px;
  font-size: 14px;
}
.cookie-main {
  position: relative;
  max-width: 1280px;
  height: 42px;
  padding: 0 20px;
  margin: 0 auto;
  background-color: #eeeeee;
  line-height: 42px;
  text-align: center;
}
.cookie-main p {
  font-size: 12px;
  text-align: center;
}
.tap-item {
  height: 25px;
  font-size: 12px;
  // height: 15px;
  color: #fff;
  margin-block: 10px;
  // list-style: none;
}
.logo {
  width: 28%;
  height: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  img {
    width: 100%;
    cursor: pointer;
  }
}
.menu-main {
  background-color: #000;
  height: 50px;
  position: relative;
  width: 100%;
}
.menu-content {
  width: 100%;
  height: 100%;
  min-width: 1110px;
  max-width: 1152px;
  line-height: 50px;
  padding: 0 15px;
  margin: 0 auto;
}
.menu-list {
  // float: left;
}
.f2 {
  float: right;
  font-size: 14px;
  margin-top: 37px;
}
.account-section {
  height: 23px;
  line-height: 23px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  .login {
    border-right: 1px solid #fff;
    padding-right: 10px;
  }
  .user-cart {
    .cart-icon {
      width: 30px;
      height: 23px;
    }
    padding-left: 10px;
    display: flex;
  }
}
.search-section {
  color: #fff;
  margin-top: 10px;
  height: 28px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .see-product {
    height: 28px;
    line-height: 28px;
    padding-right: 10px;
    border-right: 1px solid #fff;
  }
  .to-try {
    padding-left: 10px;
  }
  .input-section {
    padding-left: 10px;
    width: 200px;
    height: 28px;
    line-height: 28px;
    input {
      height: 28px;
      width: 100%;
      border: 1px solid #000;
      outline: none;
      background-color: #fff;
      font-size: 14px;
      padding: 0 10px;
      line-height: 28px;
      color: #000;
      vertical-align: middle;
    }
  }
}
</style>
