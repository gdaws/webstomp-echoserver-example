var React = require('react');

var ConnectionStatus = React.createClass({
  
  render: function() {
    
    var status = this.props.status;
    
    var classes = [
      'alert',
      'connection-status'
    ];
    
    var iconClass;
    
    if (status.error) {
      classes.push('alert-danger');
      iconClass = 'glyphicon glyphicon-exclamation-sign';
    }
    else if (status.connected) {
      classes.push('alert-success');
      iconClass = 'glyphicon glyphicon-signal';
    }
    else {
      classes.push('alert-info');
      iconClass = 'glyphicon glyphicon-earphone';
    }
    
    return (
      <div className={classes.join(' ')}>
      
        {(function() {
          if (iconClass) {
            return (
              <span>
                <i className={iconClass}></i>
                &nbsp;
              </span>
              );
          }
        })()}
        
        {this.props.status.message}
      </div>
    );
  }
  
});

module.exports = ConnectionStatus;
