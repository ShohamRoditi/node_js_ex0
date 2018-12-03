const eventsConfig = require('./config').events,
events = require ('events'); // To access the EventEmitter class, require('events')

//  const max_orders = 20;

class Orders extends events.EventEmitter {
    constructor(){
        super();
        this.num_of_orders = 0; // numbers of orders
        this.max_orders = 20; 
        this.amount = 0; // it is for the queue the follow the events and show us the amount of order that added or cancled 
        this.outPutArray = new Array();//msg_log
        this.queue =new Array();// array that manage the orders 

        this.on(eventsConfig.ADD, () => {
            this.add();    
        });

        this.on(eventsConfig.REDUCE, () => {
            this.cancel();
        });

        this.on(eventsConfig.RESET, () => {
            this.reset();
        });
 
    }

   
    //add
    add_orders(amount){
        this.amount = amount;
        this.num_of_orders  += amount;
        this.emit(eventsConfig.ADD); // emit fire event 
    }

    //reduce
    cancel_orders(amount){
        this.amount = amount;
        this.num_of_orders -= amount;
        this.emit(eventsConfig.REDUCE); // emit fire evet 
    }

    //reset
    reset_orders(){
        this.num_of_orders = 0; 
        this.emit(eventsConfig.RESET); // emit fire evet 
    }

    print_orders(){
        for(let i = 0 ; i < this.queue.length; i++){
            console.log(this.queue[i]);
            this.outPutArray.push(this.queue[i]);

        }
    }

// the callbacks function 

    cancel(){
        if(this.num_of_orders < 0){
            
            // for cases that i want to add little amount of order and after to cancel big amount of orders like : add(6) and cancel (23) 
            let current_orders = this.num_of_orders + this.amount ; 
            if (current_orders == 0){
                console.log(`The queue is empty and numbers of current orders is:  ${current_orders} `);
                this.outPutArray.push(`The queue is empty and numbers of current orders is:  ${current_orders} `);
                this.queue.push(`You try to cancel ${this.amount} orders`); 
            }else{
                console.log(`The are in the queue ${current_orders} orders that you can to cancel `);
                this.outPutArray.push(`The are in the queue only ${current_orders} orders that you can to cancel.`);
                this.queue.push(`${this.amount} orders that you want to cancel it is not possible`); 
            }
            
        }
        else if(this.num_of_orders >= this.max_orders){
            console.log(`The num of order: ${this.num_of_orders} over the maximum number of orders ${this.max_orders},need to empty the queue`);
            this.outPutArray.push(`The num of order: ${this.num_of_orders} over the maximum number of orders ${this.max_orders},need to empty the queue`);
            this.queue.push(`You cancle ${this.amount} orders but the queue is still currently full`); 
        }
        else{
            this.queue.pop();
            console.log(`Current num of orders in queue after reduce orders: ${this.num_of_orders}`);
            this.outPutArray.push(`Current num of orders in queue after reduce orders: ${this.num_of_orders}`);
            this.queue.push(`Pop ${this.amount} orders from a queue`);
            

        }
    }

    add(){
        if (this.num_of_orders >= this.max_orders){
            console.log(`Cannot add more orders, Num of orders = ${this.num_of_orders}, Max orders = ${this.max_orders}`);
            this.queue.push(`You try to add ${this.amount} orders but the queue is currently full`);
            this.outPutArray.push(`The queue is full and the current num of orders is:  ${this.num_of_orders}`);}
        else{
            let more_orders = this.max_orders - this.num_of_orders;
            console.log(`Current amount of orders is: ${this.num_of_orders} and the amount of more orders you can order is: ${more_orders}`);
            this.queue.push(`${this.amount} orders added to queue of orders`);
            this.outPutArray.push(`Current num of orders in queue after adding new orders : ${this.num_of_orders} and the amount of more orders you can order is: ${more_orders}`);

        }

    }

    reset(){
        console.log(`Reset the queue and the number of orders is: ${this.num_of_orders}`);
        this.outPutArray.push(`Reset the queue and the number of orders is: ${this.num_of_orders}`);
        this.queue.push(`Reset all the orders in the queue`); 
        }

}

module.exports = Orders;