import { throttle, getScroller } from '../utils';

export default {
  data() {
    return {
      scoller: null,
    };
  },
  mounted() {
    this.scoller = getScroller(this.$el);
    this.scrollCallBack = throttle(this.onScroll, 20);
    window.addEventListener('scroll', this.scrollCallBack, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener('scoll', this.scrollCallBack);
  },
};
