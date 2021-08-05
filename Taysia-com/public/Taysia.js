/*
// cors技术实现跨域
const request = new XMLHttpRequest();
//  访问不同域的内容
request.open('GET', 'http://qq.com:8888/friends.json');
request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
        console.log(request.response);
    }
}
request.send();
*/



/*
//  通过js文件，获取json的数据，实现跨域
const random = 'TaysiaJSONPCallbackName' + Math.random();  //  避免和全局变量冲突
console.log(random);
window[random] = (data) => {
    console.log(data);
}
const script = document.createElement('script');
script.src = `http://localhost:8888/friends.js?functionName=${random}`;
/*
//  查看是否获取到数据，打印
script.onload = () => {
    console.log(window.xxx)
}
* /
//   在数据加载完之后删除script标签
script.onload = () => {
    script.remove();
}
document.body.appendChild(script);
*/


//  封装JSONP
function jsonp(url) {
    //  成功调用resolve，失败调用reject
    return new Promise((resolve, reject) => {
        const random = 'TaysiaJSONPCallBack' + Math.random();
        window[random] = (data) => {
            //console.log(data);
            resolve(data);
        }
        const script = document.createElement('script');
        script.src = `${url}?callback=${random}`;
        script.onload = () => {
            script.remove();
        };
        script.onerror = () => {
            reject();
        };
        document.body.appendChild(script);
    });
}

jsonp('http://localhost:8888/friends.js')
    .then((data) => {
        console.log(data)
    })
