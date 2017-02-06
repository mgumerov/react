/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

var TableView = React.createClass({
  displayName: "TableView",


  columns: ["Название", "Цена", "Класс нагрузки", "Фаска", { name: "Картинка", present: url => React.createElement("img", { src: url }) }].map(column => column.name ? column : { name: column }),

  getInitialState: function () {
    return { data: [{
        "ID": 12767,
        "Артикул": "ip-lam-02-0020",
        "Поставщик": "ip_balt",
        "Бренд": "Balterio",
        "Название": "Дуб aмбарный",
        "Единица измерения": "кв.м",
        "Базовая цена": 680,
        "Цена": 850,
        "Страна": "Бельгия",
        "Коллекция": "Senator",
        "Класс нагрузки": 32,
        "Фаска": "нет",
        "Эффекты": "",
        "Размер планки, мм": "189x1261x7",
        "Планок в упаковке, шт": 10,
        "Вес упаковки": null,
        "Кратность отгрузки, кв.м": 2.383,
        "Структура поверхности": "древесная",
        "Формат панели": "однополосный",
        "Тип соединения": "",
        "Защита от разбухания": "",
        "Пропитка кантов по периметру": "",
        "Антистатическое покрытие": "",
        "Наличие подложки": "",
        "Цвет": "",
        "Площадь планки": 0.238329,
        "Картинка": "http://popolam-nn.ru/i/o/c8/328_SEN.jpg"
      }]
    };
  },

  render: function () {
    var page = this.state.data;
    return React.createElement(
      "div",
      { className: "table-responsive" },
      React.createElement(
        "table",
        { className: "table data", id: "myTable" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            this.columns.map((column, i) => React.createElement(
              "td",
              { key: i },
              " ",
              column.name,
              " "
            ))
          )
        ),
        React.createElement(
          "tbody",
          null,
          page.map((row, i) => React.createElement(
            "tr",
            { key: row.ID },
            this.columns.map((column, i) => React.createElement(
              "td",
              { key: i },
              column.present ? column.present(row[column.name]) : row[column.name]
            ))
          ))
        )
      )
    );
  }
});

module.exports = TableView;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);
var TableView = __webpack_require__(1);

//Main view, TODO split into components
var Workspace = React.createClass({
  displayName: 'Workspace',


  toggleLiked: function () {
    this.setState({
      liked: !this.state.liked
    });
  },

  getInitialState: function () {
    return {
      liked: false
    };
  },

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'form-inline' },
        React.createElement(
          'div',
          { className: 'form-group' },
          '\u0424\u0438\u043B\u044C\u0442\u0440\u044B:'
        ),
        React.createElement(
          'div',
          { className: 'form-group dropdown ', 'data-filter-bind': 'bindClassFilter', 'data-filter-load': 'loadClassFilter', 'data-filter-clear': 'clearChecklistFilter' },
          React.createElement(
            'button',
            { type: 'button', className: 'btn btn-default btn-sm dropdown-toggle', 'data-toggle': 'dropdown' },
            '\u041A\u043B\u0430\u0441\u0441 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438',
            React.createElement('span', { className: 'caret' })
          ),
          React.createElement(
            'ul',
            { className: 'dropdown-menu' },
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#', className: 'small', tabIndex: '-1' },
                '\u041B\u044E\u0431\u043E\u0439'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#', className: 'small', 'data-value': '31', tabIndex: '-1' },
                React.createElement('input', { type: 'checkbox' }),
                '\xA031'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#', className: 'small', 'data-value': '32', tabIndex: '-1' },
                React.createElement('input', { type: 'checkbox' }),
                '\xA032'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#', className: 'small', 'data-value': '33', tabIndex: '-1' },
                React.createElement('input', { type: 'checkbox' }),
                '\xA033'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#', className: 'small', 'data-value': '34', tabIndex: '-1' },
                React.createElement('input', { type: 'checkbox' }),
                '\xA034'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group dropdown ', 'data-filter-bind': 'bindBrandFilter', 'data-filter-load': 'loadBrandFilter', 'data-filter-clear': 'clearChecklistFilter' },
          React.createElement(
            'button',
            { type: 'button', className: 'btn btn-default btn-sm dropdown-toggle', 'data-toggle': 'dropdown' },
            '\u0411\u0440\u0435\u043D\u0434',
            React.createElement('span', { className: 'caret' })
          ),
          React.createElement(
            'ul',
            { className: 'dropdown-menu' },
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { href: '#', className: 'small', tabIndex: '-1' },
                '\u041B\u044E\u0431\u043E\u0439'
              )
            )
          )
        )
      ),
      React.createElement('p', { className: 'debug', id: 'urldebug' }),
      React.createElement(TableView, null),
      React.createElement('div', { className: 'row', id: 'myTiles' }),
      React.createElement(
        'div',
        { className: 'col-sm-4 col-md-3 col-lg-2' },
        React.createElement(
          'div',
          { name: 'thumbnail' },
          React.createElement('img', { src: '\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430' })
        ),
        React.createElement(
          'div',
          { className: 'caption text-center' },
          '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435'
        ),
        React.createElement(
          'p',
          null,
          '\u0426\u0435\u043D\u0430: \u0426\u0435\u043D\u0430'
        ),
        React.createElement(
          'p',
          null,
          '\u041A\u043B\u0430\u0441\u0441 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438: "\u041A\u043B\u0430\u0441\u0441 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438"'
        ),
        React.createElement(
          'p',
          null,
          '\u0424\u0430\u0441\u043A\u0430: \u0424\u0430\u0441\u043A\u0430'
        )
      ),
      React.createElement(
        'div',
        { className: 'col-md-12 text-center' },
        React.createElement(
          'ul',
          { className: 'pagination pull-left' },
          React.createElement(
            'li',
            { className: 'page-item view-mode view-list' },
            React.createElement(
              'a',
              { className: 'page-link', href: '#' },
              React.createElement('span', { className: 'glyphicon glyphicon-th-list' })
            )
          ),
          React.createElement(
            'li',
            { className: 'page-item view-mode view-tiles' },
            React.createElement(
              'a',
              { className: 'page-link', href: '#' },
              React.createElement('span', { className: 'glyphicon glyphicon-th' })
            )
          )
        ),
        React.createElement(
          'nav',
          null,
          React.createElement(
            'ul',
            { className: 'pagination tablepages' },
            React.createElement(
              'li',
              { className: 'page-item' },
              React.createElement(
                'a',
                { className: 'page-link page-direct', 'data-visible': 'vis.home', href: '#' },
                '1'
              )
            ),
            React.createElement(
              'li',
              { className: 'page-item' },
              React.createElement(
                'a',
                { className: 'page-link page-prev', 'data-visible': 'vis.prev', href: '#' },
                '\xAB'
              )
            ),
            React.createElement(
              'li',
              { className: 'page-item active' },
              React.createElement('a', { className: 'page-link page-direct', 'data-source': 'page', href: '#' })
            ),
            React.createElement(
              'li',
              { className: 'page-item' },
              React.createElement(
                'a',
                { className: 'page-link page-next', 'data-visible': 'vis.next', href: '#' },
                '\xBB'
              )
            ),
            React.createElement(
              'li',
              { className: 'page-item' },
              React.createElement('a', { className: 'page-link page-direct', 'data-source': 'pageCnt', 'data-visible': 'vis.end', href: '#' })
            )
          )
        )
      )
    );
  }
});

function run() {
  var ReactDOM = __webpack_require__(2);
  ReactDOM.render(React.createElement(Workspace, null), document.getElementById('workspace'));
}

//No idea why so complex, saw this on the Internet :)
const loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}

/***/ })
/******/ ]);