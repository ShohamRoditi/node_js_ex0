const order = require('./ordersm/index.js'),
// config = require('./ordersm/config').events,
http = require('http');

http.createServer((req,res) => {
   
   if(req.url != '/favicon.ico'){
        let myOrder = new order();
        myOrder.add_orders(6);
        myOrder.cancel_orders(2);
        myOrder.add_orders(10);
        myOrder.add_orders(22);
        myOrder.cancel_orders(3);
        myOrder.add_orders(1);
        myOrder.reset_orders();
        myOrder.print_orders();
        
        res.writeHeader(200);
        res.write(JSON.stringify(myOrder.outPutArray));
    
        // while(myOrder.outPutArray.length)
        //     myOrder.outPutArray.pop();
        
        console.log("--- finished client ---");
        res.end();
   } 
}).listen(8080)
console.log('listening on port 8080 ');
