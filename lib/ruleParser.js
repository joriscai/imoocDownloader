'use strict';

let cheerio = require('cheerio');

const levelReg = /<\s*[^/<>]+\/?\s*>/ig;
const elementReg = /^<\s*(\w+)/i;

//属性匹配正则表达式
const propRegs = {
  id : /id\s*=\s*"([^"]*)"/i,
  class : /class\s*=\s*"([^"]*)"/i,
  type : /type\s*=\s*"([^"]*)"/
}

/**
 * dom规则生成查找语句
 * @param  {String} rule dom查找规则
 * @return {String} statement 查找语句 
 */
function ruleParser(rule) {
  if (!rule) {
    throw new Error('请输入dom规则');
  }
  if (Object.prototype.toString.call(rule) !== '[object String]') {
    throw new Error('请输入字符串类型的dom规则');
  }
  let Level = rule.match(levelReg);
  if (Level === null) {
    return null;
  }
  return gen(Level.map(function(current,index) {
    let ele = {
      element : current.match(elementReg)[1]
    };
    for (let prop in propRegs) {
      if (propRegs[prop].test(current)) {
        ele[prop] = current.match(propRegs[prop])[1];
      }
    }
    return ele;
  }));
}

/**
 * 生成语句
 * @param  {Array} level 元素节点集
 * @return {String} statement 查找语句
 */
function gen(level) {
  let statement = `this.dom("${level[0]['element']}${level[0]['id']? 
                  '#' + level[0]['id'] : ''}${level[0]['class']? 
                  '.' + level[0]['class'] : ''}")`;
  if(level.length === 1){
    return statement;
  }
  for (let i = 1,len = level.length; i < len; i++) {
    statement += (`.find("${level[i]['element']}${level[i]['id']? '#' 
              + level[i]['id'] : ''}${level[i]['class']? '.' 
              + level[i]['class'] : ''}")`);
  }
  return statement;
}


exports = module.exports = ruleParser;
