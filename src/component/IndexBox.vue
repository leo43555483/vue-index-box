/* eslint-disable max-len */
<template>
  <div class="ve-index__wrapper" @touchend="onTouchEnd">
    <ul
      class="ve-index__list"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
    >
      <li class="ve-index__tip" v-show="isShowIndexTip">{{currentIndex}}</li>
      <li
        ref="indexItem"
        class="ve-index__item"
        v-for="char in indexs"
        :class="{'ve-index__active': char === currentIndex}"
        :key="char"
        :data-index="char"
      >{{char}}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import { touchMixin, scollMixin } from '../mixins/index';
import {
  getCharacter,
  getScrollTop,
  getBoundingClientRect,
  getRootPageYOffset,
  throttle,
} from '../utils';
import '../assets/css/index.css';

export default {
  name: 'IndexBox',
  data() {
    return {
      currentIndex: null,
      active: false,
      touching: false,
      anchors: [],
    };
  },
  watch: {
    touching(touching) {
      if (touching) {
        document.body.classList.add('ve-index__touching');
      } else {
        document.body.classList.remove('ve-index__touching');
      }
    },
  },
  computed: {
    isShowIndexTip() {
      const { showIndexTip, currentIndex, active } = this;
      return showIndexTip && currentIndex !== null && active;
    },
  },
  methods: {
    onTouchStart(e) {
      e.stopPropagation();
      this.touchStart(e);
      this.scrollIntoView(e);
      this.touching = true;
    },

    onTouchMove(ev) {
      const run = (e) => {
        this.touchMove(e);
        e.preventDefault();
        const { direction } = this;
        if (direction === 'vertical') {
          this.scrollIntoView(e);
        }
      };
      throttle(run)(ev);
    },
    onTouchEnd() {
      this.resetStatus();
    },
    onScroll() {
      const { getOffsetTop, anchors } = this;
      const scollerViewTop = getBoundingClientRect(this.scoller).top;
      const scrollTop = getScrollTop(this.scoller);
      const anchorsOffset = anchors.map((anchor) => {
        const offsetTop = getOffsetTop(anchor.$el, scollerViewTop, scrollTop);
        return { offsetTop };
      });
      const anchorIndex = this.getActiveAnchor(anchorsOffset, scrollTop);
      // 未找到可激活索引锚
      if (anchorIndex === -1) {
        this.resetActiveIndex();
        return;
      }
      const currentIndex = this.indexs[anchorIndex];
      this.currentIndex = currentIndex;
      if (this.fixAnchor) {
        this.updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop);
      }
    },
    resetStatus() {
      this.active = false;
      this.touching = false;
    },
    resetActiveIndex() {
      // 重置当前激活索引
      if (this.currentIndex !== null) {
        if (this.fixAnchor) {
          const activeAnchorIndex = this.indexs.indexOf(this.currentIndex);
          this.anchors[activeAnchorIndex].reset();
        }
        this.currentIndex = null;
      }
    },
    getActiveAnchor(anchorsOffset, scrollTop) {
      const { anchors } = this;
      // eslint-disable-next-line no-plusplus
      for (let i = anchors.length - 1; i >= 0; i--) {
        const preHeight = i > 0 ? anchors[i - 1].height : 0;
        const reachTop = this.fixAnchor ? preHeight : 0;
        const top = anchorsOffset[i].offsetTop;
        if (top <= scrollTop + reachTop) return i;
      }
      return -1;
    },
    getOffsetTop(el, scollerViewTop, scrollTop) {
      const { scoller } = this;
      const elViewTop = el.getBoundingClientRect().top;
      if (scoller === window || scoller === document.body) {
        if (el === window) return 0;
        return elViewTop + getRootPageYOffset();
      }
      return elViewTop - scollerViewTop + scrollTop;
    },
    updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop) {
      const curIndex = this.indexs[anchorIndex];
      const preIndex = this.indexs[anchorIndex - 1];
      this.anchors.forEach((anchor) => {
        const { index } = anchor;
        if (index !== curIndex || index !== preIndex) anchor.reset();
      });

      const activeAnchorEle = this.anchors[anchorIndex];
      const offsetTop = anchorsOffset[anchorIndex].offsetTop - scrollTop;
      if (anchorIndex > 0) {
        const preAnchorEle = this.anchors[anchorIndex - 1];
        if (offsetTop > 0) {
          const preHeight = preAnchorEle.height;
          preAnchorEle.update({ top: offsetTop - preHeight + scollerViewTop });
        } else {
          preAnchorEle.reset();
        }
      }
      activeAnchorEle.update({ top: Math.max(0, offsetTop) + scollerViewTop });
    },
    getSelectElement(e) {
      const { clientX, clientY } = this.getPoint(e);
      return document.elementFromPoint(clientX, clientY);
    },
    scrollIntoView(e) {
      const indexElement = this.getSelectElement(e);
      if (!indexElement || !this.isIndexEle(indexElement)) return;
      const { index } = indexElement.dataset;
      this.active = true;
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        const activeAnchor = this.anchors.filter((anchor) => anchor.index === index);
        this.scrollTo(activeAnchor[0]);
      }
      this.$emit('select', index);
    },
    isIndexEle(child) {
      return this.$refs.indexItem.some((item) => item === child);
    },
    scrollTo(vnode) {
      if (vnode) {
        vnode.$el.scrollIntoView();
      }
    },
  },
  mixins: [touchMixin, scollMixin],
  props: {
    fixAnchor: {
      type: Boolean,
      default: true,
    },
    indexs: {
      type: Array,
      default: getCharacter,
    },
    showIndexTip: {
      type: Boolean,
      default: () => true,
    },
  },
  provide() {
    return {
      IndexParent: this,
    };
  },

};
</script>

<style>

</style>
