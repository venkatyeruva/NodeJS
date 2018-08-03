Globals
-------------

Modules
-------------
1. Node Applications and modular
2. In the Node.js module system, each file is treated as a separate module.
3. Every application will have one main module (ex: index.js will bootstrap the app)
4. The require funciton is uses to include/require modules

Module Wrapper
-------------------
1. Before a modules's code is executed, Node.js will wrap it with a function wrapper that looks like the following.
(function(exports, require, module, _filename, _dirname){
  //Module codeactually lives in here
})
2. There are some buit in module in node js like ex: os
3. Every js file is like module
4. You can access the module using require
5. require will find the file in paths which is already there in module.paths
6. require.cache will return the app info
7. Global vars accessible across module (ex: test = "hello")- Not recommended

Require steps
-----------------
ex: require.resolve('functions')

Async programming
-------------------
1. Heap
2. Call stack
3. ES6 feature new Promise(), then(resolve(), reject())
4. Timer
5. I/O operations
6. Watch operators
7. async/await(ES7)-Adove node 7.6 support

Events
--------
1. const EventEmitter = require('events);
2. class MyEmitter extends EventEmitter {...}
 var obj = new MyEmitter();

Node Built in libs
-------------------
-fs
-os
-net(TCP Sockets)
-udp(udp)
-http
-https
-crypto

Scoket I/O
-------------
- Live Reloads
- Web Socket
- Ajax Poling (fallback modal)

Timer
----------
- setTimeout, setInterval, clearInterval

- setImmediate(() => {})
- process.nextTick(() => {})
- I/O async
- watcher
- 

Node
------
Apche bench marker tool
ab -c200 -t10 http://localhost:8080
