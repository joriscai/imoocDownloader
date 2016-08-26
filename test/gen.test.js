'use strict';

let gen = require('../lib/gen');
let assert = require('chai').assert;
let should = require('chai').should();

describe('generate query statement by rule', function() {
  it('missing rule', function() {
    assert.throws(
      function() {
        gen();
      },
      Error,
      '请输入dom规则'
    )
  });

  it('wrong data type of rule', function() {
    assert.throws(
      function() {
        gen(['<a class="link"></a>']);
      },
      Error,
      '请输入字符串类型的dom规则'
    )
  });

  it('generate query statement correct with <img>', function() {
    gen('<img class="image">').should.equal('$("img.image")');
  });

  it('generate query statement correct with <title>', function() {
    gen('<title></title>').should.equal('$("title")');
  });

  it('generate query statement correct with <div><p>', function() {
    gen('<div id="wrap"><p class="statement"></p></div>').should.equal('$("div#wrap").find("p.statement")');
  });

  it('generate query statement correct with <div><p><a>', function() {
    gen('<div id="wrap"><p class="statement"><a></a></p></div>').should.equal('$("div#wrap").find("p.statement").find("a")');
  });
})