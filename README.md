This is an example web application to demonstrate the use of direct 
communication with a message broker from a web browser. The protocol used is 
STOMP over SockJS (emulated WebSocket).

To run this demo you must have the RabbitMQ broker service running on localhost 
with the [Web-Stomp](https://www.rabbitmq.com/web-stomp.html) plugin enabled.

Install
-------------
Run the following shell commands:
1. `git clone https://github.com/gdaws/webstomp-echoserver-example.git`
2. `cd webstomp-echoserver-example` 
3. `npm install`
4. `PORT=3000 npm start`
