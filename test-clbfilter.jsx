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

  //When a checkbox is used this way - inside a link - and is clicked, then its state gets changed before firing link's onClick.
  //This has one major drawback.
  //If a click handler is attached to a checkbox, the checkbox state on a page does not actually change when it's clicked;
  //instead, the handler can queue modification of the component state, and upon being processed, that modification makes the component re-render
  //thus setting the checkbox to the updated value. Also note that the event is a React synthetic event, not a real HTML DOM event.
  //
  //If the handler is placed on a link, however, the checkbox is already modified; so, as I described in the latest commit,
  //this modification can get overwritten when processing pending state transitions (holding outdated states). This looks unnatural 
  //and can be source of errors, even though eventually when all transitions are processed the modification will come back.
  //At least, the documentation does not contradict this scenario.
  //
  //So, to avoid that problem, I'd better place the handler on a checkbox itself. In that case however I am to move checkbox outside the link,
  //so I have to invent something for them to remain convenient for the user. And that requires some good markup knowledge.
  //For now I prefer not to dig in markup; suffice it I know the problem and I know how to fix it.
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
