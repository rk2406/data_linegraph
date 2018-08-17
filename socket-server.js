var serialport = require('serialport');
var portName = 'COM16';
let globe,final;
var sp= new serialport(portName, {
    baudRate: 9600,
    dataBits: 8,
    // parity: 'none',
    // stopBits: 1,
    // flowControl: false,
})


sp.on('data', function abc(input) {
        globe=input.toString();
        if(typeof globe!='null')
            final=globe
        let arr=final.split(",")
        arr=arr.map((val)=> {return +val})
        console.log(arr)
        
});

var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index_1.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!'); 

    setInterval(() => {
        socket.emit('ping', final)
    }, 1000)
});

server.listen(3333); 