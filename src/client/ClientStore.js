var events = require('events');
var util = require('util');
var websocket = require('websocket-stream');
var stompit = require('stompit');

function ClientStore(url, connectHeaders) {
  
  events.EventEmitter.call(this);
  
  this._setConnectionStatus('connecting');
  
  // Open WebSocket
  var transport = websocket(new SockJS(url));
  transport.on('close', closedBeforeConnect);
  
  // Create STOMP client instance
  var client = new stompit.Client(transport);
  
  this._transport = transport;
  this._client = client;
  
  this._messageDestination = '/topic/test';
  
  this._connected = false;
  this._connectionError = null;
  
  var self = this;
  
  // WebSocket connected
  transport.on('connect', function() {
    
    transport.removeListener('close', closedBeforeConnect);
    
    self._setConnectionStatus('WebSocket opened');
    
    // Send stomp CONNECT frame
    client.connect(connectHeaders, function(error) {
      
      self._connected = true;
      self._setConnectionStatus('connected');
      
      var subscribeHeaders = {
        destination: self._messageDestination
      };
      
      // Subscribe to topic
      self._subscription = client.subscribe(
        subscribeHeaders, 
        self._onReceiveMessage.bind(self)
      );
    });
  });
  
  function closedBeforeConnect(event) {
    var message = 'could not connect';
    self._setConnectionStatus(message, {message: message});
  }
  
  client.on('error', function(error) {
    self._connected = false;
    self._setConnectionStatus('lost connection: ' + error.message, error);
  });
  
  client.on('end', function() {
    self._connected = false;
    self._setConnectionStatus('disconnected');
  });
}

util.inherits(ClientStore, events.EventEmitter);

ClientStore.prototype._onReceiveMessage = function(error, message) {
  
  if (error) {
    return;
  }
  
  var self = this;
  
  message.readString('utf8', function(error, body) {
    
    if (error) {
      return;
    }
    
    message.ack();
    
    self.emit('message', body);
  });
};

ClientStore.prototype.sendMessage = function(message) {
  
  var frame = this._client.send({
    destination: this._messageDestination
  });
  
  frame.write(message);
  frame.end();
};

ClientStore.prototype.isConnected = function() {
  return this._connected;
};

ClientStore.prototype.getConnectionStatus = function() {
  
  return {
    connected: this._connected,
    message: this._connectionStatusMessage,
    error: this._connectionError
  };
};

ClientStore.prototype._setConnectionStatus = function(message, error) {
  this._connectionStatusMessage = message;
  this._connectionError = error;
  this.emit('update_connection_status');
};

module.exports = ClientStore;
