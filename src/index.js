const worker = new Worker('worker.js');

worker.onmessage = function(message) {
    var data = message.data;
    console.log(JSON.stringify(data))
    // terminate 方法终止 worker 线程的运行
};

worker.onerror = function(error) {
    console.log(error.filename, error.lineno, error.message)
};

window.send = function () {
    worker.postMessage({
        id:1,
        msg:'Hello World'
    });
}

window.terminate = function () {
    worker.terminate();
}
