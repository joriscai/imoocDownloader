'use strict';

let cheerio = require('cheerio');


function HtmlParser(html) {
  this.html = html;
}


HtmlParser.prototype.parseRule = function(rule) {
  
}


HtmlParser.prototype.dom = function(html) {
  this.dom = cheerio.load(html);
}