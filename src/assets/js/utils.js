/**
 * @Author 李忠伟
 * 工具包
 * 
 * How to use?
 * eg: import {debounce} from '@/js/utils'
 */

/**
 * 防抖函数，事件触发停止一定时间后才会执行响应的函数，期间如果重复调用动作，重新计算时间。
 * @param {[function]} func 目标函数
 * @param {[string]} wait 等待时间
 * @param {[boolean]} immediate 
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}


/**
 * 节流函数，事件触发后执行函数执行期间内事件再次触发，执行函数将不会执行，等规定时间之后事件触发，执行函数方可再次执行。
 * @param {[function]} func 目标函数
 * @param {[string]} wait 等待时间
 * @param {[boolean]} options 如果您想禁用前面执行，请传递"{leading: false}"。要禁用后面执行，传递"{trailing: false}"。
 */
export function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = +new Date();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};


/**
 * 格式化时间格式
 * @param {[string]} time  [时间]  格式可以是 new Date 或 new Date('毫秒数')
 * @param {[string]} format  [格式] {'yyyy-MM-dd hh:mm:ss:S'} 时间格式，字符串形式，y：年，M：月，d：日，h：时，m：分，s：秒，S：毫秒
 * @return {[string]} [格式化后的日期]
 */

export function formatDate (time, format) {
    var args = {
        "M+": time.getMonth() + 1,
        "d+": time.getDate(),
        "h+": time.getHours(),
        "m+": time.getMinutes(),
        "s+": time.getSeconds(),
        "q+": Math.floor((time.getMonth() + 3) / 3),  //quarter 季度
        "S": time.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};