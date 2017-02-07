var React = require('react');
var TableView = require('./test-tabular');
var TilesView = require('./test-tiles');
var data = require('./test-data');

//Main view, TODO split into components
var Workspace = React.createClass({

  render: function() {
    return (
<div>
<div className="form-inline">
  <div className="form-group">
  Фильтры:
  </div>
  <div className="form-group dropdown " data-filter-bind="bindClassFilter" data-filter-load="loadClassFilter" data-filter-clear="clearChecklistFilter">
    <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">Класс нагрузки<span className="caret"></span></button>
    <ul className="dropdown-menu">
      <li><a href="#" className="small" tabIndex="-1">Любой</a></li>
      <li><a href="#" className="small" data-value="31" tabIndex="-1"><input type="checkbox"/>&nbsp;31</a></li>
      <li><a href="#" className="small" data-value="32" tabIndex="-1"><input type="checkbox"/>&nbsp;32</a></li>
      <li><a href="#" className="small" data-value="33" tabIndex="-1"><input type="checkbox"/>&nbsp;33</a></li>
      <li><a href="#" className="small" data-value="34" tabIndex="-1"><input type="checkbox"/>&nbsp;34</a></li>
    </ul>
  </div>
  <div className="form-group dropdown " data-filter-bind="bindBrandFilter" data-filter-load="loadBrandFilter" data-filter-clear="clearChecklistFilter">
    <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">Бренд<span className="caret"></span></button>
    <ul className="dropdown-menu">
      <li><a href="#" className="small" tabIndex="-1">Любой</a></li>
    </ul>
  </div>
</div>

<p className="debug" id="urldebug"></p>

{this.present(this.state.items)}

<div className="col-md-12 text-center">
<ul className="pagination pull-left">
  {Object.keys(presenters).map((key, index) => 
    <li className="page-item view-mode" key={key}><a className="page-link" href = "#" onClick={()=>this.setPresenter(key)}>{presenters[key].renderIcon()}</a></li>
  )}
</ul>
<nav>
  <ul className="pagination tablepages">
    <li className="page-item"><a className="page-link page-direct" data-visible="vis.home" href = "#">1</a></li>
    <li className="page-item"><a className="page-link page-prev" data-visible="vis.prev" href = "#">&laquo;</a></li>
    <li className="page-item active"><a className="page-link page-direct" data-source="page" href = "#"></a></li>
    <li className="page-item"><a className="page-link page-next" data-visible="vis.next" href = "#">&raquo;</a></li>
    <li className="page-item"><a className="page-link page-direct" data-source="pageCnt" data-visible="vis.end" href = "#"></a></li>
  </ul>
</nav>
</div>

</div>
    );
  },

  getInitialState: function() {
    return {
      items: [],
      //name of actual presenter used, now this IS a part of component state
      presenter: (list => {for (var any in list) return any;})(presenters)
    };
  },

  componentDidMount: function() {
    this.queryData();
  },

  setPresenter: function (name) {
    this.setState({presenter: name});
  },

  present: function (items) {
    return (presenters[this.state.presenter]).render(items);
  },

  queryData: function() {
    var _this = this;
//    this.serverRequest =  //todo support several? and their bulk termination
      data.startGetPage(1, pageSize, filters)
        .then(result =>     
          //note the "(" before the map declaration - without them this would be recognized as method body, not the returned value :)
          //todo version stamp to prevent overriding more fresh data, unless React watches that
          _this.setState((state, props) => ({ items: result.page }))
        );
  },

// todo  componentWillUnmount: function() {
//    this.serverRequest.abort();
//  },
});

function run() {
    var ReactDOM = require('react-dom');
    ReactDOM.render(<Workspace/>, document.getElementById('workspace'));
}

//No idea why so complex, saw this on the Internet :)
const loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}

//todo make part of component state
var pageSize = 12;
var filters = {};

//register available presenters; constant and NOT a part of component state
var presenters = {}
presenters['TableView'] = {
    render: (items) => <TableView items={items}/>,
    renderIcon: () => <span className="glyphicon glyphicon-th-list"></span>};
presenters['TilesView'] = {
    render: (items) => <TilesView items={items}/>,
    renderIcon: () => <span className="glyphicon glyphicon-th"></span>};
