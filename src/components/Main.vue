<template>
  <div class="main">
    <p>{{msg}}</p>

    <canvas id="canvas_1">

    </canvas>

    <canvas id="canvas_2">

    </canvas>
  </div>
</template>

<script>
import Context from "./../js/Context.js";

export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  // Needs to be done to handle the scope
  created: function() {
    this.vars = {
      canvas: null
    }
  },

  //Letting the external
  mounted: function(){
    var canvas_1 = document.getElementById("canvas_1");
    var canvas_2 = document.getElementById("canvas_2");
    var ctx_1 = canvas_1.getContext("2d");
    var ctx_2 = canvas_2.getContext("2d");
    this.vars.canvas = new Context(ctx_1);
    this.vars.canvas = new Context(ctx_2);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  position: relative;
}
canvas {
  border: 1px solid black;
  margin-top: 10px;
  /* position: absolute; top: 0; left: 0; */
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
