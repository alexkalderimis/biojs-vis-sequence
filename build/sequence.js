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
}

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
};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL2xpYi9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL21vZGVsLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9saWIvcmVuZGVyZXItYmFzZS5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL3JlbmRlcmVycy5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2UvbGliL3N0eWxlLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvYmlvanMtZXZlbnRzL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvYmlvanMtZXZlbnRzL25vZGVfbW9kdWxlcy9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZS9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZS5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9ub2RlX21vZHVsZXMvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUvaW5kZXguanMiLCIuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3YwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JSQTtBQUNBOztBQ0RBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIFxuICogU2VxdWVuY2UgY29tcG9uZW50IFxuICogXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEJpb2pzXG4gKiBcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpqb2huY2FyQGdtYWlsLmNvbVwiPkpvaG4gR29tZXo8L2E+LCA8YSBocmVmPVwibWFpbHRvOnNlY2V2YWxsaXZAZ21haWwuY29tXCI+Sm9zZSBWaWxsYXZlY2VzPC9hPlxuICogQHZlcnNpb24gMS4wLjBcbiAqIEBjYXRlZ29yeSAzXG4gKiBcbiAqIEByZXF1aXJlcyA8YSBocmVmPSdodHRwOi8vYmxvZy5qcXVlcnkuY29tLzIwMTEvMDkvMTIvanF1ZXJ5LTEtNi00LXJlbGVhc2VkLyc+alF1ZXJ5IENvcmUgMS42LjQ8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCIuLi9iaW9qcy9kZXBlbmRlbmNpZXMvanF1ZXJ5L2pxdWVyeS0xLjQuMi5taW4uanNcIj48L3NjcmlwdD5cbiAqIFxuICogQHJlcXVpcmVzIDxhIGhyZWY9J2h0dHA6Ly9qcXVlcnl1aS5jb20vZG93bmxvYWQnPmpRdWVyeSBVSSAxLjguMTY8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCIuLi9iaW9qcy9kZXBlbmRlbmNpZXMvanF1ZXJ5L2pxdWVyeS11aS0xLjguMi5jdXN0b20ubWluLmpzXCI+PC9zY3JpcHQ+XG4gKlxuICogQHJlcXVpcmVzIDxhIGhyZWY9J0Jpb2pzLlRvb2x0aXAuY3NzJz5CaW9qcy5Ub29sdGlwPC9hPlxuICogQGRlcGVuZGVuY3kgPHNjcmlwdCBsYW5ndWFnZT1cIkphdmFTY3JpcHRcIiB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwic3JjL0Jpb2pzLlRvb2x0aXAuanNcIj48L3NjcmlwdD5cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQW4gb2JqZWN0IHdpdGggdGhlIG9wdGlvbnMgZm9yIFNlcXVlbmNlIGNvbXBvbmVudC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSB0YXJnZXQgXG4gKiAgICBJZGVudGlmaWVyIG9mIHRoZSBESVYgdGFnIHdoZXJlIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc3BsYXllZC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSBzZXF1ZW5jZSBcbiAqICAgIFRoZSBzZXF1ZW5jZSB0byBiZSBkaXNwbGF5ZWQuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gW2lkXSBcbiAqICAgIFNlcXVlbmNlIGlkZW50aWZpZXIgaWYgYXBwbHkuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gW2Zvcm1hdD1cIkZBU1RBXCJdIFxuICogICAgVGhlIGRpc3BsYXkgZm9ybWF0IGZvciB0aGUgc2VxdWVuY2UgcmVwcmVzZW50YXRpb24uXG4gKiAgICBcbiAqIEBvcHRpb24ge09iamVjdFtdfSBbaGlnaGxpZ2h0c10gXG4gKiBcdCAgRm9yIGhpZ2hsaWdodGluZyBtdWx0aXBsZSByZWdpb25zLiBcbiAqICAgIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIlN5bnRheDpcIj4gXG4gKiAgICBbXG4gKiAgICBcdC8vIEhpZ2hsaWdodCBhbWlub2FjaWRzIGZyb20gJ3N0YXJ0JyB0byAnZW5kJyBvZiB0aGUgY3VycmVudCBzdHJhbmQgdXNpbmcgdGhlIHNwZWNpZmllZCAnY29sb3InIChvcHRpb25hbCkgYW5kICdiYWNrZ3JvdW5kJyAob3B0aW9uYWwpLlxuICogICAgXHR7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDsgWywgaWQ6Jmx0O2lkVmFsMSZndDtdIFssIGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O10gWywgYmFja2dyb3VuZDogJmx0O0hUTUxDb2xvciZndDtdfSwgXG4gKiAgICBcdC8vXG4gKiAgICBcdC8vIEFueSBvdGhlcnMgaGlnaGxpZ2h0c1xuICogICAgXHQuLi4sICBcbiAqICAgIFx0Ly8gXG4gKiAgICBcdHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0OyBbLCBpZDombHQ7aWRWYWxOJmd0O10gWywgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7XSBbLCBiYWNrZ3JvdW5kOiAmbHQ7SFRNTENvbG9yJmd0O119XG4gKiAgICBdPC9wcmU+XG4gKiBcbiAqIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIkV4YW1wbGU6XCI+IFxuICogaGlnaGxpZ2h0cyA6IFtcbiAqIFx0XHR7IHN0YXJ0OjMwLCBlbmQ6NDIsIGNvbG9yOlwid2hpdGVcIiwgYmFja2dyb3VuZDpcImdyZWVuXCIsIGlkOlwic3BpbjFcIiB9LFxuICpcdFx0eyBzdGFydDoxMzksIGVuZDoxNDAgfSwgXG4gKlx0XHR7IHN0YXJ0OjYzMSwgZW5kOjYzMywgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiYmx1ZVwiIH1cbiAqXHRdXG4gKiA8L3ByZT5cbiAqIFxuICogQG9wdGlvbiB7T2JqZWN0fSBbY29sdW1ucz17c2l6ZTo0MCxzcGFjZWRFYWNoOjEwfV0gXG4gKiBcdCAgT3B0aW9ucyBmb3IgZGlzcGxheWluZyB0aGUgY29sdW1ucy4gU3ludGF4OiB7IHNpemU6ICZsdDtudW1Db2xzJmd0Oywgc3BhY2VkRWFjaDogJmx0O251bUNvbHMmZ3Q7fVxuICogXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtzZWxlY3Rpb25dIFxuICogXHQgIFBvc2l0aW9ucyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmVnaW9uLiBTeW50YXg6IHsgc3RhcnQ6ICZsdDtzdGFydFZhbHVlJmd0OywgZW5kOiAmbHQ7ZW5kVmFsdWUmZ3Q7fVxuICogXG4gKiBAb3B0aW9uIHtPYmplY3RbXX0gW2Fubm90YXRpb25zXSBcbiAqICAgIFNldCBvZiBvdmVybGFwcGluZyBhbm5vdGF0aW9ucy4gTXVzdCBiZSBhbiBhcnJheSBvZiBvYmplY3RzIGZvbGxvd2luZyB0aGUgc3ludGF4OlxuICogICAgIFx0XHQ8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJTeW50YXg6XCI+XG4gKiAgICAgICAgICAgIFsgXG4gKiAgICAgICAgICAgICAgLy8gQW4gYW5ub3RhdGlvbjpcbiAqICAgICAgICAgICAgICB7IG5hbWU6ICZsdDtuYW1lJmd0OywgXG4gKiAgICAgICAgICAgICAgICBodG1sOiAmbHQ7bWVzc2FnZSZndDssIFxuICogICAgICAgICAgICAgICAgY29sb3I6ICZsdDtjb2xvcl9jb2RlJmd0OywgXG4gKiAgICAgICAgICAgICAgICByZWdpb25zOiBbeyBzdGFydDogJmx0O3N0YXJ0VmFsMSZndDssIGVuZDogJmx0O2VuZFZhbDEmZ3Q7IGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O30sIC4uLix7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDssIGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O31dIFxuICogICAgICAgICAgICAgIH0sIFxuICogICAgICAgICAgICAgIFxuICogICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICAgIC8vIG1vcmUgYW5ub3RhdGlvbnMgaGVyZSBcbiAqICAgICAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgICAgXVxuICogICAgXHRcdCA8L3ByZT5cbiAqICAgIHdoZXJlOlxuICogICAgICA8dWw+XG4gKiAgICAgICAgPGxpPjxiPm5hbWU8L2I+IGlzIHRoZSB1bmlxdWUgbmFtZSBmb3IgdGhlIGFubm90YXRpb248L2xpPlxuICogICAgICAgIDxsaT48Yj5odG1sPC9iPiBpcyB0aGUgbWVzc2FnZSAoY2FuIGJlIEhUTUwpIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdG9vbCB0aXAuPC9saT5cbiAqICAgICAgICA8bGk+PGI+Y29sb3I8L2I+IGlzIHRoZSBkZWZhdWx0IEhUTUwgY29sb3IgY29kZSBmb3IgYWxsIHRoZSByZWdpb25zLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnM8L2I+IGFycmF5IG9mIG9iamVjdHMgZGVmaW5pbmcgdGhlIGludGVydmFscyB3aGljaCBiZWxvbmdzIHRvIHRoZSBhbm5vdGF0aW9uLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnNbaV0uc3RhcnQ8L2I+IGlzIHRoZSBzdGFydGluZyBjaGFyYWN0ZXIgZm9yIHRoZSBpLXRoIGludGVydmFsLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnNbaV0uZW5kPC9iPiBpcyB0aGUgZW5kaW5nIGNoYXJhY3RlciBmb3IgdGhlIGktdGggaW50ZXJ2YWwuPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uc1tpXS5jb2xvcjwvYj4gaXMgYW4gb3B0aW9uYWwgY29sb3IgZm9yIHRoZSBpLXRoIGludGVydmFsLiAgIFxuICogICAgICA8L3VsPiBcbiAqICAgICAgXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtmb3JtYXRPcHRpb25zPXt0aXRsZTp0cnVlLCBmb290ZXI6dHJ1ZX1dIFxuICogXHQgIE9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgdGhlIHRpdGxlLiBieSBub3cganVzdCBhZmZlY3RpbmcgdGhlIENPREFUQSBmb3JtYXQuXG4gKiAgICA8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJTeW50YXg6XCI+IFxuICogXHRcdGZvcm1hdE9wdGlvbnMgOiB7XG4gKiBcdFx0XHR0aXRsZTpmYWxzZSxcbiAqIFx0XHRcdGZvb3RlcjpmYWxzZVxuICogXHRcdH1cbiAqICAgIDwvcHJlPlxuICogICAgXG4gKiBAZXhhbXBsZSBcbiAqIHZhciB0aGVTZXF1ZW5jZSA9IFwiTUVUTENRUkxOVkNRREtJTFRIWUVORFNURExSREhJRFlXS0hNUkxFQ0FJWVlLQVJFTUdGS0hJTkhRVlZQVExBVlNLTktBTFFBSUVMUUxUTEVUSVlOU1FZU05FS1dUTFFEVlNMRVZZTFRBUFRHQ0lLS0hHWVRWRVZRRkRHRElDTlRNSFlUTldUSElZSUNFRUFvanMgU1ZUVlZFR1FWRFlZR0xZWVZIRUdJUlRZRlZRRktEREFFS1lTS05LVldFVkhBR0dRVklMQ1BUU1ZGU1NORVZTU1BFSUlSUUhMQU5IUEFBVEhUS0FWQUxHVEVFVFFUVElRUlBSU0VQRFRHTlBDSFRUS0xMSFJEU1ZEU0FQSUxUQUZOU1NIS0dSSU5DTlNOVFRQSVZITEtHREFOVExLQ0xSWVJGS0tIQ1RMWVRBVlNTVFdIV1RHSE5WS0hLU0FJVlRMVFlEU0VXUVJEUUZMU1FWS0lQS1RJVFZTVEdGTVNJXCI7XG4gKiB2YXIgbXlTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZSh7XG4gKiBcdFx0c2VxdWVuY2UgOiB0aGVTZXF1ZW5jZSxcbiAqIFx0XHR0YXJnZXQgOiBcIllvdXJPd25EaXZJZFwiLFxuICogXHRcdGZvcm1hdCA6ICdDT0RBVEEnLFxuICogXHRcdGlkIDogJ1A5MTgyODMnLFxuICogXHRcdGFubm90YXRpb25zOiBbXG4gKiAgICAgICAgeyBuYW1lOlwiQ0FUSFwiLCBcbiAqIFx0ICBcdFx0Y29sb3I6XCIjRjBGMDIwXCIsIFxuICogXHQgIFx0XHRodG1sOiBcIlVzaW5nIGNvbG9yIGNvZGUgI0YwRjAyMCBcIiwgXG4gKiBcdCAgXHRcdHJlZ2lvbnM6IFt7c3RhcnQ6IDEyMiwgZW5kOiAxMzV9XVxuICogXHRcdCAgfSxcbiAqICAgICAgICB7IG5hbWU6XCJURVNUXCIsIFxuICogICAgICAgICAgaHRtbDpcIiZsdDticiZndDsgRXhhbXBsZSBvZiAmbHQ7YiZndDtIVE1MJmx0Oy9iJmd0O1wiLCBcbiAqICAgICAgICAgIGNvbG9yOlwiZ3JlZW5cIiwgXG4gKiAgICAgICAgICByZWdpb25zOiBbXG4gKiAgICAgICAgICAgIHtzdGFydDogMjg1LCBlbmQ6IDI5Mn0sXG4gKiAgICAgICAgICAgIHtzdGFydDogMjkzLCBlbmQ6IDMxNCwgY29sb3I6IFwiIzJFNDk4OFwifV1cbiAqICAgICAgICB9XG4gKiAgICAgIF0sXG4gKiAgICAgIGhpZ2hsaWdodHMgOiBbXG4gKiAgICAgIFx0eyBzdGFydDozMCwgZW5kOjQyLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJncmVlblwiLCBpZDpcInNwaW4xXCIgfSxcbiAqICAgICAgXHR7IHN0YXJ0OjEzOSwgZW5kOjE0MCB9LCBcbiAqICAgICAgXHR7IHN0YXJ0OjYzMSwgZW5kOjYzMywgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiYmx1ZVwiIH1cbiAqICAgICAgXVxuICogfSk7XHRcbiAqIFxuICovXG5cbnZhciBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSA9IFwic2VsZWN0aW9uLWNoYW5nZVwiO1xudmFyIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCA9IFwic2VsZWN0aW9uLWNoYW5nZWRcIjtcbnZhciBFVlRfT05fQU5OT1RBVElPTl9DTElDS0VEID0gXCJhbm5vdGF0aW9uLWNsaWNrZWRcIjtcblxudmFyIHJlbmRlcmVycyA9IHJlcXVpcmUoJy4vcmVuZGVyZXJzJyk7XG52YXIgTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsJyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnYmlvanMtZXZlbnRzJyk7XG52YXIgYXBwbHlTdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGUnKTtcblxuLyogQWxzbzogc2VxdWVuY2UsIGlkLCB3aWR0aCwgaGVpZ2h0ICovXG52YXIgREVGQVVMVFMgPSB7XG4gIGZvcm1hdCA6IFwiRkFTVEFcIixcbiAgc2VsZWN0aW9uOiB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSxcbiAgY29sb3VyZWRCYXNlczogZmFsc2UsXG4gIG51bUNvbHM6IDM1LFxuICBoaWdobGlnaHRzIDogW10sXG4gIGFubm90YXRpb25zOiBbXSxcbiAgc2VxdWVuY2VVcmw6ICdodHRwOi8vd3d3LmViaS5hYy51ay9kYXMtc3J2L3VuaXByb3QvZGFzL3VuaXByb3Qvc2VxdWVuY2UnLFxuICBmb3JtYXRTZWxlY3RvclZpc2libGU6IHRydWUsXG4gIGxvYWRTdHlsZTogdHJ1ZSwgLy8gTG9hZCBkZWZhdWx0IHN0eWxlcyBvbnRvIHRoZSBwYWdlLlxuXG4gIC8vIFN0cmluZ3NcbiAgbGFiZWxGb3JtYXQ6ICdGb3JtYXQnLFxuICBsYWJlbE51bUNvbHM6ICdDb2x1bW5zJyxcbiAgbGFiZWxDb2xvdXJlZEJhc2VzOiAnQ29sb3VyIEJhc2VzJyxcblxuICAvLyBDU1MgY2xhc3NlcyAtIGNhbiBiZSBvdmVycmlkZW4uXG4gIGNvbnRyb2xzQ2xhc3M6ICdmb3JtLWlubGluZScsXG4gIGNvbnRyb2xDbGFzczogJ2Zvcm0tZ3JvdXAnLFxuICBpbnB1dENsYXNzOiAnZm9ybS1jb250cm9sJyxcbiAgbGFiZWxDbGFzczogJ2Zvcm0tbGFiZWwnXG59O1xuXG4vKiogQGxlbmRzIFNlcXVlbmNlICoqL1xuU2VxdWVuY2UgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLl9jb250YWluZXIgPSBqUXVlcnkob3B0aW9ucy50YXJnZXQpO1xuICBpZiAodGhpcy5fY29udGFpbmVyLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGpRdWVyeSgnIycgKyBvcHRpb25zLnRhcmdldCk7XG4gIH1cbiAgdGhpcy5vcHRpb25zID0gbmV3IE1vZGVsKG9wdGlvbnMsIERFRkFVTFRTKTtcblxuICB0aGlzLl9pbml0aWFsaXplKCk7XG59O1xuXG4vKiogUHJvdmlkZXMgb24sIG9mZiwgb25jZSwgdHJpZ2dlciAqKi9cbkV2ZW50cy5taXhpbihTZXF1ZW5jZS5wcm90b3R5cGUpO1xuXG4vKipcbiAgKiBBcnJheSBjb250YWluaW5nIHRoZSBzdXBwb3J0ZWQgZXZlbnQgbmFtZXNcbiAgKiBAbmFtZSBTZXF1ZW5jZS1ldmVudFR5cGVzXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuZXZlbnRUeXBlcyA9IFtcblxuICAvKipcbiAgICAqIEBuYW1lIFNlcXVlbmNlI29uU2VsZWN0aW9uQ2hhbmdlZFxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhY3Rpb25QZXJmb3JtZWQgQW4gZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgYW4ge0BsaW5rIEJpb2pzLkV2ZW50fSBvYmplY3QgYXMgYXJndW1lbnQuXG4gICAgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuICAgICogQGV2ZW50RGF0YSB7c3RyaW5nfSB0eXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAgICAqIEBldmVudERhdGEge2ludH0gc3RhcnQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgc3RhcnQgb2YgdGhlIHNlbGVjdGlvbi5cbiAgICAqIEBldmVudERhdGEge2ludH0gZW5kIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIGVuZGluZyBvZiBzZWxlY3Rpb24uXG4gICAgKiBAZXhhbXBsZSBcbiAgICAqIG15U2VxdWVuY2Uub25TZWxlY3Rpb25DaGFuZ2VkKFxuICAgICogICAgZnVuY3Rpb24oIG9iakV2ZW50ICkge1xuICAgICogICAgICAgYWxlcnQoXCJTZWxlY3RlZDogXCIgKyBvYmpFdmVudC5zdGFydCArIFwiLCBcIiArIG9iakV2ZW50LmVuZCApO1xuICAgICogICAgfVxuICAgICogKTsgXG4gICAgKiBcbiAgICAqICovXG4gIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCxcbiAgXG4gIC8qKlxuICAgICogQG5hbWUgU2VxdWVuY2Ujb25TZWxlY3Rpb25DaGFuZ2VcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uUGVyZm9ybWVkIEFuIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGFuIHtAbGluayBCaW9qcy5FdmVudH0gb2JqZWN0IGFzIGFyZ3VtZW50LlxuICAgICogQGV2ZW50RGF0YSB7T2JqZWN0fSBzb3VyY2UgVGhlIGNvbXBvbmVudCB3aGljaCBkaWQgdHJpZ2dlcmVkIHRoZSBldmVudC5cbiAgICAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gICAgKiBAZXZlbnREYXRhIHtpbnR9IHN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24uXG4gICAgKiBAZXZlbnREYXRhIHtpbnR9IGVuZCBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBlbmRpbmcgb2Ygc2VsZWN0aW9uLlxuICAgICogQGV4YW1wbGUgXG4gICAgKiBteVNlcXVlbmNlLm9uU2VsZWN0aW9uQ2hhbmdlKFxuICAgICogICAgZnVuY3Rpb24oIG9iakV2ZW50ICkge1xuICAgICogICAgICAgYWxlcnQoXCJTZWxlY3Rpb24gaW4gcHJvZ3Jlc3M6IFwiICsgb2JqRXZlbnQuc3RhcnQgKyBcIiwgXCIgKyBvYmpFdmVudC5lbmQgKTtcbiAgICAqICAgIH1cbiAgICAqICk7ICBcbiAgICAqIFxuICAgICogXG4gICAgKiAqL1xuICBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSxcblx0XHRcbiAgLyoqXG4gICAgKiBAbmFtZSBTZXF1ZW5jZSNvbkFubm90YXRpb25DbGlja2VkXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cbiAgICAqIEBldmVudERhdGEge09iamVjdH0gc291cmNlIFRoZSBjb21wb25lbnQgd2hpY2ggZGlkIHRyaWdnZXJlZCB0aGUgZXZlbnQuXG4gICAgKiBAZXZlbnREYXRhIHtzdHJpbmd9IHR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICAgICogQGV2ZW50RGF0YSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZWxlY3RlZCBhbm5vdGF0aW9uLlxuICAgICogQGV2ZW50RGF0YSB7aW50fSBwb3MgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIGFtaW5vIGFjaWQuXG4gICAgKiBAZXhhbXBsZSBcbiAgICAqIG15U2VxdWVuY2Uub25Bbm5vdGF0aW9uQ2xpY2tlZChcbiAgICAqICAgIGZ1bmN0aW9uKCBvYmpFdmVudCApIHtcbiAgICAqICAgICAgIGFsZXJ0KFwiQ2xpY2tlZCBcIiArIG9iakV2ZW50Lm5hbWUgKyBcIiBvbiBwb3NpdGlvbiBcIiArIG9iakV2ZW50LnBvcyApO1xuICAgICogICAgfVxuICAgICogKTsgIFxuICAgICogXG4gICAgKiAqL1xuICBFVlRfT05fQU5OT1RBVElPTl9DTElDS0VEXG5dO1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuZ2V0SWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm9wdC5pZDtcbn07XG5cbnZhciBUT09MVElQX1NUWUxFID0ge1xuICAncG9zaXRpb24nOiBcImFic29sdXRlXCIsXG4gICd6LWluZGV4JzogXCI5OTk5OTlcIixcbiAgJ2NvbG9yJzogXCIjZmZmXCIsXG4gICdmb250LXNpemUnOiBcIjEycHhcIixcbiAgJ3dpZHRoJzogXCJhdXRvXCIsXG4gICdkaXNwbGF5JzogJ25vbmUnXG59O1xuXG5cdC8vIE1ldGhvZHNcblNlcXVlbmNlLnByb3RvdHlwZS5faW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5fYXBwZW5kU3R5bGUoKTtcblx0XHRcbiAgWyd3aWR0aCcsJ2hlaWdodCddLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdmFsID0gc2VsZi5vcHRpb25zLmdldChwcm9wKTtcbiAgICBpZiAodmFsID4gMCkge1xuICAgICAgc2VsZi5fY29udGFpbmVyW3Byb3BdKHZhbCk7XG4gICAgfVxuICB9KTtcbiAgXG4gIC8vIERpc2FibGUgdGV4dCBzZWxlY3Rpb25cbiAgdGhpcy5fY29udGFpbmVyLnRvZ2dsZUNsYXNzKCduby11c2VyLXNlbGVjdGlvbicsICF0aGlzLm9wdGlvbnMuZ2V0KCdhbGxvd1NlbGVjdGlvbicpKTtcblxuICAvLyBESVYgZm9yIHRoZSBmb3JtYXQgc2VsZWN0b3JcbiAgdGhpcy5fYnVpbGRGb3JtYXRTZWxlY3RvcigpO1xuXHRcdFxuICAvLyBESVYgZm9yIHRoZSBzZXF1ZW5jZVxuICB0aGlzLl9jb250ZW50RGl2ID0galF1ZXJ5KCc8ZGl2PicpLmFkZENsYXNzKCdzZXF1ZW5jZS1jb250ZW50JykuYXBwZW5kVG8odGhpcy5fY29udGFpbmVyKTtcblx0XHRcbiAgLy9Jbml0aWFsaXplIHRvb2x0aXBcbiAgdGhpcy5fdG9vbHRpcCA9IGpRdWVyeSgnPGRpdj4nKVxuICAgICAgICAuY3NzKFRPT0xUSVBfU1RZTEUpXG4gICAgICAgIC5hZGRDbGFzcyhcInRvb2x0aXBcIilcbiAgICAgICAgLmFwcGVuZFRvKFwiYm9keVwiKVxuICAgICAgICAuaGlkZSgpO1xuXG4gIHRoaXMuX2JpbmRFdmVudHMoKTtcblxuICB0aGlzLl9ydW4oKTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5fcnVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmhhcygnc2VxdWVuY2UnKSkge1xuICAgIHRoaXMub3B0aW9ucy50cmlnZ2VyKCdjaGFuZ2U6Zm9ybWF0Jyk7IC8vIEJlZ2luIHRoZSByZW5kZXIgY3ljbGUuXG4gIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmhhcygnaWQnKSkge1xuICAgIHRoaXMuX3JlcXVlc3RTZXF1ZW5jZSh0aGlzLmdldElkKCkpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY2xlYXJTZXF1ZW5jZShcIk5vIHNlcXVlbmNlIGF2YWlsYWJsZVwiLCBcIi4uL2Jpb2pzL2Nzcy9pbWFnZXMvd2FybmluZ19pY29uLnBuZ1wiKTtcbiAgfVxufTtcblxuU2VxdWVuY2UucHJvdG90eXBlLl9iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByZWRyYXcgPSBmdW5jdGlvbiAoKSB7IHNlbGYuX3JlZHJhdygpOyB9O1xuICB2YXIgc2V0UmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vcHRpb25zLnNldCh7cmVuZGVyZXI6IF9idWlsZFJlbmRlcmVyLmNhbGwoc2VsZil9KTtcbiAgfTtcblxuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpmb3JtYXQnLCBzZXRSZW5kZXJlcik7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmNvbG91cmVkQmFzZXMnLCBzZXRSZW5kZXJlcik7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOm51bUNvbHMnLCBzZXRSZW5kZXJlcik7XG5cbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6c2VxdWVuY2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vcHRpb25zLnNldCh7aGlnaGxpZ2h0czogW10sIGFubm90YXRpb25zOiBbXX0sIHtzaWxlbnQ6IHRydWV9KTtcbiAgICBzZWxmLnNldFNlbGVjdGlvbigwLCAwKTtcbiAgfSk7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmhpZ2hsaWdodHMnLCByZWRyYXcpO1xuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTphbm5vdGF0aW9ucycsIHJlZHJhdyk7XG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmlkJywgcmVkcmF3KTtcbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6cmVuZGVyZXInLCByZWRyYXcpO1xuICB0aGlzLm9wdGlvbnMub24oJ2NoYW5nZTpzZXF1ZW5jZScsIHJlZHJhdyk7XG5cbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6c2VsZWN0aW9uJywgZnVuY3Rpb24gKHNlbCkge1xuICAgIHNlbGYudHJpZ2dlcihFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQsIHNlbCk7XG4gIH0pO1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmFsbG93U2VsZWN0aW9uJywgZnVuY3Rpb24gKGFsbG93ZWQpIHtcbiAgICBzZWxmLl9jb250YWluZXIudG9nZ2xlQ2xhc3MoJ25vLXVzZXItc2VsZWN0aW9uJywgIWFsbG93ZWQpO1xuICB9KTtcblxuICB0aGlzLl9jb250ZW50RGl2Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgc2VsZi5zdGFydFNlbGVjdGluZygpO1xuICB9KTtcbiAgdGhpcy5fY29udGVudERpdi5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBzZWxmLnN0b3BTZWxlY3RpbmcoKTtcbiAgfSk7XG4gIHRoaXMuX2NvbnRlbnREaXYub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgc2VsZi5zdG9wU2VsZWN0aW5nKCk7XG4gIH0pO1xufTtcblxudmFyIElDT05fV0FSTiA9IFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCI7XG5cdFxuU2VxdWVuY2UucHJvdG90eXBlLl9yZXF1ZXN0U2VxdWVuY2UgPSBmdW5jdGlvbiAoIGFjY2Vzc2lvbiApIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGpRdWVyeS5hamF4KHsgXG4gICAgdXJsOiB0aGlzLm9wdGlvbnMuZ2V0KCdzZXF1ZW5jZVVybCcpLFxuICAgIGRhdGFUeXBlOiBcInhtbFwiLFxuICAgIGRhdGE6IHsgc2VnbWVudDogYWNjZXNzaW9uIH0sXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHhtKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbm9kZSA9IGpRdWVyeSh4bWwpLmZpbmQoJ1NFUVVFTkNFOmZpcnN0Jyk7XG4gICAgICAgIHNlbGYuc2V0U2VxdWVuY2UoIG5vZGUudGV4dCgpLCBub2RlLmF0dHIoXCJpZFwiKSwgbm9kZS5hdHRyKFwibGFiZWxcIikgKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkZWNvZGluZyByZXNwb25zZSBkYXRhOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgIHNlbGYuY2xlYXJTZXF1ZW5jZShcIk5vIHNlcXVlbmNlIGF2YWlsYWJsZVwiLCBJQ09OX1dBUk4pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZGVjb2RpbmcgcmVzcG9uc2UgZGF0YTogXCIgKyB0ZXh0U3RhdHVzKTtcbiAgICAgIHNlbGYuY2xlYXJTZXF1ZW5jZShcIkVycm9yIHJlcXVlc3RpbmcgdGhlIHNlcXVlbmNlIHRvIHRoZSBzZXJ2ZXIgXCIgKyB0aGlzLnVybCAsIElDT05fV0FSTik7XG4gICAgfVxuICB9KTtcbn07XG5cdFxuLyoqXG4gICogU2hvd3MgdGhlIGNvbHVtbnMgaW5kaWNhdGVkIGJ5IHRoZSBpbmRleGVzIGFycmF5LlxuICAqIEBwYXJhbSB7c3RyaW5nfSBzZXEgVGhlIHNlcXVlbmNlIHN0cmFuZC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gW2lkZW50aWZpZXJdIFNlcXVlbmNlIGlkZW50aWZpZXIuXG4gICogXG4gICogQGV4YW1wbGUgXG4gICogbXlTZXF1ZW5jZS5zZXRTZXF1ZW5jZShcIlA5OTk5OVwiKTtcbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zZXRTZXF1ZW5jZSA9IGZ1bmN0aW9uICggc2VxLCBpZGVudGlmaWVyICkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHRoaXMuX3JlcXVlc3RTZXF1ZW5jZSggYXJndW1lbnRzWzBdICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5vcHRpb25zLnNldCh7c2VxdWVuY2U6IHNlcSwgaWQ6IGlkZW50aWZpZXJ9KTtcbiAgfVxufTtcbiAgICBcblx0XG4vKipcbiAqIFNob3dzIHRoZSBjb2x1bW5zIGluZGljYXRlZCBieSB0aGUgaW5kZXhlcyBhcnJheS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2hvd01lc3NhZ2VdIE1lc3NhZ2UgdG8gYmUgc2hvd24uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ljb25dIEljb24gdG8gYmUgc2hvd2VkIGEgc2lkZSBvZiB0aGUgbWVzc2FnZVxuICogXG4gKiBAZXhhbXBsZSBcbiAqIG15U2VxdWVuY2UuY2xlYXJTZXF1ZW5jZShcIk5vIHNlcXVlbmNlIGF2YWlsYWJsZVwiLCBcIi4uL2Jpb2pzL2Nzcy9pbWFnZXMvd2FybmluZ19pY29uLnBuZ1wiKTtcbiAqIFxuICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuY2xlYXJTZXF1ZW5jZSA9IGZ1bmN0aW9uICggc2hvd01lc3NhZ2UsIGljb24gKSB7XG5cbiAgdmFyIG1lc3NhZ2U7XG5cbiAgdGhpcy5zZXRTZXF1ZW5jZSgnJywgJycpO1xuXG4gIGlmIChzaG93TWVzc2FnZSkge1xuICAgIG1lc3NhZ2UgPSBqUXVlcnkoJzxkaXY+JylcbiAgICAgIC50ZXh0KHNob3dNZXNzYWdlKVxuICAgICAgLmFkZENsYXNzKFwibWVzc2FnZVwiKTtcblxuICAgIGlmICggaWNvbiApIHtcbiAgICAgIG1lc3NhZ2UuY3NzKHtcbiAgICAgICAgJ2JhY2tncm91bmQnOiAndHJhbnNwYXJlbnQgdXJsKFwiJyArIGljb24gKyAnXCIpIG5vLXJlcGVhdCBjZW50ZXIgbGVmdCcsXG4gICAgICAgICdwYWRkaW5nLWxlZnQnOiAnMjBweCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9jb250ZW50RGl2Lmh0bWwobWVzc2FnZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fY29udGVudERpdi5lbXB0eSgpO1xuICB9XG59O1xuXHRcbi8qKlxuICAqIFNldCB0aGUgY3VycmVudCBzZWxlY3Rpb24gaW4gdGhlIHNlcXVlbmNlIGNhdXNpbmcgdGhlIGV2ZW50IHtAbGluayBTZXF1ZW5jZSNvblNlbGVjdGlvbkNoYW5nZWR9XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIC8vIHNldCBzZWxlY3Rpb24gZnJvbSB0aGUgcG9zaXRpb24gMTAwIHRvIDE1MCBcbiAgKiBteVNlcXVlbmNlLnNldFNlbGVjdGlvbigxMDAsIDE1MCk7XG4gICogXG4gICogQHBhcmFtIHtpbnR9IHN0YXJ0IFRoZSBzdGFydGluZyBjaGFyYWN0ZXIgb2YgdGhlIHNlbGVjdGlvbi5cbiAgKiBAcGFyYW0ge2ludH0gZW5kIFRoZSBlbmRpbmcgY2hhcmFjdGVyIG9mIHRoZSBzZWxlY3Rpb25cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zZXRTZWxlY3Rpb24gPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIC8vIEFsbG93IGludmVyc2lvbi5cbiAgaWYgKHN0YXJ0ID4gZW5kKSB7XG4gICAgdmFyIHRlbXAgPSBlbmQ7XG4gICAgZW5kID0gc3RhcnQ7XG4gICAgc3RhcnQgPSB0ZW1wO1xuICB9XG4gIHRoaXMub3B0aW9ucy5zZXQoe3NlbGVjdGlvbjoge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9fSk7XG59O1xuXG4vLyBCYXNlIHBhbGV0dGU6IGh0dHA6Ly9wYWxldHRvbi5jb20vI3VpZD03MHAwSzBraUNGbjhHVmRlN05WbXR3U3FYdGdcbnZhciBSVUxFUyA9IFtcbiAgJy5zZXEtYmFzZS5hZGVuaW5lIHtiYWNrZ3JvdW5kOiAjNjU2Y2NhOyBjb2xvcjogd2hpdGU7fScsXG4gICcuc2VxLWJhc2UuY3l0b3NpbmUge2JhY2tncm91bmQ6ICNmZmQ3NmI7IGNvbG9yOiAjOEE2RjI1O30nLFxuICAnLnNlcS1iYXNlLmd1YW5pbmUge2JhY2tncm91bmQ6ICM1MGMwYWQ7IGNvbG9yOiB3aGl0ZTt9JyxcbiAgJy5zZXEtYmFzZS50aHltaW5lIHtiYWNrZ3JvdW5kOiAjZmZhNzZiOyBjb2xvcjogI0E3NkM0NTt9JyxcbiAgJy5zZXEtYmFzZS5pbmZvLCAuaW50ZXJiYXNlLmluZm8ge2JhY2tncm91bmQ6ICM0MDkwZjc7IGNvbG9yOiB3aGl0ZTt9JyxcbiAgJy5zZXF1ZW5jZS1jb250ZW50IHtmb250LWZhbWlseTogXCJBbmRhbGUgbW9ub1wiLCBjb3VyaWVyLCBtb25vc3BhY2U7IGZvbnQtc2l6ZTogMTJweDsgdGV4dC1hbGlnbjogbGVmdDt9JyxcbiAgJy5zZXF1ZW5jZS1jb250cm9scyB7Zm9udC1mYW1pbHk6IFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIFwic2FucyBzZXJpZlwiOyBmb250LXNpemU6IDE0cHh9JyxcbiAgJy5uby11c2VyLXNlbGVjdGlvbiB7LW1vei11c2VyLXNlbGVjdDogbm9uZTsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7fScsXG4gICcuc2VxLWJhc2Uuc2VsZWN0aW9uLCAuaW50ZXJiYXNlLnNlbGVjdGlvbiB7YmFja2dyb3VuZDogeWVsbG93OyBjb2xvcjogYmxhY2s7fScsXG5dO1xuXG4vKipcbiAqIEFwcGx5IHRoZSBzdHlsZSB0byB0aGUgZG9jdW1lbnQuXG4gKi9cblNlcXVlbmNlLnByb3RvdHlwZS5fYXBwZW5kU3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjc3MsIGhlYWQsIHN0eWxlc2hlZXQ7XG4gIGlmICghdGhpcy5vcHRpb25zLmdldCgnbG9hZFN0eWxlJykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY3NzID0gUlVMRVMuam9pbignXFxuJyk7XG4gIGFwcGx5U3R5bGUoY3NzLCBkb2N1bWVudCk7XG59XG5cbi8qKlxuICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgZGlzcGxheWluZyBmb3JtYXQgb2YgdGhlIHNlcXVlbmNlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvLyBTZXQgZm9ybWF0IHRvICdGQVNUQScuXG4gICogbXlTZXF1ZW5jZS5zZXRGb3JtYXQoJ0ZBU1RBJyk7XG4gICogXG4gICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdCBUaGUgZm9ybWF0IGZvciB0aGUgc2VxdWVuY2UgdG8gYmUgZGlzcGxheWVkLlxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnNldEZvcm1hdCA9IGZ1bmN0aW9uKGZvcm1hdCkge1xuICBpZiAoIWZvcm1hdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImFyZ3VtZW50IGlzIHJlcXVpcmVkOiBmb3JtYXRcIik7XG4gIH1cbiAgdGhpcy5vcHRpb25zLnNldCh7Zm9ybWF0OiBTdHJpbmcoZm9ybWF0KS50b1VwcGVyQ2FzZSgpfSk7IFxufTtcblxuZnVuY3Rpb24gcmVuZGVyRm9ybWF0U2VsZWN0b3IgKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBzZWxlY3RvciA9IGpRdWVyeSgnPHNlbGVjdD4gJytcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiRkFTVEFcIj5GQVNUQTwvb3B0aW9uPicrXG4gICAgICAnPG9wdGlvbiB2YWx1ZT1cIkNPREFUQVwiPkNPREFUQTwvb3B0aW9uPicrXG4gICAgICAnPG9wdGlvbiB2YWx1ZT1cIlBSSURFXCI+UFJJREU8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCJSQVdcIj5SQVc8L29wdGlvbj48L3NlbGVjdD4nKTtcblxuICBzZWxlY3Rvci52YWwoc2VsZi5vcHRpb25zLmdldCgnZm9ybWF0JykpO1xuXG4gIHNlbGVjdG9yLmNoYW5nZShmdW5jdGlvbihlKSB7XG4gICAgc2VsZi5zZXRGb3JtYXQoalF1ZXJ5KHRoaXMpLnZhbCgpKTtcbiAgfSk7XG5cbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6Zm9ybWF0JywgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHNlbGVjdG9yLnZhbChmb3JtYXQpO1x0XG4gIH0pO1xuXG4gIHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyV2lkdGhTZWxlY3RvciAoKSB7XG4gIHZhciBzZWxmID0gdGhpcywgc2VsZWN0b3IgPSBqUXVlcnkoJzxzZWxlY3Q+JyArIFxuICAgICAgJzxvcHRpb24gdmFsdWU9XCIxMFwiPjEwPC9vcHRpb24+JytcbiAgICAgICc8b3B0aW9uIHZhbHVlPVwiMzVcIj4zNTwvb3B0aW9uPicrXG4gICAgICAnPG9wdGlvbiB2YWx1ZT1cIjcwXCI+NzA8L29wdGlvbj4nK1xuICAgICAgJzxvcHRpb24gdmFsdWU9XCIxMDBcIj4xMDA8L29wdGlvbj48L3NlbGVjdD4nKTtcblxuICBzZWxlY3Rvci52YWwoU3RyaW5nKHRoaXMub3B0aW9ucy5nZXQoJ251bUNvbHMnKSkpO1xuXG4gIHNlbGVjdG9yLmNoYW5nZShmdW5jdGlvbihlKSB7XG4gICAgc2VsZi5vcHRpb25zLnNldCh7bnVtQ29sczogcGFyc2VJbnQoalF1ZXJ5KHRoaXMpLnZhbCgpLCAxMCl9KTtcbiAgfSk7XG5cbiAgdGhpcy5vcHRpb25zLm9uKCdjaGFuZ2U6bnVtQ29scycsIGZ1bmN0aW9uIChudW0pIHtcbiAgICBzZWxlY3Rvci52YWwoU3RyaW5nKG51bSkpO1x0XG4gIH0pO1xuXG4gIHJldHVybiBzZWxlY3RvcjtcblxufVxuXG5mdW5jdGlvbiByZW5kZXJCYXNlQ29sb3VyVG9nZ2xlICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzLCB0b2dnbGU7XG5cbiAgdG9nZ2xlID0galF1ZXJ5KCc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+Jyk7XG5cbiAgdG9nZ2xlLnByb3AoJ2NoZWNrZWQnLCAhIXRoaXMub3B0aW9ucy5nZXQoJ2NvbG91cmVkQmFzZXMnKSk7XG5cbiAgdG9nZ2xlLmNoYW5nZShmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYub3B0aW9ucy5zZXQoe2NvbG91cmVkQmFzZXM6IHRvZ2dsZS5wcm9wKCdjaGVja2VkJyl9KTtcbiAgfSk7XG5cbiAgc2VsZi5vcHRpb25zLm9uKCdjaGFuZ2U6Y29sb3VyZWRCYXNlcycsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRvZ2dsZS5wcm9wKCdjaGVja2VkJywgdmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gdG9nZ2xlO1xufVxuXG5mdW5jdGlvbiBtYWtlQ29udHJvbEdyb3VwIChvcHRpb25zLCBsYWJlbEtleSwgJGNvbnRyb2wpIHtcbiAgdmFyICRncm91cCA9IGpRdWVyeSgnPGRpdj4nKS5hZGRDbGFzcyhvcHRpb25zLmdldCgnY29udHJvbENsYXNzJykpO1xuICB2YXIgJGxhYmVsID0galF1ZXJ5KCc8bGFiZWw+JykuYWRkQ2xhc3Mob3B0aW9ucy5nZXQoJ2xhYmVsQ2xhc3MnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQob3B0aW9ucy5nZXQobGFiZWxLZXkpKTtcbiAgb3B0aW9ucy5vbignY2hhbmdlOicgKyBsYWJlbEtleSwgZnVuY3Rpb24gKG5ld0xhYmVsKSB7XG4gICAgJGxhYmVsLnRleHQobmV3TGFiZWwpO1xuICB9KTtcbiAgJGNvbnRyb2wuYWRkQ2xhc3Mob3B0aW9ucy5nZXQoJ2lucHV0Q2xhc3MnKSk7XG4gIGlmICgkY29udHJvbC5pcygnW3R5cGU9XCJjaGVja2JveFwiXScpKSB7XG4gICAgcmV0dXJuIGpRdWVyeSgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+JykuYXBwZW5kKCRsYWJlbC5wcmVwZW5kKCRjb250cm9sKSk7XG4gIH0gZWxzZSB7XG4gICAgJGdyb3VwLmFwcGVuZCgkbGFiZWwpO1xuICAgICRncm91cC5hcHBlbmQoJGNvbnRyb2wpO1xuICB9XG4gIHJldHVybiAkZ3JvdXA7XG59XG5cdFxuU2VxdWVuY2UucHJvdG90eXBlLl9idWlsZEZvcm1hdFNlbGVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXMsIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsIGhlYWRlcjtcbiAgXG4gIHRoaXMuX2hlYWRlckRpdiA9IGhlYWRlciA9IGpRdWVyeSgnPGZvcm0+JylcbiAgICAuYWRkQ2xhc3MoJ3NlcXVlbmNlLWNvbnRyb2xzJylcbiAgICAuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmdldCgnY29udHJvbHNDbGFzcycpKVxuICAgIC5hcHBlbmRUbyh0aGlzLl9jb250YWluZXIpO1xuXG4gIGhlYWRlci5hcHBlbmQobWFrZUNvbnRyb2xHcm91cChvcHRpb25zLCAnbGFiZWxGb3JtYXQnLFxuICAgIHRoaXMuX2Zvcm1hdFNlbGVjdG9yID0gcmVuZGVyRm9ybWF0U2VsZWN0b3IuY2FsbCh0aGlzKSkpO1xuXG4gIGhlYWRlci5hcHBlbmQobWFrZUNvbnRyb2xHcm91cChvcHRpb25zLCAnbGFiZWxOdW1Db2xzJyxcbiAgICB0aGlzLl9jb2x1bW5XaWR0aFNlbGVjdG9yID0gcmVuZGVyV2lkdGhTZWxlY3Rvci5jYWxsKHRoaXMpKSk7XG5cbiAgaGVhZGVyLmFwcGVuZChtYWtlQ29udHJvbEdyb3VwKG9wdGlvbnMsICdsYWJlbENvbG91cmVkQmFzZXMnLFxuICAgIHJlbmRlckJhc2VDb2xvdXJUb2dnbGUuY2FsbCh0aGlzKSkpO1xuXG4gIHRoaXMub3B0aW9ucy5vbignY2hhbmdlOmZvcm1hdFNlbGVjdG9yVmlzaWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLl9oZWFkZXJEaXYudG9nZ2xlKHNlbGYub3B0aW9ucy5nZXQoJ2Zvcm1hdFNlbGVjdG9yVmlzaWJsZScpKTtcbiAgfSk7XG4gIHNlbGYuX2hlYWRlckRpdi50b2dnbGUoc2VsZi5vcHRpb25zLmdldCgnZm9ybWF0U2VsZWN0b3JWaXNpYmxlJykpO1xufTtcblx0XG4vKipcbiAgKiBIaWdobGlnaHRzIGEgcmVnaW9uIHVzaW5nIHRoZSBmb250IGNvbG9yIGRlZmluZWQgaW4ge0Jpb2pzLlByb3RlaW4zRCNoaWdobGlnaHRGb250Q29sb3J9IGJ5IGRlZmF1bHQgaXMgcmVkLlxuICAqXG4gICogQGRlcHJlY2F0ZWQgdXNlIGFkZEhpZ2hsaWdodCBpbnN0ZWFkLlxuICAqIFxuICAqIEBwYXJhbSB7aW50fSBzdGFydCBUaGUgc3RhcnRpbmcgY2hhcmFjdGVyIG9mIHRoZSBoaWdobGlnaHRpbmcuXG4gICogQHBhcmFtIHtpbnR9IGVuZCBUaGUgZW5kaW5nIGNoYXJhY3RlciBvZiB0aGUgaGlnaGxpZ2h0aW5nLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV0gVGhlIHR5cGUgb2YgaGlnaGxpZ2h0IC0gb25lIG9mICdzZWxlY3Rpb24nLCAnaW5mbycsICd3YXJuaW5nJyxcbiAgKiAgICAgICAgICAgICAgICAgJ2Vycm9yJywgb3IgYW55IGN1c3RvbSB2YWx1ZS4gQXBwcm9wcmlhdGUgQ1NTIGNsYXNzZXMgd2lsbCBiZSBhZGRlZC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gW2lkXSBDdXN0b20gaWRlbnRpZmllci5cbiAgKiBcbiAgKiBAcmV0dXJuIHtpbnR9IHJlcHJlc2VudGluZyB0aGUgaWQgb2YgdGhlIGhpZ2hsaWdodCBvbiB0aGUgaW50ZXJuYWwgYXJyYXkuIFJldHVybnMgLTEgb24gZmFpbHVyZSAgXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuaGlnaGxpZ2h0ID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHR5cGUsIGlkICkge1xuICByZXR1cm4gdGhpcy5hZGRIaWdobGlnaHQoe1xuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBlbmQ6IGVuZCxcbiAgICBraW5kOiB0eXBlLFxuICAgIGlkOiBpZFxuICB9KTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5faGlnaGxpZ2h0c0NvdW50ID0gMDtcblx0XG4vKipcbiAgKiBIaWdobGlnaHRzIGEgcmVnaW9uIHVzaW5nIHRoZSBmb250IGNvbG9yIGRlZmluZWQgaW4ge1NlcXVlbmNlI2hpZ2hsaWdodEZvbnRDb2xvcn0gYnkgZGVmYXVsdCBpcyByZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIC8vIGhpZ2hsaWdodCB0aGUgY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAsIGluY2x1ZGVkLlxuICAqIG15U2VxdWVuY2UuYWRkSGlnaGxpZ2h0KCB7IFwic3RhcnRcIjogMTAwLCBcImVuZFwiOiAxNTAsIFwiY29sb3JcIjogXCJ3aGl0ZVwiLCBcImJhY2tncm91bmRcIjogXCJyZWRcIiwgXCJpZFwiOiBcImFhYVwiIH0gKTtcbiAgKiBcbiAgKiBAcGFyYW0ge09iamVjdH0gaCBUaGUgaGlnaGxpZ2h0IGRlZmluZWQgYXMgZm9sbG93czpcbiAgKiBcdFxuICAqIFxuICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIChwb3NzaWJseSBnZW5lcmF0ZWQpIGlkIG9mIHRoZSBhZGRlZCBoaWdobGlnaHQuIG51bGwgaWYgbm90IGFkZGVkLlxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmFkZEhpZ2hsaWdodCA9IGZ1bmN0aW9uICggaCApIHtcbiAgdmFyIGlkLCBraW5kLCBoaWdobGlnaHQsIGhpZ2hsaWdodHMgPSB0aGlzLm9wdGlvbnMuZ2V0KCdoaWdobGlnaHRzJyk7XG4gIFxuICBpZiAoICFoIHx8IGguc3RhcnQgPiBoLmVuZCApIHJldHVybiBudWxsO1xuICAgIFxuICBraW5kID0gKGgua2luZCB8fCAnaW5mbycpO1xuICBpZCA9ICggXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGguaWQgKSA/IGguaWQgOiBTdHJpbmcodGhpcy5faGlnaGxpZ2h0c0NvdW50KyspO1xuICBcbiAgaGlnaGxpZ2h0ID0ge1xuICAgIHN0YXJ0OiBoLnN0YXJ0LFxuICAgIGVuZDogaC5lbmQsXG4gICAga2luZDoga2luZCxcbiAgICBpZDogaWRcbiAgfTtcblxuICBoaWdobGlnaHRzID0gaGlnaGxpZ2h0cy5jb25jYXQoW2hpZ2hsaWdodF0pO1xuXG4gIHRoaXMub3B0aW9ucy5zZXQoe2hpZ2hsaWdodHM6IGhpZ2hsaWdodHN9KTtcbiAgXG4gIHJldHVybiBoaWdobGlnaHQuaWQ7XG59O1xuXG4vKipcbiAgKiBDbGVhciBhIGhpZ2hsaWdodGVkIHJlZ2lvbiB1c2luZy5cbiAgKlxuICAqIEBkZXByZWNhdGVkIHVzZSByZW1vdmVIaWdobGlnaHQgaW5zdGVhZC5cbiAgKiBcbiAgKiBAcGFyYW0ge2ludH0gaWQgVGhlIGlkIG9mIHRoZSBoaWdobGlnaHQgb24gdGhlIGludGVybmFsIGFycmF5LiBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGJ5IG1ldGhvZCBoaWdobGlnaHQuXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUudW5IaWdobGlnaHQgPSBmdW5jdGlvbiAoaWQpIHtcdFxuICB0aGlzLnJlbW92ZUhpZ2hsaWdodChpZCk7XG59O1xuXHRcbi8qKlxuICAqIFJlbW92ZSBhIGhpZ2hsaWdodC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogLy8gQ2xlYXIgdGhlIGhpZ2hsaWdodGVkIGNoYXJhY3RlcnMgd2l0aGluIHRoZSBwb3NpdGlvbiAxMDAgdG8gMTUwLCBpbmNsdWRlZC5cbiAgKiBteVNlcXVlbmNlLnJlbW92ZUhpZ2hsaWdodChcInNwaW4xXCIpO1xuICAqIFxuICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGhpZ2hsaWdodCBvbiB0aGUgaW50ZXJuYWwgYXJyYXkuIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgYnkgbWV0aG9kIGhpZ2hsaWdodC5cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5yZW1vdmVIaWdobGlnaHQgPSBmdW5jdGlvbiAoaWQpIHtcdFxuICB0aGlzLm9wdGlvbnMuc2V0KHtoaWdobGlnaHRzOiB0aGlzLm9wdGlvbnMuZ2V0KCdoaWdobGlnaHRzJykuZmlsdGVyKGZ1bmN0aW9uIChobCkge1xuICAgIHJldHVybiBobC5pZCAhPT0gaWQ7XG4gIH0pfSk7XG59O1xuXHRcbi8qKlxuICAqIENsZWFyIHRoZSBoaWdobGlnaHRzIG9mIHdob2xlIHNlcXVlbmNlLlxuICAqIEBkZXByZWNhdGVkIHVzZSByZW1vdmVBbGxIaWdobGlnaHRzIGluc3RlYWQuXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUudW5IaWdobGlnaHRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVtb3ZlQWxsSGlnaGxpZ2h0cygpO1xufTtcblx0XG4vKipcbiAgKiBSZW1vdmUgYWxsIHRoZSBoaWdobGlnaHRzIG9mIHdob2xlIHNlcXVlbmNlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBteVNlcXVlbmNlLnJlbW92ZUFsbEhpZ2hsaWdodHMoKTtcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5yZW1vdmVBbGxIaWdobGlnaHRzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm9wdGlvbnMuc2V0KHtoaWdobGlnaHRzOiBbXX0pO1xufTtcblx0XG5cdC8qKlxuICAgICogQ2hhbmdlcyB0aGUgY3VycmVudCBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgZGlzcGxheWVkIHNlcXVlbmNlLlxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBTZXQgdGhlIG51bWJlciBvZiBjb2x1bW5zIHRvIDcwLlxuICAgICogbXlTZXF1ZW5jZS5zZXROdW1Db2xzKDcwKTtcbiAgICAqIFxuICAgICogQHBhcmFtIHtpbnR9IG51bUNvbHMgVGhlIG51bWJlciBvZiBjb2x1bW5zLlxuICAgICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuc2V0TnVtQ29scyA9IGZ1bmN0aW9uKG51bUNvbHMpIHtcbiAgdGhpcy5vcHRpb25zLnNldCh7bnVtQ29sczogbnVtQ29sc30pO1xufTtcblx0XG4vKipcbiAgKiBHZXQgb3IgU2V0IHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBkcm9wLWRvd24gbGlzdCBvZiBmb3JtYXRzLlxuICAqIFxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZSB0cnVlOiBzaG93OyBmYWxzZTogaGlkZS5cbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5mb3JtYXRTZWxlY3RvclZpc2libGUgPSBmdW5jdGlvbiAodmlzaWJsZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2V0KCdmb3JtYXRTZWxlY3RvclZpc2libGUnKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm9wdGlvbnMuc2V0KHtmb3JtYXRTZWxlY3RvclZpc2libGU6IHZpc2libGV9KTtcbiAgfVxufTtcblx0XG4vKipcbiAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gYSB7QmlvanMuU2VxdWVuY2UjZm9ybWF0U2VsZWN0b3JWaXNpYmxlfSB3aXRoIHRoZSAndHJ1ZScgYXJndW1lbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIC8vIFNob3dzIHRoZSBmb3JtYXQgc2VsZWN0b3IuXG4gICogbXlTZXF1ZW5jZS5zaG93Rm9ybWF0U2VsZWN0b3IoKTtcbiAgKiBcbiAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5zaG93Rm9ybWF0U2VsZWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5mb3JtYXRTZWxlY3RvclZpc2libGUodHJ1ZSk7XG59O1xuXHRcbi8qKlxuICAqIFRoaXMgaXMgc2ltaWxhciB0byBhIHtCaW9qcy5Qcm90ZWluM0QjZm9ybWF0U2VsZWN0b3JWaXNpYmxlfSB3aXRoIHRoZSAnZmFsc2UnIGFyZ3VtZW50LlxuICAqIFxuICAqIEBleGFtcGxlXG4gICogLy8gSGlkZXMgdGhlIGZvcm1hdCBzZWxlY3Rvci5cbiAgKiBteVNlcXVlbmNlLmhpZGVGb3JtYXRTZWxlY3RvcigpO1xuICAqIFxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLmhpZGVGb3JtYXRTZWxlY3RvciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZvcm1hdFNlbGVjdG9yVmlzaWJsZShmYWxzZSk7XG59O1xuXHRcbi8qKlxuICAqIEhpZGVzIHRoZSB3aG9sZSBjb21wb25lbnQuXG4gICogXG4gICovXG5TZXF1ZW5jZS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5faGVhZGVyRGl2LmhpZGUoKTtcbiAgdGhpcy5fY29udGVudERpdi5oaWRlKCk7XG59O1xuXG4vKipcbiAgKiBTaG93cyB0aGUgd2hvbGUgY29tcG9uZW50LlxuICAqIFxuICAqL1xuU2VxdWVuY2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2hlYWRlckRpdi5zaG93KCk7XG4gIHRoaXMuX2NvbnRlbnREaXYuc2hvdygpO1xufTtcblxuU2VxdWVuY2UucHJvdG90eXBlLl9pc1NlbGVjdGluZyA9IGZhbHNlO1xuU2VxdWVuY2UucHJvdG90eXBlLl9sYXN0RW50ZXJlZCA9IC0xO1xuU2VxdWVuY2UucHJvdG90eXBlLl9zZWxlY3Rpb25TdGFydCA9IC0xO1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuc3RhcnRTZWxlY3RpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2lzU2VsZWN0aW5nID0gdHJ1ZTtcbiAgdGhpcy5fc2VsZWN0aW9uU3RhcnQgPSB0aGlzLl9sYXN0RW50ZXJlZDtcbiAgdGhpcy5zZXRTZWxlY3Rpb24odGhpcy5fbGFzdEVudGVyZWQsIHRoaXMuX2xhc3RFbnRlcmVkKTtcbn07XG5cblNlcXVlbmNlLnByb3RvdHlwZS5zdG9wU2VsZWN0aW5nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9pc1NlbGVjdGluZyA9IGZhbHNlO1xuICB0aGlzLl9sYXN0RW50ZXJlZCA9IC0xO1xuICB0aGlzLl9zZWxlY3Rpb25TdGFydCA9IC0xO1xufTtcblxuU2VxdWVuY2UucHJvdG90eXBlLl9yZWNvcmRFbnRyeSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICB0aGlzLl9sYXN0RW50ZXJlZCA9IGluZGV4O1xuICBpZiAodGhpcy5faXNTZWxlY3RpbmcpIHtcbiAgICB2YXIgc2VsZWN0aW9uID0gdGhpcy5vcHRpb25zLmdldCgnc2VsZWN0aW9uJyk7XG4gICAgdGhpcy5zZXRTZWxlY3Rpb24odGhpcy5fc2VsZWN0aW9uU3RhcnQsIGluZGV4KTtcbiAgfVxufTtcblx0XG4vKiBcbiAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fcmVkcmF3XG4gICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZXF1ZW5jZS4gXG4gICAgKiBSZXR1cm5zOiAgLVxuICAgICogSW5wdXRzOiAtXG4gICAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5fcmVkcmF3ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZW5kZXJlciA9IHRoaXMub3B0aW9ucy5nZXQoJ3JlbmRlcmVyJyk7XG4gIGlmICghcmVuZGVyZXIpIHJldHVybjtcbiAgdGhpcy5fY29udGVudERpdi5odG1sKHJlbmRlcmVyLnJlbmRlcihcbiAgICAgICAgdGhpcy5vcHRpb25zLmdldCgnc2VxdWVuY2UnKSwgdGhpcy5vcHRpb25zLmdldCgnaWQnKSxcbiAgICAgICAgdGhpcy5nZXRIaWdobGlnaHRzKCksIHRoaXMub3B0aW9ucy5nZXQoJ2Fubm90YXRpb25zJykpKTtcbn07XG5cbmZ1bmN0aW9uIF9idWlsZFJlbmRlcmVyICgpIHtcbiAgdmFyIFJlbmRlcmVyID0gcmVuZGVyZXJzW3RoaXMub3B0aW9ucy5nZXQoJ2Zvcm1hdCcpXTtcbiAgaWYgKCFSZW5kZXJlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkRvbid0IGtub3cgaG93IHRvIHJlbmRlciBcIiArIGZtdCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBSZW5kZXJlcih7XG4gICAgd2lkdGg6IHBhcnNlSW50KHRoaXMub3B0aW9ucy5nZXQoJ251bUNvbHMnKSwgMTApLFxuICAgIGFkZEJhc2VDbGFzczogISF0aGlzLm9wdGlvbnMuZ2V0KCdjb2xvdXJlZEJhc2VzJyksXG4gICAgb25Nb3VzZUVudGVyOiB0aGlzLl9yZWNvcmRFbnRyeS5iaW5kKHRoaXMpLFxuICAgIG9uQ2hhbmdlU2VsZWN0aW9uOiB0aGlzLm9wdGlvbnMub24uYmluZCh0aGlzLm9wdGlvbnMsICdjaGFuZ2U6c2VsZWN0aW9uJylcbiAgfSk7XG59O1xuXG5TZXF1ZW5jZS5wcm90b3R5cGUuZ2V0SGlnaGxpZ2h0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhpZ2hsaWdodHMgPSB0aGlzLm9wdGlvbnMuZ2V0KCdoaWdobGlnaHRzJykuc2xpY2UoKTtcbiAgdmFyIHNlbGVjdGlvbiA9IHRoaXMub3B0aW9ucy5nZXQoJ3NlbGVjdGlvbicpO1xuICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgaGlnaGxpZ2h0cy5wdXNoKHtcbiAgICAgIHN0YXJ0OiBzZWxlY3Rpb24uc3RhcnQsXG4gICAgICBlbmQ6IHNlbGVjdGlvbi5lbmQsXG4gICAgICBraW5kOiAnc2VsZWN0aW9uJyxcbiAgICAgIGlkOiAnX19zZWxlY3Rpb25fXydcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gaGlnaGxpZ2h0cztcbn07XG5cblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9hZGRUb29sdGlwXG4gICAgICogUHVycG9zZTogIEFkZCBhIHRvb2x0aXAgYXJvdW5kIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQgcHJvdmlkZWQgYXMgYXJndW1lbnRcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogICB0YXJnZXQgLT4ge0VsZW1lbnR9IERPTSBlbGVtZW50IHdpY2ggaXMgdGhlIHRhcmdldGVkIGZvY3VzIGZvciB0aGUgdG9vbHRpcC5cbiAgICAgKiBcdFx0XHQgY2JHZXRNZXNzYWdlRnVuY3Rpb24gLT4ge2Z1bmN0aW9ufSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpY2ggcmV0dXJucyB0aGUgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRpcC5cbiAgICAgKi9cblNlcXVlbmNlLnByb3RvdHlwZS5fYWRkVG9vbFRpcCA9IGZ1bmN0aW9uICggdGFyZ2V0LCBjYkdldE1lc3NhZ2VGdW5jdGlvbiApIHtcblxuICB2YXIgdGlwSWQgPSAnI3NlcXVlbmNlVGlwJyArIHRoaXMuZ2V0SWQoKTtcblxuICBqUXVlcnkodGFyZ2V0KS5tb3VzZW92ZXIoZnVuY3Rpb24oZSkge1xuXG4gICAgdmFyIG9mZnNldCA9IGpRdWVyeShlLnRhcmdldCkub2Zmc2V0KCk7XG5cbiAgICBpZiAoICEgalF1ZXJ5KCB0aXBJZCApLmlzKCc6dmlzaWJsZScpICkge1xuICAgICAgalF1ZXJ5KCB0aXBJZCApIFxuICAgIC5jc3Moe1xuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBcIiMwMDBcIixcbiAgICAgICdwYWRkaW5nJzogXCIzcHggMTBweCAzcHggMTBweFwiLFxuICAgICAgJ3RvcCc6IG9mZnNldC50b3AgKyBqUXVlcnkoZS50YXJnZXQpLmhlaWdodCgpICsgXCJweFwiLFxuICAgICAgJ2xlZnQnOiBvZmZzZXQubGVmdCArIGpRdWVyeShlLnRhcmdldCkud2lkdGgoKSArIFwicHhcIlxuICAgIH0pXG4gIC5hbmltYXRlKCB7b3BhY2l0eTogJzAuODUnfSwgMTApXG4gICAgLmh0bWwoIGNiR2V0TWVzc2FnZUZ1bmN0aW9uLmNhbGwoIHRhcmdldCApIClcbiAgICAuc2hvdygpO1xuICAgIH1cblxuICB9KS5tb3VzZW91dChmdW5jdGlvbigpIHtcbiAgICAvL1JlbW92ZSB0aGUgYXBwZW5kZWQgdG9vbHRpcCB0ZW1wbGF0ZVxuICAgIGpRdWVyeSggdGlwSWQgKS5oaWRlKCk7XHQgICAgICAgICBcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcXVlbmNlO1xuIiwidmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2Jpb2pzLWV2ZW50cycpO1xuXG5mdW5jdGlvbiBNb2RlbCAoYXR0cmlidXRlcywgZGVmYXVsdHMpIHtcbiAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gIHRoaXMuZGVmYXVsdHMgPSAoZGVmYXVsdHMgfHwge30pO1xuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXNba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnRzLm1peGluKE1vZGVsLnByb3RvdHlwZSk7XG5cbk1vZGVsLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KTtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIGlmICh0aGlzLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXNba2V5XTtcbiAgfVxuICByZXR1cm4gdGhpcy5kZWZhdWx0c1trZXldO1xufTtcblxuTW9kZWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gIHZhciBvbGQsIG5vdywga2V5LCBzZWxmID0gdGhpcywgY2hhbmdlcyA9IFtdO1xuICBmb3IgKGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgb2xkID0gdGhpcy5hdHRyaWJ1dGVzW2tleV07XG4gICAgbm93ID0gcHJvcGVydGllc1trZXldO1xuICAgIGlmIChvbGQgIT09IG5vdykge1xuICAgICAgY2hhbmdlcy5wdXNoKFsnY2hhbmdlOicgKyBrZXksIG5vdywgb2xkXSk7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXNba2V5XSA9IG5vdztcbiAgICB9XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zaWxlbnQpIHJldHVybjtcblxuICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgIHNlbGYudHJpZ2dlci5hcHBseShzZWxmLCBjaGFuZ2UpO1xuICB9KTtcbiAgc2VsZi50cmlnZ2VyKCdjaGFuZ2UnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWw7XG4iLCIvLyBCYXNlIGNsYXNzIGZvciByZW5kZXJlcnMuXG52YXIgUmVuZGVyZXIgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlbmRlcmVyICgpIHsgfVxuXG52YXIgY2xhc3NOYW1lc0ZvciA9IHtcbiAgQTogJ2FkZW5pbmUnLFxuICBDOiAnY3l0b3NpbmUnLFxuICBHOiAnZ3VhbmluZScsXG4gIFQ6ICd0aHltaW5lJ1xufTtcbnZhciBiYXNlVG9DbGFzcyA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gIHJldHVybiBjbGFzc05hbWVzRm9yW2NvZGUudG9VcHBlckNhc2UoKV07XG59O1xuXG52YXIgVU5JTVBMRU1FTlRFRCA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpOyB9O1xuXG5SZW5kZXJlci5vcHRpb25hbFByb3BlcnRpZXMgPSBbJ2FkZEJhc2VDbGFzcycsICd3aWR0aCcsICdvbk1vdXNlRW50ZXInXTtcblJlbmRlcmVyLnJlcXVpcmVkUHJvcGVydGllcyA9IFsnb25DaGFuZ2VTZWxlY3Rpb24nXTtcblxuLyoqXG4gICogR2V0IHRoZSBoaWdobGlnaHQgY2xhc3MgZm9yIGEgYmFzZSBhdCB0aGUgZ2l2ZW4gMS1iYXNlZCBpbmRleC5cbiAgKi9cbnZhciBnZXRIaWdobGlnaHRDbGFzcyA9IGZ1bmN0aW9uIChoaWdobGlnaHRzLCBiYXNlUG9zaXRpb24pIHtcbiAgdmFyIGNzc0NsYXNzID0gJyc7XG4gIC8vIExhc3Qgb25lIHRha2VzIHByZWNlZGVuY2UuXG4gIGhpZ2hsaWdodHMuZm9yRWFjaChmdW5jdGlvbiAoaGwpIHtcbiAgICBpZiAoYmFzZVBvc2l0aW9uID49IGhsLnN0YXJ0ICYmIGJhc2VQb3NpdGlvbiA8PSBobC5lbmQpIHtcbiAgICAgIGNzc0NsYXNzID0gaGwua2luZDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY3NzQ2xhc3M7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUgPSB7XG5cbiAgLyoqXG4gICAqIENvbW1vbiBpbml0aWFsaXNhdGlvbiBsb2dpYy5cbiAgICovXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQgKG9wdHMpIHtcbiAgICB0aGlzLmJhc2VzID0gW107XG4gICAgUmVuZGVyZXIub3B0aW9uYWxQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmIChvcHRzW25hbWVdKSB0aGlzW25hbWVdID0gb3B0c1tuYW1lXTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgUmVuZGVyZXIucmVxdWlyZWRQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmICghb3B0c1tuYW1lXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHJlcXVpcmVkIG9wdGlvbjogXCIgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXNbbmFtZV0gPSBvcHRzW25hbWVdO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFByb2R1Y2UgYSBjYW52YXMgb2JqZWN0LlxuICAgKi9cbiAgZ2V0Q2FudmFzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAgIGNhbnZhcy5jbGFzc05hbWUgPSAnc2VxdWVuY2UtY2FudmFzICcgKyB0aGlzLmZvcm1hdC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBjYW52YXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYmFzZXMgdG8gcmVuZGVyXG4gICAqL1xuICBnZXRCYXNlczogZnVuY3Rpb24gKHNlcSkgeyByZXR1cm4gc2VxLnNwbGl0KCcnKS5tYXAodGhpcy50cmFuc2Zvcm1CYXNlKTsgfSxcblxuICAvKipcbiAgICogVGhlIHRyYW5zZm9ybWF0aW9uIHRvIHBlcmZvcm0gb24gZWFjaCBiYXNlIC0gYnkgZGVmYXVsdCB1cHBlci1jYXNlLlxuICAgKi9cbiAgdHJhbnNmb3JtQmFzZTogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgudG9VcHBlckNhc2UoKTsgfSxcblxuICAvKipcbiAgICogU3ViY2xhc3NlcyBtdXN0IHByb3ZpZGUgYW4gaW1wbGVtZW50YXRpb24gdGhhdCByZW5kZXJzIGEgaGVhZGVyIHRvIGEgY2FudmFzLlxuICAgKi9cbiAgcmVuZGVySGVhZGVyOiBVTklNUExFTUVOVEVELFxuXG4gIC8qKlxuICAgKiBTdWJjbGFzc2VzIG11c3QgcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvbiB0aGF0IHJlbmRlcnMgYSByb3cgb2YgYmFzZXMuXG4gICAqL1xuICByZW5kZXJSb3c6IFVOSU1QTEVNRU5URUQsXG5cbiAgLyoqXG4gICAqIFN1YmNsYXNzZXMgbXVzdCBwcm92aWRlIGFuIGltcGxlbWVudGF0aW9uIHRoYXQgcmVuZGVycyBhIGZvb3Rlci5cbiAgICovXG4gIHJlbmRlckZvb3RlcjogVU5JTVBMRU1FTlRFRCxcblxuICAvKipcbiAgICogR2V0IGFsbCB0aGUgQ1NTLWNsYXNzZXMgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgYmFzZSBhdCB0aGUgZ2l2ZW4gMS1iYXNlZCBpbmRleC5cbiAgICovXG4gIGdldEJhc2VDbGFzc2VzOiBmdW5jdGlvbiAoY29kZSwgaW5kZXgsIGhpZ2hsaWdodGVyKSB7XG4gICAgdmFyIGNsYXNzZXMgPSBbJ3NlcS1iYXNlJ107XG4gICAgdmFyIGJhc2VDbGFzcyA9IGJhc2VUb0NsYXNzKGNvZGUpO1xuICAgIGlmIChiYXNlQ2xhc3MgJiYgdGhpcy5hZGRCYXNlQ2xhc3MpIHtcbiAgICAgIGNsYXNzZXMucHVzaChiYXNlQ2xhc3MpO1xuICAgIH1cbiAgICBjbGFzc2VzLnB1c2goaGlnaGxpZ2h0ZXIoaW5kZXgpKTtcbiAgICByZXR1cm4gY2xhc3NlcztcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIGJhc2UuXG4gICAqL1xuICByZW5kZXJCYXNlOiBmdW5jdGlvbiAocm93LCByb3dJbmRleCkge1xuICAgIHZhciBjb2RlID0gcm93LmJhc2VzW3Jvd0luZGV4XTtcbiAgICB2YXIgaW5kZXggPSByb3cuc3RhcnQgKyByb3dJbmRleDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJhc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdmFyIGNsYXNzZXMgPSB0aGlzLmdldEJhc2VDbGFzc2VzKGNvZGUsIGluZGV4LCByb3cuaGlnaGxpZ2h0ZXIpO1xuICAgIGJhc2UuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgYmFzZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb2RlKSk7XG4gICAgYmFzZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uTW91c2VFbnRlcihpbmRleCk7XG4gICAgfSk7XG4gICAgc2VsZi5vbkNoYW5nZVNlbGVjdGlvbihmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICBpZiAoaW5kZXggPj0gc2VsZWN0aW9uLnN0YXJ0ICYmIGluZGV4IDw9IHNlbGVjdGlvbi5lbmQpIHtcbiAgICAgICAgYmFzZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0aW9uJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJhc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzZXF1ZW5jZS5cbiAgICovXG4gIHJlbmRlcjogZnVuY3Rpb24gKHNlcXVlbmNlLCBpZCwgaGlnaGxpZ2h0cywgYW5ub3RhdGlvbnMpIHtcbiAgICB2YXIgaSwgYmFzZXMsIHJvd0Jhc2VzLCByb3csIG9mZnNldDtcbiAgICBpZiAoc2VxdWVuY2UubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIE5PX0NPTlRFTlQ7XG4gICAgfVxuICAgIHZhciBiYXNlcyA9IHRoaXMuZ2V0QmFzZXMoc2VxdWVuY2UpO1xuICAgIHZhciBjYW52YXMgPSB0aGlzLmdldENhbnZhcygpO1xuXG4gICAgdGhpcy5yZW5kZXJIZWFkZXIoY2FudmFzLCBiYXNlcywgaWQpO1xuICAgIHZhciBoaWdobGlnaHRlciA9IGdldEhpZ2hsaWdodENsYXNzLmJpbmQobnVsbCwgaGlnaGxpZ2h0cyk7XG5cbiAgICBmb3IgKGkgPSAxLCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBiYXNlcy5sZW5ndGg7IG9mZnNldCArPSB0aGlzLndpZHRoLCBpKyspIHtcbiAgICAgIHJvd0Jhc2VzID0gYmFzZXMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0aGlzLndpZHRoKTtcbiAgICAgIHJvdyA9IHtcbiAgICAgICAgaWR4OiBpLFxuICAgICAgICBiYXNlczogcm93QmFzZXMsXG4gICAgICAgIHN0YXJ0OiBvZmZzZXQgKyAxLFxuICAgICAgICBlbmQ6IG9mZnNldCArIHRoaXMud2lkdGgsXG4gICAgICAgIGhpZ2hsaWdodGVyOiBoaWdobGlnaHRlclxuICAgICAgfTtcbiAgICAgIHRoaXMucmVuZGVyUm93KGNhbnZhcywgcm93KTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlckZvb3RlcihjYW52YXMpO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxufTtcblxuIiwidmFyIFJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXJlci1iYXNlJyk7XG5cbnZhciBTUEFDRSA9ICcgJztcblxudmFyIE5PX09QID0gZnVuY3Rpb24gKCkgeyB9O1xuXG4vLy0tLS0tLS0tLS0gUmVuZGVyZXIgZm9yIEZBU1RBXG5cbnZhciBGYXN0YVJlbmRlcmVyID0gZXhwb3J0cy5GQVNUQSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHRoaXMuaW5pdChvcHRpb25zKTtcbn07XG5cbkZhc3RhUmVuZGVyZXIucHJvdG90eXBlID0gbmV3IFJlbmRlcmVyKCk7XG5cbkZhc3RhUmVuZGVyZXIucHJvdG90eXBlLmZvcm1hdCA9ICdGQVNUQSc7XG5cbkZhc3RhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckhlYWRlciA9IGZ1bmN0aW9uIChjYW52YXMsIGJhc2VzLCBpZCkge1xuICB2YXIgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJz4nICsgaWQgKyAnICcgKyBiYXNlcy5sZW5ndGggKyAnYnAnKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbn07XG5cbkZhc3RhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckZvb3RlciA9IE5PX09QO1xuXG5GYXN0YVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoY2FudmFzLCByb3cpIHtcbiAgdmFyIGksIGJhc2U7XG4gIGZvciAoaSA9IDA7IGkgPCByb3cuYmFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBiYXNlID0gdGhpcy5yZW5kZXJCYXNlKHJvdywgaSk7XG4gICAgY2FudmFzLmFwcGVuZENoaWxkKGJhc2UpO1xuICB9XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tIFJlbmRlcmVyIGZvciBDT0RBVEFcblxudmFyIENvZGF0YVJlbmRlcmVyID0gZXhwb3J0cy5DT0RBVEEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLmluaXQob3B0aW9ucyk7XG59O1xuXG5Db2RhdGFSZW5kZXJlci5wcm90b3R5cGUgPSBuZXcgUmVuZGVyZXIoKTtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLmZvcm1hdCA9ICdDT0RBVEEnO1xuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLmdyb3VwV2lkdGggPSA1O1xuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLmxlZnRNYXJnaW5TaXplID0gNztcbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5ndXR0ZXIgPSBTUEFDRSArIFNQQUNFO1xuXG5Db2RhdGFSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRm9vdGVyID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnLy8vJykpO1xufTtcblxuQ29kYXRhUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckhlYWRlciA9IGZ1bmN0aW9uIChjYW52YXMsIGJhc2VzLCBpZCkge1xuICB2YXIgaSwgeCwgbmVlZGVkLCBidWZmID0gW107XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnRU5UUlkgICAgICAgICAgICcpKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGlkKSk7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdTRVFVRU5DRScpKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlZnRNYXJnaW5TaXplOyBpKyspIHtcbiAgICBidWZmLnB1c2goU1BBQ0UpO1xuICB9XG4gIGJ1ZmYucHVzaCh0aGlzLmd1dHRlcik7XG4gIHZhciBtYXhOID0gTWF0aC5taW4oYmFzZXMubGVuZ3RoLCB0aGlzLndpZHRoKTtcblxuICBmb3IgKGkgPSB0aGlzLmdyb3VwV2lkdGg7IGkgPD0gbWF4TjsgaSArPSB0aGlzLmdyb3VwV2lkdGgpIHtcbiAgICB4ID0gU3RyaW5nKGkpO1xuICAgIGZvciAobmVlZGVkID0gKHRoaXMuZ3JvdXBXaWR0aCAqIDIpIC0gKDEgKyB4Lmxlbmd0aCk7IG5lZWRlZCA+IDA7IG5lZWRlZC0tKSB7XG4gICAgICBidWZmLnB1c2goU1BBQ0UpO1xuICAgIH1cbiAgICBidWZmLnB1c2goeCk7XG4gICAgYnVmZi5wdXNoKFNQQUNFKTtcbiAgfVxuXG4gIHZhciBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGhlYWRlci5jbGFzc05hbWUgPSAnc2VxdWVuY2UtaGVhZGVyJztcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGJ1ZmYuam9pbignJykpKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbn07XG5cbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJJbnRlckJhc2UgPSBmdW5jdGlvbiAocm93LCBiYXNlLCBpbnRlcmJhc2VJbmRleCkge1xuICB2YXIgaW50ZXJiYXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB2YXIgY2xhc3NlcyA9IHRoaXMuZ2V0QmFzZUNsYXNzZXMoYmFzZSwgaW50ZXJiYXNlSW5kZXgsIHJvdy5oaWdobGlnaHRlcik7XG4gIGNsYXNzZXMucHVzaCgnaW50ZXJiYXNlJyk7XG4gIGludGVyYmFzZS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgaW50ZXJiYXNlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFNQQUNFKSk7XG4gIHRoaXMub25DaGFuZ2VTZWxlY3Rpb24oZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgIGlmIChpbnRlcmJhc2VJbmRleCA+PSBzZWxlY3Rpb24uc3RhcnQgJiYgaW50ZXJiYXNlSW5kZXggPD0gc2VsZWN0aW9uLmVuZCkge1xuICAgICAgaW50ZXJiYXNlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGlvbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcmJhc2UuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0aW9uJyk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGludGVyYmFzZTtcbn07XG5cbkNvZGF0YVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJSb3cgPSBmdW5jdGlvbiAoY2FudmFzLCByb3cpIHtcbiAgdmFyIG5lZWRlZCwgaSwgYmFzZTtcblxuICB2YXIgcm93TGFiZWwgPSBTdHJpbmcocm93LnN0YXJ0KTtcbiAgdmFyIGJ1ZmYgPSBbXTtcbiAgZm9yIChuZWVkZWQgPSAodGhpcy5sZWZ0TWFyZ2luU2l6ZSAtIHJvd0xhYmVsLmxlbmd0aCk7IG5lZWRlZCA+IDA7IG5lZWRlZC0tKSB7XG4gICAgYnVmZi5wdXNoKFNQQUNFKTtcbiAgfVxuICBidWZmLnB1c2gocm93TGFiZWwsIHRoaXMuZ3V0dGVyKTtcbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGJ1ZmYuam9pbignJykpKTtcbiAgZm9yIChpID0gMDsgaSA8IHJvdy5iYXNlcy5sZW5ndGg7IGkrKykge1xuICAgIGJhc2UgPSB0aGlzLnJlbmRlckJhc2Uocm93LCBpKTtcbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gICAgaWYgKGkgKyAxIDwgcm93LmJhc2VzLmxlbmd0aCkge1xuICAgICAgdmFyIGludGVyYmFzZUluZGV4ID0gcm93LnN0YXJ0ICsgaSArIDAuNTtcbiAgICAgIHZhciBpbnRlcmJhc2UgPSB0aGlzLnJlbmRlckludGVyQmFzZShyb3csIHJvdy5iYXNlc1tpXSwgaW50ZXJiYXNlSW5kZXgpO1xuICAgICAgY2FudmFzLmFwcGVuZENoaWxkKGludGVyYmFzZSk7XG4gICAgfVxuICB9XG4gIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcbn07XG5cbi8vLS0tLS0tLS0tIFJlbmRlcmVyIGZvciBQUklERSBmb3JtYXRcblxudmFyIFByaWRlUmVuZGVyZXIgPSBleHBvcnRzLlBSSURFID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdGhpcy5pbml0KG9wdGlvbnMpO1xufTtcblxuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUgPSBuZXcgUmVuZGVyZXIoKTtcblxuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUuZm9ybWF0ID0gJ1BSSURFJztcblByaWRlUmVuZGVyZXIucHJvdG90eXBlLmdyb3VwV2lkdGggPSAxMDtcblByaWRlUmVuZGVyZXIucHJvdG90eXBlLm1hcmdpblNpemUgPSA1O1xuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUuZ3V0dGVyID0gU1BBQ0UgKyBTUEFDRTtcblByaWRlUmVuZGVyZXIucHJvdG90eXBlLmFpc2xlID0gU1BBQ0U7XG5cblByaWRlUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckhlYWRlciA9IE5PX09QO1xuXG5QcmlkZVJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJGb290ZXIgPSBOT19PUDtcblxuUHJpZGVSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyTGFiZWwgPSBmdW5jdGlvbiAobnVtKSB7XG4gIHZhciBsYWJlbCA9IFN0cmluZyhudW0pO1xuICB2YXIgYnVmZiA9IFtdO1xuICBmb3IgKG5lZWRlZCA9ICh0aGlzLm1hcmdpblNpemUgLSBsYWJlbC5sZW5ndGgpOyBuZWVkZWQgPiAwOyBuZWVkZWQtLSkge1xuICAgIGJ1ZmYucHVzaCgnMCcpO1xuICB9XG4gIGJ1ZmYucHVzaChsYWJlbCk7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShidWZmLmpvaW4oJycpKTtcbn07XG5cblByaWRlUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlclJvdyA9IGZ1bmN0aW9uIChjYW52YXMsIHJvdykge1xuICB2YXIgbmVlZGVkLCBpLCBiYXNlO1xuXG4gIGNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlckxhYmVsKHJvdy5zdGFydCkpO1xuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5ndXR0ZXIpKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgcm93LmJhc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgPiAwICYmIGkgJSB0aGlzLmdyb3VwV2lkdGggPT09IDApIHtcbiAgICAgIGNhbnZhcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmFpc2xlKSk7XG4gICAgfVxuICAgIGJhc2UgPSB0aGlzLnJlbmRlckJhc2Uocm93LCBpKTtcbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gIH1cbiAgaWYgKGkgPT09IHRoaXMud2lkdGgpIHtcbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5ndXR0ZXIpKTtcbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJMYWJlbChyb3cuZW5kKSk7XG4gIH1cbiAgY2FudmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xufTtcblxuLy8tLS0tLSAgUmVuZGVyZXIgZm9yIFJBVyBmb3JtYXRcblxudmFyIFJhd1JlbmRlcmVyID0gZXhwb3J0cy5SQVcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB0aGlzLmluaXQob3B0aW9ucyk7XG59O1xuXG5SYXdSZW5kZXJlci5wcm90b3R5cGUgPSBuZXcgUmVuZGVyZXIoKTtcblJhd1JlbmRlcmVyLnByb3RvdHlwZS5mb3JtYXQgPSAnUFJJREUnO1xuUmF3UmVuZGVyZXIucHJvdG90eXBlLnRyYW5zZm9ybUJhc2UgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfTtcblJhd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJIZWFkZXIgPSBOT19PUDtcblJhd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJGb290ZXIgPSBOT19PUDtcblxuUmF3UmVuZGVyZXIucHJvdG90eXBlLnJlbmRlclJvdyA9IGZ1bmN0aW9uIChjYW52YXMsIHJvdykge1xuICB2YXIgbmVlZGVkLCBpLCBiYXNlO1xuICBmb3IgKGkgPSAwOyBpIDwgcm93LmJhc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgYmFzZSA9IHRoaXMucmVuZGVyQmFzZShyb3csIGkpO1xuICAgIGNhbnZhcy5hcHBlbmRDaGlsZChiYXNlKTtcbiAgfVxuICBjYW52YXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFwcGx5U3R5bGUgKGNzcywgZG9jdW1lbnQpIHtcbiAgaWYgKGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCgpO1xuICAgIHN0eWxlc2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBzdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZXNoZWV0LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGlmIChzdHlsZXNoZWV0LnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlc2hlZXQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNoZWV0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlc2hlZXQpO1xuICB9XG59O1xuIiwidmFyIGV2ZW50cyA9IHJlcXVpcmUoXCJiYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZVwiKTtcblxuZXZlbnRzLm9uQWxsID0gZnVuY3Rpb24oY2FsbGJhY2ssY29udGV4dCl7XG4gIHRoaXMub24oXCJhbGxcIiwgY2FsbGJhY2ssY29udGV4dCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gTWl4aW4gdXRpbGl0eVxuZXZlbnRzLm9sZE1peGluID0gZXZlbnRzLm1peGluO1xuZXZlbnRzLm1peGluID0gZnVuY3Rpb24ocHJvdG8pIHtcbiAgZXZlbnRzLm9sZE1peGluKHByb3RvKTtcbiAgLy8gYWRkIGN1c3RvbSBvbkFsbFxuICB2YXIgZXhwb3J0cyA9IFsnb25BbGwnXTtcbiAgZm9yKHZhciBpPTA7IGkgPCBleHBvcnRzLmxlbmd0aDtpKyspe1xuICAgIHZhciBuYW1lID0gZXhwb3J0c1tpXTtcbiAgICBwcm90b1tuYW1lXSA9IHRoaXNbbmFtZV07XG4gIH1cbiAgcmV0dXJuIHByb3RvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBldmVudHM7XG4iLCIvKipcbiAqIFN0YW5kYWxvbmUgZXh0cmFjdGlvbiBvZiBCYWNrYm9uZS5FdmVudHMsIG5vIGV4dGVybmFsIGRlcGVuZGVuY3kgcmVxdWlyZWQuXG4gKiBEZWdyYWRlcyBuaWNlbHkgd2hlbiBCYWNrb25lL3VuZGVyc2NvcmUgYXJlIGFscmVhZHkgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50XG4gKiBnbG9iYWwgY29udGV4dC5cbiAqXG4gKiBOb3RlIHRoYXQgZG9jcyBzdWdnZXN0IHRvIHVzZSB1bmRlcnNjb3JlJ3MgYF8uZXh0ZW5kKClgIG1ldGhvZCB0byBhZGQgRXZlbnRzXG4gKiBzdXBwb3J0IHRvIHNvbWUgZ2l2ZW4gb2JqZWN0LiBBIGBtaXhpbigpYCBtZXRob2QgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIEV2ZW50c1xuICogcHJvdG90eXBlIHRvIGF2b2lkIHVzaW5nIHVuZGVyc2NvcmUgZm9yIHRoYXQgc29sZSBwdXJwb3NlOlxuICpcbiAqICAgICB2YXIgbXlFdmVudEVtaXR0ZXIgPSBCYWNrYm9uZUV2ZW50cy5taXhpbih7fSk7XG4gKlxuICogT3IgZm9yIGEgZnVuY3Rpb24gY29uc3RydWN0b3I6XG4gKlxuICogICAgIGZ1bmN0aW9uIE15Q29uc3RydWN0b3IoKXt9XG4gKiAgICAgTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZm9vID0gZnVuY3Rpb24oKXt9XG4gKiAgICAgQmFja2JvbmVFdmVudHMubWl4aW4oTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuICpcbiAqIChjKSAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIEluYy5cbiAqIChjKSAyMDEzIE5pY29sYXMgUGVycmlhdWx0XG4gKi9cbi8qIGdsb2JhbCBleHBvcnRzOnRydWUsIGRlZmluZSwgbW9kdWxlICovXG4oZnVuY3Rpb24oKSB7XG4gIHZhciByb290ID0gdGhpcyxcbiAgICAgIGJyZWFrZXIgPSB7fSxcbiAgICAgIG5hdGl2ZUZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCxcbiAgICAgIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgaWRDb3VudGVyID0gMDtcblxuICAvLyBSZXR1cm5zIGEgcGFydGlhbCBpbXBsZW1lbnRhdGlvbiBtYXRjaGluZyB0aGUgbWluaW1hbCBBUEkgc3Vic2V0IHJlcXVpcmVkXG4gIC8vIGJ5IEJhY2tib25lLkV2ZW50c1xuICBmdW5jdGlvbiBtaW5pc2NvcmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleXM6IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJrZXlzKCkgY2FsbGVkIG9uIGEgbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5LCBrZXlzID0gW107XG4gICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAga2V5c1trZXlzLmxlbmd0aF0gPSBrZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgfSxcblxuICAgICAgdW5pcXVlSWQ6IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgICAgICB2YXIgaWQgPSArK2lkQ291bnRlciArICcnO1xuICAgICAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgICAgIH0sXG5cbiAgICAgIGhhczogZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICAgICAgfSxcblxuICAgICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKG5hdGl2ZUZvckVhY2ggJiYgb2JqLmZvckVhY2ggPT09IG5hdGl2ZUZvckVhY2gpIHtcbiAgICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gYnJlYWtlcikgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIG9uY2U6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgdmFyIHJhbiA9IGZhbHNlLCBtZW1vO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHJhbikgcmV0dXJuIG1lbW87XG4gICAgICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGZ1bmMgPSBudWxsO1xuICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgXyA9IG1pbmlzY29yZSgpLCBFdmVudHM7XG5cbiAgLy8gQmFja2JvbmUuRXZlbnRzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEEgbW9kdWxlIHRoYXQgY2FuIGJlIG1peGVkIGluIHRvICphbnkgb2JqZWN0KiBpbiBvcmRlciB0byBwcm92aWRlIGl0IHdpdGhcbiAgLy8gY3VzdG9tIGV2ZW50cy4gWW91IG1heSBiaW5kIHdpdGggYG9uYCBvciByZW1vdmUgd2l0aCBgb2ZmYCBjYWxsYmFja1xuICAvLyBmdW5jdGlvbnMgdG8gYW4gZXZlbnQ7IGB0cmlnZ2VyYC1pbmcgYW4gZXZlbnQgZmlyZXMgYWxsIGNhbGxiYWNrcyBpblxuICAvLyBzdWNjZXNzaW9uLlxuICAvL1xuICAvLyAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAvLyAgICAgXy5leHRlbmQob2JqZWN0LCBCYWNrYm9uZS5FdmVudHMpO1xuICAvLyAgICAgb2JqZWN0Lm9uKCdleHBhbmQnLCBmdW5jdGlvbigpeyBhbGVydCgnZXhwYW5kZWQnKTsgfSk7XG4gIC8vICAgICBvYmplY3QudHJpZ2dlcignZXhwYW5kJyk7XG4gIC8vXG4gIEV2ZW50cyA9IHtcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLiBQYXNzaW5nIGBcImFsbFwiYCB3aWxsIGJpbmRcbiAgICAvLyB0aGUgY2FsbGJhY2sgdG8gYWxsIGV2ZW50cyBmaXJlZC5cbiAgICBvbjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KTtcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKTtcbiAgICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQmluZCBhbiBldmVudCB0byBvbmx5IGJlIHRyaWdnZXJlZCBhIHNpbmdsZSB0aW1lLiBBZnRlciB0aGUgZmlyc3QgdGltZVxuICAgIC8vIHRoZSBjYWxsYmFjayBpcyBpbnZva2VkLCBpdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgb25jZTogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBvbmNlID0gXy5vbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgb25lIG9yIG1hbnkgY2FsbGJhY2tzLiBJZiBgY29udGV4dGAgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3Mgd2l0aCB0aGF0IGZ1bmN0aW9uLiBJZiBgY2FsbGJhY2tgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIGZvciB0aGUgZXZlbnQuIElmIGBuYW1lYCBpcyBudWxsLCByZW1vdmVzIGFsbCBib3VuZFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgYWxsIGV2ZW50cy5cbiAgICBvZmY6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwgaztcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpcztcbiAgICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBfLmtleXModGhpcy5fZXZlbnRzKTtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICBpZiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gcmV0YWluID0gW107XG4gICAgICAgICAgaWYgKGNhbGxiYWNrIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgICAgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXYuY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSBkZWxldGUgdGhpcy5fZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBUcmlnZ2VyIG9uZSBvciBtYW55IGV2ZW50cywgZmlyaW5nIGFsbCBib3VuZCBjYWxsYmFja3MuIENhbGxiYWNrcyBhcmVcbiAgICAvLyBwYXNzZWQgdGhlIHNhbWUgYXJndW1lbnRzIGFzIGB0cmlnZ2VyYCBpcywgYXBhcnQgZnJvbSB0aGUgZXZlbnQgbmFtZVxuICAgIC8vICh1bmxlc3MgeW91J3JlIGxpc3RlbmluZyBvbiBgXCJhbGxcImAsIHdoaWNoIHdpbGwgY2F1c2UgeW91ciBjYWxsYmFjayB0b1xuICAgIC8vIHJlY2VpdmUgdGhlIHRydWUgbmFtZSBvZiB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50KS5cbiAgICB0cmlnZ2VyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgIHZhciBhbGxFdmVudHMgPSB0aGlzLl9ldmVudHMuYWxsO1xuICAgICAgaWYgKGV2ZW50cykgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpO1xuICAgICAgaWYgKGFsbEV2ZW50cykgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVGVsbCB0aGlzIG9iamVjdCB0byBzdG9wIGxpc3RlbmluZyB0byBlaXRoZXIgc3BlY2lmaWMgZXZlbnRzIC4uLiBvclxuICAgIC8vIHRvIGV2ZXJ5IG9iamVjdCBpdCdzIGN1cnJlbnRseSBsaXN0ZW5pbmcgdG8uXG4gICAgc3RvcExpc3RlbmluZzogZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBkZWxldGVMaXN0ZW5lciA9ICFuYW1lICYmICFjYWxsYmFjaztcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIGlmIChvYmopIChsaXN0ZW5lcnMgPSB7fSlbb2JqLl9saXN0ZW5lcklkXSA9IG9iajtcbiAgICAgIGZvciAodmFyIGlkIGluIGxpc3RlbmVycykge1xuICAgICAgICBsaXN0ZW5lcnNbaWRdLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIGlmIChkZWxldGVMaXN0ZW5lcikgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1tpZF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgfTtcblxuICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byBzcGxpdCBldmVudCBzdHJpbmdzLlxuICB2YXIgZXZlbnRTcGxpdHRlciA9IC9cXHMrLztcblxuICAvLyBJbXBsZW1lbnQgZmFuY3kgZmVhdHVyZXMgb2YgdGhlIEV2ZW50cyBBUEkgc3VjaCBhcyBtdWx0aXBsZSBldmVudFxuICAvLyBuYW1lcyBgXCJjaGFuZ2UgYmx1clwiYCBhbmQgalF1ZXJ5LXN0eWxlIGV2ZW50IG1hcHMgYHtjaGFuZ2U6IGFjdGlvbn1gXG4gIC8vIGluIHRlcm1zIG9mIHRoZSBleGlzdGluZyBBUEkuXG4gIHZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICAgIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoZXZlbnRTcGxpdHRlcik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBBIGRpZmZpY3VsdC10by1iZWxpZXZlLCBidXQgb3B0aW1pemVkIGludGVybmFsIGRpc3BhdGNoIGZ1bmN0aW9uIGZvclxuICAvLyB0cmlnZ2VyaW5nIGV2ZW50cy4gVHJpZXMgdG8ga2VlcCB0aGUgdXN1YWwgY2FzZXMgc3BlZWR5IChtb3N0IGludGVybmFsXG4gIC8vIEJhY2tib25lIGV2ZW50cyBoYXZlIDMgYXJndW1lbnRzKS5cbiAgdmFyIHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MpIHtcbiAgICB2YXIgZXYsIGkgPSAtMSwgbCA9IGV2ZW50cy5sZW5ndGgsIGExID0gYXJnc1swXSwgYTIgPSBhcmdzWzFdLCBhMyA9IGFyZ3NbMl07XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVybjtcbiAgICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuO1xuICAgICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuO1xuICAgICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVybjtcbiAgICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBsaXN0ZW5NZXRob2RzID0ge2xpc3RlblRvOiAnb24nLCBsaXN0ZW5Ub09uY2U6ICdvbmNlJ307XG5cbiAgLy8gSW52ZXJzaW9uLW9mLWNvbnRyb2wgdmVyc2lvbnMgb2YgYG9uYCBhbmQgYG9uY2VgLiBUZWxsICp0aGlzKiBvYmplY3QgdG9cbiAgLy8gbGlzdGVuIHRvIGFuIGV2ZW50IGluIGFub3RoZXIgb2JqZWN0IC4uLiBrZWVwaW5nIHRyYWNrIG9mIHdoYXQgaXQnc1xuICAvLyBsaXN0ZW5pbmcgdG8uXG4gIF8uZWFjaChsaXN0ZW5NZXRob2RzLCBmdW5jdGlvbihpbXBsZW1lbnRhdGlvbiwgbWV0aG9kKSB7XG4gICAgRXZlbnRzW21ldGhvZF0gPSBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8ICh0aGlzLl9saXN0ZW5lcnMgPSB7fSk7XG4gICAgICB2YXIgaWQgPSBvYmouX2xpc3RlbmVySWQgfHwgKG9iai5fbGlzdGVuZXJJZCA9IF8udW5pcXVlSWQoJ2wnKSk7XG4gICAgICBsaXN0ZW5lcnNbaWRdID0gb2JqO1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzO1xuICAgICAgb2JqW2ltcGxlbWVudGF0aW9uXShuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9KTtcblxuICAvLyBBbGlhc2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgRXZlbnRzLmJpbmQgICA9IEV2ZW50cy5vbjtcbiAgRXZlbnRzLnVuYmluZCA9IEV2ZW50cy5vZmY7XG5cbiAgLy8gTWl4aW4gdXRpbGl0eVxuICBFdmVudHMubWl4aW4gPSBmdW5jdGlvbihwcm90bykge1xuICAgIHZhciBleHBvcnRzID0gWydvbicsICdvbmNlJywgJ29mZicsICd0cmlnZ2VyJywgJ3N0b3BMaXN0ZW5pbmcnLCAnbGlzdGVuVG8nLFxuICAgICAgICAgICAgICAgICAgICdsaXN0ZW5Ub09uY2UnLCAnYmluZCcsICd1bmJpbmQnXTtcbiAgICBfLmVhY2goZXhwb3J0cywgZnVuY3Rpb24obmFtZSkge1xuICAgICAgcHJvdG9bbmFtZV0gPSB0aGlzW25hbWVdO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiBwcm90bztcbiAgfTtcblxuICAvLyBFeHBvcnQgRXZlbnRzIGFzIEJhY2tib25lRXZlbnRzIGRlcGVuZGluZyBvbiBjdXJyZW50IGNvbnRleHRcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBFdmVudHM7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBFdmVudHM7XG4gICAgfVxuICAgIGV4cG9ydHMuQmFja2JvbmVFdmVudHMgPSBFdmVudHM7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5CYWNrYm9uZUV2ZW50cyA9IEV2ZW50cztcbiAgfVxufSkodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL2luZGV4XCIpO1xuIl19
