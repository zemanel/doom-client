<template>
    <div class="demon" @click="kill"><img :src="demonImage"/></div>
</template>

<script>
/* eslint-disable no-console,vue/no-async-in-computed-properties,no-undef,no-unused-vars */

export default {
  name: 'Demon',
  data () {
    return {
      demonImage: require('../assets/' +
        this.demon.type.toLowerCase() +
        '-walk.gif')
    }
  },
  props: {
    demon: Object,
    player: Object
  },
  methods: {
    kill (event) {
      const demonId = this.demon.id
      let type = this.demon.type.toLowerCase()
      this.$emit('shot', demonId)
      if (this.player.shotgunAmmo !== 0 && this.demon.health > 0) {
        this.demonImage = require('../assets/' + type + '-shot.gif')
        setTimeout(function () {
          this.demonImage = require('../assets/' + type + '-walk.gif')
        }, 1000)
      } else if (this.demon.health < 0) {
        this.demonImage = require('../assets/' + type + '-dead.gif')
      } else {
        this.demonImage = require('../assets/' + type + '-walk.gif')
      }
    }
  },
  created () {
    let type = this.demon.type.toLowerCase()
    if (this.demon.health < 0) {
      this.demonImage = require('../assets/' + type + '-dead.png')
    }
  }
}
</script>

<style scoped>
.demon {
  display: inline-block;
}

img {
  height: 16vh;
}
</style>
