var React = require('react');

var ConnectionStatus = require('./ConnectionStatus.jsx');
var ReceivedMessages = require('./ReceivedMessages.jsx');
var SendMessageInput = require('./SendMessageInput.jsx');

var App = React.createClass({

  render: function() {
    
    return (
      <div>
        <div className="panel">
          <div className="panel-body">
            <ReceivedMessages messages={this.props.messages} />
            <SendMessageInput
              connectionStatus={this.props.connectionStatus}
              actions={this.props.actions} />
          </div>
        </div>
        <ConnectionStatus status={this.props.connectionStatus} />
      </div>
    );
  }
  
});

module.exports = App;
