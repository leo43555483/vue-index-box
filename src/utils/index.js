export function getCharacter() {
  const list = [];
  const char = 'A'.charCodeAt();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 26; i++) {
    list.push(String.fromCharCode(char + i));
  }
  return list;
}
export function throttle(fn, delay = 16) {
  let pre = 0;
  let timer = null;
  return (...args) => {
    const cur = Date.now();
    const remaining = delay - (cur - pre);
    if (remaining <= 0) {
      fn.apply(this, args);
      pre = Date.now();
    } else {
      timer = setTimeout(() => {
        clearTimeout(timer);
        fn.apply(this, args);
      }, remaining);
    }
  };
}

export function getScroller(el, root = window) {
  const scollRe = /scroll|auto/i;
  let node = el;
  while (
    node
    && node !== root
    && node.tagName !== 'HTML'
    && node.nodeType === 1
  ) {
    const { overflowY } = window.getComputedStyle(node);
    if (scollRe.test(overflowY)) {
      if (node.tagName !== 'BODY') return node;
      const { overflowY: htmlEleFlowY } = window.getComputedStyle(node.parentNode);
      if (scollRe.test(htmlEleFlowY)) return node;
    }
    node = node.parent;
  }
  return root;
}
export function getScrollTop(el) {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}
export function getBoundingClientRect(el) {
  if (el && el.getBoundingClientRect) return el.getBoundingClientRect();
  return { left: 0, top: 0 };
}
export function getRootPageYOffset() {
  return (
    window.pageYOffset
    || document.body.scrollTop
    || document.documentElement.scrollTop
    || 0
  );
}
