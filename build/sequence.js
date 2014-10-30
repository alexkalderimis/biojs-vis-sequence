require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** 
 * Sequence component 
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, <a href="mailto:secevalliv@gmail.com">Jose Villaveces</a>
 * @version 1.0.0
 * @category 3
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @requires <a href='http://jqueryui.com/download'>jQuery UI 1.8.16</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js"></script>
 *
 * @requires <a href='Biojs.Tooltip.css'>Biojs.Tooltip</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="src/Biojs.Tooltip.js"></script>
 * 
 * @param {Object} options An object with the options for Sequence component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string} sequence 
 *    The sequence to be displayed.
 *    
 * @option {string} [id] 
 *    Sequence identifier if apply.
 *    
 * @option {string} [format="FASTA"] 
 *    The display format for the sequence representation.
 *    
 * @option {Object[]} [highlights] 
 * 	  For highlighting multiple regions. 
 *    <pre class="brush: js" title="Syntax:"> 
 *    [
 *    	// Highlight aminoacids from 'start' to 'end' of the current strand using the specified 'color' (optional) and 'background' (optional).
 *    	{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt; [, id:&lt;idVal1&gt;] [, color: &lt;HTMLColor&gt;] [, background: &lt;HTMLColor&gt;]}, 
 *    	//
 *    	// Any others highlights
 *    	...,  
 *    	// 
 *    	{ start: &lt;startValN&gt;, end: &lt;endValN&gt; [, id:&lt;idValN&gt;] [, color: &lt;HTMLColor&gt;] [, background: &lt;HTMLColor&gt;]}
 *    ]</pre>
 * 
 * <pre class="brush: js" title="Example:"> 
 * highlights : [
 * 		{ start:30, end:42, color:"white", background:"green", id:"spin1" },
 *		{ start:139, end:140 }, 
 *		{ start:631, end:633, color:"white", background:"blue" }
 *	]
 * </pre>
 * 
 * @option {Object} [columns={size:40,spacedEach:10}] 
 * 	  Options for displaying the columns. Syntax: { size: &lt;numCols&gt;, spacedEach: &lt;numCols&gt;}
 * 
 * @option {Object} [selection] 
 * 	  Positions for the current selected region. Syntax: { start: &lt;startValue&gt;, end: &lt;endValue&gt;}
 * 
 * @option {Object[]} [annotations] 
 *    Set of overlapping annotations. Must be an array of objects following the syntax:
 *     		<pre class="brush: js" title="Syntax:">
 *            [ 
 *              // An annotation:
 *              { name: &lt;name&gt;, 
 *                html: &lt;message&gt;, 
 *                color: &lt;color_code&gt;, 
 *                regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt; color: &lt;HTMLColor&gt;}, ...,{ start: &lt;startValN&gt;, end: &lt;endValN&gt;, color: &lt;HTMLColor&gt;}] 
 *              }, 
 *              
 *              // ...
 *              // more annotations here 
 *              // ...
 *            ]
 *    		 </pre>
 *    where:
 *      <ul>
 *        <li><b>name</b> is the unique name for the annotation</li>
 *        <li><b>html</b> is the message (can be HTML) to be displayed in the tool tip.</li>
 *        <li><b>color</b> is the default HTML color code for all the regions.</li>
 *        <li><b>regions</b> array of objects defining the intervals which belongs to the annotation.</li>
 *        <li><b>regions[i].start</b> is the starting character for the i-th interval.</li>
 *        <li><b>regions[i].end</b> is the ending character for the i-th interval.</li>
 *        <li><b>regions[i].color</b> is an optional color for the i-th interval.   
 *      </ul> 
 *      
 * @option {Object} [formatOptions={title:true, footer:true}] 
 * 	  Options for displaying the title. by now just affecting the CODATA format.
 *    <pre class="brush: js" title="Syntax:"> 
 * 		formatOptions : {
 * 			title:false,
 * 			footer:false
 * 		}
 *    </pre>
 *    
 * @example 
 * var theSequence = "METLCQRLNVCQDKILTHYENDSTDLRDHIDYWKHMRLECAIYYKAREMGFKHINHQVVPTLAVSKNKALQAIELQLTLETIYNSQYSNEKWTLQDVSLEVYLTAPTGCIKKHGYTVEVQFDGDICNTMHYTNWTHIYICEEAojs SVTVVEGQVDYYGLYYVHEGIRTYFVQFKDDAEKYSKNKVWEVHAGGQVILCPTSVFSSNEVSSPEIIRQHLANHPAATHTKAVALGTEETQTTIQRPRSEPDTGNPCHTTKLLHRDSVDSAPILTAFNSSHKGRINCNSNTTPIVHLKGDANTLKCLRYRFKKHCTLYTAVSSTWHWTGHNVKHKSAIVTLTYDSEWQRDQFLSQVKIPKTITVSTGFMSI";
 * var mySequence = new Sequence({
 * 		sequence : theSequence,
 * 		target : "YourOwnDivId",
 * 		format : 'CODATA',
 * 		id : 'P918283',
 * 		annotations: [
 *        { name:"CATH", 
 * 	  		color:"#F0F020", 
 * 	  		html: "Using color code #F0F020 ", 
 * 	  		regions: [{start: 122, end: 135}]
 * 		  },
 *        { name:"TEST", 
 *          html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
 *          color:"green", 
 *          regions: [
 *            {start: 285, end: 292},
 *            {start: 293, end: 314, color: "#2E4988"}]
 *        }
 *      ],
 *      highlights : [
 *      	{ start:30, end:42, color:"white", background:"green", id:"spin1" },
 *      	{ start:139, end:140 }, 
 *      	{ start:631, end:633, color:"white", background:"blue" }
 *      ]
 * });	
 * 
 */

var EVT_ON_SELECTION_CHANGE = "selection-change";
var EVT_ON_SELECTION_CHANGED = "selection-changed";
var EVT_ON_ANNOTATION_CLICKED = "annotation-clicked";

var renderers = require('./renderers');
var Model = require('./model');
var Events = require('biojs-events');
var applyStyle = require('./style');

/* Also: sequence, id, width, height */
var DEFAULTS = {
  format : "FASTA",
  selection: { start: 0, end: 0 },
  colouredBases: false,
  numCols: 35,
  highlights : [],
  annotations: [],
  sequenceUrl: 'http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/sequence',
  formatSelectorVisible: true,
  loadStyle: true, // Load default styles onto the page.

  // Strings
  labelFormat: 'Format',
  labelNumCols: 'Columns',
  labelColouredBases: 'Colour Bases',

  // CSS classes - can be overriden.
  controlsClass: 'form-inline',
  controlClass: 'form-group',
  inputClass: 'form-control',
  labelClass: 'form-label'
};

/** @lends Sequence **/
Sequence = function (options) {
  this._container = jQuery(options.target);
  if (this._container.length === 0) {
    this._container = jQuery('#' + options.target);
  }
  this.options = new Model(options, DEFAULTS);

  this._initialize();
};

/** Provides on, off, once, trigger **/
Events.mixin(Sequence.prototype);

/**
  * Array containing the supported event names
  * @name Sequence-eventTypes
  */
Sequence.prototype.eventTypes = [

  /**
    * @name Sequence#onSelectionChanged
    * @event
    * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
    * @eventData {Object} source The component which did triggered the event.
    * @eventData {string} type The name of the event.
    * @eventData {int} start A number indicating the start of the selection.
    * @eventData {int} end A number indicating the ending of selection.
    * @example 
    * mySequence.onSelectionChanged(
    *    function( objEvent ) {
    *       alert("Selected: " + objEvent.start + ", " + objEvent.end );
    *    }
    * ); 
    * 
    * */
  EVT_ON_SELECTION_CHANGED,
  
  /**
    * @name Sequence#onSelectionChange
    * @event
    * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
    * @eventData {Object} source The component which did triggered the event.
    * @eventData {string} type The name of the event.
    * @eventData {int} start A number indicating the start of the selection.
    * @eventData {int} end A number indicating the ending of selection.
    * @example 
    * mySequence.onSelectionChange(
    *    function( objEvent ) {
    *       alert("Selection in progress: " + objEvent.start + ", " + objEvent.end );
    *    }
    * );  
    * 
    * 
    * */
  EVT_ON_SELECTION_CHANGE,
		
  /**
    * @name Sequence#onAnnotationClicked
    * @event
    * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
    * @eventData {Object} source The component which did triggered the event.
    * @eventData {string} type The name of the event.
    * @eventData {string} name The name of the selected annotation.
    * @eventData {int} pos A number indicating the position of the selected amino acid.
    * @example 
    * mySequence.onAnnotationClicked(
    *    function( objEvent ) {
    *       alert("Clicked " + objEvent.name + " on position " + objEvent.pos );
    *    }
    * );  
    * 
    * */
  EVT_ON_ANNOTATION_CLICKED
];

Sequence.prototype.getId = function () {
  return this.opt.id;
};

var TOOLTIP_STYLE = {
  'position': "absolute",
  'z-index': "999999",
  'color': "#fff",
  'font-size': "12px",
  'width': "auto",
  'display': 'none'
};

	// Methods
Sequence.prototype._initialize = function () {

  var self = this;

  this._appendStyle();
		
  ['width','height'].forEach(function (prop) {
    var val = self.options.get(prop);
    if (val > 0) {
      self._container[prop](val);
    }
  });
  
  // Disable text selection
  this._container.toggleClass('no-user-selection', !this.options.get('allowSelection'));

  // DIV for the format selector
  this._buildFormatSelector();
		
  // DIV for the sequence
  this._contentDiv = jQuery('<div>').addClass('sequence-content').appendTo(this._container);
		
  //Initialize tooltip
  this._tooltip = jQuery('<div>')
        .css(TOOLTIP_STYLE)
        .addClass("tooltip")
        .appendTo("body")
        .hide();

  this._bindEvents();

  this._run();
};

Sequence.prototype._run = function () {
  if (this.options.has('sequence')) {
    this.options.trigger('change:format'); // Begin the render cycle.
  } else if (this.options.has('id')) {
    this._requestSequence(this.getId());
  } else {
    this.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
  }
};

Sequence.prototype._bindEvents = function () {
  var self = this;
  var redraw = function () { self._redraw(); };
  var setRenderer = function () {
    self.options.set({renderer: _buildRenderer.call(self)});
  };

  this.options.on('change:format', setRenderer);
  this.options.on('change:colouredBases', setRenderer);
  this.options.on('change:numCols', setRenderer);

  this.options.on('change:sequence', function () {
    self.options.set({highlights: [], annotations: []}, {silent: true});
    self.setSelection(0, 0);
  });
  this.options.on('change:highlights', redraw);
  this.options.on('change:annotations', redraw);
  this.options.on('change:id', redraw);
  this.options.on('change:renderer', redraw);
  this.options.on('change:sequence', redraw);

  this.options.on('change:selection', function (sel) {
    self.trigger(EVT_ON_SELECTION_CHANGED, sel);
  });

  this.options.on('change:allowSelection', function (allowed) {
    self._container.toggleClass('no-user-selection', !allowed);
  });

  this._contentDiv.on('mousedown', function (evt) {
    self.startSelecting();
  });
  this._contentDiv.on('mouseup', function (evt) {
    self.stopSelecting();
  });
  this._contentDiv.on('mouseleave', function (evt) {
    self.stopSelecting();
  });
};

var ICON_WARN = "../biojs/css/images/warning_icon.png";
	
Sequence.prototype._requestSequence = function ( accession ) {
  var self = this;

  jQuery.ajax({ 
    url: this.options.get('sequenceUrl'),
    dataType: "xml",
    data: { segment: accession },
    success: function (xm) {
      try {
        var node = jQuery(xml).find('SEQUENCE:first');
        self.setSequence( node.text(), node.attr("id"), node.attr("label") );
      } catch (e) {
        console.log("Error decoding response data: " + e.message);
        self.clearSequence("No sequence available", ICON_WARN);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error decoding response data: " + textStatus);
      self.clearSequence("Error requesting the sequence to the server " + this.url , ICON_WARN);
    }
  });
};
	
/**
  * Shows the columns indicated by the indexes array.
  * @param {string} seq The sequence strand.
  * @param {string} [identifier] Sequence identifier.
  * 
  * @example 
  * mySequence.setSequence("P99999");
  * 
  */
Sequence.prototype.setSequence = function ( seq, identifier ) {
  if (arguments.length === 1) {
    this._requestSequence( arguments[0] );
  } else {
    this.options.set({sequence: seq, id: identifier});
  }
};
    
	
/**
 * Shows the columns indicated by the indexes array.
 * @param {string} [showMessage] Message to be shown.
 * @param {string} [icon] Icon to be showed a side of the message
 * 
 * @example 
 * mySequence.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
 * 
 */
Sequence.prototype.clearSequence = function ( showMessage, icon ) {

  var message;

  this.setSequence('', '');

  if (showMessage) {
    message = jQuery('<div>')
      .text(showMessage)
      .addClass("message");

    if ( icon ) {
      message.css({
        'background': 'transparent url("' + icon + '") no-repeat center left',
        'padding-left': '20px'
      });
    }
    this._contentDiv.html(message);
  } else {
    this._contentDiv.empty();
  }
};
	
/**
  * Set the current selection in the sequence causing the event {@link Sequence#onSelectionChanged}
  *
  * @example
  * // set selection from the position 100 to 150 
  * mySequence.setSelection(100, 150);
  * 
  * @param {int} start The starting character of the selection.
  * @param {int} end The ending character of the selection
  */
Sequence.prototype.setSelection = function(start, end) {
  // Allow inversion.
  if (start > end) {
    var temp = end;
    end = start;
    start = temp;
  }
  this.options.set({selection: {start: start, end: end}});
};

// Base palette: http://paletton.com/#uid=70p0K0kiCFn8GVde7NVmtwSqXtg
var RULES = [
  '.seq-base.adenine {background: #656cca; color: white;}',
  '.seq-base.cytosine {background: #ffd76b; color: #8A6F25;}',
  '.seq-base.guanine {background: #50c0ad; color: white;}',
  '.seq-base.thymine {background: #ffa76b; color: #A76C45;}',
  '.seq-base.info, .interbase.info {background: #4090f7; color: white;}',
  '.sequence-content {font-family: "Andale mono", courier, monospace; font-size: 12px; text-align: left;}',
  '.sequence-controls {font-family: "Helvetica Neue", Arial, "sans serif"; font-size: 14px}',
  '.no-user-selection {-moz-user-select: none; -webkit-user-select: none; user-select: none;}',
  '.seq-base.selection, .interbase.selection {background: yellow; color: black;}',
];

/**
 * Apply the style to the document.
 */
Sequence.prototype._appendStyle = function () {
  var css, head, stylesheet;
  if (!this.options.get('loadStyle')) {
    return;
  }
  css = RULES.join('\n');
  applyStyle(css, document);
};

/**
  * Changes the current displaying format of the sequence.
  *
  * @example
  * // Set format to 'FASTA'.
  * mySequence.setFormat('FASTA');
  * 
  * @param {string} format The format for the sequence to be displayed.
  */
Sequence.prototype.setFormat = function(format) {
  if (!format) {
    throw new Error("argument is required: format");
  }
  this.options.set({format: String(format).toUpperCase()}); 
};

function renderFormatSelector () {
  var self = this;
  var selector = jQuery('<select> '+
      '<option value="FASTA">FASTA</option>'+
      '<option value="CODATA">CODATA</option>'+
      '<option value="PRIDE">PRIDE</option>'+
      '<option value="RAW">RAW</option></select>');

  selector.val(self.options.get('format'));

  selector.change(function(e) {
    self.setFormat(jQuery(this).val());
  });

  this.options.on('change:format', function (format) {
    selector.val(format);	
  });

  return selector;
}

function renderWidthSelector () {
  var self = this, selector = jQuery('<select>' + 
      '<option value="10">10</option>'+
      '<option value="35">35</option>'+
      '<option value="70">70</option>'+
      '<option value="100">100</option></select>');

  selector.val(String(this.options.get('numCols')));

  selector.change(function(e) {
    self.options.set({numCols: parseInt(jQuery(this).val(), 10)});
  });

  this.options.on('change:numCols', function (num) {
    selector.val(String(num));	
  });

  return selector;

}

function renderBaseColourToggle () {
  var self = this, toggle;

  toggle = jQuery('<input type="checkbox">');

  toggle.prop('checked', !!this.options.get('colouredBases'));

  toggle.change(function (e) {
    self.options.set({colouredBases: toggle.prop('checked')});
  });

  self.options.on('change:colouredBases', function (value) {
    toggle.prop('checked', value);
  });

  return toggle;
}

function makeControlGroup (options, labelKey, $control) {
  var $group = jQuery('<div>').addClass(options.get('controlClass'));
  var $label = jQuery('<label>').addClass(options.get('labelClass'))
                                .text(options.get(labelKey));
  options.on('change:' + labelKey, function (newLabel) {
    $label.text(newLabel);
  });
  $control.addClass(options.get('inputClass'));
  if ($control.is('[type="checkbox"]')) {
    return jQuery('<div class="checkbox">').append($label.prepend($control));
  } else {
    $group.append($label);
    $group.append($control);
  }
  return $group;
}
	
Sequence.prototype._buildFormatSelector = function () {
  var self = this, options = this.options, header;
  
  this._headerDiv = header = jQuery('<form>')
    .addClass('sequence-controls')
    .addClass(this.options.get('controlsClass'))
    .appendTo(this._container);

  header.append(makeControlGroup(options, 'labelFormat',
    this._formatSelector = renderFormatSelector.call(this)));

  header.append(makeControlGroup(options, 'labelNumCols',
    this._columnWidthSelector = renderWidthSelector.call(this)));

  header.append(makeControlGroup(options, 'labelColouredBases',
    renderBaseColourToggle.call(this)));

  this.options.on('change:formatSelectorVisible', function () {
    self._headerDiv.toggle(self.options.get('formatSelectorVisible'));
  });
  self._headerDiv.toggle(self.options.get('formatSelectorVisible'));
};
	
/**
  * Highlights a region using the font color defined in {Biojs.Protein3D#highlightFontColor} by default is red.
  *
  * @deprecated use addHighlight instead.
  * 
  * @param {int} start The starting character of the highlighting.
  * @param {int} end The ending character of the highlighting.
  * @param {string} [type] The type of highlight - one of 'selection', 'info', 'warning',
  *                 'error', or any custom value. Appropriate CSS classes will be added.
  * @param {string} [id] Custom identifier.
  * 
  * @return {int} representing the id of the highlight on the internal array. Returns -1 on failure  
  */
Sequence.prototype.highlight = function (start, end, type, id ) {
  return this.addHighlight({
    start: start,
    end: end,
    kind: type,
    id: id
  });
};

Sequence.prototype._highlightsCount = 0;
	
/**
  * Highlights a region using the font color defined in {Sequence#highlightFontColor} by default is red.
  *
  * @example
  * // highlight the characters within the position 100 to 150, included.
  * mySequence.addHighlight( { "start": 100, "end": 150, "color": "white", "background": "red", "id": "aaa" } );
  * 
  * @param {Object} h The highlight defined as follows:
  * 	
  * 
  * @return {string} The (possibly generated) id of the added highlight. null if not added.
  */
Sequence.prototype.addHighlight = function ( h ) {
  var id, kind, highlight, highlights = this.options.get('highlights');
  
  if ( !h || h.start > h.end ) return null;
    
  kind = (h.kind || 'info');
  id = ( "string" === typeof h.id ) ? h.id : String(this._highlightsCount++);
  
  highlight = {
    start: h.start,
    end: h.end,
    kind: kind,
    id: id
  };

  highlights = highlights.concat([highlight]);

  this.options.set({highlights: highlights});
  
  return highlight.id;
};

/**
  * Clear a highlighted region using.
  *
  * @deprecated use removeHighlight instead.
  * 
  * @param {int} id The id of the highlight on the internal array. This value is returned by method highlight.
  */
Sequence.prototype.unHighlight = function (id) {	
  this.removeHighlight(id);
};
	
/**
  * Remove a highlight.
  *
  * @example
  * // Clear the highlighted characters within the position 100 to 150, included.
  * mySequence.removeHighlight("spin1");
  * 
  * @param {string} id The id of the highlight on the internal array. This value is returned by method highlight.
  */
Sequence.prototype.removeHighlight = function (id) {	
  this.options.set({highlights: this.options.get('highlights').filter(function (hl) {
    return hl.id !== id;
  })});
};
	
/**
  * Clear the highlights of whole sequence.
  * @deprecated use removeAllHighlights instead.
  */
Sequence.prototype.unHighlightAll = function () {
  this.removeAllHighlights();
};
	
/**
  * Remove all the highlights of whole sequence.
  *
  * @example
  * mySequence.removeAllHighlights();
  */
Sequence.prototype.removeAllHighlights = function () {
  this.options.set({highlights: []});
};
	
	/**
    * Changes the current number of columns in the displayed sequence.
    *
    * @example
    * // Set the number of columns to 70.
    * mySequence.setNumCols(70);
    * 
    * @param {int} numCols The number of columns.
    */
Sequence.prototype.setNumCols = function(numCols) {
  this.options.set({numCols: numCols});
};
	
/**
  * Get or Set the visibility of the drop-down list of formats.
  * 
  * @param {boolean} visible true: show; false: hide.
  */
Sequence.prototype.formatSelectorVisible = function (visible) {
  if (arguments.length === 0) {
    return this.options.get('formatSelectorVisible');
  } else {
    this.options.set({formatSelectorVisible: visible});
  }
};
	
/**
  * This is similar to a {Biojs.Sequence#formatSelectorVisible} with the 'true' argument.
  *
  * @example
  * // Shows the format selector.
  * mySequence.showFormatSelector();
  * 
  */
Sequence.prototype.showFormatSelector = function() {
  this.formatSelectorVisible(true);
};
	
/**
  * This is similar to a {Biojs.Protein3D#formatSelectorVisible} with the 'false' argument.
  * 
  * @example
  * // Hides the format selector.
  * mySequence.hideFormatSelector();
  * 
  */
Sequence.prototype.hideFormatSelector = function() {
  this.formatSelectorVisible(false);
};
	
/**
  * Hides the whole component.
  * 
  */
Sequence.prototype.hide = function () {
  this._headerDiv.hide();
  this._contentDiv.hide();
};

/**
  * Shows the whole component.
  * 
  */
Sequence.prototype.show = function () {
  this._headerDiv.show();
  this._contentDiv.show();
};

Sequence.prototype._isSelecting = false;
Sequence.prototype._lastEntered = -1;
Sequence.prototype._selectionStart = -1;

Sequence.prototype.startSelecting = function () {
  this._isSelecting = true;
  this._selectionStart = this._lastEntered;
  this.setSelection(this._lastEntered, this._lastEntered);
};

Sequence.prototype.stopSelecting = function () {
  this._isSelecting = false;
  this._lastEntered = -1;
  this._selectionStart = -1;
};

Sequence.prototype._recordEntry = function (index) {
  this._lastEntered = index;
  if (this._isSelecting) {
    var selection = this.options.get('selection');
    this.setSelection(this._selectionStart, index);
  }
};
	
/* 
    * Function: Sequence._redraw
    * Purpose:  Repaint the current sequence. 
    * Returns:  -
    * Inputs: -
    */
Sequence.prototype._redraw = function() {
  var renderer = this.options.get('renderer');
  if (!renderer) return;
  this._contentDiv.html(renderer.render(
        this.options.get('sequence'), this.options.get('id'),
        this.getHighlights(), this.options.get('annotations')));
};

function _buildRenderer () {
  var Renderer = renderers[this.options.get('format')];
  if (!Renderer) {
    throw new Error("Don't know how to render " + fmt);
  }
  return new Renderer({
    width: parseInt(this.options.get('numCols'), 10),
    addBaseClass: !!this.options.get('colouredBases'),
    onMouseEnter: this._recordEntry.bind(this),
    onChangeSelection: this.options.on.bind(this.options, 'change:selection')
  });
}

Sequence.prototype.getHighlights = function () {
  var highlights = this.options.get('highlights').slice();
  var selection = this.options.get('selection');
  if (selection) {
    highlights.push({
      start: selection.start,
      end: selection.end,
      kind: 'selection',
      id: '__selection__'
    });
  }
  return highlights;
};

	/* 
     * Function: Sequence._addTooltip
     * Purpose:  Add a tooltip around the target DOM element provided as argument
     * Returns:  -
     * Inputs:   target -> {Element} DOM element wich is the targeted focus for the tooltip.
     * 			 cbGetMessageFunction -> {function} A callback function wich returns the message to be displayed in the tip.
     */
Sequence.prototype._addToolTip = function ( target, cbGetMessageFunction ) {

  var tipId = '#sequenceTip' + this.getId();

  jQuery(target).mouseover(function(e) {

    var offset = jQuery(e.target).offset();

    if ( ! jQuery( tipId ).is(':visible') ) {
      jQuery( tipId ) 
    .css({
      'background-color': "#000",
      'padding': "3px 10px 3px 10px",
      'top': offset.top + jQuery(e.target).height() + "px",
      'left': offset.left + jQuery(e.target).width() + "px"
    })
  .animate( {opacity: '0.85'}, 10)
    .html( cbGetMessageFunction.call( target ) )
    .show();
    }

  }).mouseout(function() {
    //Remove the appended tooltip template
    jQuery( tipId ).hide();	         
  });
};

module.exports = Sequence;

},{"./model":2,"./renderers":4,"./style":5,"biojs-events":6}],2:[function(require,module,exports){
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

},{"biojs-events":6}],3:[function(require,module,exports){
// Base class for renderers.
var Renderer = module.exports = function Renderer () { };

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
    var highlighter, canvas, i, bases, rowBases, row, offset;
    if (sequence.length < 1) {
      return NO_CONTENT;
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
    }

    this.renderFooter(canvas);

    return canvas;
  }
};


},{}],4:[function(require,module,exports){
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
  var header = document.createTextNode('>' + id + ' ' + bases.length + 'bp');
  canvas.appendChild(header);
  canvas.appendChild(document.createElement('br'));
};

FastaRenderer.prototype.renderFooter = NO_OP;

FastaRenderer.prototype.renderRow = function (canvas, row) {
  var i, base;
  for (i = 0; i < row.bases.length; i++) {
    base = this.renderBase(row, i);
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

CodataRenderer.prototype.renderHeader = function (canvas, bases, id) {
  var i, x, needed, buff = [];
  canvas.appendChild(document.createTextNode('ENTRY           '));
  canvas.appendChild(document.createTextNode(id));
  canvas.appendChild(document.createElement('br'));
  canvas.appendChild(document.createTextNode('SEQUENCE'));
  canvas.appendChild(document.createElement('br'));

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

  var header = document.createElement('span');
  header.className = 'sequence-header';
  header.appendChild(document.createTextNode(buff.join('')));
  canvas.appendChild(header);
  canvas.appendChild(document.createElement('br'));
};

CodataRenderer.prototype.renderInterBase = function (row, base, interbaseIndex) {
  var interbase = document.createElement('span');
  var classes = this.getBaseClasses(base, interbaseIndex, row.highlighter);
  classes.push('interbase');
  interbase.className = classes.join(' ');
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
    base = this.renderBase(row, i);
    canvas.appendChild(base);
    if (i + 1 < row.bases.length) {
      var interbaseIndex = row.start + i + 0.5;
      var interbase = this.renderInterBase(row, row.bases[i], interbaseIndex);
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
    base = this.renderBase(row, i);
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
    base = this.renderBase(row, i);
    canvas.appendChild(base);
  }
  canvas.appendChild(document.createElement('br'));
};


},{"./renderer-base":3}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var events = require("backbone-events-standalone");

events.onAll = function(callback,context){
  this.on("all", callback,context);
  return this;
};

// Mixin utility
events.oldMixin = events.mixin;
events.mixin = function(proto) {
  events.oldMixin(proto);
  // add custom onAll
  var exports = ['onAll'];
  for(var i=0; i < exports.length;i++){
    var name = exports[i];
    proto[name] = this[name];
  }
  return proto;
};

module.exports = events;

},{"backbone-events-standalone":8}],7:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      breaker = {},
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys || function (obj) {
        if (typeof obj !== "object" && typeof obj !== "function" || obj === null) {
          throw new TypeError("keys() called on a non-object");
        }
        var key, keys = [];
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            keys[keys.length] = key;
          }
        }
        return keys;
      },

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      },

      once: function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      }
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {
    var exports = ['on', 'once', 'off', 'trigger', 'stopListening', 'listenTo',
                   'listenToOnce', 'bind', 'unbind'];
    _.each(exports, function(name) {
      proto[name] = this[name];
    }, this);
    return proto;
  };

  // Export Events as BackboneEvents depending on current context
  if (typeof define === "function") {
    define(function() {
      return Events;
    });
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],8:[function(require,module,exports){
module.exports = require('./backbone-events-standalone');

},{"./backbone-events-standalone":7}],"biojs-vis-sequence":[function(require,module,exports){
module.exports = require("./lib/index");

},{"./lib/index":1}]},{},["biojs-vis-sequence"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL2xpYi9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL21vZGVsLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9saWIvcmVuZGVyZXItYmFzZS5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL3JlbmRlcmVycy5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL3N0eWxlLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvYmlvanMtZXZlbnRzL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvYmlvanMtZXZlbnRzL25vZGVfbW9kdWxlcy9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZS9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZS5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9ub2RlX21vZHVsZXMvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUvaW5kZXguanMiLCIuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3YwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JSQTtBQUNBOztBQ0RBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIFxuICogU2VxdWVuY2UgY29tcG9uZW50IFxuICogXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEJpb2pzXG4gKiBcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpqb2huY2FyQGdtYWlsLmNvbVwiPkpvaG4gR29tZXo8L2E+LCA8YSBocmVmPVwibWFpbHRvOnNlY2V2YWxsaXZAZ21haWwuY29tXCI+Sm9zZSBWaWxsYXZlY2VzPC9hPlxuICogQHZlcnNpb24gMS4wLjBcbiAqIEBjYXRlZ29yeSAzXG4gKiBcbiAqIEByZXF1aXJlcyA8YSBocmVmPSdodHRwOi8vYmxvZy5qcXVlcnkuY29tLzIwMTEvMDkvMTIvanF1ZXJ5LTEtNi00LXJlbGVhc2VkLyc+alF1ZXJ5IENvcmUgMS42LjQ8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCIuLi9iaW9qcy9kZXBlbmRlbmNpZXMvanF1ZXJ5L2pxdWVyeS0xLjQuMi5taW4uanNcIj48L3NjcmlwdD5cbiAqIFxuICogQHJlcXVpcmVzIDxhIGhyZWY9J2h0dHA6Ly9qcXVlcnl1aS5jb20vZG93bmxvYWQnPmpRdWVyeSBVSSAxLjguMTY8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCIuLi9iaW9qcy9kZXBlbmRlbmNpZXMvanF1ZXJ5L2pxdWVyeS11aS0xLjguMi5jdXN0b20ubWluLmpzXCI+PC9zY3JpcHQ+XG4gKlxuICogQHJlcXVpcmVzIDxhIGhyZWY9J0Jpb2pzLlRvb2x0aXAuY3NzJz5CaW9qcy5Ub29sdGlwPC9hPlxuICogQGRlcGVuZGVuY3kgPHNjcmlwdCBsYW5ndWFnZT1cIkphdmFTY3JpcHRcIiB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwic3JjL0Jpb2pzLlRvb2x0aXAuanNcIj48L3NjcmlwdD5cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQW4gb2JqZWN0IHdpdGggdGhlIG9wdGlvbnMgZm9yIFNlcXVlbmNlIGNvbXBvbmVudC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSB0YXJnZXQgXG4gKiAgICBJZGVudGlmaWVyIG9mIHRoZSBESVYgdGFnIHdoZXJlIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc3BsYXllZC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSBzZXF1ZW5jZSBcbiAqICAgIFRoZSBzZXF1ZW5jZSB0byBiZSBkaXNwbGF5ZWQuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gW2lkXSBcbiAqICAgIFNlcXVlbmNlIGlkZW50aWZpZXIgaWYgYXBwbHkuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gW2Zvcm1hdD1cIkZBU1RBXCJdIFxuICogICAgVGhlIGRpc3BsYXkgZm9ybWF0IGZvciB0aGUgc2VxdWVuY2UgcmVwcmVzZW50YXRpb24uXG4gKiAgICBcbiAqIEBvcHRpb24ge09iamVjdFtdfSBbaGlnaGxpZ2h0c10gXG4gKiBcdCAgRm9yIGhpZ2hsaWdodGluZyBtdWx0aXBsZSByZWdpb25zLiBcbiAqICAgIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIlN5bnRheDpcIj4gXG4gKiAgICBbXG4gKiAgICBcdC8vIEhpZ2hsaWdodCBhbWlub2FjaWRzIGZyb20gJ3N0YXJ0JyB0byAnZW5kJyBvZiB0aGUgY3VycmVudCBzdHJhbmQgdXNpbmcgdGhlIHNwZWNpZmllZCAnY29sb3InIChvcHRpb25hbCkgYW5kICdiYWNrZ3JvdW5kJyAob3B0aW9uYWwpLlxuICogICAgXHR7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDsgWywgaWQ6Jmx0O2lkVmFsMSZndDtdIFssIGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O10gWywgYmFja2dyb3VuZDogJmx0O0hUTUxDb2xvciZndDtdfSwgXG4gKiAgICBcdC8vXG4gKiAgICBcdC8vIEFueSBvdGhlcnMgaGlnaGxpZ2h0c1xuICogICAgXHQuLi4sICBcbiAqICAgIFx0Ly8gXG4gKiAgICBcdHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0OyBbLCBpZDombHQ7aWRWYWxOJmd0O10gWywgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7XSBbLCBiYWNrZ3JvdW5kOiAmbHQ7SFRNTENvbG9yJmd0O119XG4gKiAgICBdPC9wcmU+XG4gKiBcbiAqIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIkV4YW1wbGU6XCI+IFxuICogaGlnaGxpZ2h0cyA6IFtcbiAqIFx0XHR7IHN0YXJ0OjMwLCBlbmQ6NDIsIGNvbG9yOlwid2hpdGVcIiwgYmFja2dyb3VuZDpcImdyZWVuXCIsIGlkOlwic3BpbjFcIiB9LFxuICpcdFx0eyBzdGFydDoxMzksIGVuZDoxNDAgfSwgXG4gKlx0XHR7IHN0YXJ0OjYzMSwgZW5kOjYzMywgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiYmx1ZVwiIH1cbiAqXHRdXG4gKiA8L3ByZT5cbiAqIFxuICogQG9wdGlvbiB7T2JqZWN0fSBbY29sdW1ucz17c2l6ZTo0MCxzcGFjZWRFYWNoOjEwfV0gXG4gKiBcdCAgT3B0aW9ucyBmb3IgZGlzcGxheWluZyB0aGUgY29sdW1ucy4gU3ludGF4OiB7IHNpemU6ICZsdDtudW1Db2xzJmd0Oywgc3BhY2VkRWFjaDogJmx0O251bUNvbHMmZ3Q7fVxuICogXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtzZWxlY3Rpb25dIFxuICogXHQgIFBvc2l0aW9ucyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmVnaW9uLiBTeW50YXg6IHsgc3RhcnQ6ICZsdDtzdGFydFZhbHVlJmd0OywgZW5kOiAmbHQ7ZW5kVmFsdWUmZ3Q7fVxuICogXG4gKiBAb3B0aW9uIHtPYmplY3RbXX0gW2Fubm90YXRpb25zXSBcbiAqICAgIFNldCBvZiBvdmVybGFwcGluZyBhbm5vdGF0aW9ucy4gTXVzdCBiZSBhbiBhcnJheSBvZiBvYmplY3RzIGZvbGxvd2luZyB0aGUgc3ludGF4OlxuICogICAgIFx0XHQ8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJTeW50YXg6XCI+XG4gKiAgICAgICAgICAgIFsgXG4gKiAgICAgICAgICAgICAgLy8gQW4gYW5ub3RhdGlvbjpcbiAqICAgICAgICAgICAgICB7IG5hbWU6ICZsdDtuYW1lJmd0OywgXG4gKiAgICAgICAgICAgICAgICBodG1sOiAmbHQ7bWVzc2FnZSZndDssIFxuICogICAgICAgICAgICAgICAgY29sb3I6ICZsdDtjb2xvcl9jb2RlJmd0OywgXG4gKiAgICAgICAgICAgICAgICByZWdpb25zOiBbeyBzdGFydDogJmx0O3N0YXJ0VmFsMSZndDssIGVuZDogJmx0O2VuZFZhbDEmZ3Q7IGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O30sIC4uLix7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDssIGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O31dIFxuICogICAgICAgICAgICAgIH0sIFxuICogICAgICAgICAgICAgIFxuICogICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICAgIC8vIG1vcmUgYW5ub3RhdGlvbnMgaGVyZSBcbiAqICAgICAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgICAgXVxuICogICAgXHRcdCA8L3ByZT5cbiAqICAgIHdoZXJlOlxuICogICAgICA8dWw+XG4gKiAgICAgICAgPGxpPjxiPm5hbWU8L2I+IGlzIHRoZSB1bmlxdWUgbmFtZSBmb3IgdGhlIGFubm90YXRpb248L2xpPlxuICogICAgICAgIDxsaT48Yj5odG1sPC9iPiBpcyB0aGUgbWVzc2FnZSAoY2FuIGJlIEhUTUwpIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdG9vbCB0aXAuPC9saT5cbiAqICAgICAgICA8bGk+PGI+Y29sb3I8L2I+IGlzIHRoZSBkZWZhdWx0IEhUTUwgY29sb3IgY29kZSBmb3IgYWxsIHRoZSByZWdpb25zLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnM8L2I+IGFycmF5IG9mIG9iamVjdHMgZGVmaW5pbmcgdGhlIGludGVydmFscyB3aGljaCBiZWxvbmdzIHRvIHRoZSBhbm5vdGF0aW9uLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnNbaV0uc3RhcnQ8L2I+IGlzIHRoZSBzdGFydGluZyBjaGFyYWN0ZXIgZm9yIHRoZSBpLXRoIGludGVydmFsLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnNbaV0uZW5kPC9iPiBpcyB0aGUgZW5kaW5nIGNoYXJhY3RlciBmb3IgdGhlIGktdGggaW50ZXJ2YWwuPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uc1tpXS5jb2xvcjwvYj4gaXMgYW4gb3B0aW9uYWwgY29sb3IgZm9yIHRoZSBpLXRoIGludGVydmFsLiAgIFxuICogICAgICA8L3VsPiBcbiAqICAgICAgXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtmb3JtYXRPcHRpb25zPXt0aXRsZTp0cnVlLCBmb290ZXI6dHJ1ZX1dIFxuICogXHQgIE9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgdGhlIHRpdGxlLiBieSBub3cganVzdCBhZmZlY3RpbmcgdGhlIENPREFUQSBmb3JtYXQuXG4gKiAgICA8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJTeW50YXg6XCI+IFxuICogXHRcdGZvcm1hdE9wdGlvbnMgOiB7XG4gKiBcdFx0XHR0aXRsZTpmYWxzZSxcbiAqIFx0XHRcdGZvb3RlcjpmYWxzZVxuICogXHRcdH1cbiAqICAgIDwvcHJlPlxuICogICAgXG4gKiBAZXhhbXBsZSBcbiAqIHZhciB0aGVTZXF1ZW5jZSA9IFwiTUVUTENRUkxOVkNRREtJTFRIWUVORFNURExSREhJRFlXS0hNUkxFQ0FJWVlLQVJFTUdGS0hJTkhRVlZQVExBVlNLTktBTFFBSUVMUUxUTEVUSVlOU1FZU05FS1dUTFFEVlNMRVZZTFRBUFRHQ0lLS0hHWVRWRVZRRkRHRElDTlRNSFlUTldUSElZSUNFRUFvanMgU1ZUVlZFR1FWRFlZR0xZWVZIRUdJUlRZRlZRRktEREFFS1lTS05LVldFVkhBR0dRVklMQ1BUU1ZGU1NORVZTU1BFSUlSUUhMQU5IUEFBVEhUS0FWQUxHVEVFVFFUVElRUlBSU0VQRFRHTlBDSFRUS0xMSFJEU1ZEU0FQSUxUQUZOU1NIS0dSSU5DTlNOVFRQSVZITEtHREFOVExLQ0xSWVJGS0tIQ1RMWVRBVlNTVFdIV1RHSE5WS0hLU0FJVlRMVFlEU0VXUVJEUUZMU1FWS0lQS1RJVFZTVEdGTVNJXCI7XG4gKiB2YXIgbXlTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZSh7XG4gKiBcdFx0c2VxdWVuY2UgOiB0aGVTZXF1ZW5jZSxcbiAqIFx0XHR0YXJnZXQgOiBcIllvdXJPd25EaXZJZFwiLFxuICogXHRcdGZvcm1hdCA6ICdDT0RBVEEnLFxuICogXHRcdGlkIDogJ1A5MTgyODMnLFxuICogXHRcdGFubm90YXRpb25zOiBbXG4gKiAgICAgICAgeyBuYW1lOlwiQ0FUSFwiLCBcbiAqIFx0ICBcdFx0Y29sb3I6XCIjRjBGMDIwXCIsIFxuICogXHQgIFx0XHRodG1sOiBcIlVzaW5nIGNvbG9yIGNvZGUgI0YwRjAyMCBcIiwgXG4gKiBcdCAgXHRcdHJlZ2lvbnM6IFt7c3RhcnQ6IDEyMiwgZW5kOiAxMzV9XVxuICogXHRcdCAgfSxcbiAqICAgICAgICB7IG5hbWU6XCJURVNUXCIsIFxuICogICAgICAgICAgaHRtbDpcIiZsdDticiZndDsgRXhhbXBsZSBvZiAmbHQ7YiZndDtIVE1MJmx0Oy9iJmd0O1wiLCBcbiAqICAgICAgICAgIGNvbG9yOlwiZ3JlZW5cIiwgXG4gKiAgICAgICAgICByZWdpb25zOiBbXG4gKiAgICAgICAgICAgIHtzdGFydDogMjg1LCBlbmQ6IDI5Mn0sXG4gKiAgICAgICAgICAgIHtzdGFydDogMjkzLCBlbmQ6IDMxNCwgY29sb3I6IFwiIzJFNDk4OFwifV1cbiAqICAgICAgICB9XG4gKiAgICAgIF0sXG4gKiAgICAgIGhpZ2hsaWdodHMgOiBbXG4gKiAgICAgIFx0eyBzdGFydDozMCwgZW5kOjQyLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJncmVlblwiLCBpZDpcInNwaW4xXCIgfSxcbiAqICAgICAgXHR7IHN0YXJ0OjEzOSwgZW5kOjE0MCB9LCBcbiAqICAgICAgXHR7IHN0YXJ0OjYzMSwgZW5kOjYzMywgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiYmx1ZVwiIH1cbiAqICAgICAgXVxuICogfSk7XHRcbiAqIFxuICovXG5cbnZhciBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSA9IFwic2VsZWN0aW9uLWNoYW5nZVwiO1xudmFyIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCA9IFwic2VsZWN0aW9uLWNoYW5nZWRcIjtcbnZhciBFVlRfT05fQU5OT1RBVElPTl9DTElDS0VEID0gXCJhbm5vdGF0aW9uLWNsaWNrZWRcIjtcblxudmFyIHJlbmRlcmVycyA9IHJlcXVpcmUoJy4vcmVuZGVyZXJzJyk7XG52YXIgTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsJyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnYmlvanMtZXZlbnRzJyk7XG52YXIgYXBwbHlTdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGUnKTtcblxuLyogQWxzbzogc2VxdWVuY2UsIGlkLCB3aWR0aCwgaGVpZ2h0ICovXG52YXIgREVGQVVMVFMgPSB7XG4gIGZvcm1hdCA6IFwiRkFTVEFcIixcbiAgc2VsZWN0aW9uOiB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSxcbiAgY29sb3VyZWRCYXNlczogZmFsc2UsXG4gIG51bUNvbHM6IDM1LFxuICBoaWdobGlnaHRzIDogW10sXG4gIGFubm90YXRpb25zOiBbXSxcbiAgc2VxdWVuY2VVcmw6ICdodHRwOi8vd3d3LmViaS5hYy51ay9kYXMtc3J2L3VuaXByb3QvZGFzL3VuaXByb3Qvc2VxdWVuY2UnLFxuICBmb3JtYXRTZWxlY3RvclZpc2libGU6IHRydWUsXG4gIGxvYWRTdHlsZTogdHJ1ZSwgLy8gTG9hZCBkZWZhdWx0IHN0eWxlcyBvbnRvIHRoZSBwYWdlLlxuXG4gIC8vIFN0cmluZ3NcbiAgbGFiZWxGb3JtYXQ6ICdGb3JtYXQnLFxuICBsYWJlbE51bUNvbHM6ICdDb2x1bW5zJyxcbiAgbGFiZWxDb2xvdXJlZEJhc2VzOiAnQ29sb3VyIEJhc2VzJyxcblxuICAvLyBDU1MgY2xhc3NlcyAtIGNhbiBiZSBvdmVycmlkZW4uXG4gIGNvbnRyb2xzQ2xhc3M6ICdmb3JtLWlubGluZScsXG4gIGNvbnRyb2xDbGFzczogJ2Zvcm0tZ3JvdXAnLFxuICBpbnB1dENsYXNzOiAnZm9ybS1jb250cm9sJyxcbiAgbGFiZWxDbGFzczogJ2Zvcm0tbGFiZWwnXG59O1xuXG4vKiogQGxlbmRzIFNlcXVlbmNlICoqL1xuU2VxdWVuY2UgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLl9jb250YWluZXIgPSBqUXVlcnkob3B0aW9ucy50YXJnZXQpO1xuICBpZiAodGhpcy5fY29udGFpbmVyLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGpRdWVyeSgnIycgKyBvcHRpb25zLnRhcmdldCk7XG4gIH1cbiAgdGhpcy5vcHRpb25zID0gbmV3IE1vZGVsKG9wdGlvbnMsIERFRkFVTFRTKTtcblxuICB0aGlzLl9pbml0aWFsaXplKCk7XG59O1xuXG4vKiogUHJvdmlkZXMgb24sIG9mZiwgb25jZSwgdHJpZ2dlciAqKi9cbkV2ZW50cy5taXhpbihTZXF1ZW5jZS5wcm90b3R5cGUpO1xuXG4vKipcbiAgKiBBcnJheSBjb250YWluaW5nIHRoZSBzdXBwb3J0ZWQgZXZlbnQgbmFtZXNcbiAgKiBAbmFtZSBTZXF1ZW5jZS1ldmVudFR5cGVzXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuZXZlbnRUeXBlcyA9IFtcblxuICAvKipcbiAgICAqIEBuYW1lIFNlcXVlbmNlI29uU2VsZWN0aW9uQ2hhbmdlZFxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhY3Rpb25QZXJmb3JtZWQgQW4gZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgYW4ge0BsaW5rIEJpb2pzLkV2ZW50fSBvYmplY3QgYXMgYXJndW1lbnQuXG4gICAgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuICAgICogQGV2ZW50RGF0YSB7c3RyaW5nfSB0eXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAgICAqIEBldmVudERhdGEge2ludH0gc3RhcnQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgc3RhcnQgb2YgdGhlIHNlbGVjdGlvbi5cbiAgICAqIEBldmVudERhdGEge2ludH0gZW5kIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIGVuZGluZyBvZiBzZWxlY3Rpb24uXG4gICAgKiBAZXhhbXBsZSBcbiAgICAqIG15U2VxdWVuY2Uub25TZWxlY3Rpb25DaGFuZ2VkKFxuICAgICogICAgZnVuY3Rpb24oIG9iakV2ZW50ICkge1xuICAgICogICAgICAgYWxlcnQoXCJTZWxlY3RlZDogXCIgKyBvYmpFdmVudC5zdGFydCArIFwiLCBcIiArIG9iakV2ZW50LmVuZCApO1xuICAgICogICAgfVxuICAgICogKTsgXG4gICAgKiBcbiAgICAqICovXG4gIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCxcbiAgXG4gIC8qKlxuICAgICogQG5hbWUgU2VxdWVuY2Ujb25TZWxlY3Rpb25DaGFuZ2VcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uUGVyZm9ybWVkIEFuIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGFuIHtAbGluayBCaW9qcy5FdmVudH0gb2JqZWN0IGFzIGFyZ3VtZW50LlxuICAgICogQGV2ZW50RGF0YSB7T2JqZWN0fSBzb3VyY2UgVGhlIGNvbXBvbmVudCB3aGljaCBkaWQgdHJpZ2dlcmVkIHRoZSBldmVudC5cbiAgICAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gICAgKiBAZXZlbnREYXRhIHtpbnR9IHN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24uXG4gICAgKiBAZXZlbnREYXRhIHtpbnR9IGVuZCBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBlbmRpbmcgb2Ygc2VsZWN0aW9uLlxuICAgICogQGV4YW1wbGUgXG4gICAgKiBteVNlcXVlbmNlLm9uU2VsZWN0aW9uQ2hhbmdlKFxuICAgICogICAgZnVuY3Rpb24oIG9iakV2ZW50ICkge1xuICAgICogICAgICAgYWxlcnQoXCJTZWxlY3Rpb24gaW4gcHJvZ3Jlc3M6IFwiICsgb2JqRXZlbnQuc3RhcnQgKyBcIiwgXCIgKyBvYmpFdmVudC5lbmQgKTtcbiAgICAqICAgIH1cbiAgICAqICk7ICBcbiAgICAqIFxuICAgICogXG4gICAgKiAqL1xuICBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSxcblx0XHRcbiAgLyoqXG4gICAgKiBAbmFtZSBTZXF1ZW5jZSNvbkFubm90YXRpb25DbGlja2VkXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cbiAgICAqIEBldmVudERhdGEge09iamVjdH0gc291cmNlIFRoZSBjb21wb25lbnQgd2hpY2ggZGlkIHRyaWdnZXJlZCB0aGUgZXZlbnQuXG4gICAgKiBAZXZlbnREYXRhIHtzdHJpbmd9IHR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICAgICogQGV2ZW50RGF0YSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZWxlY3RlZCBhbm5vdGF0aW9uLlxuICAgICogQGV2ZW50RGF0YSB7aW50fSBwb3MgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIGFtaW5vIGFjaWQuXG4gICAgKiBAZXhhbXBsZSBcbiAgICAqIG15U2VxdWVuY2Uub25Bbm5vdGF0aW9uQ2xpY2tlZChcbiAgICAqICAgIGZ1bmN0aW9uKCBvYmpFdmVudCApIHtcbiAgICAqICAgICAgIGFsZXJ0KFwiQ2xpY2tlZCBcIiArIG9iakV2ZW50Lm5hbWUgKyBcIiBvbiBwb3NpdGlvbiBcIiArIG9iakV2ZW50LnBvcyApO1xuICAgICogICAgfVxuICAgICogKTsgIFxuICAgICogXG4gICAgKiAqL1xuICBFVlRfT05fQU5OT1RBVElPTl9DTElDS0VEXG5dO1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuZ2V0SWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm9wdC5pZDtcbn07XG5cbnZhciBUT09MVElQX1NUWUxFID0ge1xuICAncG9zaXRpb24nOiBcImFic29sdXRlXCIsXG4gICd6LWluZGV4JzogXCI5OTk5OTlcIixcbiAgJ2NvbG9yJzogXCIjZmZmXCIsXG4gICdmb250LXNpemUnOiBcIjEycHhcIixcbiAgJ3dpZHRoJzogXCJhdXRvXCIsXG4gICdkaXNwbGF5JzogJ25vbmUnXG59O1xuXG5cdC8vIE1ldGhvZHNcblNlcXVlbmNlLnByb3RvdHlwZS5faW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5fYXBwZW5kU3R5bGUoKTtcblx0XHRcbiAgWyd3aWR0aCcsJ2hlaWdodCddLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdmFsID0gc2VsZi5vcHRpb25zLmdldChwcm9wKTtcbiAgICBpZiAodmFsID4gMCkge1xuICAgICAgc2VsZi5fY29udGFpbmVyW3Byb3BdKHZhbCk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIERpc2FibGUgdGV4dCBzZWxlY3Rpb25cbiAgdGhpcy5fY29udGFpbmVyLnRvZ2dsZUNsYXNzKCduby11c2VyLXNlbGVjdGlvbicsICF0aGlzLm9wdGlvbnMuZ2V0KCdhbGxvd1NlbGVjdGlvbicpKTtcblxuICAvLyBESVYgZm9yIHRoZSBmb3JtYXQgc2VsZWN0b3JcbiAgdGhpcy5fYnVpbGRGb3JtYXRTZWxlY3RvcigpO1xuXHRcdFxuICAvLyBESVYgZm9yIHRoZSBzZXF1ZW5jZVxuICB0aGlzLl9jb250ZW50RGl2ID0galF1ZXJ5KCc8ZGl2PicpLmFkZENsYXNzKCdzZXF1ZW5jZS1jb250ZW50JykuYXBwZW5kVG8odGhpcy5fY29udGFpbmVyKTtcblx0XHRcbiAgLy9Jbml0aWFsaXplIHRvb2x0aXBcbiAgdGhpcy5fdG9vbHRpcCA9IGpRdWVyeSgnPGRpdj4nKVxuICAgICAgICAuY3NzKFRPT0xUSVBfU1RZTEUpXG4gICAgICAgIC5hZGRDbGFzcyhcInRvb2x0aXBcIilcbiAgICAgICAgLmFwcGVuZFRvKFwiYm9keVwiKVxuICAgICAgICAuaGlkZSgpO1xuXG4gIHRoaXMuX2JpbmRFdmVudHMoKTtcblxuICB0aGlzLl9ydW4oKTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5fcnVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmhhcygnc2VxdWVuY2UnKSkge1xuICAgIHRoaXMub3B0aW9ucy50cmlnZ2VyKCdjaGFuZ2U6Zm9ybWF0Jyk7IC8vIEJlZ2luIHRoZSByZW5kZXIgY3ljbGUuXG4gIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmhhcygnaWQnKSkge1xuICAgIHRoaXMuX3JlcXVlc3RTZXF1ZW5jZSh0aGlzLmdldElkKCkpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY2xlYXJTZXF1ZW5jZShcIk5vIHNlcXVlbmNlIGF2YWlsYWJsZVwiLCBcIi4uL2Jpb2pzL2Nzcy9pbWFnZXMvd2FybmluZ19pY29uLnBuZ1wiKTtcbiAgfVxufTtcblxuU2VxdWVuY2UucHJvdG90eXBlLl9iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByZWRyYXcgPSBmdW5jdGlvbiAoKSB7IHNlbGYuX3JlZHJhdygpOyB9O1xuICB2YXIgc2V0UmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vcHRpb25zLnNldCh7cmVuZGVyZXI6IF9idWlsZFJlbmRlcmVyLmNhbGwoc2VsZil9KTtcbiAgfTtcblxuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpmb3JtYXQnLCBzZXRSZW5kZXJlcik7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmNvbG91cmVkQmFzZXMnLCBzZXRSZW5kZXJlcik7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOm51bUNvbHMnLCBzZXRSZW5kZXJlcik7XG5cbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6c2VxdWVuY2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vcHRpb25zLnNldCh7aGlnaGxpZ2h0czogW10sIGFubm90YXRpb25zOiBbXX0sIHtzaWxlbnQ6IHRydWV9KTtcbiAgICBzZWxmLnNldFNlbGVjdGlvbigwLCAwKTtcbiAgfSk7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmhpZ2hsaWdodHMnLCByZWRyYXcpO1xuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTphbm5vdGF0aW9ucycsIHJlZHJhdyk7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmlkJywgcmVkcmF3KTtcbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6cmVuZGVyZXInLCByZWRyYXcpO1xuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpzZXF1ZW5jZScsIHJlZHJhdyk7XG5cbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6c2VsZWN0aW9uJywgZnVuY3Rpb24gKHNlbCkge1xuICAgIHNlbGYudHJpZ2dlcihFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQsIHNlbCk7XG4gIH0pO1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmFsbG93U2VsZWN0aW9uJywgZnVuY3Rpb24gKGFsbG93ZWQpIHtcbiAgICBzZWxmLl9jb250YWluZXIudG9nZ2xlQ2xhc3MoJ25vLXVzZXItc2VsZWN0aW9uJywgIWFsbG93ZWQpO1xuICB9KTtcblxuICB0aGlzLl9jb250ZW50RGl2Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgc2VsZi5zdGFydFNlbGVjdGluZygpO1xuICB9KTtcbiAgdGhpcy5fY29udGVudERpdi5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBzZWxmLnN0b3BTZWxlY3RpbmcoKTtcbiAgfSk7XG4gIHRoaXMuX2NvbnRlbnREaXYub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgc2VsZi5zdG9wU2VsZWN0aW5nKCk7XG4gIH0pO1xufTtcblxudmFyIElDT05fV0FSTiA9IFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCI7XG5cdFxuU2VxdWVuY2UucHJvdG90eXBlLl9yZXF1ZXN0U2VxdWVuY2UgPSBmdW5jdGlvbiAoIGFjY2Vzc2lvbiApIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGpRdWVyeS5hamF4KHsgXG4gICAgdXJsOiB0aGlzLm9wdGlvbnMuZ2V0KCdzZXF1ZW5jZVVybCcpLFxuICAgIGRhdGFUeXBlOiBcInhtbFwiLFxuICAgIGRhdGE6IHsgc2VnbWVudDogYWNjZXNzaW9uIH0sXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHhtKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbm9kZSA9IGpRdWVyeSh4bWwpLmZpbmQoJ1NFUVVFTkNFOmZpcnN0Jyk7XG4gICAgICAgIHNlbGYuc2V0U2VxdWVuY2UoIG5vZGUudGV4dCgpLCBub2RlLmF0dHIoXCJpZFwiKSwgbm9kZS5hdHRyKFwibGFiZWxcIikgKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkZWNvZGluZyByZXNwb25zZSBkYXRhOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgIHNlbGYuY2xlYXJTZXF1ZW5jZShcIk5vIHNlcXVlbmNlIGF2YWlsYWJsZVwiLCBJQ09OX1dBUk4pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZGVjb2RpbmcgcmVzcG9uc2UgZGF0YTogXCIgKyB0ZXh0U3RhdHVzKTtcbiAgICAgIHNlbGYuY2xlYXJTZXF1ZW5jZShcIkVycm9yIHJlcXVlc3RpbmcgdGhlIHNlcXVlbmNlIHRvIHRoZSBzZXJ2ZXIgXCIgKyB0aGlzLnVybCAsIElDT05fV0FSTik7XG4gICAgfVxuICB9KTtcbn07XG5cdFxuLyoqXG4gICogU2hvd3MgdGhlIGNvbHVtbnMgaW5kaWNhdGVkIGJ5IHRoZSBpbmRleGVzIGFycmF5LlxuICAqIEBwYXJhbSB7c3RyaW5nfSBzZXEgVGhlIHNlcXVlbmNlIHN0cmFuZC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gW2lkZW50aWZpZXJdIFNlcXVlbmNlIGlkZW50aWZpZXIuXG4gICogXG4gICogQGV4YW1wbGUgXG4gICogbXlTZXF1ZW5jZS5zZXRTZXF1ZW5jZShcIlA5OTk5OVwiKTtcbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zZXRTZXF1ZW5jZSA9IGZ1bmN0aW9uICggc2VxLCBpZGVudGlmaWVyICkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHRoaXMuX3JlcXVlc3RTZXF1ZW5jZSggYXJndW1lbnRzWzBdICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5vcHRpb25zLnNldCh7c2VxdWVuY2U6IHNlcSwgaWQ6IGlkZW50aWZpZXJ9KTtcbiAgfVxufTtcbiAgICBcblx0XG4vKipcbiAqIFNob3dzIHRoZSBjb2x1bW5zIGluZGljYXRlZCBieSB0aGUgaW5kZXhlcyBhcnJheS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2hvd01lc3NhZ2VdIE1lc3NhZ2UgdG8gYmUgc2hvd24uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ljb25dIEljb24gdG8gYmUgc2hvd2VkIGEgc2lkZSBvZiB0aGUgbWVzc2FnZVxuICogXG4gKiBAZXhhbXBsZSBcbiAqIG15U2VxdWVuY2UuY2xlYXJTZXF1ZW5jZShcIk5vIHNlcXVlbmNlIGF2YWlsYWJsZVwiLCBcIi4uL2Jpb2pzL2Nzcy9pbWFnZXMvd2FybmluZ19pY29uLnBuZ1wiKTtcbiAqIFxuICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuY2xlYXJTZXF1ZW5jZSA9IGZ1bmN0aW9uICggc2hvd01lc3NhZ2UsIGljb24gKSB7XG5cbiAgdmFyIG1lc3NhZ2U7XG5cbiAgdGhpcy5zZXRTZXF1ZW5jZSgnJywgJycpO1xuXG4gIGlmIChzaG93TWVzc2FnZSkge1xuICAgIG1lc3NhZ2UgPSBqUXVlcnkoJzxkaXY+JylcbiAgICAgIC50ZXh0KHNob3dNZXNzYWdlKVxuICAgICAgLmFkZENsYXNzKFwibWVzc2FnZVwiKTtcblxuICAgIGlmICggaWNvbiApIHtcbiAgICAgIG1lc3NhZ2UuY3NzKHtcbiAgICAgICAgJ2JhY2tncm91bmQnOiAndHJhbnNwYXJlbnQgdXJsKFwiJyArIGljb24gKyAnXCIpIG5vLXJlcGVhdCBjZW50ZXIgbGVmdCcsXG4gICAgICAgICdwYWRkaW5nLWxlZnQnOiAnMjBweCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9jb250ZW50RGl2Lmh0bWwobWVzc2FnZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fY29udGVudERpdi5lbXB0eSgpO1xuICB9XG59O1xuXHRcbi8qKlxuICAqIFNldCB0aGUgY3VycmVudCBzZWxlY3Rpb24gaW4gdGhlIHNlcXVlbmNlIGNhdXNpbmcgdGhlIGV2ZW50IHtAbGluayBTZXF1ZW5jZSNvblNlbGVjdGlvbkNoYW5nZWR9XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIC8vIHNldCBzZWxlY3Rpb24gZnJvbSB0aGUgcG9zaXRpb24gMTAwIHRvIDE1MCBcbiAgKiBteVNlcXVlbmNlLnNldFNlbGVjdGlvbigxMDAsIDE1MCk7XG4gICogXG4gICogQHBhcmFtIHtpbnR9IHN0YXJ0IFRoZSBzdGFydGluZyBjaGFyYWN0ZXIgb2YgdGhlIHNlbGVjdGlvbi5cbiAgKiBAcGFyYW0ge2ludH0gZW5kIFRoZSBlbmRpbmcgY2hhcmFjdGVyIG9mIHRoZSBzZWxlY3Rpb25cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zZXRTZWxlY3Rpb24gPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIC8vIEFsbG93IGludmVyc2lvbi5cbiAgaWYgKHN0YXJ0ID4gZW5kKSB7XG4gICAgdmFyIHRlbXAgPSBlbmQ7XG4gICAgZW5kID0gc3RhcnQ7XG4gICAgc3RhcnQgPSB0ZW1wO1xuICB9XG4gIHRoaXMub3B0aW9ucy5zZXQoe3NlbGVjdGlvbjoge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9fSk7XG59O1xuXG4vLyBCYXNlIHBhbGV0dGU6IGh0dHA6Ly9wYWxldHRvbi5jb20vI3VpZD03MHAwSzBraUNGbjhHVmRlN05WbXR3U3FYdGdcbnZhciBSVUxFUyA9IFtcbiAgJy5zZXEtYmFzZS5hZGVuaW5lIHtiYWNrZ3JvdW5kOiAjNjU2Y2NhOyBjb2xvcjogd2hpdGU7fScsXG4gICcuc2VxLWJhc2UuY3l0b3NpbmUge2JhY2tncm91bmQ6ICNmZmQ3NmI7IGNvbG9yOiAjOEE2RjI1O30nLFxuICAnLnNlcS1iYXNlLmd1YW5pbmUge2JhY2tncm91bmQ6ICM1MGMwYWQ7IGNvbG9yOiB3aGl0ZTt9JyxcbiAgJy5zZXEtYmFzZS50aHltaW5lIHtiYWNrZ3JvdW5kOiAjZmZhNzZiOyBjb2xvcjogI0E3NkM0NTt9JyxcbiAgJy5zZXEtYmFzZS5pbmZvLCAuaW50ZXJiYXNlLmluZm8ge2JhY2tncm91bmQ6ICM0MDkwZjc7IGNvbG9yOiB3aGl0ZTt9JyxcbiAgJy5zZXF1ZW5jZS1jb250ZW50IHtmb250LWZhbWlseTogXCJBbmRhbGUgbW9ub1wiLCBjb3VyaWVyLCBtb25vc3BhY2U7IGZvbnQtc2l6ZTogMTJweDsgdGV4dC1hbGlnbjogbGVmdDt9JyxcbiAgJy5zZXF1ZW5jZS1jb250cm9scyB7Zm9udC1mYW1pbHk6IFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIFwic2FucyBzZXJpZlwiOyBmb250LXNpemU6IDE0cHh9JyxcbiAgJy5uby11c2VyLXNlbGVjdGlvbiB7LW1vei11c2VyLXNlbGVjdDogbm9uZTsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7fScsXG4gICcuc2VxLWJhc2Uuc2VsZWN0aW9uLCAuaW50ZXJiYXNlLnNlbGVjdGlvbiB7YmFja2dyb3VuZDogeWVsbG93OyBjb2xvcjogYmxhY2s7fScsXG5dO1xuXG4vKipcbiAqIEFwcGx5IHRoZSBzdHlsZSB0byB0aGUgZG9jdW1lbnQuXG4gKi9cblNlcXVlbmNlLnByb3RvdHlwZS5fYXBwZW5kU3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjc3MsIGhlYWQsIHN0eWxlc2hlZXQ7XG4gIGlmICghdGhpcy5vcHRpb25zLmdldCgnbG9hZFN0eWxlJykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY3NzID0gUlVMRVMuam9pbignXFxuJyk7XG4gIGFwcGx5U3R5bGUoY3NzLCBkb2N1bWVudCk7XG59O1xuXG4vKipcbiAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IGRpc3BsYXlpbmcgZm9ybWF0IG9mIHRoZSBzZXF1ZW5jZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogLy8gU2V0IGZvcm1hdCB0byAnRkFTVEEnLlxuICAqIG15U2VxdWVuY2Uuc2V0Rm9ybWF0KCdGQVNUQScpO1xuICAqIFxuICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQgVGhlIGZvcm1hdCBmb3IgdGhlIHNlcXVlbmNlIHRvIGJlIGRpc3BsYXllZC5cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zZXRGb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQpIHtcbiAgaWYgKCFmb3JtYXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcmd1bWVudCBpcyByZXF1aXJlZDogZm9ybWF0XCIpO1xuICB9XG4gIHRoaXMub3B0aW9ucy5zZXQoe2Zvcm1hdDogU3RyaW5nKGZvcm1hdCkudG9VcHBlckNhc2UoKX0pOyBcbn07XG5cbmZ1bmN0aW9uIHJlbmRlckZvcm1hdFNlbGVjdG9yICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2VsZWN0b3IgPSBqUXVlcnkoJzxzZWxlY3Q+ICcrXG4gICAgICAnPG9wdGlvbiB2YWx1ZT1cIkZBU1RBXCI+RkFTVEE8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCJDT0RBVEFcIj5DT0RBVEE8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCJQUklERVwiPlBSSURFPC9vcHRpb24+JytcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiUkFXXCI+UkFXPC9vcHRpb24+PC9zZWxlY3Q+Jyk7XG5cbiAgc2VsZWN0b3IudmFsKHNlbGYub3B0aW9ucy5nZXQoJ2Zvcm1hdCcpKTtcblxuICBzZWxlY3Rvci5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuICAgIHNlbGYuc2V0Rm9ybWF0KGpRdWVyeSh0aGlzKS52YWwoKSk7XG4gIH0pO1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmZvcm1hdCcsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBzZWxlY3Rvci52YWwoZm9ybWF0KTtcdFxuICB9KTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcldpZHRoU2VsZWN0b3IgKCkge1xuICB2YXIgc2VsZiA9IHRoaXMsIHNlbGVjdG9yID0galF1ZXJ5KCc8c2VsZWN0PicgKyBcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiMTBcIj4xMDwvb3B0aW9uPicrXG4gICAgICAnPG9wdGlvbiB2YWx1ZT1cIjM1XCI+MzU8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCI3MFwiPjcwPC9vcHRpb24+JytcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiMTAwXCI+MTAwPC9vcHRpb24+PC9zZWxlY3Q+Jyk7XG5cbiAgc2VsZWN0b3IudmFsKFN0cmluZyh0aGlzLm9wdGlvbnMuZ2V0KCdudW1Db2xzJykpKTtcblxuICBzZWxlY3Rvci5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuICAgIHNlbGYub3B0aW9ucy5zZXQoe251bUNvbHM6IHBhcnNlSW50KGpRdWVyeSh0aGlzKS52YWwoKSwgMTApfSk7XG4gIH0pO1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOm51bUNvbHMnLCBmdW5jdGlvbiAobnVtKSB7XG4gICAgc2VsZWN0b3IudmFsKFN0cmluZyhudW0pKTtcdFxuICB9KTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG5cbn1cblxuZnVuY3Rpb24gcmVuZGVyQmFzZUNvbG91clRvZ2dsZSAoKSB7XG4gIHZhciBzZWxmID0gdGhpcywgdG9nZ2xlO1xuXG4gIHRvZ2dsZSA9IGpRdWVyeSgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicpO1xuXG4gIHRvZ2dsZS5wcm9wKCdjaGVja2VkJywgISF0aGlzLm9wdGlvbnMuZ2V0KCdjb2xvdXJlZEJhc2VzJykpO1xuXG4gIHRvZ2dsZS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9wdGlvbnMuc2V0KHtjb2xvdXJlZEJhc2VzOiB0b2dnbGUucHJvcCgnY2hlY2tlZCcpfSk7XG4gIH0pO1xuXG4gIHNlbGYub3B0aW9ucy5vbignY2hhbmdlOmNvbG91cmVkQmFzZXMnLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0b2dnbGUucHJvcCgnY2hlY2tlZCcsIHZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRvZ2dsZTtcbn1cblxuZnVuY3Rpb24gbWFrZUNvbnRyb2xHcm91cCAob3B0aW9ucywgbGFiZWxLZXksICRjb250cm9sKSB7XG4gIHZhciAkZ3JvdXAgPSBqUXVlcnkoJzxkaXY+JykuYWRkQ2xhc3Mob3B0aW9ucy5nZXQoJ2NvbnRyb2xDbGFzcycpKTtcbiAgdmFyICRsYWJlbCA9IGpRdWVyeSgnPGxhYmVsPicpLmFkZENsYXNzKG9wdGlvbnMuZ2V0KCdsYWJlbENsYXNzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KG9wdGlvbnMuZ2V0KGxhYmVsS2V5KSk7XG4gIG9wdGlvbnMub24oJ2NoYW5nZTonICsgbGFiZWxLZXksIGZ1bmN0aW9uIChuZXdMYWJlbCkge1xuICAgICRsYWJlbC50ZXh0KG5ld0xhYmVsKTtcbiAgfSk7XG4gICRjb250cm9sLmFkZENsYXNzKG9wdGlvbnMuZ2V0KCdpbnB1dENsYXNzJykpO1xuICBpZiAoJGNvbnRyb2wuaXMoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKSkge1xuICAgIHJldHVybiBqUXVlcnkoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicpLmFwcGVuZCgkbGFiZWwucHJlcGVuZCgkY29udHJvbCkpO1xuICB9IGVsc2Uge1xuICAgICRncm91cC5hcHBlbmQoJGxhYmVsKTtcbiAgICAkZ3JvdXAuYXBwZW5kKCRjb250cm9sKTtcbiAgfVxuICByZXR1cm4gJGdyb3VwO1xufVxuXHRcblNlcXVlbmNlLnByb3RvdHlwZS5fYnVpbGRGb3JtYXRTZWxlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzLCBvcHRpb25zID0gdGhpcy5vcHRpb25zLCBoZWFkZXI7XG4gIFxuICB0aGlzLl9oZWFkZXJEaXYgPSBoZWFkZXIgPSBqUXVlcnkoJzxmb3JtPicpXG4gICAgLmFkZENsYXNzKCdzZXF1ZW5jZS1jb250cm9scycpXG4gICAgLmFkZENsYXNzKHRoaXMub3B0aW9ucy5nZXQoJ2NvbnRyb2xzQ2xhc3MnKSlcbiAgICAuYXBwZW5kVG8odGhpcy5fY29udGFpbmVyKTtcblxuICBoZWFkZXIuYXBwZW5kKG1ha2VDb250cm9sR3JvdXAob3B0aW9ucywgJ2xhYmVsRm9ybWF0JyxcbiAgICB0aGlzLl9mb3JtYXRTZWxlY3RvciA9IHJlbmRlckZvcm1hdFNlbGVjdG9yLmNhbGwodGhpcykpKTtcblxuICBoZWFkZXIuYXBwZW5kKG1ha2VDb250cm9sR3JvdXAob3B0aW9ucywgJ2xhYmVsTnVtQ29scycsXG4gICAgdGhpcy5fY29sdW1uV2lkdGhTZWxlY3RvciA9IHJlbmRlcldpZHRoU2VsZWN0b3IuY2FsbCh0aGlzKSkpO1xuXG4gIGhlYWRlci5hcHBlbmQobWFrZUNvbnRyb2xHcm91cChvcHRpb25zLCAnbGFiZWxDb2xvdXJlZEJhc2VzJyxcbiAgICByZW5kZXJCYXNlQ29sb3VyVG9nZ2xlLmNhbGwodGhpcykpKTtcblxuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpmb3JtYXRTZWxlY3RvclZpc2libGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5faGVhZGVyRGl2LnRvZ2dsZShzZWxmLm9wdGlvbnMuZ2V0KCdmb3JtYXRTZWxlY3RvclZpc2libGUnKSk7XG4gIH0pO1xuICBzZWxmLl9oZWFkZXJEaXYudG9nZ2xlKHNlbGYub3B0aW9ucy5nZXQoJ2Zvcm1hdFNlbGVjdG9yVmlzaWJsZScpKTtcbn07XG5cdFxuLyoqXG4gICogSGlnaGxpZ2h0cyBhIHJlZ2lvbiB1c2luZyB0aGUgZm9udCBjb2xvciBkZWZpbmVkIGluIHtCaW9qcy5Qcm90ZWluM0QjaGlnaGxpZ2h0Rm9udENvbG9yfSBieSBkZWZhdWx0IGlzIHJlZC5cbiAgKlxuICAqIEBkZXByZWNhdGVkIHVzZSBhZGRIaWdobGlnaHQgaW5zdGVhZC5cbiAgKiBcbiAgKiBAcGFyYW0ge2ludH0gc3RhcnQgVGhlIHN0YXJ0aW5nIGNoYXJhY3RlciBvZiB0aGUgaGlnaGxpZ2h0aW5nLlxuICAqIEBwYXJhbSB7aW50fSBlbmQgVGhlIGVuZGluZyBjaGFyYWN0ZXIgb2YgdGhlIGhpZ2hsaWdodGluZy5cbiAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIFRoZSB0eXBlIG9mIGhpZ2hsaWdodCAtIG9uZSBvZiAnc2VsZWN0aW9uJywgJ2luZm8nLCAnd2FybmluZycsXG4gICogICAgICAgICAgICAgICAgICdlcnJvcicsIG9yIGFueSBjdXN0b20gdmFsdWUuIEFwcHJvcHJpYXRlIENTUyBjbGFzc2VzIHdpbGwgYmUgYWRkZWQuXG4gICogQHBhcmFtIHtzdHJpbmd9IFtpZF0gQ3VzdG9tIGlkZW50aWZpZXIuXG4gICogXG4gICogQHJldHVybiB7aW50fSByZXByZXNlbnRpbmcgdGhlIGlkIG9mIHRoZSBoaWdobGlnaHQgb24gdGhlIGludGVybmFsIGFycmF5LiBSZXR1cm5zIC0xIG9uIGZhaWx1cmUgIFxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmhpZ2hsaWdodCA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCB0eXBlLCBpZCApIHtcbiAgcmV0dXJuIHRoaXMuYWRkSGlnaGxpZ2h0KHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgZW5kOiBlbmQsXG4gICAga2luZDogdHlwZSxcbiAgICBpZDogaWRcbiAgfSk7XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuX2hpZ2hsaWdodHNDb3VudCA9IDA7XG5cdFxuLyoqXG4gICogSGlnaGxpZ2h0cyBhIHJlZ2lvbiB1c2luZyB0aGUgZm9udCBjb2xvciBkZWZpbmVkIGluIHtTZXF1ZW5jZSNoaWdobGlnaHRGb250Q29sb3J9IGJ5IGRlZmF1bHQgaXMgcmVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvLyBoaWdobGlnaHQgdGhlIGNoYXJhY3RlcnMgd2l0aGluIHRoZSBwb3NpdGlvbiAxMDAgdG8gMTUwLCBpbmNsdWRlZC5cbiAgKiBteVNlcXVlbmNlLmFkZEhpZ2hsaWdodCggeyBcInN0YXJ0XCI6IDEwMCwgXCJlbmRcIjogMTUwLCBcImNvbG9yXCI6IFwid2hpdGVcIiwgXCJiYWNrZ3JvdW5kXCI6IFwicmVkXCIsIFwiaWRcIjogXCJhYWFcIiB9ICk7XG4gICogXG4gICogQHBhcmFtIHtPYmplY3R9IGggVGhlIGhpZ2hsaWdodCBkZWZpbmVkIGFzIGZvbGxvd3M6XG4gICogXHRcbiAgKiBcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSAocG9zc2libHkgZ2VuZXJhdGVkKSBpZCBvZiB0aGUgYWRkZWQgaGlnaGxpZ2h0LiBudWxsIGlmIG5vdCBhZGRlZC5cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5hZGRIaWdobGlnaHQgPSBmdW5jdGlvbiAoIGggKSB7XG4gIHZhciBpZCwga2luZCwgaGlnaGxpZ2h0LCBoaWdobGlnaHRzID0gdGhpcy5vcHRpb25zLmdldCgnaGlnaGxpZ2h0cycpO1xuICBcbiAgaWYgKCAhaCB8fCBoLnN0YXJ0ID4gaC5lbmQgKSByZXR1cm4gbnVsbDtcbiAgICBcbiAga2luZCA9IChoLmtpbmQgfHwgJ2luZm8nKTtcbiAgaWQgPSAoIFwic3RyaW5nXCIgPT09IHR5cGVvZiBoLmlkICkgPyBoLmlkIDogU3RyaW5nKHRoaXMuX2hpZ2hsaWdodHNDb3VudCsrKTtcbiAgXG4gIGhpZ2hsaWdodCA9IHtcbiAgICBzdGFydDogaC5zdGFydCxcbiAgICBlbmQ6IGguZW5kLFxuICAgIGtpbmQ6IGtpbmQsXG4gICAgaWQ6IGlkXG4gIH07XG5cbiAgaGlnaGxpZ2h0cyA9IGhpZ2hsaWdodHMuY29uY2F0KFtoaWdobGlnaHRdKTtcblxuICB0aGlzLm9wdGlvbnMuc2V0KHtoaWdobGlnaHRzOiBoaWdobGlnaHRzfSk7XG4gIFxuICByZXR1cm4gaGlnaGxpZ2h0LmlkO1xufTtcblxuLyoqXG4gICogQ2xlYXIgYSBoaWdobGlnaHRlZCByZWdpb24gdXNpbmcuXG4gICpcbiAgKiBAZGVwcmVjYXRlZCB1c2UgcmVtb3ZlSGlnaGxpZ2h0IGluc3RlYWQuXG4gICogXG4gICogQHBhcmFtIHtpbnR9IGlkIFRoZSBpZCBvZiB0aGUgaGlnaGxpZ2h0IG9uIHRoZSBpbnRlcm5hbCBhcnJheS4gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBieSBtZXRob2QgaGlnaGxpZ2h0LlxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnVuSGlnaGxpZ2h0ID0gZnVuY3Rpb24gKGlkKSB7XHRcbiAgdGhpcy5yZW1vdmVIaWdobGlnaHQoaWQpO1xufTtcblx0XG4vKipcbiAgKiBSZW1vdmUgYSBoaWdobGlnaHQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIC8vIENsZWFyIHRoZSBoaWdobGlnaHRlZCBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgcG9zaXRpb24gMTAwIHRvIDE1MCwgaW5jbHVkZWQuXG4gICogbXlTZXF1ZW5jZS5yZW1vdmVIaWdobGlnaHQoXCJzcGluMVwiKTtcbiAgKiBcbiAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBoaWdobGlnaHQgb24gdGhlIGludGVybmFsIGFycmF5LiBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGJ5IG1ldGhvZCBoaWdobGlnaHQuXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUucmVtb3ZlSGlnaGxpZ2h0ID0gZnVuY3Rpb24gKGlkKSB7XHRcbiAgdGhpcy5vcHRpb25zLnNldCh7aGlnaGxpZ2h0czogdGhpcy5vcHRpb25zLmdldCgnaGlnaGxpZ2h0cycpLmZpbHRlcihmdW5jdGlvbiAoaGwpIHtcbiAgICByZXR1cm4gaGwuaWQgIT09IGlkO1xuICB9KX0pO1xufTtcblx0XG4vKipcbiAgKiBDbGVhciB0aGUgaGlnaGxpZ2h0cyBvZiB3aG9sZSBzZXF1ZW5jZS5cbiAgKiBAZGVwcmVjYXRlZCB1c2UgcmVtb3ZlQWxsSGlnaGxpZ2h0cyBpbnN0ZWFkLlxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnVuSGlnaGxpZ2h0QWxsID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlbW92ZUFsbEhpZ2hsaWdodHMoKTtcbn07XG5cdFxuLyoqXG4gICogUmVtb3ZlIGFsbCB0aGUgaGlnaGxpZ2h0cyBvZiB3aG9sZSBzZXF1ZW5jZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbXlTZXF1ZW5jZS5yZW1vdmVBbGxIaWdobGlnaHRzKCk7XG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUucmVtb3ZlQWxsSGlnaGxpZ2h0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vcHRpb25zLnNldCh7aGlnaGxpZ2h0czogW119KTtcbn07XG5cdFxuXHQvKipcbiAgICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGRpc3BsYXllZCBzZXF1ZW5jZS5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gU2V0IHRoZSBudW1iZXIgb2YgY29sdW1ucyB0byA3MC5cbiAgICAqIG15U2VxdWVuY2Uuc2V0TnVtQ29scyg3MCk7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBudW1Db2xzIFRoZSBudW1iZXIgb2YgY29sdW1ucy5cbiAgICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnNldE51bUNvbHMgPSBmdW5jdGlvbihudW1Db2xzKSB7XG4gIHRoaXMub3B0aW9ucy5zZXQoe251bUNvbHM6IG51bUNvbHN9KTtcbn07XG5cdFxuLyoqXG4gICogR2V0IG9yIFNldCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZHJvcC1kb3duIGxpc3Qgb2YgZm9ybWF0cy5cbiAgKiBcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGUgdHJ1ZTogc2hvdzsgZmFsc2U6IGhpZGUuXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuZm9ybWF0U2VsZWN0b3JWaXNpYmxlID0gZnVuY3Rpb24gKHZpc2libGUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldCgnZm9ybWF0U2VsZWN0b3JWaXNpYmxlJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5vcHRpb25zLnNldCh7Zm9ybWF0U2VsZWN0b3JWaXNpYmxlOiB2aXNpYmxlfSk7XG4gIH1cbn07XG5cdFxuLyoqXG4gICogVGhpcyBpcyBzaW1pbGFyIHRvIGEge0Jpb2pzLlNlcXVlbmNlI2Zvcm1hdFNlbGVjdG9yVmlzaWJsZX0gd2l0aCB0aGUgJ3RydWUnIGFyZ3VtZW50LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvLyBTaG93cyB0aGUgZm9ybWF0IHNlbGVjdG9yLlxuICAqIG15U2VxdWVuY2Uuc2hvd0Zvcm1hdFNlbGVjdG9yKCk7XG4gICogXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuc2hvd0Zvcm1hdFNlbGVjdG9yID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZm9ybWF0U2VsZWN0b3JWaXNpYmxlKHRydWUpO1xufTtcblx0XG4vKipcbiAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gYSB7QmlvanMuUHJvdGVpbjNEI2Zvcm1hdFNlbGVjdG9yVmlzaWJsZX0gd2l0aCB0aGUgJ2ZhbHNlJyBhcmd1bWVudC5cbiAgKiBcbiAgKiBAZXhhbXBsZVxuICAqIC8vIEhpZGVzIHRoZSBmb3JtYXQgc2VsZWN0b3IuXG4gICogbXlTZXF1ZW5jZS5oaWRlRm9ybWF0U2VsZWN0b3IoKTtcbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5oaWRlRm9ybWF0U2VsZWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5mb3JtYXRTZWxlY3RvclZpc2libGUoZmFsc2UpO1xufTtcblx0XG4vKipcbiAgKiBIaWRlcyB0aGUgd2hvbGUgY29tcG9uZW50LlxuICAqIFxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2hlYWRlckRpdi5oaWRlKCk7XG4gIHRoaXMuX2NvbnRlbnREaXYuaGlkZSgpO1xufTtcblxuLyoqXG4gICogU2hvd3MgdGhlIHdob2xlIGNvbXBvbmVudC5cbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9oZWFkZXJEaXYuc2hvdygpO1xuICB0aGlzLl9jb250ZW50RGl2LnNob3coKTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5faXNTZWxlY3RpbmcgPSBmYWxzZTtcblNlcXVlbmNlLnByb3RvdHlwZS5fbGFzdEVudGVyZWQgPSAtMTtcblNlcXVlbmNlLnByb3RvdHlwZS5fc2VsZWN0aW9uU3RhcnQgPSAtMTtcblxuU2VxdWVuY2UucHJvdG90eXBlLnN0YXJ0U2VsZWN0aW5nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9pc1NlbGVjdGluZyA9IHRydWU7XG4gIHRoaXMuX3NlbGVjdGlvblN0YXJ0ID0gdGhpcy5fbGFzdEVudGVyZWQ7XG4gIHRoaXMuc2V0U2VsZWN0aW9uKHRoaXMuX2xhc3RFbnRlcmVkLCB0aGlzLl9sYXN0RW50ZXJlZCk7XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuc3RvcFNlbGVjdGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5faXNTZWxlY3RpbmcgPSBmYWxzZTtcbiAgdGhpcy5fbGFzdEVudGVyZWQgPSAtMTtcbiAgdGhpcy5fc2VsZWN0aW9uU3RhcnQgPSAtMTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5fcmVjb3JkRW50cnkgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgdGhpcy5fbGFzdEVudGVyZWQgPSBpbmRleDtcbiAgaWYgKHRoaXMuX2lzU2VsZWN0aW5nKSB7XG4gICAgdmFyIHNlbGVjdGlvbiA9IHRoaXMub3B0aW9ucy5nZXQoJ3NlbGVjdGlvbicpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9uKHRoaXMuX3NlbGVjdGlvblN0YXJ0LCBpbmRleCk7XG4gIH1cbn07XG5cdFxuLyogXG4gICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX3JlZHJhd1xuICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UuIFxuICAgICogUmV0dXJuczogIC1cbiAgICAqIElucHV0czogLVxuICAgICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuX3JlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMuZ2V0KCdyZW5kZXJlcicpO1xuICBpZiAoIXJlbmRlcmVyKSByZXR1cm47XG4gIHRoaXMuX2NvbnRlbnREaXYuaHRtbChyZW5kZXJlci5yZW5kZXIoXG4gICAgICAgIHRoaXMub3B0aW9ucy5nZXQoJ3NlcXVlbmNlJyksIHRoaXMub3B0aW9ucy5nZXQoJ2lkJyksXG4gICAgICAgIHRoaXMuZ2V0SGlnaGxpZ2h0cygpLCB0aGlzLm9wdGlvbnMuZ2V0KCdhbm5vdGF0aW9ucycpKSk7XG59O1xuXG5mdW5jdGlvbiBfYnVpbGRSZW5kZXJlciAoKSB7XG4gIHZhciBSZW5kZXJlciA9IHJlbmRlcmVyc1t0aGlzLm9wdGlvbnMuZ2V0KCdmb3JtYXQnKV07XG4gIGlmICghUmVuZGVyZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJEb24ndCBrbm93IGhvdyB0byByZW5kZXIgXCIgKyBmbXQpO1xuICB9XG4gIHJldHVybiBuZXcgUmVuZGVyZXIoe1xuICAgIHdpZHRoOiBwYXJzZUludCh0aGlzLm9wdGlvbnMuZ2V0KCdudW1Db2xzJyksIDEwKSxcbiAgICBhZGRCYXNlQ2xhc3M6ICEhdGhpcy5vcHRpb25zLmdldCgnY29sb3VyZWRCYXNlcycpLFxuICAgIG9uTW91c2VFbnRlcjogdGhpcy5fcmVjb3JkRW50cnkuYmluZCh0aGlzKSxcbiAgICBvbkNoYW5nZVNlbGVjdGlvbjogdGhpcy5vcHRpb25zLm9uLmJpbmQodGhpcy5vcHRpb25zLCAnY2hhbmdlOnNlbGVjdGlvbicpXG4gIH0pO1xufVxuXG5TZXF1ZW5jZS5wcm90b3R5cGUuZ2V0SGlnaGxpZ2h0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhpZ2hsaWdodHMgPSB0aGlzLm9wdGlvbnMuZ2V0KCdoaWdobGlnaHRzJykuc2xpY2UoKTtcbiAgdmFyIHNlbGVjdGlvbiA9IHRoaXMub3B0aW9ucy5nZXQoJ3NlbGVjdGlvbicpO1xuICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgaGlnaGxpZ2h0cy5wdXNoKHtcbiAgICAgIHN0YXJ0OiBzZWxlY3Rpb24uc3RhcnQsXG4gICAgICBlbmQ6IHNlbGVjdGlvbi5lbmQsXG4gICAgICBraW5kOiAnc2VsZWN0aW9uJyxcbiAgICAgIGlkOiAnX19zZWxlY3Rpb25fXydcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gaGlnaGxpZ2h0cztcbn07XG5cblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9hZGRUb29sdGlwXG4gICAgICogUHVycG9zZTogIEFkZCBhIHRvb2x0aXAgYXJvdW5kIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQgcHJvdmlkZWQgYXMgYXJndW1lbnRcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogICB0YXJnZXQgLT4ge0VsZW1lbnR9IERPTSBlbGVtZW50IHdpY2ggaXMgdGhlIHRhcmdldGVkIGZvY3VzIGZvciB0aGUgdG9vbHRpcC5cbiAgICAgKiBcdFx0XHQgY2JHZXRNZXNzYWdlRnVuY3Rpb24gLT4ge2Z1bmN0aW9ufSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpY2ggcmV0dXJucyB0aGUgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRpcC5cbiAgICAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5fYWRkVG9vbFRpcCA9IGZ1bmN0aW9uICggdGFyZ2V0LCBjYkdldE1lc3NhZ2VGdW5jdGlvbiApIHtcblxuICB2YXIgdGlwSWQgPSAnI3NlcXVlbmNlVGlwJyArIHRoaXMuZ2V0SWQoKTtcblxuICBqUXVlcnkodGFyZ2V0KS5tb3VzZW92ZXIoZnVuY3Rpb24oZSkge1xuXG4gICAgdmFyIG9mZnNldCA9IGpRdWVyeShlLnRhcmdldCkub2Zmc2V0KCk7XG5cbiAgICBpZiAoICEgalF1ZXJ5KCB0aXBJZCApLmlzKCc6dmlzaWJsZScpICkge1xuICAgICAgalF1ZXJ5KCB0aXBJZCApIFxuICAgIC5jc3Moe1xuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBcIiMwMDBcIixcbiAgICAgICdwYWRkaW5nJzogXCIzcHggMTBweCAzcHggMTBweFwiLFxuICAgICAgJ3RvcCc6IG9mZnNldC50b3AgKyBqUXVlcnkoZS50YXJnZXQpLmhlaWdodCgpICsgXCJweFwiLFxuICAgICAgJ2xlZnQnOiBvZmZzZXQubGVmdCArIGpRdWVyeShlLnRhcmdldCkud2lkdGgoKSArIFwicHhcIlxuICAgIH0pXG4gIC5hbmltYXRlKCB7b3BhY2l0eTogJzAuODUnfSwgMTApXG4gICAgLmh0bWwoIGNiR2V0TWVzc2FnZUZ1bmN0aW9uLmNhbGwoIHRhcmdldCApIClcbiAgICAuc2hvdygpO1xuICAgIH1cblxuICB9KS5tb3VzZW91dChmdW5jdGlvbigpIHtcbiAgICAvL1JlbW92ZSB0aGUgYXBwZW5kZWQgdG9vbHRpcCB0ZW1wbGF0ZVxuICAgIGpRdWVyeSggdGlwSWQgKS5oaWRlKCk7XHQgICAgICAgICBcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcXVlbmNlO1xuIiwidmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2Jpb2pzLWV2ZW50cycpO1xuXG5mdW5jdGlvbiBNb2RlbCAoYXR0cmlidXRlcywgZGVmYXVsdHMpIHtcbiAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gIHRoaXMuZGVmYXVsdHMgPSAoZGVmYXVsdHMgfHwge30pO1xuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXNba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnRzLm1peGluKE1vZGVsLnByb3RvdHlwZSk7XG5cbk1vZGVsLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KTtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIGlmICh0aGlzLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXNba2V5XTtcbiAgfVxuICByZXR1cm4gdGhpcy5kZWZhdWx0c1trZXldO1xufTtcblxuTW9kZWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gIHZhciBvbGQsIG5vdywga2V5LCBzZWxmID0gdGhpcywgY2hhbmdlcyA9IFtdO1xuICBmb3IgKGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgb2xkID0gdGhpcy5hdHRyaWJ1dGVzW2tleV07XG4gICAgbm93ID0gcHJvcGVydGllc1trZXldO1xuICAgIGlmIChvbGQgIT09IG5vdykge1xuICAgICAgY2hhbmdlcy5wdXNoKFsnY2hhbmdlOicgKyBrZXksIG5vdywgb2xkXSk7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXNba2V5XSA9IG5vdztcbiAgICB9XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zaWxlbnQpIHJldHVybjtcblxuICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgIHNlbGYudHJpZ2dlci5hcHBseShzZWxmLCBjaGFuZ2UpO1xuICB9KTtcbiAgc2VsZi50cmlnZ2VyKCdjaGFuZ2UnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWw7XG4iLCIvLyBCYXNlIGNsYXNzIGZvciByZW5kZXJlcnMuXG52YXIgUmVuZGVyZXIgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlbmRlcmVyICgpIHsgfTtcblxudmFyIGNsYXNzTmFtZXNGb3IgPSB7XG4gIEE6ICdhZGVuaW5lJyxcbiAgQzogJ2N5dG9zaW5lJyxcbiAgRzogJ2d1YW5pbmUnLFxuICBUOiAndGh5bWluZSdcbn07XG52YXIgYmFzZVRvQ2xhc3MgPSBmdW5jdGlvbiAoY29kZSkge1xuICByZXR1cm4gY2xhc3NOYW1lc0Zvcltjb2RlLnRvVXBwZXJDYXNlKCldO1xufTtcblxudmFyIFVOSU1QTEVNRU5URUQgPSBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTsgfTtcblxuUmVuZGVyZXIub3B0aW9uYWxQcm9wZXJ0aWVzID0gWydhZGRCYXNlQ2xhc3MnLCAnd2lkdGgnLCAnb25Nb3VzZUVudGVyJ107XG5SZW5kZXJlci5yZXF1aXJlZFByb3BlcnRpZXMgPSBbJ29uQ2hhbmdlU2VsZWN0aW9uJ107XG5cbi8qKlxuICAqIEdldCB0aGUgaGlnaGxpZ2h0IGNsYXNzIGZvciBhIGJhc2UgYXQgdGhlIGdpdmVuIDEtYmFzZWQgaW5kZXguXG4gICovXG52YXIgZ2V0SGlnaGxpZ2h0Q2xhc3MgPSBmdW5jdGlvbiAoaGlnaGxpZ2h0cywgYmFzZVBvc2l0aW9uKSB7XG4gIHZhciBjc3NDbGFzcyA9ICcnO1xuICAvLyBMYXN0IG9uZSB0YWtlcyBwcmVjZWRlbmNlLlxuICBoaWdobGlnaHRzLmZvckVhY2goZnVuY3Rpb24gKGhsKSB7XG4gICAgaWYgKGJhc2VQb3NpdGlvbiA+PSBobC5zdGFydCAmJiBiYXNlUG9zaXRpb24gPD0gaGwuZW5kKSB7XG4gICAgICBjc3NDbGFzcyA9IGhsLmtpbmQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNzc0NsYXNzO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlID0ge1xuXG4gIC8qKlxuICAgKiBDb21tb24gaW5pdGlhbGlzYXRpb24gbG9naWMuXG4gICAqL1xuICBpbml0OiBmdW5jdGlvbiBpbml0IChvcHRzKSB7XG4gICAgdGhpcy5iYXNlcyA9IFtdO1xuICAgIFJlbmRlcmVyLm9wdGlvbmFsUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBpZiAob3B0c1tuYW1lXSkgdGhpc1tuYW1lXSA9IG9wdHNbbmFtZV07XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIFJlbmRlcmVyLnJlcXVpcmVkUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBpZiAoIW9wdHNbbmFtZV0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyByZXF1aXJlZCBvcHRpb246IFwiICsgbmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzW25hbWVdID0gb3B0c1tuYW1lXTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcm9kdWNlIGEgY2FudmFzIG9iamVjdC5cbiAgICovXG4gIGdldENhbnZhczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgICBjYW52YXMuY2xhc3NOYW1lID0gJ3NlcXVlbmNlLWNhbnZhcyAnICsgdGhpcy5mb3JtYXQudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gY2FudmFzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJhc2VzIHRvIHJlbmRlclxuICAgKi9cbiAgZ2V0QmFzZXM6IGZ1bmN0aW9uIChzZXEpIHsgcmV0dXJuIHNlcS5zcGxpdCgnJykubWFwKHRoaXMudHJhbnNmb3JtQmFzZSk7IH0sXG5cbiAgLyoqXG4gICAqIFRoZSB0cmFuc2Zvcm1hdGlvbiB0byBwZXJmb3JtIG9uIGVhY2ggYmFzZSAtIGJ5IGRlZmF1bHQgdXBwZXItY2FzZS5cbiAgICovXG4gIHRyYW5zZm9ybUJhc2U6IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LnRvVXBwZXJDYXNlKCk7IH0sXG5cbiAgLyoqXG4gICAqIFN1YmNsYXNzZXMgbXVzdCBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uIHRoYXQgcmVuZGVycyBhIGhlYWRlciB0byBhIGNhbnZhcy5cbiAgICovXG4gIHJlbmRlckhlYWRlcjogVU5JTVBMRU1FTlRFRCxcblxuICAvKipcbiAgICogU3ViY2xhc3NlcyBtdXN0IHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gdGhhdCByZW5kZXJzIGEgcm93IG9mIGJhc2VzLlxuICAgKi9cbiAgcmVuZGVyUm93OiBVTklNUExFTUVOVEVELFxuXG4gIC8qKlxuICAgKiBTdWJjbGFzc2VzIG11c3QgcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiB0aGF0IHJlbmRlcnMgYSBmb290ZXIuXG4gICAqL1xuICByZW5kZXJGb290ZXI6IFVOSU1QTEVNRU5URUQsXG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdGhlIENTUy1jbGFzc2VzIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIGJhc2UgYXQgdGhlIGdpdmVuIDEtYmFzZWQgaW5kZXguXG4gICAqL1xuICBnZXRCYXNlQ2xhc3NlczogZnVuY3Rpb24gKGNvZGUsIGluZGV4LCBoaWdobGlnaHRlcikge1xuICAgIHZhciBjbGFzc2VzID0gWydzZXEtYmFzZSddO1xuICAgIHZhciBiYXNlQ2xhc3MgPSBiYXNlVG9DbGFzcyhjb2RlKTtcbiAgICBpZiAoYmFzZUNsYXNzICYmIHRoaXMuYWRkQmFzZUNsYXNzKSB7XG4gICAgICBjbGFzc2VzLnB1c2goYmFzZUNsYXNzKTtcbiAgICB9XG4gICAgY2xhc3Nlcy5wdXNoKGhpZ2hsaWdodGVyKGluZGV4KSk7XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBiYXNlLlxuICAgKi9cbiAgcmVuZGVyQmFzZTogZnVuY3Rpb24gKHJvdywgcm93SW5kZXgpIHtcbiAgICB2YXIgY29kZSA9IHJvdy5iYXNlc1tyb3dJbmRleF07XG4gICAgdmFyIGluZGV4ID0gcm93LnN0YXJ0ICsgcm93SW5kZXg7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBiYXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHZhciBjbGFzc2VzID0gdGhpcy5nZXRCYXNlQ2xhc3Nlcyhjb2RlLCBpbmRleCwgcm93LmhpZ2hsaWdodGVyKTtcbiAgICBiYXNlLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgIGJhc2UuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29kZSkpO1xuICAgIGJhc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5vbk1vdXNlRW50ZXIoaW5kZXgpO1xuICAgIH0pO1xuICAgIHNlbGYub25DaGFuZ2VTZWxlY3Rpb24oZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgaWYgKGluZGV4ID49IHNlbGVjdGlvbi5zdGFydCAmJiBpbmRleCA8PSBzZWxlY3Rpb24uZW5kKSB7XG4gICAgICAgIGJhc2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYXNlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGlvbicpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBiYXNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2VxdWVuY2UuXG4gICAqL1xuICByZW5kZXI6IGZ1bmN0aW9uIChzZXF1ZW5jZSwgaWQsIGhpZ2hsaWdodHMsIGFubm90YXRpb25zKSB7XG4gICAgdmFyIGhpZ2hsaWdodGVyLCBjYW52YXMsIGksIGJhc2VzLCByb3dCYXNlcywgcm93LCBvZmZzZXQ7XG4gICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBOT19DT05URU5UO1xuICAgIH1cbiAgICBiYXNlcyA9IHRoaXMuZ2V0QmFzZXMoc2VxdWVuY2UpO1xuICAgIGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKCk7XG5cbiAgICB0aGlzLnJlbmRlckhlYWRlcihjYW52YXMsIGJhc2VzLCBpZCk7XG4gICAgaGlnaGxpZ2h0ZXIgPSBnZXRIaWdobGlnaHRDbGFzcy5iaW5kKG51bGwsIGhpZ2hsaWdodHMpO1xuXG4gICAgZm9yIChpID0gMSwgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYmFzZXMubGVuZ3RoOyBvZmZzZXQgKz0gdGhpcy53aWR0aCwgaSsrKSB7XG4gICAgICByb3dCYXNlcyA9IGJhc2VzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdGhpcy53aWR0aCk7XG4gICAgICByb3cgPSB7XG4gICAgICAgIGlkeDogaSxcbiAgICAgICAgYmFzZXM6IHJvd0Jhc2VzLFxuICAgICAgICBzdGFydDogb2Zmc2V0ICsgMSxcbiAgICAgICAgZW5kOiBvZmZzZXQgKyB0aGlzLndpZHRoLFxuICAgICAgICBoaWdobGlnaHRlcjogaGlnaGxpZ2h0ZXJcbiAgICAgIH07XG4gICAgICB0aGlzLnJlbmRlclJvdyhjYW52YXMsIHJvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJGb290ZXIoY2FudmFzKTtcblxuICAgIHJldHVybiBjYW52YXM7XG4gIH1cbn07XG5cbiIsInZhciBSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXItYmFzZScpO1xuXG52YXIgU1BBQ0UgPSAnICc7XG5cbnZhciBOT19PUCA9IGZ1bmN0aW9uICgpIHsgfTtcblxuLy8tLS0tLS0tLS0tIFJlbmRlcmVyIGZvciBGQVNUQVxuXG52YXIgRmFzdGFSZW5kZXJlciA9IGV4cG9ydHMuRkFTVEEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLmluaXQob3B0aW9ucyk7XG59O1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZSA9IG5ldyBSZW5kZXJlcigpO1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZS5mb3JtYXQgPSAnRkFTVEEnO1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJIZWFkZXIgPSBmdW5jdGlvbiAoY2FudmFzLCBiYXNlcywgaWQpIHtcbiAgdmFyIGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCc+JyArIGlkICsgJyAnICsgYmFzZXMubGVuZ3RoICsgJ2JwJyk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJGb290ZXIgPSBOT19PUDtcblxuRmFzdGFSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyUm93ID0gZnVuY3Rpb24gKGNhbnZhcywgcm93KSB7XG4gIHZhciBpLCBiYXNlO1xuICBmb3IgKGkgPSAwOyBpIDwgcm93LmJhc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgYmFzZSA9IHRoaXMucmVuZGVyQmFzZShyb3csIGkpO1xuICAgIGNhbnZhcy5hcHBlbmRDaGlsZChiYXNlKTtcbiAgfVxuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLSBSZW5kZXJlciBmb3IgQ09EQVRBXG5cbnZhciBDb2RhdGFSZW5kZXJlciA9IGV4cG9ydHMuQ09EQVRBID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdGhpcy5pbml0KG9wdGlvbnMpO1xufTtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlID0gbmV3IFJlbmRlcmVyKCk7XG5cbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5mb3JtYXQgPSAnQ09EQVRBJztcbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5ncm91cFdpZHRoID0gNTtcbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5sZWZ0TWFyZ2luU2l6ZSA9IDc7XG5Db2RhdGFSZW5kZXJlci5wcm90b3R5cGUuZ3V0dGVyID0gU1BBQ0UgKyBTUEFDRTtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckZvb3RlciA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJy8vLycpKTtcbn07XG5cbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJIZWFkZXIgPSBmdW5jdGlvbiAoY2FudmFzLCBiYXNlcywgaWQpIHtcbiAgdmFyIGksIHgsIG5lZWRlZCwgYnVmZiA9IFtdO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0VOVFJZICAgICAgICAgICAnKSk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpZCkpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU0VRVUVOQ0UnKSk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZWZ0TWFyZ2luU2l6ZTsgaSsrKSB7XG4gICAgYnVmZi5wdXNoKFNQQUNFKTtcbiAgfVxuICBidWZmLnB1c2godGhpcy5ndXR0ZXIpO1xuICB2YXIgbWF4TiA9IE1hdGgubWluKGJhc2VzLmxlbmd0aCwgdGhpcy53aWR0aCk7XG5cbiAgZm9yIChpID0gdGhpcy5ncm91cFdpZHRoOyBpIDw9IG1heE47IGkgKz0gdGhpcy5ncm91cFdpZHRoKSB7XG4gICAgeCA9IFN0cmluZyhpKTtcbiAgICBmb3IgKG5lZWRlZCA9ICh0aGlzLmdyb3VwV2lkdGggKiAyKSAtICgxICsgeC5sZW5ndGgpOyBuZWVkZWQgPiAwOyBuZWVkZWQtLSkge1xuICAgICAgYnVmZi5wdXNoKFNQQUNFKTtcbiAgICB9XG4gICAgYnVmZi5wdXNoKHgpO1xuICAgIGJ1ZmYucHVzaChTUEFDRSk7XG4gIH1cblxuICB2YXIgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBoZWFkZXIuY2xhc3NOYW1lID0gJ3NlcXVlbmNlLWhlYWRlcic7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShidWZmLmpvaW4oJycpKSk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG5Db2RhdGFSZW5kZXJlci5wcm90b3R5cGUucmVuZGVySW50ZXJCYXNlID0gZnVuY3Rpb24gKHJvdywgYmFzZSwgaW50ZXJiYXNlSW5kZXgpIHtcbiAgdmFyIGludGVyYmFzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgdmFyIGNsYXNzZXMgPSB0aGlzLmdldEJhc2VDbGFzc2VzKGJhc2UsIGludGVyYmFzZUluZGV4LCByb3cuaGlnaGxpZ2h0ZXIpO1xuICBjbGFzc2VzLnB1c2goJ2ludGVyYmFzZScpO1xuICBpbnRlcmJhc2UuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gIGludGVyYmFzZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTUEFDRSkpO1xuICB0aGlzLm9uQ2hhbmdlU2VsZWN0aW9uKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICBpZiAoaW50ZXJiYXNlSW5kZXggPj0gc2VsZWN0aW9uLnN0YXJ0ICYmIGludGVyYmFzZUluZGV4IDw9IHNlbGVjdGlvbi5lbmQpIHtcbiAgICAgIGludGVyYmFzZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW50ZXJiYXNlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGlvbicpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpbnRlcmJhc2U7XG59O1xuXG5Db2RhdGFSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyUm93ID0gZnVuY3Rpb24gKGNhbnZhcywgcm93KSB7XG4gIHZhciBuZWVkZWQsIGksIGJhc2U7XG5cbiAgdmFyIHJvd0xhYmVsID0gU3RyaW5nKHJvdy5zdGFydCk7XG4gIHZhciBidWZmID0gW107XG4gIGZvciAobmVlZGVkID0gKHRoaXMubGVmdE1hcmdpblNpemUgLSByb3dMYWJlbC5sZW5ndGgpOyBuZWVkZWQgPiAwOyBuZWVkZWQtLSkge1xuICAgIGJ1ZmYucHVzaChTUEFDRSk7XG4gIH1cbiAgYnVmZi5wdXNoKHJvd0xhYmVsLCB0aGlzLmd1dHRlcik7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShidWZmLmpvaW4oJycpKSk7XG4gIGZvciAoaSA9IDA7IGkgPCByb3cuYmFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBiYXNlID0gdGhpcy5yZW5kZXJCYXNlKHJvdywgaSk7XG4gICAgY2FudmFzLmFwcGVuZENoaWxkKGJhc2UpO1xuICAgIGlmIChpICsgMSA8IHJvdy5iYXNlcy5sZW5ndGgpIHtcbiAgICAgIHZhciBpbnRlcmJhc2VJbmRleCA9IHJvdy5zdGFydCArIGkgKyAwLjU7XG4gICAgICB2YXIgaW50ZXJiYXNlID0gdGhpcy5yZW5kZXJJbnRlckJhc2Uocm93LCByb3cuYmFzZXNbaV0sIGludGVyYmFzZUluZGV4KTtcbiAgICAgIGNhbnZhcy5hcHBlbmRDaGlsZChpbnRlcmJhc2UpO1xuICAgIH1cbiAgfVxuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG4vLy0tLS0tLS0tLSBSZW5kZXJlciBmb3IgUFJJREUgZm9ybWF0XG5cbnZhciBQcmlkZVJlbmRlcmVyID0gZXhwb3J0cy5QUklERSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHRoaXMuaW5pdChvcHRpb25zKTtcbn07XG5cblByaWRlUmVuZGVyZXIucHJvdG90eXBlID0gbmV3IFJlbmRlcmVyKCk7XG5cblByaWRlUmVuZGVyZXIucHJvdG90eXBlLmZvcm1hdCA9ICdQUklERSc7XG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5ncm91cFdpZHRoID0gMTA7XG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5tYXJnaW5TaXplID0gNTtcblByaWRlUmVuZGVyZXIucHJvdG90eXBlLmd1dHRlciA9IFNQQUNFICsgU1BBQ0U7XG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5haXNsZSA9IFNQQUNFO1xuXG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJIZWFkZXIgPSBOT19PUDtcblxuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRm9vdGVyID0gTk9fT1A7XG5cblByaWRlUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckxhYmVsID0gZnVuY3Rpb24gKG51bSkge1xuICB2YXIgbGFiZWwgPSBTdHJpbmcobnVtKTtcbiAgdmFyIGJ1ZmYgPSBbXTtcbiAgZm9yIChuZWVkZWQgPSAodGhpcy5tYXJnaW5TaXplIC0gbGFiZWwubGVuZ3RoKTsgbmVlZGVkID4gMDsgbmVlZGVkLS0pIHtcbiAgICBidWZmLnB1c2goJzAnKTtcbiAgfVxuICBidWZmLnB1c2gobGFiZWwpO1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnVmZi5qb2luKCcnKSk7XG59O1xuXG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoY2FudmFzLCByb3cpIHtcbiAgdmFyIG5lZWRlZCwgaSwgYmFzZTtcblxuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJMYWJlbChyb3cuc3RhcnQpKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuZ3V0dGVyKSk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHJvdy5iYXNlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpID4gMCAmJiBpICUgdGhpcy5ncm91cFdpZHRoID09PSAwKSB7XG4gICAgICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5haXNsZSkpO1xuICAgIH1cbiAgICBiYXNlID0gdGhpcy5yZW5kZXJCYXNlKHJvdywgaSk7XG4gICAgY2FudmFzLmFwcGVuZENoaWxkKGJhc2UpO1xuICB9XG4gIGlmIChpID09PSB0aGlzLndpZHRoKSB7XG4gICAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuZ3V0dGVyKSk7XG4gICAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyTGFiZWwocm93LmVuZCkpO1xuICB9XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbn07XG5cbi8vLS0tLS0gIFJlbmRlcmVyIGZvciBSQVcgZm9ybWF0XG5cbnZhciBSYXdSZW5kZXJlciA9IGV4cG9ydHMuUkFXID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdGhpcy5pbml0KG9wdGlvbnMpO1xufTtcblxuUmF3UmVuZGVyZXIucHJvdG90eXBlID0gbmV3IFJlbmRlcmVyKCk7XG5SYXdSZW5kZXJlci5wcm90b3R5cGUuZm9ybWF0ID0gJ1BSSURFJztcblJhd1JlbmRlcmVyLnByb3RvdHlwZS50cmFuc2Zvcm1CYXNlID0gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH07XG5SYXdSZW5kZXJlci5wcm90b3R5cGUucmVuZGVySGVhZGVyID0gTk9fT1A7XG5SYXdSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRm9vdGVyID0gTk9fT1A7XG5cblJhd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoY2FudmFzLCByb3cpIHtcbiAgdmFyIG5lZWRlZCwgaSwgYmFzZTtcbiAgZm9yIChpID0gMDsgaSA8IHJvdy5iYXNlcy5sZW5ndGg7IGkrKykge1xuICAgIGJhc2UgPSB0aGlzLnJlbmRlckJhc2Uocm93LCBpKTtcbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gIH1cbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xufTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcHBseVN0eWxlIChjc3MsIGRvY3VtZW50KSB7XG4gIGlmIChkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVzaGVldCA9IGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQoKTtcbiAgICBzdHlsZXNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgc3R5bGVzaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVzaGVldC50eXBlID0gJ3RleHQvY3NzJztcbiAgICBpZiAoc3R5bGVzaGVldC5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZXNoZWV0LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzaGVldC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZXNoZWV0KTtcbiAgfVxufTtcbiIsInZhciBldmVudHMgPSByZXF1aXJlKFwiYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmVcIik7XG5cbmV2ZW50cy5vbkFsbCA9IGZ1bmN0aW9uKGNhbGxiYWNrLGNvbnRleHQpe1xuICB0aGlzLm9uKFwiYWxsXCIsIGNhbGxiYWNrLGNvbnRleHQpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIE1peGluIHV0aWxpdHlcbmV2ZW50cy5vbGRNaXhpbiA9IGV2ZW50cy5taXhpbjtcbmV2ZW50cy5taXhpbiA9IGZ1bmN0aW9uKHByb3RvKSB7XG4gIGV2ZW50cy5vbGRNaXhpbihwcm90byk7XG4gIC8vIGFkZCBjdXN0b20gb25BbGxcbiAgdmFyIGV4cG9ydHMgPSBbJ29uQWxsJ107XG4gIGZvcih2YXIgaT0wOyBpIDwgZXhwb3J0cy5sZW5ndGg7aSsrKXtcbiAgICB2YXIgbmFtZSA9IGV4cG9ydHNbaV07XG4gICAgcHJvdG9bbmFtZV0gPSB0aGlzW25hbWVdO1xuICB9XG4gIHJldHVybiBwcm90bztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRzO1xuIiwiLyoqXG4gKiBTdGFuZGFsb25lIGV4dHJhY3Rpb24gb2YgQmFja2JvbmUuRXZlbnRzLCBubyBleHRlcm5hbCBkZXBlbmRlbmN5IHJlcXVpcmVkLlxuICogRGVncmFkZXMgbmljZWx5IHdoZW4gQmFja29uZS91bmRlcnNjb3JlIGFyZSBhbHJlYWR5IGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudFxuICogZ2xvYmFsIGNvbnRleHQuXG4gKlxuICogTm90ZSB0aGF0IGRvY3Mgc3VnZ2VzdCB0byB1c2UgdW5kZXJzY29yZSdzIGBfLmV4dGVuZCgpYCBtZXRob2QgdG8gYWRkIEV2ZW50c1xuICogc3VwcG9ydCB0byBzb21lIGdpdmVuIG9iamVjdC4gQSBgbWl4aW4oKWAgbWV0aG9kIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBFdmVudHNcbiAqIHByb3RvdHlwZSB0byBhdm9pZCB1c2luZyB1bmRlcnNjb3JlIGZvciB0aGF0IHNvbGUgcHVycG9zZTpcbiAqXG4gKiAgICAgdmFyIG15RXZlbnRFbWl0dGVyID0gQmFja2JvbmVFdmVudHMubWl4aW4oe30pO1xuICpcbiAqIE9yIGZvciBhIGZ1bmN0aW9uIGNvbnN0cnVjdG9yOlxuICpcbiAqICAgICBmdW5jdGlvbiBNeUNvbnN0cnVjdG9yKCl7fVxuICogICAgIE15Q29uc3RydWN0b3IucHJvdG90eXBlLmZvbyA9IGZ1bmN0aW9uKCl7fVxuICogICAgIEJhY2tib25lRXZlbnRzLm1peGluKE15Q29uc3RydWN0b3IucHJvdG90eXBlKTtcbiAqXG4gKiAoYykgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBJbmMuXG4gKiAoYykgMjAxMyBOaWNvbGFzIFBlcnJpYXVsdFxuICovXG4vKiBnbG9iYWwgZXhwb3J0czp0cnVlLCBkZWZpbmUsIG1vZHVsZSAqL1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgcm9vdCA9IHRoaXMsXG4gICAgICBicmVha2VyID0ge30sXG4gICAgICBuYXRpdmVGb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2gsXG4gICAgICBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgIGlkQ291bnRlciA9IDA7XG5cbiAgLy8gUmV0dXJucyBhIHBhcnRpYWwgaW1wbGVtZW50YXRpb24gbWF0Y2hpbmcgdGhlIG1pbmltYWwgQVBJIHN1YnNldCByZXF1aXJlZFxuICAvLyBieSBCYWNrYm9uZS5FdmVudHNcbiAgZnVuY3Rpb24gbWluaXNjb3JlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBrZXlzOiBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIiB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwia2V5cygpIGNhbGxlZCBvbiBhIG5vbi1vYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSwga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGtleXNba2V5cy5sZW5ndGhdID0ga2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgIH0sXG5cbiAgICAgIHVuaXF1ZUlkOiBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICAgICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gICAgICB9LFxuXG4gICAgICBoYXM6IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgICAgIH0sXG5cbiAgICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG4gICAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopID09PSBicmVha2VyKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBvbmNlOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHZhciByYW4gPSBmYWxzZSwgbWVtbztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChyYW4pIHJldHVybiBtZW1vO1xuICAgICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICBmdW5jID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIF8gPSBtaW5pc2NvcmUoKSwgRXZlbnRzO1xuXG4gIC8vIEJhY2tib25lLkV2ZW50c1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBBIG1vZHVsZSB0aGF0IGNhbiBiZSBtaXhlZCBpbiB0byAqYW55IG9iamVjdCogaW4gb3JkZXIgdG8gcHJvdmlkZSBpdCB3aXRoXG4gIC8vIGN1c3RvbSBldmVudHMuIFlvdSBtYXkgYmluZCB3aXRoIGBvbmAgb3IgcmVtb3ZlIHdpdGggYG9mZmAgY2FsbGJhY2tcbiAgLy8gZnVuY3Rpb25zIHRvIGFuIGV2ZW50OyBgdHJpZ2dlcmAtaW5nIGFuIGV2ZW50IGZpcmVzIGFsbCBjYWxsYmFja3MgaW5cbiAgLy8gc3VjY2Vzc2lvbi5cbiAgLy9cbiAgLy8gICAgIHZhciBvYmplY3QgPSB7fTtcbiAgLy8gICAgIF8uZXh0ZW5kKG9iamVjdCwgQmFja2JvbmUuRXZlbnRzKTtcbiAgLy8gICAgIG9iamVjdC5vbignZXhwYW5kJywgZnVuY3Rpb24oKXsgYWxlcnQoJ2V4cGFuZGVkJyk7IH0pO1xuICAvLyAgICAgb2JqZWN0LnRyaWdnZXIoJ2V4cGFuZCcpO1xuICAvL1xuICBFdmVudHMgPSB7XG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi4gUGFzc2luZyBgXCJhbGxcImAgd2lsbCBiaW5kXG4gICAgLy8gdGhlIGNhbGxiYWNrIHRvIGFsbCBldmVudHMgZmlyZWQuXG4gICAgb246IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb24nLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdIHx8ICh0aGlzLl9ldmVudHNbbmFtZV0gPSBbXSk7XG4gICAgICBldmVudHMucHVzaCh7Y2FsbGJhY2s6IGNhbGxiYWNrLCBjb250ZXh0OiBjb250ZXh0LCBjdHg6IGNvbnRleHQgfHwgdGhpc30pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gb25seSBiZSB0cmlnZ2VyZWQgYSBzaW5nbGUgdGltZS4gQWZ0ZXIgdGhlIGZpcnN0IHRpbWVcbiAgICAvLyB0aGUgY2FsbGJhY2sgaXMgaW52b2tlZCwgaXQgd2lsbCBiZSByZW1vdmVkLlxuICAgIG9uY2U6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb25jZScsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgb25jZSA9IF8ub25jZShmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5vZmYobmFtZSwgb25jZSk7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICAgIG9uY2UuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBvbmNlLCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIG9uZSBvciBtYW55IGNhbGxiYWNrcy4gSWYgYGNvbnRleHRgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIHdpdGggdGhhdCBmdW5jdGlvbi4gSWYgYGNhbGxiYWNrYCBpcyBudWxsLCByZW1vdmVzIGFsbFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgdGhlIGV2ZW50LiBJZiBgbmFtZWAgaXMgbnVsbCwgcmVtb3ZlcyBhbGwgYm91bmRcbiAgICAvLyBjYWxsYmFja3MgZm9yIGFsbCBldmVudHMuXG4gICAgb2ZmOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgdmFyIHJldGFpbiwgZXYsIGV2ZW50cywgbmFtZXMsIGksIGwsIGosIGs7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhZXZlbnRzQXBpKHRoaXMsICdvZmYnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSkgcmV0dXJuIHRoaXM7XG4gICAgICBpZiAoIW5hbWUgJiYgIWNhbGxiYWNrICYmICFjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogXy5rZXlzKHRoaXMuX2V2ZW50cyk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgaWYgKGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdO1xuICAgICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICBldiA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrLl9jYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVHJpZ2dlciBvbmUgb3IgbWFueSBldmVudHMsIGZpcmluZyBhbGwgYm91bmQgY2FsbGJhY2tzLiBDYWxsYmFja3MgYXJlXG4gICAgLy8gcGFzc2VkIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBgdHJpZ2dlcmAgaXMsIGFwYXJ0IGZyb20gdGhlIGV2ZW50IG5hbWVcbiAgICAvLyAodW5sZXNzIHlvdSdyZSBsaXN0ZW5pbmcgb24gYFwiYWxsXCJgLCB3aGljaCB3aWxsIGNhdXNlIHlvdXIgY2FsbGJhY2sgdG9cbiAgICAvLyByZWNlaXZlIHRoZSB0cnVlIG5hbWUgb2YgdGhlIGV2ZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCkuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAndHJpZ2dlcicsIG5hbWUsIGFyZ3MpKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICB2YXIgYWxsRXZlbnRzID0gdGhpcy5fZXZlbnRzLmFsbDtcbiAgICAgIGlmIChldmVudHMpIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzKTtcbiAgICAgIGlmIChhbGxFdmVudHMpIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFRlbGwgdGhpcyBvYmplY3QgdG8gc3RvcCBsaXN0ZW5pbmcgdG8gZWl0aGVyIHNwZWNpZmljIGV2ZW50cyAuLi4gb3JcbiAgICAvLyB0byBldmVyeSBvYmplY3QgaXQncyBjdXJyZW50bHkgbGlzdGVuaW5nIHRvLlxuICAgIHN0b3BMaXN0ZW5pbmc6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgZGVsZXRlTGlzdGVuZXIgPSAhbmFtZSAmJiAhY2FsbGJhY2s7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICBpZiAob2JqKSAobGlzdGVuZXJzID0ge30pW29iai5fbGlzdGVuZXJJZF0gPSBvYmo7XG4gICAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgbGlzdGVuZXJzW2lkXS5vZmYobmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICBpZiAoZGVsZXRlTGlzdGVuZXIpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbaWRdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gc3BsaXQgZXZlbnQgc3RyaW5ncy5cbiAgdmFyIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy87XG5cbiAgLy8gSW1wbGVtZW50IGZhbmN5IGZlYXR1cmVzIG9mIHRoZSBFdmVudHMgQVBJIHN1Y2ggYXMgbXVsdGlwbGUgZXZlbnRcbiAgLy8gbmFtZXMgYFwiY2hhbmdlIGJsdXJcImAgYW5kIGpRdWVyeS1zdHlsZSBldmVudCBtYXBzIGB7Y2hhbmdlOiBhY3Rpb259YFxuICAvLyBpbiB0ZXJtcyBvZiB0aGUgZXhpc3RpbmcgQVBJLlxuICB2YXIgZXZlbnRzQXBpID0gZnVuY3Rpb24ob2JqLCBhY3Rpb24sIG5hbWUsIHJlc3QpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNwYWNlIHNlcGFyYXRlZCBldmVudCBuYW1lcy5cbiAgICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBbbmFtZXNbaV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gQSBkaWZmaWN1bHQtdG8tYmVsaWV2ZSwgYnV0IG9wdGltaXplZCBpbnRlcm5hbCBkaXNwYXRjaCBmdW5jdGlvbiBmb3JcbiAgLy8gdHJpZ2dlcmluZyBldmVudHMuIFRyaWVzIHRvIGtlZXAgdGhlIHVzdWFsIGNhc2VzIHNwZWVkeSAobW9zdCBpbnRlcm5hbFxuICAvLyBCYWNrYm9uZSBldmVudHMgaGF2ZSAzIGFyZ3VtZW50cykuXG4gIHZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gICAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgpOyByZXR1cm47XG4gICAgICBjYXNlIDE6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7IHJldHVybjtcbiAgICAgIGNhc2UgMjogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7IHJldHVybjtcbiAgICAgIGNhc2UgMzogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpOyByZXR1cm47XG4gICAgICBkZWZhdWx0OiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbGlzdGVuTWV0aG9kcyA9IHtsaXN0ZW5UbzogJ29uJywgbGlzdGVuVG9PbmNlOiAnb25jZSd9O1xuXG4gIC8vIEludmVyc2lvbi1vZi1jb250cm9sIHZlcnNpb25zIG9mIGBvbmAgYW5kIGBvbmNlYC4gVGVsbCAqdGhpcyogb2JqZWN0IHRvXG4gIC8vIGxpc3RlbiB0byBhbiBldmVudCBpbiBhbm90aGVyIG9iamVjdCAuLi4ga2VlcGluZyB0cmFjayBvZiB3aGF0IGl0J3NcbiAgLy8gbGlzdGVuaW5nIHRvLlxuICBfLmVhY2gobGlzdGVuTWV0aG9kcywgZnVuY3Rpb24oaW1wbGVtZW50YXRpb24sIG1ldGhvZCkge1xuICAgIEV2ZW50c1ttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCAodGhpcy5fbGlzdGVuZXJzID0ge30pO1xuICAgICAgdmFyIGlkID0gb2JqLl9saXN0ZW5lcklkIHx8IChvYmouX2xpc3RlbmVySWQgPSBfLnVuaXF1ZUlkKCdsJykpO1xuICAgICAgbGlzdGVuZXJzW2lkXSA9IG9iajtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIG9ialtpbXBsZW1lbnRhdGlvbl0obmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWxpYXNlcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIEV2ZW50cy5iaW5kICAgPSBFdmVudHMub247XG4gIEV2ZW50cy51bmJpbmQgPSBFdmVudHMub2ZmO1xuXG4gIC8vIE1peGluIHV0aWxpdHlcbiAgRXZlbnRzLm1peGluID0gZnVuY3Rpb24ocHJvdG8pIHtcbiAgICB2YXIgZXhwb3J0cyA9IFsnb24nLCAnb25jZScsICdvZmYnLCAndHJpZ2dlcicsICdzdG9wTGlzdGVuaW5nJywgJ2xpc3RlblRvJyxcbiAgICAgICAgICAgICAgICAgICAnbGlzdGVuVG9PbmNlJywgJ2JpbmQnLCAndW5iaW5kJ107XG4gICAgXy5lYWNoKGV4cG9ydHMsIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHByb3RvW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gcHJvdG87XG4gIH07XG5cbiAgLy8gRXhwb3J0IEV2ZW50cyBhcyBCYWNrYm9uZUV2ZW50cyBkZXBlbmRpbmcgb24gY3VycmVudCBjb250ZXh0XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRXZlbnRzO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gRXZlbnRzO1xuICAgIH1cbiAgICBleHBvcnRzLkJhY2tib25lRXZlbnRzID0gRXZlbnRzO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuQmFja2JvbmVFdmVudHMgPSBFdmVudHM7XG4gIH1cbn0pKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9pbmRleFwiKTtcbiJdfQ==
