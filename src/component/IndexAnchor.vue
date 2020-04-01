<template>
<div class="ve-index__anchor" :style="{'height': active ? `${height}px` : null}">
  <div
    class="ve-index__anchor--inner"
    :class="{'ve-anchor__active':active }"
    :style="styles"
  >
    <slot>{{title}}</slot>
  </div>
</div>
</template>

<script>
import '../assets/css/anchor.css';

export default {
  name: 'IndexAnchor',
  data() {
    return {
      offsetTop: 0,
      active: null,
      height: null,
    };
  },
  methods: {
    update({ top }) {
      this.active = true;
      this.offsetTop = top;
    },
    reset() {
      this.active = false;
      this.offsetTop = 0;
    },
  },
  computed: {
    styles() {
      if (this.active) {
        return `
        height: ${this.height}px; 
        transform: translate3d(0, ${this.offsetTop}px,0);
        z-index:${this.zIndex};
        `;
      }
      return '';
    },
  },
  props: {
    title: {
      type: String,
      default: () => '',
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    index: {
      type: String,
      required: true,
    },
  },
  inject: {
    IndexParent: {
      default: null,
    },
  },
  beforeDestroy() {
    const { anchors } = this.IndexParent;
    const self = this;
    this.IndexParent.anchors = anchors.filter((anchor) => anchor !== self);
  },
  mounted() {
    const { anchors } = this.IndexParent;
    this.height = this.$el.offsetHeight;
    this.IndexParent.anchors = [].concat(anchors, this);
  },
};
</script>

<style>

</style>
