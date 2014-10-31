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
