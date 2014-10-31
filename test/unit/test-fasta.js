var assert = require('assert');

var elementFactory = require('../lib/element-factory');
var renderers = require('../../lib/renderers');

describe('FASTA', function () {

  var sequence = 'the quick brown fox jumps over the lazy dog';
  var id = 'sentence';
  var Renderer = renderers.FASTA;

  describe('Sequences that fit on one line', function () {

    var renderer = new Renderer({
      document: elementFactory,
      width: 50
    });

    var element = renderer.render(sequence, id, [], []);
    var expected = '>sentence 43bp\n' + sequence.toUpperCase() + '\n';

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
    var expected =
      ">sentence 43bp\nTHE QUICK \nBROWN FOX \nJUMPS OVER\n THE LAZY \nDOG\n";

    it ('should render the sentence on several lines', function () {
      assert.equal(expected, elementFactory.asText(element));
    });
  });

});

