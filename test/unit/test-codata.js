var assert = require('assert');

var elementFactory = require('../lib/element-factory');
var renderers = require('../../lib/renderers');

describe('CODATA', function () {

  var sequence = 'the quick brown fox jumps over the lazy dog';
  var id = 'sentence';
  var Renderer = renderers.CODATA;

  describe('Sequences that fit on one line', function () {

    var renderer = new Renderer({
      document: elementFactory,
      width: 50
    });

    var element = renderer.render(sequence, id, [], []);
    var expected = '>sentence 43bp\n' + sequence.toUpperCase() + '\n';
    var expected = ['ENTRY           sentence',
          'SEQUENCE',
          '                 5        10        15        20        25        30        35        40 ',
          '      1  T H E   Q U I C K   B R O W N   F O X   J U M P S   O V E R   T H E   L A Z Y   D O G',
          '',
          '///'].join('\n');

    it ('should render the sentence on one line', function () {
      assert.equal(expected, elementFactory.asText(element));
    });
  });

  describe('Sequences that must be split', function () {

    var renderer = new Renderer({
      document: elementFactory,
      width: 10
    });

    var element = renderer.render(sequence, id, [], []);
    var expected = [
          'ENTRY           sentence',
          'SEQUENCE',
          '                 5        10 ',
          '      1  T H E   Q U I C K  ',
          '     11  B R O W N   F O X  ',
          '     21  J U M P S   O V E R',
          '     31    T H E   L A Z Y  ',
          '     41  D O G',
          '',
          '///'].join('\n');

    it ('should render the sentence on multiple lines', function () {
      assert.equal(expected, elementFactory.asText(element));
    });
  });

});

