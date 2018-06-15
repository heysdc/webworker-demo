// 在主线程中使用时，onmessage和postMessage() 必须挂在worker对象上，而在worker中使用时不用这样做。原因是，在worker内部，worker是有效的全局作用域。
console.log('init worker', self);
self.onmessage = function(message) {
	console.log('got it!');
    var data = message.data
    data.msg = 'Hi from task.js'
    postMessage(data)
}
self.setTimeout(() => {
    console.log(33344);
})
importScripts('foo.js');
