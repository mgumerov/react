var React = require('react');

var TableView = React.createClass({

  columns: 
    [
     "Название",
     "Цена",
     "Класс нагрузки",
     "Фаска",
     { name: "Картинка", present: (url) => <img src={url}/> }
    ]
    .map(column => column.name ? column : { name: column } ),

  getInitialState: function() {
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

  render: function() {
    var page = this.state.data;
    return (
<div className="table-responsive">
<table className="table data" id="myTable">
  <thead>
        <tr>
            {this.columns.map((column, i) =>
                <td key={i}> {column.name} </td>
            )}
        </tr>
  </thead>
  <tbody>
    {page.map((row, i) => 
        <tr key={row.ID}>
            {this.columns.map((column, i) =>
                <td key={i}>
                  {column.present ? column.present(row[column.name]) : row[column.name]}
                </td>
            )}
        </tr>
    )}
  </tbody>
</table>
</div>
    );
  }
});

module.exports = TableView;
