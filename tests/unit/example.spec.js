import Vue from 'vue';
import {
  createMount, trigger, scrollIntoViewFn, elementFromPointFn,
} from './utils';

describe('IndexBox.vue', () => {
  it('touch index && scroll into view', () => {
    const onSelect = jest.fn();
    const wrapper = createMount({
      template: `
      <div>
        <IndexBox @select="onSelect">
          <IndexAnchor title="A" index="A"/>
          <IndexAnchor title="B" index="B"/>
          <IndexAnchor title="C" index="C"/>
        </IndexBox>
      </div>
      `,
      methods: {
        onSelect,
      },
    });
    const indexItems = wrapper.findAll('.ve-index__item');

    const itemWrapper = indexItems.at(0);
    const elementFromPoint = elementFromPointFn(indexItems, 0, 0);
    const scrollFn = scrollIntoViewFn();
    trigger(itemWrapper, 'touchstart', 0, 0);
    expect(elementFromPoint).toBeCalledTimes(1);
    expect(scrollFn).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith('A');
    Vue.nextTick(() => {
      const tipWrapper = wrapper.find('.ve-index__tip');
      expect(tipWrapper.text()).toBe('A');
    });
  });
});
describe('IndexAnchor.vue', () => {
  it('custom anchor', () => {
    const wrapper = createMount({
      name: 'app',
      template: `
        <div>
          <IndexBox >
            <IndexAnchor title="A" index="A"/>
            <IndexAnchor title="B" index="B"/>
            <IndexAnchor title="C" index="C"/>
          </IndexBox>
        </div>
      `,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
