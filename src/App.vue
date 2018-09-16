<template>
    <div id="app">
        <div class="play">
            <h2 ref="failed" id="failed"></h2>
            <div class="demons">
                <div v-for="(demon, index) in  demons"
                     v-bind:key="demon.id"
                     v-bind:data-index="index">
                    <Demon v-on:shot="killDemon" :demon="demon" :player="player"></Demon>
                </div>
            </div>
            <div class="player">
                <div class="health info"><span>{{player.health}}%</span><strong>health</strong></div>
                <div class="face"><img src="./assets/lookingaround.gif"/></div>
                <div class="ammo info"><span>{{player.shotgunAmmo}}</span><strong>ammo</strong></div>
            </div>

        </div>
    </div>
</template>

<script>
/* eslint-disable no-console */
import Demon from './components/Demon'
import axios from 'axios'
import config from './config'

export default {
  name: 'app',
  data () {
    return {
      demons: {},
      player: {}
    }
  },
  components: {
    Demon
  },
  methods: {
    killDemon: function (demonId) {
      if (this.player.shotgunAmmo > 0) {
        axios
          .post(`${config.DOOM_ENGINE_SERVICE_URL}/shootDemon`, {
            demonId: demonId,
            weapon: 'shotgun'
          })
          .then(() => {
            console.log('shot demon: ' + demonId)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        alert('Mission Failed!')
      }
    },

    loadData: function () {
      axios.get(`${config.DOOM_STATE_SERVICE_URL}/state`).then(response => {
        const data = response.data
        this.player = data.player
        this.demons = data.demons
      })
    }
  },
  mounted () {
    this.loadData()

    setInterval(
      function () {
        this.loadData()
      }.bind(this),
      1000
    )
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P");
#app {
  font-family: "Press Start 2P", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: transparent url("./assets/background.jpg") no-repeat top center;
  background-size: cover;

  margin: 0;
}

.demons {
  padding-top: 15%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

img {
  height: 70%;
}

.player {
  width: 100vw;
  background: transparent url("./assets/brick-texture.jpg") repeat center center;
  background-size: contain;
  height: 20vh;
  position: absolute;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info {
  background: transparent url("./assets/rock-texture.jpg") repeat center center;
  height: calc(100% - 8px);
  width: auto;
  padding: 0 2%;
  font-size: 3em;
  font-weight: bold;
  position: relative;
  border: 4px solid #1b1e21;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}

.info span {
  color: #8b0000;
}

.info strong {
  text-transform: uppercase;
  color: #9f9f9f;
}

.face {
  background: #1b1b1b;
  height: calc(100% - 8px);
  width: auto;
  padding: 0 0.2%;
  display: flex;
  border: 4px solid #434343;
  justify-content: center;
  align-items: center;
}
#failed {
  position: absolute;
  font-size: 4em;
  color: #9b0000;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  margin: 0 auto;
  top: 40%;
}
</style>
