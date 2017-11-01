import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from './../components/Main.vue';
import Game from './../components/Game.vue';
import Pan from './../components/Pan.vue';

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'Pan',
      component: Pan
    }
  ]
})
