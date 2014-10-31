var Events = require('biojs-events');

function Model (attributes, defaults) {
  this.attributes = {};
  this.defaults = (defaults || {});
  if (attributes) {
    for (var key in attributes) {
      this.attributes[key] = attributes[key];
    }
  }
}

Events.mixin(Model.prototype);

Model.prototype.has = function (key) {
  return this.attributes.hasOwnProperty(key);
};

Model.prototype.get = function (key) {
  if (this.attributes.hasOwnProperty(key)) {
    return this.attributes[key];
  }
  return this.defaults[key];
};

Model.prototype.set = function (properties, options) {
  var old, now, key, toSet, self = this, changes = [];
  if (arguments.length >= 2 && ('string' === typeof arguments[0])) {
    toSet = {};
    toSet[arguments[0]] = arguments[1];
    return this.set(toSet, arguments[2]);
  }
  for (key in properties) {
    old = this.attributes[key];
    now = properties[key];
    if (old !== now) {
      changes.push(['change:' + key, now, old]);
      this.attributes[key] = now;
    }
  }
  if (options && options.silent) return;

  changes.forEach(function (change) {
    self.trigger.apply(self, change);
  });
  self.trigger('change');
  return this;
};

Model.prototype.update = function (key, f, options) {
  var newValue = f(this.get(key));
  return this.set(key, newValue, options);
};

Model.prototype.callMethod = function (key, meth) {
  var args = [].slice.call(arguments, 2);
  var updater = function (o) { return o[meth].apply(o, args); };
  return this.update(key, updater);
}


module.exports = Model;
