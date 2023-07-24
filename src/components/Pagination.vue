<template>
  <div class="pagination" :style="`--activeColor: ${activeColor}`">
    <div class="operation-btn prev" :class="activePage - 1 > 0 ? '' : 'disable'" @click="prev"><span></span></div>
    <div class="page-btn__wrap">
      <template v-if="pageCount > 8">
        <div
          class="page-btn"
          v-for="_, num in 4"
          :key="num"
          @click="changePage(num + 1)"
        >{{ num + 1 }}</div>
        <div class="page-btn ellipsis">...</div>
        <div
          class="page-btn"
          v-for="_, num in 4"
          :key="pageCount - num"
          @click="changePage(pageCount - 4 + num + 1)"
        >{{ pageCount - 4 + num + 1 }}</div>
      </template>
      <template v-else>
        <div
          class="page-btn"
          v-for="_, num in pageCount"
          :key="num"
          @click="changePage(num + 1)"
        >{{ num + 1 }}</div>
      </template>
      <div class="page-btn active" :style="`left: ${(activePage - 1) * (36 + 4)}px`">{{ activePage }}</div>
    </div>
    <div class="operation-btn next" :class="activePage + 1 < pageCount ? '' : 'disable'" @click="next"><span></span></div>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      default: 10,
    },
    activePage: {
      type: Number,
      default: 1,
    },
    activeColor: {
      type: String,
      default: 'var(--SUCCESS)',
    },
  },
  emits: ['update:activePage'],
  methods: {
    changePage(val) {
      this.$emit('update:activePage', val);
    },
    prev() {
      if (this.activePage - 1 > 0) this.changePage(this.activePage - 1);
    },
    next() {
      if (this.activePage + 1 < this.pageCount) this.changePage(this.activePage + 1);
    },
  },
};
</script>

<style lang="less">
  .pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: 'Fira Code';
  }
  .page-btn__wrap {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .operation-btn, .page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--RADIUS-LARGE);
    width: 36px;
    height: 36px;
    background-color: var(--BG);
    border: 1px solid var(--BG);
    color: var(--FG-0);
    font-size: var(--FONT-SM);
    margin: 0 2px;
    cursor: pointer;
  }
  .page-btn.ellipsis {
    cursor: default;
  }
  .page-btn.active {
    position: absolute;
    background-color: var(--activeColor);
    border-color: var(--activeColor);
    transition: left .3s ease-in-out;
    z-index: 2;
    cursor: default;
    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: transparent;
      border-radius: var(--RADIUS-LARGE);
      box-shadow: 0 5px 20px var(--activeColor);
      opacity: .2;
      z-index: -1;
    }
  }
  .operation-btn.disable {
    cursor: not-allowed;
    opacity: .5;
    &:hover > span { opacity: .5; }
  }
  .operation-btn > span {
    position: relative;
    display: block;
    width: 10px;
    height: 10px;
    opacity: .5;
    transition: opacity .3s ease-in-out;
    &::before, &::after {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      background-color: var(--FG-0);
    }
    &::before {
      width: 2px;
      height: 100%;
    }
    &::after {
      width: 100%;
      height: 2px;
    }
  }
  .operation-btn:hover > span { opacity: .9; }
  .prev > span {
    margin-left: 4px;
    transform: rotate(-45deg) scale(.8);
    &::before { left: 0; }
  }
  .next > span {
    margin-right: 4px;
    transform: rotate(45deg) scale(.8);
    &::before { right: 0; }
  }
</style>
