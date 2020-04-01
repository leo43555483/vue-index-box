import IndexBoxComponent from '@/index.js';
import { mount, createLocalVue } from '@vue/test-utils';
// import IndexAnchor from '@/component/IndexAnchor.vue';
const localVue = createLocalVue();
localVue.use(IndexBoxComponent);

function getTouch(el, x, y) {
  return {
    identifier: Date.now(),
    target: el,
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  };
}
export function createMount(component, option) {
  return mount(component, {
    localVue,
    ...option,
  });
}

export function trigger(wrapper, event, x, y) {
  const el = wrapper.element;
  const touchList = [getTouch(el, x, y)];
  const ev = document.createEvent('CustomEvent');
  ev.initCustomEvent(event, true, true, {});
  Object.assign(ev, {
    clientX: x,
    clientY: y,
    touches: touchList,
    targetTouches: touchList,
    changedTouches: touchList,
  });
  el.dispatchEvent(ev);
}
export function scrollIntoViewFn() {
  // eslint-disable-next-line no-undef
  const fn = jest.fn();
  Element.prototype.scrollIntoView = fn;
  return fn;
}
export function elementFromPointFn(wrapper, x, y) {
  // eslint-disable-next-line no-undef
  const fn = jest.fn(() => {
    if (x === 0 && y === 0) {
      return wrapper.at(0).element;
    }
    return wrapper.at(y).element;
  });
  document.elementFromPoint = fn;
  return fn;
}
