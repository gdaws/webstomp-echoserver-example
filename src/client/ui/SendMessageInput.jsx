var React = require('react');

var SendMessageInput = React.createClass({
  
  getInitialState: function() {
    return {
      sendMessageText: ''
    }
  },
  
  render: function() {
    
    return (
      <form onSubmit={this.handleInputSubmit}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Send message"
          value={this.state.sendMessageText}
          disabled={!this.props.connectionStatus.connected}
          onChange={this.handleInputChange} />
      </form>
    );
  },
  
  handleInputChange: function(event) {
    
    this.setState({
      sendMessageText: event.target.value
    });
  },
  
  handleInputSubmit: function(event) {
    
    event.preventDefault();
    
    if (this.state.sendMessageText.length > 0 ) {
      this.props.actions.sendMessage(this.state.sendMessageText);
      this.setState({sendMessageText: ''});
    }
  }
});

module.exports = SendMessageInput;
