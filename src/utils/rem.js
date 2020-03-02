// 基准大小
const baseSize = 7
// 设置 rem 函数
function setRem() {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750
    // 设置页面根节点字体大小
    if (!IsPC) {
        document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
    } else {
        document.documentElement.style.fontSize = '14px';
    }

}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {

        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;

            break;

        }

    }

    return flag;
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}