export function toLogin() {
    // TODO
}

/**
 * 获取一个元素距离浏览器顶部高度
 * @param element
 * @returns {number | Requireable<number>}
 */
export function getElementTop(element) {
    if (!element) return 0;
    let actualTop = element.offsetTop;
    let current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}

export function compose(functions) {
    if (functions.length === 0) {
        return arg => arg;
    }

    if (functions.length === 1) {
        return functions[0];
    }

    return functions.reduce((a, b) => (...args) => a(b(...args)));
}

