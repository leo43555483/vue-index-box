const MINI_DISTANCE = 10;
function getDirection(x, y) {
  if (x > y && x > MINI_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MINI_DISTANCE) {
    return 'vertical';
  }
  return '';
}
const { abs } = Math;
export default {
  data() {
    return {
      direction: '',
      preX: 0,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
    };
  },
  methods: {
    getPoint(e) {
      const { clientX, clientY } = e.touches[0];
      return { clientX, clientY };
    },
    touchStart(e) {
      const { clientX, clientY } = this.getPoint(e);
      this.startX = clientX;
      this.startY = clientY;
    },
    touchMove(e) {
      const { clientX, clientY } = this.getPoint(e);
      this.offsetX = abs(clientX - this.startX);
      this.offsetY = abs(clientY - this.startY);
      this.direction = getDirection(this.offsetX, this.offsetY);
    },
    getDistance() {
      getDirection();
    },
  },
};
