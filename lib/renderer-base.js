// Base class for renderers.

'use strict';

var classNamesFor = {
  A: 'adenine',
  C: 'cytosine',
  G: 'guanine',
  T: 'thymine'
};
var baseToClass = function (code) {
  return classNamesFor[code.toUpperCase()];
};

var UNIMPLEMENTED = function () { throw new Error("Not implemented"); };
var NO_OP = function () {};

var Renderer = module.exports = function Renderer () { };
Renderer.optionalProperties = ['document', 'addBaseClass'];
Renderer.callbacks = ['initToolTip', 'onChangeSelection', 'onMouseEnter']
Renderer.requiredProperties = ['width'];

/**
  * Get the highlight class for a base at the given 1-based index.
  */
var getHighlightClass = function (highlights, basePosition) {
  var cssClass = '';
  // Last one takes precedence.
  highlights.forEach(function (hl) {
    if (basePosition >= hl.start && basePosition <= hl.end) {
      cssClass = hl.kind;
    }
  });
  return cssClass;
};

Renderer.prototype = {

  /**
   * Subclasses must provide an implementation that renders a header to a canvas.
   */
  renderHeader: UNIMPLEMENTED,

  /**
   * Subclasses must provide an implementation that renders a row of bases.
   */
  renderRow: UNIMPLEMENTED,

  /**
   * Subclasses must provide an implementation that renders a footer.
   */
  renderFooter: UNIMPLEMENTED,

  /**
   * Subclasses must provide an implementation that renders an annotation row.
   */
  renderAnnotationRow: UNIMPLEMENTED,

  /**
   * Return a representation of the sequence.
   * @param {string} sequence The sequence.
   * @param {string} id The identifier of this sequence.
   * @param {Array} highlights The description of which sections to highlight.
   * @param {Array} annotations The description of which sections to annotate.
   * @return {Element} Some representation of the sequence.
   */
  render: function (sequence, id, highlights, annotations) {
    var rowAnns, highlighter, canvas, i, bases, rowBases, row, offset;
    if (!sequence || sequence.length < 1) {
      return this.renderNoContent();
    }
    bases = this.getBases(sequence);
    canvas = this.getCanvas();

    this.renderHeader(canvas, bases, id);
    highlighter = getHighlightClass.bind(null, highlights);

    for (i = 1, offset = 0; offset < bases.length; offset += this.width, i++) {
      rowBases = bases.slice(offset, offset + this.width);
      row = {
        idx: i,
        bases: rowBases,
        start: offset + 1,
        end: offset + this.width,
        highlighter: highlighter
      };
      this.renderRow(canvas, row);
      if (rowAnns = this.getAnnotationsForRow(annotations, row)) {
        this.renderAnnotationRow(canvas, rowAnns, row);
      }

    }

    this.renderFooter(canvas);

    return canvas;
  },

  /**
   * Get the annotations that are relevant for a particular row.
   */
  getAnnotationsForRow: function (annotations, row) {
    var matching = (annotations || []).filter(function (a) {
      var i, len = a.regions.length;
      for (i = 0; i < len; i++) {
        if (overlap(a.regions[i], row)) {
          return true;
        }
      }
      return false;
    });
    if (matching.length) {
      return matching;
    } else {
      return null;
    }
  },

  /**
   * Common initialisation logic.
   */
  init: function init (opts) {
    this.bases = [];
    Renderer.optionalProperties.forEach(function (name) {
      if (opts[name]) this[name] = opts[name];
    }.bind(this));

    Renderer.requiredProperties.forEach(function (name) {
      if (!opts[name]) {
        throw new Error("Missing required option: " + name);
      }
      this[name] = opts[name];
    }.bind(this));

    Renderer.callbacks.forEach(function (name) {
      if (opts[name]) {
        this[name] = opts[name];
      } else {
        this[name] = NO_OP;
      }
    }.bind(this));

    // Allow document factory to be injected.
    if (!this.document) {
      this.document = document;
    }
  },

  /**
   * Produce a canvas object.
   */
  getCanvas: function () {
    var canvas = this.document.createElement('pre');
    canvas.className = 'sequence-canvas ' + this.format.toLowerCase();
    return canvas;
  },

  /**
   * Get the bases to render
   */
  getBases: function (seq) { return seq.split('').map(this.transformBase); },

  /**
   * The transformation to perform on each base - by default upper-case.
   */
  transformBase: function (x) { return x.toUpperCase(); },


  /**
   * Get all the CSS-classes that should be applied to the base at the given 1-based index.
   */
  getBaseClasses: function (code, index, highlighter) {
    var classes = ['seq-base'];
    var baseClass = baseToClass(code);
    if (baseClass && this.addBaseClass) {
      classes.push(baseClass);
    }
    classes.push(highlighter(index));
    return classes;
  },

  /**
   * Return a representation of the base.
   */
  renderBase: function (row, rowIndex) {
    var code = row.bases[rowIndex];
    var index = row.start + rowIndex;
    var self = this;
    var base = this.document.createElement('span');
    var classes = this.getBaseClasses(code, index, row.highlighter);
    base.className = classes.join(' ');
    base.appendChild(this.document.createTextNode(code));
    base.addEventListener('mouseover', function () {
      self.onMouseEnter(index);
    });
    self.onChangeSelection(function (selection) {
      if (index >= selection.start && index <= selection.end) {
        base.classList.add('selection');
      } else {
        base.classList.remove('selection');
      }
    });
    return base;
  },

  /**
   * Return the representation of no sequence.
   * @return {Element} Some representation of nothing.
   */
  renderNoContent: function () {
    var nothing = this.document.createElement('div');
    nothing.appendChild(this.document.createTextNode('No sequence available'));
    return nothing;
  }

};

function overlap (a, b) {
  var toTheLeft = (a.start > b.end);
  var toTheRight = (a.end < b.start);
  var anyCornerInside = [a.start, a.end].reduce(function (inside, pos) {
    return inside || (b.start <= pos && pos <= b.end);
  }, false);
  return anyCornerInside || (!toTheLeft && !toTheRight);
}

