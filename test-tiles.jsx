var React = require('react');

var TilesView = React.createClass({

  render: function() {
    var page = this.props.items;
    return (
        <div className="row" id="myTiles">
            {page.map((item, i) =>
              <div className="col-sm-4 col-md-3 col-lg-2" key={item.ID}>
                  <div className="thumbnail"><img src={item['Картинка']}/></div>
                  <div className="caption text-center">{item['Название']}</div>
                  <p>Цена: Цена</p><p>Класс нагрузки: {item["Класс нагрузки"]}</p><p>Фаска: {item["Фаска"]}</p>
              </div>
            )}
        </div>
    );
  }
});

module.exports = TilesView;
