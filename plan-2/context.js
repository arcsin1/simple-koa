let proto = {};


 // Object.defineProperty(a,"b",{value:123})   
  //console.log(a.b);
  //123我们只设置了 value，别的并没有设置，
  //但是第一次的时候可以简单的理解为（暂时这样理解）
 //它会默认帮我们把writable，configurable，enumerable。都设上值，而且值还都是false。

// 为proto名为property的属性设置setter
function delegateSet(property, name) {
    Object.defineProperty(proto, name, { 
        configurable: true,
        set: function (val) {  
            this[property][name] = val
        } 
    })
}

// 为proto名为property的属性设置getter
function delegateGet(property, name) {
    Object.defineProperty(proto, name, { 
        configurable: true,
        get: function () {  
            return this[property][name];
        } 
    })
}


// 定义request中要代理的setter和getter
let requestSet = [];
let requestGet = ['query'];

// 定义response中要代理的setter和getter
let responseSet = ['body', 'status'];
let responseGet = responseSet;

requestSet.forEach(item => {
    delegateSet('request', item);
});

requestGet.forEach(item => {
    delegateGet('request', item);
});

responseSet.forEach(item => {
    delegateSet('response', item);
});

responseGet.forEach(item => {
    delegateGet('response', item);
});

module.exports = proto;