<template>
  <div class="pan">
    <p>{{msg}}</p>

    <canvas id="canvas">

    </canvas>
    <br>
    <input id="btnStart" type="button" value="Start/Stop">
    <select id="comboBoxDirection">
      <option value="Left">Left</option>
      <option value="Right">Right</option>
      <option value="Middle">Middle</option>
    </select>
  </div>
</template>

<script>
import ClickPanContext from "./../js/ClickPanContext.js";

export default {
  name: 'ClickPan',
  data () {
    return {
      msg: 'Welcome to Your Vue.js CLICKPAN'
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
    //Making the offscreen canvas
    var offScreenCavnas = document.createElement("canvas");
    var offScreenCtx = offScreenCavnas.getContext("2d");

    this.vars.canvas = new ClickPanContext(ctx_1, offScreenCtx);
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
