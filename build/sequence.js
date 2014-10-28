require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// legacy!!
$.browser = require("jquery-browser-plugin");

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

var Class = require('js-class');

var EVT_ON_SELECTION_CHANGE = "selection-change";
var EVT_ON_SELECTION_CHANGED = "selection-changed";
var EVT_ON_ANNOTATION_CLICKED = "annotation-clicked";

Sequence = Class(
/** @lends Sequence# */
{	
	constructor: function (options) {
		var self = this;

    this.opt = jQuery.extend(this.opt,options);

		this._container = jQuery(this.opt.target);
		
		// Lazy initialization 
		this._container.ready(function() {
			self._initialize();
		});
	},
	
	/**
	 * Default values for the options
	 * @name Sequence-opt
	 */
	opt : {
		
		sequence : "",
		id : "",
		target : "",
		format : "FASTA",
		selection: { start: 0, end: 0 },
		columns: { size: 35, spacedEach: 10 },
		highlights : [],
		annotations: [],
		sequenceUrl: 'http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/sequence',
		
		// Styles 
		selectionColor : 'Yellow',
		selectionFontColor : 'black',
		highlightFontColor : 'red',
		highlightBackgroundColor : 'white',
		fontFamily: '"Andale mono", courier, monospace',
		fontSize: '12px',
		fontColor : 'inherit',
		backgroundColor : 'inherit',
		width: undefined,
		height: undefined,
		formatSelectorVisible: true
	},
	
	/**
	 * Array containing the supported event names
	 * @name Sequence-eventTypes
	 */
	eventTypes : [
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
	],

  getId : function () {
    return this.opt.id;
  },

	// internal members
	_headerDiv : null,
	_contentDiv : null,
	
	// Methods

	_initialize: function () {
		
		if ( this.opt.width > 0 ) {
			this._container.width( this.opt.width );
		}
		
		if ( this.opt.height > 0 ) {
			this._container.height( this.opt.height );
		}
		
    // Disable text selection
    if (!this.opt.allowSelection) {
      this._container.css({
        '-moz-user-select':'none',
        '-webkit-user-select':'none',
        'user-select':'none'
      });
    }
		
		// DIV for the format selector
		this._buildFormatSelector();
		
		// DIV for the sequence
		this._contentDiv = jQuery('<div></div>').appendTo(this._container);
		this._contentDiv.css({
				'font-family': this.opt.fontFamily,
				'font-size': this.opt.fontSize,
				'text-align': 'left'
			});
		
		// Initialize highlighting 
		this._highlights = this.opt.highlights;
		
		// Initialize annotations
		this._annotations = this.opt.annotations;
		
		//Initialize tooltip
		jQuery('<div id="sequenceTip' + this.opt.target.id + '"></div>') 
	        .css({	
	        	'position': "absolute",
	        	'z-index': "999999",
	        	'color': "#fff",
	        	'font-size': "12px",
	        	'width': "auto",
	        	'display': 'none'
	        })
	        .addClass("tooltip")
	        .appendTo("body")
	        .hide();

		if ( (this.opt.sequence) ) {
			this._redraw();
			
		} else if (  (this.opt.id) ) {
			this._requestSequence( this.opt.id );
			
		} else {
			this.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
		}
		
	},
	
	
	/**
	 * Shows the columns indicated by the indexes array.
	 * @param {string} seq The sequence strand.
	 * @param {string} [identifier] Sequence identifier.
	 * 
	 * @example 
	 * mySequence.setSequence("P99999");
	 * 
	 */
    setSequence: function ( seq, identifier ) {

    	if ( seq.match(/^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])(\.\d+)?$/i) ) {
    		this._requestSequence( arguments[0] );
    		
    	} else {
    		this.opt.sequence = seq;
        	this.opt.id = identifier; 
        	this._highlights = [];
    		this._highlightsCount = 0;
    		this.opt.selection = { start: 0, end: 0 };
    		this._annotations = [];
    		
    		this._contentDiv.children().remove();
    		this._redraw();
    	}
    },
    
    _requestSequence: function ( accession ) {
		var self = this;
    	
    	console.log("Requesting sequence for: " + accession );

		jQuery.ajax({ 
			url: self.opt.sequenceUrl,
			dataType: "xml",
			data: { segment: accession },
			success: function ( xml  ) {
				try {
					
					var sequenceNode = jQuery(xml).find('SEQUENCE:first');
					self.setSequence( sequenceNode.text(), sequenceNode.attr("id"), sequenceNode.attr("label") );
					
				} catch (e) {
					console.log("Error decoding response data: " + e.message );
					self.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
				}

			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log("Error decoding response data: " + textStatus );
				self.clearSequence("Error requesting the sequence to the server " + this.url , "../biojs/css/images/warning_icon.png");
			}
		});
    },
	
    /**
	 * Shows the columns indicated by the indexes array.
	 * @param {string} [showMessage] Message to be showed.
	 * @param {string} [icon] Icon to be showed a side of the message
	 * 
	 * @example 
	 * mySequence.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
	 * 
	 */
    clearSequence: function ( showMessage, icon ) {
    	
    	var message;
    		
    	this.opt.sequence = "";
    	this.opt.id = ""; 
    	this._highlights = [];
		this._highlightsCount = 0;
		this.opt.selection = { start: 0, end: 0 };
		this._annotations = [];
		this._contentDiv.children().remove();
		
		this._headerDiv.hide();
		
		if ( undefined !== showMessage ) {
			message = jQuery('<div>' + showMessage + '</div>')
				.appendTo(this._contentDiv)
				.addClass("message");
			
			if ( undefined !== icon ) {
				message.css({
					'background': 'transparent url("' + icon + '") no-repeat center left',
					'padding-left': '20px'
				});
			}
		}
    },
	
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
	setSelection : function(start, end) {
		if(start > end) {
			var aux = end;
			end = start;
			start = aux;

		}

		if(start != this.opt.selection.start || end != this.opt.selection.end) {
			this._setSelection(start, end);
			this.trigger(
					EVT_ON_SELECTION_CHANGED, 
					{ "start" : start, "end" : end }
			);
		}
	},
	
	_buildFormatSelector: function () {
		var self = this;
		
		this._headerDiv = jQuery('<div></div>').appendTo(this._container);
		this._headerDiv.css({
			'font-family': '"Heveltica Neue", Arial, "sans serif"',
			'font-size': '14px'	
		}).append('Format: ');
		
		this._formatSelector = jQuery('<select> '+
				'<option value="FASTA">FASTA</option>'+
				'<option value="CODATA">CODATA</option>'+
				'<option value="PRIDE">PRIDE</option>'+
				'<option value="RAW">RAW</option></select>').appendTo(self._headerDiv);

		this._formatSelector.change(function(e) {
			self.opt.format = jQuery(this).val();
			self._redraw();
		});
		
		this._formatSelector.val(self.opt.format);	
		
		this.formatSelectorVisible( this.opt.formatSelectorVisible );
	},
	
	/**
    * Highlights a region using the font color defined in {Biojs.Protein3D#highlightFontColor} by default is red.
    *
    * @deprecated use addHighlight instead.
    * 
    * @param {int} start The starting character of the highlighting.
    * @param {int} end The ending character of the highlighting.
    * @param {string} [color] HTML color code.
    * @param {string} [background] HTML color code.
    * @param {string} [id] Custom identifier.
    * 
    * @return {int} representing the id of the highlight on the internal array. Returns -1 on failure  
    */
	highlight : function (start, end, color, background, id ) {
		return this.addHighlight({ "start": start, "end": end, "color": color, "background": background, "id": id });
	},
	
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
    * @return {int} representing the id of the highlight on the internal array. Returns -1 on failure  
    */
	addHighlight : function ( h ) {
		var id = '-1';
		var color = "";
		var background = "";
		var highlight = {};
		
		if ( h && h.start <= h.end ) {
			
			color = ( "string" === typeof h.color )? h.color : this.opt.highlightFontColor;
			background = ( "string" === typeof h.background )? h.background : this.opt.highlightBackgroundColor;
			id = ( "string" === typeof h.id ) ? h.id : String(this._highlightsCount++);
			
			highlight = { "start": h.start, "end": h.end, "color": color, "background": background, "id": id };
			
			this._highlights.push(highlight);
			this._applyHighlight(highlight);
			this._restoreSelection(h.start,h.end);
		} 
		
		return id;
	},
	/* 
     * Function: Sequence._applyHighlight
     * Purpose:  Apply the specified color and background to a region between 'start' and 'end'.
     * Returns:  -
     * Inputs: highlight -> {Object} An object containing the fields start (int), end (int), 
     * 						color (HTML color string) and background (HTML color string).
     */
	_applyHighlight: function ( highlight ) {		
		var seq = this._contentDiv.find('.sequence');
		for ( var i = highlight.start - 1; i < highlight.end; i++ ){
			zindex = jQuery(seq[i]).css("z-index");
			if (zindex=="auto"){
				 z = 1;
				 o = 1;
			 }
			 else{
				 z = 0;
				 o = 0.5;
			 }
			jQuery(seq[i])
				.css({ 
					"color": highlight.color,
					"background-color": highlight.background,
					"z-index": z,
					"opacity": o
					})
				.addClass("highlighted");
		}
	},
	/* 
     * Function: Sequence._applyHighlights
     * Purpose:  Apply the specified highlights.
     * Returns:  -
     * Inputs: highlights -> {Object[]} An array containing the highlights to be applied.
     */
	_applyHighlights: function ( highlights ) {
		for ( var i in highlights ) {
			this._applyHighlight(highlights[i]);
		}
	},
	/* 
     * Function: Sequence._restoreHighlights
     * Purpose:  Repaint the highlights in the specified region.
     * Returns:  -
     * Inputs: start -> {int} Start of the region to be restored.
     * 		   end -> {int} End of the region to be restored.
     */
	_restoreHighlights: function ( start, end ) {
		var h = this._highlights;
		// paint the region using default blank settings
		this._applyHighlight({
			"start": start, 
			"end": end, 
			"color": this.opt.fontColor, 
			"background": this.opt.backgroundColor 
		});
		// restore highlights in that region
		for ( var i in h ) {
			// interval intersects with highlight i ?
			if ( !( h[i].start > end || h[i].end < start ) ) {
				a = ( h[i].start < start ) ? start : h[i].start;
				b = ( h[i].end > end ) ? end : h[i].end;
				this._applyHighlight({
					"start": a, 
					"end": b, 
					"color": h[i].color, 
					"background": h[i].background 
				});
			}
		}
	},
	/* 
     * Function: Sequence._restoreSelection
     * Purpose:  Repaint the current selection in the specified region. 
     * 			 It is used in the case of any highlight do overriding of the current selection. 
     * Returns:  -
     * Inputs: start -> {int} Start of the region to be restored.
     * 		   end -> {int} End of the region to be restored.
     */
	_restoreSelection: function ( start, end ) {
		var sel = this.opt.selection;
		// interval intersects with current selection ?
		// restore selection
		if ( !( start > sel.end || end < sel.start ) ) {
			a = ( start < sel.start ) ? sel.start : start;
			b = ( end > sel.end ) ? sel.end : end;
			
			this._applyHighlight({
				"start": a, 
				"end": b, 
				"color": this.opt.selectionFontColor, 
				"background": this.opt.selectionColor,
			});
		}
	},
	
	/**
    * Clear a highlighted region using.
    *
    * @deprecated use removeHighlight instead.
    * 
    * @param {int} id The id of the highlight on the internal array. This value is returned by method highlight.
    */
	unHighlight : function (id) {	
		this.removeHighlight(id);
	},
	
	/**
    * Remove a highlight.
    *
    * @example
    * // Clear the highlighted characters within the position 100 to 150, included.
    * mySequence.removeHighlight("spin1");
    * 
    * @param {string} id The id of the highlight on the internal array. This value is returned by method highlight.
    */
	removeHighlight : function (id) {	
		var start, end, i, h = this._highlights;
		for ( i in h ) {
			if ( h[i].id == id ) {
				start = h[i].start;
				end = h[i].end;
				h.splice(i,1);
				
				this._restoreHighlights(start,end);
				this._restoreSelection(start,end);
				
				break;
			}
		}
	},
	
	/**
    * Clear the highlights of whole sequence.
    * @deprecated use removeAllHighlights instead.
    */
	unHighlightAll : function () {
		this.removeAllHighlights();
	},
	
	/**
    * Remove all the highlights of whole sequence.
    *
    * @example
    * mySequence.removeAllHighlights();
    */
	removeAllHighlights : function () {
		this._highlights = [];
		this._restoreHighlights(1,this.opt.sequence.length);
		this._restoreSelection(1,this.opt.sequence.length);
	},
	
	/**
    * Changes the current displaying format of the sequence.
    *
    * @example
    * // Set format to 'FASTA'.
    * mySequence.setFormat('FASTA');
    * 
    * @param {string} format The format for the sequence to be displayed.
    */
	setFormat : function(format) {
		if ( this.opt.format != format.toUpperCase() ) {
			this.opt.format = format.toUpperCase();
			this._redraw();
		}

		var self = this;
		// Changes the option in the combo box
		this._headerDiv.find('option').each(function() {
			if(jQuery(this).val() == self.opt.format.toUpperCase()) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	},
	
	/**
    * Changes the current number of columns in the displayed sequence.
    *
    * @example
    * // Set the number of columns to 70.
    * mySequence.setNumCols(70);
    * 
    * @param {int} numCols The number of columns.
    */
	setNumCols : function(numCols) {
		this.opt.columns.size = numCols;
		this._redraw();
	},
	
	/**
    * Set the visibility of the drop-down list of formats.
    * 
    * @param {boolean} visible true: show; false: hide.
    */
	formatSelectorVisible : function (visible){
		if (visible) {
			this._headerDiv.show();
		} else {
			this._headerDiv.hide();
		}
	},
	
	/**
    * This is similar to a {Biojs.Protein3D#formatSelectorVisible} with the 'true' argument.
    *
    * @example
    * // Shows the format selector.
    * mySequence.showFormatSelector();
    * 
    */
	showFormatSelector : function() {
		this._headerDiv.show();
	},
	
	/**
    * This is similar to a {Biojs.Protein3D#formatSelectorVisible} with the 'false' argument.
    * 
    * @example
    * // Hides the format selector.
    * mySequence.hideFormatSelector();
    * 
    */
	hideFormatSelector : function() {
		this._headerDiv.hide();
	},
	
	/**
    * Hides the whole component.
    * 
    */
	hide : function () {
		this._headerDiv.hide();
		this._contentDiv.hide();
	},

	/**
    * Shows the whole component.
    * 
    */
	show : function () {
		this._headerDiv.show();
		this._contentDiv.show();
	},
	/* 
     * Function: Sequence._setSelection
     * Purpose:  Update the current selection. 
     * Returns:  -
     * Inputs: start -> {int} Start of the region to be selected.
     * 		   end -> {int} End of the region to be selected.
     */
	_setSelection : function(start, end) {
		//alert("adsas");
		
		var current = this.opt.selection;
		var change = {};
		
		// Which is the change on selection?
		if ( current.start == start ) {
			// forward?
			if ( current.end < end ) {
				change.start = current.end;
				change.end = end;
			} else {
				this._restoreHighlights(end+1, current.end);
			}
		} else if ( current.end == end ) {
			// forward?
			if ( current.start > start ) {
				change.start = start;
				change.end = current.start;				
			} else {
				this._restoreHighlights(current.start, start-1);
			}
		} else {
			this._restoreHighlights(current.start, current.end);
			change.start = start;
			change.end = end;
		}

		current.start = start;
		current.end = end;

		if (change.start) {
			this._applyHighlight({
				"start": change.start, 
				"end": change.end, 
				"color": this.opt.selectionFontColor, 
				"background": this.opt.selectionColor 
			});
		}
		
	},
	
	/* 
     * Function: Sequence._repaintSelection
     * Purpose:  Repaint the whole current selection. 
     * Returns:  -
     * Inputs: -
     */
	_repaintSelection: function(){
		var s = this.opt.selection;
		this._setSelection(0,0);
		this._setSelection(s.start,s.end);
	},
	
	/* 
     * Function: Sequence._redraw
     * Purpose:  Repaint the current sequence. 
     * Returns:  -
     * Inputs: -
     */
	_redraw : function() {
		var i = 0;	
		var self = this;
		
		// Reset the content
		//this._contentDiv.text('');
		this._contentDiv.children().remove();
		
		// Rebuild the spans of the sequence 
		// according to format
		if(this.opt.format == 'RAW') {
			this._drawRaw();
		} else if(this.opt.format == 'CODATA') {
			this._drawCodata();
		} else if (this.opt.format == 'FASTA'){
			this._drawFasta();
		} else {
			this.opt.format = 'PRIDE';
			this._drawPride();
		}
		
		// Restore the highlighted regions
		this._applyHighlights(this._highlights);
		this._repaintSelection();
		this._addSpanEvents();
	},
	/* 
     * Function: Sequence._drawFasta
     * Purpose:  Repaint the current sequence using FASTA format.  
     * Returns:  -
     * Inputs: -
     */
	_drawFasta : function() {
    var self = this;
    var a = this.opt.sequence.toUpperCase().split('');
    var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);

    var i = 1;
    var arr = [];
    var str = '>' + this.opt.id + ' ' + a.length + ' bp<br/>';

    /* Correct column size in case the sequence is as small peptide */
    var numCols = this.opt.columns.size;
    if ( this.opt.sequence.length < this.opt.columns.size ) {
      numCols = this.opt.sequence.length;	
    }

    var opt = {
      numCols: numCols,
      numColsForSpace: 0
    };

    str += this._drawSequence(a, opt);
    pre.html(str);

    this._drawAnnotations(opt);
	},
	/* 
     * Function: Sequence._drawCodata
     * Purpose:  Repaint the current sequence using CODATA format.  
     * Returns:  -
     * Inputs: -
     */
	_drawCodata : function() {
		
    var buff = [];
    var options = (this.opt.formatOptions || {});
		var sequence = this.opt.sequence.toUpperCase().split('');
		var pre = document.createElement('pre');
    var opt = {
      numLeft: true,
      numLeftSize: 7,
      numLeftPad:' ',
      numTop: true,
      numTopEach: 5,
      numCols: Math.min(sequence.length, this.opt.columns.size),
      numColsForSpace: 0,
      spaceBetweenChars: true
    };

		if (options.title) {
      buff.push('ENTRY           ', this.opt.id, '<br/>', 'SEQUENCE<br/>');
    }
		
		/* Correct column size in case the sequence is as small peptide */
		
		buff.push(this._drawSequence(sequence, opt));
		
		buff.push(options.footer ? '<br/>///' : '');

    pre.style.whiteSpace = 'pre';
    pre.innerHTML = buff.join('');

    this._contentDiv.append(pre);
		
		this._drawAnnotations(opt);
	},
	/* 
     * Function: Sequence._drawAnnotations
     * Purpose:  Paint the annotations on the sequence.  
     * Returns:  -
     * Inputs: settings -> {object} 
     */
    _drawAnnotations: function ( settings ){ 

      var self = this;
      var a = this.opt.sequence.toLowerCase().split('');    	
      var annotations = this._annotations;
      var leftSpaces = '';
      var row = '';
      var annot = '';
      var cellSelector;

      // Index at the left?
      if ( settings.numLeft ) {
        leftSpaces += this._formatIndex(' ', settings.numLeftSize+2, ' ');
      }

      for ( var i = 0; i < a.length; i += settings.numCols ){
        row = '';
        for ( var key in annotations ){
          annotations[key].id = this.getId() + "_" + key;
          annot = this._getHTMLRowAnnot(i+1, annotations[key], settings);				
          if (annot.length > 0) {
            row += '<br/>';
            row += leftSpaces;
            row += annot;
            row += '<br/>';
          } 
        }

        var numCols = settings.numCols;
        var charRemaining = a.length-i;
        if(charRemaining < numCols){
          numCols	= charRemaining;
        }

        if ( settings.numRight ) {
          // TODO: stop using ids for bases.
          cellSelector = 'pre span#numRight_' + this.getId() + '_' + (i + numCols);
        } else {
          cellSelector = 'pre span#' + this.getId() + '_' + (i + numCols);
        }
        jQuery(row).insertAfter(self._container.find(cellSelector));
      }

      // add tool tips and background' coloring effect
      jQuery(this._contentDiv).find('.annotation').each( function(){
        self._addToolTip( this, function() {
          return self._getAnnotationString( jQuery(this).attr("id") );
        });

        jQuery(this).mouseover(function(e) {
          jQuery('.annotation.'+jQuery(e.target).attr("id")).each(function(){
            jQuery(this).css("background-color", jQuery(this).attr("color") );
          });
        }).mouseout(function() {
          jQuery('.annotation').css("background-color", "transparent"); 

        }).click(function(e) {
          var i, name, id = jQuery(e.target).attr("id");
          for(i = 0; i < self._annotations.length; i++){
            if(self._annotations[i].id == id){
              name = self._annotations[i].name;
              continue;
            }
          }
          self.trigger(EVT_ON_ANNOTATION_CLICKED, {name: name});
        });

      });

    },
    /* 
     * Function: Sequence._getAnnotationString
     * Purpose:  Get the annotation text message for the tooltip 
     * Returns:  {string} Annotation text for the annotation
     * Inputs:   id -> {int} index of the internal annotation array
     */
    _getAnnotationString: function ( id ) {
		var annotation = this._annotations[id.substr(id.indexOf("_") + 1)];
		return annotation.name + "<br/>" + ((annotation.html)? annotation.html : '');
    },
    
    /* 
     * Function: Sequence._getHTMLRowAnnot
     * Purpose:  Build an annotation
     * Returns:  HTML of the annotation
     * Inputs:   currentPos -> {int}
     * 			 annotation -> {Object} 
     *  		 settings -> {Object}
     */
    _getHTMLRowAnnot : function (currentPos, annotation, settings) {
    	var styleBegin = 'border-left:1px solid; border-bottom:1px solid; border-color:';
    	var styleOn = 'border-bottom:1px solid; border-color:';
    	var styleEnd = 'border-bottom:1px solid; border-right:1px solid; border-color:';
		var styleBeginAndEnd = 'border-left:1px solid; border-right:1px solid; border-bottom:1px solid; border-color:';
    	
    	var row = [];
    	var end = (currentPos + settings.numCols);
    	var spaceBetweenChars = (settings.spaceBetweenChars)? ' ' : '';    	
    	var defaultColor = annotation.color;
    	var id = annotation.id;
    	for ( var pos=currentPos; pos < end ; pos++ ) {
			// regions
			for ( var r in annotation.regions ) {
				region = annotation.regions[r];
				
				spaceAfter = '';
				spaceAfter += (pos % settings.numColsForSpace === 0 ) ? ' ' : '';
				spaceAfter += spaceBetweenChars;
				
				color = ((region.color)? region.color : defaultColor);
				data = 'class="annotation '+id+'" id="'+id+'" color="'+color+'" pos="'+pos+'"';
				
				if ( pos == region.start && pos == region.end) {
					row[pos] = '<span style="'+styleBeginAndEnd+color+'" '+data+'> ';
					row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if ( pos == region.start ) {
					row[pos] = '<span style="'+styleBegin+color+'" '+data+'> ';
					row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if ( pos == region.end ) {
					row[pos] = '<span style="'+styleEnd+color+' " '+data+'> ';
					//row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if ( pos > region.start && pos < region.end ) {
					row[pos] = '<span style="'+styleOn+color+'" '+data+'> ';
					row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if (!row[pos]) {
					row[pos] = ' ';
					row[pos] += spaceAfter;
				}
			}
		}

       	var str = row.join("");
    	
    	return ( str.indexOf("span") == -1 )? "" : str;
    },
    /* 
     * Function: Sequence._drawRaw
     * Purpose:  Repaint the current sequence using RAW format.  
     * Returns:  -
     * Inputs: -
     */
	_drawRaw : function() {
		var self = this;
		var a = this.opt.sequence.toLowerCase().split('');
		var i = 0;
		var arr = [];
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);
		
		/* Correct column size in case the sequence is as small peptide */
		var numCols = this.opt.columns.size;
		if ( this.opt.sequence.length < this.opt.columns.size ) {
			numCols = this.opt.sequence.length;	
		}

		var opt = {
			numCols: numCols
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	/* 
     * Function: Sequence._drawPride
     * Purpose:  Repaint the current sequence using PRIDE format.  
     * Returns:  -
     * Inputs: -
     */
	_drawPride : function() {
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);
		
		/* Correct column size in case the sequence is as small peptide */
		var numCols = this.opt.columns.size;
		if ( this.opt.sequence.length < this.opt.columns.size ) {
			numCols = this.opt.sequence.length;	
		}
	
		opt = {
			numLeft: true,
			numLeftSize: 5,
			numLeftPad:'0',
			numRight: true,
			numRightSize: 5,
			numRightPad: '0',
			numCols: numCols,
		    numColsForSpace: self.opt.columns.spacedEach
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	/* 
     * Function: Sequence._drawSequence
     * Purpose:  Repaint the current sequence using CUSTOM format.  
     * Returns:  -
     * Inputs:   a -> {char[]} a The sequence strand.
     * 			 opt -> {Object} opt The CUSTOM format.
     */
	_drawSequence : function(a, opt) {
		var buff = [];

		var spaceStyle =  "white-space: pre;";
		
		// Index at top?
		if( opt.numTop )
		{
      buff.push('<span style="', spaceStyle, '" class="numTop">');
			var size = (opt.spaceBetweenChars)? opt.numTopEach*2: opt.numTopEach;
			
			if (opt.numLeft) {
				buff.push(this._formatIndex(' ', opt.numLeftSize, ' '));
			}
			
			buff.push(this._formatIndex(' ', size, ' '));
			
			for(var x = opt.numTopEach; x < opt.numCols; x += opt.numTopEach) {
				buff.push(this._formatIndex(x, size, ' ', true));
			}
			buff.push('</span><br/>');
		}
		
		
		// Index at the left?
		if (opt.numLeft) {
			buff.push(this._formatIndex(1, opt.numLeftSize, opt.numLeftPad), '  ');
		}

		var j=1;
		for (var i=1; i <= a.length; i++) {

			if( i % opt.numCols === 0) {	
				buff.push('<span class="sequence" id="', this.getId(), '_', i, '">', a[i-1], '</span>');
				
				if (opt.numRight) {
					buff.push('<span style="', spaceStyle, '" id="numRight_', this.getId(), '_', i, '">');
          buff.push('  ');
					buff.push(this._formatIndex(i, opt.numRightSize, opt.numRightPad));
          buff.push('</span>');
				}
				
				buff.push('<br/>');
				
				var aaRemaining = a.length - i;
				if (opt.numLeft && aaRemaining > 0) {
					buff.push('<span id="numLeft_', this.getId(), '_', i, '">');
					buff.push(this._formatIndex(i+1, opt.numLeftSize, opt.numLeftPad));
					buff.push('  </span>');
				}
				
				j = 1;
				
			} else {
        buff.push('<span class="sequence"');
        buff.push(' style="', spaceStyle, '"');
        buff.push(' id="', this.getId(), '_', i, '">', a[i-1]);
        buff.push(j % opt.numColsForSpace === 0 ? ' ' : '');
        buff.push(opt.spaceBetweenChars ? ' ' : '');
        buff.push('</span>');
        j++;
			}
		}
		
		buff.push('<br/>');
			
		if (jQuery.browser && jQuery.browser.msie) {
      return "<pre>" + buff.join('') + "</pre>";
		}	else {
      return buff.join('');
    }
	},
	/* 
     * Function: Sequence._formatIndex
     * Purpose:  Build the HTML corresponding to counting numbers (top, left, right) in the strand.
     * Returns:  -
     * Inputs:   number -> {int} The number 
     * 			 size -> {int} Number of bins to suit the number.
     * 			 fillingChar -> {char} Character to be used for filling out blank bins.
     * 			 alignLeft -> {bool} Tell if aligned to the left.
     */
	_formatIndex : function( number, size, fillingChar, alignLeft) {
		var str = number.toString();
		var filling = '';
		var padding = size - str.length;	
		if ( padding > 0 ) {
			while ( padding-- > 0 ) {
				filling += ("<span>"+fillingChar+"</span>");
			}
			if (alignLeft){
				str = number+filling;
			} else {
				str = filling+number;
			}
		}
		return str;
	},
	/* 
     * Function: Sequence._addSpanEvents
     * Purpose:  Add the event handlers to the strand.
     * Returns:  -
     * Inputs:   -
     */
	_addSpanEvents : function() {
		var self = this;
		var isMouseDown = false;
		var currentPos;

		self._contentDiv.find('.sequence').each( function () {	
			
			// Register the starting position
			jQuery(this).mousedown(function() {
				var id = jQuery(this).attr('id');
				currentPos = parseInt(id.substr(id.indexOf("_") + 1));
				clickPos = currentPos;
				self._setSelection(clickPos,currentPos);
				isMouseDown = true;
				
				// Selection is happening, raise an event
				self.trigger(
					EVT_ON_SELECTION_CHANGE, 
					{ 
						"start" : self.opt.selection.start, 
						"end" : self.opt.selection.end 
					}
				);
			
			}).mouseover(function() {
				// Update selection
				// Show tooltip containing the position
				var id = jQuery(this).attr('id');
				currentPos = parseInt(id.substr(id.indexOf("_") + 1));
				
				if(isMouseDown) {
					if( currentPos > clickPos ) {
						self._setSelection(clickPos, currentPos);
					} else {
						self._setSelection(currentPos, clickPos);
					}
					
					// Selection is happening, raise an event
					self.trigger( EVT_ON_SELECTION_CHANGE, { 
						"start" : self.opt.selection.start, 
						"end" : self.opt.selection.end 
					});
				} 
				
			}).mouseup(function() {
				isMouseDown = false;
				// Selection is done, raise an event
				self.trigger( EVT_ON_SELECTION_CHANGED, { 
					"start" : self.opt.selection.start, 
					"end" : self.opt.selection.end 
				});
			});
			
			// Add a tooltip for this sequence base.
			self._addToolTip.call( self, this, function( ) {
				if (isMouseDown) {
	     			return "[" + self.opt.selection.start +", " + self.opt.selection.end + "]";
	     		} else {
	     			return currentPos;
	     		}
			});
			
		})
		.css('cursor', 'pointer');
	},
	/* 
     * Function: Sequence._addTooltip
     * Purpose:  Add a tooltip around the target DOM element provided as argument
     * Returns:  -
     * Inputs:   target -> {Element} DOM element wich is the targeted focus for the tooltip.
     * 			 cbGetMessageFunction -> {function} A callback function wich returns the message to be displayed in the tip.
     */
	_addToolTip : function ( target, cbGetMessageFunction ) {
		
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
	},
	
   /**
    * Annotate a set of intervals provided in the argument.
	* 
	* @deprecated Use addAnnotation() instead.
    * 
    * @param {Object} annotation The intervals belonging to the same annotation. 
    * Syntax: { name: &lt;value&gt;, color: &lt;HTMLColorCode&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
    */
	setAnnotation: function ( annotation ) {
		this.addAnnotation(annotation);
	},
	
	/**
    * Annotate a set of intervals provided in the argument.
    * 
    * @example
    * // Annotations using regions with different colors.
    * mySequence.addAnnotation({
	*    name:"UNIPROT", 
	*    html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
	*    color:"green", 
	*    regions: [
	*       {start: 540, end: 560},
	*       {start: 561, end:580, color: "#FFA010"}, 
	*       {start: 581, end:590, color: "red"}, 
	*       {start: 690, end:710}]
	* });
	* 
    * 
    * @param {Object} annotation The intervals belonging to the same annotation. 
    * Syntax: { name: &lt;value&gt;, color: &lt;HTMLColorCode&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
    */
	addAnnotation: function ( annotation ) {
		this._annotations.push(annotation);
		this._redraw();
	},
	
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
	removeAnnotation: function ( name ) {
		for (var i=0; i < this._annotations.length ; i++ ){
			if(name != this._annotations[i].name){
				this._annotations.splice(i,1);
				this._redraw();
				break;
			}
		}
	},
	/**
    * Removes all the current annotations.
    * 
    * @example 
    * mySequence.removeAllAnnotations(); 
    * 
    */
	removeAllAnnotations: function () {
		this._annotations = [];
		this._redraw();
	},

	
});

require("biojs-events").mixin(Sequence.prototype);
module.exports = Sequence;

},{"biojs-events":2,"jquery-browser-plugin":5,"js-class":7}],2:[function(require,module,exports){
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

},{"backbone-events-standalone":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = require('./backbone-events-standalone');

},{"./backbone-events-standalone":3}],5:[function(require,module,exports){
module.exports = require('./jquery.browser');

},{"./jquery.browser":6}],6:[function(require,module,exports){
/*!
 * jQuery Browser Plugin v0.0.6
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */


var matched, browser;

var uaMatch = function( ua ) {
  ua = ua.toLowerCase();

  var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
    /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
    /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
    /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
    [];

  var platform_match = /(ipad)/.exec( ua ) ||
    /(iphone)/.exec( ua ) ||
    /(android)/.exec( ua ) ||
    /(windows phone)/.exec( ua ) ||
    /(win)/.exec( ua ) ||
    /(mac)/.exec( ua ) ||
    /(linux)/.exec( ua ) ||
    /(cros)/i.exec( ua ) ||
    [];

  return {
    browser: match[ 3 ] || match[ 1 ] || "",
    version: match[ 2 ] || "0",
    platform: platform_match[ 0 ] || ""
  };
};

matched = uaMatch( window.navigator.userAgent );
browser = {};
browser.uaMatch = uaMatch;

if ( matched.browser ) {
  browser[ matched.browser ] = true;
  browser.version = matched.version;
  browser.versionNumber = parseInt(matched.version);
}

if ( matched.platform ) {
  browser[ matched.platform ] = true;
}

// These are all considered mobile platforms, meaning they run a mobile browser
if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
  browser.mobile = true;
}

// These are all considered desktop platforms, meaning they run a desktop browser
if ( browser.cros || browser.mac || browser.linux || browser.win ) {
  browser.desktop = true;
}

// Chrome, Opera 15+ and Safari are webkit based browsers
if ( browser.chrome || browser.opr || browser.safari ) {
  browser.webkit = true;
}

// IE11 has a new token so we will assign it msie to avoid breaking changes
if ( browser.rv )
{
  var ie = "msie";

  matched.browser = ie;
  browser[ie] = true;
}

// Opera 15+ are identified as opr
if ( browser.opr )
{
  var opera = "opera";

  matched.browser = opera;
  browser[opera] = true;
}

// Stock Android browsers are marked as Safari on Android.
if ( browser.safari && browser.android )
{
  var android = "android";

  matched.browser = android;
  browser[android] = true;
}

// Assign the name and platform variable
browser.name = matched.browser;
browser.platform = matched.platform;


module.exports = browser;

},{}],7:[function(require,module,exports){
(function (global){
/** @preserve http://github.com/easeway/js-class */

// Class Definition using ECMA5 prototype chain

function inherit(dest, src, noParent) {
    while (src && src !== Object.prototype) {
        Object.getOwnPropertyNames(src).forEach(function (name) {
            if (name != '.class' && !dest.hasOwnProperty(name)) {
                var desc = Object.getOwnPropertyDescriptor(src, name);
                Object.defineProperty(dest, name, desc);
            }
        });
        if (noParent) {
            break;
        }
        src = src.__proto__;
    }
    return dest;
}

var Class = function (base, proto, options) {
    if (typeof(base) != 'function') {
        options = proto;
        proto = base;
        base = Object;
    }
    if (!proto) {
        proto = {};
    }
    if (!options) {
        options = {};
    }
    
    var meta = {
        name: options.name,
        base: base,
        implements: []
    }
    var classProto = Class.clone(proto);
    if (options.implements) {
        (Array.isArray(options.implements) ? options.implements : [options.implements])
            .forEach(function (implementedType) {
                if (typeof(implementedType) == 'function' && implementedType.prototype) {
                    meta.implements.push(implementedType);
                    Class.extend(classProto, implementedType.prototype);
                }
            });
    }
    classProto.__proto__ = base.prototype;
    var theClass = function () {
        if (typeof(this.constructor) == 'function') {
            this.constructor.apply(this, arguments);
        }
    };
    meta.type = theClass;
    theClass.prototype = classProto;
    Object.defineProperty(theClass, '.class.meta', { value: meta, enumerable: false, configurable: false, writable: false });
    Object.defineProperty(classProto, '.class', { value: theClass, enumerable: false, configurable: false, writable: false });
    if (options.statics) {
        Class.extend(theClass, options.statics);
    }
    return theClass;
};

Class.extend = inherit;

Class.clone = function (object) {
    return inherit({}, object);
};

function findType(meta, type) {
    while (meta) {
        if (meta.type.prototype === type.prototype) {
            return true;
        }
        for (var i in meta.implements) {
            var implType = meta.implements[i];
            var implMeta = implType['.class.meta'];
            if (implMeta) {
                if (findType(implMeta, type)) {
                    return true;
                }
            } else {
                for (var proto = implType.prototype; proto; proto = proto.__proto__) {
                    if (proto === type.prototype) {
                        return true;
                    }
                }
            }
        }
        meta = meta.base ? meta.base['.class.meta'] : undefined;
    }
    return false;
}

var Checker = Class({
    constructor: function (object) {
        this.object = object;
    },
    
    typeOf: function (type) {
        if (this.object instanceof type) {
            return true;
        }
        var meta = Class.typeInfo(this.object);
        return meta && findType(meta, type);
    }
});

// aliases
Checker.prototype.a = Checker.prototype.typeOf;
Checker.prototype.an = Checker.prototype.typeOf;

Class.is = function (object) {
    return new Checker(object);
};

Class.typeInfo = function (object) {
    var theClass = object.__proto__['.class'];
    return theClass ? theClass['.class.meta'] : undefined;
};

Class.VERSION = [0, 0, 2];

if (module) {
    module.exports = Class;
} else {
    global.Class = Class;   // for browser
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"biojs-vis-sequence":[function(require,module,exports){
module.exports = require("./lib/index");

},{"./lib/index":1}]},{},["biojs-vis-sequence"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL2xpYi9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9ub2RlX21vZHVsZXMvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL25vZGVfbW9kdWxlcy9iaW9qcy1ldmVudHMvbm9kZV9tb2R1bGVzL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanF1ZXJ5LWJyb3dzZXItcGx1Z2luL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanF1ZXJ5LWJyb3dzZXItcGx1Z2luL2pxdWVyeS5icm93c2VyLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanMtY2xhc3MvY2xhc3MuanMiLCIuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoNENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JSQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGxlZ2FjeSEhXG4kLmJyb3dzZXIgPSByZXF1aXJlKFwianF1ZXJ5LWJyb3dzZXItcGx1Z2luXCIpO1xuXG4vKiogXG4gKiBTZXF1ZW5jZSBjb21wb25lbnQgXG4gKiBcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQmlvanNcbiAqIFxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmpvaG5jYXJAZ21haWwuY29tXCI+Sm9obiBHb21lejwvYT4sIDxhIGhyZWY9XCJtYWlsdG86c2VjZXZhbGxpdkBnbWFpbC5jb21cIj5Kb3NlIFZpbGxhdmVjZXM8L2E+XG4gKiBAdmVyc2lvbiAxLjAuMFxuICogQGNhdGVnb3J5IDNcbiAqIFxuICogQHJlcXVpcmVzIDxhIGhyZWY9J2h0dHA6Ly9ibG9nLmpxdWVyeS5jb20vMjAxMS8wOS8xMi9qcXVlcnktMS02LTQtcmVsZWFzZWQvJz5qUXVlcnkgQ29yZSAxLjYuNDwvYT5cbiAqIEBkZXBlbmRlbmN5IDxzY3JpcHQgbGFuZ3VhZ2U9XCJKYXZhU2NyaXB0XCIgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIi4uL2Jpb2pzL2RlcGVuZGVuY2llcy9qcXVlcnkvanF1ZXJ5LTEuNC4yLm1pbi5qc1wiPjwvc2NyaXB0PlxuICogXG4gKiBAcmVxdWlyZXMgPGEgaHJlZj0naHR0cDovL2pxdWVyeXVpLmNvbS9kb3dubG9hZCc+alF1ZXJ5IFVJIDEuOC4xNjwvYT5cbiAqIEBkZXBlbmRlbmN5IDxzY3JpcHQgbGFuZ3VhZ2U9XCJKYXZhU2NyaXB0XCIgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIi4uL2Jpb2pzL2RlcGVuZGVuY2llcy9qcXVlcnkvanF1ZXJ5LXVpLTEuOC4yLmN1c3RvbS5taW4uanNcIj48L3NjcmlwdD5cbiAqXG4gKiBAcmVxdWlyZXMgPGEgaHJlZj0nQmlvanMuVG9vbHRpcC5jc3MnPkJpb2pzLlRvb2x0aXA8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCJzcmMvQmlvanMuVG9vbHRpcC5qc1wiPjwvc2NyaXB0PlxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBBbiBvYmplY3Qgd2l0aCB0aGUgb3B0aW9ucyBmb3IgU2VxdWVuY2UgY29tcG9uZW50LlxuICogICAgXG4gKiBAb3B0aW9uIHtzdHJpbmd9IHRhcmdldCBcbiAqICAgIElkZW50aWZpZXIgb2YgdGhlIERJViB0YWcgd2hlcmUgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzcGxheWVkLlxuICogICAgXG4gKiBAb3B0aW9uIHtzdHJpbmd9IHNlcXVlbmNlIFxuICogICAgVGhlIHNlcXVlbmNlIHRvIGJlIGRpc3BsYXllZC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSBbaWRdIFxuICogICAgU2VxdWVuY2UgaWRlbnRpZmllciBpZiBhcHBseS5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSBbZm9ybWF0PVwiRkFTVEFcIl0gXG4gKiAgICBUaGUgZGlzcGxheSBmb3JtYXQgZm9yIHRoZSBzZXF1ZW5jZSByZXByZXNlbnRhdGlvbi5cbiAqICAgIFxuICogQG9wdGlvbiB7T2JqZWN0W119IFtoaWdobGlnaHRzXSBcbiAqIFx0ICBGb3IgaGlnaGxpZ2h0aW5nIG11bHRpcGxlIHJlZ2lvbnMuIFxuICogICAgPHByZSBjbGFzcz1cImJydXNoOiBqc1wiIHRpdGxlPVwiU3ludGF4OlwiPiBcbiAqICAgIFtcbiAqICAgIFx0Ly8gSGlnaGxpZ2h0IGFtaW5vYWNpZHMgZnJvbSAnc3RhcnQnIHRvICdlbmQnIG9mIHRoZSBjdXJyZW50IHN0cmFuZCB1c2luZyB0aGUgc3BlY2lmaWVkICdjb2xvcicgKG9wdGlvbmFsKSBhbmQgJ2JhY2tncm91bmQnIChvcHRpb25hbCkuXG4gKiAgICBcdHsgc3RhcnQ6ICZsdDtzdGFydFZhbDEmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWwxJmd0OyBbLCBpZDombHQ7aWRWYWwxJmd0O10gWywgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7XSBbLCBiYWNrZ3JvdW5kOiAmbHQ7SFRNTENvbG9yJmd0O119LCBcbiAqICAgIFx0Ly9cbiAqICAgIFx0Ly8gQW55IG90aGVycyBoaWdobGlnaHRzXG4gKiAgICBcdC4uLiwgIFxuICogICAgXHQvLyBcbiAqICAgIFx0eyBzdGFydDogJmx0O3N0YXJ0VmFsTiZndDssIGVuZDogJmx0O2VuZFZhbE4mZ3Q7IFssIGlkOiZsdDtpZFZhbE4mZ3Q7XSBbLCBjb2xvcjogJmx0O0hUTUxDb2xvciZndDtdIFssIGJhY2tncm91bmQ6ICZsdDtIVE1MQ29sb3ImZ3Q7XX1cbiAqICAgIF08L3ByZT5cbiAqIFxuICogPHByZSBjbGFzcz1cImJydXNoOiBqc1wiIHRpdGxlPVwiRXhhbXBsZTpcIj4gXG4gKiBoaWdobGlnaHRzIDogW1xuICogXHRcdHsgc3RhcnQ6MzAsIGVuZDo0MiwgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiZ3JlZW5cIiwgaWQ6XCJzcGluMVwiIH0sXG4gKlx0XHR7IHN0YXJ0OjEzOSwgZW5kOjE0MCB9LCBcbiAqXHRcdHsgc3RhcnQ6NjMxLCBlbmQ6NjMzLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJibHVlXCIgfVxuICpcdF1cbiAqIDwvcHJlPlxuICogXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtjb2x1bW5zPXtzaXplOjQwLHNwYWNlZEVhY2g6MTB9XSBcbiAqIFx0ICBPcHRpb25zIGZvciBkaXNwbGF5aW5nIHRoZSBjb2x1bW5zLiBTeW50YXg6IHsgc2l6ZTogJmx0O251bUNvbHMmZ3Q7LCBzcGFjZWRFYWNoOiAmbHQ7bnVtQ29scyZndDt9XG4gKiBcbiAqIEBvcHRpb24ge09iamVjdH0gW3NlbGVjdGlvbl0gXG4gKiBcdCAgUG9zaXRpb25zIGZvciB0aGUgY3VycmVudCBzZWxlY3RlZCByZWdpb24uIFN5bnRheDogeyBzdGFydDogJmx0O3N0YXJ0VmFsdWUmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWx1ZSZndDt9XG4gKiBcbiAqIEBvcHRpb24ge09iamVjdFtdfSBbYW5ub3RhdGlvbnNdIFxuICogICAgU2V0IG9mIG92ZXJsYXBwaW5nIGFubm90YXRpb25zLiBNdXN0IGJlIGFuIGFycmF5IG9mIG9iamVjdHMgZm9sbG93aW5nIHRoZSBzeW50YXg6XG4gKiAgICAgXHRcdDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIlN5bnRheDpcIj5cbiAqICAgICAgICAgICAgWyBcbiAqICAgICAgICAgICAgICAvLyBBbiBhbm5vdGF0aW9uOlxuICogICAgICAgICAgICAgIHsgbmFtZTogJmx0O25hbWUmZ3Q7LCBcbiAqICAgICAgICAgICAgICAgIGh0bWw6ICZsdDttZXNzYWdlJmd0OywgXG4gKiAgICAgICAgICAgICAgICBjb2xvcjogJmx0O2NvbG9yX2NvZGUmZ3Q7LCBcbiAqICAgICAgICAgICAgICAgIHJlZ2lvbnM6IFt7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDsgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7fSwgLi4uLHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0OywgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7fV0gXG4gKiAgICAgICAgICAgICAgfSwgXG4gKiAgICAgICAgICAgICAgXG4gKiAgICAgICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICAgICAgLy8gbW9yZSBhbm5vdGF0aW9ucyBoZXJlIFxuICogICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICBdXG4gKiAgICBcdFx0IDwvcHJlPlxuICogICAgd2hlcmU6XG4gKiAgICAgIDx1bD5cbiAqICAgICAgICA8bGk+PGI+bmFtZTwvYj4gaXMgdGhlIHVuaXF1ZSBuYW1lIGZvciB0aGUgYW5ub3RhdGlvbjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPmh0bWw8L2I+IGlzIHRoZSBtZXNzYWdlIChjYW4gYmUgSFRNTCkgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB0b29sIHRpcC48L2xpPlxuICogICAgICAgIDxsaT48Yj5jb2xvcjwvYj4gaXMgdGhlIGRlZmF1bHQgSFRNTCBjb2xvciBjb2RlIGZvciBhbGwgdGhlIHJlZ2lvbnMuPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uczwvYj4gYXJyYXkgb2Ygb2JqZWN0cyBkZWZpbmluZyB0aGUgaW50ZXJ2YWxzIHdoaWNoIGJlbG9uZ3MgdG8gdGhlIGFubm90YXRpb24uPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uc1tpXS5zdGFydDwvYj4gaXMgdGhlIHN0YXJ0aW5nIGNoYXJhY3RlciBmb3IgdGhlIGktdGggaW50ZXJ2YWwuPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uc1tpXS5lbmQ8L2I+IGlzIHRoZSBlbmRpbmcgY2hhcmFjdGVyIGZvciB0aGUgaS10aCBpbnRlcnZhbC48L2xpPlxuICogICAgICAgIDxsaT48Yj5yZWdpb25zW2ldLmNvbG9yPC9iPiBpcyBhbiBvcHRpb25hbCBjb2xvciBmb3IgdGhlIGktdGggaW50ZXJ2YWwuICAgXG4gKiAgICAgIDwvdWw+IFxuICogICAgICBcbiAqIEBvcHRpb24ge09iamVjdH0gW2Zvcm1hdE9wdGlvbnM9e3RpdGxlOnRydWUsIGZvb3Rlcjp0cnVlfV0gXG4gKiBcdCAgT3B0aW9ucyBmb3IgZGlzcGxheWluZyB0aGUgdGl0bGUuIGJ5IG5vdyBqdXN0IGFmZmVjdGluZyB0aGUgQ09EQVRBIGZvcm1hdC5cbiAqICAgIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIlN5bnRheDpcIj4gXG4gKiBcdFx0Zm9ybWF0T3B0aW9ucyA6IHtcbiAqIFx0XHRcdHRpdGxlOmZhbHNlLFxuICogXHRcdFx0Zm9vdGVyOmZhbHNlXG4gKiBcdFx0fVxuICogICAgPC9wcmU+XG4gKiAgICBcbiAqIEBleGFtcGxlIFxuICogdmFyIHRoZVNlcXVlbmNlID0gXCJNRVRMQ1FSTE5WQ1FES0lMVEhZRU5EU1RETFJESElEWVdLSE1STEVDQUlZWUtBUkVNR0ZLSElOSFFWVlBUTEFWU0tOS0FMUUFJRUxRTFRMRVRJWU5TUVlTTkVLV1RMUURWU0xFVllMVEFQVEdDSUtLSEdZVFZFVlFGREdESUNOVE1IWVROV1RISVlJQ0VFQW9qcyBTVlRWVkVHUVZEWVlHTFlZVkhFR0lSVFlGVlFGS0REQUVLWVNLTktWV0VWSEFHR1FWSUxDUFRTVkZTU05FVlNTUEVJSVJRSExBTkhQQUFUSFRLQVZBTEdURUVUUVRUSVFSUFJTRVBEVEdOUENIVFRLTExIUkRTVkRTQVBJTFRBRk5TU0hLR1JJTkNOU05UVFBJVkhMS0dEQU5UTEtDTFJZUkZLS0hDVExZVEFWU1NUV0hXVEdITlZLSEtTQUlWVExUWURTRVdRUkRRRkxTUVZLSVBLVElUVlNUR0ZNU0lcIjtcbiAqIHZhciBteVNlcXVlbmNlID0gbmV3IFNlcXVlbmNlKHtcbiAqIFx0XHRzZXF1ZW5jZSA6IHRoZVNlcXVlbmNlLFxuICogXHRcdHRhcmdldCA6IFwiWW91ck93bkRpdklkXCIsXG4gKiBcdFx0Zm9ybWF0IDogJ0NPREFUQScsXG4gKiBcdFx0aWQgOiAnUDkxODI4MycsXG4gKiBcdFx0YW5ub3RhdGlvbnM6IFtcbiAqICAgICAgICB7IG5hbWU6XCJDQVRIXCIsIFxuICogXHQgIFx0XHRjb2xvcjpcIiNGMEYwMjBcIiwgXG4gKiBcdCAgXHRcdGh0bWw6IFwiVXNpbmcgY29sb3IgY29kZSAjRjBGMDIwIFwiLCBcbiAqIFx0ICBcdFx0cmVnaW9uczogW3tzdGFydDogMTIyLCBlbmQ6IDEzNX1dXG4gKiBcdFx0ICB9LFxuICogICAgICAgIHsgbmFtZTpcIlRFU1RcIiwgXG4gKiAgICAgICAgICBodG1sOlwiJmx0O2JyJmd0OyBFeGFtcGxlIG9mICZsdDtiJmd0O0hUTUwmbHQ7L2ImZ3Q7XCIsIFxuICogICAgICAgICAgY29sb3I6XCJncmVlblwiLCBcbiAqICAgICAgICAgIHJlZ2lvbnM6IFtcbiAqICAgICAgICAgICAge3N0YXJ0OiAyODUsIGVuZDogMjkyfSxcbiAqICAgICAgICAgICAge3N0YXJ0OiAyOTMsIGVuZDogMzE0LCBjb2xvcjogXCIjMkU0OTg4XCJ9XVxuICogICAgICAgIH1cbiAqICAgICAgXSxcbiAqICAgICAgaGlnaGxpZ2h0cyA6IFtcbiAqICAgICAgXHR7IHN0YXJ0OjMwLCBlbmQ6NDIsIGNvbG9yOlwid2hpdGVcIiwgYmFja2dyb3VuZDpcImdyZWVuXCIsIGlkOlwic3BpbjFcIiB9LFxuICogICAgICBcdHsgc3RhcnQ6MTM5LCBlbmQ6MTQwIH0sIFxuICogICAgICBcdHsgc3RhcnQ6NjMxLCBlbmQ6NjMzLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJibHVlXCIgfVxuICogICAgICBdXG4gKiB9KTtcdFxuICogXG4gKi9cblxudmFyIENsYXNzID0gcmVxdWlyZSgnanMtY2xhc3MnKTtcblxudmFyIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFID0gXCJzZWxlY3Rpb24tY2hhbmdlXCI7XG52YXIgRVZUX09OX1NFTEVDVElPTl9DSEFOR0VEID0gXCJzZWxlY3Rpb24tY2hhbmdlZFwiO1xudmFyIEVWVF9PTl9BTk5PVEFUSU9OX0NMSUNLRUQgPSBcImFubm90YXRpb24tY2xpY2tlZFwiO1xuXG5TZXF1ZW5jZSA9IENsYXNzKFxuLyoqIEBsZW5kcyBTZXF1ZW5jZSMgKi9cbntcdFxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLm9wdCA9IGpRdWVyeS5leHRlbmQodGhpcy5vcHQsb3B0aW9ucyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIgPSBqUXVlcnkodGhpcy5vcHQudGFyZ2V0KTtcblx0XHRcblx0XHQvLyBMYXp5IGluaXRpYWxpemF0aW9uIFxuXHRcdHRoaXMuX2NvbnRhaW5lci5yZWFkeShmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYuX2luaXRpYWxpemUoKTtcblx0XHR9KTtcblx0fSxcblx0XG5cdC8qKlxuXHQgKiBEZWZhdWx0IHZhbHVlcyBmb3IgdGhlIG9wdGlvbnNcblx0ICogQG5hbWUgU2VxdWVuY2Utb3B0XG5cdCAqL1xuXHRvcHQgOiB7XG5cdFx0XG5cdFx0c2VxdWVuY2UgOiBcIlwiLFxuXHRcdGlkIDogXCJcIixcblx0XHR0YXJnZXQgOiBcIlwiLFxuXHRcdGZvcm1hdCA6IFwiRkFTVEFcIixcblx0XHRzZWxlY3Rpb246IHsgc3RhcnQ6IDAsIGVuZDogMCB9LFxuXHRcdGNvbHVtbnM6IHsgc2l6ZTogMzUsIHNwYWNlZEVhY2g6IDEwIH0sXG5cdFx0aGlnaGxpZ2h0cyA6IFtdLFxuXHRcdGFubm90YXRpb25zOiBbXSxcblx0XHRzZXF1ZW5jZVVybDogJ2h0dHA6Ly93d3cuZWJpLmFjLnVrL2Rhcy1zcnYvdW5pcHJvdC9kYXMvdW5pcHJvdC9zZXF1ZW5jZScsXG5cdFx0XG5cdFx0Ly8gU3R5bGVzIFxuXHRcdHNlbGVjdGlvbkNvbG9yIDogJ1llbGxvdycsXG5cdFx0c2VsZWN0aW9uRm9udENvbG9yIDogJ2JsYWNrJyxcblx0XHRoaWdobGlnaHRGb250Q29sb3IgOiAncmVkJyxcblx0XHRoaWdobGlnaHRCYWNrZ3JvdW5kQ29sb3IgOiAnd2hpdGUnLFxuXHRcdGZvbnRGYW1pbHk6ICdcIkFuZGFsZSBtb25vXCIsIGNvdXJpZXIsIG1vbm9zcGFjZScsXG5cdFx0Zm9udFNpemU6ICcxMnB4Jyxcblx0XHRmb250Q29sb3IgOiAnaW5oZXJpdCcsXG5cdFx0YmFja2dyb3VuZENvbG9yIDogJ2luaGVyaXQnLFxuXHRcdHdpZHRoOiB1bmRlZmluZWQsXG5cdFx0aGVpZ2h0OiB1bmRlZmluZWQsXG5cdFx0Zm9ybWF0U2VsZWN0b3JWaXNpYmxlOiB0cnVlXG5cdH0sXG5cdFxuXHQvKipcblx0ICogQXJyYXkgY29udGFpbmluZyB0aGUgc3VwcG9ydGVkIGV2ZW50IG5hbWVzXG5cdCAqIEBuYW1lIFNlcXVlbmNlLWV2ZW50VHlwZXNcblx0ICovXG5cdGV2ZW50VHlwZXMgOiBbXG5cdFx0LyoqXG5cdFx0ICogQG5hbWUgU2VxdWVuY2Ujb25TZWxlY3Rpb25DaGFuZ2VkXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uUGVyZm9ybWVkIEFuIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGFuIHtAbGluayBCaW9qcy5FdmVudH0gb2JqZWN0IGFzIGFyZ3VtZW50LlxuXHRcdCAqIEBldmVudERhdGEge09iamVjdH0gc291cmNlIFRoZSBjb21wb25lbnQgd2hpY2ggZGlkIHRyaWdnZXJlZCB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7c3RyaW5nfSB0eXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtpbnR9IHN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24uXG5cdFx0ICogQGV2ZW50RGF0YSB7aW50fSBlbmQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgZW5kaW5nIG9mIHNlbGVjdGlvbi5cblx0XHQgKiBAZXhhbXBsZSBcblx0XHQgKiBteVNlcXVlbmNlLm9uU2VsZWN0aW9uQ2hhbmdlZChcblx0XHQgKiAgICBmdW5jdGlvbiggb2JqRXZlbnQgKSB7XG5cdFx0ICogICAgICAgYWxlcnQoXCJTZWxlY3RlZDogXCIgKyBvYmpFdmVudC5zdGFydCArIFwiLCBcIiArIG9iakV2ZW50LmVuZCApO1xuXHRcdCAqICAgIH1cblx0XHQgKiApOyBcblx0XHQgKiBcblx0XHQgKiAqL1xuXHRcdEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCxcblx0XHRcblx0XHQvKipcblx0XHQgKiBAbmFtZSBTZXF1ZW5jZSNvblNlbGVjdGlvbkNoYW5nZVxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuXHRcdCAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7aW50fSBzdGFydCBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBzdGFydCBvZiB0aGUgc2VsZWN0aW9uLlxuXHRcdCAqIEBldmVudERhdGEge2ludH0gZW5kIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIGVuZGluZyBvZiBzZWxlY3Rpb24uXG5cdFx0ICogQGV4YW1wbGUgXG5cdFx0ICogbXlTZXF1ZW5jZS5vblNlbGVjdGlvbkNoYW5nZShcblx0XHQgKiAgICBmdW5jdGlvbiggb2JqRXZlbnQgKSB7XG5cdFx0ICogICAgICAgYWxlcnQoXCJTZWxlY3Rpb24gaW4gcHJvZ3Jlc3M6IFwiICsgb2JqRXZlbnQuc3RhcnQgKyBcIiwgXCIgKyBvYmpFdmVudC5lbmQgKTtcblx0XHQgKiAgICB9XG5cdFx0ICogKTsgIFxuXHRcdCAqIFxuXHRcdCAqIFxuXHRcdCAqICovXG5cdFx0RVZUX09OX1NFTEVDVElPTl9DSEFOR0UsXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogQG5hbWUgU2VxdWVuY2Ujb25Bbm5vdGF0aW9uQ2xpY2tlZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuXHRcdCAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZWxlY3RlZCBhbm5vdGF0aW9uLlxuXHRcdCAqIEBldmVudERhdGEge2ludH0gcG9zIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBzZWxlY3RlZCBhbWlubyBhY2lkLlxuXHRcdCAqIEBleGFtcGxlIFxuXHRcdCAqIG15U2VxdWVuY2Uub25Bbm5vdGF0aW9uQ2xpY2tlZChcblx0XHQgKiAgICBmdW5jdGlvbiggb2JqRXZlbnQgKSB7XG5cdFx0ICogICAgICAgYWxlcnQoXCJDbGlja2VkIFwiICsgb2JqRXZlbnQubmFtZSArIFwiIG9uIHBvc2l0aW9uIFwiICsgb2JqRXZlbnQucG9zICk7XG5cdFx0ICogICAgfVxuXHRcdCAqICk7ICBcblx0XHQgKiBcblx0XHQgKiAqL1xuXHRcdEVWVF9PTl9BTk5PVEFUSU9OX0NMSUNLRURcblx0XSxcblxuICBnZXRJZCA6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHQuaWQ7XG4gIH0sXG5cblx0Ly8gaW50ZXJuYWwgbWVtYmVyc1xuXHRfaGVhZGVyRGl2IDogbnVsbCxcblx0X2NvbnRlbnREaXYgOiBudWxsLFxuXHRcblx0Ly8gTWV0aG9kc1xuXG5cdF9pbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdFx0XG5cdFx0aWYgKCB0aGlzLm9wdC53aWR0aCA+IDAgKSB7XG5cdFx0XHR0aGlzLl9jb250YWluZXIud2lkdGgoIHRoaXMub3B0LndpZHRoICk7XG5cdFx0fVxuXHRcdFxuXHRcdGlmICggdGhpcy5vcHQuaGVpZ2h0ID4gMCApIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5oZWlnaHQoIHRoaXMub3B0LmhlaWdodCApO1xuXHRcdH1cblx0XHRcbiAgICAvLyBEaXNhYmxlIHRleHQgc2VsZWN0aW9uXG4gICAgaWYgKCF0aGlzLm9wdC5hbGxvd1NlbGVjdGlvbikge1xuICAgICAgdGhpcy5fY29udGFpbmVyLmNzcyh7XG4gICAgICAgICctbW96LXVzZXItc2VsZWN0Jzonbm9uZScsXG4gICAgICAgICctd2Via2l0LXVzZXItc2VsZWN0Jzonbm9uZScsXG4gICAgICAgICd1c2VyLXNlbGVjdCc6J25vbmUnXG4gICAgICB9KTtcbiAgICB9XG5cdFx0XG5cdFx0Ly8gRElWIGZvciB0aGUgZm9ybWF0IHNlbGVjdG9yXG5cdFx0dGhpcy5fYnVpbGRGb3JtYXRTZWxlY3RvcigpO1xuXHRcdFxuXHRcdC8vIERJViBmb3IgdGhlIHNlcXVlbmNlXG5cdFx0dGhpcy5fY29udGVudERpdiA9IGpRdWVyeSgnPGRpdj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLl9jb250YWluZXIpO1xuXHRcdHRoaXMuX2NvbnRlbnREaXYuY3NzKHtcblx0XHRcdFx0J2ZvbnQtZmFtaWx5JzogdGhpcy5vcHQuZm9udEZhbWlseSxcblx0XHRcdFx0J2ZvbnQtc2l6ZSc6IHRoaXMub3B0LmZvbnRTaXplLFxuXHRcdFx0XHQndGV4dC1hbGlnbic6ICdsZWZ0J1xuXHRcdFx0fSk7XG5cdFx0XG5cdFx0Ly8gSW5pdGlhbGl6ZSBoaWdobGlnaHRpbmcgXG5cdFx0dGhpcy5faGlnaGxpZ2h0cyA9IHRoaXMub3B0LmhpZ2hsaWdodHM7XG5cdFx0XG5cdFx0Ly8gSW5pdGlhbGl6ZSBhbm5vdGF0aW9uc1xuXHRcdHRoaXMuX2Fubm90YXRpb25zID0gdGhpcy5vcHQuYW5ub3RhdGlvbnM7XG5cdFx0XG5cdFx0Ly9Jbml0aWFsaXplIHRvb2x0aXBcblx0XHRqUXVlcnkoJzxkaXYgaWQ9XCJzZXF1ZW5jZVRpcCcgKyB0aGlzLm9wdC50YXJnZXQuaWQgKyAnXCI+PC9kaXY+JykgXG5cdCAgICAgICAgLmNzcyh7XHRcblx0ICAgICAgICBcdCdwb3NpdGlvbic6IFwiYWJzb2x1dGVcIixcblx0ICAgICAgICBcdCd6LWluZGV4JzogXCI5OTk5OTlcIixcblx0ICAgICAgICBcdCdjb2xvcic6IFwiI2ZmZlwiLFxuXHQgICAgICAgIFx0J2ZvbnQtc2l6ZSc6IFwiMTJweFwiLFxuXHQgICAgICAgIFx0J3dpZHRoJzogXCJhdXRvXCIsXG5cdCAgICAgICAgXHQnZGlzcGxheSc6ICdub25lJ1xuXHQgICAgICAgIH0pXG5cdCAgICAgICAgLmFkZENsYXNzKFwidG9vbHRpcFwiKVxuXHQgICAgICAgIC5hcHBlbmRUbyhcImJvZHlcIilcblx0ICAgICAgICAuaGlkZSgpO1xuXG5cdFx0aWYgKCAodGhpcy5vcHQuc2VxdWVuY2UpICkge1xuXHRcdFx0dGhpcy5fcmVkcmF3KCk7XG5cdFx0XHRcblx0XHR9IGVsc2UgaWYgKCAgKHRoaXMub3B0LmlkKSApIHtcblx0XHRcdHRoaXMuX3JlcXVlc3RTZXF1ZW5jZSggdGhpcy5vcHQuaWQgKTtcblx0XHRcdFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNsZWFyU2VxdWVuY2UoXCJObyBzZXF1ZW5jZSBhdmFpbGFibGVcIiwgXCIuLi9iaW9qcy9jc3MvaW1hZ2VzL3dhcm5pbmdfaWNvbi5wbmdcIik7XG5cdFx0fVxuXHRcdFxuXHR9LFxuXHRcblx0XG5cdC8qKlxuXHQgKiBTaG93cyB0aGUgY29sdW1ucyBpbmRpY2F0ZWQgYnkgdGhlIGluZGV4ZXMgYXJyYXkuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzZXEgVGhlIHNlcXVlbmNlIHN0cmFuZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IFtpZGVudGlmaWVyXSBTZXF1ZW5jZSBpZGVudGlmaWVyLlxuXHQgKiBcblx0ICogQGV4YW1wbGUgXG5cdCAqIG15U2VxdWVuY2Uuc2V0U2VxdWVuY2UoXCJQOTk5OTlcIik7XG5cdCAqIFxuXHQgKi9cbiAgICBzZXRTZXF1ZW5jZTogZnVuY3Rpb24gKCBzZXEsIGlkZW50aWZpZXIgKSB7XG5cbiAgICBcdGlmICggc2VxLm1hdGNoKC9eKFtBLU4sUi1aXVswLTldW0EtWl1bQS1aLCAwLTldW0EtWiwgMC05XVswLTldKXwoW08sUCxRXVswLTldW0EtWiwgMC05XVtBLVosIDAtOV1bQS1aLCAwLTldWzAtOV0pKFxcLlxcZCspPyQvaSkgKSB7XG4gICAgXHRcdHRoaXMuX3JlcXVlc3RTZXF1ZW5jZSggYXJndW1lbnRzWzBdICk7XG4gICAgXHRcdFxuICAgIFx0fSBlbHNlIHtcbiAgICBcdFx0dGhpcy5vcHQuc2VxdWVuY2UgPSBzZXE7XG4gICAgICAgIFx0dGhpcy5vcHQuaWQgPSBpZGVudGlmaWVyOyBcbiAgICAgICAgXHR0aGlzLl9oaWdobGlnaHRzID0gW107XG4gICAgXHRcdHRoaXMuX2hpZ2hsaWdodHNDb3VudCA9IDA7XG4gICAgXHRcdHRoaXMub3B0LnNlbGVjdGlvbiA9IHsgc3RhcnQ6IDAsIGVuZDogMCB9O1xuICAgIFx0XHR0aGlzLl9hbm5vdGF0aW9ucyA9IFtdO1xuICAgIFx0XHRcbiAgICBcdFx0dGhpcy5fY29udGVudERpdi5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgIFx0XHR0aGlzLl9yZWRyYXcoKTtcbiAgICBcdH1cbiAgICB9LFxuICAgIFxuICAgIF9yZXF1ZXN0U2VxdWVuY2U6IGZ1bmN0aW9uICggYWNjZXNzaW9uICkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcbiAgICBcdFxuICAgIFx0Y29uc29sZS5sb2coXCJSZXF1ZXN0aW5nIHNlcXVlbmNlIGZvcjogXCIgKyBhY2Nlc3Npb24gKTtcblxuXHRcdGpRdWVyeS5hamF4KHsgXG5cdFx0XHR1cmw6IHNlbGYub3B0LnNlcXVlbmNlVXJsLFxuXHRcdFx0ZGF0YVR5cGU6IFwieG1sXCIsXG5cdFx0XHRkYXRhOiB7IHNlZ21lbnQ6IGFjY2Vzc2lvbiB9LFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKCB4bWwgICkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciBzZXF1ZW5jZU5vZGUgPSBqUXVlcnkoeG1sKS5maW5kKCdTRVFVRU5DRTpmaXJzdCcpO1xuXHRcdFx0XHRcdHNlbGYuc2V0U2VxdWVuY2UoIHNlcXVlbmNlTm9kZS50ZXh0KCksIHNlcXVlbmNlTm9kZS5hdHRyKFwiaWRcIiksIHNlcXVlbmNlTm9kZS5hdHRyKFwibGFiZWxcIikgKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3IgZGVjb2RpbmcgcmVzcG9uc2UgZGF0YTogXCIgKyBlLm1lc3NhZ2UgKTtcblx0XHRcdFx0XHRzZWxmLmNsZWFyU2VxdWVuY2UoXCJObyBzZXF1ZW5jZSBhdmFpbGFibGVcIiwgXCIuLi9iaW9qcy9jc3MvaW1hZ2VzL3dhcm5pbmdfaWNvbi5wbmdcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSxcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3IgZGVjb2RpbmcgcmVzcG9uc2UgZGF0YTogXCIgKyB0ZXh0U3RhdHVzICk7XG5cdFx0XHRcdHNlbGYuY2xlYXJTZXF1ZW5jZShcIkVycm9yIHJlcXVlc3RpbmcgdGhlIHNlcXVlbmNlIHRvIHRoZSBzZXJ2ZXIgXCIgKyB0aGlzLnVybCAsIFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuICAgIH0sXG5cdFxuICAgIC8qKlxuXHQgKiBTaG93cyB0aGUgY29sdW1ucyBpbmRpY2F0ZWQgYnkgdGhlIGluZGV4ZXMgYXJyYXkuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbc2hvd01lc3NhZ2VdIE1lc3NhZ2UgdG8gYmUgc2hvd2VkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2ljb25dIEljb24gdG8gYmUgc2hvd2VkIGEgc2lkZSBvZiB0aGUgbWVzc2FnZVxuXHQgKiBcblx0ICogQGV4YW1wbGUgXG5cdCAqIG15U2VxdWVuY2UuY2xlYXJTZXF1ZW5jZShcIk5vIHNlcXVlbmNlIGF2YWlsYWJsZVwiLCBcIi4uL2Jpb2pzL2Nzcy9pbWFnZXMvd2FybmluZ19pY29uLnBuZ1wiKTtcblx0ICogXG5cdCAqL1xuICAgIGNsZWFyU2VxdWVuY2U6IGZ1bmN0aW9uICggc2hvd01lc3NhZ2UsIGljb24gKSB7XG4gICAgXHRcbiAgICBcdHZhciBtZXNzYWdlO1xuICAgIFx0XHRcbiAgICBcdHRoaXMub3B0LnNlcXVlbmNlID0gXCJcIjtcbiAgICBcdHRoaXMub3B0LmlkID0gXCJcIjsgXG4gICAgXHR0aGlzLl9oaWdobGlnaHRzID0gW107XG5cdFx0dGhpcy5faGlnaGxpZ2h0c0NvdW50ID0gMDtcblx0XHR0aGlzLm9wdC5zZWxlY3Rpb24gPSB7IHN0YXJ0OiAwLCBlbmQ6IDAgfTtcblx0XHR0aGlzLl9hbm5vdGF0aW9ucyA9IFtdO1xuXHRcdHRoaXMuX2NvbnRlbnREaXYuY2hpbGRyZW4oKS5yZW1vdmUoKTtcblx0XHRcblx0XHR0aGlzLl9oZWFkZXJEaXYuaGlkZSgpO1xuXHRcdFxuXHRcdGlmICggdW5kZWZpbmVkICE9PSBzaG93TWVzc2FnZSApIHtcblx0XHRcdG1lc3NhZ2UgPSBqUXVlcnkoJzxkaXY+JyArIHNob3dNZXNzYWdlICsgJzwvZGl2PicpXG5cdFx0XHRcdC5hcHBlbmRUbyh0aGlzLl9jb250ZW50RGl2KVxuXHRcdFx0XHQuYWRkQ2xhc3MoXCJtZXNzYWdlXCIpO1xuXHRcdFx0XG5cdFx0XHRpZiAoIHVuZGVmaW5lZCAhPT0gaWNvbiApIHtcblx0XHRcdFx0bWVzc2FnZS5jc3Moe1xuXHRcdFx0XHRcdCdiYWNrZ3JvdW5kJzogJ3RyYW5zcGFyZW50IHVybChcIicgKyBpY29uICsgJ1wiKSBuby1yZXBlYXQgY2VudGVyIGxlZnQnLFxuXHRcdFx0XHRcdCdwYWRkaW5nLWxlZnQnOiAnMjBweCdcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuICAgIH0sXG5cdFxuXHQvKipcbiAgICAqIFNldCB0aGUgY3VycmVudCBzZWxlY3Rpb24gaW4gdGhlIHNlcXVlbmNlIGNhdXNpbmcgdGhlIGV2ZW50IHtAbGluayBTZXF1ZW5jZSNvblNlbGVjdGlvbkNoYW5nZWR9XG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIHNldCBzZWxlY3Rpb24gZnJvbSB0aGUgcG9zaXRpb24gMTAwIHRvIDE1MCBcbiAgICAqIG15U2VxdWVuY2Uuc2V0U2VsZWN0aW9uKDEwMCwgMTUwKTtcbiAgICAqIFxuICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0IFRoZSBzdGFydGluZyBjaGFyYWN0ZXIgb2YgdGhlIHNlbGVjdGlvbi5cbiAgICAqIEBwYXJhbSB7aW50fSBlbmQgVGhlIGVuZGluZyBjaGFyYWN0ZXIgb2YgdGhlIHNlbGVjdGlvblxuICAgICovXG5cdHNldFNlbGVjdGlvbiA6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcblx0XHRpZihzdGFydCA+IGVuZCkge1xuXHRcdFx0dmFyIGF1eCA9IGVuZDtcblx0XHRcdGVuZCA9IHN0YXJ0O1xuXHRcdFx0c3RhcnQgPSBhdXg7XG5cblx0XHR9XG5cblx0XHRpZihzdGFydCAhPSB0aGlzLm9wdC5zZWxlY3Rpb24uc3RhcnQgfHwgZW5kICE9IHRoaXMub3B0LnNlbGVjdGlvbi5lbmQpIHtcblx0XHRcdHRoaXMuX3NldFNlbGVjdGlvbihzdGFydCwgZW5kKTtcblx0XHRcdHRoaXMudHJpZ2dlcihcblx0XHRcdFx0XHRFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQsIFxuXHRcdFx0XHRcdHsgXCJzdGFydFwiIDogc3RhcnQsIFwiZW5kXCIgOiBlbmQgfVxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdFxuXHRfYnVpbGRGb3JtYXRTZWxlY3RvcjogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcblx0XHR0aGlzLl9oZWFkZXJEaXYgPSBqUXVlcnkoJzxkaXY+PC9kaXY+JykuYXBwZW5kVG8odGhpcy5fY29udGFpbmVyKTtcblx0XHR0aGlzLl9oZWFkZXJEaXYuY3NzKHtcblx0XHRcdCdmb250LWZhbWlseSc6ICdcIkhldmVsdGljYSBOZXVlXCIsIEFyaWFsLCBcInNhbnMgc2VyaWZcIicsXG5cdFx0XHQnZm9udC1zaXplJzogJzE0cHgnXHRcblx0XHR9KS5hcHBlbmQoJ0Zvcm1hdDogJyk7XG5cdFx0XG5cdFx0dGhpcy5fZm9ybWF0U2VsZWN0b3IgPSBqUXVlcnkoJzxzZWxlY3Q+ICcrXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiRkFTVEFcIj5GQVNUQTwvb3B0aW9uPicrXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiQ09EQVRBXCI+Q09EQVRBPC9vcHRpb24+Jytcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJQUklERVwiPlBSSURFPC9vcHRpb24+Jytcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJSQVdcIj5SQVc8L29wdGlvbj48L3NlbGVjdD4nKS5hcHBlbmRUbyhzZWxmLl9oZWFkZXJEaXYpO1xuXG5cdFx0dGhpcy5fZm9ybWF0U2VsZWN0b3IuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcblx0XHRcdHNlbGYub3B0LmZvcm1hdCA9IGpRdWVyeSh0aGlzKS52YWwoKTtcblx0XHRcdHNlbGYuX3JlZHJhdygpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdHRoaXMuX2Zvcm1hdFNlbGVjdG9yLnZhbChzZWxmLm9wdC5mb3JtYXQpO1x0XG5cdFx0XG5cdFx0dGhpcy5mb3JtYXRTZWxlY3RvclZpc2libGUoIHRoaXMub3B0LmZvcm1hdFNlbGVjdG9yVmlzaWJsZSApO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBIaWdobGlnaHRzIGEgcmVnaW9uIHVzaW5nIHRoZSBmb250IGNvbG9yIGRlZmluZWQgaW4ge0Jpb2pzLlByb3RlaW4zRCNoaWdobGlnaHRGb250Q29sb3J9IGJ5IGRlZmF1bHQgaXMgcmVkLlxuICAgICpcbiAgICAqIEBkZXByZWNhdGVkIHVzZSBhZGRIaWdobGlnaHQgaW5zdGVhZC5cbiAgICAqIFxuICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0IFRoZSBzdGFydGluZyBjaGFyYWN0ZXIgb2YgdGhlIGhpZ2hsaWdodGluZy5cbiAgICAqIEBwYXJhbSB7aW50fSBlbmQgVGhlIGVuZGluZyBjaGFyYWN0ZXIgb2YgdGhlIGhpZ2hsaWdodGluZy5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbY29sb3JdIEhUTUwgY29sb3IgY29kZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYmFja2dyb3VuZF0gSFRNTCBjb2xvciBjb2RlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtpZF0gQ3VzdG9tIGlkZW50aWZpZXIuXG4gICAgKiBcbiAgICAqIEByZXR1cm4ge2ludH0gcmVwcmVzZW50aW5nIHRoZSBpZCBvZiB0aGUgaGlnaGxpZ2h0IG9uIHRoZSBpbnRlcm5hbCBhcnJheS4gUmV0dXJucyAtMSBvbiBmYWlsdXJlICBcbiAgICAqL1xuXHRoaWdobGlnaHQgOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgY29sb3IsIGJhY2tncm91bmQsIGlkICkge1xuXHRcdHJldHVybiB0aGlzLmFkZEhpZ2hsaWdodCh7IFwic3RhcnRcIjogc3RhcnQsIFwiZW5kXCI6IGVuZCwgXCJjb2xvclwiOiBjb2xvciwgXCJiYWNrZ3JvdW5kXCI6IGJhY2tncm91bmQsIFwiaWRcIjogaWQgfSk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIEhpZ2hsaWdodHMgYSByZWdpb24gdXNpbmcgdGhlIGZvbnQgY29sb3IgZGVmaW5lZCBpbiB7U2VxdWVuY2UjaGlnaGxpZ2h0Rm9udENvbG9yfSBieSBkZWZhdWx0IGlzIHJlZC5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gaGlnaGxpZ2h0IHRoZSBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgcG9zaXRpb24gMTAwIHRvIDE1MCwgaW5jbHVkZWQuXG4gICAgKiBteVNlcXVlbmNlLmFkZEhpZ2hsaWdodCggeyBcInN0YXJ0XCI6IDEwMCwgXCJlbmRcIjogMTUwLCBcImNvbG9yXCI6IFwid2hpdGVcIiwgXCJiYWNrZ3JvdW5kXCI6IFwicmVkXCIsIFwiaWRcIjogXCJhYWFcIiB9ICk7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBoIFRoZSBoaWdobGlnaHQgZGVmaW5lZCBhcyBmb2xsb3dzOlxuICAgICogXHRcbiAgICAqIFxuICAgICogQHJldHVybiB7aW50fSByZXByZXNlbnRpbmcgdGhlIGlkIG9mIHRoZSBoaWdobGlnaHQgb24gdGhlIGludGVybmFsIGFycmF5LiBSZXR1cm5zIC0xIG9uIGZhaWx1cmUgIFxuICAgICovXG5cdGFkZEhpZ2hsaWdodCA6IGZ1bmN0aW9uICggaCApIHtcblx0XHR2YXIgaWQgPSAnLTEnO1xuXHRcdHZhciBjb2xvciA9IFwiXCI7XG5cdFx0dmFyIGJhY2tncm91bmQgPSBcIlwiO1xuXHRcdHZhciBoaWdobGlnaHQgPSB7fTtcblx0XHRcblx0XHRpZiAoIGggJiYgaC5zdGFydCA8PSBoLmVuZCApIHtcblx0XHRcdFxuXHRcdFx0Y29sb3IgPSAoIFwic3RyaW5nXCIgPT09IHR5cGVvZiBoLmNvbG9yICk/IGguY29sb3IgOiB0aGlzLm9wdC5oaWdobGlnaHRGb250Q29sb3I7XG5cdFx0XHRiYWNrZ3JvdW5kID0gKCBcInN0cmluZ1wiID09PSB0eXBlb2YgaC5iYWNrZ3JvdW5kICk/IGguYmFja2dyb3VuZCA6IHRoaXMub3B0LmhpZ2hsaWdodEJhY2tncm91bmRDb2xvcjtcblx0XHRcdGlkID0gKCBcInN0cmluZ1wiID09PSB0eXBlb2YgaC5pZCApID8gaC5pZCA6IFN0cmluZyh0aGlzLl9oaWdobGlnaHRzQ291bnQrKyk7XG5cdFx0XHRcblx0XHRcdGhpZ2hsaWdodCA9IHsgXCJzdGFydFwiOiBoLnN0YXJ0LCBcImVuZFwiOiBoLmVuZCwgXCJjb2xvclwiOiBjb2xvciwgXCJiYWNrZ3JvdW5kXCI6IGJhY2tncm91bmQsIFwiaWRcIjogaWQgfTtcblx0XHRcdFxuXHRcdFx0dGhpcy5faGlnaGxpZ2h0cy5wdXNoKGhpZ2hsaWdodCk7XG5cdFx0XHR0aGlzLl9hcHBseUhpZ2hsaWdodChoaWdobGlnaHQpO1xuXHRcdFx0dGhpcy5fcmVzdG9yZVNlbGVjdGlvbihoLnN0YXJ0LGguZW5kKTtcblx0XHR9IFxuXHRcdFxuXHRcdHJldHVybiBpZDtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9hcHBseUhpZ2hsaWdodFxuICAgICAqIFB1cnBvc2U6ICBBcHBseSB0aGUgc3BlY2lmaWVkIGNvbG9yIGFuZCBiYWNrZ3JvdW5kIHRvIGEgcmVnaW9uIGJldHdlZW4gJ3N0YXJ0JyBhbmQgJ2VuZCcuXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IGhpZ2hsaWdodCAtPiB7T2JqZWN0fSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgZmllbGRzIHN0YXJ0IChpbnQpLCBlbmQgKGludCksIFxuICAgICAqIFx0XHRcdFx0XHRcdGNvbG9yIChIVE1MIGNvbG9yIHN0cmluZykgYW5kIGJhY2tncm91bmQgKEhUTUwgY29sb3Igc3RyaW5nKS5cbiAgICAgKi9cblx0X2FwcGx5SGlnaGxpZ2h0OiBmdW5jdGlvbiAoIGhpZ2hsaWdodCApIHtcdFx0XG5cdFx0dmFyIHNlcSA9IHRoaXMuX2NvbnRlbnREaXYuZmluZCgnLnNlcXVlbmNlJyk7XG5cdFx0Zm9yICggdmFyIGkgPSBoaWdobGlnaHQuc3RhcnQgLSAxOyBpIDwgaGlnaGxpZ2h0LmVuZDsgaSsrICl7XG5cdFx0XHR6aW5kZXggPSBqUXVlcnkoc2VxW2ldKS5jc3MoXCJ6LWluZGV4XCIpO1xuXHRcdFx0aWYgKHppbmRleD09XCJhdXRvXCIpe1xuXHRcdFx0XHQgeiA9IDE7XG5cdFx0XHRcdCBvID0gMTtcblx0XHRcdCB9XG5cdFx0XHQgZWxzZXtcblx0XHRcdFx0IHogPSAwO1xuXHRcdFx0XHQgbyA9IDAuNTtcblx0XHRcdCB9XG5cdFx0XHRqUXVlcnkoc2VxW2ldKVxuXHRcdFx0XHQuY3NzKHsgXG5cdFx0XHRcdFx0XCJjb2xvclwiOiBoaWdobGlnaHQuY29sb3IsXG5cdFx0XHRcdFx0XCJiYWNrZ3JvdW5kLWNvbG9yXCI6IGhpZ2hsaWdodC5iYWNrZ3JvdW5kLFxuXHRcdFx0XHRcdFwiei1pbmRleFwiOiB6LFxuXHRcdFx0XHRcdFwib3BhY2l0eVwiOiBvXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0LmFkZENsYXNzKFwiaGlnaGxpZ2h0ZWRcIik7XG5cdFx0fVxuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2FwcGx5SGlnaGxpZ2h0c1xuICAgICAqIFB1cnBvc2U6ICBBcHBseSB0aGUgc3BlY2lmaWVkIGhpZ2hsaWdodHMuXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IGhpZ2hsaWdodHMgLT4ge09iamVjdFtdfSBBbiBhcnJheSBjb250YWluaW5nIHRoZSBoaWdobGlnaHRzIHRvIGJlIGFwcGxpZWQuXG4gICAgICovXG5cdF9hcHBseUhpZ2hsaWdodHM6IGZ1bmN0aW9uICggaGlnaGxpZ2h0cyApIHtcblx0XHRmb3IgKCB2YXIgaSBpbiBoaWdobGlnaHRzICkge1xuXHRcdFx0dGhpcy5fYXBwbHlIaWdobGlnaHQoaGlnaGxpZ2h0c1tpXSk7XG5cdFx0fVxuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX3Jlc3RvcmVIaWdobGlnaHRzXG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGhpZ2hsaWdodHMgaW4gdGhlIHNwZWNpZmllZCByZWdpb24uXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IHN0YXJ0IC0+IHtpbnR9IFN0YXJ0IG9mIHRoZSByZWdpb24gdG8gYmUgcmVzdG9yZWQuXG4gICAgICogXHRcdCAgIGVuZCAtPiB7aW50fSBFbmQgb2YgdGhlIHJlZ2lvbiB0byBiZSByZXN0b3JlZC5cbiAgICAgKi9cblx0X3Jlc3RvcmVIaWdobGlnaHRzOiBmdW5jdGlvbiAoIHN0YXJ0LCBlbmQgKSB7XG5cdFx0dmFyIGggPSB0aGlzLl9oaWdobGlnaHRzO1xuXHRcdC8vIHBhaW50IHRoZSByZWdpb24gdXNpbmcgZGVmYXVsdCBibGFuayBzZXR0aW5nc1xuXHRcdHRoaXMuX2FwcGx5SGlnaGxpZ2h0KHtcblx0XHRcdFwic3RhcnRcIjogc3RhcnQsIFxuXHRcdFx0XCJlbmRcIjogZW5kLCBcblx0XHRcdFwiY29sb3JcIjogdGhpcy5vcHQuZm9udENvbG9yLCBcblx0XHRcdFwiYmFja2dyb3VuZFwiOiB0aGlzLm9wdC5iYWNrZ3JvdW5kQ29sb3IgXG5cdFx0fSk7XG5cdFx0Ly8gcmVzdG9yZSBoaWdobGlnaHRzIGluIHRoYXQgcmVnaW9uXG5cdFx0Zm9yICggdmFyIGkgaW4gaCApIHtcblx0XHRcdC8vIGludGVydmFsIGludGVyc2VjdHMgd2l0aCBoaWdobGlnaHQgaSA/XG5cdFx0XHRpZiAoICEoIGhbaV0uc3RhcnQgPiBlbmQgfHwgaFtpXS5lbmQgPCBzdGFydCApICkge1xuXHRcdFx0XHRhID0gKCBoW2ldLnN0YXJ0IDwgc3RhcnQgKSA/IHN0YXJ0IDogaFtpXS5zdGFydDtcblx0XHRcdFx0YiA9ICggaFtpXS5lbmQgPiBlbmQgKSA/IGVuZCA6IGhbaV0uZW5kO1xuXHRcdFx0XHR0aGlzLl9hcHBseUhpZ2hsaWdodCh7XG5cdFx0XHRcdFx0XCJzdGFydFwiOiBhLCBcblx0XHRcdFx0XHRcImVuZFwiOiBiLCBcblx0XHRcdFx0XHRcImNvbG9yXCI6IGhbaV0uY29sb3IsIFxuXHRcdFx0XHRcdFwiYmFja2dyb3VuZFwiOiBoW2ldLmJhY2tncm91bmQgXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9yZXN0b3JlU2VsZWN0aW9uXG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGluIHRoZSBzcGVjaWZpZWQgcmVnaW9uLiBcbiAgICAgKiBcdFx0XHQgSXQgaXMgdXNlZCBpbiB0aGUgY2FzZSBvZiBhbnkgaGlnaGxpZ2h0IGRvIG92ZXJyaWRpbmcgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLiBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogc3RhcnQgLT4ge2ludH0gU3RhcnQgb2YgdGhlIHJlZ2lvbiB0byBiZSByZXN0b3JlZC5cbiAgICAgKiBcdFx0ICAgZW5kIC0+IHtpbnR9IEVuZCBvZiB0aGUgcmVnaW9uIHRvIGJlIHJlc3RvcmVkLlxuICAgICAqL1xuXHRfcmVzdG9yZVNlbGVjdGlvbjogZnVuY3Rpb24gKCBzdGFydCwgZW5kICkge1xuXHRcdHZhciBzZWwgPSB0aGlzLm9wdC5zZWxlY3Rpb247XG5cdFx0Ly8gaW50ZXJ2YWwgaW50ZXJzZWN0cyB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uID9cblx0XHQvLyByZXN0b3JlIHNlbGVjdGlvblxuXHRcdGlmICggISggc3RhcnQgPiBzZWwuZW5kIHx8IGVuZCA8IHNlbC5zdGFydCApICkge1xuXHRcdFx0YSA9ICggc3RhcnQgPCBzZWwuc3RhcnQgKSA/IHNlbC5zdGFydCA6IHN0YXJ0O1xuXHRcdFx0YiA9ICggZW5kID4gc2VsLmVuZCApID8gc2VsLmVuZCA6IGVuZDtcblx0XHRcdFxuXHRcdFx0dGhpcy5fYXBwbHlIaWdobGlnaHQoe1xuXHRcdFx0XHRcInN0YXJ0XCI6IGEsIFxuXHRcdFx0XHRcImVuZFwiOiBiLCBcblx0XHRcdFx0XCJjb2xvclwiOiB0aGlzLm9wdC5zZWxlY3Rpb25Gb250Q29sb3IsIFxuXHRcdFx0XHRcImJhY2tncm91bmRcIjogdGhpcy5vcHQuc2VsZWN0aW9uQ29sb3IsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIENsZWFyIGEgaGlnaGxpZ2h0ZWQgcmVnaW9uIHVzaW5nLlxuICAgICpcbiAgICAqIEBkZXByZWNhdGVkIHVzZSByZW1vdmVIaWdobGlnaHQgaW5zdGVhZC5cbiAgICAqIFxuICAgICogQHBhcmFtIHtpbnR9IGlkIFRoZSBpZCBvZiB0aGUgaGlnaGxpZ2h0IG9uIHRoZSBpbnRlcm5hbCBhcnJheS4gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBieSBtZXRob2QgaGlnaGxpZ2h0LlxuICAgICovXG5cdHVuSGlnaGxpZ2h0IDogZnVuY3Rpb24gKGlkKSB7XHRcblx0XHR0aGlzLnJlbW92ZUhpZ2hsaWdodChpZCk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIFJlbW92ZSBhIGhpZ2hsaWdodC5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gQ2xlYXIgdGhlIGhpZ2hsaWdodGVkIGNoYXJhY3RlcnMgd2l0aGluIHRoZSBwb3NpdGlvbiAxMDAgdG8gMTUwLCBpbmNsdWRlZC5cbiAgICAqIG15U2VxdWVuY2UucmVtb3ZlSGlnaGxpZ2h0KFwic3BpbjFcIik7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGhpZ2hsaWdodCBvbiB0aGUgaW50ZXJuYWwgYXJyYXkuIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgYnkgbWV0aG9kIGhpZ2hsaWdodC5cbiAgICAqL1xuXHRyZW1vdmVIaWdobGlnaHQgOiBmdW5jdGlvbiAoaWQpIHtcdFxuXHRcdHZhciBzdGFydCwgZW5kLCBpLCBoID0gdGhpcy5faGlnaGxpZ2h0cztcblx0XHRmb3IgKCBpIGluIGggKSB7XG5cdFx0XHRpZiAoIGhbaV0uaWQgPT0gaWQgKSB7XG5cdFx0XHRcdHN0YXJ0ID0gaFtpXS5zdGFydDtcblx0XHRcdFx0ZW5kID0gaFtpXS5lbmQ7XG5cdFx0XHRcdGguc3BsaWNlKGksMSk7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLl9yZXN0b3JlSGlnaGxpZ2h0cyhzdGFydCxlbmQpO1xuXHRcdFx0XHR0aGlzLl9yZXN0b3JlU2VsZWN0aW9uKHN0YXJ0LGVuZCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIENsZWFyIHRoZSBoaWdobGlnaHRzIG9mIHdob2xlIHNlcXVlbmNlLlxuICAgICogQGRlcHJlY2F0ZWQgdXNlIHJlbW92ZUFsbEhpZ2hsaWdodHMgaW5zdGVhZC5cbiAgICAqL1xuXHR1bkhpZ2hsaWdodEFsbCA6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLnJlbW92ZUFsbEhpZ2hsaWdodHMoKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogUmVtb3ZlIGFsbCB0aGUgaGlnaGxpZ2h0cyBvZiB3aG9sZSBzZXF1ZW5jZS5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogbXlTZXF1ZW5jZS5yZW1vdmVBbGxIaWdobGlnaHRzKCk7XG4gICAgKi9cblx0cmVtb3ZlQWxsSGlnaGxpZ2h0cyA6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9oaWdobGlnaHRzID0gW107XG5cdFx0dGhpcy5fcmVzdG9yZUhpZ2hsaWdodHMoMSx0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGgpO1xuXHRcdHRoaXMuX3Jlc3RvcmVTZWxlY3Rpb24oMSx0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGgpO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IGRpc3BsYXlpbmcgZm9ybWF0IG9mIHRoZSBzZXF1ZW5jZS5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gU2V0IGZvcm1hdCB0byAnRkFTVEEnLlxuICAgICogbXlTZXF1ZW5jZS5zZXRGb3JtYXQoJ0ZBU1RBJyk7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQgVGhlIGZvcm1hdCBmb3IgdGhlIHNlcXVlbmNlIHRvIGJlIGRpc3BsYXllZC5cbiAgICAqL1xuXHRzZXRGb3JtYXQgOiBmdW5jdGlvbihmb3JtYXQpIHtcblx0XHRpZiAoIHRoaXMub3B0LmZvcm1hdCAhPSBmb3JtYXQudG9VcHBlckNhc2UoKSApIHtcblx0XHRcdHRoaXMub3B0LmZvcm1hdCA9IGZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0dGhpcy5fcmVkcmF3KCk7XG5cdFx0fVxuXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdC8vIENoYW5nZXMgdGhlIG9wdGlvbiBpbiB0aGUgY29tYm8gYm94XG5cdFx0dGhpcy5faGVhZGVyRGl2LmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRpZihqUXVlcnkodGhpcykudmFsKCkgPT0gc2VsZi5vcHQuZm9ybWF0LnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdFx0alF1ZXJ5KHRoaXMpLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGRpc3BsYXllZCBzZXF1ZW5jZS5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gU2V0IHRoZSBudW1iZXIgb2YgY29sdW1ucyB0byA3MC5cbiAgICAqIG15U2VxdWVuY2Uuc2V0TnVtQ29scyg3MCk7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBudW1Db2xzIFRoZSBudW1iZXIgb2YgY29sdW1ucy5cbiAgICAqL1xuXHRzZXROdW1Db2xzIDogZnVuY3Rpb24obnVtQ29scykge1xuXHRcdHRoaXMub3B0LmNvbHVtbnMuc2l6ZSA9IG51bUNvbHM7XG5cdFx0dGhpcy5fcmVkcmF3KCk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIFNldCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZHJvcC1kb3duIGxpc3Qgb2YgZm9ybWF0cy5cbiAgICAqIFxuICAgICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlIHRydWU6IHNob3c7IGZhbHNlOiBoaWRlLlxuICAgICovXG5cdGZvcm1hdFNlbGVjdG9yVmlzaWJsZSA6IGZ1bmN0aW9uICh2aXNpYmxlKXtcblx0XHRpZiAodmlzaWJsZSkge1xuXHRcdFx0dGhpcy5faGVhZGVyRGl2LnNob3coKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5faGVhZGVyRGl2LmhpZGUoKTtcblx0XHR9XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIFRoaXMgaXMgc2ltaWxhciB0byBhIHtCaW9qcy5Qcm90ZWluM0QjZm9ybWF0U2VsZWN0b3JWaXNpYmxlfSB3aXRoIHRoZSAndHJ1ZScgYXJndW1lbnQuXG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIFNob3dzIHRoZSBmb3JtYXQgc2VsZWN0b3IuXG4gICAgKiBteVNlcXVlbmNlLnNob3dGb3JtYXRTZWxlY3RvcigpO1xuICAgICogXG4gICAgKi9cblx0c2hvd0Zvcm1hdFNlbGVjdG9yIDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5faGVhZGVyRGl2LnNob3coKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogVGhpcyBpcyBzaW1pbGFyIHRvIGEge0Jpb2pzLlByb3RlaW4zRCNmb3JtYXRTZWxlY3RvclZpc2libGV9IHdpdGggdGhlICdmYWxzZScgYXJndW1lbnQuXG4gICAgKiBcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBIaWRlcyB0aGUgZm9ybWF0IHNlbGVjdG9yLlxuICAgICogbXlTZXF1ZW5jZS5oaWRlRm9ybWF0U2VsZWN0b3IoKTtcbiAgICAqIFxuICAgICovXG5cdGhpZGVGb3JtYXRTZWxlY3RvciA6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuX2hlYWRlckRpdi5oaWRlKCk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIEhpZGVzIHRoZSB3aG9sZSBjb21wb25lbnQuXG4gICAgKiBcbiAgICAqL1xuXHRoaWRlIDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2hlYWRlckRpdi5oaWRlKCk7XG5cdFx0dGhpcy5fY29udGVudERpdi5oaWRlKCk7XG5cdH0sXG5cblx0LyoqXG4gICAgKiBTaG93cyB0aGUgd2hvbGUgY29tcG9uZW50LlxuICAgICogXG4gICAgKi9cblx0c2hvdyA6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9oZWFkZXJEaXYuc2hvdygpO1xuXHRcdHRoaXMuX2NvbnRlbnREaXYuc2hvdygpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX3NldFNlbGVjdGlvblxuICAgICAqIFB1cnBvc2U6ICBVcGRhdGUgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLiBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogc3RhcnQgLT4ge2ludH0gU3RhcnQgb2YgdGhlIHJlZ2lvbiB0byBiZSBzZWxlY3RlZC5cbiAgICAgKiBcdFx0ICAgZW5kIC0+IHtpbnR9IEVuZCBvZiB0aGUgcmVnaW9uIHRvIGJlIHNlbGVjdGVkLlxuICAgICAqL1xuXHRfc2V0U2VsZWN0aW9uIDogZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuXHRcdC8vYWxlcnQoXCJhZHNhc1wiKTtcblx0XHRcblx0XHR2YXIgY3VycmVudCA9IHRoaXMub3B0LnNlbGVjdGlvbjtcblx0XHR2YXIgY2hhbmdlID0ge307XG5cdFx0XG5cdFx0Ly8gV2hpY2ggaXMgdGhlIGNoYW5nZSBvbiBzZWxlY3Rpb24/XG5cdFx0aWYgKCBjdXJyZW50LnN0YXJ0ID09IHN0YXJ0ICkge1xuXHRcdFx0Ly8gZm9yd2FyZD9cblx0XHRcdGlmICggY3VycmVudC5lbmQgPCBlbmQgKSB7XG5cdFx0XHRcdGNoYW5nZS5zdGFydCA9IGN1cnJlbnQuZW5kO1xuXHRcdFx0XHRjaGFuZ2UuZW5kID0gZW5kO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fcmVzdG9yZUhpZ2hsaWdodHMoZW5kKzEsIGN1cnJlbnQuZW5kKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCBjdXJyZW50LmVuZCA9PSBlbmQgKSB7XG5cdFx0XHQvLyBmb3J3YXJkP1xuXHRcdFx0aWYgKCBjdXJyZW50LnN0YXJ0ID4gc3RhcnQgKSB7XG5cdFx0XHRcdGNoYW5nZS5zdGFydCA9IHN0YXJ0O1xuXHRcdFx0XHRjaGFuZ2UuZW5kID0gY3VycmVudC5zdGFydDtcdFx0XHRcdFxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fcmVzdG9yZUhpZ2hsaWdodHMoY3VycmVudC5zdGFydCwgc3RhcnQtMSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3Jlc3RvcmVIaWdobGlnaHRzKGN1cnJlbnQuc3RhcnQsIGN1cnJlbnQuZW5kKTtcblx0XHRcdGNoYW5nZS5zdGFydCA9IHN0YXJ0O1xuXHRcdFx0Y2hhbmdlLmVuZCA9IGVuZDtcblx0XHR9XG5cblx0XHRjdXJyZW50LnN0YXJ0ID0gc3RhcnQ7XG5cdFx0Y3VycmVudC5lbmQgPSBlbmQ7XG5cblx0XHRpZiAoY2hhbmdlLnN0YXJ0KSB7XG5cdFx0XHR0aGlzLl9hcHBseUhpZ2hsaWdodCh7XG5cdFx0XHRcdFwic3RhcnRcIjogY2hhbmdlLnN0YXJ0LCBcblx0XHRcdFx0XCJlbmRcIjogY2hhbmdlLmVuZCwgXG5cdFx0XHRcdFwiY29sb3JcIjogdGhpcy5vcHQuc2VsZWN0aW9uRm9udENvbG9yLCBcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCI6IHRoaXMub3B0LnNlbGVjdGlvbkNvbG9yIFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdFxuXHR9LFxuXHRcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9yZXBhaW50U2VsZWN0aW9uXG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIHdob2xlIGN1cnJlbnQgc2VsZWN0aW9uLiBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogLVxuICAgICAqL1xuXHRfcmVwYWludFNlbGVjdGlvbjogZnVuY3Rpb24oKXtcblx0XHR2YXIgcyA9IHRoaXMub3B0LnNlbGVjdGlvbjtcblx0XHR0aGlzLl9zZXRTZWxlY3Rpb24oMCwwKTtcblx0XHR0aGlzLl9zZXRTZWxlY3Rpb24ocy5zdGFydCxzLmVuZCk7XG5cdH0sXG5cdFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX3JlZHJhd1xuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBjdXJyZW50IHNlcXVlbmNlLiBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogLVxuICAgICAqL1xuXHRfcmVkcmF3IDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGkgPSAwO1x0XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFxuXHRcdC8vIFJlc2V0IHRoZSBjb250ZW50XG5cdFx0Ly90aGlzLl9jb250ZW50RGl2LnRleHQoJycpO1xuXHRcdHRoaXMuX2NvbnRlbnREaXYuY2hpbGRyZW4oKS5yZW1vdmUoKTtcblx0XHRcblx0XHQvLyBSZWJ1aWxkIHRoZSBzcGFucyBvZiB0aGUgc2VxdWVuY2UgXG5cdFx0Ly8gYWNjb3JkaW5nIHRvIGZvcm1hdFxuXHRcdGlmKHRoaXMub3B0LmZvcm1hdCA9PSAnUkFXJykge1xuXHRcdFx0dGhpcy5fZHJhd1JhdygpO1xuXHRcdH0gZWxzZSBpZih0aGlzLm9wdC5mb3JtYXQgPT0gJ0NPREFUQScpIHtcblx0XHRcdHRoaXMuX2RyYXdDb2RhdGEoKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMub3B0LmZvcm1hdCA9PSAnRkFTVEEnKXtcblx0XHRcdHRoaXMuX2RyYXdGYXN0YSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9wdC5mb3JtYXQgPSAnUFJJREUnO1xuXHRcdFx0dGhpcy5fZHJhd1ByaWRlKCk7XG5cdFx0fVxuXHRcdFxuXHRcdC8vIFJlc3RvcmUgdGhlIGhpZ2hsaWdodGVkIHJlZ2lvbnNcblx0XHR0aGlzLl9hcHBseUhpZ2hsaWdodHModGhpcy5faGlnaGxpZ2h0cyk7XG5cdFx0dGhpcy5fcmVwYWludFNlbGVjdGlvbigpO1xuXHRcdHRoaXMuX2FkZFNwYW5FdmVudHMoKTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3RmFzdGFcbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZXF1ZW5jZSB1c2luZyBGQVNUQSBmb3JtYXQuICBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogLVxuICAgICAqL1xuXHRfZHJhd0Zhc3RhIDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBhID0gdGhpcy5vcHQuc2VxdWVuY2UudG9VcHBlckNhc2UoKS5zcGxpdCgnJyk7XG4gICAgdmFyIHByZSA9IGpRdWVyeSgnPHByZT48L3ByZT4nKS5hcHBlbmRUbyh0aGlzLl9jb250ZW50RGl2KTtcblxuICAgIHZhciBpID0gMTtcbiAgICB2YXIgYXJyID0gW107XG4gICAgdmFyIHN0ciA9ICc+JyArIHRoaXMub3B0LmlkICsgJyAnICsgYS5sZW5ndGggKyAnIGJwPGJyLz4nO1xuXG4gICAgLyogQ29ycmVjdCBjb2x1bW4gc2l6ZSBpbiBjYXNlIHRoZSBzZXF1ZW5jZSBpcyBhcyBzbWFsbCBwZXB0aWRlICovXG4gICAgdmFyIG51bUNvbHMgPSB0aGlzLm9wdC5jb2x1bW5zLnNpemU7XG4gICAgaWYgKCB0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGggPCB0aGlzLm9wdC5jb2x1bW5zLnNpemUgKSB7XG4gICAgICBudW1Db2xzID0gdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoO1x0XG4gICAgfVxuXG4gICAgdmFyIG9wdCA9IHtcbiAgICAgIG51bUNvbHM6IG51bUNvbHMsXG4gICAgICBudW1Db2xzRm9yU3BhY2U6IDBcbiAgICB9O1xuXG4gICAgc3RyICs9IHRoaXMuX2RyYXdTZXF1ZW5jZShhLCBvcHQpO1xuICAgIHByZS5odG1sKHN0cik7XG5cbiAgICB0aGlzLl9kcmF3QW5ub3RhdGlvbnMob3B0KTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3Q29kYXRhXG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UgdXNpbmcgQ09EQVRBIGZvcm1hdC4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAtXG4gICAgICovXG5cdF9kcmF3Q29kYXRhIDogZnVuY3Rpb24oKSB7XG5cdFx0XG4gICAgdmFyIGJ1ZmYgPSBbXTtcbiAgICB2YXIgb3B0aW9ucyA9ICh0aGlzLm9wdC5mb3JtYXRPcHRpb25zIHx8IHt9KTtcblx0XHR2YXIgc2VxdWVuY2UgPSB0aGlzLm9wdC5zZXF1ZW5jZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTtcblx0XHR2YXIgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICAgdmFyIG9wdCA9IHtcbiAgICAgIG51bUxlZnQ6IHRydWUsXG4gICAgICBudW1MZWZ0U2l6ZTogNyxcbiAgICAgIG51bUxlZnRQYWQ6JyAnLFxuICAgICAgbnVtVG9wOiB0cnVlLFxuICAgICAgbnVtVG9wRWFjaDogNSxcbiAgICAgIG51bUNvbHM6IE1hdGgubWluKHNlcXVlbmNlLmxlbmd0aCwgdGhpcy5vcHQuY29sdW1ucy5zaXplKSxcbiAgICAgIG51bUNvbHNGb3JTcGFjZTogMCxcbiAgICAgIHNwYWNlQmV0d2VlbkNoYXJzOiB0cnVlXG4gICAgfTtcblxuXHRcdGlmIChvcHRpb25zLnRpdGxlKSB7XG4gICAgICBidWZmLnB1c2goJ0VOVFJZICAgICAgICAgICAnLCB0aGlzLm9wdC5pZCwgJzxici8+JywgJ1NFUVVFTkNFPGJyLz4nKTtcbiAgICB9XG5cdFx0XG5cdFx0LyogQ29ycmVjdCBjb2x1bW4gc2l6ZSBpbiBjYXNlIHRoZSBzZXF1ZW5jZSBpcyBhcyBzbWFsbCBwZXB0aWRlICovXG5cdFx0XG5cdFx0YnVmZi5wdXNoKHRoaXMuX2RyYXdTZXF1ZW5jZShzZXF1ZW5jZSwgb3B0KSk7XG5cdFx0XG5cdFx0YnVmZi5wdXNoKG9wdGlvbnMuZm9vdGVyID8gJzxici8+Ly8vJyA6ICcnKTtcblxuICAgIHByZS5zdHlsZS53aGl0ZVNwYWNlID0gJ3ByZSc7XG4gICAgcHJlLmlubmVySFRNTCA9IGJ1ZmYuam9pbignJyk7XG5cbiAgICB0aGlzLl9jb250ZW50RGl2LmFwcGVuZChwcmUpO1xuXHRcdFxuXHRcdHRoaXMuX2RyYXdBbm5vdGF0aW9ucyhvcHQpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2RyYXdBbm5vdGF0aW9uc1xuICAgICAqIFB1cnBvc2U6ICBQYWludCB0aGUgYW5ub3RhdGlvbnMgb24gdGhlIHNlcXVlbmNlLiAgXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IHNldHRpbmdzIC0+IHtvYmplY3R9IFxuICAgICAqL1xuICAgIF9kcmF3QW5ub3RhdGlvbnM6IGZ1bmN0aW9uICggc2V0dGluZ3MgKXsgXG5cbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBhID0gdGhpcy5vcHQuc2VxdWVuY2UudG9Mb3dlckNhc2UoKS5zcGxpdCgnJyk7ICAgIFx0XG4gICAgICB2YXIgYW5ub3RhdGlvbnMgPSB0aGlzLl9hbm5vdGF0aW9ucztcbiAgICAgIHZhciBsZWZ0U3BhY2VzID0gJyc7XG4gICAgICB2YXIgcm93ID0gJyc7XG4gICAgICB2YXIgYW5ub3QgPSAnJztcbiAgICAgIHZhciBjZWxsU2VsZWN0b3I7XG5cbiAgICAgIC8vIEluZGV4IGF0IHRoZSBsZWZ0P1xuICAgICAgaWYgKCBzZXR0aW5ncy5udW1MZWZ0ICkge1xuICAgICAgICBsZWZ0U3BhY2VzICs9IHRoaXMuX2Zvcm1hdEluZGV4KCcgJywgc2V0dGluZ3MubnVtTGVmdFNpemUrMiwgJyAnKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkgKz0gc2V0dGluZ3MubnVtQ29scyApe1xuICAgICAgICByb3cgPSAnJztcbiAgICAgICAgZm9yICggdmFyIGtleSBpbiBhbm5vdGF0aW9ucyApe1xuICAgICAgICAgIGFubm90YXRpb25zW2tleV0uaWQgPSB0aGlzLmdldElkKCkgKyBcIl9cIiArIGtleTtcbiAgICAgICAgICBhbm5vdCA9IHRoaXMuX2dldEhUTUxSb3dBbm5vdChpKzEsIGFubm90YXRpb25zW2tleV0sIHNldHRpbmdzKTtcdFx0XHRcdFxuICAgICAgICAgIGlmIChhbm5vdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByb3cgKz0gJzxici8+JztcbiAgICAgICAgICAgIHJvdyArPSBsZWZ0U3BhY2VzO1xuICAgICAgICAgICAgcm93ICs9IGFubm90O1xuICAgICAgICAgICAgcm93ICs9ICc8YnIvPic7XG4gICAgICAgICAgfSBcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBudW1Db2xzID0gc2V0dGluZ3MubnVtQ29scztcbiAgICAgICAgdmFyIGNoYXJSZW1haW5pbmcgPSBhLmxlbmd0aC1pO1xuICAgICAgICBpZihjaGFyUmVtYWluaW5nIDwgbnVtQ29scyl7XG4gICAgICAgICAgbnVtQ29sc1x0PSBjaGFyUmVtYWluaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBzZXR0aW5ncy5udW1SaWdodCApIHtcbiAgICAgICAgICAvLyBUT0RPOiBzdG9wIHVzaW5nIGlkcyBmb3IgYmFzZXMuXG4gICAgICAgICAgY2VsbFNlbGVjdG9yID0gJ3ByZSBzcGFuI251bVJpZ2h0XycgKyB0aGlzLmdldElkKCkgKyAnXycgKyAoaSArIG51bUNvbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGxTZWxlY3RvciA9ICdwcmUgc3BhbiMnICsgdGhpcy5nZXRJZCgpICsgJ18nICsgKGkgKyBudW1Db2xzKTtcbiAgICAgICAgfVxuICAgICAgICBqUXVlcnkocm93KS5pbnNlcnRBZnRlcihzZWxmLl9jb250YWluZXIuZmluZChjZWxsU2VsZWN0b3IpKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHRvb2wgdGlwcyBhbmQgYmFja2dyb3VuZCcgY29sb3JpbmcgZWZmZWN0XG4gICAgICBqUXVlcnkodGhpcy5fY29udGVudERpdikuZmluZCgnLmFubm90YXRpb24nKS5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLl9hZGRUb29sVGlwKCB0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5fZ2V0QW5ub3RhdGlvblN0cmluZyggalF1ZXJ5KHRoaXMpLmF0dHIoXCJpZFwiKSApO1xuICAgICAgICB9KTtcblxuICAgICAgICBqUXVlcnkodGhpcykubW91c2VvdmVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBqUXVlcnkoJy5hbm5vdGF0aW9uLicralF1ZXJ5KGUudGFyZ2V0KS5hdHRyKFwiaWRcIikpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGpRdWVyeSh0aGlzKS5hdHRyKFwiY29sb3JcIikgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkubW91c2VvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgalF1ZXJ5KCcuYW5ub3RhdGlvbicpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKTsgXG5cbiAgICAgICAgfSkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciBpLCBuYW1lLCBpZCA9IGpRdWVyeShlLnRhcmdldCkuYXR0cihcImlkXCIpO1xuICAgICAgICAgIGZvcihpID0gMDsgaSA8IHNlbGYuX2Fubm90YXRpb25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHNlbGYuX2Fubm90YXRpb25zW2ldLmlkID09IGlkKXtcbiAgICAgICAgICAgICAgbmFtZSA9IHNlbGYuX2Fubm90YXRpb25zW2ldLm5hbWU7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLnRyaWdnZXIoRVZUX09OX0FOTk9UQVRJT05fQ0xJQ0tFRCwge25hbWU6IG5hbWV9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSxcbiAgICAvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2dldEFubm90YXRpb25TdHJpbmdcbiAgICAgKiBQdXJwb3NlOiAgR2V0IHRoZSBhbm5vdGF0aW9uIHRleHQgbWVzc2FnZSBmb3IgdGhlIHRvb2x0aXAgXG4gICAgICogUmV0dXJuczogIHtzdHJpbmd9IEFubm90YXRpb24gdGV4dCBmb3IgdGhlIGFubm90YXRpb25cbiAgICAgKiBJbnB1dHM6ICAgaWQgLT4ge2ludH0gaW5kZXggb2YgdGhlIGludGVybmFsIGFubm90YXRpb24gYXJyYXlcbiAgICAgKi9cbiAgICBfZ2V0QW5ub3RhdGlvblN0cmluZzogZnVuY3Rpb24gKCBpZCApIHtcblx0XHR2YXIgYW5ub3RhdGlvbiA9IHRoaXMuX2Fubm90YXRpb25zW2lkLnN1YnN0cihpZC5pbmRleE9mKFwiX1wiKSArIDEpXTtcblx0XHRyZXR1cm4gYW5ub3RhdGlvbi5uYW1lICsgXCI8YnIvPlwiICsgKChhbm5vdGF0aW9uLmh0bWwpPyBhbm5vdGF0aW9uLmh0bWwgOiAnJyk7XG4gICAgfSxcbiAgICBcbiAgICAvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2dldEhUTUxSb3dBbm5vdFxuICAgICAqIFB1cnBvc2U6ICBCdWlsZCBhbiBhbm5vdGF0aW9uXG4gICAgICogUmV0dXJuczogIEhUTUwgb2YgdGhlIGFubm90YXRpb25cbiAgICAgKiBJbnB1dHM6ICAgY3VycmVudFBvcyAtPiB7aW50fVxuICAgICAqIFx0XHRcdCBhbm5vdGF0aW9uIC0+IHtPYmplY3R9IFxuICAgICAqICBcdFx0IHNldHRpbmdzIC0+IHtPYmplY3R9XG4gICAgICovXG4gICAgX2dldEhUTUxSb3dBbm5vdCA6IGZ1bmN0aW9uIChjdXJyZW50UG9zLCBhbm5vdGF0aW9uLCBzZXR0aW5ncykge1xuICAgIFx0dmFyIHN0eWxlQmVnaW4gPSAnYm9yZGVyLWxlZnQ6MXB4IHNvbGlkOyBib3JkZXItYm90dG9tOjFweCBzb2xpZDsgYm9yZGVyLWNvbG9yOic7XG4gICAgXHR2YXIgc3R5bGVPbiA9ICdib3JkZXItYm90dG9tOjFweCBzb2xpZDsgYm9yZGVyLWNvbG9yOic7XG4gICAgXHR2YXIgc3R5bGVFbmQgPSAnYm9yZGVyLWJvdHRvbToxcHggc29saWQ7IGJvcmRlci1yaWdodDoxcHggc29saWQ7IGJvcmRlci1jb2xvcjonO1xuXHRcdHZhciBzdHlsZUJlZ2luQW5kRW5kID0gJ2JvcmRlci1sZWZ0OjFweCBzb2xpZDsgYm9yZGVyLXJpZ2h0OjFweCBzb2xpZDsgYm9yZGVyLWJvdHRvbToxcHggc29saWQ7IGJvcmRlci1jb2xvcjonO1xuICAgIFx0XG4gICAgXHR2YXIgcm93ID0gW107XG4gICAgXHR2YXIgZW5kID0gKGN1cnJlbnRQb3MgKyBzZXR0aW5ncy5udW1Db2xzKTtcbiAgICBcdHZhciBzcGFjZUJldHdlZW5DaGFycyA9IChzZXR0aW5ncy5zcGFjZUJldHdlZW5DaGFycyk/ICcgJyA6ICcnOyAgICBcdFxuICAgIFx0dmFyIGRlZmF1bHRDb2xvciA9IGFubm90YXRpb24uY29sb3I7XG4gICAgXHR2YXIgaWQgPSBhbm5vdGF0aW9uLmlkO1xuICAgIFx0Zm9yICggdmFyIHBvcz1jdXJyZW50UG9zOyBwb3MgPCBlbmQgOyBwb3MrKyApIHtcblx0XHRcdC8vIHJlZ2lvbnNcblx0XHRcdGZvciAoIHZhciByIGluIGFubm90YXRpb24ucmVnaW9ucyApIHtcblx0XHRcdFx0cmVnaW9uID0gYW5ub3RhdGlvbi5yZWdpb25zW3JdO1xuXHRcdFx0XHRcblx0XHRcdFx0c3BhY2VBZnRlciA9ICcnO1xuXHRcdFx0XHRzcGFjZUFmdGVyICs9IChwb3MgJSBzZXR0aW5ncy5udW1Db2xzRm9yU3BhY2UgPT09IDAgKSA/ICcgJyA6ICcnO1xuXHRcdFx0XHRzcGFjZUFmdGVyICs9IHNwYWNlQmV0d2VlbkNoYXJzO1xuXHRcdFx0XHRcblx0XHRcdFx0Y29sb3IgPSAoKHJlZ2lvbi5jb2xvcik/IHJlZ2lvbi5jb2xvciA6IGRlZmF1bHRDb2xvcik7XG5cdFx0XHRcdGRhdGEgPSAnY2xhc3M9XCJhbm5vdGF0aW9uICcraWQrJ1wiIGlkPVwiJytpZCsnXCIgY29sb3I9XCInK2NvbG9yKydcIiBwb3M9XCInK3BvcysnXCInO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKCBwb3MgPT0gcmVnaW9uLnN0YXJ0ICYmIHBvcyA9PSByZWdpb24uZW5kKSB7XG5cdFx0XHRcdFx0cm93W3Bvc10gPSAnPHNwYW4gc3R5bGU9XCInK3N0eWxlQmVnaW5BbmRFbmQrY29sb3IrJ1wiICcrZGF0YSsnPiAnO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9IHNwYWNlQWZ0ZXI7XG5cdFx0XHRcdFx0cm93W3Bvc10gKz0gJzwvc3Bhbj4nO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBwb3MgPT0gcmVnaW9uLnN0YXJ0ICkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJzxzcGFuIHN0eWxlPVwiJytzdHlsZUJlZ2luK2NvbG9yKydcIiAnK2RhdGErJz4gJztcblx0XHRcdFx0XHRyb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9ICc8L3NwYW4+Jztcblx0XHRcdFx0fSBlbHNlIGlmICggcG9zID09IHJlZ2lvbi5lbmQgKSB7XG5cdFx0XHRcdFx0cm93W3Bvc10gPSAnPHNwYW4gc3R5bGU9XCInK3N0eWxlRW5kK2NvbG9yKycgXCIgJytkYXRhKyc+ICc7XG5cdFx0XHRcdFx0Ly9yb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9ICc8L3NwYW4+Jztcblx0XHRcdFx0fSBlbHNlIGlmICggcG9zID4gcmVnaW9uLnN0YXJ0ICYmIHBvcyA8IHJlZ2lvbi5lbmQgKSB7XG5cdFx0XHRcdFx0cm93W3Bvc10gPSAnPHNwYW4gc3R5bGU9XCInK3N0eWxlT24rY29sb3IrJ1wiICcrZGF0YSsnPiAnO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9IHNwYWNlQWZ0ZXI7XG5cdFx0XHRcdFx0cm93W3Bvc10gKz0gJzwvc3Bhbj4nO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFyb3dbcG9zXSkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJyAnO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9IHNwYWNlQWZ0ZXI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cbiAgICAgICBcdHZhciBzdHIgPSByb3cuam9pbihcIlwiKTtcbiAgICBcdFxuICAgIFx0cmV0dXJuICggc3RyLmluZGV4T2YoXCJzcGFuXCIpID09IC0xICk/IFwiXCIgOiBzdHI7XG4gICAgfSxcbiAgICAvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2RyYXdSYXdcbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZXF1ZW5jZSB1c2luZyBSQVcgZm9ybWF0LiAgXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IC1cbiAgICAgKi9cblx0X2RyYXdSYXcgOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIGEgPSB0aGlzLm9wdC5zZXF1ZW5jZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKTtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIGFyciA9IFtdO1xuXHRcdHZhciBwcmUgPSBqUXVlcnkoJzxwcmU+PC9wcmU+JykuYXBwZW5kVG8odGhpcy5fY29udGVudERpdik7XG5cdFx0XG5cdFx0LyogQ29ycmVjdCBjb2x1bW4gc2l6ZSBpbiBjYXNlIHRoZSBzZXF1ZW5jZSBpcyBhcyBzbWFsbCBwZXB0aWRlICovXG5cdFx0dmFyIG51bUNvbHMgPSB0aGlzLm9wdC5jb2x1bW5zLnNpemU7XG5cdFx0aWYgKCB0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGggPCB0aGlzLm9wdC5jb2x1bW5zLnNpemUgKSB7XG5cdFx0XHRudW1Db2xzID0gdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoO1x0XG5cdFx0fVxuXG5cdFx0dmFyIG9wdCA9IHtcblx0XHRcdG51bUNvbHM6IG51bUNvbHNcblx0XHR9O1xuXHRcdFxuXHRcdHByZS5odG1sKFxuXHRcdFx0dGhpcy5fZHJhd1NlcXVlbmNlKGEsIG9wdClcblx0XHQpO1xuXHRcdFxuXHRcdHRoaXMuX2RyYXdBbm5vdGF0aW9ucyhvcHQpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2RyYXdQcmlkZVxuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBjdXJyZW50IHNlcXVlbmNlIHVzaW5nIFBSSURFIGZvcm1hdC4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAtXG4gICAgICovXG5cdF9kcmF3UHJpZGUgOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIGEgPSB0aGlzLm9wdC5zZXF1ZW5jZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTtcblx0XHR2YXIgcHJlID0galF1ZXJ5KCc8cHJlPjwvcHJlPicpLmFwcGVuZFRvKHRoaXMuX2NvbnRlbnREaXYpO1xuXHRcdFxuXHRcdC8qIENvcnJlY3QgY29sdW1uIHNpemUgaW4gY2FzZSB0aGUgc2VxdWVuY2UgaXMgYXMgc21hbGwgcGVwdGlkZSAqL1xuXHRcdHZhciBudW1Db2xzID0gdGhpcy5vcHQuY29sdW1ucy5zaXplO1xuXHRcdGlmICggdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoIDwgdGhpcy5vcHQuY29sdW1ucy5zaXplICkge1xuXHRcdFx0bnVtQ29scyA9IHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aDtcdFxuXHRcdH1cblx0XG5cdFx0b3B0ID0ge1xuXHRcdFx0bnVtTGVmdDogdHJ1ZSxcblx0XHRcdG51bUxlZnRTaXplOiA1LFxuXHRcdFx0bnVtTGVmdFBhZDonMCcsXG5cdFx0XHRudW1SaWdodDogdHJ1ZSxcblx0XHRcdG51bVJpZ2h0U2l6ZTogNSxcblx0XHRcdG51bVJpZ2h0UGFkOiAnMCcsXG5cdFx0XHRudW1Db2xzOiBudW1Db2xzLFxuXHRcdCAgICBudW1Db2xzRm9yU3BhY2U6IHNlbGYub3B0LmNvbHVtbnMuc3BhY2VkRWFjaFxuXHRcdH07XG5cdFx0XG5cdFx0cHJlLmh0bWwoXG5cdFx0XHR0aGlzLl9kcmF3U2VxdWVuY2UoYSwgb3B0KVxuXHRcdCk7XG5cdFx0XG5cdFx0dGhpcy5fZHJhd0Fubm90YXRpb25zKG9wdCk7XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fZHJhd1NlcXVlbmNlXG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UgdXNpbmcgQ1VTVE9NIGZvcm1hdC4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAgIGEgLT4ge2NoYXJbXX0gYSBUaGUgc2VxdWVuY2Ugc3RyYW5kLlxuICAgICAqIFx0XHRcdCBvcHQgLT4ge09iamVjdH0gb3B0IFRoZSBDVVNUT00gZm9ybWF0LlxuICAgICAqL1xuXHRfZHJhd1NlcXVlbmNlIDogZnVuY3Rpb24oYSwgb3B0KSB7XG5cdFx0dmFyIGJ1ZmYgPSBbXTtcblxuXHRcdHZhciBzcGFjZVN0eWxlID0gIFwid2hpdGUtc3BhY2U6IHByZTtcIjtcblx0XHRcblx0XHQvLyBJbmRleCBhdCB0b3A/XG5cdFx0aWYoIG9wdC5udW1Ub3AgKVxuXHRcdHtcbiAgICAgIGJ1ZmYucHVzaCgnPHNwYW4gc3R5bGU9XCInLCBzcGFjZVN0eWxlLCAnXCIgY2xhc3M9XCJudW1Ub3BcIj4nKTtcblx0XHRcdHZhciBzaXplID0gKG9wdC5zcGFjZUJldHdlZW5DaGFycyk/IG9wdC5udW1Ub3BFYWNoKjI6IG9wdC5udW1Ub3BFYWNoO1xuXHRcdFx0XG5cdFx0XHRpZiAob3B0Lm51bUxlZnQpIHtcblx0XHRcdFx0YnVmZi5wdXNoKHRoaXMuX2Zvcm1hdEluZGV4KCcgJywgb3B0Lm51bUxlZnRTaXplLCAnICcpKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0YnVmZi5wdXNoKHRoaXMuX2Zvcm1hdEluZGV4KCcgJywgc2l6ZSwgJyAnKSk7XG5cdFx0XHRcblx0XHRcdGZvcih2YXIgeCA9IG9wdC5udW1Ub3BFYWNoOyB4IDwgb3B0Lm51bUNvbHM7IHggKz0gb3B0Lm51bVRvcEVhY2gpIHtcblx0XHRcdFx0YnVmZi5wdXNoKHRoaXMuX2Zvcm1hdEluZGV4KHgsIHNpemUsICcgJywgdHJ1ZSkpO1xuXHRcdFx0fVxuXHRcdFx0YnVmZi5wdXNoKCc8L3NwYW4+PGJyLz4nKTtcblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0Ly8gSW5kZXggYXQgdGhlIGxlZnQ/XG5cdFx0aWYgKG9wdC5udW1MZWZ0KSB7XG5cdFx0XHRidWZmLnB1c2godGhpcy5fZm9ybWF0SW5kZXgoMSwgb3B0Lm51bUxlZnRTaXplLCBvcHQubnVtTGVmdFBhZCksICcgICcpO1xuXHRcdH1cblxuXHRcdHZhciBqPTE7XG5cdFx0Zm9yICh2YXIgaT0xOyBpIDw9IGEubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0aWYoIGkgJSBvcHQubnVtQ29scyA9PT0gMCkge1x0XG5cdFx0XHRcdGJ1ZmYucHVzaCgnPHNwYW4gY2xhc3M9XCJzZXF1ZW5jZVwiIGlkPVwiJywgdGhpcy5nZXRJZCgpLCAnXycsIGksICdcIj4nLCBhW2ktMV0sICc8L3NwYW4+Jyk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAob3B0Lm51bVJpZ2h0KSB7XG5cdFx0XHRcdFx0YnVmZi5wdXNoKCc8c3BhbiBzdHlsZT1cIicsIHNwYWNlU3R5bGUsICdcIiBpZD1cIm51bVJpZ2h0XycsIHRoaXMuZ2V0SWQoKSwgJ18nLCBpLCAnXCI+Jyk7XG4gICAgICAgICAgYnVmZi5wdXNoKCcgICcpO1xuXHRcdFx0XHRcdGJ1ZmYucHVzaCh0aGlzLl9mb3JtYXRJbmRleChpLCBvcHQubnVtUmlnaHRTaXplLCBvcHQubnVtUmlnaHRQYWQpKTtcbiAgICAgICAgICBidWZmLnB1c2goJzwvc3Bhbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0YnVmZi5wdXNoKCc8YnIvPicpO1xuXHRcdFx0XHRcblx0XHRcdFx0dmFyIGFhUmVtYWluaW5nID0gYS5sZW5ndGggLSBpO1xuXHRcdFx0XHRpZiAob3B0Lm51bUxlZnQgJiYgYWFSZW1haW5pbmcgPiAwKSB7XG5cdFx0XHRcdFx0YnVmZi5wdXNoKCc8c3BhbiBpZD1cIm51bUxlZnRfJywgdGhpcy5nZXRJZCgpLCAnXycsIGksICdcIj4nKTtcblx0XHRcdFx0XHRidWZmLnB1c2godGhpcy5fZm9ybWF0SW5kZXgoaSsxLCBvcHQubnVtTGVmdFNpemUsIG9wdC5udW1MZWZ0UGFkKSk7XG5cdFx0XHRcdFx0YnVmZi5wdXNoKCcgIDwvc3Bhbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aiA9IDE7XG5cdFx0XHRcdFxuXHRcdFx0fSBlbHNlIHtcbiAgICAgICAgYnVmZi5wdXNoKCc8c3BhbiBjbGFzcz1cInNlcXVlbmNlXCInKTtcbiAgICAgICAgYnVmZi5wdXNoKCcgc3R5bGU9XCInLCBzcGFjZVN0eWxlLCAnXCInKTtcbiAgICAgICAgYnVmZi5wdXNoKCcgaWQ9XCInLCB0aGlzLmdldElkKCksICdfJywgaSwgJ1wiPicsIGFbaS0xXSk7XG4gICAgICAgIGJ1ZmYucHVzaChqICUgb3B0Lm51bUNvbHNGb3JTcGFjZSA9PT0gMCA/ICcgJyA6ICcnKTtcbiAgICAgICAgYnVmZi5wdXNoKG9wdC5zcGFjZUJldHdlZW5DaGFycyA/ICcgJyA6ICcnKTtcbiAgICAgICAgYnVmZi5wdXNoKCc8L3NwYW4+Jyk7XG4gICAgICAgIGorKztcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0YnVmZi5wdXNoKCc8YnIvPicpO1xuXHRcdFx0XG5cdFx0aWYgKGpRdWVyeS5icm93c2VyICYmIGpRdWVyeS5icm93c2VyLm1zaWUpIHtcbiAgICAgIHJldHVybiBcIjxwcmU+XCIgKyBidWZmLmpvaW4oJycpICsgXCI8L3ByZT5cIjtcblx0XHR9XHRlbHNlIHtcbiAgICAgIHJldHVybiBidWZmLmpvaW4oJycpO1xuICAgIH1cblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9mb3JtYXRJbmRleFxuICAgICAqIFB1cnBvc2U6ICBCdWlsZCB0aGUgSFRNTCBjb3JyZXNwb25kaW5nIHRvIGNvdW50aW5nIG51bWJlcnMgKHRvcCwgbGVmdCwgcmlnaHQpIGluIHRoZSBzdHJhbmQuXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6ICAgbnVtYmVyIC0+IHtpbnR9IFRoZSBudW1iZXIgXG4gICAgICogXHRcdFx0IHNpemUgLT4ge2ludH0gTnVtYmVyIG9mIGJpbnMgdG8gc3VpdCB0aGUgbnVtYmVyLlxuICAgICAqIFx0XHRcdCBmaWxsaW5nQ2hhciAtPiB7Y2hhcn0gQ2hhcmFjdGVyIHRvIGJlIHVzZWQgZm9yIGZpbGxpbmcgb3V0IGJsYW5rIGJpbnMuXG4gICAgICogXHRcdFx0IGFsaWduTGVmdCAtPiB7Ym9vbH0gVGVsbCBpZiBhbGlnbmVkIHRvIHRoZSBsZWZ0LlxuICAgICAqL1xuXHRfZm9ybWF0SW5kZXggOiBmdW5jdGlvbiggbnVtYmVyLCBzaXplLCBmaWxsaW5nQ2hhciwgYWxpZ25MZWZ0KSB7XG5cdFx0dmFyIHN0ciA9IG51bWJlci50b1N0cmluZygpO1xuXHRcdHZhciBmaWxsaW5nID0gJyc7XG5cdFx0dmFyIHBhZGRpbmcgPSBzaXplIC0gc3RyLmxlbmd0aDtcdFxuXHRcdGlmICggcGFkZGluZyA+IDAgKSB7XG5cdFx0XHR3aGlsZSAoIHBhZGRpbmctLSA+IDAgKSB7XG5cdFx0XHRcdGZpbGxpbmcgKz0gKFwiPHNwYW4+XCIrZmlsbGluZ0NoYXIrXCI8L3NwYW4+XCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFsaWduTGVmdCl7XG5cdFx0XHRcdHN0ciA9IG51bWJlcitmaWxsaW5nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3RyID0gZmlsbGluZytudW1iZXI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdHI7XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fYWRkU3BhbkV2ZW50c1xuICAgICAqIFB1cnBvc2U6ICBBZGQgdGhlIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBzdHJhbmQuXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6ICAgLVxuICAgICAqL1xuXHRfYWRkU3BhbkV2ZW50cyA6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgaXNNb3VzZURvd24gPSBmYWxzZTtcblx0XHR2YXIgY3VycmVudFBvcztcblxuXHRcdHNlbGYuX2NvbnRlbnREaXYuZmluZCgnLnNlcXVlbmNlJykuZWFjaCggZnVuY3Rpb24gKCkge1x0XG5cdFx0XHRcblx0XHRcdC8vIFJlZ2lzdGVyIHRoZSBzdGFydGluZyBwb3NpdGlvblxuXHRcdFx0alF1ZXJ5KHRoaXMpLm1vdXNlZG93bihmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGlkID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJyk7XG5cdFx0XHRcdGN1cnJlbnRQb3MgPSBwYXJzZUludChpZC5zdWJzdHIoaWQuaW5kZXhPZihcIl9cIikgKyAxKSk7XG5cdFx0XHRcdGNsaWNrUG9zID0gY3VycmVudFBvcztcblx0XHRcdFx0c2VsZi5fc2V0U2VsZWN0aW9uKGNsaWNrUG9zLGN1cnJlbnRQb3MpO1xuXHRcdFx0XHRpc01vdXNlRG93biA9IHRydWU7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBTZWxlY3Rpb24gaXMgaGFwcGVuaW5nLCByYWlzZSBhbiBldmVudFxuXHRcdFx0XHRzZWxmLnRyaWdnZXIoXG5cdFx0XHRcdFx0RVZUX09OX1NFTEVDVElPTl9DSEFOR0UsIFxuXHRcdFx0XHRcdHsgXG5cdFx0XHRcdFx0XHRcInN0YXJ0XCIgOiBzZWxmLm9wdC5zZWxlY3Rpb24uc3RhcnQsIFxuXHRcdFx0XHRcdFx0XCJlbmRcIiA6IHNlbGYub3B0LnNlbGVjdGlvbi5lbmQgXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0XG5cdFx0XHR9KS5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIFVwZGF0ZSBzZWxlY3Rpb25cblx0XHRcdFx0Ly8gU2hvdyB0b29sdGlwIGNvbnRhaW5pbmcgdGhlIHBvc2l0aW9uXG5cdFx0XHRcdHZhciBpZCA9IGpRdWVyeSh0aGlzKS5hdHRyKCdpZCcpO1xuXHRcdFx0XHRjdXJyZW50UG9zID0gcGFyc2VJbnQoaWQuc3Vic3RyKGlkLmluZGV4T2YoXCJfXCIpICsgMSkpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYoaXNNb3VzZURvd24pIHtcblx0XHRcdFx0XHRpZiggY3VycmVudFBvcyA+IGNsaWNrUG9zICkge1xuXHRcdFx0XHRcdFx0c2VsZi5fc2V0U2VsZWN0aW9uKGNsaWNrUG9zLCBjdXJyZW50UG9zKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2VsZi5fc2V0U2VsZWN0aW9uKGN1cnJlbnRQb3MsIGNsaWNrUG9zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gU2VsZWN0aW9uIGlzIGhhcHBlbmluZywgcmFpc2UgYW4gZXZlbnRcblx0XHRcdFx0XHRzZWxmLnRyaWdnZXIoIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFLCB7IFxuXHRcdFx0XHRcdFx0XCJzdGFydFwiIDogc2VsZi5vcHQuc2VsZWN0aW9uLnN0YXJ0LCBcblx0XHRcdFx0XHRcdFwiZW5kXCIgOiBzZWxmLm9wdC5zZWxlY3Rpb24uZW5kIFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IFxuXHRcdFx0XHRcblx0XHRcdH0pLm1vdXNldXAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlzTW91c2VEb3duID0gZmFsc2U7XG5cdFx0XHRcdC8vIFNlbGVjdGlvbiBpcyBkb25lLCByYWlzZSBhbiBldmVudFxuXHRcdFx0XHRzZWxmLnRyaWdnZXIoIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCwgeyBcblx0XHRcdFx0XHRcInN0YXJ0XCIgOiBzZWxmLm9wdC5zZWxlY3Rpb24uc3RhcnQsIFxuXHRcdFx0XHRcdFwiZW5kXCIgOiBzZWxmLm9wdC5zZWxlY3Rpb24uZW5kIFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBBZGQgYSB0b29sdGlwIGZvciB0aGlzIHNlcXVlbmNlIGJhc2UuXG5cdFx0XHRzZWxmLl9hZGRUb29sVGlwLmNhbGwoIHNlbGYsIHRoaXMsIGZ1bmN0aW9uKCApIHtcblx0XHRcdFx0aWYgKGlzTW91c2VEb3duKSB7XG5cdCAgICAgXHRcdFx0cmV0dXJuIFwiW1wiICsgc2VsZi5vcHQuc2VsZWN0aW9uLnN0YXJ0ICtcIiwgXCIgKyBzZWxmLm9wdC5zZWxlY3Rpb24uZW5kICsgXCJdXCI7XG5cdCAgICAgXHRcdH0gZWxzZSB7XG5cdCAgICAgXHRcdFx0cmV0dXJuIGN1cnJlbnRQb3M7XG5cdCAgICAgXHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0fSlcblx0XHQuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2FkZFRvb2x0aXBcbiAgICAgKiBQdXJwb3NlOiAgQWRkIGEgdG9vbHRpcCBhcm91bmQgdGhlIHRhcmdldCBET00gZWxlbWVudCBwcm92aWRlZCBhcyBhcmd1bWVudFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAgIHRhcmdldCAtPiB7RWxlbWVudH0gRE9NIGVsZW1lbnQgd2ljaCBpcyB0aGUgdGFyZ2V0ZWQgZm9jdXMgZm9yIHRoZSB0b29sdGlwLlxuICAgICAqIFx0XHRcdCBjYkdldE1lc3NhZ2VGdW5jdGlvbiAtPiB7ZnVuY3Rpb259IEEgY2FsbGJhY2sgZnVuY3Rpb24gd2ljaCByZXR1cm5zIHRoZSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdGlwLlxuICAgICAqL1xuXHRfYWRkVG9vbFRpcCA6IGZ1bmN0aW9uICggdGFyZ2V0LCBjYkdldE1lc3NhZ2VGdW5jdGlvbiApIHtcblx0XHRcbiBcdFx0dmFyIHRpcElkID0gJyNzZXF1ZW5jZVRpcCcgKyB0aGlzLmdldElkKCk7XG5cdFx0XG5cdFx0alF1ZXJ5KHRhcmdldCkubW91c2VvdmVyKGZ1bmN0aW9uKGUpIHtcblx0XHRcdFxuXHQgXHRcdHZhciBvZmZzZXQgPSBqUXVlcnkoZS50YXJnZXQpLm9mZnNldCgpO1xuXG5cdFx0XHRpZiAoICEgalF1ZXJ5KCB0aXBJZCApLmlzKCc6dmlzaWJsZScpICkge1xuXHRcdCAgICAgICAgalF1ZXJ5KCB0aXBJZCApIFxuXHRcdCAgICAgICAgXHQuY3NzKHtcblx0XHQgICAgICAgIFx0XHQnYmFja2dyb3VuZC1jb2xvcic6IFwiIzAwMFwiLFxuXHRcdCAgICAgICAgXHRcdCdwYWRkaW5nJzogXCIzcHggMTBweCAzcHggMTBweFwiLFxuXHRcdCAgICAgICAgXHRcdCd0b3AnOiBvZmZzZXQudG9wICsgalF1ZXJ5KGUudGFyZ2V0KS5oZWlnaHQoKSArIFwicHhcIixcblx0XHQgICAgICAgIFx0XHQnbGVmdCc6IG9mZnNldC5sZWZ0ICsgalF1ZXJ5KGUudGFyZ2V0KS53aWR0aCgpICsgXCJweFwiXG5cdFx0ICAgICAgICBcdH0pXG5cdFx0XHQgICAgICAgIC5hbmltYXRlKCB7b3BhY2l0eTogJzAuODUnfSwgMTApXG5cdFx0XHQgICAgICAgIC5odG1sKCBjYkdldE1lc3NhZ2VGdW5jdGlvbi5jYWxsKCB0YXJnZXQgKSApXG5cdFx0XHQgICAgICAgIC5zaG93KCk7XG5cdFx0XHR9XG5cblx0ICAgIH0pLm1vdXNlb3V0KGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIC8vUmVtb3ZlIHRoZSBhcHBlbmRlZCB0b29sdGlwIHRlbXBsYXRlXG5cdCAgICAgICAgalF1ZXJ5KCB0aXBJZCApLmhpZGUoKTtcdCAgICAgICAgIFxuXHQgICAgfSk7XG5cdH0sXG5cdFxuICAgLyoqXG4gICAgKiBBbm5vdGF0ZSBhIHNldCBvZiBpbnRlcnZhbHMgcHJvdmlkZWQgaW4gdGhlIGFyZ3VtZW50LlxuXHQqIFxuXHQqIEBkZXByZWNhdGVkIFVzZSBhZGRBbm5vdGF0aW9uKCkgaW5zdGVhZC5cbiAgICAqIFxuICAgICogQHBhcmFtIHtPYmplY3R9IGFubm90YXRpb24gVGhlIGludGVydmFscyBiZWxvbmdpbmcgdG8gdGhlIHNhbWUgYW5ub3RhdGlvbi4gXG4gICAgKiBTeW50YXg6IHsgbmFtZTogJmx0O3ZhbHVlJmd0OywgY29sb3I6ICZsdDtIVE1MQ29sb3JDb2RlJmd0OywgaHRtbDogJmx0O0hUTUxTdHJpbmcmZ3Q7LCByZWdpb25zOiBbeyBzdGFydDogJmx0O3N0YXJ0VmFsMSZndDssIGVuZDogJmx0O2VuZFZhbDEmZ3Q7fSwgLi4uLCAgeyBzdGFydDogJmx0O3N0YXJ0VmFsTiZndDssIGVuZDogJmx0O2VuZFZhbE4mZ3Q7fV0gfVxuICAgICovXG5cdHNldEFubm90YXRpb246IGZ1bmN0aW9uICggYW5ub3RhdGlvbiApIHtcblx0XHR0aGlzLmFkZEFubm90YXRpb24oYW5ub3RhdGlvbik7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIEFubm90YXRlIGEgc2V0IG9mIGludGVydmFscyBwcm92aWRlZCBpbiB0aGUgYXJndW1lbnQuXG4gICAgKiBcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBBbm5vdGF0aW9ucyB1c2luZyByZWdpb25zIHdpdGggZGlmZmVyZW50IGNvbG9ycy5cbiAgICAqIG15U2VxdWVuY2UuYWRkQW5ub3RhdGlvbih7XG5cdCogICAgbmFtZTpcIlVOSVBST1RcIiwgXG5cdCogICAgaHRtbDpcIiZsdDticiZndDsgRXhhbXBsZSBvZiAmbHQ7YiZndDtIVE1MJmx0Oy9iJmd0O1wiLCBcblx0KiAgICBjb2xvcjpcImdyZWVuXCIsIFxuXHQqICAgIHJlZ2lvbnM6IFtcblx0KiAgICAgICB7c3RhcnQ6IDU0MCwgZW5kOiA1NjB9LFxuXHQqICAgICAgIHtzdGFydDogNTYxLCBlbmQ6NTgwLCBjb2xvcjogXCIjRkZBMDEwXCJ9LCBcblx0KiAgICAgICB7c3RhcnQ6IDU4MSwgZW5kOjU5MCwgY29sb3I6IFwicmVkXCJ9LCBcblx0KiAgICAgICB7c3RhcnQ6IDY5MCwgZW5kOjcxMH1dXG5cdCogfSk7XG5cdCogXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbm5vdGF0aW9uIFRoZSBpbnRlcnZhbHMgYmVsb25naW5nIHRvIHRoZSBzYW1lIGFubm90YXRpb24uIFxuICAgICogU3ludGF4OiB7IG5hbWU6ICZsdDt2YWx1ZSZndDssIGNvbG9yOiAmbHQ7SFRNTENvbG9yQ29kZSZndDssIGh0bWw6ICZsdDtIVE1MU3RyaW5nJmd0OywgcmVnaW9uczogW3sgc3RhcnQ6ICZsdDtzdGFydFZhbDEmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWwxJmd0O30sIC4uLiwgIHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0O31dIH1cbiAgICAqL1xuXHRhZGRBbm5vdGF0aW9uOiBmdW5jdGlvbiAoIGFubm90YXRpb24gKSB7XG5cdFx0dGhpcy5fYW5ub3RhdGlvbnMucHVzaChhbm5vdGF0aW9uKTtcblx0XHR0aGlzLl9yZWRyYXcoKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogUmVtb3ZlcyBhbiBhbm5vdGF0aW9uIGJ5IG1lYW5zIG9mIGl0cyBuYW1lLlxuICAgICogXG4gICAgKiBAZXhhbXBsZSBcbiAgICAqIC8vIFJlbW92ZSB0aGUgVU5JUFJPVCBhbm5vdGF0aW9uLlxuICAgICogbXlTZXF1ZW5jZS5yZW1vdmVBbm5vdGF0aW9uKCdVTklQUk9UJyk7IFxuICAgICogXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYW5ub3RhdGlvbiB0byBiZSByZW1vdmVkLlxuICAgICogXG4gICAgKi9cblx0cmVtb3ZlQW5ub3RhdGlvbjogZnVuY3Rpb24gKCBuYW1lICkge1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMuX2Fubm90YXRpb25zLmxlbmd0aCA7IGkrKyApe1xuXHRcdFx0aWYobmFtZSAhPSB0aGlzLl9hbm5vdGF0aW9uc1tpXS5uYW1lKXtcblx0XHRcdFx0dGhpcy5fYW5ub3RhdGlvbnMuc3BsaWNlKGksMSk7XG5cdFx0XHRcdHRoaXMuX3JlZHJhdygpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdC8qKlxuICAgICogUmVtb3ZlcyBhbGwgdGhlIGN1cnJlbnQgYW5ub3RhdGlvbnMuXG4gICAgKiBcbiAgICAqIEBleGFtcGxlIFxuICAgICogbXlTZXF1ZW5jZS5yZW1vdmVBbGxBbm5vdGF0aW9ucygpOyBcbiAgICAqIFxuICAgICovXG5cdHJlbW92ZUFsbEFubm90YXRpb25zOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fYW5ub3RhdGlvbnMgPSBbXTtcblx0XHR0aGlzLl9yZWRyYXcoKTtcblx0fSxcblxuXHRcbn0pO1xuXG5yZXF1aXJlKFwiYmlvanMtZXZlbnRzXCIpLm1peGluKFNlcXVlbmNlLnByb3RvdHlwZSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlcXVlbmNlO1xuIiwidmFyIGV2ZW50cyA9IHJlcXVpcmUoXCJiYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZVwiKTtcblxuZXZlbnRzLm9uQWxsID0gZnVuY3Rpb24oY2FsbGJhY2ssY29udGV4dCl7XG4gIHRoaXMub24oXCJhbGxcIiwgY2FsbGJhY2ssY29udGV4dCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gTWl4aW4gdXRpbGl0eVxuZXZlbnRzLm9sZE1peGluID0gZXZlbnRzLm1peGluO1xuZXZlbnRzLm1peGluID0gZnVuY3Rpb24ocHJvdG8pIHtcbiAgZXZlbnRzLm9sZE1peGluKHByb3RvKTtcbiAgLy8gYWRkIGN1c3RvbSBvbkFsbFxuICB2YXIgZXhwb3J0cyA9IFsnb25BbGwnXTtcbiAgZm9yKHZhciBpPTA7IGkgPCBleHBvcnRzLmxlbmd0aDtpKyspe1xuICAgIHZhciBuYW1lID0gZXhwb3J0c1tpXTtcbiAgICBwcm90b1tuYW1lXSA9IHRoaXNbbmFtZV07XG4gIH1cbiAgcmV0dXJuIHByb3RvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBldmVudHM7XG4iLCIvKipcbiAqIFN0YW5kYWxvbmUgZXh0cmFjdGlvbiBvZiBCYWNrYm9uZS5FdmVudHMsIG5vIGV4dGVybmFsIGRlcGVuZGVuY3kgcmVxdWlyZWQuXG4gKiBEZWdyYWRlcyBuaWNlbHkgd2hlbiBCYWNrb25lL3VuZGVyc2NvcmUgYXJlIGFscmVhZHkgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50XG4gKiBnbG9iYWwgY29udGV4dC5cbiAqXG4gKiBOb3RlIHRoYXQgZG9jcyBzdWdnZXN0IHRvIHVzZSB1bmRlcnNjb3JlJ3MgYF8uZXh0ZW5kKClgIG1ldGhvZCB0byBhZGQgRXZlbnRzXG4gKiBzdXBwb3J0IHRvIHNvbWUgZ2l2ZW4gb2JqZWN0LiBBIGBtaXhpbigpYCBtZXRob2QgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIEV2ZW50c1xuICogcHJvdG90eXBlIHRvIGF2b2lkIHVzaW5nIHVuZGVyc2NvcmUgZm9yIHRoYXQgc29sZSBwdXJwb3NlOlxuICpcbiAqICAgICB2YXIgbXlFdmVudEVtaXR0ZXIgPSBCYWNrYm9uZUV2ZW50cy5taXhpbih7fSk7XG4gKlxuICogT3IgZm9yIGEgZnVuY3Rpb24gY29uc3RydWN0b3I6XG4gKlxuICogICAgIGZ1bmN0aW9uIE15Q29uc3RydWN0b3IoKXt9XG4gKiAgICAgTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZm9vID0gZnVuY3Rpb24oKXt9XG4gKiAgICAgQmFja2JvbmVFdmVudHMubWl4aW4oTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuICpcbiAqIChjKSAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIEluYy5cbiAqIChjKSAyMDEzIE5pY29sYXMgUGVycmlhdWx0XG4gKi9cbi8qIGdsb2JhbCBleHBvcnRzOnRydWUsIGRlZmluZSwgbW9kdWxlICovXG4oZnVuY3Rpb24oKSB7XG4gIHZhciByb290ID0gdGhpcyxcbiAgICAgIGJyZWFrZXIgPSB7fSxcbiAgICAgIG5hdGl2ZUZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCxcbiAgICAgIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgaWRDb3VudGVyID0gMDtcblxuICAvLyBSZXR1cm5zIGEgcGFydGlhbCBpbXBsZW1lbnRhdGlvbiBtYXRjaGluZyB0aGUgbWluaW1hbCBBUEkgc3Vic2V0IHJlcXVpcmVkXG4gIC8vIGJ5IEJhY2tib25lLkV2ZW50c1xuICBmdW5jdGlvbiBtaW5pc2NvcmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleXM6IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJrZXlzKCkgY2FsbGVkIG9uIGEgbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5LCBrZXlzID0gW107XG4gICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAga2V5c1trZXlzLmxlbmd0aF0gPSBrZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgfSxcblxuICAgICAgdW5pcXVlSWQ6IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgICAgICB2YXIgaWQgPSArK2lkQ291bnRlciArICcnO1xuICAgICAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgICAgIH0sXG5cbiAgICAgIGhhczogZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICAgICAgfSxcblxuICAgICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKG5hdGl2ZUZvckVhY2ggJiYgb2JqLmZvckVhY2ggPT09IG5hdGl2ZUZvckVhY2gpIHtcbiAgICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gYnJlYWtlcikgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIG9uY2U6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgdmFyIHJhbiA9IGZhbHNlLCBtZW1vO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHJhbikgcmV0dXJuIG1lbW87XG4gICAgICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGZ1bmMgPSBudWxsO1xuICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgXyA9IG1pbmlzY29yZSgpLCBFdmVudHM7XG5cbiAgLy8gQmFja2JvbmUuRXZlbnRzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEEgbW9kdWxlIHRoYXQgY2FuIGJlIG1peGVkIGluIHRvICphbnkgb2JqZWN0KiBpbiBvcmRlciB0byBwcm92aWRlIGl0IHdpdGhcbiAgLy8gY3VzdG9tIGV2ZW50cy4gWW91IG1heSBiaW5kIHdpdGggYG9uYCBvciByZW1vdmUgd2l0aCBgb2ZmYCBjYWxsYmFja1xuICAvLyBmdW5jdGlvbnMgdG8gYW4gZXZlbnQ7IGB0cmlnZ2VyYC1pbmcgYW4gZXZlbnQgZmlyZXMgYWxsIGNhbGxiYWNrcyBpblxuICAvLyBzdWNjZXNzaW9uLlxuICAvL1xuICAvLyAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAvLyAgICAgXy5leHRlbmQob2JqZWN0LCBCYWNrYm9uZS5FdmVudHMpO1xuICAvLyAgICAgb2JqZWN0Lm9uKCdleHBhbmQnLCBmdW5jdGlvbigpeyBhbGVydCgnZXhwYW5kZWQnKTsgfSk7XG4gIC8vICAgICBvYmplY3QudHJpZ2dlcignZXhwYW5kJyk7XG4gIC8vXG4gIEV2ZW50cyA9IHtcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLiBQYXNzaW5nIGBcImFsbFwiYCB3aWxsIGJpbmRcbiAgICAvLyB0aGUgY2FsbGJhY2sgdG8gYWxsIGV2ZW50cyBmaXJlZC5cbiAgICBvbjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KTtcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKTtcbiAgICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQmluZCBhbiBldmVudCB0byBvbmx5IGJlIHRyaWdnZXJlZCBhIHNpbmdsZSB0aW1lLiBBZnRlciB0aGUgZmlyc3QgdGltZVxuICAgIC8vIHRoZSBjYWxsYmFjayBpcyBpbnZva2VkLCBpdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgb25jZTogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBvbmNlID0gXy5vbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgb25lIG9yIG1hbnkgY2FsbGJhY2tzLiBJZiBgY29udGV4dGAgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3Mgd2l0aCB0aGF0IGZ1bmN0aW9uLiBJZiBgY2FsbGJhY2tgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIGZvciB0aGUgZXZlbnQuIElmIGBuYW1lYCBpcyBudWxsLCByZW1vdmVzIGFsbCBib3VuZFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgYWxsIGV2ZW50cy5cbiAgICBvZmY6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwgaztcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpcztcbiAgICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBfLmtleXModGhpcy5fZXZlbnRzKTtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICBpZiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gcmV0YWluID0gW107XG4gICAgICAgICAgaWYgKGNhbGxiYWNrIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgICAgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXYuY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSBkZWxldGUgdGhpcy5fZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBUcmlnZ2VyIG9uZSBvciBtYW55IGV2ZW50cywgZmlyaW5nIGFsbCBib3VuZCBjYWxsYmFja3MuIENhbGxiYWNrcyBhcmVcbiAgICAvLyBwYXNzZWQgdGhlIHNhbWUgYXJndW1lbnRzIGFzIGB0cmlnZ2VyYCBpcywgYXBhcnQgZnJvbSB0aGUgZXZlbnQgbmFtZVxuICAgIC8vICh1bmxlc3MgeW91J3JlIGxpc3RlbmluZyBvbiBgXCJhbGxcImAsIHdoaWNoIHdpbGwgY2F1c2UgeW91ciBjYWxsYmFjayB0b1xuICAgIC8vIHJlY2VpdmUgdGhlIHRydWUgbmFtZSBvZiB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50KS5cbiAgICB0cmlnZ2VyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgIHZhciBhbGxFdmVudHMgPSB0aGlzLl9ldmVudHMuYWxsO1xuICAgICAgaWYgKGV2ZW50cykgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpO1xuICAgICAgaWYgKGFsbEV2ZW50cykgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVGVsbCB0aGlzIG9iamVjdCB0byBzdG9wIGxpc3RlbmluZyB0byBlaXRoZXIgc3BlY2lmaWMgZXZlbnRzIC4uLiBvclxuICAgIC8vIHRvIGV2ZXJ5IG9iamVjdCBpdCdzIGN1cnJlbnRseSBsaXN0ZW5pbmcgdG8uXG4gICAgc3RvcExpc3RlbmluZzogZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBkZWxldGVMaXN0ZW5lciA9ICFuYW1lICYmICFjYWxsYmFjaztcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIGlmIChvYmopIChsaXN0ZW5lcnMgPSB7fSlbb2JqLl9saXN0ZW5lcklkXSA9IG9iajtcbiAgICAgIGZvciAodmFyIGlkIGluIGxpc3RlbmVycykge1xuICAgICAgICBsaXN0ZW5lcnNbaWRdLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIGlmIChkZWxldGVMaXN0ZW5lcikgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1tpZF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgfTtcblxuICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byBzcGxpdCBldmVudCBzdHJpbmdzLlxuICB2YXIgZXZlbnRTcGxpdHRlciA9IC9cXHMrLztcblxuICAvLyBJbXBsZW1lbnQgZmFuY3kgZmVhdHVyZXMgb2YgdGhlIEV2ZW50cyBBUEkgc3VjaCBhcyBtdWx0aXBsZSBldmVudFxuICAvLyBuYW1lcyBgXCJjaGFuZ2UgYmx1clwiYCBhbmQgalF1ZXJ5LXN0eWxlIGV2ZW50IG1hcHMgYHtjaGFuZ2U6IGFjdGlvbn1gXG4gIC8vIGluIHRlcm1zIG9mIHRoZSBleGlzdGluZyBBUEkuXG4gIHZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICAgIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoZXZlbnRTcGxpdHRlcik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBBIGRpZmZpY3VsdC10by1iZWxpZXZlLCBidXQgb3B0aW1pemVkIGludGVybmFsIGRpc3BhdGNoIGZ1bmN0aW9uIGZvclxuICAvLyB0cmlnZ2VyaW5nIGV2ZW50cy4gVHJpZXMgdG8ga2VlcCB0aGUgdXN1YWwgY2FzZXMgc3BlZWR5IChtb3N0IGludGVybmFsXG4gIC8vIEJhY2tib25lIGV2ZW50cyBoYXZlIDMgYXJndW1lbnRzKS5cbiAgdmFyIHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MpIHtcbiAgICB2YXIgZXYsIGkgPSAtMSwgbCA9IGV2ZW50cy5sZW5ndGgsIGExID0gYXJnc1swXSwgYTIgPSBhcmdzWzFdLCBhMyA9IGFyZ3NbMl07XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVybjtcbiAgICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuO1xuICAgICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuO1xuICAgICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVybjtcbiAgICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBsaXN0ZW5NZXRob2RzID0ge2xpc3RlblRvOiAnb24nLCBsaXN0ZW5Ub09uY2U6ICdvbmNlJ307XG5cbiAgLy8gSW52ZXJzaW9uLW9mLWNvbnRyb2wgdmVyc2lvbnMgb2YgYG9uYCBhbmQgYG9uY2VgLiBUZWxsICp0aGlzKiBvYmplY3QgdG9cbiAgLy8gbGlzdGVuIHRvIGFuIGV2ZW50IGluIGFub3RoZXIgb2JqZWN0IC4uLiBrZWVwaW5nIHRyYWNrIG9mIHdoYXQgaXQnc1xuICAvLyBsaXN0ZW5pbmcgdG8uXG4gIF8uZWFjaChsaXN0ZW5NZXRob2RzLCBmdW5jdGlvbihpbXBsZW1lbnRhdGlvbiwgbWV0aG9kKSB7XG4gICAgRXZlbnRzW21ldGhvZF0gPSBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8ICh0aGlzLl9saXN0ZW5lcnMgPSB7fSk7XG4gICAgICB2YXIgaWQgPSBvYmouX2xpc3RlbmVySWQgfHwgKG9iai5fbGlzdGVuZXJJZCA9IF8udW5pcXVlSWQoJ2wnKSk7XG4gICAgICBsaXN0ZW5lcnNbaWRdID0gb2JqO1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzO1xuICAgICAgb2JqW2ltcGxlbWVudGF0aW9uXShuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9KTtcblxuICAvLyBBbGlhc2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgRXZlbnRzLmJpbmQgICA9IEV2ZW50cy5vbjtcbiAgRXZlbnRzLnVuYmluZCA9IEV2ZW50cy5vZmY7XG5cbiAgLy8gTWl4aW4gdXRpbGl0eVxuICBFdmVudHMubWl4aW4gPSBmdW5jdGlvbihwcm90bykge1xuICAgIHZhciBleHBvcnRzID0gWydvbicsICdvbmNlJywgJ29mZicsICd0cmlnZ2VyJywgJ3N0b3BMaXN0ZW5pbmcnLCAnbGlzdGVuVG8nLFxuICAgICAgICAgICAgICAgICAgICdsaXN0ZW5Ub09uY2UnLCAnYmluZCcsICd1bmJpbmQnXTtcbiAgICBfLmVhY2goZXhwb3J0cywgZnVuY3Rpb24obmFtZSkge1xuICAgICAgcHJvdG9bbmFtZV0gPSB0aGlzW25hbWVdO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiBwcm90bztcbiAgfTtcblxuICAvLyBFeHBvcnQgRXZlbnRzIGFzIEJhY2tib25lRXZlbnRzIGRlcGVuZGluZyBvbiBjdXJyZW50IGNvbnRleHRcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBFdmVudHM7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBFdmVudHM7XG4gICAgfVxuICAgIGV4cG9ydHMuQmFja2JvbmVFdmVudHMgPSBFdmVudHM7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5CYWNrYm9uZUV2ZW50cyA9IEV2ZW50cztcbiAgfVxufSkodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9qcXVlcnkuYnJvd3NlcicpO1xuIiwiLyohXG4gKiBqUXVlcnkgQnJvd3NlciBQbHVnaW4gdjAuMC42XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ2FiY2ViL2pxdWVyeS1icm93c2VyLXBsdWdpblxuICpcbiAqIE9yaWdpbmFsIGpxdWVyeS1icm93c2VyIGNvZGUgQ29weXJpZ2h0IDIwMDUsIDIwMTMgalF1ZXJ5IEZvdW5kYXRpb24sIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIE1vZGlmaWNhdGlvbnMgQ29weXJpZ2h0IDIwMTMgR2FicmllbCBDZWJyaWFuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ2FiY2ViXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogRGF0ZTogMjAxMy0wNy0yOVQxNzoyMzoyNy0wNzowMFxuICovXG5cblxudmFyIG1hdGNoZWQsIGJyb3dzZXI7XG5cbnZhciB1YU1hdGNoID0gZnVuY3Rpb24oIHVhICkge1xuICB1YSA9IHVhLnRvTG93ZXJDYXNlKCk7XG5cbiAgdmFyIG1hdGNoID0gLyhvcHIpW1xcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAvKGNocm9tZSlbIFxcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAvKHZlcnNpb24pWyBcXC9dKFtcXHcuXSspLiooc2FmYXJpKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgIC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgIC8ob3BlcmEpKD86Lip2ZXJzaW9ufClbIFxcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAvKG1zaWUpIChbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgIHVhLmluZGV4T2YoXCJ0cmlkZW50XCIpID49IDAgJiYgLyhydikoPzo6fCApKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgdWEuaW5kZXhPZihcImNvbXBhdGlibGVcIikgPCAwICYmIC8obW96aWxsYSkoPzouKj8gcnY6KFtcXHcuXSspfCkvLmV4ZWMoIHVhICkgfHxcbiAgICBbXTtcblxuICB2YXIgcGxhdGZvcm1fbWF0Y2ggPSAvKGlwYWQpLy5leGVjKCB1YSApIHx8XG4gICAgLyhpcGhvbmUpLy5leGVjKCB1YSApIHx8XG4gICAgLyhhbmRyb2lkKS8uZXhlYyggdWEgKSB8fFxuICAgIC8od2luZG93cyBwaG9uZSkvLmV4ZWMoIHVhICkgfHxcbiAgICAvKHdpbikvLmV4ZWMoIHVhICkgfHxcbiAgICAvKG1hYykvLmV4ZWMoIHVhICkgfHxcbiAgICAvKGxpbnV4KS8uZXhlYyggdWEgKSB8fFxuICAgIC8oY3JvcykvaS5leGVjKCB1YSApIHx8XG4gICAgW107XG5cbiAgcmV0dXJuIHtcbiAgICBicm93c2VyOiBtYXRjaFsgMyBdIHx8IG1hdGNoWyAxIF0gfHwgXCJcIixcbiAgICB2ZXJzaW9uOiBtYXRjaFsgMiBdIHx8IFwiMFwiLFxuICAgIHBsYXRmb3JtOiBwbGF0Zm9ybV9tYXRjaFsgMCBdIHx8IFwiXCJcbiAgfTtcbn07XG5cbm1hdGNoZWQgPSB1YU1hdGNoKCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCApO1xuYnJvd3NlciA9IHt9O1xuYnJvd3Nlci51YU1hdGNoID0gdWFNYXRjaDtcblxuaWYgKCBtYXRjaGVkLmJyb3dzZXIgKSB7XG4gIGJyb3dzZXJbIG1hdGNoZWQuYnJvd3NlciBdID0gdHJ1ZTtcbiAgYnJvd3Nlci52ZXJzaW9uID0gbWF0Y2hlZC52ZXJzaW9uO1xuICBicm93c2VyLnZlcnNpb25OdW1iZXIgPSBwYXJzZUludChtYXRjaGVkLnZlcnNpb24pO1xufVxuXG5pZiAoIG1hdGNoZWQucGxhdGZvcm0gKSB7XG4gIGJyb3dzZXJbIG1hdGNoZWQucGxhdGZvcm0gXSA9IHRydWU7XG59XG5cbi8vIFRoZXNlIGFyZSBhbGwgY29uc2lkZXJlZCBtb2JpbGUgcGxhdGZvcm1zLCBtZWFuaW5nIHRoZXkgcnVuIGEgbW9iaWxlIGJyb3dzZXJcbmlmICggYnJvd3Nlci5hbmRyb2lkIHx8IGJyb3dzZXIuaXBhZCB8fCBicm93c2VyLmlwaG9uZSB8fCBicm93c2VyWyBcIndpbmRvd3MgcGhvbmVcIiBdICkge1xuICBicm93c2VyLm1vYmlsZSA9IHRydWU7XG59XG5cbi8vIFRoZXNlIGFyZSBhbGwgY29uc2lkZXJlZCBkZXNrdG9wIHBsYXRmb3JtcywgbWVhbmluZyB0aGV5IHJ1biBhIGRlc2t0b3AgYnJvd3NlclxuaWYgKCBicm93c2VyLmNyb3MgfHwgYnJvd3Nlci5tYWMgfHwgYnJvd3Nlci5saW51eCB8fCBicm93c2VyLndpbiApIHtcbiAgYnJvd3Nlci5kZXNrdG9wID0gdHJ1ZTtcbn1cblxuLy8gQ2hyb21lLCBPcGVyYSAxNSsgYW5kIFNhZmFyaSBhcmUgd2Via2l0IGJhc2VkIGJyb3dzZXJzXG5pZiAoIGJyb3dzZXIuY2hyb21lIHx8IGJyb3dzZXIub3ByIHx8IGJyb3dzZXIuc2FmYXJpICkge1xuICBicm93c2VyLndlYmtpdCA9IHRydWU7XG59XG5cbi8vIElFMTEgaGFzIGEgbmV3IHRva2VuIHNvIHdlIHdpbGwgYXNzaWduIGl0IG1zaWUgdG8gYXZvaWQgYnJlYWtpbmcgY2hhbmdlc1xuaWYgKCBicm93c2VyLnJ2IClcbntcbiAgdmFyIGllID0gXCJtc2llXCI7XG5cbiAgbWF0Y2hlZC5icm93c2VyID0gaWU7XG4gIGJyb3dzZXJbaWVdID0gdHJ1ZTtcbn1cblxuLy8gT3BlcmEgMTUrIGFyZSBpZGVudGlmaWVkIGFzIG9wclxuaWYgKCBicm93c2VyLm9wciApXG57XG4gIHZhciBvcGVyYSA9IFwib3BlcmFcIjtcblxuICBtYXRjaGVkLmJyb3dzZXIgPSBvcGVyYTtcbiAgYnJvd3NlcltvcGVyYV0gPSB0cnVlO1xufVxuXG4vLyBTdG9jayBBbmRyb2lkIGJyb3dzZXJzIGFyZSBtYXJrZWQgYXMgU2FmYXJpIG9uIEFuZHJvaWQuXG5pZiAoIGJyb3dzZXIuc2FmYXJpICYmIGJyb3dzZXIuYW5kcm9pZCApXG57XG4gIHZhciBhbmRyb2lkID0gXCJhbmRyb2lkXCI7XG5cbiAgbWF0Y2hlZC5icm93c2VyID0gYW5kcm9pZDtcbiAgYnJvd3NlclthbmRyb2lkXSA9IHRydWU7XG59XG5cbi8vIEFzc2lnbiB0aGUgbmFtZSBhbmQgcGxhdGZvcm0gdmFyaWFibGVcbmJyb3dzZXIubmFtZSA9IG1hdGNoZWQuYnJvd3NlcjtcbmJyb3dzZXIucGxhdGZvcm0gPSBtYXRjaGVkLnBsYXRmb3JtO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gYnJvd3NlcjtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qKiBAcHJlc2VydmUgaHR0cDovL2dpdGh1Yi5jb20vZWFzZXdheS9qcy1jbGFzcyAqL1xuXG4vLyBDbGFzcyBEZWZpbml0aW9uIHVzaW5nIEVDTUE1IHByb3RvdHlwZSBjaGFpblxuXG5mdW5jdGlvbiBpbmhlcml0KGRlc3QsIHNyYywgbm9QYXJlbnQpIHtcbiAgICB3aGlsZSAoc3JjICYmIHNyYyAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzcmMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChuYW1lICE9ICcuY2xhc3MnICYmICFkZXN0Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNyYywgbmFtZSk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIG5hbWUsIGRlc2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5vUGFyZW50KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzcmMgPSBzcmMuX19wcm90b19fO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbn1cblxudmFyIENsYXNzID0gZnVuY3Rpb24gKGJhc2UsIHByb3RvLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZihiYXNlKSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9wdGlvbnMgPSBwcm90bztcbiAgICAgICAgcHJvdG8gPSBiYXNlO1xuICAgICAgICBiYXNlID0gT2JqZWN0O1xuICAgIH1cbiAgICBpZiAoIXByb3RvKSB7XG4gICAgICAgIHByb3RvID0ge307XG4gICAgfVxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIFxuICAgIHZhciBtZXRhID0ge1xuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIGJhc2U6IGJhc2UsXG4gICAgICAgIGltcGxlbWVudHM6IFtdXG4gICAgfVxuICAgIHZhciBjbGFzc1Byb3RvID0gQ2xhc3MuY2xvbmUocHJvdG8pO1xuICAgIGlmIChvcHRpb25zLmltcGxlbWVudHMpIHtcbiAgICAgICAgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5pbXBsZW1lbnRzKSA/IG9wdGlvbnMuaW1wbGVtZW50cyA6IFtvcHRpb25zLmltcGxlbWVudHNdKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoaW1wbGVtZW50ZWRUeXBlKSA9PSAnZnVuY3Rpb24nICYmIGltcGxlbWVudGVkVHlwZS5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0YS5pbXBsZW1lbnRzLnB1c2goaW1wbGVtZW50ZWRUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgQ2xhc3MuZXh0ZW5kKGNsYXNzUHJvdG8sIGltcGxlbWVudGVkVHlwZS5wcm90b3R5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGFzc1Byb3RvLl9fcHJvdG9fXyA9IGJhc2UucHJvdG90eXBlO1xuICAgIHZhciB0aGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZih0aGlzLmNvbnN0cnVjdG9yKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIG1ldGEudHlwZSA9IHRoZUNsYXNzO1xuICAgIHRoZUNsYXNzLnByb3RvdHlwZSA9IGNsYXNzUHJvdG87XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoZUNsYXNzLCAnLmNsYXNzLm1ldGEnLCB7IHZhbHVlOiBtZXRhLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc1Byb3RvLCAnLmNsYXNzJywgeyB2YWx1ZTogdGhlQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UgfSk7XG4gICAgaWYgKG9wdGlvbnMuc3RhdGljcykge1xuICAgICAgICBDbGFzcy5leHRlbmQodGhlQ2xhc3MsIG9wdGlvbnMuc3RhdGljcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGVDbGFzcztcbn07XG5cbkNsYXNzLmV4dGVuZCA9IGluaGVyaXQ7XG5cbkNsYXNzLmNsb25lID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiBpbmhlcml0KHt9LCBvYmplY3QpO1xufTtcblxuZnVuY3Rpb24gZmluZFR5cGUobWV0YSwgdHlwZSkge1xuICAgIHdoaWxlIChtZXRhKSB7XG4gICAgICAgIGlmIChtZXRhLnR5cGUucHJvdG90eXBlID09PSB0eXBlLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSBpbiBtZXRhLmltcGxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBpbXBsVHlwZSA9IG1ldGEuaW1wbGVtZW50c1tpXTtcbiAgICAgICAgICAgIHZhciBpbXBsTWV0YSA9IGltcGxUeXBlWycuY2xhc3MubWV0YSddO1xuICAgICAgICAgICAgaWYgKGltcGxNZXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmRUeXBlKGltcGxNZXRhLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3RvID0gaW1wbFR5cGUucHJvdG90eXBlOyBwcm90bzsgcHJvdG8gPSBwcm90by5fX3Byb3RvX18pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3RvID09PSB0eXBlLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWV0YSA9IG1ldGEuYmFzZSA/IG1ldGEuYmFzZVsnLmNsYXNzLm1ldGEnXSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgQ2hlY2tlciA9IENsYXNzKHtcbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcbiAgICB9LFxuICAgIFxuICAgIHR5cGVPZjogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMub2JqZWN0IGluc3RhbmNlb2YgdHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1ldGEgPSBDbGFzcy50eXBlSW5mbyh0aGlzLm9iamVjdCk7XG4gICAgICAgIHJldHVybiBtZXRhICYmIGZpbmRUeXBlKG1ldGEsIHR5cGUpO1xuICAgIH1cbn0pO1xuXG4vLyBhbGlhc2VzXG5DaGVja2VyLnByb3RvdHlwZS5hID0gQ2hlY2tlci5wcm90b3R5cGUudHlwZU9mO1xuQ2hlY2tlci5wcm90b3R5cGUuYW4gPSBDaGVja2VyLnByb3RvdHlwZS50eXBlT2Y7XG5cbkNsYXNzLmlzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiBuZXcgQ2hlY2tlcihvYmplY3QpO1xufTtcblxuQ2xhc3MudHlwZUluZm8gPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIHRoZUNsYXNzID0gb2JqZWN0Ll9fcHJvdG9fX1snLmNsYXNzJ107XG4gICAgcmV0dXJuIHRoZUNsYXNzID8gdGhlQ2xhc3NbJy5jbGFzcy5tZXRhJ10gOiB1bmRlZmluZWQ7XG59O1xuXG5DbGFzcy5WRVJTSU9OID0gWzAsIDAsIDJdO1xuXG5pZiAobW9kdWxlKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDbGFzcztcbn0gZWxzZSB7XG4gICAgZ2xvYmFsLkNsYXNzID0gQ2xhc3M7ICAgLy8gZm9yIGJyb3dzZXJcbn1cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL2luZGV4XCIpO1xuIl19
