onmessage = function(message) {
	console.log('got it!');
    var data = message.data
    data.msg = 'Hi from task.js'
    postMessage(data)
}