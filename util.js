/**
 * 检查值
 * 检查是否基础值
 * 检查是否基础值
 * 返回类型值 Array Object String RegExp Number等
 * 是否是对象
 * 是否是promise
 * 转换成字符串
 * 转换成数字，失败返回本身
 * 函数执行一次
 * 函数promise化
 * 常用的正则规则
 * 冒泡排序(升序)
 * 冒泡排序(降序)
 * 选择排序（升序）
 * 选择排序（降序）
 * 插入排序（升序）
 * 插入排序（降序）
 * 阶乘
 * 累加
 * 计算代码块（函数）执行时间
 * 数组去重
 * 对象数组中找指定的元素,返回下标
 * 二分查找
 * 深拷贝
 * 数字前补零
 * 全局替换字符串
 * 在字符串指定位置插入字符
 * 打开浏览器新标签页，已经打开的就直接聚焦跳转
 * 页面滚动到底部执行函数fn
 * 根据 QueryString 参数名称获取值
 * 获取页面顶部被卷起来的高度
 * 获取页面文档的总高度
 * 获取页面浏览器视口的高度
 * 判断是移动端还是 pc 端
 * base64转blob
 * 二进制转 base64
 * 下载二进制文件
 * 根据url下载文件
 */

// 检查值
export function isUndef(v) {
    return v === undefined || v === null;
}

export function isDef(v) {
    return v !== undefined && v !== null;
}

// 检查是否基础值
export function isPrimitive(value) {
    return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "symbol" ||
        typeof value === "boolean"
    );
}

// 返回类型值 Array Object String RegExp Number等
export function toRawType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

// 对象
export function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

// promise
export function isPromise(val) {
    return (
        isDef(val) &&
        typeof val.then === "function" &&
        typeof val.catch === "function"
    );
}

// 转换成字符串
export function toString(val) {
    return val == null ?
        "" :
        Array.isArray(val) ||
        (isPlainObject(val) && val.toString === Object.prototype.toString) ?
        JSON.stringify(val) :
        String(val);
}

// 转换成数字，失败返回本身
export function toNumber(val) {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}

// 函数执行一次
export function once(fn) {
    let called = false;
    return function() {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    };
}

// 函数promise化
export const promisify = (func, ctx) => {
    // 返回一个新的function
    return function() {
        // 初始化this作用域
        var ctx = ctx || this;
        // 新方法返回的promise
        return new Promise((resolve, reject) => {
            // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
            func.call(ctx, ...arguments, function() {
                // 将回调函数中的的第一个参数error单独取出
                var args = Array.prototype.map.call(arguments, item => item);
                var err = args.shift();
                // 判断是否有error
                if (err) {
                    reject(err);
                } else {
                    // 没有error则将后续参数resolve出来
                    args = args.length > 1 ? args : args[0];
                    resolve(args);
                }
            });
        });
    };
};

// 常用的正则规则
// eslint-disable-next-line
export const regExpConfig = {
    IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // 身份证
    mobile: /^1([3|4|5|7|8|])\d{9}$/, // 手机号码
    telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, // 固定电话
    num: /^[0-9]*$/, // 数字
    phoneNo: /(^1([3|4|5|7|8|])\d{9}$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$)/, // 电话或者手机
    policeNo: /^[0-9A-Za-z]{4,10}$/, // 账号4-10位数字或字母组成
    pwd: /^[0-9A-Za-z]{6,16}$/, // 密码由6-16位数字或者字母组成
    isNumAlpha: /^[0-9A-Za-z]*$/, // 字母或数字
    isAlpha: /^[a-zA-Z]*$/, // 是否字母
    isNumAlphaCn: /^[0-9a-zA-Z\u4E00-\uFA29]*$/, // 是否数字或字母或汉字
    isPostCode: /^[\d-]*$/i, // 是否邮编
    isNumAlphaUline: /^[0-9a-zA-Z_]*$/, // 是否数字、字母或下划线
    isNumAndThanZero: /^([1-9]\d*(\.\d+)?|0)$/, // 是否为整数且大于0/^[1-9]\d*(\.\d+)?$/
    isNormalEncode: /^(\w||[\u4e00-\u9fa5]){0,}$/, // 是否为非特殊字符（包括数字字母下划线中文）
    isTableName: /^[a-zA-Z][A-Za-z0-9#$_-]{0,29}$/, // 表名
    isInt: /^-?\d+$/, // 整数
    isTableOtherName: /^[\u4e00-\u9fa5]{0,20}$/, // 别名
    // isText_30: /^(\W|\w{1,2}){0,15}$/, // 正则
    // isText_20: /^(\W|\w{1,2}){0,10}$/, // 正则
    isText_30: /^(\W|\w{1}){0,30}$/, // 匹配30个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
    isText_50: /^(\W|\w{1}){0,50}$/, // 匹配50个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
    isText_20: /^(\W|\w{1}){0,20}$/, // 匹配20个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
    isText_100: /^(\W|\w{1}){0,100}$/, // 匹配100个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
    isText_250: /^(\W|\w{1}){0,250}$/, // 匹配250个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
    isNotChina: /^[^\u4e00-\u9fa5]{0,}$/, // 不为中文  IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // 身份证
    IDcardAndAdmin: /^(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))$/, // 身份证或者是admin账号
    IDcardTrim: /^\s*(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))\s*$/, // 身份证
    num1: /^[1-9]*$/, // 数字
    companyNO: /^qqb_[0-9a-zA-Z_]{1,}$/, // 公司人员账号
    imgType: /image\/(png|jpg|jpeg|gif)$/, // 上传图片类型
    isChina: /^[\u4e00-\u9fa5]{2,8}$/,
    isNozeroNumber: /^\+?[1-9]\d*$/, // 大于零的正整数
    float: /^\d+(\.?|(\.\d+)?)$/ // 匹配正整数或者小数 或者0.这个特殊值
};

// 冒泡排序(升序)
export const bubbleAsSort = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};

// 冒泡排序（降序）
export const bubbleDeSort = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};

// 选择排序（升序）
export const selectAsSort = arr => {
    let minIndex, temp;
    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
};

// 选择排序（降序）
export const selectDeSort = arr => {
    let minIndex, temp;
    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
};

// 插入排序（升序）
export const insertAsSort = arr => {
    let current, preIndex;
    for (let i = 1; i < arr.length; i++) {
        current = arr[i];
        preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
};

// 插入排序（降序）
export const insertDeSort = arr => {
    let current, preIndex;
    for (let i = 1; i < arr.length; i++) {
        current = arr[i];
        preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex] < current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
};

// 阶乘
export const factorial = num => {
    let count = 1;
    for (let i = 1; i <= num; i++) {
        count *= i;
    }
    return count;
};

// 累加 cumsum(1,2,3)
export const cumsum = (...rest) => {
    let sum = 0;
    for (let i = 0; i < rest.length; i++) {
        sum += rest[i];
    }
    return sum;
};

// 计算代码块（函数）执行时间
// 无参数
export const computeTime = fn => {
    let startTime = new Date().getTime();
    fn();
    let endTime = new Date().getTime();
    let time = endTime - startTime;
    return time;
};

// 有参
export const computeTime = fn => {
    let startTime = new Date().getTime();
    let p = [];
    for (let i = 1; i < arguments.length; i++) {
        p.push(arguments[i]);
    }
    fn.apply(null, p);
    let endTime = new Date().getTime();
    let Time = endTime - startTime;
    return Time;
};

// 数组去重，不适合对象数组
// 1对象法
export const arrDempByObj = arr => {
    let temp = [];
    let json = {};

    for (let i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            //如果对象没有该属性
            temp.push(arr[i]);
            json[arr[i]] = 1; //添加属性，将属性值赋值为1
        }
    }
    return temp;
};

// 2 es6中的new Set()
export const arrDempBySet = arr => {
    let arrDemp = new Set(arr); //arrDemp是一个对象
    let newArr = [...arrDemp]; //把arrDemp转化成数组
    return newArr;
};

/**
 * 对象数组去重
 * objArr 对象数组
 * para 将要进行去重的字段(String类型)
 */
export const objArrDemp = (objArr, para) => {
    let hash = {};
    //reduce()第一个参数是一个callback，用于针对数组项的操作；第二个参数则是传入的初始值。
    objArr = objArr.reduce(function(item, next) {
        hash[next[para]] ? "" : (hash[next[para]] = true && item.push(next));
        return item;
    }, []); //初始值是一个空对象，使用reduce方法返回的是空对象通过叠加执行之后的结果
    return objArr;
};

/**
 * 统计数组中各个元素出现的次数
 * let arr = [1, 2, 3, 3, 2, 1, 2, 3, 2, 1]
 * console.log(staArrNum(arr)); ==> { '1': 3, '2': 4, '3': 3}
 */
export const staArrNum = arr => {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        let m = arr[i];
        if (obj.hasOwnProperty(m)) {
            obj[m] += 1;
        } else {
            obj[m] = 1;
        }
    }
    return obj;
};

// 在数组中找指定的元素,返回下标
export const arrFindNum = (arr, num) => arr.indexOf(num);

/**
 * 对象数组中找指定的元素,返回下标
 * objArr 对象数组
 * key 将要进行查找的字段key(String类型)
 * value 将要进行查找的对应的value
 * {id: 1}
 */
export const arrFindObjNum = (objArr, key, value) => {
    let index = -1;
    for (let i = 0; i < objArr.length; i++) {
        if (value == objArr[i][key]) {
            index = i;
            break;
        }
    }
    return index;
};

/**
 * 二分查找
 * let arr = [-1, 1, 3, 4, 5, 8, 32, 234, 12, 42];
 * console.log(binarySearch(arr, 4));
 */
export const binarySearch = (arr, key) => {
    let high = arr.length - 1,
        low = 0;
    while (low <= high) {
        let m = Math.floor((high + low) / 2);
        if (arr[m] == key) {
            return m;
        }
        if (key > arr[m]) {
            low = m + 1;
        } else {
            high = m - 1;
        }
    }
    return false;
};

// 深拷贝
/*
let str1 = {
  arr: [1, 2, 3],
  obj: {
    key: 'value'
  },
  fn: function () {
    return 1;
  }
};
let str3 = deepClone(str1);

console.log(str3 === str1); // false
console.log(str3.obj === str1.obj); // false
console.log(str3.fn === str1.fn); // true
 */
export const deepClone = source => {
    const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    for (let keys in source) {
        // 遍历目标
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === "object") {
                // 如果值是对象，就递归一下
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                // 如果不是，就直接赋值
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
};

/**
 * 数字前补零
 * @param {数字} num
 * @param {想要的长度} length
 */
export const padding = (num, length) => {
    return (Array(length).join("0") + num).substr(-length);
};

/**
 * 全局替换字符串
 * @param {将要替换的字符串} str
 * @param {待替换的字符} l
 * @param {替换后字符} r
 */
export const replaceStr = (str, l, r) => {
    let reg = new RegExp(l, "g");
    str = str.replace(reg, r);
    return str;
};

/**
 * 在字符串指定位置插入字符
 * @param {原字符串} character
 * @param {要插入的字符的位置} site
 * @param {想要插入的字符} newStr
 */
export const insertStr = (character, site, newStr) => {
    return character.slice(0, site) + newStr + character.slice(site);
};

/**
 * 打开一个新的标签页，并判断是否已经存在
 *
 */
export const jumpUrl = (url) => {
    // 打开一个空的url
    let winObj = window.open('', 'aaa')
    if (winObj.location.href === 'about:blank') {
        // 窗口不存在
        winObj = window.open(url, 'aaa')
    } else {
        // 窗口以已经存在了
        winObj.location.replace(href)
        winObj.focus()
    }
}

/* 页面滚动到底部执行函数fn */
export const isScrollBottom = (fn) => {
    const _args = Array.prototype.slice.call(arguments, 1)
    window.onscroll = () => {
        // 获取距离顶部的距离
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop
        // 获取可视区的高度
        const windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight
        // 获取滚动条的总高度
        const scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight

        if (scrollTop + windowHeight + 200 >= scrollHeight) {
            // 把距离顶部的距离加上可视区域的高度 等于或者大于滚动条的总高度就是到达底部
            fn.apply(this, _args)
        }
    }
}

/* 根据 QueryString 参数名称获取值 */
export const getQueryStringByName = (name) => {
    let result = window.location.search.match(
        new RegExp("[?&]" + name + "=([^&]+)", "i")
    );
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

/* 获取页面顶部被卷起来的高度 */
export const getScrollTop = () => {
    return Math.max(
        //chrome
        document.body.scrollTop,
        //firefox/IE
        document.documentElement.scrollTop
    );
}

//获取页面文档的总高度
export const getDocumentHeight = () => {
    //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );
}

//获取页面浏览器视口的高度
export const getWindowHeight = () => {
    return document.compatMode === "CSS1Compat" ?
        document.documentElement.clientHeight :
        document.body.clientHeight;
}

//判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
export const isMobileOrPc = () => {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}
/* base64 转 二进制文件 */
export base64ToBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
}

/* 二进制转 base64 */
export blobToBase64 = (blob) => {
    let reader = new FileReader()
    reader.onload = function(e) {
        return e.target.result
    }
    a.readAsDataURL(blob)
}

/* 根据url下载文件 */
export downloadFileByUrl = (downloadUrl) => {
    if (!downloadUrl) {
        return false;
    }
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device does not support files downloading. Please try again in desktop browser.');
        return false;
    }
    if (isChrome || isSafari) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        if (link.download !== undefined) {
            const fileName = downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1, downloadUrl.length);
            link.download = fileName;
        }
        if (document.createEvent) {
            const e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (downloadUrl.indexOf('?') === -1) {
        downloadUrl += '?download';
    }
    window.open(downloadUrl, '_self');
    return true;
};

/* 下载二进制文件 */
export downloadFileByBlob = (data, fileName) {
    if (!data) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click();
    link.remove();
}