<template>
  <div id="app">
    <IndexBox @select="onSelect">
      <div v-for="(item) in indexList" :key="item.title">
        <IndexAnchor :title="item.title" :index="item.index"/>

        <SliderAction
          v-for="(child, i) in item.content" 
          :key="i" 
          class="index-item"
          :text="child.text"
          :showArrow="false"
          autoClose
        >
          <template slot="right">
            <div class="custom-action remove">remove</div>
            <div class="custom-action cancel">cancel</div>
          </template>
        </SliderAction>
      </div>
    </IndexBox>
  </div>
</template>

<script>
import {IndexBox, IndexAnchor } from '../../src';
import { SliderAction } from 'vue-slider-actions';
export default {
  name: 'App',
  data() {
    return {
      indexList: [],
      index: [],
    }
  },
  components: {
    IndexBox,
    IndexAnchor,
    SliderAction
  },
  methods: {
    onSelect(e) {
      console.log(e);
    },
    getIndex(i) {
      const char = 'A'.charCodeAt();
      return String.fromCharCode(char + i);
    },
  },
  mounted() {
    const text = 'Apple Banana Orange';
    const { getIndex } = this;
    for (let i= 0; i < 26; i++) {
      this.indexList.push({title:getIndex(i),index:getIndex(i), content: [{text},{text},{text}]});
      this.index.push(i)
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  touch-action: manipulation;
}
.index-item{
  padding-left: 8px;
  border-top: 1px solid #ddd;
}
.custom-action{
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 5px;
  color:#fff
}
.replay{
  background-color: #629dff;
}
.info{
  background-color:#dbdb4b;
}
.remove{
  background-color: rgb(244, 51, 60);
}
.cancel {
  background-color: #2c3e50;
}
</style>
