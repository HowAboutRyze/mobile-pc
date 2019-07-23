import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/mobile/HelloWorld'
import Foo from '@/components/mobile/Foo'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/foo',
      name: 'Foo',
      component: Foo
    }
  ]
})

/**
 * 验证
 */
router.beforeEach((to, from, next) => {
  if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = './#/'
    return
  }
  next()
})

export default router
