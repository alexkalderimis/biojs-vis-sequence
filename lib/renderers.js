var id = function (x) { return x; };

var SPACE = ' ';

var UNIMPLEMENTED = function () { throw new Error("Not implemented"); };
var NO_OP = function () { };

classNamesFor = {
  A: 'adenine',
  C: 'cytosine',
  G: 'guanine',
  T: 'thymine'
};
var baseToClass = function (code) {
  return classNamesFor[code.toUpperCase()];
};

// Base class for renderers.
function Renderer () {
}

Renderer.prototype = {
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

    this.bases = this.getBases();
  },
  getCanvas: function () {
    var canvas = document.createElement('pre');
    canvas.className = 'sequence-canvas ' + this.format.toLowerCase();
    return canvas;
  },
  getBases: function () { return this.sequence.split('').map(this.transformBase); },
  transformBase: function (x) { return x.toUpperCase(); },
  renderHeader: UNIMPLEMENTED,
  renderRow: UNIMPLEMENTED,
  renderFooter: UNIMPLEMENTED,
  getHighlightClass: function (basePosition) {
    var cssClass = '';
    // Last one takes precedence.
    this.highlights.forEach(function (hl) {
      if (basePosition >= hl.start && basePosition <= hl.end) {
        cssClass = hl.kind;
      }
    });
    return cssClass;
  },
  renderBase: function (code, index) {
    var self = this;
    var base = document.createElement('span');
    var classes = ['seq-base', baseToClass(code)];
    classes.push(this.getHighlightClass(index));
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
  render: function () {
    var i, bases, row, offset;
    if (this.sequence.length < 1) {
      return NO_CONTENT;
    }
    this.bases = this.getBases(this.sequence);
    var canvas = this.getCanvas();

    this.renderHeader(canvas);

    for (i = 1, offset = 0; offset < this.bases.length; offset += this.width, i++) {
      bases = this.bases.slice(offset, offset + this.width);
      row = {idx: i, bases: bases, start: offset + 1, end: offset + this.width};
      this.renderRow(canvas, row);
    }

    this.renderFooter(canvas);

    return canvas;
  }
};

Renderer.optionalProperties = ['width', 'onMouseEnter'];
Renderer.requiredProperties = ['sequence', 'id', 'highlights', 'onChangeSelection'];

//---------- Renderer for FASTA

var FastaRenderer = exports.FASTA = function (options) {
  this.init(options);
};

FastaRenderer.prototype = new Renderer();

FastaRenderer.prototype.format = 'FASTA';

FastaRenderer.prototype.renderHeader = function (canvas) {
  var header = document.createTextNode('>' + this.id + ' ' + this.bases.length + 'bp');
  canvas.appendChild(header);
  canvas.appendChild(document.createElement('br'));
};

FastaRenderer.prototype.renderFooter = NO_OP;

FastaRenderer.prototype.renderRow = function (canvas, row) {
  var i, base;
  for (i = 0; i < row.bases.length; i++) {
    base = this.renderBase(row.bases[i], i + row.start);
    canvas.appendChild(base);
  }
  canvas.appendChild(document.createElement('br'));
};

//--------------- Renderer for CODATA

var CodataRenderer = exports.CODATA = function (options) {
  this.init(options);
};

CodataRenderer.prototype = new Renderer();

CodataRenderer.prototype.format = 'CODATA';
CodataRenderer.prototype.groupWidth = 5;
CodataRenderer.prototype.leftMarginSize = 7;
CodataRenderer.prototype.gutter = SPACE + SPACE;

CodataRenderer.prototype.renderFooter = function (canvas) {
  canvas.appendChild(document.createElement('br'));
  canvas.appendChild(document.createTextNode('///'));
};

CodataRenderer.prototype.renderHeader = function (canvas) {
  var i, x, needed, buff = [];
  canvas.appendChild(document.createTextNode('ENTRY           '));
  canvas.appendChild(document.createTextNode(this.id));
  canvas.appendChild(document.createElement('br'));
  canvas.appendChild(document.createTextNode('SEQUENCE'));
  canvas.appendChild(document.createElement('br'));

  for (i = 0; i < this.leftMarginSize; i++) {
    buff.push(SPACE);
  }
  buff.push(this.gutter);
  var maxN = Math.min(this.bases.length, this.width);

  for (i = this.groupWidth; i <= maxN; i += this.groupWidth) {
    x = String(i);
    for (needed = (this.groupWidth * 2) - (1 + x.length); needed > 0; needed--) {
      buff.push(SPACE);
    }
    buff.push(x);
    buff.push(SPACE);
  }

  var header = document.createElement('span');
  header.className = 'sequence-header';
  header.appendChild(document.createTextNode(buff.join('')));
  canvas.appendChild(header);
  canvas.appendChild(document.createElement('br'));
};
CodataRenderer.prototype.renderInterBase = function (base, interbaseIndex) {
  var interbase = document.createElement('span');
  interbase.className = 'interbase seq-base ' + baseToClass(base) +
    ' ' + this.getHighlightClass(interbaseIndex);
  interbase.appendChild(document.createTextNode(SPACE));
  this.onChangeSelection(function (selection) {
    if (interbaseIndex >= selection.start && interbaseIndex <= selection.end) {
      interbase.classList.add('selection');
    } else {
      interbase.classList.remove('selection');
    }
  });
  return interbase;
};

CodataRenderer.prototype.renderRow = function (canvas, row) {
  var needed, i, base;

  var rowLabel = String(row.start);
  var buff = [];
  for (needed = (this.leftMarginSize - rowLabel.length); needed > 0; needed--) {
    buff.push(SPACE);
  }
  buff.push(rowLabel, this.gutter);
  canvas.appendChild(document.createTextNode(buff.join('')));
  for (i = 0; i < row.bases.length; i++) {
    base = this.renderBase(row.bases[i], i + row.start);
    canvas.appendChild(base);
    if (i + 1 < row.bases.length) {
      var interbaseIndex = row.start + i + 0.5;
      var interbase = this.renderInterBase(row.bases[i], interbaseIndex);
      canvas.appendChild(interbase);
    }
  }
  canvas.appendChild(document.createElement('br'));
};

//--------- Renderer for PRIDE format

var PrideRenderer = exports.PRIDE = function (options) {
  this.init(options);
};

PrideRenderer.prototype = new Renderer();

PrideRenderer.prototype.format = 'PRIDE';
PrideRenderer.prototype.groupWidth = 10;
PrideRenderer.prototype.marginSize = 5;
PrideRenderer.prototype.gutter = SPACE + SPACE;
PrideRenderer.prototype.aisle = SPACE;

PrideRenderer.prototype.renderHeader = NO_OP;

PrideRenderer.prototype.renderFooter = NO_OP;

PrideRenderer.prototype.renderLabel = function (num) {
  var label = String(num);
  var buff = [];
  for (needed = (this.marginSize - label.length); needed > 0; needed--) {
    buff.push('0');
  }
  buff.push(label);
  return document.createTextNode(buff.join(''));
};

PrideRenderer.prototype.renderRow = function (canvas, row) {
  var needed, i, base;

  canvas.appendChild(this.renderLabel(row.start));
  canvas.appendChild(document.createTextNode(this.gutter));

  for (i = 0; i < row.bases.length; i++) {
    if (i > 0 && i % this.groupWidth === 0) {
      canvas.appendChild(document.createTextNode(this.aisle));
    }
    base = this.renderBase(row.bases[i], i + row.start);
    canvas.appendChild(base);
  }
  if (i === this.width) {
    canvas.appendChild(document.createTextNode(this.gutter));
    canvas.appendChild(this.renderLabel(row.end));
  }
  canvas.appendChild(document.createElement('br'));
};

//-----  Renderer for RAW format

var RawRenderer = exports.RAW = function (options) {
  this.init(options);
};

RawRenderer.prototype = new Renderer();
RawRenderer.prototype.format = 'PRIDE';
RawRenderer.prototype.transformBase = function (x) { return x; };
RawRenderer.prototype.renderHeader = NO_OP;
RawRenderer.prototype.renderFooter = NO_OP;

RawRenderer.prototype.renderRow = function (canvas, row) {
  var needed, i, base;
  for (i = 0; i < row.bases.length; i++) {
    base = this.renderBase(row.bases[i], i + row.start);
    canvas.appendChild(base);
  }
  canvas.appendChild(document.createElement('br'));
};

