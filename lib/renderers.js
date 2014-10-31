var Renderer = require('./renderer-base');

var SPACE = ' ';

var NO_OP = function () { };

//---------- Renderer for FASTA

var FastaRenderer = exports.FASTA = function (options) {
  this.init(options);
};

FastaRenderer.prototype = new Renderer();

FastaRenderer.prototype.format = 'FASTA';

FastaRenderer.prototype.renderHeader = function (canvas, bases, id) {
  var header = this.document.createTextNode('>' + id + ' ' + bases.length + 'bp');
  canvas.appendChild(header);
  canvas.appendChild(this.document.createElement('br'));
};

FastaRenderer.prototype.renderFooter = NO_OP;

FastaRenderer.prototype.renderAnnotationRow = function (canvas, annotations, row) {
  var i, self = this;
  for (i = 0; i < row.bases.length; i++) {
    var index = row.start + i;
    var annotatedBase = this.document.createElement('span');
    var content = SPACE;
    annotations.forEach(function (a) {
      a.regions.forEach(function (r) {
        if (content === SPACE && r.start <= index && r.end >= index) {
          content = '^';
          annotatedBase.className = 'annotation';
          if (a.className) {
            annotatedBase.classList.add(a.className);
          } else {
            annotatedBase.classList.add('annotation-default');
          }
          self.initToolTip(annotatedBase, function () {
            // Default to annotation name if no description provided.
            return (a.description || {text: a.name});
          });
        }
      });
    });
    annotatedBase.appendChild(this.document.createTextNode(content));
    canvas.appendChild(annotatedBase);
  }
  canvas.appendChild(this.document.createElement('br'));
};

FastaRenderer.prototype.renderRow = function (canvas, row) {
  var i, base;
  for (i = 0; i < row.bases.length; i++) {
    base = this.renderBase(row, i);
    canvas.appendChild(base);
  }
  canvas.appendChild(this.document.createElement('br'));
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
  canvas.appendChild(this.document.createElement('br'));
  canvas.appendChild(this.document.createTextNode('///'));
};
CodataRenderer.prototype.renderAnnotationRow = NO_OP;

CodataRenderer.prototype.renderHeader = function (canvas, bases, id) {
  var i, x, needed, buff = [];
  canvas.appendChild(this.document.createTextNode('ENTRY           '));
  canvas.appendChild(this.document.createTextNode(id));
  canvas.appendChild(this.document.createElement('br'));
  canvas.appendChild(this.document.createTextNode('SEQUENCE'));
  canvas.appendChild(this.document.createElement('br'));

  for (i = 0; i < this.leftMarginSize; i++) {
    buff.push(SPACE);
  }
  buff.push(this.gutter);
  var maxN = Math.min(bases.length, this.width);

  for (i = this.groupWidth; i <= maxN; i += this.groupWidth) {
    x = String(i);
    for (needed = (this.groupWidth * 2) - (1 + x.length); needed > 0; needed--) {
      buff.push(SPACE);
    }
    buff.push(x);
    buff.push(SPACE);
  }

  var header = this.document.createElement('span');
  header.className = 'sequence-header';
  header.appendChild(this.document.createTextNode(buff.join('')));
  canvas.appendChild(header);
  canvas.appendChild(this.document.createElement('br'));
};

CodataRenderer.prototype.renderInterBase = function (row, base, interbaseIndex) {
  var interbase = this.document.createElement('span');
  var classes = this.getBaseClasses(base, interbaseIndex, row.highlighter);
  classes.push('interbase');
  interbase.className = classes.join(' ');
  interbase.appendChild(this.document.createTextNode(SPACE));
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
  canvas.appendChild(this.document.createTextNode(buff.join('')));
  for (i = 0; i < row.bases.length; i++) {
    base = this.renderBase(row, i);
    canvas.appendChild(base);
    if (i + 1 < row.bases.length) {
      var interbaseIndex = row.start + i + 0.5;
      var interbase = this.renderInterBase(row, row.bases[i], interbaseIndex);
      canvas.appendChild(interbase);
    }
  }
  canvas.appendChild(this.document.createElement('br'));
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

PrideRenderer.prototype.renderAnnotationRow = NO_OP;

PrideRenderer.prototype.renderLabel = function (num) {
  var label = String(num);
  var buff = [];
  for (needed = (this.marginSize - label.length); needed > 0; needed--) {
    buff.push('0');
  }
  buff.push(label);
  return this.document.createTextNode(buff.join(''));
};

PrideRenderer.prototype.renderRow = function (canvas, row) {
  var needed, i, base;

  canvas.appendChild(this.renderLabel(row.start));
  canvas.appendChild(this.document.createTextNode(this.gutter));

  for (i = 0; i < row.bases.length; i++) {
    if (i > 0 && i % this.groupWidth === 0) {
      canvas.appendChild(this.document.createTextNode(this.aisle));
    }
    base = this.renderBase(row, i);
    canvas.appendChild(base);
  }
  if (i === this.width) {
    canvas.appendChild(this.document.createTextNode(this.gutter));
    canvas.appendChild(this.renderLabel(row.end));
  }
  canvas.appendChild(this.document.createElement('br'));
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
RawRenderer.prototype.renderAnnotationRow = NO_OP;

RawRenderer.prototype.renderRow = function (canvas, row) {
  var needed, i, base;
  for (i = 0; i < row.bases.length; i++) {
    base = this.renderBase(row, i);
    canvas.appendChild(base);
  }
  canvas.appendChild(this.document.createElement('br'));
};

