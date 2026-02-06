// 搜索框相关
function debounce(fn, delay) {
  let timer = null;
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args); //与调用的函数的this绑定
    }, delay);
  };
  return _debounce; // 闭包
}

// 点赞相关
function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false;

  const _debounce = function (...args) {
    if (timer) clearTimeout;
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        isInvoke = false;
      }, delay);
    }
  };
  return _debounce;
}
