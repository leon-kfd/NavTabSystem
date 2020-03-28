<template>
  <div id="Search">
    <div class="search-engine-selector">
      <svg viewBox="0 0 1024 1024"
           width="24"
           height="24">
        <path d="M213.333333 128v682.666667l158.72 85.333333L768 674.986667v-174.506667L416.853333 381.866667l68.693334 165.973333L594.773333 597.333333 371.2 721.92V182.186667L213.333333 128"></path>
      </svg>
    </div>
    <input class="search-input-box" />
    <div class="search-btn">
      <svg viewBox="0 0 1024 1024"
           width="22"
           height="22">
        <path d="M419.405333 0c231.683703 0 419.456512 185.265077 419.456512 413.724553a408.862625 408.862625 0 0 1-101.179298 269.55557l275.748132 280.098278a35.108244 35.108244 0 0 1-0.767673 50.154634 36.336521 36.336521 0 0 1-50.819951-0.716495l-275.49224-279.944743a421.19657 421.19657 0 0 1-266.945482 94.628488C187.823987 827.500285 0 642.235208 0 413.724553 0 185.265077 187.823987 0 419.405333 0z m0 70.932983c-191.918243 0-347.499965 153.483416-347.499965 342.79157 0 189.359333 155.581722 342.842749 347.499965 342.842749s347.551143-153.534594 347.551144-342.842749c0-189.359333-155.581722-342.791571-347.499965-342.79157z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
#Search {
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 1.5rem auto;
  height: 2.4rem;
  border-radius: 4px;
  box-shadow: 0 0.3px 1px #aab, 0 0.5px 2px #ccd;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    box-shadow: 0 0.3px 4px #aab, 0 0.5px 6px #ccd;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .search-engine-selector {
    padding: 0 12px;
    display: inline-flex;
    border-right: 1px solid #ccc;
    svg path {
      fill: var(--textColor);
    }
  }
  .search-input-box {
    flex: 1;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
    padding: 0 10px;
    font-size: 1.2rem;
    font-weight: 500;
    color: #363640;
  }
  .search-btn {
    width: 2rem;
    height: 2rem;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    svg path {
      fill: #262626;
    }
  }
}
</style>
