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

var renderers = require('./renderers');
var Model = require('./model');
var Events = require('biojs-events');
var applyStyle = require('./style');

// Event names.
var EVT_ON_SELECTION_CHANGED = "change:selection";
var EVT_ON_SELECTION_CHANGE = EVT_ON_SELECTION_CHANGED; // Deprecated - use EVT_ON_SELECTION_CHANGED.
var EVT_ON_ANNOTATION_CLICKED = "click:annotation";

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
  showAnnotations: true,

  // Strings
  labelFormat: 'Format',
  labelNumCols: 'Columns',
  labelColouredBases: 'Colour Bases',

  warningTitle: 'Warning',
  warningIcon: 'glyphicon glyphicon-warning-sign',

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

// Class member access for others to use.
Sequence.EVT_ON_SELECTION_CHANGED = EVT_ON_SELECTION_CHANGED;
Sequence.EVT_ON_ANNOTATION_CLICKED = EVT_ON_ANNOTATION_CLICKED;

/** Provides on, off, once, trigger **/
Events.mixin(Sequence.prototype);

/**
  * Array containing the supported event names
  * @name Sequence-eventTypes
  */
Sequence.prototype.eventTypes = [

  /**
    * @name Sequence#change:selection
    * @event
    * @param {function} handler An function which receives an {@link Biojs.Event} object as argument.
    * @eventData {int} start A number indicating the start of the selection (1-based index).
    * @eventData {int} end A number indicating the end of selection (1-based index).
    *
    * A selection of 1-10 indicates that all bases with a 1-based index >= 1 and <= 10 are selected,
    * i.e. the first 10 bases.
    *
    * @example 
    * mySequence.on(Sequence.EVT_ON_SELECTION_CHANGED, function(selection) {
    *   console.log("Selected: " + selection.start + " - " + selection.end );
    * }); 
    * 
    * */
  EVT_ON_SELECTION_CHANGED,
  
  /**
    * @name Sequence#change:selection
    * @event
    * @param {function} handler An function which receives an {@link Biojs.Event} object as argument.
    * @eventData {int} start A number indicating the start of the selection (1-based index).
    * @eventData {int} end A number indicating the end of selection (1-based index).
    *
    * A selection of 1-10 indicates that all bases with a 1-based index >= 1 and <= 10 are selected,
    * i.e. the first 10 bases.
    *
    * @example 
    * mySequence.on(Sequence.EVT_ON_SELECTION_CHANGED, function(selection) {
    *   console.log("Selected: " + selection.start + " - " + selection.end );
    * }); 
    * 
    * */
  EVT_ON_SELECTION_CHANGE,
		
  /**
    * @name Sequence#click:annotation
    * @event
    * @param {function} handler An function which receives an {@link Biojs.Event} object as argument.
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

  // These never change - save references.
  this._baseMousedOver = this._recordEntry.bind(this);
  this._initToolTip = this._addToolTip.bind(this);
  this._registerSelectionHandler = this.options.on.bind(this.options, 'change:selection');

  this._bindEvents();

  this._run();
};

Sequence.prototype._run = function () {
  if (this.options.has('sequence')) {
    this.options.trigger('change:format'); // Begin the render cycle.
  } else if (this.options.has('id')) {
    this._requestSequence(this.getId());
  } else {
    this.clearSequence("No sequence available");
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
  this.options.on('change:showAnnotations', redraw);
  this.options.on('change:id', redraw);
  this.options.on('change:renderer', redraw);
  this.options.on('change:sequence', redraw);

  // Propagate this event to this object.
  this.options.on('change:selection', function (sel) {
    self.trigger(EVT_ON_SELECTION_CHANGED, sel);
  });

  this.options.on('change:allowSelection', function (allowed) {
    self._container.toggleClass('no-user-selection', !allowed);
  });

  // Initialise selection events.
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
    
function renderApology (messageText, title, icon) {

  var message = jQuery('<div>')
    .append('<strong>' + title + '</strong>')
    .append(' ')
    .append(messageText)
    .addClass("alert alert-warning message");

  if (icon) {
    if (typeof icon === 'string') {
      message.prepend('<i class="' + icon + '"></i> ');
    } else {
      message.css(icon);
    }
  }

  return message;
}
	
/**
 * Shows the columns indicated by the indexes array.
 * @param {string} [messageText] Message to be shown.
 * @param {string} [icon] Icon to be showed a side of the message
 * 
 * @example 
 * mySequence.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
 * 
 */
Sequence.prototype.clearSequence = function (messageText) {

  this.setSequence(null, null);

  if (!messageText) return this._contentDiv.empty();

  var apology = renderApology(messageText, this.options.get('warningTitle'), this.options.get('warningIcon'));
  return this._contentDiv.html(apology);
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

/**
 * Clear the current selection.
 */
Sequence.prototype.clearSelection = function () {
  this.options.set({selection: {start: null, end: null}});
};

// Base palette: http://paletton.com/#uid=70p0K0kiCFn8GVde7NVmtwSqXtg
var RULES = [
  '.annotation-default {background: #ccc;}',
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

  selector.change(function(e) {
    self.setFormat(jQuery(this).val());
  });

  this.options.on('change:format', function () {
    selector.val(self.options.get('format'));	
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

  this.options.callMethod('highlights', 'concat', [highlight]);
  
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
  this.options.callMethod('highlights', 'filter', function (hl) {
    return hl.id !== id;
  });
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
        this.getHighlights(), this._getAnnotations()));
};

Sequence.prototype._getAnnotations = function () {
  if (this.options.get('showAnnotations')) {
    return this.options.get('annotations').slice();
  } else {
    return [];
  }
};

/**
 * Show the annotations.
 */
Sequence.prototype.showAnnotations = function () {
  this.options.set({showAnnotations: true});
  return this;
}

/**
 * Show the annotations.
 */
Sequence.prototype.hideAnnotations = function () {
  this.options.set({showAnnotations: false});
  return this;
}

/**
 * Toggle the annotations.
 */
Sequence.prototype.toggleAnnotations = function () {
  this.options.update('showAnnotations', function (show) { return !show; });
  return this;
}

/**
 * Purpose: construct the renderer to use for the next redraw.
 *
 * The renderer depends on the following options:
 *  - numCols
 *  - colouredBases
 *  - format
 *
 */
function _buildRenderer () {
  var Renderer = renderers[this.options.get('format')];
  if (!Renderer) {
    throw new Error("Don't know how to render " + fmt);
  }
  return new Renderer({
    width: parseInt(this.options.get('numCols'), 10),
    addBaseClass: !!this.options.get('colouredBases'),
    initToolTip: this._initToolTip,
    onMouseEnter: this._baseMousedOver,
    onChangeSelection: this._registerSelectionHandler
  });
}

/**
 * Retrieve a shallow clone of the highlights to render.
 *
 * The returned value includes the selection highlight.
 *
 * @return {Array} An array of highlights.
 */
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

/**
  * Annotate a set of intervals provided in the argument.
  * 
  * @example
  * // Annotations using regions with different colors.
  * mySequence.addAnnotation({
*    name:"UNIPROT", 
*    html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
*    className:"green", 
*    regions: [
*       {start: 540, end: 560},
*       {start: 561, end:580, color: "#FFA010"}, 
*       {start: 581, end:590, color: "red"}, 
*       {start: 690, end:710}]
* });
* 
* 
* @param {Object} annotation The intervals belonging to the same annotation. 
 * Syntax: { name: &lt;value&gt;, className: &ltstring&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
*/
Sequence.prototype.addAnnotation = function ( annotation ) {
  this.addAnnotations([annotation]);
};

/**
 * Annotate a set of intervals provided in the argument.
 * 
 * @deprecated Use addAnnotation() instead.
 * 
 * @param {Object} annotation The intervals belonging to the same annotation. 
 * Syntax: { name: &lt;value&gt;, className: &ltstring&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
 */
Sequence.prototype.setAnnotation = Sequence.prototype.addAnnotation;

/**
* Annotate multiple sets of intervals.
* 
* @example
* // Annotations using regions with different colors.
* mySequence.addAnnotation([{
*    name:"UNIPROT", 
*    html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
*    className:"green", 
*    regions: [
*       {start: 540, end: 560},
*       {start: 561, end:580, color: "#FFA010"}, 
*       {start: 581, end:590, color: "red"}, 
*       {start: 690, end:710}]
* }]);
* 
* 
* @param {Object} annotation The intervals belonging to the same annotation. 
 * Syntax: { name: &lt;value&gt;, className: &ltstring&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
*/
Sequence.prototype.addAnnotations = function ( annotations ) {
  this.options.callMethod('annotations', 'concat', annotations);
};

/**
  * Removes an annotation by means of its name.
  * 
  * @example 
  * // Remove the UNIPROT annotation.
  * mySequence.removeAnnotation('UNIPROT'); 
  * 
  * @param {string} name The name of the annotation to be removed.
  * 
  */
Sequence.prototype.removeAnnotation = function (name) {
  this.options.callMethod('annotations', 'filter', function (a) {
    return a.name !== name;
  });
};

Sequence.prototype.removeAllAnnotations = function () {
  this.options.set({annotations: []});
};

	/* 
     * Function: Sequence._addToolTip
     * Purpose:  Add a tooltip around the target DOM element provided as argument
     * Returns:  -
     * Inputs:   target -> {Element} DOM element wich is the targeted focus for the tooltip.
     * 			 getMessage -> {Function} A callback function which returns the message to be displayed in the tip.
     */
Sequence.prototype._addToolTip = function (target, getMessage) {

  var self = this;
  var $tip = this._tooltip;
  var $target = jQuery(target);

  return $target.mouseover(onMouseOver).mouseout(onMouseOut);

  function onMouseOut (e) {
    $tip.hide();
  }

  function onMouseOver (e) {

    var $target = jQuery(e.target);
    var offset = $target.offset();

    if (!$tip.is(':visible')) {
      var css = {
        'background-color': "#000",
        'padding': "3px 10px 3px 10px",
        'top': offset.top + $target.height() + "px",
        'left': offset.left + $target.width() + "px"
      };
      var message = getMessage.call(e.target);
      $tip.css(css).animate({opacity: '0.85'}, 10)
      if (message.html && self.options.get('allowHTML')) {
        $tip.html(message.html);
      } else {
        $tip.text(message.text);
      }
      $tip.show();
    }
  }
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

},{"biojs-events":6}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL2xpYi9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL21vZGVsLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9saWIvcmVuZGVyZXItYmFzZS5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL3JlbmRlcmVycy5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL3N0eWxlLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvYmlvanMtZXZlbnRzL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvYmlvanMtZXZlbnRzL25vZGVfbW9kdWxlcy9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZS9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZS5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9ub2RlX21vZHVsZXMvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUvaW5kZXguanMiLCIuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4K0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyUkE7QUFDQTs7QUNEQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBcbiAqIFNlcXVlbmNlIGNvbXBvbmVudCBcbiAqIFxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBCaW9qc1xuICogXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86am9obmNhckBnbWFpbC5jb21cIj5Kb2huIEdvbWV6PC9hPiwgPGEgaHJlZj1cIm1haWx0bzpzZWNldmFsbGl2QGdtYWlsLmNvbVwiPkpvc2UgVmlsbGF2ZWNlczwvYT5cbiAqIEB2ZXJzaW9uIDEuMC4wXG4gKiBAY2F0ZWdvcnkgM1xuICogXG4gKiBAcmVxdWlyZXMgPGEgaHJlZj0naHR0cDovL2Jsb2cuanF1ZXJ5LmNvbS8yMDExLzA5LzEyL2pxdWVyeS0xLTYtNC1yZWxlYXNlZC8nPmpRdWVyeSBDb3JlIDEuNi40PC9hPlxuICogQGRlcGVuZGVuY3kgPHNjcmlwdCBsYW5ndWFnZT1cIkphdmFTY3JpcHRcIiB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwiLi4vYmlvanMvZGVwZW5kZW5jaWVzL2pxdWVyeS9qcXVlcnktMS40LjIubWluLmpzXCI+PC9zY3JpcHQ+XG4gKiBcbiAqIEByZXF1aXJlcyA8YSBocmVmPSdodHRwOi8vanF1ZXJ5dWkuY29tL2Rvd25sb2FkJz5qUXVlcnkgVUkgMS44LjE2PC9hPlxuICogQGRlcGVuZGVuY3kgPHNjcmlwdCBsYW5ndWFnZT1cIkphdmFTY3JpcHRcIiB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwiLi4vYmlvanMvZGVwZW5kZW5jaWVzL2pxdWVyeS9qcXVlcnktdWktMS44LjIuY3VzdG9tLm1pbi5qc1wiPjwvc2NyaXB0PlxuICpcbiAqIEByZXF1aXJlcyA8YSBocmVmPSdCaW9qcy5Ub29sdGlwLmNzcyc+QmlvanMuVG9vbHRpcDwvYT5cbiAqIEBkZXBlbmRlbmN5IDxzY3JpcHQgbGFuZ3VhZ2U9XCJKYXZhU2NyaXB0XCIgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cInNyYy9CaW9qcy5Ub29sdGlwLmpzXCI+PC9zY3JpcHQ+XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEFuIG9iamVjdCB3aXRoIHRoZSBvcHRpb25zIGZvciBTZXF1ZW5jZSBjb21wb25lbnQuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gdGFyZ2V0IFxuICogICAgSWRlbnRpZmllciBvZiB0aGUgRElWIHRhZyB3aGVyZSB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gc2VxdWVuY2UgXG4gKiAgICBUaGUgc2VxdWVuY2UgdG8gYmUgZGlzcGxheWVkLlxuICogICAgXG4gKiBAb3B0aW9uIHtzdHJpbmd9IFtpZF0gXG4gKiAgICBTZXF1ZW5jZSBpZGVudGlmaWVyIGlmIGFwcGx5LlxuICogICAgXG4gKiBAb3B0aW9uIHtzdHJpbmd9IFtmb3JtYXQ9XCJGQVNUQVwiXSBcbiAqICAgIFRoZSBkaXNwbGF5IGZvcm1hdCBmb3IgdGhlIHNlcXVlbmNlIHJlcHJlc2VudGF0aW9uLlxuICogICAgXG4gKiBAb3B0aW9uIHtPYmplY3RbXX0gW2hpZ2hsaWdodHNdIFxuICogXHQgIEZvciBoaWdobGlnaHRpbmcgbXVsdGlwbGUgcmVnaW9ucy4gXG4gKiAgICA8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJTeW50YXg6XCI+IFxuICogICAgW1xuICogICAgXHQvLyBIaWdobGlnaHQgYW1pbm9hY2lkcyBmcm9tICdzdGFydCcgdG8gJ2VuZCcgb2YgdGhlIGN1cnJlbnQgc3RyYW5kIHVzaW5nIHRoZSBzcGVjaWZpZWQgJ2NvbG9yJyAob3B0aW9uYWwpIGFuZCAnYmFja2dyb3VuZCcgKG9wdGlvbmFsKS5cbiAqICAgIFx0eyBzdGFydDogJmx0O3N0YXJ0VmFsMSZndDssIGVuZDogJmx0O2VuZFZhbDEmZ3Q7IFssIGlkOiZsdDtpZFZhbDEmZ3Q7XSBbLCBjb2xvcjogJmx0O0hUTUxDb2xvciZndDtdIFssIGJhY2tncm91bmQ6ICZsdDtIVE1MQ29sb3ImZ3Q7XX0sIFxuICogICAgXHQvL1xuICogICAgXHQvLyBBbnkgb3RoZXJzIGhpZ2hsaWdodHNcbiAqICAgIFx0Li4uLCAgXG4gKiAgICBcdC8vIFxuICogICAgXHR7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDsgWywgaWQ6Jmx0O2lkVmFsTiZndDtdIFssIGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O10gWywgYmFja2dyb3VuZDogJmx0O0hUTUxDb2xvciZndDtdfVxuICogICAgXTwvcHJlPlxuICogXG4gKiA8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJFeGFtcGxlOlwiPiBcbiAqIGhpZ2hsaWdodHMgOiBbXG4gKiBcdFx0eyBzdGFydDozMCwgZW5kOjQyLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJncmVlblwiLCBpZDpcInNwaW4xXCIgfSxcbiAqXHRcdHsgc3RhcnQ6MTM5LCBlbmQ6MTQwIH0sIFxuICpcdFx0eyBzdGFydDo2MzEsIGVuZDo2MzMsIGNvbG9yOlwid2hpdGVcIiwgYmFja2dyb3VuZDpcImJsdWVcIiB9XG4gKlx0XVxuICogPC9wcmU+XG4gKiBcbiAqIEBvcHRpb24ge09iamVjdH0gW2NvbHVtbnM9e3NpemU6NDAsc3BhY2VkRWFjaDoxMH1dIFxuICogXHQgIE9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgdGhlIGNvbHVtbnMuIFN5bnRheDogeyBzaXplOiAmbHQ7bnVtQ29scyZndDssIHNwYWNlZEVhY2g6ICZsdDtudW1Db2xzJmd0O31cbiAqIFxuICogQG9wdGlvbiB7T2JqZWN0fSBbc2VsZWN0aW9uXSBcbiAqIFx0ICBQb3NpdGlvbnMgZm9yIHRoZSBjdXJyZW50IHNlbGVjdGVkIHJlZ2lvbi4gU3ludGF4OiB7IHN0YXJ0OiAmbHQ7c3RhcnRWYWx1ZSZndDssIGVuZDogJmx0O2VuZFZhbHVlJmd0O31cbiAqIFxuICogQG9wdGlvbiB7T2JqZWN0W119IFthbm5vdGF0aW9uc10gXG4gKiAgICBTZXQgb2Ygb3ZlcmxhcHBpbmcgYW5ub3RhdGlvbnMuIE11c3QgYmUgYW4gYXJyYXkgb2Ygb2JqZWN0cyBmb2xsb3dpbmcgdGhlIHN5bnRheDpcbiAqICAgICBcdFx0PHByZSBjbGFzcz1cImJydXNoOiBqc1wiIHRpdGxlPVwiU3ludGF4OlwiPlxuICogICAgICAgICAgICBbIFxuICogICAgICAgICAgICAgIC8vIEFuIGFubm90YXRpb246XG4gKiAgICAgICAgICAgICAgeyBuYW1lOiAmbHQ7bmFtZSZndDssIFxuICogICAgICAgICAgICAgICAgaHRtbDogJmx0O21lc3NhZ2UmZ3Q7LCBcbiAqICAgICAgICAgICAgICAgIGNvbG9yOiAmbHQ7Y29sb3JfY29kZSZndDssIFxuICogICAgICAgICAgICAgICAgcmVnaW9uczogW3sgc3RhcnQ6ICZsdDtzdGFydFZhbDEmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWwxJmd0OyBjb2xvcjogJmx0O0hUTUxDb2xvciZndDt9LCAuLi4seyBzdGFydDogJmx0O3N0YXJ0VmFsTiZndDssIGVuZDogJmx0O2VuZFZhbE4mZ3Q7LCBjb2xvcjogJmx0O0hUTUxDb2xvciZndDt9XSBcbiAqICAgICAgICAgICAgICB9LCBcbiAqICAgICAgICAgICAgICBcbiAqICAgICAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgICAgICAvLyBtb3JlIGFubm90YXRpb25zIGhlcmUgXG4gKiAgICAgICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICAgIF1cbiAqICAgIFx0XHQgPC9wcmU+XG4gKiAgICB3aGVyZTpcbiAqICAgICAgPHVsPlxuICogICAgICAgIDxsaT48Yj5uYW1lPC9iPiBpcyB0aGUgdW5pcXVlIG5hbWUgZm9yIHRoZSBhbm5vdGF0aW9uPC9saT5cbiAqICAgICAgICA8bGk+PGI+aHRtbDwvYj4gaXMgdGhlIG1lc3NhZ2UgKGNhbiBiZSBIVE1MKSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRvb2wgdGlwLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPmNvbG9yPC9iPiBpcyB0aGUgZGVmYXVsdCBIVE1MIGNvbG9yIGNvZGUgZm9yIGFsbCB0aGUgcmVnaW9ucy48L2xpPlxuICogICAgICAgIDxsaT48Yj5yZWdpb25zPC9iPiBhcnJheSBvZiBvYmplY3RzIGRlZmluaW5nIHRoZSBpbnRlcnZhbHMgd2hpY2ggYmVsb25ncyB0byB0aGUgYW5ub3RhdGlvbi48L2xpPlxuICogICAgICAgIDxsaT48Yj5yZWdpb25zW2ldLnN0YXJ0PC9iPiBpcyB0aGUgc3RhcnRpbmcgY2hhcmFjdGVyIGZvciB0aGUgaS10aCBpbnRlcnZhbC48L2xpPlxuICogICAgICAgIDxsaT48Yj5yZWdpb25zW2ldLmVuZDwvYj4gaXMgdGhlIGVuZGluZyBjaGFyYWN0ZXIgZm9yIHRoZSBpLXRoIGludGVydmFsLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnNbaV0uY29sb3I8L2I+IGlzIGFuIG9wdGlvbmFsIGNvbG9yIGZvciB0aGUgaS10aCBpbnRlcnZhbC4gICBcbiAqICAgICAgPC91bD4gXG4gKiAgICAgIFxuICogQG9wdGlvbiB7T2JqZWN0fSBbZm9ybWF0T3B0aW9ucz17dGl0bGU6dHJ1ZSwgZm9vdGVyOnRydWV9XSBcbiAqIFx0ICBPcHRpb25zIGZvciBkaXNwbGF5aW5nIHRoZSB0aXRsZS4gYnkgbm93IGp1c3QgYWZmZWN0aW5nIHRoZSBDT0RBVEEgZm9ybWF0LlxuICogICAgPHByZSBjbGFzcz1cImJydXNoOiBqc1wiIHRpdGxlPVwiU3ludGF4OlwiPiBcbiAqIFx0XHRmb3JtYXRPcHRpb25zIDoge1xuICogXHRcdFx0dGl0bGU6ZmFsc2UsXG4gKiBcdFx0XHRmb290ZXI6ZmFsc2VcbiAqIFx0XHR9XG4gKiAgICA8L3ByZT5cbiAqICAgIFxuICogQGV4YW1wbGUgXG4gKiB2YXIgdGhlU2VxdWVuY2UgPSBcIk1FVExDUVJMTlZDUURLSUxUSFlFTkRTVERMUkRISURZV0tITVJMRUNBSVlZS0FSRU1HRktISU5IUVZWUFRMQVZTS05LQUxRQUlFTFFMVExFVElZTlNRWVNORUtXVExRRFZTTEVWWUxUQVBUR0NJS0tIR1lUVkVWUUZER0RJQ05UTUhZVE5XVEhJWUlDRUVBb2pzIFNWVFZWRUdRVkRZWUdMWVlWSEVHSVJUWUZWUUZLRERBRUtZU0tOS1ZXRVZIQUdHUVZJTENQVFNWRlNTTkVWU1NQRUlJUlFITEFOSFBBQVRIVEtBVkFMR1RFRVRRVFRJUVJQUlNFUERUR05QQ0hUVEtMTEhSRFNWRFNBUElMVEFGTlNTSEtHUklOQ05TTlRUUElWSExLR0RBTlRMS0NMUllSRktLSENUTFlUQVZTU1RXSFdUR0hOVktIS1NBSVZUTFRZRFNFV1FSRFFGTFNRVktJUEtUSVRWU1RHRk1TSVwiO1xuICogdmFyIG15U2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uoe1xuICogXHRcdHNlcXVlbmNlIDogdGhlU2VxdWVuY2UsXG4gKiBcdFx0dGFyZ2V0IDogXCJZb3VyT3duRGl2SWRcIixcbiAqIFx0XHRmb3JtYXQgOiAnQ09EQVRBJyxcbiAqIFx0XHRpZCA6ICdQOTE4MjgzJyxcbiAqIFx0XHRhbm5vdGF0aW9uczogW1xuICogICAgICAgIHsgbmFtZTpcIkNBVEhcIiwgXG4gKiBcdCAgXHRcdGNvbG9yOlwiI0YwRjAyMFwiLCBcbiAqIFx0ICBcdFx0aHRtbDogXCJVc2luZyBjb2xvciBjb2RlICNGMEYwMjAgXCIsIFxuICogXHQgIFx0XHRyZWdpb25zOiBbe3N0YXJ0OiAxMjIsIGVuZDogMTM1fV1cbiAqIFx0XHQgIH0sXG4gKiAgICAgICAgeyBuYW1lOlwiVEVTVFwiLCBcbiAqICAgICAgICAgIGh0bWw6XCImbHQ7YnImZ3Q7IEV4YW1wbGUgb2YgJmx0O2ImZ3Q7SFRNTCZsdDsvYiZndDtcIiwgXG4gKiAgICAgICAgICBjb2xvcjpcImdyZWVuXCIsIFxuICogICAgICAgICAgcmVnaW9uczogW1xuICogICAgICAgICAgICB7c3RhcnQ6IDI4NSwgZW5kOiAyOTJ9LFxuICogICAgICAgICAgICB7c3RhcnQ6IDI5MywgZW5kOiAzMTQsIGNvbG9yOiBcIiMyRTQ5ODhcIn1dXG4gKiAgICAgICAgfVxuICogICAgICBdLFxuICogICAgICBoaWdobGlnaHRzIDogW1xuICogICAgICBcdHsgc3RhcnQ6MzAsIGVuZDo0MiwgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiZ3JlZW5cIiwgaWQ6XCJzcGluMVwiIH0sXG4gKiAgICAgIFx0eyBzdGFydDoxMzksIGVuZDoxNDAgfSwgXG4gKiAgICAgIFx0eyBzdGFydDo2MzEsIGVuZDo2MzMsIGNvbG9yOlwid2hpdGVcIiwgYmFja2dyb3VuZDpcImJsdWVcIiB9XG4gKiAgICAgIF1cbiAqIH0pO1x0XG4gKiBcbiAqL1xuXG52YXIgcmVuZGVyZXJzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKTtcbnZhciBNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwnKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdiaW9qcy1ldmVudHMnKTtcbnZhciBhcHBseVN0eWxlID0gcmVxdWlyZSgnLi9zdHlsZScpO1xuXG4vLyBFdmVudCBuYW1lcy5cbnZhciBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQgPSBcImNoYW5nZTpzZWxlY3Rpb25cIjtcbnZhciBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSA9IEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRDsgLy8gRGVwcmVjYXRlZCAtIHVzZSBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQuXG52YXIgRVZUX09OX0FOTk9UQVRJT05fQ0xJQ0tFRCA9IFwiY2xpY2s6YW5ub3RhdGlvblwiO1xuXG4vKiBBbHNvOiBzZXF1ZW5jZSwgaWQsIHdpZHRoLCBoZWlnaHQgKi9cbnZhciBERUZBVUxUUyA9IHtcbiAgZm9ybWF0IDogXCJGQVNUQVwiLFxuICBzZWxlY3Rpb246IHsgc3RhcnQ6IDAsIGVuZDogMCB9LFxuICBjb2xvdXJlZEJhc2VzOiBmYWxzZSxcbiAgbnVtQ29sczogMzUsXG4gIGhpZ2hsaWdodHMgOiBbXSxcbiAgYW5ub3RhdGlvbnM6IFtdLFxuICBzZXF1ZW5jZVVybDogJ2h0dHA6Ly93d3cuZWJpLmFjLnVrL2Rhcy1zcnYvdW5pcHJvdC9kYXMvdW5pcHJvdC9zZXF1ZW5jZScsXG4gIGZvcm1hdFNlbGVjdG9yVmlzaWJsZTogdHJ1ZSxcbiAgbG9hZFN0eWxlOiB0cnVlLCAvLyBMb2FkIGRlZmF1bHQgc3R5bGVzIG9udG8gdGhlIHBhZ2UuXG4gIHNob3dBbm5vdGF0aW9uczogdHJ1ZSxcblxuICAvLyBTdHJpbmdzXG4gIGxhYmVsRm9ybWF0OiAnRm9ybWF0JyxcbiAgbGFiZWxOdW1Db2xzOiAnQ29sdW1ucycsXG4gIGxhYmVsQ29sb3VyZWRCYXNlczogJ0NvbG91ciBCYXNlcycsXG5cbiAgd2FybmluZ1RpdGxlOiAnV2FybmluZycsXG4gIHdhcm5pbmdJY29uOiAnZ2x5cGhpY29uIGdseXBoaWNvbi13YXJuaW5nLXNpZ24nLFxuXG4gIC8vIENTUyBjbGFzc2VzIC0gY2FuIGJlIG92ZXJyaWRlbi5cbiAgY29udHJvbHNDbGFzczogJ2Zvcm0taW5saW5lJyxcbiAgY29udHJvbENsYXNzOiAnZm9ybS1ncm91cCcsXG4gIGlucHV0Q2xhc3M6ICdmb3JtLWNvbnRyb2wnLFxuICBsYWJlbENsYXNzOiAnZm9ybS1sYWJlbCdcbn07XG5cbi8qKiBAbGVuZHMgU2VxdWVuY2UgKiovXG5TZXF1ZW5jZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHRoaXMuX2NvbnRhaW5lciA9IGpRdWVyeShvcHRpb25zLnRhcmdldCk7XG4gIGlmICh0aGlzLl9jb250YWluZXIubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0galF1ZXJ5KCcjJyArIG9wdGlvbnMudGFyZ2V0KTtcbiAgfVxuICB0aGlzLm9wdGlvbnMgPSBuZXcgTW9kZWwob3B0aW9ucywgREVGQVVMVFMpO1xuXG4gIHRoaXMuX2luaXRpYWxpemUoKTtcbn07XG5cbi8vIENsYXNzIG1lbWJlciBhY2Nlc3MgZm9yIG90aGVycyB0byB1c2UuXG5TZXF1ZW5jZS5FVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQgPSBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQ7XG5TZXF1ZW5jZS5FVlRfT05fQU5OT1RBVElPTl9DTElDS0VEID0gRVZUX09OX0FOTk9UQVRJT05fQ0xJQ0tFRDtcblxuLyoqIFByb3ZpZGVzIG9uLCBvZmYsIG9uY2UsIHRyaWdnZXIgKiovXG5FdmVudHMubWl4aW4oU2VxdWVuY2UucHJvdG90eXBlKTtcblxuLyoqXG4gICogQXJyYXkgY29udGFpbmluZyB0aGUgc3VwcG9ydGVkIGV2ZW50IG5hbWVzXG4gICogQG5hbWUgU2VxdWVuY2UtZXZlbnRUeXBlc1xuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmV2ZW50VHlwZXMgPSBbXG5cbiAgLyoqXG4gICAgKiBAbmFtZSBTZXF1ZW5jZSNjaGFuZ2U6c2VsZWN0aW9uXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIgQW4gZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgYW4ge0BsaW5rIEJpb2pzLkV2ZW50fSBvYmplY3QgYXMgYXJndW1lbnQuXG4gICAgKiBAZXZlbnREYXRhIHtpbnR9IHN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24gKDEtYmFzZWQgaW5kZXgpLlxuICAgICogQGV2ZW50RGF0YSB7aW50fSBlbmQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgZW5kIG9mIHNlbGVjdGlvbiAoMS1iYXNlZCBpbmRleCkuXG4gICAgKlxuICAgICogQSBzZWxlY3Rpb24gb2YgMS0xMCBpbmRpY2F0ZXMgdGhhdCBhbGwgYmFzZXMgd2l0aCBhIDEtYmFzZWQgaW5kZXggPj0gMSBhbmQgPD0gMTAgYXJlIHNlbGVjdGVkLFxuICAgICogaS5lLiB0aGUgZmlyc3QgMTAgYmFzZXMuXG4gICAgKlxuICAgICogQGV4YW1wbGUgXG4gICAgKiBteVNlcXVlbmNlLm9uKFNlcXVlbmNlLkVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCwgZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgKiAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQ6IFwiICsgc2VsZWN0aW9uLnN0YXJ0ICsgXCIgLSBcIiArIHNlbGVjdGlvbi5lbmQgKTtcbiAgICAqIH0pOyBcbiAgICAqIFxuICAgICogKi9cbiAgRVZUX09OX1NFTEVDVElPTl9DSEFOR0VELFxuICBcbiAgLyoqXG4gICAgKiBAbmFtZSBTZXF1ZW5jZSNjaGFuZ2U6c2VsZWN0aW9uXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIgQW4gZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgYW4ge0BsaW5rIEJpb2pzLkV2ZW50fSBvYmplY3QgYXMgYXJndW1lbnQuXG4gICAgKiBAZXZlbnREYXRhIHtpbnR9IHN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24gKDEtYmFzZWQgaW5kZXgpLlxuICAgICogQGV2ZW50RGF0YSB7aW50fSBlbmQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgZW5kIG9mIHNlbGVjdGlvbiAoMS1iYXNlZCBpbmRleCkuXG4gICAgKlxuICAgICogQSBzZWxlY3Rpb24gb2YgMS0xMCBpbmRpY2F0ZXMgdGhhdCBhbGwgYmFzZXMgd2l0aCBhIDEtYmFzZWQgaW5kZXggPj0gMSBhbmQgPD0gMTAgYXJlIHNlbGVjdGVkLFxuICAgICogaS5lLiB0aGUgZmlyc3QgMTAgYmFzZXMuXG4gICAgKlxuICAgICogQGV4YW1wbGUgXG4gICAgKiBteVNlcXVlbmNlLm9uKFNlcXVlbmNlLkVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCwgZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgKiAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQ6IFwiICsgc2VsZWN0aW9uLnN0YXJ0ICsgXCIgLSBcIiArIHNlbGVjdGlvbi5lbmQgKTtcbiAgICAqIH0pOyBcbiAgICAqIFxuICAgICogKi9cbiAgRVZUX09OX1NFTEVDVElPTl9DSEFOR0UsXG5cdFx0XG4gIC8qKlxuICAgICogQG5hbWUgU2VxdWVuY2UjY2xpY2s6YW5ub3RhdGlvblxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyIEFuIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGFuIHtAbGluayBCaW9qcy5FdmVudH0gb2JqZWN0IGFzIGFyZ3VtZW50LlxuICAgICogQGV2ZW50RGF0YSB7T2JqZWN0fSBzb3VyY2UgVGhlIGNvbXBvbmVudCB3aGljaCBkaWQgdHJpZ2dlcmVkIHRoZSBldmVudC5cbiAgICAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gICAgKiBAZXZlbnREYXRhIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlbGVjdGVkIGFubm90YXRpb24uXG4gICAgKiBAZXZlbnREYXRhIHtpbnR9IHBvcyBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgc2VsZWN0ZWQgYW1pbm8gYWNpZC5cbiAgICAqIEBleGFtcGxlIFxuICAgICogbXlTZXF1ZW5jZS5vbkFubm90YXRpb25DbGlja2VkKFxuICAgICogICAgZnVuY3Rpb24oIG9iakV2ZW50ICkge1xuICAgICogICAgICAgYWxlcnQoXCJDbGlja2VkIFwiICsgb2JqRXZlbnQubmFtZSArIFwiIG9uIHBvc2l0aW9uIFwiICsgb2JqRXZlbnQucG9zICk7XG4gICAgKiAgICB9XG4gICAgKiApOyAgXG4gICAgKiBcbiAgICAqICovXG4gIEVWVF9PTl9BTk5PVEFUSU9OX0NMSUNLRURcbl07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5nZXRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMub3B0LmlkO1xufTtcblxudmFyIFRPT0xUSVBfU1RZTEUgPSB7XG4gICdwb3NpdGlvbic6IFwiYWJzb2x1dGVcIixcbiAgJ3otaW5kZXgnOiBcIjk5OTk5OVwiLFxuICAnY29sb3InOiBcIiNmZmZcIixcbiAgJ2ZvbnQtc2l6ZSc6IFwiMTJweFwiLFxuICAnd2lkdGgnOiBcImF1dG9cIixcbiAgJ2Rpc3BsYXknOiAnbm9uZSdcbn07XG5cblx0Ly8gTWV0aG9kc1xuU2VxdWVuY2UucHJvdG90eXBlLl9pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLl9hcHBlbmRTdHlsZSgpO1xuXHRcdFxuICBbJ3dpZHRoJywnaGVpZ2h0J10uZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgIHZhciB2YWwgPSBzZWxmLm9wdGlvbnMuZ2V0KHByb3ApO1xuICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICBzZWxmLl9jb250YWluZXJbcHJvcF0odmFsKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgLy8gRGlzYWJsZSB0ZXh0IHNlbGVjdGlvblxuICB0aGlzLl9jb250YWluZXIudG9nZ2xlQ2xhc3MoJ25vLXVzZXItc2VsZWN0aW9uJywgIXRoaXMub3B0aW9ucy5nZXQoJ2FsbG93U2VsZWN0aW9uJykpO1xuXG4gIC8vIERJViBmb3IgdGhlIGZvcm1hdCBzZWxlY3RvclxuICB0aGlzLl9idWlsZEZvcm1hdFNlbGVjdG9yKCk7XG5cdFx0XG4gIC8vIERJViBmb3IgdGhlIHNlcXVlbmNlXG4gIHRoaXMuX2NvbnRlbnREaXYgPSBqUXVlcnkoJzxkaXY+JykuYWRkQ2xhc3MoJ3NlcXVlbmNlLWNvbnRlbnQnKS5hcHBlbmRUbyh0aGlzLl9jb250YWluZXIpO1xuXHRcdFxuICAvL0luaXRpYWxpemUgdG9vbHRpcFxuICB0aGlzLl90b29sdGlwID0galF1ZXJ5KCc8ZGl2PicpXG4gICAgICAgIC5jc3MoVE9PTFRJUF9TVFlMRSlcbiAgICAgICAgLmFkZENsYXNzKFwidG9vbHRpcFwiKVxuICAgICAgICAuYXBwZW5kVG8oXCJib2R5XCIpXG4gICAgICAgIC5oaWRlKCk7XG5cbiAgLy8gVGhlc2UgbmV2ZXIgY2hhbmdlIC0gc2F2ZSByZWZlcmVuY2VzLlxuICB0aGlzLl9iYXNlTW91c2VkT3ZlciA9IHRoaXMuX3JlY29yZEVudHJ5LmJpbmQodGhpcyk7XG4gIHRoaXMuX2luaXRUb29sVGlwID0gdGhpcy5fYWRkVG9vbFRpcC5iaW5kKHRoaXMpO1xuICB0aGlzLl9yZWdpc3RlclNlbGVjdGlvbkhhbmRsZXIgPSB0aGlzLm9wdGlvbnMub24uYmluZCh0aGlzLm9wdGlvbnMsICdjaGFuZ2U6c2VsZWN0aW9uJyk7XG5cbiAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gIHRoaXMuX3J1bigpO1xufTtcblxuU2VxdWVuY2UucHJvdG90eXBlLl9ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuaGFzKCdzZXF1ZW5jZScpKSB7XG4gICAgdGhpcy5vcHRpb25zLnRyaWdnZXIoJ2NoYW5nZTpmb3JtYXQnKTsgLy8gQmVnaW4gdGhlIHJlbmRlciBjeWNsZS5cbiAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuaGFzKCdpZCcpKSB7XG4gICAgdGhpcy5fcmVxdWVzdFNlcXVlbmNlKHRoaXMuZ2V0SWQoKSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jbGVhclNlcXVlbmNlKFwiTm8gc2VxdWVuY2UgYXZhaWxhYmxlXCIpO1xuICB9XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuX2JpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHJlZHJhdyA9IGZ1bmN0aW9uICgpIHsgc2VsZi5fcmVkcmF3KCk7IH07XG4gIHZhciBzZXRSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9wdGlvbnMuc2V0KHtyZW5kZXJlcjogX2J1aWxkUmVuZGVyZXIuY2FsbChzZWxmKX0pO1xuICB9O1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmZvcm1hdCcsIHNldFJlbmRlcmVyKTtcbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6Y29sb3VyZWRCYXNlcycsIHNldFJlbmRlcmVyKTtcbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6bnVtQ29scycsIHNldFJlbmRlcmVyKTtcblxuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpzZXF1ZW5jZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9wdGlvbnMuc2V0KHtoaWdobGlnaHRzOiBbXSwgYW5ub3RhdGlvbnM6IFtdfSwge3NpbGVudDogdHJ1ZX0pO1xuICAgIHNlbGYuc2V0U2VsZWN0aW9uKDAsIDApO1xuICB9KTtcbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6aGlnaGxpZ2h0cycsIHJlZHJhdyk7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmFubm90YXRpb25zJywgcmVkcmF3KTtcbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6c2hvd0Fubm90YXRpb25zJywgcmVkcmF3KTtcbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6aWQnLCByZWRyYXcpO1xuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpyZW5kZXJlcicsIHJlZHJhdyk7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOnNlcXVlbmNlJywgcmVkcmF3KTtcblxuICAvLyBQcm9wYWdhdGUgdGhpcyBldmVudCB0byB0aGlzIG9iamVjdC5cbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6c2VsZWN0aW9uJywgZnVuY3Rpb24gKHNlbCkge1xuICAgIHNlbGYudHJpZ2dlcihFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQsIHNlbCk7XG4gIH0pO1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmFsbG93U2VsZWN0aW9uJywgZnVuY3Rpb24gKGFsbG93ZWQpIHtcbiAgICBzZWxmLl9jb250YWluZXIudG9nZ2xlQ2xhc3MoJ25vLXVzZXItc2VsZWN0aW9uJywgIWFsbG93ZWQpO1xuICB9KTtcblxuICAvLyBJbml0aWFsaXNlIHNlbGVjdGlvbiBldmVudHMuXG4gIHRoaXMuX2NvbnRlbnREaXYub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBzZWxmLnN0YXJ0U2VsZWN0aW5nKCk7XG4gIH0pO1xuICB0aGlzLl9jb250ZW50RGl2Lm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIHNlbGYuc3RvcFNlbGVjdGluZygpO1xuICB9KTtcbiAgdGhpcy5fY29udGVudERpdi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBzZWxmLnN0b3BTZWxlY3RpbmcoKTtcbiAgfSk7XG59O1xuXG52YXIgSUNPTl9XQVJOID0gXCIuLi9iaW9qcy9jc3MvaW1hZ2VzL3dhcm5pbmdfaWNvbi5wbmdcIjtcblx0XG5TZXF1ZW5jZS5wcm90b3R5cGUuX3JlcXVlc3RTZXF1ZW5jZSA9IGZ1bmN0aW9uICggYWNjZXNzaW9uICkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgalF1ZXJ5LmFqYXgoeyBcbiAgICB1cmw6IHRoaXMub3B0aW9ucy5nZXQoJ3NlcXVlbmNlVXJsJyksXG4gICAgZGF0YVR5cGU6IFwieG1sXCIsXG4gICAgZGF0YTogeyBzZWdtZW50OiBhY2Nlc3Npb24gfSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoeG0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBub2RlID0galF1ZXJ5KHhtbCkuZmluZCgnU0VRVUVOQ0U6Zmlyc3QnKTtcbiAgICAgICAgc2VsZi5zZXRTZXF1ZW5jZSggbm9kZS50ZXh0KCksIG5vZGUuYXR0cihcImlkXCIpLCBub2RlLmF0dHIoXCJsYWJlbFwiKSApO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGRlY29kaW5nIHJlc3BvbnNlIGRhdGE6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgc2VsZi5jbGVhclNlcXVlbmNlKFwiTm8gc2VxdWVuY2UgYXZhaWxhYmxlXCIsIElDT05fV0FSTik7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkZWNvZGluZyByZXNwb25zZSBkYXRhOiBcIiArIHRleHRTdGF0dXMpO1xuICAgICAgc2VsZi5jbGVhclNlcXVlbmNlKFwiRXJyb3IgcmVxdWVzdGluZyB0aGUgc2VxdWVuY2UgdG8gdGhlIHNlcnZlciBcIiArIHRoaXMudXJsICwgSUNPTl9XQVJOKTtcbiAgICB9XG4gIH0pO1xufTtcblx0XG4vKipcbiAgKiBTaG93cyB0aGUgY29sdW1ucyBpbmRpY2F0ZWQgYnkgdGhlIGluZGV4ZXMgYXJyYXkuXG4gICogQHBhcmFtIHtzdHJpbmd9IHNlcSBUaGUgc2VxdWVuY2Ugc3RyYW5kLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRlbnRpZmllcl0gU2VxdWVuY2UgaWRlbnRpZmllci5cbiAgKiBcbiAgKiBAZXhhbXBsZSBcbiAgKiBteVNlcXVlbmNlLnNldFNlcXVlbmNlKFwiUDk5OTk5XCIpO1xuICAqIFxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnNldFNlcXVlbmNlID0gZnVuY3Rpb24gKCBzZXEsIGlkZW50aWZpZXIgKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdGhpcy5fcmVxdWVzdFNlcXVlbmNlKCBhcmd1bWVudHNbMF0gKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm9wdGlvbnMuc2V0KHtzZXF1ZW5jZTogc2VxLCBpZDogaWRlbnRpZmllcn0pO1xuICB9XG59O1xuICAgIFxuZnVuY3Rpb24gcmVuZGVyQXBvbG9neSAobWVzc2FnZVRleHQsIHRpdGxlLCBpY29uKSB7XG5cbiAgdmFyIG1lc3NhZ2UgPSBqUXVlcnkoJzxkaXY+JylcbiAgICAuYXBwZW5kKCc8c3Ryb25nPicgKyB0aXRsZSArICc8L3N0cm9uZz4nKVxuICAgIC5hcHBlbmQoJyAnKVxuICAgIC5hcHBlbmQobWVzc2FnZVRleHQpXG4gICAgLmFkZENsYXNzKFwiYWxlcnQgYWxlcnQtd2FybmluZyBtZXNzYWdlXCIpO1xuXG4gIGlmIChpY29uKSB7XG4gICAgaWYgKHR5cGVvZiBpY29uID09PSAnc3RyaW5nJykge1xuICAgICAgbWVzc2FnZS5wcmVwZW5kKCc8aSBjbGFzcz1cIicgKyBpY29uICsgJ1wiPjwvaT4gJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UuY3NzKGljb24pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZXNzYWdlO1xufVxuXHRcbi8qKlxuICogU2hvd3MgdGhlIGNvbHVtbnMgaW5kaWNhdGVkIGJ5IHRoZSBpbmRleGVzIGFycmF5LlxuICogQHBhcmFtIHtzdHJpbmd9IFttZXNzYWdlVGV4dF0gTWVzc2FnZSB0byBiZSBzaG93bi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbaWNvbl0gSWNvbiB0byBiZSBzaG93ZWQgYSBzaWRlIG9mIHRoZSBtZXNzYWdlXG4gKiBcbiAqIEBleGFtcGxlIFxuICogbXlTZXF1ZW5jZS5jbGVhclNlcXVlbmNlKFwiTm8gc2VxdWVuY2UgYXZhaWxhYmxlXCIsIFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCIpO1xuICogXG4gKi9cblNlcXVlbmNlLnByb3RvdHlwZS5jbGVhclNlcXVlbmNlID0gZnVuY3Rpb24gKG1lc3NhZ2VUZXh0KSB7XG5cbiAgdGhpcy5zZXRTZXF1ZW5jZShudWxsLCBudWxsKTtcblxuICBpZiAoIW1lc3NhZ2VUZXh0KSByZXR1cm4gdGhpcy5fY29udGVudERpdi5lbXB0eSgpO1xuXG4gIHZhciBhcG9sb2d5ID0gcmVuZGVyQXBvbG9neShtZXNzYWdlVGV4dCwgdGhpcy5vcHRpb25zLmdldCgnd2FybmluZ1RpdGxlJyksIHRoaXMub3B0aW9ucy5nZXQoJ3dhcm5pbmdJY29uJykpO1xuICByZXR1cm4gdGhpcy5fY29udGVudERpdi5odG1sKGFwb2xvZ3kpO1xufTtcblx0XG4vKipcbiAgKiBTZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGluIHRoZSBzZXF1ZW5jZSBjYXVzaW5nIHRoZSBldmVudCB7QGxpbmsgU2VxdWVuY2Ujb25TZWxlY3Rpb25DaGFuZ2VkfVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvLyBzZXQgc2VsZWN0aW9uIGZyb20gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAgXG4gICogbXlTZXF1ZW5jZS5zZXRTZWxlY3Rpb24oMTAwLCAxNTApO1xuICAqIFxuICAqIEBwYXJhbSB7aW50fSBzdGFydCBUaGUgc3RhcnRpbmcgY2hhcmFjdGVyIG9mIHRoZSBzZWxlY3Rpb24uXG4gICogQHBhcmFtIHtpbnR9IGVuZCBUaGUgZW5kaW5nIGNoYXJhY3RlciBvZiB0aGUgc2VsZWN0aW9uXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuc2V0U2VsZWN0aW9uID0gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAvLyBBbGxvdyBpbnZlcnNpb24uXG4gIGlmIChzdGFydCA+IGVuZCkge1xuICAgIHZhciB0ZW1wID0gZW5kO1xuICAgIGVuZCA9IHN0YXJ0O1xuICAgIHN0YXJ0ID0gdGVtcDtcbiAgfVxuICB0aGlzLm9wdGlvbnMuc2V0KHtzZWxlY3Rpb246IHtzdGFydDogc3RhcnQsIGVuZDogZW5kfX0pO1xufTtcblxuLyoqXG4gKiBDbGVhciB0aGUgY3VycmVudCBzZWxlY3Rpb24uXG4gKi9cblNlcXVlbmNlLnByb3RvdHlwZS5jbGVhclNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vcHRpb25zLnNldCh7c2VsZWN0aW9uOiB7c3RhcnQ6IG51bGwsIGVuZDogbnVsbH19KTtcbn07XG5cbi8vIEJhc2UgcGFsZXR0ZTogaHR0cDovL3BhbGV0dG9uLmNvbS8jdWlkPTcwcDBLMGtpQ0ZuOEdWZGU3TlZtdHdTcVh0Z1xudmFyIFJVTEVTID0gW1xuICAnLmFubm90YXRpb24tZGVmYXVsdCB7YmFja2dyb3VuZDogI2NjYzt9JyxcbiAgJy5zZXEtYmFzZS5hZGVuaW5lIHtiYWNrZ3JvdW5kOiAjNjU2Y2NhOyBjb2xvcjogd2hpdGU7fScsXG4gICcuc2VxLWJhc2UuY3l0b3NpbmUge2JhY2tncm91bmQ6ICNmZmQ3NmI7IGNvbG9yOiAjOEE2RjI1O30nLFxuICAnLnNlcS1iYXNlLmd1YW5pbmUge2JhY2tncm91bmQ6ICM1MGMwYWQ7IGNvbG9yOiB3aGl0ZTt9JyxcbiAgJy5zZXEtYmFzZS50aHltaW5lIHtiYWNrZ3JvdW5kOiAjZmZhNzZiOyBjb2xvcjogI0E3NkM0NTt9JyxcbiAgJy5zZXEtYmFzZS5pbmZvLCAuaW50ZXJiYXNlLmluZm8ge2JhY2tncm91bmQ6ICM0MDkwZjc7IGNvbG9yOiB3aGl0ZTt9JyxcbiAgJy5zZXF1ZW5jZS1jb250ZW50IHtmb250LWZhbWlseTogXCJBbmRhbGUgbW9ub1wiLCBjb3VyaWVyLCBtb25vc3BhY2U7IGZvbnQtc2l6ZTogMTJweDsgdGV4dC1hbGlnbjogbGVmdDt9JyxcbiAgJy5zZXF1ZW5jZS1jb250cm9scyB7Zm9udC1mYW1pbHk6IFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIFwic2FucyBzZXJpZlwiOyBmb250LXNpemU6IDE0cHh9JyxcbiAgJy5uby11c2VyLXNlbGVjdGlvbiB7LW1vei11c2VyLXNlbGVjdDogbm9uZTsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7fScsXG4gICcuc2VxLWJhc2Uuc2VsZWN0aW9uLCAuaW50ZXJiYXNlLnNlbGVjdGlvbiB7YmFja2dyb3VuZDogeWVsbG93OyBjb2xvcjogYmxhY2s7fScsXG5dO1xuXG4vKipcbiAqIEFwcGx5IHRoZSBzdHlsZSB0byB0aGUgZG9jdW1lbnQuXG4gKi9cblNlcXVlbmNlLnByb3RvdHlwZS5fYXBwZW5kU3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjc3MsIGhlYWQsIHN0eWxlc2hlZXQ7XG4gIGlmICghdGhpcy5vcHRpb25zLmdldCgnbG9hZFN0eWxlJykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY3NzID0gUlVMRVMuam9pbignXFxuJyk7XG4gIGFwcGx5U3R5bGUoY3NzLCBkb2N1bWVudCk7XG59O1xuXG4vKipcbiAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IGRpc3BsYXlpbmcgZm9ybWF0IG9mIHRoZSBzZXF1ZW5jZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogLy8gU2V0IGZvcm1hdCB0byAnRkFTVEEnLlxuICAqIG15U2VxdWVuY2Uuc2V0Rm9ybWF0KCdGQVNUQScpO1xuICAqIFxuICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQgVGhlIGZvcm1hdCBmb3IgdGhlIHNlcXVlbmNlIHRvIGJlIGRpc3BsYXllZC5cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zZXRGb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQpIHtcbiAgaWYgKCFmb3JtYXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcmd1bWVudCBpcyByZXF1aXJlZDogZm9ybWF0XCIpO1xuICB9XG4gIHRoaXMub3B0aW9ucy5zZXQoe2Zvcm1hdDogU3RyaW5nKGZvcm1hdCkudG9VcHBlckNhc2UoKX0pOyBcbn07XG5cbmZ1bmN0aW9uIHJlbmRlckZvcm1hdFNlbGVjdG9yICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2VsZWN0b3IgPSBqUXVlcnkoJzxzZWxlY3Q+ICcrXG4gICAgICAnPG9wdGlvbiB2YWx1ZT1cIkZBU1RBXCI+RkFTVEE8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCJDT0RBVEFcIj5DT0RBVEE8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCJQUklERVwiPlBSSURFPC9vcHRpb24+JytcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiUkFXXCI+UkFXPC9vcHRpb24+PC9zZWxlY3Q+Jyk7XG5cbiAgc2VsZWN0b3IuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcbiAgICBzZWxmLnNldEZvcm1hdChqUXVlcnkodGhpcykudmFsKCkpO1xuICB9KTtcblxuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpmb3JtYXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZWN0b3IudmFsKHNlbGYub3B0aW9ucy5nZXQoJ2Zvcm1hdCcpKTtcdFxuICB9KTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcldpZHRoU2VsZWN0b3IgKCkge1xuICB2YXIgc2VsZiA9IHRoaXMsIHNlbGVjdG9yID0galF1ZXJ5KCc8c2VsZWN0PicgKyBcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiMTBcIj4xMDwvb3B0aW9uPicrXG4gICAgICAnPG9wdGlvbiB2YWx1ZT1cIjM1XCI+MzU8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCI3MFwiPjcwPC9vcHRpb24+JytcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiMTAwXCI+MTAwPC9vcHRpb24+PC9zZWxlY3Q+Jyk7XG5cbiAgc2VsZWN0b3IudmFsKFN0cmluZyh0aGlzLm9wdGlvbnMuZ2V0KCdudW1Db2xzJykpKTtcblxuICBzZWxlY3Rvci5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuICAgIHNlbGYub3B0aW9ucy5zZXQoe251bUNvbHM6IHBhcnNlSW50KGpRdWVyeSh0aGlzKS52YWwoKSwgMTApfSk7XG4gIH0pO1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOm51bUNvbHMnLCBmdW5jdGlvbiAobnVtKSB7XG4gICAgc2VsZWN0b3IudmFsKFN0cmluZyhudW0pKTtcdFxuICB9KTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG5cbn1cblxuZnVuY3Rpb24gcmVuZGVyQmFzZUNvbG91clRvZ2dsZSAoKSB7XG4gIHZhciBzZWxmID0gdGhpcywgdG9nZ2xlO1xuXG4gIHRvZ2dsZSA9IGpRdWVyeSgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicpO1xuXG4gIHRvZ2dsZS5wcm9wKCdjaGVja2VkJywgISF0aGlzLm9wdGlvbnMuZ2V0KCdjb2xvdXJlZEJhc2VzJykpO1xuXG4gIHRvZ2dsZS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9wdGlvbnMuc2V0KHtjb2xvdXJlZEJhc2VzOiB0b2dnbGUucHJvcCgnY2hlY2tlZCcpfSk7XG4gIH0pO1xuXG4gIHNlbGYub3B0aW9ucy5vbignY2hhbmdlOmNvbG91cmVkQmFzZXMnLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0b2dnbGUucHJvcCgnY2hlY2tlZCcsIHZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRvZ2dsZTtcbn1cblxuZnVuY3Rpb24gbWFrZUNvbnRyb2xHcm91cCAob3B0aW9ucywgbGFiZWxLZXksICRjb250cm9sKSB7XG4gIHZhciAkZ3JvdXAgPSBqUXVlcnkoJzxkaXY+JykuYWRkQ2xhc3Mob3B0aW9ucy5nZXQoJ2NvbnRyb2xDbGFzcycpKTtcbiAgdmFyICRsYWJlbCA9IGpRdWVyeSgnPGxhYmVsPicpLmFkZENsYXNzKG9wdGlvbnMuZ2V0KCdsYWJlbENsYXNzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KG9wdGlvbnMuZ2V0KGxhYmVsS2V5KSk7XG4gIG9wdGlvbnMub24oJ2NoYW5nZTonICsgbGFiZWxLZXksIGZ1bmN0aW9uIChuZXdMYWJlbCkge1xuICAgICRsYWJlbC50ZXh0KG5ld0xhYmVsKTtcbiAgfSk7XG4gICRjb250cm9sLmFkZENsYXNzKG9wdGlvbnMuZ2V0KCdpbnB1dENsYXNzJykpO1xuICBpZiAoJGNvbnRyb2wuaXMoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKSkge1xuICAgIHJldHVybiBqUXVlcnkoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicpLmFwcGVuZCgkbGFiZWwucHJlcGVuZCgkY29udHJvbCkpO1xuICB9IGVsc2Uge1xuICAgICRncm91cC5hcHBlbmQoJGxhYmVsKTtcbiAgICAkZ3JvdXAuYXBwZW5kKCRjb250cm9sKTtcbiAgfVxuICByZXR1cm4gJGdyb3VwO1xufVxuXHRcblNlcXVlbmNlLnByb3RvdHlwZS5fYnVpbGRGb3JtYXRTZWxlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzLCBvcHRpb25zID0gdGhpcy5vcHRpb25zLCBoZWFkZXI7XG4gIFxuICB0aGlzLl9oZWFkZXJEaXYgPSBoZWFkZXIgPSBqUXVlcnkoJzxmb3JtPicpXG4gICAgLmFkZENsYXNzKCdzZXF1ZW5jZS1jb250cm9scycpXG4gICAgLmFkZENsYXNzKHRoaXMub3B0aW9ucy5nZXQoJ2NvbnRyb2xzQ2xhc3MnKSlcbiAgICAuYXBwZW5kVG8odGhpcy5fY29udGFpbmVyKTtcblxuICBoZWFkZXIuYXBwZW5kKG1ha2VDb250cm9sR3JvdXAob3B0aW9ucywgJ2xhYmVsRm9ybWF0JyxcbiAgICB0aGlzLl9mb3JtYXRTZWxlY3RvciA9IHJlbmRlckZvcm1hdFNlbGVjdG9yLmNhbGwodGhpcykpKTtcblxuICBoZWFkZXIuYXBwZW5kKG1ha2VDb250cm9sR3JvdXAob3B0aW9ucywgJ2xhYmVsTnVtQ29scycsXG4gICAgdGhpcy5fY29sdW1uV2lkdGhTZWxlY3RvciA9IHJlbmRlcldpZHRoU2VsZWN0b3IuY2FsbCh0aGlzKSkpO1xuXG4gIGhlYWRlci5hcHBlbmQobWFrZUNvbnRyb2xHcm91cChvcHRpb25zLCAnbGFiZWxDb2xvdXJlZEJhc2VzJyxcbiAgICByZW5kZXJCYXNlQ29sb3VyVG9nZ2xlLmNhbGwodGhpcykpKTtcblxuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpmb3JtYXRTZWxlY3RvclZpc2libGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5faGVhZGVyRGl2LnRvZ2dsZShzZWxmLm9wdGlvbnMuZ2V0KCdmb3JtYXRTZWxlY3RvclZpc2libGUnKSk7XG4gIH0pO1xuICBzZWxmLl9oZWFkZXJEaXYudG9nZ2xlKHNlbGYub3B0aW9ucy5nZXQoJ2Zvcm1hdFNlbGVjdG9yVmlzaWJsZScpKTtcbn07XG5cdFxuLyoqXG4gICogSGlnaGxpZ2h0cyBhIHJlZ2lvbiB1c2luZyB0aGUgZm9udCBjb2xvciBkZWZpbmVkIGluIHtCaW9qcy5Qcm90ZWluM0QjaGlnaGxpZ2h0Rm9udENvbG9yfSBieSBkZWZhdWx0IGlzIHJlZC5cbiAgKlxuICAqIEBkZXByZWNhdGVkIHVzZSBhZGRIaWdobGlnaHQgaW5zdGVhZC5cbiAgKiBcbiAgKiBAcGFyYW0ge2ludH0gc3RhcnQgVGhlIHN0YXJ0aW5nIGNoYXJhY3RlciBvZiB0aGUgaGlnaGxpZ2h0aW5nLlxuICAqIEBwYXJhbSB7aW50fSBlbmQgVGhlIGVuZGluZyBjaGFyYWN0ZXIgb2YgdGhlIGhpZ2hsaWdodGluZy5cbiAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIFRoZSB0eXBlIG9mIGhpZ2hsaWdodCAtIG9uZSBvZiAnc2VsZWN0aW9uJywgJ2luZm8nLCAnd2FybmluZycsXG4gICogICAgICAgICAgICAgICAgICdlcnJvcicsIG9yIGFueSBjdXN0b20gdmFsdWUuIEFwcHJvcHJpYXRlIENTUyBjbGFzc2VzIHdpbGwgYmUgYWRkZWQuXG4gICogQHBhcmFtIHtzdHJpbmd9IFtpZF0gQ3VzdG9tIGlkZW50aWZpZXIuXG4gICogXG4gICogQHJldHVybiB7aW50fSByZXByZXNlbnRpbmcgdGhlIGlkIG9mIHRoZSBoaWdobGlnaHQgb24gdGhlIGludGVybmFsIGFycmF5LiBSZXR1cm5zIC0xIG9uIGZhaWx1cmUgIFxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmhpZ2hsaWdodCA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCB0eXBlLCBpZCApIHtcbiAgcmV0dXJuIHRoaXMuYWRkSGlnaGxpZ2h0KHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgZW5kOiBlbmQsXG4gICAga2luZDogdHlwZSxcbiAgICBpZDogaWRcbiAgfSk7XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuX2hpZ2hsaWdodHNDb3VudCA9IDA7XG5cdFxuLyoqXG4gICogSGlnaGxpZ2h0cyBhIHJlZ2lvbiB1c2luZyB0aGUgZm9udCBjb2xvciBkZWZpbmVkIGluIHtTZXF1ZW5jZSNoaWdobGlnaHRGb250Q29sb3J9IGJ5IGRlZmF1bHQgaXMgcmVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvLyBoaWdobGlnaHQgdGhlIGNoYXJhY3RlcnMgd2l0aGluIHRoZSBwb3NpdGlvbiAxMDAgdG8gMTUwLCBpbmNsdWRlZC5cbiAgKiBteVNlcXVlbmNlLmFkZEhpZ2hsaWdodCggeyBcInN0YXJ0XCI6IDEwMCwgXCJlbmRcIjogMTUwLCBcImNvbG9yXCI6IFwid2hpdGVcIiwgXCJiYWNrZ3JvdW5kXCI6IFwicmVkXCIsIFwiaWRcIjogXCJhYWFcIiB9ICk7XG4gICogXG4gICogQHBhcmFtIHtPYmplY3R9IGggVGhlIGhpZ2hsaWdodCBkZWZpbmVkIGFzIGZvbGxvd3M6XG4gICogXHRcbiAgKiBcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSAocG9zc2libHkgZ2VuZXJhdGVkKSBpZCBvZiB0aGUgYWRkZWQgaGlnaGxpZ2h0LiBudWxsIGlmIG5vdCBhZGRlZC5cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5hZGRIaWdobGlnaHQgPSBmdW5jdGlvbiAoIGggKSB7XG4gIHZhciBpZCwga2luZCwgaGlnaGxpZ2h0LCBoaWdobGlnaHRzID0gdGhpcy5vcHRpb25zLmdldCgnaGlnaGxpZ2h0cycpO1xuICBcbiAgaWYgKCAhaCB8fCBoLnN0YXJ0ID4gaC5lbmQgKSByZXR1cm4gbnVsbDtcbiAgICBcbiAga2luZCA9IChoLmtpbmQgfHwgJ2luZm8nKTtcbiAgaWQgPSAoIFwic3RyaW5nXCIgPT09IHR5cGVvZiBoLmlkICkgPyBoLmlkIDogU3RyaW5nKHRoaXMuX2hpZ2hsaWdodHNDb3VudCsrKTtcbiAgXG4gIGhpZ2hsaWdodCA9IHtcbiAgICBzdGFydDogaC5zdGFydCxcbiAgICBlbmQ6IGguZW5kLFxuICAgIGtpbmQ6IGtpbmQsXG4gICAgaWQ6IGlkXG4gIH07XG5cbiAgdGhpcy5vcHRpb25zLmNhbGxNZXRob2QoJ2hpZ2hsaWdodHMnLCAnY29uY2F0JywgW2hpZ2hsaWdodF0pO1xuICBcbiAgcmV0dXJuIGhpZ2hsaWdodC5pZDtcbn07XG5cbi8qKlxuICAqIENsZWFyIGEgaGlnaGxpZ2h0ZWQgcmVnaW9uIHVzaW5nLlxuICAqXG4gICogQGRlcHJlY2F0ZWQgdXNlIHJlbW92ZUhpZ2hsaWdodCBpbnN0ZWFkLlxuICAqIFxuICAqIEBwYXJhbSB7aW50fSBpZCBUaGUgaWQgb2YgdGhlIGhpZ2hsaWdodCBvbiB0aGUgaW50ZXJuYWwgYXJyYXkuIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgYnkgbWV0aG9kIGhpZ2hsaWdodC5cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS51bkhpZ2hsaWdodCA9IGZ1bmN0aW9uIChpZCkge1x0XG4gIHRoaXMucmVtb3ZlSGlnaGxpZ2h0KGlkKTtcbn07XG5cdFxuLyoqXG4gICogUmVtb3ZlIGEgaGlnaGxpZ2h0LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvLyBDbGVhciB0aGUgaGlnaGxpZ2h0ZWQgY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAsIGluY2x1ZGVkLlxuICAqIG15U2VxdWVuY2UucmVtb3ZlSGlnaGxpZ2h0KFwic3BpbjFcIik7XG4gICogXG4gICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgaGlnaGxpZ2h0IG9uIHRoZSBpbnRlcm5hbCBhcnJheS4gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBieSBtZXRob2QgaGlnaGxpZ2h0LlxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnJlbW92ZUhpZ2hsaWdodCA9IGZ1bmN0aW9uIChpZCkge1x0XG4gIHRoaXMub3B0aW9ucy5jYWxsTWV0aG9kKCdoaWdobGlnaHRzJywgJ2ZpbHRlcicsIGZ1bmN0aW9uIChobCkge1xuICAgIHJldHVybiBobC5pZCAhPT0gaWQ7XG4gIH0pO1xufTtcblx0XG4vKipcbiAgKiBDbGVhciB0aGUgaGlnaGxpZ2h0cyBvZiB3aG9sZSBzZXF1ZW5jZS5cbiAgKiBAZGVwcmVjYXRlZCB1c2UgcmVtb3ZlQWxsSGlnaGxpZ2h0cyBpbnN0ZWFkLlxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnVuSGlnaGxpZ2h0QWxsID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlbW92ZUFsbEhpZ2hsaWdodHMoKTtcbn07XG5cdFxuLyoqXG4gICogUmVtb3ZlIGFsbCB0aGUgaGlnaGxpZ2h0cyBvZiB3aG9sZSBzZXF1ZW5jZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbXlTZXF1ZW5jZS5yZW1vdmVBbGxIaWdobGlnaHRzKCk7XG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUucmVtb3ZlQWxsSGlnaGxpZ2h0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vcHRpb25zLnNldCh7aGlnaGxpZ2h0czogW119KTtcbn07XG5cdFxuXHQvKipcbiAgICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGRpc3BsYXllZCBzZXF1ZW5jZS5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gU2V0IHRoZSBudW1iZXIgb2YgY29sdW1ucyB0byA3MC5cbiAgICAqIG15U2VxdWVuY2Uuc2V0TnVtQ29scyg3MCk7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBudW1Db2xzIFRoZSBudW1iZXIgb2YgY29sdW1ucy5cbiAgICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnNldE51bUNvbHMgPSBmdW5jdGlvbihudW1Db2xzKSB7XG4gIHRoaXMub3B0aW9ucy5zZXQoe251bUNvbHM6IG51bUNvbHN9KTtcbn07XG5cdFxuLyoqXG4gICogR2V0IG9yIFNldCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZHJvcC1kb3duIGxpc3Qgb2YgZm9ybWF0cy5cbiAgKiBcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGUgdHJ1ZTogc2hvdzsgZmFsc2U6IGhpZGUuXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuZm9ybWF0U2VsZWN0b3JWaXNpYmxlID0gZnVuY3Rpb24gKHZpc2libGUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldCgnZm9ybWF0U2VsZWN0b3JWaXNpYmxlJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5vcHRpb25zLnNldCh7Zm9ybWF0U2VsZWN0b3JWaXNpYmxlOiB2aXNpYmxlfSk7XG4gIH1cbn07XG5cdFxuLyoqXG4gICogVGhpcyBpcyBzaW1pbGFyIHRvIGEge0Jpb2pzLlNlcXVlbmNlI2Zvcm1hdFNlbGVjdG9yVmlzaWJsZX0gd2l0aCB0aGUgJ3RydWUnIGFyZ3VtZW50LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvLyBTaG93cyB0aGUgZm9ybWF0IHNlbGVjdG9yLlxuICAqIG15U2VxdWVuY2Uuc2hvd0Zvcm1hdFNlbGVjdG9yKCk7XG4gICogXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuc2hvd0Zvcm1hdFNlbGVjdG9yID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZm9ybWF0U2VsZWN0b3JWaXNpYmxlKHRydWUpO1xufTtcblx0XG4vKipcbiAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gYSB7QmlvanMuUHJvdGVpbjNEI2Zvcm1hdFNlbGVjdG9yVmlzaWJsZX0gd2l0aCB0aGUgJ2ZhbHNlJyBhcmd1bWVudC5cbiAgKiBcbiAgKiBAZXhhbXBsZVxuICAqIC8vIEhpZGVzIHRoZSBmb3JtYXQgc2VsZWN0b3IuXG4gICogbXlTZXF1ZW5jZS5oaWRlRm9ybWF0U2VsZWN0b3IoKTtcbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5oaWRlRm9ybWF0U2VsZWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5mb3JtYXRTZWxlY3RvclZpc2libGUoZmFsc2UpO1xufTtcblx0XG4vKipcbiAgKiBIaWRlcyB0aGUgd2hvbGUgY29tcG9uZW50LlxuICAqIFxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2hlYWRlckRpdi5oaWRlKCk7XG4gIHRoaXMuX2NvbnRlbnREaXYuaGlkZSgpO1xufTtcblxuLyoqXG4gICogU2hvd3MgdGhlIHdob2xlIGNvbXBvbmVudC5cbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9oZWFkZXJEaXYuc2hvdygpO1xuICB0aGlzLl9jb250ZW50RGl2LnNob3coKTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5faXNTZWxlY3RpbmcgPSBmYWxzZTtcblNlcXVlbmNlLnByb3RvdHlwZS5fbGFzdEVudGVyZWQgPSAtMTtcblNlcXVlbmNlLnByb3RvdHlwZS5fc2VsZWN0aW9uU3RhcnQgPSAtMTtcblxuU2VxdWVuY2UucHJvdG90eXBlLnN0YXJ0U2VsZWN0aW5nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9pc1NlbGVjdGluZyA9IHRydWU7XG4gIHRoaXMuX3NlbGVjdGlvblN0YXJ0ID0gdGhpcy5fbGFzdEVudGVyZWQ7XG4gIHRoaXMuc2V0U2VsZWN0aW9uKHRoaXMuX2xhc3RFbnRlcmVkLCB0aGlzLl9sYXN0RW50ZXJlZCk7XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuc3RvcFNlbGVjdGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5faXNTZWxlY3RpbmcgPSBmYWxzZTtcbiAgdGhpcy5fbGFzdEVudGVyZWQgPSAtMTtcbiAgdGhpcy5fc2VsZWN0aW9uU3RhcnQgPSAtMTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5fcmVjb3JkRW50cnkgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgdGhpcy5fbGFzdEVudGVyZWQgPSBpbmRleDtcbiAgaWYgKHRoaXMuX2lzU2VsZWN0aW5nKSB7XG4gICAgdmFyIHNlbGVjdGlvbiA9IHRoaXMub3B0aW9ucy5nZXQoJ3NlbGVjdGlvbicpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9uKHRoaXMuX3NlbGVjdGlvblN0YXJ0LCBpbmRleCk7XG4gIH1cbn07XG5cdFxuLyogXG4gICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX3JlZHJhd1xuICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UuIFxuICAgICogUmV0dXJuczogIC1cbiAgICAqIElucHV0czogLVxuICAgICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuX3JlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMuZ2V0KCdyZW5kZXJlcicpO1xuICBpZiAoIXJlbmRlcmVyKSByZXR1cm47XG4gIHRoaXMuX2NvbnRlbnREaXYuaHRtbChyZW5kZXJlci5yZW5kZXIoXG4gICAgICAgIHRoaXMub3B0aW9ucy5nZXQoJ3NlcXVlbmNlJyksIHRoaXMub3B0aW9ucy5nZXQoJ2lkJyksXG4gICAgICAgIHRoaXMuZ2V0SGlnaGxpZ2h0cygpLCB0aGlzLl9nZXRBbm5vdGF0aW9ucygpKSk7XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuX2dldEFubm90YXRpb25zID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmdldCgnc2hvd0Fubm90YXRpb25zJykpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldCgnYW5ub3RhdGlvbnMnKS5zbGljZSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuLyoqXG4gKiBTaG93IHRoZSBhbm5vdGF0aW9ucy5cbiAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnNob3dBbm5vdGF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vcHRpb25zLnNldCh7c2hvd0Fubm90YXRpb25zOiB0cnVlfSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIFNob3cgdGhlIGFubm90YXRpb25zLlxuICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuaGlkZUFubm90YXRpb25zID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm9wdGlvbnMuc2V0KHtzaG93QW5ub3RhdGlvbnM6IGZhbHNlfSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIFRvZ2dsZSB0aGUgYW5ub3RhdGlvbnMuXG4gKi9cblNlcXVlbmNlLnByb3RvdHlwZS50b2dnbGVBbm5vdGF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vcHRpb25zLnVwZGF0ZSgnc2hvd0Fubm90YXRpb25zJywgZnVuY3Rpb24gKHNob3cpIHsgcmV0dXJuICFzaG93OyB9KTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogUHVycG9zZTogY29uc3RydWN0IHRoZSByZW5kZXJlciB0byB1c2UgZm9yIHRoZSBuZXh0IHJlZHJhdy5cbiAqXG4gKiBUaGUgcmVuZGVyZXIgZGVwZW5kcyBvbiB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gKiAgLSBudW1Db2xzXG4gKiAgLSBjb2xvdXJlZEJhc2VzXG4gKiAgLSBmb3JtYXRcbiAqXG4gKi9cbmZ1bmN0aW9uIF9idWlsZFJlbmRlcmVyICgpIHtcbiAgdmFyIFJlbmRlcmVyID0gcmVuZGVyZXJzW3RoaXMub3B0aW9ucy5nZXQoJ2Zvcm1hdCcpXTtcbiAgaWYgKCFSZW5kZXJlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkRvbid0IGtub3cgaG93IHRvIHJlbmRlciBcIiArIGZtdCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBSZW5kZXJlcih7XG4gICAgd2lkdGg6IHBhcnNlSW50KHRoaXMub3B0aW9ucy5nZXQoJ251bUNvbHMnKSwgMTApLFxuICAgIGFkZEJhc2VDbGFzczogISF0aGlzLm9wdGlvbnMuZ2V0KCdjb2xvdXJlZEJhc2VzJyksXG4gICAgaW5pdFRvb2xUaXA6IHRoaXMuX2luaXRUb29sVGlwLFxuICAgIG9uTW91c2VFbnRlcjogdGhpcy5fYmFzZU1vdXNlZE92ZXIsXG4gICAgb25DaGFuZ2VTZWxlY3Rpb246IHRoaXMuX3JlZ2lzdGVyU2VsZWN0aW9uSGFuZGxlclxuICB9KTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhIHNoYWxsb3cgY2xvbmUgb2YgdGhlIGhpZ2hsaWdodHMgdG8gcmVuZGVyLlxuICpcbiAqIFRoZSByZXR1cm5lZCB2YWx1ZSBpbmNsdWRlcyB0aGUgc2VsZWN0aW9uIGhpZ2hsaWdodC5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgaGlnaGxpZ2h0cy5cbiAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmdldEhpZ2hsaWdodHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoaWdobGlnaHRzID0gdGhpcy5vcHRpb25zLmdldCgnaGlnaGxpZ2h0cycpLnNsaWNlKCk7XG4gIHZhciBzZWxlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZ2V0KCdzZWxlY3Rpb24nKTtcbiAgaWYgKHNlbGVjdGlvbikge1xuICAgIGhpZ2hsaWdodHMucHVzaCh7XG4gICAgICBzdGFydDogc2VsZWN0aW9uLnN0YXJ0LFxuICAgICAgZW5kOiBzZWxlY3Rpb24uZW5kLFxuICAgICAga2luZDogJ3NlbGVjdGlvbicsXG4gICAgICBpZDogJ19fc2VsZWN0aW9uX18nXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGhpZ2hsaWdodHM7XG59O1xuXG4vKipcbiAgKiBBbm5vdGF0ZSBhIHNldCBvZiBpbnRlcnZhbHMgcHJvdmlkZWQgaW4gdGhlIGFyZ3VtZW50LlxuICAqIFxuICAqIEBleGFtcGxlXG4gICogLy8gQW5ub3RhdGlvbnMgdXNpbmcgcmVnaW9ucyB3aXRoIGRpZmZlcmVudCBjb2xvcnMuXG4gICogbXlTZXF1ZW5jZS5hZGRBbm5vdGF0aW9uKHtcbiogICAgbmFtZTpcIlVOSVBST1RcIiwgXG4qICAgIGh0bWw6XCImbHQ7YnImZ3Q7IEV4YW1wbGUgb2YgJmx0O2ImZ3Q7SFRNTCZsdDsvYiZndDtcIiwgXG4qICAgIGNsYXNzTmFtZTpcImdyZWVuXCIsIFxuKiAgICByZWdpb25zOiBbXG4qICAgICAgIHtzdGFydDogNTQwLCBlbmQ6IDU2MH0sXG4qICAgICAgIHtzdGFydDogNTYxLCBlbmQ6NTgwLCBjb2xvcjogXCIjRkZBMDEwXCJ9LCBcbiogICAgICAge3N0YXJ0OiA1ODEsIGVuZDo1OTAsIGNvbG9yOiBcInJlZFwifSwgXG4qICAgICAgIHtzdGFydDogNjkwLCBlbmQ6NzEwfV1cbiogfSk7XG4qIFxuKiBcbiogQHBhcmFtIHtPYmplY3R9IGFubm90YXRpb24gVGhlIGludGVydmFscyBiZWxvbmdpbmcgdG8gdGhlIHNhbWUgYW5ub3RhdGlvbi4gXG4gKiBTeW50YXg6IHsgbmFtZTogJmx0O3ZhbHVlJmd0OywgY2xhc3NOYW1lOiAmbHRzdHJpbmcmZ3Q7LCBodG1sOiAmbHQ7SFRNTFN0cmluZyZndDssIHJlZ2lvbnM6IFt7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDt9LCAuLi4sICB7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDt9XSB9XG4qL1xuU2VxdWVuY2UucHJvdG90eXBlLmFkZEFubm90YXRpb24gPSBmdW5jdGlvbiAoIGFubm90YXRpb24gKSB7XG4gIHRoaXMuYWRkQW5ub3RhdGlvbnMoW2Fubm90YXRpb25dKTtcbn07XG5cbi8qKlxuICogQW5ub3RhdGUgYSBzZXQgb2YgaW50ZXJ2YWxzIHByb3ZpZGVkIGluIHRoZSBhcmd1bWVudC5cbiAqIFxuICogQGRlcHJlY2F0ZWQgVXNlIGFkZEFubm90YXRpb24oKSBpbnN0ZWFkLlxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gYW5ub3RhdGlvbiBUaGUgaW50ZXJ2YWxzIGJlbG9uZ2luZyB0byB0aGUgc2FtZSBhbm5vdGF0aW9uLiBcbiAqIFN5bnRheDogeyBuYW1lOiAmbHQ7dmFsdWUmZ3Q7LCBjbGFzc05hbWU6ICZsdHN0cmluZyZndDssIGh0bWw6ICZsdDtIVE1MU3RyaW5nJmd0OywgcmVnaW9uczogW3sgc3RhcnQ6ICZsdDtzdGFydFZhbDEmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWwxJmd0O30sIC4uLiwgIHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0O31dIH1cbiAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnNldEFubm90YXRpb24gPSBTZXF1ZW5jZS5wcm90b3R5cGUuYWRkQW5ub3RhdGlvbjtcblxuLyoqXG4qIEFubm90YXRlIG11bHRpcGxlIHNldHMgb2YgaW50ZXJ2YWxzLlxuKiBcbiogQGV4YW1wbGVcbiogLy8gQW5ub3RhdGlvbnMgdXNpbmcgcmVnaW9ucyB3aXRoIGRpZmZlcmVudCBjb2xvcnMuXG4qIG15U2VxdWVuY2UuYWRkQW5ub3RhdGlvbihbe1xuKiAgICBuYW1lOlwiVU5JUFJPVFwiLCBcbiogICAgaHRtbDpcIiZsdDticiZndDsgRXhhbXBsZSBvZiAmbHQ7YiZndDtIVE1MJmx0Oy9iJmd0O1wiLCBcbiogICAgY2xhc3NOYW1lOlwiZ3JlZW5cIiwgXG4qICAgIHJlZ2lvbnM6IFtcbiogICAgICAge3N0YXJ0OiA1NDAsIGVuZDogNTYwfSxcbiogICAgICAge3N0YXJ0OiA1NjEsIGVuZDo1ODAsIGNvbG9yOiBcIiNGRkEwMTBcIn0sIFxuKiAgICAgICB7c3RhcnQ6IDU4MSwgZW5kOjU5MCwgY29sb3I6IFwicmVkXCJ9LCBcbiogICAgICAge3N0YXJ0OiA2OTAsIGVuZDo3MTB9XVxuKiB9XSk7XG4qIFxuKiBcbiogQHBhcmFtIHtPYmplY3R9IGFubm90YXRpb24gVGhlIGludGVydmFscyBiZWxvbmdpbmcgdG8gdGhlIHNhbWUgYW5ub3RhdGlvbi4gXG4gKiBTeW50YXg6IHsgbmFtZTogJmx0O3ZhbHVlJmd0OywgY2xhc3NOYW1lOiAmbHRzdHJpbmcmZ3Q7LCBodG1sOiAmbHQ7SFRNTFN0cmluZyZndDssIHJlZ2lvbnM6IFt7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDt9LCAuLi4sICB7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDt9XSB9XG4qL1xuU2VxdWVuY2UucHJvdG90eXBlLmFkZEFubm90YXRpb25zID0gZnVuY3Rpb24gKCBhbm5vdGF0aW9ucyApIHtcbiAgdGhpcy5vcHRpb25zLmNhbGxNZXRob2QoJ2Fubm90YXRpb25zJywgJ2NvbmNhdCcsIGFubm90YXRpb25zKTtcbn07XG5cbi8qKlxuICAqIFJlbW92ZXMgYW4gYW5ub3RhdGlvbiBieSBtZWFucyBvZiBpdHMgbmFtZS5cbiAgKiBcbiAgKiBAZXhhbXBsZSBcbiAgKiAvLyBSZW1vdmUgdGhlIFVOSVBST1QgYW5ub3RhdGlvbi5cbiAgKiBteVNlcXVlbmNlLnJlbW92ZUFubm90YXRpb24oJ1VOSVBST1QnKTsgXG4gICogXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGFubm90YXRpb24gdG8gYmUgcmVtb3ZlZC5cbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5yZW1vdmVBbm5vdGF0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdGhpcy5vcHRpb25zLmNhbGxNZXRob2QoJ2Fubm90YXRpb25zJywgJ2ZpbHRlcicsIGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGEubmFtZSAhPT0gbmFtZTtcbiAgfSk7XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUucmVtb3ZlQWxsQW5ub3RhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMub3B0aW9ucy5zZXQoe2Fubm90YXRpb25zOiBbXX0pO1xufTtcblxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2FkZFRvb2xUaXBcbiAgICAgKiBQdXJwb3NlOiAgQWRkIGEgdG9vbHRpcCBhcm91bmQgdGhlIHRhcmdldCBET00gZWxlbWVudCBwcm92aWRlZCBhcyBhcmd1bWVudFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAgIHRhcmdldCAtPiB7RWxlbWVudH0gRE9NIGVsZW1lbnQgd2ljaCBpcyB0aGUgdGFyZ2V0ZWQgZm9jdXMgZm9yIHRoZSB0b29sdGlwLlxuICAgICAqIFx0XHRcdCBnZXRNZXNzYWdlIC0+IHtGdW5jdGlvbn0gQSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdGlwLlxuICAgICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLl9hZGRUb29sVGlwID0gZnVuY3Rpb24gKHRhcmdldCwgZ2V0TWVzc2FnZSkge1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyICR0aXAgPSB0aGlzLl90b29sdGlwO1xuICB2YXIgJHRhcmdldCA9IGpRdWVyeSh0YXJnZXQpO1xuXG4gIHJldHVybiAkdGFyZ2V0Lm1vdXNlb3Zlcihvbk1vdXNlT3ZlcikubW91c2VvdXQob25Nb3VzZU91dCk7XG5cbiAgZnVuY3Rpb24gb25Nb3VzZU91dCAoZSkge1xuICAgICR0aXAuaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3VzZU92ZXIgKGUpIHtcblxuICAgIHZhciAkdGFyZ2V0ID0galF1ZXJ5KGUudGFyZ2V0KTtcbiAgICB2YXIgb2Zmc2V0ID0gJHRhcmdldC5vZmZzZXQoKTtcblxuICAgIGlmICghJHRpcC5pcygnOnZpc2libGUnKSkge1xuICAgICAgdmFyIGNzcyA9IHtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBcIiMwMDBcIixcbiAgICAgICAgJ3BhZGRpbmcnOiBcIjNweCAxMHB4IDNweCAxMHB4XCIsXG4gICAgICAgICd0b3AnOiBvZmZzZXQudG9wICsgJHRhcmdldC5oZWlnaHQoKSArIFwicHhcIixcbiAgICAgICAgJ2xlZnQnOiBvZmZzZXQubGVmdCArICR0YXJnZXQud2lkdGgoKSArIFwicHhcIlxuICAgICAgfTtcbiAgICAgIHZhciBtZXNzYWdlID0gZ2V0TWVzc2FnZS5jYWxsKGUudGFyZ2V0KTtcbiAgICAgICR0aXAuY3NzKGNzcykuYW5pbWF0ZSh7b3BhY2l0eTogJzAuODUnfSwgMTApXG4gICAgICBpZiAobWVzc2FnZS5odG1sICYmIHNlbGYub3B0aW9ucy5nZXQoJ2FsbG93SFRNTCcpKSB7XG4gICAgICAgICR0aXAuaHRtbChtZXNzYWdlLmh0bWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRpcC50ZXh0KG1lc3NhZ2UudGV4dCk7XG4gICAgICB9XG4gICAgICAkdGlwLnNob3coKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VxdWVuY2U7XG4iLCJ2YXIgRXZlbnRzID0gcmVxdWlyZSgnYmlvanMtZXZlbnRzJyk7XG5cbmZ1bmN0aW9uIE1vZGVsIChhdHRyaWJ1dGVzLCBkZWZhdWx0cykge1xuICB0aGlzLmF0dHJpYnV0ZXMgPSB7fTtcbiAgdGhpcy5kZWZhdWx0cyA9IChkZWZhdWx0cyB8fCB7fSk7XG4gIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgIHRoaXMuYXR0cmlidXRlc1trZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgIH1cbiAgfVxufVxuXG5FdmVudHMubWl4aW4oTW9kZWwucHJvdG90eXBlKTtcblxuTW9kZWwucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xufTtcblxuTW9kZWwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKHRoaXMuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlc1trZXldO1xuICB9XG4gIHJldHVybiB0aGlzLmRlZmF1bHRzW2tleV07XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgdmFyIG9sZCwgbm93LCBrZXksIHRvU2V0LCBzZWxmID0gdGhpcywgY2hhbmdlcyA9IFtdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyICYmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZ3VtZW50c1swXSkpIHtcbiAgICB0b1NldCA9IHt9O1xuICAgIHRvU2V0W2FyZ3VtZW50c1swXV0gPSBhcmd1bWVudHNbMV07XG4gICAgcmV0dXJuIHRoaXMuc2V0KHRvU2V0LCBhcmd1bWVudHNbMl0pO1xuICB9XG4gIGZvciAoa2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICBvbGQgPSB0aGlzLmF0dHJpYnV0ZXNba2V5XTtcbiAgICBub3cgPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgaWYgKG9sZCAhPT0gbm93KSB7XG4gICAgICBjaGFuZ2VzLnB1c2goWydjaGFuZ2U6JyArIGtleSwgbm93LCBvbGRdKTtcbiAgICAgIHRoaXMuYXR0cmlidXRlc1trZXldID0gbm93O1xuICAgIH1cbiAgfVxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNpbGVudCkgcmV0dXJuO1xuXG4gIGNoYW5nZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgc2VsZi50cmlnZ2VyLmFwcGx5KHNlbGYsIGNoYW5nZSk7XG4gIH0pO1xuICBzZWxmLnRyaWdnZXIoJ2NoYW5nZScpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbk1vZGVsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoa2V5LCBmLCBvcHRpb25zKSB7XG4gIHZhciBuZXdWYWx1ZSA9IGYodGhpcy5nZXQoa2V5KSk7XG4gIHJldHVybiB0aGlzLnNldChrZXksIG5ld1ZhbHVlLCBvcHRpb25zKTtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS5jYWxsTWV0aG9kID0gZnVuY3Rpb24gKGtleSwgbWV0aCkge1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiAobykgeyByZXR1cm4gb1ttZXRoXS5hcHBseShvLCBhcmdzKTsgfTtcbiAgcmV0dXJuIHRoaXMudXBkYXRlKGtleSwgdXBkYXRlcik7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNb2RlbDtcbiIsIi8vIEJhc2UgY2xhc3MgZm9yIHJlbmRlcmVycy5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2xhc3NOYW1lc0ZvciA9IHtcbiAgQTogJ2FkZW5pbmUnLFxuICBDOiAnY3l0b3NpbmUnLFxuICBHOiAnZ3VhbmluZScsXG4gIFQ6ICd0aHltaW5lJ1xufTtcbnZhciBiYXNlVG9DbGFzcyA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gIHJldHVybiBjbGFzc05hbWVzRm9yW2NvZGUudG9VcHBlckNhc2UoKV07XG59O1xuXG52YXIgVU5JTVBMRU1FTlRFRCA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpOyB9O1xudmFyIE5PX09QID0gZnVuY3Rpb24gKCkge307XG5cbnZhciBSZW5kZXJlciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVuZGVyZXIgKCkgeyB9O1xuUmVuZGVyZXIub3B0aW9uYWxQcm9wZXJ0aWVzID0gWydkb2N1bWVudCcsICdhZGRCYXNlQ2xhc3MnXTtcblJlbmRlcmVyLmNhbGxiYWNrcyA9IFsnaW5pdFRvb2xUaXAnLCAnb25DaGFuZ2VTZWxlY3Rpb24nLCAnb25Nb3VzZUVudGVyJ11cblJlbmRlcmVyLnJlcXVpcmVkUHJvcGVydGllcyA9IFsnd2lkdGgnXTtcblxuLyoqXG4gICogR2V0IHRoZSBoaWdobGlnaHQgY2xhc3MgZm9yIGEgYmFzZSBhdCB0aGUgZ2l2ZW4gMS1iYXNlZCBpbmRleC5cbiAgKi9cbnZhciBnZXRIaWdobGlnaHRDbGFzcyA9IGZ1bmN0aW9uIChoaWdobGlnaHRzLCBiYXNlUG9zaXRpb24pIHtcbiAgdmFyIGNzc0NsYXNzID0gJyc7XG4gIC8vIExhc3Qgb25lIHRha2VzIHByZWNlZGVuY2UuXG4gIGhpZ2hsaWdodHMuZm9yRWFjaChmdW5jdGlvbiAoaGwpIHtcbiAgICBpZiAoYmFzZVBvc2l0aW9uID49IGhsLnN0YXJ0ICYmIGJhc2VQb3NpdGlvbiA8PSBobC5lbmQpIHtcbiAgICAgIGNzc0NsYXNzID0gaGwua2luZDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY3NzQ2xhc3M7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUgPSB7XG5cbiAgLyoqXG4gICAqIFN1YmNsYXNzZXMgbXVzdCBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uIHRoYXQgcmVuZGVycyBhIGhlYWRlciB0byBhIGNhbnZhcy5cbiAgICovXG4gIHJlbmRlckhlYWRlcjogVU5JTVBMRU1FTlRFRCxcblxuICAvKipcbiAgICogU3ViY2xhc3NlcyBtdXN0IHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gdGhhdCByZW5kZXJzIGEgcm93IG9mIGJhc2VzLlxuICAgKi9cbiAgcmVuZGVyUm93OiBVTklNUExFTUVOVEVELFxuXG4gIC8qKlxuICAgKiBTdWJjbGFzc2VzIG11c3QgcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiB0aGF0IHJlbmRlcnMgYSBmb290ZXIuXG4gICAqL1xuICByZW5kZXJGb290ZXI6IFVOSU1QTEVNRU5URUQsXG5cbiAgLyoqXG4gICAqIFN1YmNsYXNzZXMgbXVzdCBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uIHRoYXQgcmVuZGVycyBhbiBhbm5vdGF0aW9uIHJvdy5cbiAgICovXG4gIHJlbmRlckFubm90YXRpb25Sb3c6IFVOSU1QTEVNRU5URUQsXG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzZXF1ZW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlcXVlbmNlIFRoZSBzZXF1ZW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBpZGVudGlmaWVyIG9mIHRoaXMgc2VxdWVuY2UuXG4gICAqIEBwYXJhbSB7QXJyYXl9IGhpZ2hsaWdodHMgVGhlIGRlc2NyaXB0aW9uIG9mIHdoaWNoIHNlY3Rpb25zIHRvIGhpZ2hsaWdodC5cbiAgICogQHBhcmFtIHtBcnJheX0gYW5ub3RhdGlvbnMgVGhlIGRlc2NyaXB0aW9uIG9mIHdoaWNoIHNlY3Rpb25zIHRvIGFubm90YXRlLlxuICAgKiBAcmV0dXJuIHtFbGVtZW50fSBTb21lIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzZXF1ZW5jZS5cbiAgICovXG4gIHJlbmRlcjogZnVuY3Rpb24gKHNlcXVlbmNlLCBpZCwgaGlnaGxpZ2h0cywgYW5ub3RhdGlvbnMpIHtcbiAgICB2YXIgcm93QW5ucywgaGlnaGxpZ2h0ZXIsIGNhbnZhcywgaSwgYmFzZXMsIHJvd0Jhc2VzLCByb3csIG9mZnNldDtcbiAgICBpZiAoIXNlcXVlbmNlIHx8IHNlcXVlbmNlLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vQ29udGVudCgpO1xuICAgIH1cbiAgICBiYXNlcyA9IHRoaXMuZ2V0QmFzZXMoc2VxdWVuY2UpO1xuICAgIGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKCk7XG5cbiAgICB0aGlzLnJlbmRlckhlYWRlcihjYW52YXMsIGJhc2VzLCBpZCk7XG4gICAgaGlnaGxpZ2h0ZXIgPSBnZXRIaWdobGlnaHRDbGFzcy5iaW5kKG51bGwsIGhpZ2hsaWdodHMpO1xuXG4gICAgZm9yIChpID0gMSwgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYmFzZXMubGVuZ3RoOyBvZmZzZXQgKz0gdGhpcy53aWR0aCwgaSsrKSB7XG4gICAgICByb3dCYXNlcyA9IGJhc2VzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdGhpcy53aWR0aCk7XG4gICAgICByb3cgPSB7XG4gICAgICAgIGlkeDogaSxcbiAgICAgICAgYmFzZXM6IHJvd0Jhc2VzLFxuICAgICAgICBzdGFydDogb2Zmc2V0ICsgMSxcbiAgICAgICAgZW5kOiBvZmZzZXQgKyB0aGlzLndpZHRoLFxuICAgICAgICBoaWdobGlnaHRlcjogaGlnaGxpZ2h0ZXJcbiAgICAgIH07XG4gICAgICB0aGlzLnJlbmRlclJvdyhjYW52YXMsIHJvdyk7XG4gICAgICBpZiAocm93QW5ucyA9IHRoaXMuZ2V0QW5ub3RhdGlvbnNGb3JSb3coYW5ub3RhdGlvbnMsIHJvdykpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJBbm5vdGF0aW9uUm93KGNhbnZhcywgcm93QW5ucywgcm93KTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyRm9vdGVyKGNhbnZhcyk7XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFubm90YXRpb25zIHRoYXQgYXJlIHJlbGV2YW50IGZvciBhIHBhcnRpY3VsYXIgcm93LlxuICAgKi9cbiAgZ2V0QW5ub3RhdGlvbnNGb3JSb3c6IGZ1bmN0aW9uIChhbm5vdGF0aW9ucywgcm93KSB7XG4gICAgdmFyIG1hdGNoaW5nID0gKGFubm90YXRpb25zIHx8IFtdKS5maWx0ZXIoZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBpLCBsZW4gPSBhLnJlZ2lvbnMubGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChvdmVybGFwKGEucmVnaW9uc1tpXSwgcm93KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgaWYgKG1hdGNoaW5nLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG1hdGNoaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbW1vbiBpbml0aWFsaXNhdGlvbiBsb2dpYy5cbiAgICovXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQgKG9wdHMpIHtcbiAgICB0aGlzLmJhc2VzID0gW107XG4gICAgUmVuZGVyZXIub3B0aW9uYWxQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmIChvcHRzW25hbWVdKSB0aGlzW25hbWVdID0gb3B0c1tuYW1lXTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgUmVuZGVyZXIucmVxdWlyZWRQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmICghb3B0c1tuYW1lXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHJlcXVpcmVkIG9wdGlvbjogXCIgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXNbbmFtZV0gPSBvcHRzW25hbWVdO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICBSZW5kZXJlci5jYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKG9wdHNbbmFtZV0pIHtcbiAgICAgICAgdGhpc1tuYW1lXSA9IG9wdHNbbmFtZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW25hbWVdID0gTk9fT1A7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIEFsbG93IGRvY3VtZW50IGZhY3RvcnkgdG8gYmUgaW5qZWN0ZWQuXG4gICAgaWYgKCF0aGlzLmRvY3VtZW50KSB7XG4gICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBQcm9kdWNlIGEgY2FudmFzIG9iamVjdC5cbiAgICovXG4gIGdldENhbnZhczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW52YXMgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAgIGNhbnZhcy5jbGFzc05hbWUgPSAnc2VxdWVuY2UtY2FudmFzICcgKyB0aGlzLmZvcm1hdC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBjYW52YXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYmFzZXMgdG8gcmVuZGVyXG4gICAqL1xuICBnZXRCYXNlczogZnVuY3Rpb24gKHNlcSkgeyByZXR1cm4gc2VxLnNwbGl0KCcnKS5tYXAodGhpcy50cmFuc2Zvcm1CYXNlKTsgfSxcblxuICAvKipcbiAgICogVGhlIHRyYW5zZm9ybWF0aW9uIHRvIHBlcmZvcm0gb24gZWFjaCBiYXNlIC0gYnkgZGVmYXVsdCB1cHBlci1jYXNlLlxuICAgKi9cbiAgdHJhbnNmb3JtQmFzZTogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgudG9VcHBlckNhc2UoKTsgfSxcblxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHRoZSBDU1MtY2xhc3NlcyB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBiYXNlIGF0IHRoZSBnaXZlbiAxLWJhc2VkIGluZGV4LlxuICAgKi9cbiAgZ2V0QmFzZUNsYXNzZXM6IGZ1bmN0aW9uIChjb2RlLCBpbmRleCwgaGlnaGxpZ2h0ZXIpIHtcbiAgICB2YXIgY2xhc3NlcyA9IFsnc2VxLWJhc2UnXTtcbiAgICB2YXIgYmFzZUNsYXNzID0gYmFzZVRvQ2xhc3MoY29kZSk7XG4gICAgaWYgKGJhc2VDbGFzcyAmJiB0aGlzLmFkZEJhc2VDbGFzcykge1xuICAgICAgY2xhc3Nlcy5wdXNoKGJhc2VDbGFzcyk7XG4gICAgfVxuICAgIGNsYXNzZXMucHVzaChoaWdobGlnaHRlcihpbmRleCkpO1xuICAgIHJldHVybiBjbGFzc2VzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgYmFzZS5cbiAgICovXG4gIHJlbmRlckJhc2U6IGZ1bmN0aW9uIChyb3csIHJvd0luZGV4KSB7XG4gICAgdmFyIGNvZGUgPSByb3cuYmFzZXNbcm93SW5kZXhdO1xuICAgIHZhciBpbmRleCA9IHJvdy5zdGFydCArIHJvd0luZGV4O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYmFzZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHZhciBjbGFzc2VzID0gdGhpcy5nZXRCYXNlQ2xhc3Nlcyhjb2RlLCBpbmRleCwgcm93LmhpZ2hsaWdodGVyKTtcbiAgICBiYXNlLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgIGJhc2UuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb2RlKSk7XG4gICAgYmFzZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uTW91c2VFbnRlcihpbmRleCk7XG4gICAgfSk7XG4gICAgc2VsZi5vbkNoYW5nZVNlbGVjdGlvbihmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICBpZiAoaW5kZXggPj0gc2VsZWN0aW9uLnN0YXJ0ICYmIGluZGV4IDw9IHNlbGVjdGlvbi5lbmQpIHtcbiAgICAgICAgYmFzZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0aW9uJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJhc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmVwcmVzZW50YXRpb24gb2Ygbm8gc2VxdWVuY2UuXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9IFNvbWUgcmVwcmVzZW50YXRpb24gb2Ygbm90aGluZy5cbiAgICovXG4gIHJlbmRlck5vQ29udGVudDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBub3RoaW5nID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBub3RoaW5nLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ05vIHNlcXVlbmNlIGF2YWlsYWJsZScpKTtcbiAgICByZXR1cm4gbm90aGluZztcbiAgfVxuXG59O1xuXG5mdW5jdGlvbiBvdmVybGFwIChhLCBiKSB7XG4gIHZhciB0b1RoZUxlZnQgPSAoYS5zdGFydCA+IGIuZW5kKTtcbiAgdmFyIHRvVGhlUmlnaHQgPSAoYS5lbmQgPCBiLnN0YXJ0KTtcbiAgdmFyIGFueUNvcm5lckluc2lkZSA9IFthLnN0YXJ0LCBhLmVuZF0ucmVkdWNlKGZ1bmN0aW9uIChpbnNpZGUsIHBvcykge1xuICAgIHJldHVybiBpbnNpZGUgfHwgKGIuc3RhcnQgPD0gcG9zICYmIHBvcyA8PSBiLmVuZCk7XG4gIH0sIGZhbHNlKTtcbiAgcmV0dXJuIGFueUNvcm5lckluc2lkZSB8fCAoIXRvVGhlTGVmdCAmJiAhdG9UaGVSaWdodCk7XG59XG5cbiIsInZhciBSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXItYmFzZScpO1xuXG52YXIgU1BBQ0UgPSAnICc7XG5cbnZhciBOT19PUCA9IGZ1bmN0aW9uICgpIHsgfTtcblxuLy8tLS0tLS0tLS0tIFJlbmRlcmVyIGZvciBGQVNUQVxuXG52YXIgRmFzdGFSZW5kZXJlciA9IGV4cG9ydHMuRkFTVEEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLmluaXQob3B0aW9ucyk7XG59O1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZSA9IG5ldyBSZW5kZXJlcigpO1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZS5mb3JtYXQgPSAnRkFTVEEnO1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJIZWFkZXIgPSBmdW5jdGlvbiAoY2FudmFzLCBiYXNlcywgaWQpIHtcbiAgdmFyIGhlYWRlciA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJz4nICsgaWQgKyAnICcgKyBiYXNlcy5sZW5ndGggKyAnYnAnKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xufTtcblxuRmFzdGFSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRm9vdGVyID0gTk9fT1A7XG5cbkZhc3RhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckFubm90YXRpb25Sb3cgPSBmdW5jdGlvbiAoY2FudmFzLCBhbm5vdGF0aW9ucywgcm93KSB7XG4gIHZhciBpLCBzZWxmID0gdGhpcztcbiAgZm9yIChpID0gMDsgaSA8IHJvdy5iYXNlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpbmRleCA9IHJvdy5zdGFydCArIGk7XG4gICAgdmFyIGFubm90YXRlZEJhc2UgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgY29udGVudCA9IFNQQUNFO1xuICAgIGFubm90YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGEpIHtcbiAgICAgIGEucmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIGlmIChjb250ZW50ID09PSBTUEFDRSAmJiByLnN0YXJ0IDw9IGluZGV4ICYmIHIuZW5kID49IGluZGV4KSB7XG4gICAgICAgICAgY29udGVudCA9ICdeJztcbiAgICAgICAgICBhbm5vdGF0ZWRCYXNlLmNsYXNzTmFtZSA9ICdhbm5vdGF0aW9uJztcbiAgICAgICAgICBpZiAoYS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGFubm90YXRlZEJhc2UuY2xhc3NMaXN0LmFkZChhLmNsYXNzTmFtZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFubm90YXRlZEJhc2UuY2xhc3NMaXN0LmFkZCgnYW5ub3RhdGlvbi1kZWZhdWx0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYuaW5pdFRvb2xUaXAoYW5ub3RhdGVkQmFzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBhbm5vdGF0aW9uIG5hbWUgaWYgbm8gZGVzY3JpcHRpb24gcHJvdmlkZWQuXG4gICAgICAgICAgICByZXR1cm4gKGEuZGVzY3JpcHRpb24gfHwge3RleHQ6IGEubmFtZX0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBhbm5vdGF0ZWRCYXNlLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xuICAgIGNhbnZhcy5hcHBlbmRDaGlsZChhbm5vdGF0ZWRCYXNlKTtcbiAgfVxuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbn07XG5cbkZhc3RhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlclJvdyA9IGZ1bmN0aW9uIChjYW52YXMsIHJvdykge1xuICB2YXIgaSwgYmFzZTtcbiAgZm9yIChpID0gMDsgaSA8IHJvdy5iYXNlcy5sZW5ndGg7IGkrKykge1xuICAgIGJhc2UgPSB0aGlzLnJlbmRlckJhc2Uocm93LCBpKTtcbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gIH1cbiAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLSBSZW5kZXJlciBmb3IgQ09EQVRBXG5cbnZhciBDb2RhdGFSZW5kZXJlciA9IGV4cG9ydHMuQ09EQVRBID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdGhpcy5pbml0KG9wdGlvbnMpO1xufTtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlID0gbmV3IFJlbmRlcmVyKCk7XG5cbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5mb3JtYXQgPSAnQ09EQVRBJztcbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5ncm91cFdpZHRoID0gNTtcbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5sZWZ0TWFyZ2luU2l6ZSA9IDc7XG5Db2RhdGFSZW5kZXJlci5wcm90b3R5cGUuZ3V0dGVyID0gU1BBQ0UgKyBTUEFDRTtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckZvb3RlciA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcvLy8nKSk7XG59O1xuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckFubm90YXRpb25Sb3cgPSBOT19PUDtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckhlYWRlciA9IGZ1bmN0aW9uIChjYW52YXMsIGJhc2VzLCBpZCkge1xuICB2YXIgaSwgeCwgbmVlZGVkLCBidWZmID0gW107XG4gIGNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdFTlRSWSAgICAgICAgICAgJykpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpZCkpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1NFUVVFTkNFJykpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZWZ0TWFyZ2luU2l6ZTsgaSsrKSB7XG4gICAgYnVmZi5wdXNoKFNQQUNFKTtcbiAgfVxuICBidWZmLnB1c2godGhpcy5ndXR0ZXIpO1xuICB2YXIgbWF4TiA9IE1hdGgubWluKGJhc2VzLmxlbmd0aCwgdGhpcy53aWR0aCk7XG5cbiAgZm9yIChpID0gdGhpcy5ncm91cFdpZHRoOyBpIDw9IG1heE47IGkgKz0gdGhpcy5ncm91cFdpZHRoKSB7XG4gICAgeCA9IFN0cmluZyhpKTtcbiAgICBmb3IgKG5lZWRlZCA9ICh0aGlzLmdyb3VwV2lkdGggKiAyKSAtICgxICsgeC5sZW5ndGgpOyBuZWVkZWQgPiAwOyBuZWVkZWQtLSkge1xuICAgICAgYnVmZi5wdXNoKFNQQUNFKTtcbiAgICB9XG4gICAgYnVmZi5wdXNoKHgpO1xuICAgIGJ1ZmYucHVzaChTUEFDRSk7XG4gIH1cblxuICB2YXIgaGVhZGVyID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGhlYWRlci5jbGFzc05hbWUgPSAnc2VxdWVuY2UtaGVhZGVyJztcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnVmZi5qb2luKCcnKSkpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG5Db2RhdGFSZW5kZXJlci5wcm90b3R5cGUucmVuZGVySW50ZXJCYXNlID0gZnVuY3Rpb24gKHJvdywgYmFzZSwgaW50ZXJiYXNlSW5kZXgpIHtcbiAgdmFyIGludGVyYmFzZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB2YXIgY2xhc3NlcyA9IHRoaXMuZ2V0QmFzZUNsYXNzZXMoYmFzZSwgaW50ZXJiYXNlSW5kZXgsIHJvdy5oaWdobGlnaHRlcik7XG4gIGNsYXNzZXMucHVzaCgnaW50ZXJiYXNlJyk7XG4gIGludGVyYmFzZS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgaW50ZXJiYXNlLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoU1BBQ0UpKTtcbiAgdGhpcy5vbkNoYW5nZVNlbGVjdGlvbihmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgaWYgKGludGVyYmFzZUluZGV4ID49IHNlbGVjdGlvbi5zdGFydCAmJiBpbnRlcmJhc2VJbmRleCA8PSBzZWxlY3Rpb24uZW5kKSB7XG4gICAgICBpbnRlcmJhc2UuY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGludGVyYmFzZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rpb24nKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaW50ZXJiYXNlO1xufTtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlclJvdyA9IGZ1bmN0aW9uIChjYW52YXMsIHJvdykge1xuICB2YXIgbmVlZGVkLCBpLCBiYXNlO1xuXG4gIHZhciByb3dMYWJlbCA9IFN0cmluZyhyb3cuc3RhcnQpO1xuICB2YXIgYnVmZiA9IFtdO1xuICBmb3IgKG5lZWRlZCA9ICh0aGlzLmxlZnRNYXJnaW5TaXplIC0gcm93TGFiZWwubGVuZ3RoKTsgbmVlZGVkID4gMDsgbmVlZGVkLS0pIHtcbiAgICBidWZmLnB1c2goU1BBQ0UpO1xuICB9XG4gIGJ1ZmYucHVzaChyb3dMYWJlbCwgdGhpcy5ndXR0ZXIpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShidWZmLmpvaW4oJycpKSk7XG4gIGZvciAoaSA9IDA7IGkgPCByb3cuYmFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBiYXNlID0gdGhpcy5yZW5kZXJCYXNlKHJvdywgaSk7XG4gICAgY2FudmFzLmFwcGVuZENoaWxkKGJhc2UpO1xuICAgIGlmIChpICsgMSA8IHJvdy5iYXNlcy5sZW5ndGgpIHtcbiAgICAgIHZhciBpbnRlcmJhc2VJbmRleCA9IHJvdy5zdGFydCArIGkgKyAwLjU7XG4gICAgICB2YXIgaW50ZXJiYXNlID0gdGhpcy5yZW5kZXJJbnRlckJhc2Uocm93LCByb3cuYmFzZXNbaV0sIGludGVyYmFzZUluZGV4KTtcbiAgICAgIGNhbnZhcy5hcHBlbmRDaGlsZChpbnRlcmJhc2UpO1xuICAgIH1cbiAgfVxuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbn07XG5cbi8vLS0tLS0tLS0tIFJlbmRlcmVyIGZvciBQUklERSBmb3JtYXRcblxudmFyIFByaWRlUmVuZGVyZXIgPSBleHBvcnRzLlBSSURFID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdGhpcy5pbml0KG9wdGlvbnMpO1xufTtcblxuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUgPSBuZXcgUmVuZGVyZXIoKTtcblxuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUuZm9ybWF0ID0gJ1BSSURFJztcblByaWRlUmVuZGVyZXIucHJvdG90eXBlLmdyb3VwV2lkdGggPSAxMDtcblByaWRlUmVuZGVyZXIucHJvdG90eXBlLm1hcmdpblNpemUgPSA1O1xuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUuZ3V0dGVyID0gU1BBQ0UgKyBTUEFDRTtcblByaWRlUmVuZGVyZXIucHJvdG90eXBlLmFpc2xlID0gU1BBQ0U7XG5cblByaWRlUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckhlYWRlciA9IE5PX09QO1xuXG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJGb290ZXIgPSBOT19PUDtcblxuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQW5ub3RhdGlvblJvdyA9IE5PX09QO1xuXG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJMYWJlbCA9IGZ1bmN0aW9uIChudW0pIHtcbiAgdmFyIGxhYmVsID0gU3RyaW5nKG51bSk7XG4gIHZhciBidWZmID0gW107XG4gIGZvciAobmVlZGVkID0gKHRoaXMubWFyZ2luU2l6ZSAtIGxhYmVsLmxlbmd0aCk7IG5lZWRlZCA+IDA7IG5lZWRlZC0tKSB7XG4gICAgYnVmZi5wdXNoKCcwJyk7XG4gIH1cbiAgYnVmZi5wdXNoKGxhYmVsKTtcbiAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnVmZi5qb2luKCcnKSk7XG59O1xuXG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoY2FudmFzLCByb3cpIHtcbiAgdmFyIG5lZWRlZCwgaSwgYmFzZTtcblxuICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJMYWJlbChyb3cuc3RhcnQpKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5ndXR0ZXIpKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgcm93LmJhc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgPiAwICYmIGkgJSB0aGlzLmdyb3VwV2lkdGggPT09IDApIHtcbiAgICAgIGNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuYWlzbGUpKTtcbiAgICB9XG4gICAgYmFzZSA9IHRoaXMucmVuZGVyQmFzZShyb3csIGkpO1xuICAgIGNhbnZhcy5hcHBlbmRDaGlsZChiYXNlKTtcbiAgfVxuICBpZiAoaSA9PT0gdGhpcy53aWR0aCkge1xuICAgIGNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuZ3V0dGVyKSk7XG4gICAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyTGFiZWwocm93LmVuZCkpO1xuICB9XG4gIGNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xufTtcblxuLy8tLS0tLSAgUmVuZGVyZXIgZm9yIFJBVyBmb3JtYXRcblxudmFyIFJhd1JlbmRlcmVyID0gZXhwb3J0cy5SQVcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLmluaXQob3B0aW9ucyk7XG59O1xuXG5SYXdSZW5kZXJlci5wcm90b3R5cGUgPSBuZXcgUmVuZGVyZXIoKTtcblJhd1JlbmRlcmVyLnByb3RvdHlwZS5mb3JtYXQgPSAnUFJJREUnO1xuUmF3UmVuZGVyZXIucHJvdG90eXBlLnRyYW5zZm9ybUJhc2UgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfTtcblJhd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJIZWFkZXIgPSBOT19PUDtcblJhd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJGb290ZXIgPSBOT19PUDtcblJhd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJBbm5vdGF0aW9uUm93ID0gTk9fT1A7XG5cblJhd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoY2FudmFzLCByb3cpIHtcbiAgdmFyIG5lZWRlZCwgaSwgYmFzZTtcbiAgZm9yIChpID0gMDsgaSA8IHJvdy5iYXNlcy5sZW5ndGg7IGkrKykge1xuICAgIGJhc2UgPSB0aGlzLnJlbmRlckJhc2Uocm93LCBpKTtcbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gIH1cbiAgY2FudmFzLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFwcGx5U3R5bGUgKGNzcywgZG9jdW1lbnQpIHtcbiAgaWYgKGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCgpO1xuICAgIHN0eWxlc2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBzdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZXNoZWV0LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGlmIChzdHlsZXNoZWV0LnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlc2hlZXQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNoZWV0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlc2hlZXQpO1xuICB9XG59O1xuIiwidmFyIGV2ZW50cyA9IHJlcXVpcmUoXCJiYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZVwiKTtcblxuZXZlbnRzLm9uQWxsID0gZnVuY3Rpb24oY2FsbGJhY2ssY29udGV4dCl7XG4gIHRoaXMub24oXCJhbGxcIiwgY2FsbGJhY2ssY29udGV4dCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gTWl4aW4gdXRpbGl0eVxuZXZlbnRzLm9sZE1peGluID0gZXZlbnRzLm1peGluO1xuZXZlbnRzLm1peGluID0gZnVuY3Rpb24ocHJvdG8pIHtcbiAgZXZlbnRzLm9sZE1peGluKHByb3RvKTtcbiAgLy8gYWRkIGN1c3RvbSBvbkFsbFxuICB2YXIgZXhwb3J0cyA9IFsnb25BbGwnXTtcbiAgZm9yKHZhciBpPTA7IGkgPCBleHBvcnRzLmxlbmd0aDtpKyspe1xuICAgIHZhciBuYW1lID0gZXhwb3J0c1tpXTtcbiAgICBwcm90b1tuYW1lXSA9IHRoaXNbbmFtZV07XG4gIH1cbiAgcmV0dXJuIHByb3RvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBldmVudHM7XG4iLCIvKipcbiAqIFN0YW5kYWxvbmUgZXh0cmFjdGlvbiBvZiBCYWNrYm9uZS5FdmVudHMsIG5vIGV4dGVybmFsIGRlcGVuZGVuY3kgcmVxdWlyZWQuXG4gKiBEZWdyYWRlcyBuaWNlbHkgd2hlbiBCYWNrb25lL3VuZGVyc2NvcmUgYXJlIGFscmVhZHkgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50XG4gKiBnbG9iYWwgY29udGV4dC5cbiAqXG4gKiBOb3RlIHRoYXQgZG9jcyBzdWdnZXN0IHRvIHVzZSB1bmRlcnNjb3JlJ3MgYF8uZXh0ZW5kKClgIG1ldGhvZCB0byBhZGQgRXZlbnRzXG4gKiBzdXBwb3J0IHRvIHNvbWUgZ2l2ZW4gb2JqZWN0LiBBIGBtaXhpbigpYCBtZXRob2QgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIEV2ZW50c1xuICogcHJvdG90eXBlIHRvIGF2b2lkIHVzaW5nIHVuZGVyc2NvcmUgZm9yIHRoYXQgc29sZSBwdXJwb3NlOlxuICpcbiAqICAgICB2YXIgbXlFdmVudEVtaXR0ZXIgPSBCYWNrYm9uZUV2ZW50cy5taXhpbih7fSk7XG4gKlxuICogT3IgZm9yIGEgZnVuY3Rpb24gY29uc3RydWN0b3I6XG4gKlxuICogICAgIGZ1bmN0aW9uIE15Q29uc3RydWN0b3IoKXt9XG4gKiAgICAgTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZm9vID0gZnVuY3Rpb24oKXt9XG4gKiAgICAgQmFja2JvbmVFdmVudHMubWl4aW4oTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuICpcbiAqIChjKSAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIEluYy5cbiAqIChjKSAyMDEzIE5pY29sYXMgUGVycmlhdWx0XG4gKi9cbi8qIGdsb2JhbCBleHBvcnRzOnRydWUsIGRlZmluZSwgbW9kdWxlICovXG4oZnVuY3Rpb24oKSB7XG4gIHZhciByb290ID0gdGhpcyxcbiAgICAgIGJyZWFrZXIgPSB7fSxcbiAgICAgIG5hdGl2ZUZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCxcbiAgICAgIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgaWRDb3VudGVyID0gMDtcblxuICAvLyBSZXR1cm5zIGEgcGFydGlhbCBpbXBsZW1lbnRhdGlvbiBtYXRjaGluZyB0aGUgbWluaW1hbCBBUEkgc3Vic2V0IHJlcXVpcmVkXG4gIC8vIGJ5IEJhY2tib25lLkV2ZW50c1xuICBmdW5jdGlvbiBtaW5pc2NvcmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleXM6IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJrZXlzKCkgY2FsbGVkIG9uIGEgbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5LCBrZXlzID0gW107XG4gICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAga2V5c1trZXlzLmxlbmd0aF0gPSBrZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgfSxcblxuICAgICAgdW5pcXVlSWQ6IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgICAgICB2YXIgaWQgPSArK2lkQ291bnRlciArICcnO1xuICAgICAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgICAgIH0sXG5cbiAgICAgIGhhczogZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICAgICAgfSxcblxuICAgICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKG5hdGl2ZUZvckVhY2ggJiYgb2JqLmZvckVhY2ggPT09IG5hdGl2ZUZvckVhY2gpIHtcbiAgICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gYnJlYWtlcikgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIG9uY2U6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgdmFyIHJhbiA9IGZhbHNlLCBtZW1vO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHJhbikgcmV0dXJuIG1lbW87XG4gICAgICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGZ1bmMgPSBudWxsO1xuICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgXyA9IG1pbmlzY29yZSgpLCBFdmVudHM7XG5cbiAgLy8gQmFja2JvbmUuRXZlbnRzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEEgbW9kdWxlIHRoYXQgY2FuIGJlIG1peGVkIGluIHRvICphbnkgb2JqZWN0KiBpbiBvcmRlciB0byBwcm92aWRlIGl0IHdpdGhcbiAgLy8gY3VzdG9tIGV2ZW50cy4gWW91IG1heSBiaW5kIHdpdGggYG9uYCBvciByZW1vdmUgd2l0aCBgb2ZmYCBjYWxsYmFja1xuICAvLyBmdW5jdGlvbnMgdG8gYW4gZXZlbnQ7IGB0cmlnZ2VyYC1pbmcgYW4gZXZlbnQgZmlyZXMgYWxsIGNhbGxiYWNrcyBpblxuICAvLyBzdWNjZXNzaW9uLlxuICAvL1xuICAvLyAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAvLyAgICAgXy5leHRlbmQob2JqZWN0LCBCYWNrYm9uZS5FdmVudHMpO1xuICAvLyAgICAgb2JqZWN0Lm9uKCdleHBhbmQnLCBmdW5jdGlvbigpeyBhbGVydCgnZXhwYW5kZWQnKTsgfSk7XG4gIC8vICAgICBvYmplY3QudHJpZ2dlcignZXhwYW5kJyk7XG4gIC8vXG4gIEV2ZW50cyA9IHtcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLiBQYXNzaW5nIGBcImFsbFwiYCB3aWxsIGJpbmRcbiAgICAvLyB0aGUgY2FsbGJhY2sgdG8gYWxsIGV2ZW50cyBmaXJlZC5cbiAgICBvbjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KTtcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKTtcbiAgICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQmluZCBhbiBldmVudCB0byBvbmx5IGJlIHRyaWdnZXJlZCBhIHNpbmdsZSB0aW1lLiBBZnRlciB0aGUgZmlyc3QgdGltZVxuICAgIC8vIHRoZSBjYWxsYmFjayBpcyBpbnZva2VkLCBpdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgb25jZTogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBvbmNlID0gXy5vbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgb25lIG9yIG1hbnkgY2FsbGJhY2tzLiBJZiBgY29udGV4dGAgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3Mgd2l0aCB0aGF0IGZ1bmN0aW9uLiBJZiBgY2FsbGJhY2tgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIGZvciB0aGUgZXZlbnQuIElmIGBuYW1lYCBpcyBudWxsLCByZW1vdmVzIGFsbCBib3VuZFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgYWxsIGV2ZW50cy5cbiAgICBvZmY6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwgaztcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpcztcbiAgICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBfLmtleXModGhpcy5fZXZlbnRzKTtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICBpZiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gcmV0YWluID0gW107XG4gICAgICAgICAgaWYgKGNhbGxiYWNrIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgICAgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXYuY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSBkZWxldGUgdGhpcy5fZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBUcmlnZ2VyIG9uZSBvciBtYW55IGV2ZW50cywgZmlyaW5nIGFsbCBib3VuZCBjYWxsYmFja3MuIENhbGxiYWNrcyBhcmVcbiAgICAvLyBwYXNzZWQgdGhlIHNhbWUgYXJndW1lbnRzIGFzIGB0cmlnZ2VyYCBpcywgYXBhcnQgZnJvbSB0aGUgZXZlbnQgbmFtZVxuICAgIC8vICh1bmxlc3MgeW91J3JlIGxpc3RlbmluZyBvbiBgXCJhbGxcImAsIHdoaWNoIHdpbGwgY2F1c2UgeW91ciBjYWxsYmFjayB0b1xuICAgIC8vIHJlY2VpdmUgdGhlIHRydWUgbmFtZSBvZiB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50KS5cbiAgICB0cmlnZ2VyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgIHZhciBhbGxFdmVudHMgPSB0aGlzLl9ldmVudHMuYWxsO1xuICAgICAgaWYgKGV2ZW50cykgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpO1xuICAgICAgaWYgKGFsbEV2ZW50cykgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVGVsbCB0aGlzIG9iamVjdCB0byBzdG9wIGxpc3RlbmluZyB0byBlaXRoZXIgc3BlY2lmaWMgZXZlbnRzIC4uLiBvclxuICAgIC8vIHRvIGV2ZXJ5IG9iamVjdCBpdCdzIGN1cnJlbnRseSBsaXN0ZW5pbmcgdG8uXG4gICAgc3RvcExpc3RlbmluZzogZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBkZWxldGVMaXN0ZW5lciA9ICFuYW1lICYmICFjYWxsYmFjaztcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIGlmIChvYmopIChsaXN0ZW5lcnMgPSB7fSlbb2JqLl9saXN0ZW5lcklkXSA9IG9iajtcbiAgICAgIGZvciAodmFyIGlkIGluIGxpc3RlbmVycykge1xuICAgICAgICBsaXN0ZW5lcnNbaWRdLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIGlmIChkZWxldGVMaXN0ZW5lcikgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1tpZF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgfTtcblxuICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byBzcGxpdCBldmVudCBzdHJpbmdzLlxuICB2YXIgZXZlbnRTcGxpdHRlciA9IC9cXHMrLztcblxuICAvLyBJbXBsZW1lbnQgZmFuY3kgZmVhdHVyZXMgb2YgdGhlIEV2ZW50cyBBUEkgc3VjaCBhcyBtdWx0aXBsZSBldmVudFxuICAvLyBuYW1lcyBgXCJjaGFuZ2UgYmx1clwiYCBhbmQgalF1ZXJ5LXN0eWxlIGV2ZW50IG1hcHMgYHtjaGFuZ2U6IGFjdGlvbn1gXG4gIC8vIGluIHRlcm1zIG9mIHRoZSBleGlzdGluZyBBUEkuXG4gIHZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICAgIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoZXZlbnRTcGxpdHRlcik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBBIGRpZmZpY3VsdC10by1iZWxpZXZlLCBidXQgb3B0aW1pemVkIGludGVybmFsIGRpc3BhdGNoIGZ1bmN0aW9uIGZvclxuICAvLyB0cmlnZ2VyaW5nIGV2ZW50cy4gVHJpZXMgdG8ga2VlcCB0aGUgdXN1YWwgY2FzZXMgc3BlZWR5IChtb3N0IGludGVybmFsXG4gIC8vIEJhY2tib25lIGV2ZW50cyBoYXZlIDMgYXJndW1lbnRzKS5cbiAgdmFyIHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MpIHtcbiAgICB2YXIgZXYsIGkgPSAtMSwgbCA9IGV2ZW50cy5sZW5ndGgsIGExID0gYXJnc1swXSwgYTIgPSBhcmdzWzFdLCBhMyA9IGFyZ3NbMl07XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVybjtcbiAgICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuO1xuICAgICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuO1xuICAgICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVybjtcbiAgICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBsaXN0ZW5NZXRob2RzID0ge2xpc3RlblRvOiAnb24nLCBsaXN0ZW5Ub09uY2U6ICdvbmNlJ307XG5cbiAgLy8gSW52ZXJzaW9uLW9mLWNvbnRyb2wgdmVyc2lvbnMgb2YgYG9uYCBhbmQgYG9uY2VgLiBUZWxsICp0aGlzKiBvYmplY3QgdG9cbiAgLy8gbGlzdGVuIHRvIGFuIGV2ZW50IGluIGFub3RoZXIgb2JqZWN0IC4uLiBrZWVwaW5nIHRyYWNrIG9mIHdoYXQgaXQnc1xuICAvLyBsaXN0ZW5pbmcgdG8uXG4gIF8uZWFjaChsaXN0ZW5NZXRob2RzLCBmdW5jdGlvbihpbXBsZW1lbnRhdGlvbiwgbWV0aG9kKSB7XG4gICAgRXZlbnRzW21ldGhvZF0gPSBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8ICh0aGlzLl9saXN0ZW5lcnMgPSB7fSk7XG4gICAgICB2YXIgaWQgPSBvYmouX2xpc3RlbmVySWQgfHwgKG9iai5fbGlzdGVuZXJJZCA9IF8udW5pcXVlSWQoJ2wnKSk7XG4gICAgICBsaXN0ZW5lcnNbaWRdID0gb2JqO1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzO1xuICAgICAgb2JqW2ltcGxlbWVudGF0aW9uXShuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9KTtcblxuICAvLyBBbGlhc2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgRXZlbnRzLmJpbmQgICA9IEV2ZW50cy5vbjtcbiAgRXZlbnRzLnVuYmluZCA9IEV2ZW50cy5vZmY7XG5cbiAgLy8gTWl4aW4gdXRpbGl0eVxuICBFdmVudHMubWl4aW4gPSBmdW5jdGlvbihwcm90bykge1xuICAgIHZhciBleHBvcnRzID0gWydvbicsICdvbmNlJywgJ29mZicsICd0cmlnZ2VyJywgJ3N0b3BMaXN0ZW5pbmcnLCAnbGlzdGVuVG8nLFxuICAgICAgICAgICAgICAgICAgICdsaXN0ZW5Ub09uY2UnLCAnYmluZCcsICd1bmJpbmQnXTtcbiAgICBfLmVhY2goZXhwb3J0cywgZnVuY3Rpb24obmFtZSkge1xuICAgICAgcHJvdG9bbmFtZV0gPSB0aGlzW25hbWVdO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiBwcm90bztcbiAgfTtcblxuICAvLyBFeHBvcnQgRXZlbnRzIGFzIEJhY2tib25lRXZlbnRzIGRlcGVuZGluZyBvbiBjdXJyZW50IGNvbnRleHRcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBFdmVudHM7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBFdmVudHM7XG4gICAgfVxuICAgIGV4cG9ydHMuQmFja2JvbmVFdmVudHMgPSBFdmVudHM7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5CYWNrYm9uZUV2ZW50cyA9IEV2ZW50cztcbiAgfVxufSkodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL2luZGV4XCIpO1xuIl19
