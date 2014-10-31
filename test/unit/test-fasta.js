var assert = require('assert');

var elementFactory = require('../lib/element-factory');
var renderers = require('../../lib/renderers');

describe('FASTA', function () {

  var sequence = 'the quick brown fox jumps over the lazy dog';
  //              1234567890123456789012345678901234567890123
  //              0        1         2         3         4
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

  describe('Bases', function () {

    var handlers = [];
    var onChangeSelection = function (handler) {
      handlers.push(handler);
    };
    var triggerChangeSelection = function (selection) {
      handlers.forEach(function (handler) {
        handler(selection);
      });
    };
    var renderer = new Renderer({
      document: elementFactory,
      onChangeSelection: onChangeSelection,
      width: 50
    });

    describe('Initial state', function () {
      var element = renderer.render(sequence, id, [], []);
      var bases = elementFactory.findByClassName(element, 'seq-base');
      var selected = elementFactory.findByClassName(element, 'selection');

      it('should have 43 bases', function () {
        assert.equal(43, bases.length);
      });

      it('should not have any selected bases', function () {
        assert.equal(0, selected.length);
      });
    });

    describe('Responding to selection events', function () {
      var element = renderer.render(sequence, id, [], []);
      triggerChangeSelection({start: 17, end: 19});

      var selected = elementFactory.findByClassName(element, 'selection');

      it('should have 5 selected bases', function () {
        assert.equal(3, selected.length);
      });

      it('should have selected the word "fox"', function () {
        var word = selected.map(function (elem) {
          return elem._children[0]._textContent;
        }).join('');
        assert.equal('FOX', word);
      });

    });

  });

});

