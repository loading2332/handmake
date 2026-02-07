function shallowClone(obj) {
    const newobj = {};
    for (const key in obj) {
        newobj[key] = obj[key]
    }
    return newobj;
}