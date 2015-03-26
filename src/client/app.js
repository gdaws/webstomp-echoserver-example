var React = require('react');
var App = require('./ui/App.jsx');
var ClientStore = require('./ClientStore');

function init(config) {
  
  var ui;
  var messages = [];
  
  var store = new ClientStore(config.url, config.connectHeaders);
  
  var uiProperties = {
    
    messages: messages,
    connectionStatus: store.getConnectionStatus(),
    
    actions: {
      sendMessage: function(message){
        store.sendMessage(message);
      }
    }
  };
  
  ui = React.render(
    React.createElement(App, uiProperties), config.mountElement
  );
  
  store.on('message', function(message) {
    
    messages.push(message);
    
    ui.setProps({
      messages: messages
    });
  });
  
  store.on('update_connection_status', function(){
    
    ui.setProps({
      connectionStatus: store.getConnectionStatus()
    });
  });
}

window.initApp = init;
