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
    moveBanner (direction) {
      console.log('direction:', direction)
      if (!this.isTransition) return
      this.isTransition = true
      let currIdx = this.currIndex
      const listLen = this.list.length
      if (direction === 'next') {
        currIdx += 2

        // 复制出来的第一个跳下一个时，直接重置位置，跳第二个
        if (listLen + 2 <= currIdx) {
          this.isTransition = false
          this.currIndex = 0
          setTimeout(() => {
            this.isTransition = true
            this.currIndex = 2
          })
          return
        }
      } else {
        currIdx -= 2

        // 第一个跳前一个，位置定位到复制出来的第一个，再跳前一个
        if (currIdx < 0) {
          currIdx = listLen % 2 === 0 ? listLen : listLen + 1
          this.isTransition = false
          this.currIndex = currIdx
          setTimeout(() => {
            this.isTransition = true
            this.currIndex = currIdx - 2
          })
          return
        }
      }
      this.currIndex = currIdx
    }
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
