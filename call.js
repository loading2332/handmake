Function.prototype.call = function (thisArg, ...args) {
  const fn = this;
  let thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  const tag = Symbol("call");
  thisArg[tag] = fn;
  const res = thisArg[tag](...args);
  delete thisArg[tag];
  return res;
};

// 利用 JS 规则：
// obj.method() 调用 → this = obj
// 把函数临时变成对象方法来执行，从而强制修改 this。
