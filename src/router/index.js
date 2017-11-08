import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from './../components/Main.vue';
import Game from './../components/Game.vue';
import Pan from './../components/Pan.vue';
import MyPan from './../components/MyPan.vue';

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
      name: 'MyPan',
      component: MyPan
    }
    // {
    //   path: '/',
    //   name: 'Pan',
    //   component: Pan
    // }
  ]
})
