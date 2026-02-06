// 时间戳实现
function throttle(fn, delay) {
  let last = 0;
  const _throttle = function (...args) {
    const now = new Date().getTime();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };

  return throttle;
}

//如果追求极高的性能，且不在意最后一次触发是否被遗漏（比如只是为了简单的性能优化），用基础版。
//如果追求数据的最终一致性（比如拖拽停止后，物体必须停在鼠标最后停留的位置），则必须用 dfe 版。

function throttle(fn, delay) {
  let last = 0
  const _throttle = function(...args) {
    const now = new Date().getTime()
    if(now - last >= delay) {
      fn.apply(this, args)
      last = now
    }
  }
  return _throttle
}

// dfe ver.
function throttle(func, wait) {
  let waiting = false; // 标记是否处于等待状态
  let lastArgs = null; // 存储上一次传入的参数
  return function(...args) {
    if (!waiting) { // 如果不处于等待状态
      func.apply(this, args); // 执行函数
      waiting = true; // 进入等待状态
      let timeout = () => setTimeout(() => { // 创建一个定时器函数
        waiting = false; // 等待时间过后，将等待状态标记为 false
        if (lastArgs) { // 如果上一次有传入参数
          func.apply(this, lastArgs); // 再次执行函数
          waiting = true; // 再次进入等待状态
          lastArgs = null; // 清空上一次的参数
          timeout(); // 继续启动定时器
        }
      }, wait);
      timeout(); // 启动定时器，开始等待 wait 时间
    } else {
      lastArgs = args; // 如果处于等待状态，暂存传入的参数
    }
  };
}