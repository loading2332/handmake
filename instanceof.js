function myInstanceof(left,right) {
    const flag = right.prototype;
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto === null) return false;
        if (proto === flag) return true;
        proto = Object.getPrototypeOf(proto);
    }
}