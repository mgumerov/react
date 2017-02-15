var React = require('react');

function gatherHash(array) {
  return array.reduce( (hash, e) => {hash[e] = null; return hash}, {} );
};

//Generic CheckListBox filter
var CLBFilter = React.createClass({

  render: function() {
    return (
  <div className="form-group dropdown ">
    <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">{this.props.title}<span className="caret"></span></button>
    <ul className="dropdown-menu">
      <li><a href="#" className="small" tabIndex="-1" onClick={(event)=>this.onLinkClick(event, null)}>Все</a></li>
      {Object.keys(this.props.items).map((key, index) => ({id: key, title: this.props.items[key]})).map(entry =>
        <li key={entry.id}>
          <a href="#" className="small" tabIndex="-1" onClick={(event)=>this.onLinkClick(event, entry.id)}>
            <input type="checkbox" checked={entry.id in this.props.checks} readOnly/>&nbsp;{entry.title}</a></li>
      )}
    </ul>
  </div>
    );
  },

  onLinkClick: function (event, id) {
    var callback;
    if (event.currentTarget == event.target) { //direct click on a link text
      var newChecks = gatherHash(id ? [id] : Object.keys(this.props.items));
      callback = (checks => newChecks);
    } else {
      var newChecks = gatherHash(Object.keys(this.props.checks));
      if (id in newChecks) {
        delete newChecks[id];
      } else {
        newChecks[id] = null;
      }
      callback = (checks => newChecks);
    }
    this.props.onChange(callback);
  }
});

module.exports = CLBFilter;
