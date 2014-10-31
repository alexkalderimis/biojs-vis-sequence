// --- Mock library for testing rendering.

function ClassList (el) {
  var classes = el.className.split(' ');
  this.add = function (c) {
    classes.push(c);
    el.className = classes.join(' ');
  };
  this.remove = function (c) {
    classes = classes.filter(function (existing) {
      return existing !== c;
    });
    el.className = classes.join(' ');
  };
}

function MockElement (tagName) {
  this.tagName = tagName;
  this.className = '';

  this._events = {};
  this._children = [];
  this.classList = new ClassList(this);
}

MockElement.prototype = {

  addEventListener: function (evt, handler) {
    var handlers = this.getEventListeners(evt);
    handlers.push(handler);
  },

  getEventListeners: function (evt) {
    return (this._events[evt] || (this._events[evt] = []));
  },

  appendChild: function (child) {
    this._children.push(child);
  }

};

function MockTextNode (contents) {
  this._textContent = contents;
}

function getTextOfTree (tree) {
  var buff = [];
  if (tree._textContent) {
    buff.push(tree._textContent);
  }
  if (tree._children) {
    tree._children.forEach(function (child) {
      buff.push(getTextOfTree(child));
    });
  }
  return buff.join('');
}
function findByClassName (tree, className) {
  var found = [];
  if (tree.className && tree.className.indexOf(className) >= 0) {
    found.push(tree);
  }
  if (tree._children) {
    tree._children.forEach(function (child) {
      found = found.concat(findByClassName(child, className));
    });
  }
  return found;
}

var ElementFactory = module.exports = {
  createElement: function (tagName) {
    var element = new MockElement(tagName);
    if (tagName === 'br') {
      element.appendChild(new MockTextNode('\n'));
    }
    return element;
  },
  createTextNode: function (text) {
    return new MockTextNode(text);
  },
  findByClassName: findByClassName,
  asText: getTextOfTree
};

