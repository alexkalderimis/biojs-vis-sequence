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

/* Also: sequence, id, width, height */
var DEFAULTS = {
  format : "FASTA",
  selection: { start: 0, end: 0 },
  numCols: 35,
  highlights : [],
  annotations: [],
  sequenceUrl: 'http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/sequence',
  formatSelectorVisible: true,
  loadStyle: true // Load default styles onto the page.
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
  if (this.options.get('loadStyle')) {
    this._appendStyle();
  }
		
  ['width','height'].forEach(function (prop) {
    var val = self.options.get(prop);
    if (val > 0) {
      self._container[prop](val);
    }
  });
  
  // Disable text selection
  if (!this.options.get('allowSelection')) {
    this._container.addClass('no-user-selection');
  }

  this.options.on('change:allowSelection', function (allowed) {
    if (allowed) {
      self._container.removeClass('no-user-selection');
    } else {
      self._container.addClass('no-user-selection');
    }
  });
		
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

  this.options.on('change:format', function (fmt) {
    var Renderer = renderers[fmt];
    if (!Renderer) {
      throw new Error("Don't know how to render " + fmt);
    }
    self._Renderer = Renderer;
  });
  this.options.trigger('change:format', this.options.get('format'));

  var redraw = function () { self._redraw(); };
  this.options.on('change:highlights', redraw);
  this.options.on('change:format', redraw);
  this.options.on('change:numCols', redraw);
  this.options.on('change:sequence', redraw);
  this.options.on('change:id', redraw);

  this.options.on('change:sequence', function () {
    self.options.set({highlights: [], annotations: []}, {silent: true});
    self.setSelection(0, 0); // triggers change -> redraw
  });

  this.options.on('change:selection', function (sel) {
    self.trigger(EVT_ON_SELECTION_CHANGED, sel);
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

  if (this.options.has('sequence')) {
    this.trigger('set:sequence');
  } else if (this.options.has('id')) {
    this._requestSequence(this.getId());
  } else {
    this.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
  }
  
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

var RULES = [
  '.seq-base.adenine {background: green; color: white;}',
  '.seq-base.cytosine {background: red; color: white;}',
  '.seq-base.guanine {background: blue; color: white;}',
  '.seq-base.thymine {background: orange; color: white;}',
  '.seq-base.info, .interbase.info {background: #4090f7; color: white;}',
  '.sequence-content {font-family: "Andale mone", courier, monospace; font-size: 12px; text-align: left;}',
  '.sequence-controls {font-family: "Helvetica Neue", Arial, "sans serif"; font-size: 14px}',
  '.no-user-selection {-moz-user-select: none; -webkit-user-select: none; user-select: none;}',
  '.seq-base.selection, .interbase.selection {background: yellow; color: black;}',
];

Sequence.prototype._appendStyle = function () {
  var css, head, stylesheet;
  css = RULES.join('\n');
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
	
Sequence.prototype._buildFormatSelector = function () {
  var self = this;
  
  this._headerDiv = jQuery('<div>')
    .addClass('sequence-controls')
    .append('<label>Format:</label>')
    .appendTo(this._container);
  
  this._formatSelector = jQuery('<select> '+
      '<option value="FASTA">FASTA</option>'+
      '<option value="CODATA">CODATA</option>'+
      '<option value="PRIDE">PRIDE</option>'+
      '<option value="RAW">RAW</option></select>').appendTo(self._headerDiv);

  this._formatSelector.change(function(e) {
    self.setFormat(jQuery(this).val());
  });

  this.options.on('change:format', function (format) {
    self._formatSelector.val(format);	
  });
  
  this._formatSelector.val(self.options.get('format'));

  self._headerDiv.append('<label>Columns</label>');

  this._columnWidthSelector = jQuery('<select>' + 
      '<option value="10">10</option>'+
      '<option value="35">35</option>'+
      '<option value="70">70</option>'+
      '<option value="100">100</option></select>').appendTo(self._headerDiv);

  this._columnWidthSelector.val(String(this.options.get('numCols')));

  this._columnWidthSelector.change(function(e) {
    self.options.set({numCols: parseInt(jQuery(this).val(), 10)});
  });

  this.options.on('change:numCols', function (num) {
    self._columnWidthSelector.val(String(num));	
  });

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

Sequence.prototype.startSelecting = function () {
  this._isSelecting = true;
  this.setSelection(this._lastEntered, this._lastEntered);
};

Sequence.prototype.stopSelecting = function () {
  this._isSelecting = false;
  this._lastEntered = -1;
};

Sequence.prototype._recordEntry = function (index) {
  this._lastEntered = index;
  if (this._isSelecting) {
    var selection = this.options.get('selection');
    this.setSelection(selection.start, index);
  }
};
	
/* 
    * Function: Sequence._redraw
    * Purpose:  Repaint the current sequence. 
    * Returns:  -
    * Inputs: -
    */
Sequence.prototype._redraw = function() {

  var renderer = new this._Renderer({
    width: this.options.get('numCols'),
    sequence: this.options.get('sequence'),
    id: this.options.get('id'),
    highlights: this.getHighlights(),
    onMouseEnter: this._recordEntry.bind(this),
    onChangeSelection: this.options.on.bind(this.options, 'change:selection')
  });

  this._contentDiv.html(renderer.render());
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
