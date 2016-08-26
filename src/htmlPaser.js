'use strict';

let vm = require('vm');
let cheerio = require('cheerio');
let ruleParser = require('../lib/ruleParser');

/**
 * [HtmlParser description]
 * @param {[type]} html [description]
 */
function HtmlParser(html) {
  vm.createContext(this);
  this.$ = this.dom = cheerio.load(html);
}

/**
 * [getter description]
 * @param  {[type]}   opts     [description]
 * @param  {Function} callback [description]
 */
HtmlParser.prototype.getter = function(opts, callback) {
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
};
