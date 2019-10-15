/**
 * 首先在css中设置 html: 1000vw / 640 * 1000
 * 然后尽早调用该函数，通过js调整根元素字号
 * @param {number} designWidth 设计稿宽度
 */
export default function setBaseFontSize(designWidth) {
    if (typeof window === 'undefined') return;

    const isSupport = cssPropertyValueSupported('font-size', '1vw');
    const fontSizeBias = computeFontSizeBias();

    if (!isSupport || fontSizeBias !== 1) {
        setFontSize(designWidth, fontSizeBias);
        window.addEventListener('resize', function() {
            setFontSize(designWidth, fontSizeBias);
        });
    }
}

/**
 * css属性的支持性
 * @param {string} prop 属性 
 * @param {string} value 值
 */
function cssPropertyValueSupported(prop, value) {
    const d = document.createElement('div');
    d.style[prop] = value;
    return d.style[prop] === value;
}
/**
 * 计算渲染与实际字号的偏差
 */
function computeFontSizeBias() {
    const d = document.createElement('div');
    d.style.fontSize = '100px';
    document.body.appendChild(d);
    const realPx = parseInt(window.getComputedStyle(d, null).getPropertyValue('font-size'), 10) || 100;
    return 100 / realPx;
}

/**
 * 根据偏差设置根字号
 * @param {number} designWidth 
 * @param {number} bias 
 */
function setFontSize(designWidth, bias=1) {
    const clientWidth = document.documentElement.offsetWidth;
    const ppr = (1000 * clientWidth) / designWidth;
    document.documentElement.style.fontSize = ppr * bias + 'px';
}