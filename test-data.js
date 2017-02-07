var React = require('react');
var axios = require('axios');

var result = {};
result.startGetPage =
    //returns a promise which resolves to {total, page} on success and status-text on failure
    function (pageIdx, pageSize, filters) {
        //we use those in async handler so let's make sure they are immutable
        if (typeof pageIdx != "number") throw "Number expected";
        if (typeof pageSize != "number") throw "Number expected";

        return axios({
          headers: { 'Content-Type': 'application/json' },
          url: 'data.json',
          params: { page: pageIdx } //url params for GET //todo + filters
        })
        .then( function done(response) {
                   var filtered = response.data.page;
                   if (filters && filters.classes) {
                     filtered = filtered.filter(_ => filters.classes.includes(_['Класс нагрузки']));
                   }
                   if (filters && filters.brands) {
                     filtered = filtered.filter(_ => filters.brands.includes(_['Бренд']));
                   }
                   //In fact, returns empty array if requested a page beyond all available items
                   return {
                     total: filtered.length,
                     page: filtered.slice(pageSize*(pageIdx-1), pageSize*pageIdx) //todo proper server-side pagination support
                   }
               },
               function failed(response) { return Promise.reject(response.statusText); } );
    };

result.startGetBrands =
    //returns a promise which resolves to Set<string> on success and status-text on failure
    function () {
        return axios({
          headers: { 'Content-Type': 'application/json' },
          url: 'data.json',
          params: { unique: "Бренд" } //url params for GET
        })
        .then( function done(response) {
                   return new Set(response.data.page.map(_ => _["Бренд"]));
               },
               function failed(response) { return Promise.reject(response.statusText); } );
    };

module.exports = result;
