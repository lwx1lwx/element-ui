<template>
    <div id="demo">
        <button v-on:click="show = !show">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
        <div id="example-3">
            <button @click="shows = !shows">
                Toggle render
            </button>
            <transition
                name="test">
                <p v-if="shows">hellodwewjdjjdkkewwoxianghuijiazhaozhouliu</p>
            </transition>
        </div>
        <!-- <div id="example-4">
            <input type="radio" name="end" checked="checked" value="view">
            <input type="radio" name="end">
            <transition name="component-fade" mode="out-in">
                <component v-bind:is="view"></component>
            </transition>
        </div> -->
        <div id="list-complete-demo" class="demo">
            <button v-on:click="shuffle">Shuffle</button>
            <button v-on:click="add">Add</button>
            <button v-on:click="remove">Remove</button>
            <transition-group name="list-complete" tag="p">
                <span
                v-for="item in items"
                v-bind:key="item"
                class="list-complete-item"
                >
                {{ item }}
                </span>
            </transition-group>
            </div>
            <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
    </div>
</template>
<script>
    
    export default {
        
        data() {
            return {
                show: true,
                shows: true,
                view: 'v-a',
                items: [1,2,3,4,5,6,7,8,9],
                nextNum: 10,
                message: 'hello!'
            }
        },
        
        methods: {
            randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
            },
            add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
            },
            remove: function () {
            this.items.splice(this.randomIndex(), 1)
            },
            shuffle: function () {
            this.items = _.shuffle(this.items)
            }
        }
    }
</script>
<style lang="less" scoped>
// .fade-enter-active, .fade-leave-active {
//   transition: opacity .5s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
// .tada {
//   animation: bounce-in .5s;
// }
// .bounceOutRight {
//   animation: bounce-in .5s ease;
// }
.test-enter-active {
  animation: bounce-in .5s;
}
.test-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(10);
  }
  100% {
    transform: scale(1);
  }
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>