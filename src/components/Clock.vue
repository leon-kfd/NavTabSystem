<template>
  <div id="Clock">
    <div class="time">{{now}}</div>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {
      timer: null,
      now: ''
    }
  },
  created () {
    this.now = this.getNowTime()
    this.timer = setInterval(() => {
      this.now = this.getNowTime()
    }, 5000)
  },
  methods: {
    getNowTime () {
      const h = new Date().getHours()
      const m = new Date().getMinutes()
      return `${h}:${m < 10 ? '0' + m : m}`
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang='scss' scoped>
.time {
  font-family: -apple-system, BlinkMacSystemFont, 'Neue Haas Grotesk Text Pro',
    'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>
