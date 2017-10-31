<template>
  <div class="game">
    <p>{{msg}}</p>

    <canvas id="game">

    </canvas>
  </div>
</template>

<script>
import GameContext from "./../js/GameContext.js";
import Character from "./../js/Character.js"

export default {
  name: 'Game',
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
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    this.vars.canvas = new GameContext(ctx);
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
