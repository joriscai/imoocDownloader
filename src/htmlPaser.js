'use strict';

let vm = require('vm');
let cheerio = require('cheerio');
let rule = require('../conf/rule');
let ruleParser = require('../lib/ruleParser');


function HtmlParser(html) {
  vm.createContext(this);
  this.$ = this.dom = cheerio.load(html);
}


HtmlParser.prototype.getter = function(opts,callback) {
  this.opts = opts;
  this.callback = callback;
  let query = ruleParser(opts.rule);
  vm.runInContext(
    `var list = ${query};
    list.each(function(index,ele) {
      if(opts.prop){
        callback(null,$(ele).attr(opts.propValue));
      }else{
        callback(null,$(ele).text());
      }
    });`, 
    this
  );
}