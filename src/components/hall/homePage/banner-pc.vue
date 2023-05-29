<template>
  <div class="header-banner">
    <swiper class="swiper-wrap">
      <swiper-slide v-for="(item,index) in swiperList" :key="index" class="swiper-item">
        <img :src="item" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper,SwiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      swiperList: [
        'https://ecuniplatform-static.kiehls.com.cn/medias/04-%E5%80%92%E8%AE%A1%E6%97%B6kv-1920x550_64bcbae9658a446cad0437206bad4911/04-%E5%80%92%E8%AE%A1%E6%97%B6kv-1920x550.jpg',
        'https://ecuniplatform-static.kiehls.com.cn/medias/03-%E5%87%80%E6%BE%88%E7%BB%B4%E7%A8%B3kv-1920x550_7f4f6d60fa8240d69cd554899477ca13/03-%E5%87%80%E6%BE%88%E7%BB%B4%E7%A8%B3kv-1920x550.jpg',
        'https://ecuniplatform-static.kiehls.com.cn/medias/01-%E5%8F%8C12kv_a038cdbce37b4f5abc8204859b9e0b08/01-%E5%8F%8C12kv.jpg'
      ]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<style scoped>
.header-banner {
  max-width: 1280px;
  height: 360px;
}
.header-banner img {
  display: block;
    width: 100%;
    height: 100%;
}
</style>