import IndexBox from './component/IndexBox.vue';
import IndexAnchor from './component/IndexAnchor.vue';

const install = (Vue) => {
  if (install.installed) return;
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  Vue.component(IndexBox.name, IndexBox);
  Vue.component(IndexAnchor.name, IndexAnchor);
};
export { IndexBox, IndexAnchor };
export default { install };
