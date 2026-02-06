function myNew(fn,...args) {
    if(Object.prototype.toString.call(fn) !== "[object Function]") {
        return "error"
    }
    const obj = Object.create(fn.prototype);
    let rest = fn.call(obj,...args);
    return rest instanceof Object ? rest : obj
}