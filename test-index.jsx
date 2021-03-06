var React = require('react');
var TableView = require('./test-tabular');
var TilesView = require('./test-tiles');
var Pagination = require('./test-pagination');
var CLBFilter = require('./test-clbfilter');
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
  <CLBFilter title="Класс нагрузки" onChange={this.onFilterChange} items={ {"31":31, "32":32, "33":33, "34":34} } checks={toChecks(this.state.filters.classes)}/>
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

<Pagination thisPage={this.state.page} lastPage={this.state.pageCnt} onClick={this.onPagerClick}/>

</div>

</div>
    );
  },

  getInitialState: function() {
    return {
      page: null,
      pageCnt: null,
      items: [],
      filters: {},
      //name of actual presenter used, now this IS a part of component state
      presenter: (list => {for (var any in list) return any;})(presenters)
    };
  },

  componentDidMount: function() {
    this.queryData(1);
  },

  setPresenter: function (name) {
    this.setState({presenter: name});
  },

  present: function (items) {
    return (presenters[this.state.presenter]).render(items);
  },

  onPagerClick: function(pageNum) {
    this.queryData(pageNum);
  },

  onFilterChange: function (callback) {
    var newChecks = callback(toChecks(this.state.filters.classes));
    var newFilter = fromChecks(newChecks);
    this.setState(state => {
       var newFilters = {};
       for (key in Object.keys(state.filters)) newFilters[key] = state.filters[key];
       newFilters.classes = newFilter;
       return {filters: newFilters};
    });
  },

  //Minimize island of components which are held by any pending queries after un-mounting - they will hold this thunk instead
  onDataChange: {
    owner: null,

    process: function (result, pageNum) { 
      if (!this.owner)
          return;

      var pgcount = Math.ceil(result.total / pageSize);

      //Если такой страницы уже нет, ничего не делаем и вместо этого потребуем переход на ту, которая по нашим данным есть
      //Может получиться, что фильтр сменился за это время на гуи, и возможно придется еще раз перечитать,
      //  но это уже забота этого следующего порожденного нами асинка, не наша
      if (pageNum > pgcount) {
        //Заметим, что всякий раз номер страницы уменьшается, т.е. вечный цикл невозможен. Но конечно возможно, в теории,
        //адское торможение, если сервер будет постепенно удалять элементы, и успевать каждый раз уменьшить кол-во страниц на 1
        //как раз тогда, когда мы решили перейти на страницу назад; todo возможно, следует после 2-3 попыток сбрасывать сразу на первую страницу.
        //todo Ручной переход на страницу например "1" должен откючать уже запущенные такие "автоматические" коррекционные повторные переходы, 
        //  не то они отменят его действие
        this.owner.startSetPage(pgcount, pageSize, this.state.filters);
        return;
      }

      //note the "(" before the map declaration - without it this would be recognized as method body, not the returned value :)
      this.owner.setState((state, props) => ({
          items: result.page,
          page: pageNum,
          pageCnt: pgcount
      }));
    }
  },

  queryData: function(pageNum) {
    var _this = this;
    data.startGetPage(pageNum, pageSize, this.state.filters)
        .then(result => _this.onDataChange.process(result, pageNum));
  },

  componentWillMount: function() {
    this.onDataChange.owner = this;
  },

  componentWillUnmount: function() {
    this.onDataChange.owner = null;
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

//todo make part of component state
var pageSize = 12;

function gatherHash(array) {
  return array.reduce( (hash, e) => {hash[e] = null; return hash}, {} );
}

function toChecks(clbfilter) {
  return clbfilter ? gatherHash(clbfilter) : {};
}

function fromChecks(checksmap) {
  return Object.keys(checksmap);
}

//register available presenters; constant and NOT a part of component state
var presenters = {}
presenters['TableView'] = {
    render: (items) => <TableView items={items}/>,
    renderIcon: () => <span className="glyphicon glyphicon-th-list"></span>};
presenters['TilesView'] = {
    render: (items) => <TilesView items={items}/>,
    renderIcon: () => <span className="glyphicon glyphicon-th"></span>};
