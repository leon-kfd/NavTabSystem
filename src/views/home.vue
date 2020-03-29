<template>
  <div id="home">
    <div class="center-wrapper clock-wrapper">
      <Clock />
    </div>
    <div class="center-wrapper">
      <Search />
    </div>
    <div class="center-wrapper keyboard-wrapper">
      <Keyboard />
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock'
import Search from '@/components/Search'
import Keyboard from '@/components/Keyboard'
export default {
  components: {
    Clock,
    Search,
    Keyboard
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
.center-wrapper {
  text-align: center;
  margin: 1rem;
}
.clock-wrapper {
  cursor: default;
  font-size: 8rem;
  letter-spacing: -5px;
  color: var(--textColor);
  user-select: none;
}
</style>
<style lang='scss'>
body {
  --textColor: #262626;
}
@media screen and (max-width: 820px) {
  .keyboard-wrapper {
    display: none;
  }
}
</style>
