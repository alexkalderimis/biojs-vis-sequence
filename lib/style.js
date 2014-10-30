module.exports = function applyStyle (css, document) {
  if (document.createStyleSheet) {
    stylesheet = document.createStyleSheet();
    stylesheet.cssText = css;
  } else {
    head = document.getElementsByTagName('head')[0];
    stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    if (stylesheet.styleSheet) {
      stylesheet.styleSheet.cssText = css;
    } else {
      stylesheet.appendChild(document.createTextNode(css));
    }
    head.appendChild(stylesheet);
  }
};
