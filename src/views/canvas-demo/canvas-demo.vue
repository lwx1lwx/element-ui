<template>
  <div id="demo">
    <img id="img" style="width: 200px;height: 200px;" src="@/assets/background2.jpeg" alt="">
    <canvas id="myCanvas" width="200" height="200" style="border: 1px solid #eee"></canvas>
  </div>
</template>
<script>
import imageUrl from '@/assets/background2.jpeg'
export default {
  data() {
    return {
      imageUrl: imageUrl
    }
  },
  mounted() {
    this.getCanvas()
  },
  
  methods: {
    getCanvas () {
      var c = document.getElementById("myCanvas")
      var cxt=c.getContext("2d");
      var img = document.getElementById("img");
      img.onload = function(){
          if(img.complete){
              cxt.drawImage(img,0,0,180,180)
          }
      }
    },
    
  },
}

</script>
<style lang="less" scoped>

</style>
