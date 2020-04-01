# vue-index-box
**simple index list for vue**   

**vue 索引列表组件**
## Installation
```
npm install --save vue-index-box
```

### Basic Usage
```js
import { IndexBox, IndexAnchor } from 'vue-index-box';
//or    
import indexBox from 'vue-index-box';
Vue.use(indexBox);
```

### IndexBox
| Prop             | Data Type | Required|Default| Description        |
| ---------------- | --------- |-------- |-------|------------------ |
| fixAnchor             | Boolean    | false   |    false   | fiexed index anchor.    |
| indexs        | Array   | false   | A-Z   | custom index.|
| showIndexTip        | Boolean    | false   |  true   |whether to show tips after clicking on the index item.  |  
### IndexAnchor
| Prop             | Data Type | Required|Default| Description        |
| ---------------- | --------- |-------- |-------|------------------ |
| title             | String    | false   |       | anchor title.    |
| index        | String   | true   |   | index of anchor.|
| zIndex        | Number    | false   |  1   | z-index|  
 
### example
```html
<div id="app">
  <IndexBox @select="onSelect">
    <div v-for="(item,i) in indexList" :key="item.title">
      <IndexAnchor :title="item.title" :index="getIndex(i)"/>
      <div v-for="item in list">{{item.content}}</div>
    </div>
  </IndexBox>
</div>
```
``` js
  <script>
  export default {
  name: 'App',
  data() {
    return {
      indexList: [{title: 'A', content: 'text...'},...],
    }
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
}
  </script>
```
### custom index  
please passing array to **indexs**, at the same time props **index** in IndexAnchor have to be String
```html
<div id="app">
  <IndexBox :indexs="indexs" @select="onSelect">
    <div v-for="(item,i) in indexList" :key="item.title">

      <IndexAnchor :title="item.title" :index="`${i}`"/>
      <div>{{item.content}}</div>
    </div>
  </IndexBox>
</div>
```
``` js
  <script>
  export default {
  name: 'App',
  data() {
    return {
      indexList: [{title: '1', content: 'text'},...],
      indexs: [1,2,3,4,5,....],
    }
  },
  methods: {
    onSelect(e) {
      console.log(e);
    },
  },
}
  </script>
```