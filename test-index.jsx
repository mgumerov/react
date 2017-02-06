var React = require('react');
var TableView = require('./test-tabular');

//Main view, TODO split into components
var Workspace = React.createClass({

  toggleLiked: function() {
    this.setState({
      liked: !this.state.liked
    });
  },

  getInitialState: function() {
    return {
      liked: false
    };
  },

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

<TableView/>

<div className="row" id="myTiles">
</div>
              <div className="col-sm-4 col-md-3 col-lg-2">
                  <div name="thumbnail"><img src="Картинка"/></div>
                  <div className="caption text-center">Название</div>
                  <p>Цена: Цена</p><p>Класс нагрузки: "Класс нагрузки"</p><p>Фаска: Фаска</p>
              </div>

<div className="col-md-12 text-center">
<ul className="pagination pull-left">
  <li className="page-item view-mode view-list"><a className="page-link" href = "#"><span className="glyphicon glyphicon-th-list"></span></a></li>
  <li className="page-item view-mode view-tiles"><a className="page-link" href = "#"><span className="glyphicon glyphicon-th"></span></a></li>
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
  }
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
