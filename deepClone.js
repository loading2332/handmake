function deepClone(obj) {
  const hsh = new WeakMap(); // 用于解决循环引用和重复引用
  function isObject(data) {
    return (
      data !== null && (typeof data === "object" || typeof data === "function")
    );
  }

  function clone(data) {
    if (!Object(data)) {
      return data;
    }
    if (hsh.has(data)) {
      return hsh.get(data); // 防止死递归
    }
    if (data instanceof Date) {
      return new Date(data);
    }
    if (data instanceof RegExp) {
      return new RegExp(data.source, data.flags);
    }
    if (typeof data === "function") {
      return data; // function 只能返回引用
    }

    if (data instanceof Map) {
      const res = new Map();
      hsh.set(data, res); // 防止死递归
      data.forEach((val, key) => {
        res.set(clone(key), clone(val));
      });
      return res;
    }

    if (data instanceof Set) {
      const res = new Set();
      hsh.set(data, res);
      data.forEach((val) => {
        res.add(clone(val));
      });
      return res;
    }

    // 通用对象拷贝

    const keys = Reflect.ownKeys(data);
    // 获取对象所有自身属性的描述符
    // （包含 value, writable, enumerable, configurable 以及 get/set 访问器）。
    const descriptors = Object.getOwnPropertyDescriptors(data);
    const res = Object.create(Object.getPrototypeOf(data), descriptors);

    hsh.set(data, res);

    for (const key of keys) {
      res[key] = clone(data[key]);
    }

    return res;
  }
  return clone(obj);
}
