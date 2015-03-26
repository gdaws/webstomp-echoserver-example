var React = require('react');

var ReceivedMessages = React.createClass({
  
render: function() {
    
    return (
      <div className="well well-sm received-messages">
      
        {this.renderMessageStatus()}
        
        <ul className="list-group">
          {this.props.messages.map(function(message) {
            return (
              <li className="list-group-item">
                {message}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
  
  renderMessageStatus: function() {
    
    if (this.props.messages.length > 0) {
      return;
    }
    
    return (
      <div className="text-muted">
        <i className="glyphicon glyphicon-info-sign"></i>&nbsp;
        Waiting to receive messages
      </div>
    );
  },
  
  componentDidUpdate: function(e) {
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  }
  
});

module.exports = ReceivedMessages;
