const worker = new Worker('worker.js');

worker.postMessage({
    id:1,
    msg:'Hello World'
});

worker.onmessage = function(message) {
    var data = message.data;
    console.log(JSON.stringify(data))
    // terminate 方法终止 worker 线程的运行
    worker.terminate()
};

worker.onerror = function(error) {
    console.log(error.filename, error.lineno, error.message)
};
