<template>
  <div class="pan">
    <p>{{msg}}</p>

    <canvas id="canvas">

    </canvas>
    <br>
    <input id="btnStart" type="button" value="Start/Stop">
  </div>
</template>

<script>
import PanContext from "./../js/MyPanContext.js";

export default {
  name: 'MyPan',
  data () {
    return {
      msg: 'Welcome to Your Vue.js LALA'
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
    var canvas_1 = document.getElementById("canvas");
    var ctx_1 = canvas_1.getContext("2d");
    this.vars.canvas = new PanContext(ctx_1);
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
