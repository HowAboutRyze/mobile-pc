<template>
  <div>
    <h1>手机foo</h1>
    <router-link to="/">首页</router-link>
    <div class="banner-wrap">
      <ul
        :class="{ 'banner': true, 'banner-transition': isTransition }"
        :style="bannerStyle"
      >
        <li
          class="item"
          v-for="(item, index) in resList"
          :key="index"
        >{{ item }}</li>
      </ul>
      <a href="#" class="prev-btn" @click.stop="moveBanner('prev')">&lt;</a>
      <a href="#" class="next-btn" @click.stop="moveBanner('next')">&gt;</a>
    </div>
  </div>
</template>
<script>
import { throttle } from '../../assets/js/utils'
export default {
  name: 'MobileFoo',
  data () {
    return {
      list: [1, 2, 3, 4, 5],
      currIndex: 0,
      isTransition: true
    }
  },
  computed: {
    resList () {
      const _list = this.list
      if (_list.length % 2) {
        _list.push('empty')
      }
      return _list.concat(_list)
    },
    bannerStyle () {
      const itemWidth = 360
      const itemMarginRight = 20
      const toX = -(itemWidth + itemMarginRight) * this.currIndex
      console.log('banner:', this.currIndex, toX)
      return {
        transform: `translate3d(${toX / 100}rem, 0, 0)`
      }
    }
  },
  methods: {
    moveBanner: throttle(function (direction) {  // 要做防抖！！
      console.log('ddd:', direction)
      this.isTransition = true
      let currIdx = this.currIndex
      const listLen = this.list.length
      if (direction === 'next') {
        currIdx += 2

        // 最大数的下一个，为复制出来的第一位
        if (currIdx >= listLen) {
          currIdx = listLen % 2 === 0 ? listLen : listLen + 1
          this.currIndex = currIdx
          setTimeout(() => {
            this.isTransition = false
            this.currIndex = 0
          }, 400)
        }
      } else {
        currIdx -= 2

        // 最大数的下一个，为复制出来的第一位
        if (currIdx < 0) {
          currIdx = listLen % 2 === 0 ? listLen : listLen + 1
          this.isTransition = false
          this.currIndex = currIdx
          setTimeout(() => {
            this.isTransition = true
            this.currIndex = currIdx - 2
          })
        }
      }
      this.currIndex = currIdx
      console.log('move', this.currIndex)
    }, 400, { trailing: false }) 
  }
}
</script>
<style lang="scss">
@function rem($px){//$px为需要转换的字号
    @return $px / 100 * 1rem; //100px为根字体大小
}
.banner-wrap {
  overflow: hidden;
  width: rem(740);
  height: rem(300);
  margin: 0 auto;
  border: rem(1) solid red;
}
.banner {
  display: flex;
  &.banner-transition {
    transition: all .4s ease;
  }
  .item {
    flex-shrink: 0;
    width: rem(360);
    height: rem(200);
    margin-right: rem(20);
    background-color: mix(red, yellow)
  }
}
</style>
