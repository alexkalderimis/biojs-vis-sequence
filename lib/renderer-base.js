// Base class for renderers.
var Renderer = module.exports = function Renderer () { }

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

Renderer.optionalProperties = ['addBaseClass', 'width', 'onMouseEnter'];
Renderer.requiredProperties = ['onChangeSelection'];

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
  },

  /**
   * Produce a canvas object.
   */
  getCanvas: function () {
    var canvas = document.createElement('pre');
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
    var base = document.createElement('span');
    var classes = this.getBaseClasses(code, index, row.highlighter);
    base.className = classes.join(' ');
    base.appendChild(document.createTextNode(code));
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
   * Return a representation of the sequence.
   */
  render: function (sequence, id, highlights, annotations) {
    var i, bases, rowBases, row, offset;
    if (sequence.length < 1) {
      return NO_CONTENT;
    }
    var bases = this.getBases(sequence);
    var canvas = this.getCanvas();

    this.renderHeader(canvas, bases, id);
    var highlighter = getHighlightClass.bind(null, highlights);

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
    }

    this.renderFooter(canvas);

    return canvas;
  }
};

