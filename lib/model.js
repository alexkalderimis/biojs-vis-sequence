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
  var old, now, key, self = this, changes = [];
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
};

module.exports = Model;
