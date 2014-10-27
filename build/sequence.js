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
		"onSelectionChanged",
		
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
		"onSelectionChange",
		
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
		"onAnnotationClicked"
	],

  getId : function () {
    return this.opt.id;
  },

	// internal members
	_headerDiv : null,
	_contentDiv : null,
	
	// Methods

	_initialize: function () {
		
		if ( this.opt.width !== undefined ) {
			this._container.width( this.opt.width );
		}
		
		if ( this.opt.height !== undefined ) {
			this._container.height( this.opt.height );
		}
		
		// Disable text selection
		
		this._container.css({
			'-moz-user-select':'none',
			'-webkit-user-select':'none',
			'user-select':'none'
        });
		
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
        jQuery(row).insertAfter(jQuery(cellSelector, self.opt.target));
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
			
		if (jQuery.browser.msie) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL2xpYi9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9ub2RlX21vZHVsZXMvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL25vZGVfbW9kdWxlcy9iaW9qcy1ldmVudHMvbm9kZV9tb2R1bGVzL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanF1ZXJ5LWJyb3dzZXItcGx1Z2luL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanF1ZXJ5LWJyb3dzZXItcGx1Z2luL2pxdWVyeS5icm93c2VyLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanMtY2xhc3MvY2xhc3MuanMiLCIuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDLzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyUkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBsZWdhY3khIVxuJC5icm93c2VyID0gcmVxdWlyZShcImpxdWVyeS1icm93c2VyLXBsdWdpblwiKTtcblxuLyoqIFxuICogU2VxdWVuY2UgY29tcG9uZW50IFxuICogXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEJpb2pzXG4gKiBcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpqb2huY2FyQGdtYWlsLmNvbVwiPkpvaG4gR29tZXo8L2E+LCA8YSBocmVmPVwibWFpbHRvOnNlY2V2YWxsaXZAZ21haWwuY29tXCI+Sm9zZSBWaWxsYXZlY2VzPC9hPlxuICogQHZlcnNpb24gMS4wLjBcbiAqIEBjYXRlZ29yeSAzXG4gKiBcbiAqIEByZXF1aXJlcyA8YSBocmVmPSdodHRwOi8vYmxvZy5qcXVlcnkuY29tLzIwMTEvMDkvMTIvanF1ZXJ5LTEtNi00LXJlbGVhc2VkLyc+alF1ZXJ5IENvcmUgMS42LjQ8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCIuLi9iaW9qcy9kZXBlbmRlbmNpZXMvanF1ZXJ5L2pxdWVyeS0xLjQuMi5taW4uanNcIj48L3NjcmlwdD5cbiAqIFxuICogQHJlcXVpcmVzIDxhIGhyZWY9J2h0dHA6Ly9qcXVlcnl1aS5jb20vZG93bmxvYWQnPmpRdWVyeSBVSSAxLjguMTY8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCIuLi9iaW9qcy9kZXBlbmRlbmNpZXMvanF1ZXJ5L2pxdWVyeS11aS0xLjguMi5jdXN0b20ubWluLmpzXCI+PC9zY3JpcHQ+XG4gKlxuICogQHJlcXVpcmVzIDxhIGhyZWY9J0Jpb2pzLlRvb2x0aXAuY3NzJz5CaW9qcy5Ub29sdGlwPC9hPlxuICogQGRlcGVuZGVuY3kgPHNjcmlwdCBsYW5ndWFnZT1cIkphdmFTY3JpcHRcIiB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwic3JjL0Jpb2pzLlRvb2x0aXAuanNcIj48L3NjcmlwdD5cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQW4gb2JqZWN0IHdpdGggdGhlIG9wdGlvbnMgZm9yIFNlcXVlbmNlIGNvbXBvbmVudC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSB0YXJnZXQgXG4gKiAgICBJZGVudGlmaWVyIG9mIHRoZSBESVYgdGFnIHdoZXJlIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc3BsYXllZC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSBzZXF1ZW5jZSBcbiAqICAgIFRoZSBzZXF1ZW5jZSB0byBiZSBkaXNwbGF5ZWQuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gW2lkXSBcbiAqICAgIFNlcXVlbmNlIGlkZW50aWZpZXIgaWYgYXBwbHkuXG4gKiAgICBcbiAqIEBvcHRpb24ge3N0cmluZ30gW2Zvcm1hdD1cIkZBU1RBXCJdIFxuICogICAgVGhlIGRpc3BsYXkgZm9ybWF0IGZvciB0aGUgc2VxdWVuY2UgcmVwcmVzZW50YXRpb24uXG4gKiAgICBcbiAqIEBvcHRpb24ge09iamVjdFtdfSBbaGlnaGxpZ2h0c10gXG4gKiBcdCAgRm9yIGhpZ2hsaWdodGluZyBtdWx0aXBsZSByZWdpb25zLiBcbiAqICAgIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIlN5bnRheDpcIj4gXG4gKiAgICBbXG4gKiAgICBcdC8vIEhpZ2hsaWdodCBhbWlub2FjaWRzIGZyb20gJ3N0YXJ0JyB0byAnZW5kJyBvZiB0aGUgY3VycmVudCBzdHJhbmQgdXNpbmcgdGhlIHNwZWNpZmllZCAnY29sb3InIChvcHRpb25hbCkgYW5kICdiYWNrZ3JvdW5kJyAob3B0aW9uYWwpLlxuICogICAgXHR7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDsgWywgaWQ6Jmx0O2lkVmFsMSZndDtdIFssIGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O10gWywgYmFja2dyb3VuZDogJmx0O0hUTUxDb2xvciZndDtdfSwgXG4gKiAgICBcdC8vXG4gKiAgICBcdC8vIEFueSBvdGhlcnMgaGlnaGxpZ2h0c1xuICogICAgXHQuLi4sICBcbiAqICAgIFx0Ly8gXG4gKiAgICBcdHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0OyBbLCBpZDombHQ7aWRWYWxOJmd0O10gWywgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7XSBbLCBiYWNrZ3JvdW5kOiAmbHQ7SFRNTENvbG9yJmd0O119XG4gKiAgICBdPC9wcmU+XG4gKiBcbiAqIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIkV4YW1wbGU6XCI+IFxuICogaGlnaGxpZ2h0cyA6IFtcbiAqIFx0XHR7IHN0YXJ0OjMwLCBlbmQ6NDIsIGNvbG9yOlwid2hpdGVcIiwgYmFja2dyb3VuZDpcImdyZWVuXCIsIGlkOlwic3BpbjFcIiB9LFxuICpcdFx0eyBzdGFydDoxMzksIGVuZDoxNDAgfSwgXG4gKlx0XHR7IHN0YXJ0OjYzMSwgZW5kOjYzMywgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiYmx1ZVwiIH1cbiAqXHRdXG4gKiA8L3ByZT5cbiAqIFxuICogQG9wdGlvbiB7T2JqZWN0fSBbY29sdW1ucz17c2l6ZTo0MCxzcGFjZWRFYWNoOjEwfV0gXG4gKiBcdCAgT3B0aW9ucyBmb3IgZGlzcGxheWluZyB0aGUgY29sdW1ucy4gU3ludGF4OiB7IHNpemU6ICZsdDtudW1Db2xzJmd0Oywgc3BhY2VkRWFjaDogJmx0O251bUNvbHMmZ3Q7fVxuICogXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtzZWxlY3Rpb25dIFxuICogXHQgIFBvc2l0aW9ucyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmVnaW9uLiBTeW50YXg6IHsgc3RhcnQ6ICZsdDtzdGFydFZhbHVlJmd0OywgZW5kOiAmbHQ7ZW5kVmFsdWUmZ3Q7fVxuICogXG4gKiBAb3B0aW9uIHtPYmplY3RbXX0gW2Fubm90YXRpb25zXSBcbiAqICAgIFNldCBvZiBvdmVybGFwcGluZyBhbm5vdGF0aW9ucy4gTXVzdCBiZSBhbiBhcnJheSBvZiBvYmplY3RzIGZvbGxvd2luZyB0aGUgc3ludGF4OlxuICogICAgIFx0XHQ8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJTeW50YXg6XCI+XG4gKiAgICAgICAgICAgIFsgXG4gKiAgICAgICAgICAgICAgLy8gQW4gYW5ub3RhdGlvbjpcbiAqICAgICAgICAgICAgICB7IG5hbWU6ICZsdDtuYW1lJmd0OywgXG4gKiAgICAgICAgICAgICAgICBodG1sOiAmbHQ7bWVzc2FnZSZndDssIFxuICogICAgICAgICAgICAgICAgY29sb3I6ICZsdDtjb2xvcl9jb2RlJmd0OywgXG4gKiAgICAgICAgICAgICAgICByZWdpb25zOiBbeyBzdGFydDogJmx0O3N0YXJ0VmFsMSZndDssIGVuZDogJmx0O2VuZFZhbDEmZ3Q7IGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O30sIC4uLix7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDssIGNvbG9yOiAmbHQ7SFRNTENvbG9yJmd0O31dIFxuICogICAgICAgICAgICAgIH0sIFxuICogICAgICAgICAgICAgIFxuICogICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICAgIC8vIG1vcmUgYW5ub3RhdGlvbnMgaGVyZSBcbiAqICAgICAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgICAgXVxuICogICAgXHRcdCA8L3ByZT5cbiAqICAgIHdoZXJlOlxuICogICAgICA8dWw+XG4gKiAgICAgICAgPGxpPjxiPm5hbWU8L2I+IGlzIHRoZSB1bmlxdWUgbmFtZSBmb3IgdGhlIGFubm90YXRpb248L2xpPlxuICogICAgICAgIDxsaT48Yj5odG1sPC9iPiBpcyB0aGUgbWVzc2FnZSAoY2FuIGJlIEhUTUwpIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdG9vbCB0aXAuPC9saT5cbiAqICAgICAgICA8bGk+PGI+Y29sb3I8L2I+IGlzIHRoZSBkZWZhdWx0IEhUTUwgY29sb3IgY29kZSBmb3IgYWxsIHRoZSByZWdpb25zLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnM8L2I+IGFycmF5IG9mIG9iamVjdHMgZGVmaW5pbmcgdGhlIGludGVydmFscyB3aGljaCBiZWxvbmdzIHRvIHRoZSBhbm5vdGF0aW9uLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnNbaV0uc3RhcnQ8L2I+IGlzIHRoZSBzdGFydGluZyBjaGFyYWN0ZXIgZm9yIHRoZSBpLXRoIGludGVydmFsLjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPnJlZ2lvbnNbaV0uZW5kPC9iPiBpcyB0aGUgZW5kaW5nIGNoYXJhY3RlciBmb3IgdGhlIGktdGggaW50ZXJ2YWwuPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uc1tpXS5jb2xvcjwvYj4gaXMgYW4gb3B0aW9uYWwgY29sb3IgZm9yIHRoZSBpLXRoIGludGVydmFsLiAgIFxuICogICAgICA8L3VsPiBcbiAqICAgICAgXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtmb3JtYXRPcHRpb25zPXt0aXRsZTp0cnVlLCBmb290ZXI6dHJ1ZX1dIFxuICogXHQgIE9wdGlvbnMgZm9yIGRpc3BsYXlpbmcgdGhlIHRpdGxlLiBieSBub3cganVzdCBhZmZlY3RpbmcgdGhlIENPREFUQSBmb3JtYXQuXG4gKiAgICA8cHJlIGNsYXNzPVwiYnJ1c2g6IGpzXCIgdGl0bGU9XCJTeW50YXg6XCI+IFxuICogXHRcdGZvcm1hdE9wdGlvbnMgOiB7XG4gKiBcdFx0XHR0aXRsZTpmYWxzZSxcbiAqIFx0XHRcdGZvb3RlcjpmYWxzZVxuICogXHRcdH1cbiAqICAgIDwvcHJlPlxuICogICAgXG4gKiBAZXhhbXBsZSBcbiAqIHZhciB0aGVTZXF1ZW5jZSA9IFwiTUVUTENRUkxOVkNRREtJTFRIWUVORFNURExSREhJRFlXS0hNUkxFQ0FJWVlLQVJFTUdGS0hJTkhRVlZQVExBVlNLTktBTFFBSUVMUUxUTEVUSVlOU1FZU05FS1dUTFFEVlNMRVZZTFRBUFRHQ0lLS0hHWVRWRVZRRkRHRElDTlRNSFlUTldUSElZSUNFRUFvanMgU1ZUVlZFR1FWRFlZR0xZWVZIRUdJUlRZRlZRRktEREFFS1lTS05LVldFVkhBR0dRVklMQ1BUU1ZGU1NORVZTU1BFSUlSUUhMQU5IUEFBVEhUS0FWQUxHVEVFVFFUVElRUlBSU0VQRFRHTlBDSFRUS0xMSFJEU1ZEU0FQSUxUQUZOU1NIS0dSSU5DTlNOVFRQSVZITEtHREFOVExLQ0xSWVJGS0tIQ1RMWVRBVlNTVFdIV1RHSE5WS0hLU0FJVlRMVFlEU0VXUVJEUUZMU1FWS0lQS1RJVFZTVEdGTVNJXCI7XG4gKiB2YXIgbXlTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZSh7XG4gKiBcdFx0c2VxdWVuY2UgOiB0aGVTZXF1ZW5jZSxcbiAqIFx0XHR0YXJnZXQgOiBcIllvdXJPd25EaXZJZFwiLFxuICogXHRcdGZvcm1hdCA6ICdDT0RBVEEnLFxuICogXHRcdGlkIDogJ1A5MTgyODMnLFxuICogXHRcdGFubm90YXRpb25zOiBbXG4gKiAgICAgICAgeyBuYW1lOlwiQ0FUSFwiLCBcbiAqIFx0ICBcdFx0Y29sb3I6XCIjRjBGMDIwXCIsIFxuICogXHQgIFx0XHRodG1sOiBcIlVzaW5nIGNvbG9yIGNvZGUgI0YwRjAyMCBcIiwgXG4gKiBcdCAgXHRcdHJlZ2lvbnM6IFt7c3RhcnQ6IDEyMiwgZW5kOiAxMzV9XVxuICogXHRcdCAgfSxcbiAqICAgICAgICB7IG5hbWU6XCJURVNUXCIsIFxuICogICAgICAgICAgaHRtbDpcIiZsdDticiZndDsgRXhhbXBsZSBvZiAmbHQ7YiZndDtIVE1MJmx0Oy9iJmd0O1wiLCBcbiAqICAgICAgICAgIGNvbG9yOlwiZ3JlZW5cIiwgXG4gKiAgICAgICAgICByZWdpb25zOiBbXG4gKiAgICAgICAgICAgIHtzdGFydDogMjg1LCBlbmQ6IDI5Mn0sXG4gKiAgICAgICAgICAgIHtzdGFydDogMjkzLCBlbmQ6IDMxNCwgY29sb3I6IFwiIzJFNDk4OFwifV1cbiAqICAgICAgICB9XG4gKiAgICAgIF0sXG4gKiAgICAgIGhpZ2hsaWdodHMgOiBbXG4gKiAgICAgIFx0eyBzdGFydDozMCwgZW5kOjQyLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJncmVlblwiLCBpZDpcInNwaW4xXCIgfSxcbiAqICAgICAgXHR7IHN0YXJ0OjEzOSwgZW5kOjE0MCB9LCBcbiAqICAgICAgXHR7IHN0YXJ0OjYzMSwgZW5kOjYzMywgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiYmx1ZVwiIH1cbiAqICAgICAgXVxuICogfSk7XHRcbiAqIFxuICovXG5cbnZhciBDbGFzcyA9IHJlcXVpcmUoJ2pzLWNsYXNzJyk7XG5cbnZhciBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSA9IFwic2VsZWN0aW9uLWNoYW5nZVwiO1xudmFyIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFRCA9IFwic2VsZWN0aW9uLWNoYW5nZWRcIjtcbnZhciBFVlRfT05fQU5OT1RBVElPTl9DTElDS0VEID0gXCJhbm5vdGF0aW9uLWNsaWNrZWRcIjtcblxuU2VxdWVuY2UgPSBDbGFzcyhcbi8qKiBAbGVuZHMgU2VxdWVuY2UjICovXG57XHRcblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5vcHQgPSBqUXVlcnkuZXh0ZW5kKHRoaXMub3B0LG9wdGlvbnMpO1xuXG5cdFx0dGhpcy5fY29udGFpbmVyID0galF1ZXJ5KHRoaXMub3B0LnRhcmdldCk7XG5cdFx0XG5cdFx0Ly8gTGF6eSBpbml0aWFsaXphdGlvbiBcblx0XHR0aGlzLl9jb250YWluZXIucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLl9pbml0aWFsaXplKCk7XG5cdFx0fSk7XG5cdH0sXG5cdFxuXHQvKipcblx0ICogRGVmYXVsdCB2YWx1ZXMgZm9yIHRoZSBvcHRpb25zXG5cdCAqIEBuYW1lIFNlcXVlbmNlLW9wdFxuXHQgKi9cblx0b3B0IDoge1xuXHRcdFxuXHRcdHNlcXVlbmNlIDogXCJcIixcblx0XHRpZCA6IFwiXCIsXG5cdFx0dGFyZ2V0IDogXCJcIixcblx0XHRmb3JtYXQgOiBcIkZBU1RBXCIsXG5cdFx0c2VsZWN0aW9uOiB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSxcblx0XHRjb2x1bW5zOiB7IHNpemU6IDM1LCBzcGFjZWRFYWNoOiAxMCB9LFxuXHRcdGhpZ2hsaWdodHMgOiBbXSxcblx0XHRhbm5vdGF0aW9uczogW10sXG5cdFx0c2VxdWVuY2VVcmw6ICdodHRwOi8vd3d3LmViaS5hYy51ay9kYXMtc3J2L3VuaXByb3QvZGFzL3VuaXByb3Qvc2VxdWVuY2UnLFxuXHRcdFxuXHRcdC8vIFN0eWxlcyBcblx0XHRzZWxlY3Rpb25Db2xvciA6ICdZZWxsb3cnLFxuXHRcdHNlbGVjdGlvbkZvbnRDb2xvciA6ICdibGFjaycsXG5cdFx0aGlnaGxpZ2h0Rm9udENvbG9yIDogJ3JlZCcsXG5cdFx0aGlnaGxpZ2h0QmFja2dyb3VuZENvbG9yIDogJ3doaXRlJyxcblx0XHRmb250RmFtaWx5OiAnXCJBbmRhbGUgbW9ub1wiLCBjb3VyaWVyLCBtb25vc3BhY2UnLFxuXHRcdGZvbnRTaXplOiAnMTJweCcsXG5cdFx0Zm9udENvbG9yIDogJ2luaGVyaXQnLFxuXHRcdGJhY2tncm91bmRDb2xvciA6ICdpbmhlcml0Jyxcblx0XHR3aWR0aDogdW5kZWZpbmVkLFxuXHRcdGhlaWdodDogdW5kZWZpbmVkLFxuXHRcdGZvcm1hdFNlbGVjdG9yVmlzaWJsZTogdHJ1ZVxuXHR9LFxuXHRcblx0LyoqXG5cdCAqIEFycmF5IGNvbnRhaW5pbmcgdGhlIHN1cHBvcnRlZCBldmVudCBuYW1lc1xuXHQgKiBAbmFtZSBTZXF1ZW5jZS1ldmVudFR5cGVzXG5cdCAqL1xuXHRldmVudFR5cGVzIDogW1xuXHRcdC8qKlxuXHRcdCAqIEBuYW1lIFNlcXVlbmNlI29uU2VsZWN0aW9uQ2hhbmdlZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuXHRcdCAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7aW50fSBzdGFydCBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBzdGFydCBvZiB0aGUgc2VsZWN0aW9uLlxuXHRcdCAqIEBldmVudERhdGEge2ludH0gZW5kIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIGVuZGluZyBvZiBzZWxlY3Rpb24uXG5cdFx0ICogQGV4YW1wbGUgXG5cdFx0ICogbXlTZXF1ZW5jZS5vblNlbGVjdGlvbkNoYW5nZWQoXG5cdFx0ICogICAgZnVuY3Rpb24oIG9iakV2ZW50ICkge1xuXHRcdCAqICAgICAgIGFsZXJ0KFwiU2VsZWN0ZWQ6IFwiICsgb2JqRXZlbnQuc3RhcnQgKyBcIiwgXCIgKyBvYmpFdmVudC5lbmQgKTtcblx0XHQgKiAgICB9XG5cdFx0ICogKTsgXG5cdFx0ICogXG5cdFx0ICogKi9cblx0XHRcIm9uU2VsZWN0aW9uQ2hhbmdlZFwiLFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lIFNlcXVlbmNlI29uU2VsZWN0aW9uQ2hhbmdlXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uUGVyZm9ybWVkIEFuIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGFuIHtAbGluayBCaW9qcy5FdmVudH0gb2JqZWN0IGFzIGFyZ3VtZW50LlxuXHRcdCAqIEBldmVudERhdGEge09iamVjdH0gc291cmNlIFRoZSBjb21wb25lbnQgd2hpY2ggZGlkIHRyaWdnZXJlZCB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7c3RyaW5nfSB0eXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtpbnR9IHN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24uXG5cdFx0ICogQGV2ZW50RGF0YSB7aW50fSBlbmQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgZW5kaW5nIG9mIHNlbGVjdGlvbi5cblx0XHQgKiBAZXhhbXBsZSBcblx0XHQgKiBteVNlcXVlbmNlLm9uU2VsZWN0aW9uQ2hhbmdlKFxuXHRcdCAqICAgIGZ1bmN0aW9uKCBvYmpFdmVudCApIHtcblx0XHQgKiAgICAgICBhbGVydChcIlNlbGVjdGlvbiBpbiBwcm9ncmVzczogXCIgKyBvYmpFdmVudC5zdGFydCArIFwiLCBcIiArIG9iakV2ZW50LmVuZCApO1xuXHRcdCAqICAgIH1cblx0XHQgKiApOyAgXG5cdFx0ICogXG5cdFx0ICogXG5cdFx0ICogKi9cblx0XHRcIm9uU2VsZWN0aW9uQ2hhbmdlXCIsXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogQG5hbWUgU2VxdWVuY2Ujb25Bbm5vdGF0aW9uQ2xpY2tlZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuXHRcdCAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZWxlY3RlZCBhbm5vdGF0aW9uLlxuXHRcdCAqIEBldmVudERhdGEge2ludH0gcG9zIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBzZWxlY3RlZCBhbWlubyBhY2lkLlxuXHRcdCAqIEBleGFtcGxlIFxuXHRcdCAqIG15U2VxdWVuY2Uub25Bbm5vdGF0aW9uQ2xpY2tlZChcblx0XHQgKiAgICBmdW5jdGlvbiggb2JqRXZlbnQgKSB7XG5cdFx0ICogICAgICAgYWxlcnQoXCJDbGlja2VkIFwiICsgb2JqRXZlbnQubmFtZSArIFwiIG9uIHBvc2l0aW9uIFwiICsgb2JqRXZlbnQucG9zICk7XG5cdFx0ICogICAgfVxuXHRcdCAqICk7ICBcblx0XHQgKiBcblx0XHQgKiAqL1xuXHRcdFwib25Bbm5vdGF0aW9uQ2xpY2tlZFwiXG5cdF0sXG5cbiAgZ2V0SWQgOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0LmlkO1xuICB9LFxuXG5cdC8vIGludGVybmFsIG1lbWJlcnNcblx0X2hlYWRlckRpdiA6IG51bGwsXG5cdF9jb250ZW50RGl2IDogbnVsbCxcblx0XG5cdC8vIE1ldGhvZHNcblxuXHRfaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuXHRcdFxuXHRcdGlmICggdGhpcy5vcHQud2lkdGggIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lci53aWR0aCggdGhpcy5vcHQud2lkdGggKTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKCB0aGlzLm9wdC5oZWlnaHQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5oZWlnaHQoIHRoaXMub3B0LmhlaWdodCApO1xuXHRcdH1cblx0XHRcblx0XHQvLyBEaXNhYmxlIHRleHQgc2VsZWN0aW9uXG5cdFx0XG5cdFx0dGhpcy5fY29udGFpbmVyLmNzcyh7XG5cdFx0XHQnLW1vei11c2VyLXNlbGVjdCc6J25vbmUnLFxuXHRcdFx0Jy13ZWJraXQtdXNlci1zZWxlY3QnOidub25lJyxcblx0XHRcdCd1c2VyLXNlbGVjdCc6J25vbmUnXG4gICAgICAgIH0pO1xuXHRcdFxuXHRcdC8vIERJViBmb3IgdGhlIGZvcm1hdCBzZWxlY3RvclxuXHRcdHRoaXMuX2J1aWxkRm9ybWF0U2VsZWN0b3IoKTtcblx0XHRcblx0XHQvLyBESVYgZm9yIHRoZSBzZXF1ZW5jZVxuXHRcdHRoaXMuX2NvbnRlbnREaXYgPSBqUXVlcnkoJzxkaXY+PC9kaXY+JykuYXBwZW5kVG8odGhpcy5fY29udGFpbmVyKTtcblx0XHR0aGlzLl9jb250ZW50RGl2LmNzcyh7XG5cdFx0XHRcdCdmb250LWZhbWlseSc6IHRoaXMub3B0LmZvbnRGYW1pbHksXG5cdFx0XHRcdCdmb250LXNpemUnOiB0aGlzLm9wdC5mb250U2l6ZSxcblx0XHRcdFx0J3RleHQtYWxpZ24nOiAnbGVmdCdcblx0XHRcdH0pO1xuXHRcdFxuXHRcdC8vIEluaXRpYWxpemUgaGlnaGxpZ2h0aW5nIFxuXHRcdHRoaXMuX2hpZ2hsaWdodHMgPSB0aGlzLm9wdC5oaWdobGlnaHRzO1xuXHRcdFxuXHRcdC8vIEluaXRpYWxpemUgYW5ub3RhdGlvbnNcblx0XHR0aGlzLl9hbm5vdGF0aW9ucyA9IHRoaXMub3B0LmFubm90YXRpb25zO1xuXHRcdFxuXHRcdC8vSW5pdGlhbGl6ZSB0b29sdGlwXG5cdFx0alF1ZXJ5KCc8ZGl2IGlkPVwic2VxdWVuY2VUaXAnICsgdGhpcy5vcHQudGFyZ2V0LmlkICsgJ1wiPjwvZGl2PicpIFxuXHQgICAgICAgIC5jc3Moe1x0XG5cdCAgICAgICAgXHQncG9zaXRpb24nOiBcImFic29sdXRlXCIsXG5cdCAgICAgICAgXHQnei1pbmRleCc6IFwiOTk5OTk5XCIsXG5cdCAgICAgICAgXHQnY29sb3InOiBcIiNmZmZcIixcblx0ICAgICAgICBcdCdmb250LXNpemUnOiBcIjEycHhcIixcblx0ICAgICAgICBcdCd3aWR0aCc6IFwiYXV0b1wiLFxuXHQgICAgICAgIFx0J2Rpc3BsYXknOiAnbm9uZSdcblx0ICAgICAgICB9KVxuXHQgICAgICAgIC5hZGRDbGFzcyhcInRvb2x0aXBcIilcblx0ICAgICAgICAuYXBwZW5kVG8oXCJib2R5XCIpXG5cdCAgICAgICAgLmhpZGUoKTtcblxuXHRcdGlmICggKHRoaXMub3B0LnNlcXVlbmNlKSApIHtcblx0XHRcdHRoaXMuX3JlZHJhdygpO1xuXHRcdFx0XG5cdFx0fSBlbHNlIGlmICggICh0aGlzLm9wdC5pZCkgKSB7XG5cdFx0XHR0aGlzLl9yZXF1ZXN0U2VxdWVuY2UoIHRoaXMub3B0LmlkICk7XG5cdFx0XHRcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jbGVhclNlcXVlbmNlKFwiTm8gc2VxdWVuY2UgYXZhaWxhYmxlXCIsIFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCIpO1xuXHRcdH1cblx0XHRcblx0fSxcblx0XG5cdFxuXHQvKipcblx0ICogU2hvd3MgdGhlIGNvbHVtbnMgaW5kaWNhdGVkIGJ5IHRoZSBpbmRleGVzIGFycmF5LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2VxIFRoZSBzZXF1ZW5jZSBzdHJhbmQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbaWRlbnRpZmllcl0gU2VxdWVuY2UgaWRlbnRpZmllci5cblx0ICogXG5cdCAqIEBleGFtcGxlIFxuXHQgKiBteVNlcXVlbmNlLnNldFNlcXVlbmNlKFwiUDk5OTk5XCIpO1xuXHQgKiBcblx0ICovXG4gICAgc2V0U2VxdWVuY2U6IGZ1bmN0aW9uICggc2VxLCBpZGVudGlmaWVyICkge1xuXG4gICAgXHRpZiAoIHNlcS5tYXRjaCgvXihbQS1OLFItWl1bMC05XVtBLVpdW0EtWiwgMC05XVtBLVosIDAtOV1bMC05XSl8KFtPLFAsUV1bMC05XVtBLVosIDAtOV1bQS1aLCAwLTldW0EtWiwgMC05XVswLTldKShcXC5cXGQrKT8kL2kpICkge1xuICAgIFx0XHR0aGlzLl9yZXF1ZXN0U2VxdWVuY2UoIGFyZ3VtZW50c1swXSApO1xuICAgIFx0XHRcbiAgICBcdH0gZWxzZSB7XG4gICAgXHRcdHRoaXMub3B0LnNlcXVlbmNlID0gc2VxO1xuICAgICAgICBcdHRoaXMub3B0LmlkID0gaWRlbnRpZmllcjsgXG4gICAgICAgIFx0dGhpcy5faGlnaGxpZ2h0cyA9IFtdO1xuICAgIFx0XHR0aGlzLl9oaWdobGlnaHRzQ291bnQgPSAwO1xuICAgIFx0XHR0aGlzLm9wdC5zZWxlY3Rpb24gPSB7IHN0YXJ0OiAwLCBlbmQ6IDAgfTtcbiAgICBcdFx0dGhpcy5fYW5ub3RhdGlvbnMgPSBbXTtcbiAgICBcdFx0XG4gICAgXHRcdHRoaXMuX2NvbnRlbnREaXYuY2hpbGRyZW4oKS5yZW1vdmUoKTtcbiAgICBcdFx0dGhpcy5fcmVkcmF3KCk7XG4gICAgXHR9XG4gICAgfSxcbiAgICBcbiAgICBfcmVxdWVzdFNlcXVlbmNlOiBmdW5jdGlvbiAoIGFjY2Vzc2lvbiApIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG4gICAgXHRcbiAgICBcdGNvbnNvbGUubG9nKFwiUmVxdWVzdGluZyBzZXF1ZW5jZSBmb3I6IFwiICsgYWNjZXNzaW9uICk7XG5cblx0XHRqUXVlcnkuYWpheCh7IFxuXHRcdFx0dXJsOiBzZWxmLm9wdC5zZXF1ZW5jZVVybCxcblx0XHRcdGRhdGFUeXBlOiBcInhtbFwiLFxuXHRcdFx0ZGF0YTogeyBzZWdtZW50OiBhY2Nlc3Npb24gfSxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICggeG1sICApIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgc2VxdWVuY2VOb2RlID0galF1ZXJ5KHhtbCkuZmluZCgnU0VRVUVOQ0U6Zmlyc3QnKTtcblx0XHRcdFx0XHRzZWxmLnNldFNlcXVlbmNlKCBzZXF1ZW5jZU5vZGUudGV4dCgpLCBzZXF1ZW5jZU5vZGUuYXR0cihcImlkXCIpLCBzZXF1ZW5jZU5vZGUuYXR0cihcImxhYmVsXCIpICk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGRlY29kaW5nIHJlc3BvbnNlIGRhdGE6IFwiICsgZS5tZXNzYWdlICk7XG5cdFx0XHRcdFx0c2VsZi5jbGVhclNlcXVlbmNlKFwiTm8gc2VxdWVuY2UgYXZhaWxhYmxlXCIsIFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGRlY29kaW5nIHJlc3BvbnNlIGRhdGE6IFwiICsgdGV4dFN0YXR1cyApO1xuXHRcdFx0XHRzZWxmLmNsZWFyU2VxdWVuY2UoXCJFcnJvciByZXF1ZXN0aW5nIHRoZSBzZXF1ZW5jZSB0byB0aGUgc2VydmVyIFwiICsgdGhpcy51cmwgLCBcIi4uL2Jpb2pzL2Nzcy9pbWFnZXMvd2FybmluZ19pY29uLnBuZ1wiKTtcblx0XHRcdH1cblx0XHR9KTtcbiAgICB9LFxuXHRcbiAgICAvKipcblx0ICogU2hvd3MgdGhlIGNvbHVtbnMgaW5kaWNhdGVkIGJ5IHRoZSBpbmRleGVzIGFycmF5LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW3Nob3dNZXNzYWdlXSBNZXNzYWdlIHRvIGJlIHNob3dlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IFtpY29uXSBJY29uIHRvIGJlIHNob3dlZCBhIHNpZGUgb2YgdGhlIG1lc3NhZ2Vcblx0ICogXG5cdCAqIEBleGFtcGxlIFxuXHQgKiBteVNlcXVlbmNlLmNsZWFyU2VxdWVuY2UoXCJObyBzZXF1ZW5jZSBhdmFpbGFibGVcIiwgXCIuLi9iaW9qcy9jc3MvaW1hZ2VzL3dhcm5pbmdfaWNvbi5wbmdcIik7XG5cdCAqIFxuXHQgKi9cbiAgICBjbGVhclNlcXVlbmNlOiBmdW5jdGlvbiAoIHNob3dNZXNzYWdlLCBpY29uICkge1xuICAgIFx0XG4gICAgXHR2YXIgbWVzc2FnZTtcbiAgICBcdFx0XG4gICAgXHR0aGlzLm9wdC5zZXF1ZW5jZSA9IFwiXCI7XG4gICAgXHR0aGlzLm9wdC5pZCA9IFwiXCI7IFxuICAgIFx0dGhpcy5faGlnaGxpZ2h0cyA9IFtdO1xuXHRcdHRoaXMuX2hpZ2hsaWdodHNDb3VudCA9IDA7XG5cdFx0dGhpcy5vcHQuc2VsZWN0aW9uID0geyBzdGFydDogMCwgZW5kOiAwIH07XG5cdFx0dGhpcy5fYW5ub3RhdGlvbnMgPSBbXTtcblx0XHR0aGlzLl9jb250ZW50RGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG5cdFx0XG5cdFx0dGhpcy5faGVhZGVyRGl2LmhpZGUoKTtcblx0XHRcblx0XHRpZiAoIHVuZGVmaW5lZCAhPT0gc2hvd01lc3NhZ2UgKSB7XG5cdFx0XHRtZXNzYWdlID0galF1ZXJ5KCc8ZGl2PicgKyBzaG93TWVzc2FnZSArICc8L2Rpdj4nKVxuXHRcdFx0XHQuYXBwZW5kVG8odGhpcy5fY29udGVudERpdilcblx0XHRcdFx0LmFkZENsYXNzKFwibWVzc2FnZVwiKTtcblx0XHRcdFxuXHRcdFx0aWYgKCB1bmRlZmluZWQgIT09IGljb24gKSB7XG5cdFx0XHRcdG1lc3NhZ2UuY3NzKHtcblx0XHRcdFx0XHQnYmFja2dyb3VuZCc6ICd0cmFuc3BhcmVudCB1cmwoXCInICsgaWNvbiArICdcIikgbm8tcmVwZWF0IGNlbnRlciBsZWZ0Jyxcblx0XHRcdFx0XHQncGFkZGluZy1sZWZ0JzogJzIwcHgnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cbiAgICB9LFxuXHRcblx0LyoqXG4gICAgKiBTZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGluIHRoZSBzZXF1ZW5jZSBjYXVzaW5nIHRoZSBldmVudCB7QGxpbmsgU2VxdWVuY2Ujb25TZWxlY3Rpb25DaGFuZ2VkfVxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBzZXQgc2VsZWN0aW9uIGZyb20gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAgXG4gICAgKiBteVNlcXVlbmNlLnNldFNlbGVjdGlvbigxMDAsIDE1MCk7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBzdGFydCBUaGUgc3RhcnRpbmcgY2hhcmFjdGVyIG9mIHRoZSBzZWxlY3Rpb24uXG4gICAgKiBAcGFyYW0ge2ludH0gZW5kIFRoZSBlbmRpbmcgY2hhcmFjdGVyIG9mIHRoZSBzZWxlY3Rpb25cbiAgICAqL1xuXHRzZXRTZWxlY3Rpb24gOiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG5cdFx0aWYoc3RhcnQgPiBlbmQpIHtcblx0XHRcdHZhciBhdXggPSBlbmQ7XG5cdFx0XHRlbmQgPSBzdGFydDtcblx0XHRcdHN0YXJ0ID0gYXV4O1xuXG5cdFx0fVxuXG5cdFx0aWYoc3RhcnQgIT0gdGhpcy5vcHQuc2VsZWN0aW9uLnN0YXJ0IHx8IGVuZCAhPSB0aGlzLm9wdC5zZWxlY3Rpb24uZW5kKSB7XG5cdFx0XHR0aGlzLl9zZXRTZWxlY3Rpb24oc3RhcnQsIGVuZCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXG5cdFx0XHRcdFx0RVZUX09OX1NFTEVDVElPTl9DSEFOR0VELCBcblx0XHRcdFx0XHR7IFwic3RhcnRcIiA6IHN0YXJ0LCBcImVuZFwiIDogZW5kIH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXHRcblx0X2J1aWxkRm9ybWF0U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XG5cdFx0dGhpcy5faGVhZGVyRGl2ID0galF1ZXJ5KCc8ZGl2PjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuX2NvbnRhaW5lcik7XG5cdFx0dGhpcy5faGVhZGVyRGl2LmNzcyh7XG5cdFx0XHQnZm9udC1mYW1pbHknOiAnXCJIZXZlbHRpY2EgTmV1ZVwiLCBBcmlhbCwgXCJzYW5zIHNlcmlmXCInLFxuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcxNHB4J1x0XG5cdFx0fSkuYXBwZW5kKCdGb3JtYXQ6ICcpO1xuXHRcdFxuXHRcdHRoaXMuX2Zvcm1hdFNlbGVjdG9yID0galF1ZXJ5KCc8c2VsZWN0PiAnK1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkZBU1RBXCI+RkFTVEE8L29wdGlvbj4nK1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkNPREFUQVwiPkNPREFUQTwvb3B0aW9uPicrXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiUFJJREVcIj5QUklERTwvb3B0aW9uPicrXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiUkFXXCI+UkFXPC9vcHRpb24+PC9zZWxlY3Q+JykuYXBwZW5kVG8oc2VsZi5faGVhZGVyRGl2KTtcblxuXHRcdHRoaXMuX2Zvcm1hdFNlbGVjdG9yLmNoYW5nZShmdW5jdGlvbihlKSB7XG5cdFx0XHRzZWxmLm9wdC5mb3JtYXQgPSBqUXVlcnkodGhpcykudmFsKCk7XG5cdFx0XHRzZWxmLl9yZWRyYXcoKTtcblx0XHR9KTtcblx0XHRcblx0XHR0aGlzLl9mb3JtYXRTZWxlY3Rvci52YWwoc2VsZi5vcHQuZm9ybWF0KTtcdFxuXHRcdFxuXHRcdHRoaXMuZm9ybWF0U2VsZWN0b3JWaXNpYmxlKCB0aGlzLm9wdC5mb3JtYXRTZWxlY3RvclZpc2libGUgKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogSGlnaGxpZ2h0cyBhIHJlZ2lvbiB1c2luZyB0aGUgZm9udCBjb2xvciBkZWZpbmVkIGluIHtCaW9qcy5Qcm90ZWluM0QjaGlnaGxpZ2h0Rm9udENvbG9yfSBieSBkZWZhdWx0IGlzIHJlZC5cbiAgICAqXG4gICAgKiBAZGVwcmVjYXRlZCB1c2UgYWRkSGlnaGxpZ2h0IGluc3RlYWQuXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBzdGFydCBUaGUgc3RhcnRpbmcgY2hhcmFjdGVyIG9mIHRoZSBoaWdobGlnaHRpbmcuXG4gICAgKiBAcGFyYW0ge2ludH0gZW5kIFRoZSBlbmRpbmcgY2hhcmFjdGVyIG9mIHRoZSBoaWdobGlnaHRpbmcuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbG9yXSBIVE1MIGNvbG9yIGNvZGUuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2JhY2tncm91bmRdIEhUTUwgY29sb3IgY29kZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdIEN1c3RvbSBpZGVudGlmaWVyLlxuICAgICogXG4gICAgKiBAcmV0dXJuIHtpbnR9IHJlcHJlc2VudGluZyB0aGUgaWQgb2YgdGhlIGhpZ2hsaWdodCBvbiB0aGUgaW50ZXJuYWwgYXJyYXkuIFJldHVybnMgLTEgb24gZmFpbHVyZSAgXG4gICAgKi9cblx0aGlnaGxpZ2h0IDogZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGNvbG9yLCBiYWNrZ3JvdW5kLCBpZCApIHtcblx0XHRyZXR1cm4gdGhpcy5hZGRIaWdobGlnaHQoeyBcInN0YXJ0XCI6IHN0YXJ0LCBcImVuZFwiOiBlbmQsIFwiY29sb3JcIjogY29sb3IsIFwiYmFja2dyb3VuZFwiOiBiYWNrZ3JvdW5kLCBcImlkXCI6IGlkIH0pO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBIaWdobGlnaHRzIGEgcmVnaW9uIHVzaW5nIHRoZSBmb250IGNvbG9yIGRlZmluZWQgaW4ge1NlcXVlbmNlI2hpZ2hsaWdodEZvbnRDb2xvcn0gYnkgZGVmYXVsdCBpcyByZWQuXG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIGhpZ2hsaWdodCB0aGUgY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAsIGluY2x1ZGVkLlxuICAgICogbXlTZXF1ZW5jZS5hZGRIaWdobGlnaHQoIHsgXCJzdGFydFwiOiAxMDAsIFwiZW5kXCI6IDE1MCwgXCJjb2xvclwiOiBcIndoaXRlXCIsIFwiYmFja2dyb3VuZFwiOiBcInJlZFwiLCBcImlkXCI6IFwiYWFhXCIgfSApO1xuICAgICogXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaCBUaGUgaGlnaGxpZ2h0IGRlZmluZWQgYXMgZm9sbG93czpcbiAgICAqIFx0XG4gICAgKiBcbiAgICAqIEByZXR1cm4ge2ludH0gcmVwcmVzZW50aW5nIHRoZSBpZCBvZiB0aGUgaGlnaGxpZ2h0IG9uIHRoZSBpbnRlcm5hbCBhcnJheS4gUmV0dXJucyAtMSBvbiBmYWlsdXJlICBcbiAgICAqL1xuXHRhZGRIaWdobGlnaHQgOiBmdW5jdGlvbiAoIGggKSB7XG5cdFx0dmFyIGlkID0gJy0xJztcblx0XHR2YXIgY29sb3IgPSBcIlwiO1xuXHRcdHZhciBiYWNrZ3JvdW5kID0gXCJcIjtcblx0XHR2YXIgaGlnaGxpZ2h0ID0ge307XG5cdFx0XG5cdFx0aWYgKCBoICYmIGguc3RhcnQgPD0gaC5lbmQgKSB7XG5cdFx0XHRcblx0XHRcdGNvbG9yID0gKCBcInN0cmluZ1wiID09PSB0eXBlb2YgaC5jb2xvciApPyBoLmNvbG9yIDogdGhpcy5vcHQuaGlnaGxpZ2h0Rm9udENvbG9yO1xuXHRcdFx0YmFja2dyb3VuZCA9ICggXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGguYmFja2dyb3VuZCApPyBoLmJhY2tncm91bmQgOiB0aGlzLm9wdC5oaWdobGlnaHRCYWNrZ3JvdW5kQ29sb3I7XG5cdFx0XHRpZCA9ICggXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGguaWQgKSA/IGguaWQgOiBTdHJpbmcodGhpcy5faGlnaGxpZ2h0c0NvdW50KyspO1xuXHRcdFx0XG5cdFx0XHRoaWdobGlnaHQgPSB7IFwic3RhcnRcIjogaC5zdGFydCwgXCJlbmRcIjogaC5lbmQsIFwiY29sb3JcIjogY29sb3IsIFwiYmFja2dyb3VuZFwiOiBiYWNrZ3JvdW5kLCBcImlkXCI6IGlkIH07XG5cdFx0XHRcblx0XHRcdHRoaXMuX2hpZ2hsaWdodHMucHVzaChoaWdobGlnaHQpO1xuXHRcdFx0dGhpcy5fYXBwbHlIaWdobGlnaHQoaGlnaGxpZ2h0KTtcblx0XHRcdHRoaXMuX3Jlc3RvcmVTZWxlY3Rpb24oaC5zdGFydCxoLmVuZCk7XG5cdFx0fSBcblx0XHRcblx0XHRyZXR1cm4gaWQ7XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fYXBwbHlIaWdobGlnaHRcbiAgICAgKiBQdXJwb3NlOiAgQXBwbHkgdGhlIHNwZWNpZmllZCBjb2xvciBhbmQgYmFja2dyb3VuZCB0byBhIHJlZ2lvbiBiZXR3ZWVuICdzdGFydCcgYW5kICdlbmQnLlxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiBoaWdobGlnaHQgLT4ge09iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZpZWxkcyBzdGFydCAoaW50KSwgZW5kIChpbnQpLCBcbiAgICAgKiBcdFx0XHRcdFx0XHRjb2xvciAoSFRNTCBjb2xvciBzdHJpbmcpIGFuZCBiYWNrZ3JvdW5kIChIVE1MIGNvbG9yIHN0cmluZykuXG4gICAgICovXG5cdF9hcHBseUhpZ2hsaWdodDogZnVuY3Rpb24gKCBoaWdobGlnaHQgKSB7XHRcdFxuXHRcdHZhciBzZXEgPSB0aGlzLl9jb250ZW50RGl2LmZpbmQoJy5zZXF1ZW5jZScpO1xuXHRcdGZvciAoIHZhciBpID0gaGlnaGxpZ2h0LnN0YXJ0IC0gMTsgaSA8IGhpZ2hsaWdodC5lbmQ7IGkrKyApe1xuXHRcdFx0emluZGV4ID0galF1ZXJ5KHNlcVtpXSkuY3NzKFwiei1pbmRleFwiKTtcblx0XHRcdGlmICh6aW5kZXg9PVwiYXV0b1wiKXtcblx0XHRcdFx0IHogPSAxO1xuXHRcdFx0XHQgbyA9IDE7XG5cdFx0XHQgfVxuXHRcdFx0IGVsc2V7XG5cdFx0XHRcdCB6ID0gMDtcblx0XHRcdFx0IG8gPSAwLjU7XG5cdFx0XHQgfVxuXHRcdFx0alF1ZXJ5KHNlcVtpXSlcblx0XHRcdFx0LmNzcyh7IFxuXHRcdFx0XHRcdFwiY29sb3JcIjogaGlnaGxpZ2h0LmNvbG9yLFxuXHRcdFx0XHRcdFwiYmFja2dyb3VuZC1jb2xvclwiOiBoaWdobGlnaHQuYmFja2dyb3VuZCxcblx0XHRcdFx0XHRcInotaW5kZXhcIjogeixcblx0XHRcdFx0XHRcIm9wYWNpdHlcIjogb1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdC5hZGRDbGFzcyhcImhpZ2hsaWdodGVkXCIpO1xuXHRcdH1cblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9hcHBseUhpZ2hsaWdodHNcbiAgICAgKiBQdXJwb3NlOiAgQXBwbHkgdGhlIHNwZWNpZmllZCBoaWdobGlnaHRzLlxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiBoaWdobGlnaHRzIC0+IHtPYmplY3RbXX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgaGlnaGxpZ2h0cyB0byBiZSBhcHBsaWVkLlxuICAgICAqL1xuXHRfYXBwbHlIaWdobGlnaHRzOiBmdW5jdGlvbiAoIGhpZ2hsaWdodHMgKSB7XG5cdFx0Zm9yICggdmFyIGkgaW4gaGlnaGxpZ2h0cyApIHtcblx0XHRcdHRoaXMuX2FwcGx5SGlnaGxpZ2h0KGhpZ2hsaWdodHNbaV0pO1xuXHRcdH1cblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9yZXN0b3JlSGlnaGxpZ2h0c1xuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBoaWdobGlnaHRzIGluIHRoZSBzcGVjaWZpZWQgcmVnaW9uLlxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiBzdGFydCAtPiB7aW50fSBTdGFydCBvZiB0aGUgcmVnaW9uIHRvIGJlIHJlc3RvcmVkLlxuICAgICAqIFx0XHQgICBlbmQgLT4ge2ludH0gRW5kIG9mIHRoZSByZWdpb24gdG8gYmUgcmVzdG9yZWQuXG4gICAgICovXG5cdF9yZXN0b3JlSGlnaGxpZ2h0czogZnVuY3Rpb24gKCBzdGFydCwgZW5kICkge1xuXHRcdHZhciBoID0gdGhpcy5faGlnaGxpZ2h0cztcblx0XHQvLyBwYWludCB0aGUgcmVnaW9uIHVzaW5nIGRlZmF1bHQgYmxhbmsgc2V0dGluZ3Ncblx0XHR0aGlzLl9hcHBseUhpZ2hsaWdodCh7XG5cdFx0XHRcInN0YXJ0XCI6IHN0YXJ0LCBcblx0XHRcdFwiZW5kXCI6IGVuZCwgXG5cdFx0XHRcImNvbG9yXCI6IHRoaXMub3B0LmZvbnRDb2xvciwgXG5cdFx0XHRcImJhY2tncm91bmRcIjogdGhpcy5vcHQuYmFja2dyb3VuZENvbG9yIFxuXHRcdH0pO1xuXHRcdC8vIHJlc3RvcmUgaGlnaGxpZ2h0cyBpbiB0aGF0IHJlZ2lvblxuXHRcdGZvciAoIHZhciBpIGluIGggKSB7XG5cdFx0XHQvLyBpbnRlcnZhbCBpbnRlcnNlY3RzIHdpdGggaGlnaGxpZ2h0IGkgP1xuXHRcdFx0aWYgKCAhKCBoW2ldLnN0YXJ0ID4gZW5kIHx8IGhbaV0uZW5kIDwgc3RhcnQgKSApIHtcblx0XHRcdFx0YSA9ICggaFtpXS5zdGFydCA8IHN0YXJ0ICkgPyBzdGFydCA6IGhbaV0uc3RhcnQ7XG5cdFx0XHRcdGIgPSAoIGhbaV0uZW5kID4gZW5kICkgPyBlbmQgOiBoW2ldLmVuZDtcblx0XHRcdFx0dGhpcy5fYXBwbHlIaWdobGlnaHQoe1xuXHRcdFx0XHRcdFwic3RhcnRcIjogYSwgXG5cdFx0XHRcdFx0XCJlbmRcIjogYiwgXG5cdFx0XHRcdFx0XCJjb2xvclwiOiBoW2ldLmNvbG9yLCBcblx0XHRcdFx0XHRcImJhY2tncm91bmRcIjogaFtpXS5iYWNrZ3JvdW5kIFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fcmVzdG9yZVNlbGVjdGlvblxuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpbiB0aGUgc3BlY2lmaWVkIHJlZ2lvbi4gXG4gICAgICogXHRcdFx0IEl0IGlzIHVzZWQgaW4gdGhlIGNhc2Ugb2YgYW55IGhpZ2hsaWdodCBkbyBvdmVycmlkaW5nIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IHN0YXJ0IC0+IHtpbnR9IFN0YXJ0IG9mIHRoZSByZWdpb24gdG8gYmUgcmVzdG9yZWQuXG4gICAgICogXHRcdCAgIGVuZCAtPiB7aW50fSBFbmQgb2YgdGhlIHJlZ2lvbiB0byBiZSByZXN0b3JlZC5cbiAgICAgKi9cblx0X3Jlc3RvcmVTZWxlY3Rpb246IGZ1bmN0aW9uICggc3RhcnQsIGVuZCApIHtcblx0XHR2YXIgc2VsID0gdGhpcy5vcHQuc2VsZWN0aW9uO1xuXHRcdC8vIGludGVydmFsIGludGVyc2VjdHMgd2l0aCBjdXJyZW50IHNlbGVjdGlvbiA/XG5cdFx0Ly8gcmVzdG9yZSBzZWxlY3Rpb25cblx0XHRpZiAoICEoIHN0YXJ0ID4gc2VsLmVuZCB8fCBlbmQgPCBzZWwuc3RhcnQgKSApIHtcblx0XHRcdGEgPSAoIHN0YXJ0IDwgc2VsLnN0YXJ0ICkgPyBzZWwuc3RhcnQgOiBzdGFydDtcblx0XHRcdGIgPSAoIGVuZCA+IHNlbC5lbmQgKSA/IHNlbC5lbmQgOiBlbmQ7XG5cdFx0XHRcblx0XHRcdHRoaXMuX2FwcGx5SGlnaGxpZ2h0KHtcblx0XHRcdFx0XCJzdGFydFwiOiBhLCBcblx0XHRcdFx0XCJlbmRcIjogYiwgXG5cdFx0XHRcdFwiY29sb3JcIjogdGhpcy5vcHQuc2VsZWN0aW9uRm9udENvbG9yLCBcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCI6IHRoaXMub3B0LnNlbGVjdGlvbkNvbG9yLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBDbGVhciBhIGhpZ2hsaWdodGVkIHJlZ2lvbiB1c2luZy5cbiAgICAqXG4gICAgKiBAZGVwcmVjYXRlZCB1c2UgcmVtb3ZlSGlnaGxpZ2h0IGluc3RlYWQuXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBpZCBUaGUgaWQgb2YgdGhlIGhpZ2hsaWdodCBvbiB0aGUgaW50ZXJuYWwgYXJyYXkuIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgYnkgbWV0aG9kIGhpZ2hsaWdodC5cbiAgICAqL1xuXHR1bkhpZ2hsaWdodCA6IGZ1bmN0aW9uIChpZCkge1x0XG5cdFx0dGhpcy5yZW1vdmVIaWdobGlnaHQoaWQpO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBSZW1vdmUgYSBoaWdobGlnaHQuXG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIENsZWFyIHRoZSBoaWdobGlnaHRlZCBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgcG9zaXRpb24gMTAwIHRvIDE1MCwgaW5jbHVkZWQuXG4gICAgKiBteVNlcXVlbmNlLnJlbW92ZUhpZ2hsaWdodChcInNwaW4xXCIpO1xuICAgICogXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBoaWdobGlnaHQgb24gdGhlIGludGVybmFsIGFycmF5LiBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGJ5IG1ldGhvZCBoaWdobGlnaHQuXG4gICAgKi9cblx0cmVtb3ZlSGlnaGxpZ2h0IDogZnVuY3Rpb24gKGlkKSB7XHRcblx0XHR2YXIgc3RhcnQsIGVuZCwgaSwgaCA9IHRoaXMuX2hpZ2hsaWdodHM7XG5cdFx0Zm9yICggaSBpbiBoICkge1xuXHRcdFx0aWYgKCBoW2ldLmlkID09IGlkICkge1xuXHRcdFx0XHRzdGFydCA9IGhbaV0uc3RhcnQ7XG5cdFx0XHRcdGVuZCA9IGhbaV0uZW5kO1xuXHRcdFx0XHRoLnNwbGljZShpLDEpO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5fcmVzdG9yZUhpZ2hsaWdodHMoc3RhcnQsZW5kKTtcblx0XHRcdFx0dGhpcy5fcmVzdG9yZVNlbGVjdGlvbihzdGFydCxlbmQpO1xuXHRcdFx0XHRcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBDbGVhciB0aGUgaGlnaGxpZ2h0cyBvZiB3aG9sZSBzZXF1ZW5jZS5cbiAgICAqIEBkZXByZWNhdGVkIHVzZSByZW1vdmVBbGxIaWdobGlnaHRzIGluc3RlYWQuXG4gICAgKi9cblx0dW5IaWdobGlnaHRBbGwgOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5yZW1vdmVBbGxIaWdobGlnaHRzKCk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIFJlbW92ZSBhbGwgdGhlIGhpZ2hsaWdodHMgb2Ygd2hvbGUgc2VxdWVuY2UuXG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIG15U2VxdWVuY2UucmVtb3ZlQWxsSGlnaGxpZ2h0cygpO1xuICAgICovXG5cdHJlbW92ZUFsbEhpZ2hsaWdodHMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5faGlnaGxpZ2h0cyA9IFtdO1xuXHRcdHRoaXMuX3Jlc3RvcmVIaWdobGlnaHRzKDEsdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoKTtcblx0XHR0aGlzLl9yZXN0b3JlU2VsZWN0aW9uKDEsdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogQ2hhbmdlcyB0aGUgY3VycmVudCBkaXNwbGF5aW5nIGZvcm1hdCBvZiB0aGUgc2VxdWVuY2UuXG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIFNldCBmb3JtYXQgdG8gJ0ZBU1RBJy5cbiAgICAqIG15U2VxdWVuY2Uuc2V0Rm9ybWF0KCdGQVNUQScpO1xuICAgICogXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0IFRoZSBmb3JtYXQgZm9yIHRoZSBzZXF1ZW5jZSB0byBiZSBkaXNwbGF5ZWQuXG4gICAgKi9cblx0c2V0Rm9ybWF0IDogZnVuY3Rpb24oZm9ybWF0KSB7XG5cdFx0aWYgKCB0aGlzLm9wdC5mb3JtYXQgIT0gZm9ybWF0LnRvVXBwZXJDYXNlKCkgKSB7XG5cdFx0XHR0aGlzLm9wdC5mb3JtYXQgPSBmb3JtYXQudG9VcHBlckNhc2UoKTtcblx0XHRcdHRoaXMuX3JlZHJhdygpO1xuXHRcdH1cblxuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHQvLyBDaGFuZ2VzIHRoZSBvcHRpb24gaW4gdGhlIGNvbWJvIGJveFxuXHRcdHRoaXMuX2hlYWRlckRpdi5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYoalF1ZXJ5KHRoaXMpLnZhbCgpID09IHNlbGYub3B0LmZvcm1hdC50b1VwcGVyQ2FzZSgpKSB7XG5cdFx0XHRcdGpRdWVyeSh0aGlzKS5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBDaGFuZ2VzIHRoZSBjdXJyZW50IG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBkaXNwbGF5ZWQgc2VxdWVuY2UuXG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIFNldCB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgdG8gNzAuXG4gICAgKiBteVNlcXVlbmNlLnNldE51bUNvbHMoNzApO1xuICAgICogXG4gICAgKiBAcGFyYW0ge2ludH0gbnVtQ29scyBUaGUgbnVtYmVyIG9mIGNvbHVtbnMuXG4gICAgKi9cblx0c2V0TnVtQ29scyA6IGZ1bmN0aW9uKG51bUNvbHMpIHtcblx0XHR0aGlzLm9wdC5jb2x1bW5zLnNpemUgPSBudW1Db2xzO1xuXHRcdHRoaXMuX3JlZHJhdygpO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBTZXQgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGRyb3AtZG93biBsaXN0IG9mIGZvcm1hdHMuXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZSB0cnVlOiBzaG93OyBmYWxzZTogaGlkZS5cbiAgICAqL1xuXHRmb3JtYXRTZWxlY3RvclZpc2libGUgOiBmdW5jdGlvbiAodmlzaWJsZSl7XG5cdFx0aWYgKHZpc2libGUpIHtcblx0XHRcdHRoaXMuX2hlYWRlckRpdi5zaG93KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2hlYWRlckRpdi5oaWRlKCk7XG5cdFx0fVxuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gYSB7QmlvanMuUHJvdGVpbjNEI2Zvcm1hdFNlbGVjdG9yVmlzaWJsZX0gd2l0aCB0aGUgJ3RydWUnIGFyZ3VtZW50LlxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBTaG93cyB0aGUgZm9ybWF0IHNlbGVjdG9yLlxuICAgICogbXlTZXF1ZW5jZS5zaG93Rm9ybWF0U2VsZWN0b3IoKTtcbiAgICAqIFxuICAgICovXG5cdHNob3dGb3JtYXRTZWxlY3RvciA6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuX2hlYWRlckRpdi5zaG93KCk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIFRoaXMgaXMgc2ltaWxhciB0byBhIHtCaW9qcy5Qcm90ZWluM0QjZm9ybWF0U2VsZWN0b3JWaXNpYmxlfSB3aXRoIHRoZSAnZmFsc2UnIGFyZ3VtZW50LlxuICAgICogXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gSGlkZXMgdGhlIGZvcm1hdCBzZWxlY3Rvci5cbiAgICAqIG15U2VxdWVuY2UuaGlkZUZvcm1hdFNlbGVjdG9yKCk7XG4gICAgKiBcbiAgICAqL1xuXHRoaWRlRm9ybWF0U2VsZWN0b3IgOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLl9oZWFkZXJEaXYuaGlkZSgpO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBIaWRlcyB0aGUgd2hvbGUgY29tcG9uZW50LlxuICAgICogXG4gICAgKi9cblx0aGlkZSA6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9oZWFkZXJEaXYuaGlkZSgpO1xuXHRcdHRoaXMuX2NvbnRlbnREaXYuaGlkZSgpO1xuXHR9LFxuXG5cdC8qKlxuICAgICogU2hvd3MgdGhlIHdob2xlIGNvbXBvbmVudC5cbiAgICAqIFxuICAgICovXG5cdHNob3cgOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5faGVhZGVyRGl2LnNob3coKTtcblx0XHR0aGlzLl9jb250ZW50RGl2LnNob3coKTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9zZXRTZWxlY3Rpb25cbiAgICAgKiBQdXJwb3NlOiAgVXBkYXRlIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IHN0YXJ0IC0+IHtpbnR9IFN0YXJ0IG9mIHRoZSByZWdpb24gdG8gYmUgc2VsZWN0ZWQuXG4gICAgICogXHRcdCAgIGVuZCAtPiB7aW50fSBFbmQgb2YgdGhlIHJlZ2lvbiB0byBiZSBzZWxlY3RlZC5cbiAgICAgKi9cblx0X3NldFNlbGVjdGlvbiA6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcblx0XHQvL2FsZXJ0KFwiYWRzYXNcIik7XG5cdFx0XG5cdFx0dmFyIGN1cnJlbnQgPSB0aGlzLm9wdC5zZWxlY3Rpb247XG5cdFx0dmFyIGNoYW5nZSA9IHt9O1xuXHRcdFxuXHRcdC8vIFdoaWNoIGlzIHRoZSBjaGFuZ2Ugb24gc2VsZWN0aW9uP1xuXHRcdGlmICggY3VycmVudC5zdGFydCA9PSBzdGFydCApIHtcblx0XHRcdC8vIGZvcndhcmQ/XG5cdFx0XHRpZiAoIGN1cnJlbnQuZW5kIDwgZW5kICkge1xuXHRcdFx0XHRjaGFuZ2Uuc3RhcnQgPSBjdXJyZW50LmVuZDtcblx0XHRcdFx0Y2hhbmdlLmVuZCA9IGVuZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3Jlc3RvcmVIaWdobGlnaHRzKGVuZCsxLCBjdXJyZW50LmVuZCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICggY3VycmVudC5lbmQgPT0gZW5kICkge1xuXHRcdFx0Ly8gZm9yd2FyZD9cblx0XHRcdGlmICggY3VycmVudC5zdGFydCA+IHN0YXJ0ICkge1xuXHRcdFx0XHRjaGFuZ2Uuc3RhcnQgPSBzdGFydDtcblx0XHRcdFx0Y2hhbmdlLmVuZCA9IGN1cnJlbnQuc3RhcnQ7XHRcdFx0XHRcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3Jlc3RvcmVIaWdobGlnaHRzKGN1cnJlbnQuc3RhcnQsIHN0YXJ0LTEpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9yZXN0b3JlSGlnaGxpZ2h0cyhjdXJyZW50LnN0YXJ0LCBjdXJyZW50LmVuZCk7XG5cdFx0XHRjaGFuZ2Uuc3RhcnQgPSBzdGFydDtcblx0XHRcdGNoYW5nZS5lbmQgPSBlbmQ7XG5cdFx0fVxuXG5cdFx0Y3VycmVudC5zdGFydCA9IHN0YXJ0O1xuXHRcdGN1cnJlbnQuZW5kID0gZW5kO1xuXG5cdFx0aWYgKGNoYW5nZS5zdGFydCkge1xuXHRcdFx0dGhpcy5fYXBwbHlIaWdobGlnaHQoe1xuXHRcdFx0XHRcInN0YXJ0XCI6IGNoYW5nZS5zdGFydCwgXG5cdFx0XHRcdFwiZW5kXCI6IGNoYW5nZS5lbmQsIFxuXHRcdFx0XHRcImNvbG9yXCI6IHRoaXMub3B0LnNlbGVjdGlvbkZvbnRDb2xvciwgXG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiOiB0aGlzLm9wdC5zZWxlY3Rpb25Db2xvciBcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0fSxcblx0XG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fcmVwYWludFNlbGVjdGlvblxuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSB3aG9sZSBjdXJyZW50IHNlbGVjdGlvbi4gXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IC1cbiAgICAgKi9cblx0X3JlcGFpbnRTZWxlY3Rpb246IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHMgPSB0aGlzLm9wdC5zZWxlY3Rpb247XG5cdFx0dGhpcy5fc2V0U2VsZWN0aW9uKDAsMCk7XG5cdFx0dGhpcy5fc2V0U2VsZWN0aW9uKHMuc3RhcnQscy5lbmQpO1xuXHR9LFxuXHRcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9yZWRyYXdcbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZXF1ZW5jZS4gXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IC1cbiAgICAgKi9cblx0X3JlZHJhdyA6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBpID0gMDtcdFxuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcblx0XHQvLyBSZXNldCB0aGUgY29udGVudFxuXHRcdC8vdGhpcy5fY29udGVudERpdi50ZXh0KCcnKTtcblx0XHR0aGlzLl9jb250ZW50RGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG5cdFx0XG5cdFx0Ly8gUmVidWlsZCB0aGUgc3BhbnMgb2YgdGhlIHNlcXVlbmNlIFxuXHRcdC8vIGFjY29yZGluZyB0byBmb3JtYXRcblx0XHRpZih0aGlzLm9wdC5mb3JtYXQgPT0gJ1JBVycpIHtcblx0XHRcdHRoaXMuX2RyYXdSYXcoKTtcblx0XHR9IGVsc2UgaWYodGhpcy5vcHQuZm9ybWF0ID09ICdDT0RBVEEnKSB7XG5cdFx0XHR0aGlzLl9kcmF3Q29kYXRhKCk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLm9wdC5mb3JtYXQgPT0gJ0ZBU1RBJyl7XG5cdFx0XHR0aGlzLl9kcmF3RmFzdGEoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcHQuZm9ybWF0ID0gJ1BSSURFJztcblx0XHRcdHRoaXMuX2RyYXdQcmlkZSgpO1xuXHRcdH1cblx0XHRcblx0XHQvLyBSZXN0b3JlIHRoZSBoaWdobGlnaHRlZCByZWdpb25zXG5cdFx0dGhpcy5fYXBwbHlIaWdobGlnaHRzKHRoaXMuX2hpZ2hsaWdodHMpO1xuXHRcdHRoaXMuX3JlcGFpbnRTZWxlY3Rpb24oKTtcblx0XHR0aGlzLl9hZGRTcGFuRXZlbnRzKCk7XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fZHJhd0Zhc3RhXG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UgdXNpbmcgRkFTVEEgZm9ybWF0LiAgXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IC1cbiAgICAgKi9cblx0X2RyYXdGYXN0YSA6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYSA9IHRoaXMub3B0LnNlcXVlbmNlLnRvVXBwZXJDYXNlKCkuc3BsaXQoJycpO1xuICAgIHZhciBwcmUgPSBqUXVlcnkoJzxwcmU+PC9wcmU+JykuYXBwZW5kVG8odGhpcy5fY29udGVudERpdik7XG5cbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBzdHIgPSAnPicgKyB0aGlzLm9wdC5pZCArICcgJyArIGEubGVuZ3RoICsgJyBicDxici8+JztcblxuICAgIC8qIENvcnJlY3QgY29sdW1uIHNpemUgaW4gY2FzZSB0aGUgc2VxdWVuY2UgaXMgYXMgc21hbGwgcGVwdGlkZSAqL1xuICAgIHZhciBudW1Db2xzID0gdGhpcy5vcHQuY29sdW1ucy5zaXplO1xuICAgIGlmICggdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoIDwgdGhpcy5vcHQuY29sdW1ucy5zaXplICkge1xuICAgICAgbnVtQ29scyA9IHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aDtcdFxuICAgIH1cblxuICAgIHZhciBvcHQgPSB7XG4gICAgICBudW1Db2xzOiBudW1Db2xzLFxuICAgICAgbnVtQ29sc0ZvclNwYWNlOiAwXG4gICAgfTtcblxuICAgIHN0ciArPSB0aGlzLl9kcmF3U2VxdWVuY2UoYSwgb3B0KTtcbiAgICBwcmUuaHRtbChzdHIpO1xuXG4gICAgdGhpcy5fZHJhd0Fubm90YXRpb25zKG9wdCk7XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fZHJhd0NvZGF0YVxuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBjdXJyZW50IHNlcXVlbmNlIHVzaW5nIENPREFUQSBmb3JtYXQuICBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogLVxuICAgICAqL1xuXHRfZHJhd0NvZGF0YSA6IGZ1bmN0aW9uKCkge1xuXHRcdFxuICAgIHZhciBidWZmID0gW107XG4gICAgdmFyIG9wdGlvbnMgPSAodGhpcy5vcHQuZm9ybWF0T3B0aW9ucyB8fCB7fSk7XG5cdFx0dmFyIHNlcXVlbmNlID0gdGhpcy5vcHQuc2VxdWVuY2UudG9VcHBlckNhc2UoKS5zcGxpdCgnJyk7XG5cdFx0dmFyIHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAgIHZhciBvcHQgPSB7XG4gICAgICBudW1MZWZ0OiB0cnVlLFxuICAgICAgbnVtTGVmdFNpemU6IDcsXG4gICAgICBudW1MZWZ0UGFkOicgJyxcbiAgICAgIG51bVRvcDogdHJ1ZSxcbiAgICAgIG51bVRvcEVhY2g6IDUsXG4gICAgICBudW1Db2xzOiBNYXRoLm1pbihzZXF1ZW5jZS5sZW5ndGgsIHRoaXMub3B0LmNvbHVtbnMuc2l6ZSksXG4gICAgICBudW1Db2xzRm9yU3BhY2U6IDAsXG4gICAgICBzcGFjZUJldHdlZW5DaGFyczogdHJ1ZVxuICAgIH07XG5cblx0XHRpZiAob3B0aW9ucy50aXRsZSkge1xuICAgICAgYnVmZi5wdXNoKCdFTlRSWSAgICAgICAgICAgJywgdGhpcy5vcHQuaWQsICc8YnIvPicsICdTRVFVRU5DRTxici8+Jyk7XG4gICAgfVxuXHRcdFxuXHRcdC8qIENvcnJlY3QgY29sdW1uIHNpemUgaW4gY2FzZSB0aGUgc2VxdWVuY2UgaXMgYXMgc21hbGwgcGVwdGlkZSAqL1xuXHRcdFxuXHRcdGJ1ZmYucHVzaCh0aGlzLl9kcmF3U2VxdWVuY2Uoc2VxdWVuY2UsIG9wdCkpO1xuXHRcdFxuXHRcdGJ1ZmYucHVzaChvcHRpb25zLmZvb3RlciA/ICc8YnIvPi8vLycgOiAnJyk7XG5cbiAgICBwcmUuc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUnO1xuICAgIHByZS5pbm5lckhUTUwgPSBidWZmLmpvaW4oJycpO1xuXG4gICAgdGhpcy5fY29udGVudERpdi5hcHBlbmQocHJlKTtcblx0XHRcblx0XHR0aGlzLl9kcmF3QW5ub3RhdGlvbnMob3B0KTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3QW5ub3RhdGlvbnNcbiAgICAgKiBQdXJwb3NlOiAgUGFpbnQgdGhlIGFubm90YXRpb25zIG9uIHRoZSBzZXF1ZW5jZS4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiBzZXR0aW5ncyAtPiB7b2JqZWN0fSBcbiAgICAgKi9cbiAgICBfZHJhd0Fubm90YXRpb25zOiBmdW5jdGlvbiAoIHNldHRpbmdzICl7IFxuXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgYSA9IHRoaXMub3B0LnNlcXVlbmNlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpOyAgICBcdFxuICAgICAgdmFyIGFubm90YXRpb25zID0gdGhpcy5fYW5ub3RhdGlvbnM7XG4gICAgICB2YXIgbGVmdFNwYWNlcyA9ICcnO1xuICAgICAgdmFyIHJvdyA9ICcnO1xuICAgICAgdmFyIGFubm90ID0gJyc7XG4gICAgICB2YXIgY2VsbFNlbGVjdG9yO1xuXG4gICAgICAvLyBJbmRleCBhdCB0aGUgbGVmdD9cbiAgICAgIGlmICggc2V0dGluZ3MubnVtTGVmdCApIHtcbiAgICAgICAgbGVmdFNwYWNlcyArPSB0aGlzLl9mb3JtYXRJbmRleCgnICcsIHNldHRpbmdzLm51bUxlZnRTaXplKzIsICcgJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICs9IHNldHRpbmdzLm51bUNvbHMgKXtcbiAgICAgICAgcm93ID0gJyc7XG4gICAgICAgIGZvciAoIHZhciBrZXkgaW4gYW5ub3RhdGlvbnMgKXtcbiAgICAgICAgICBhbm5vdGF0aW9uc1trZXldLmlkID0gdGhpcy5nZXRJZCgpICsgXCJfXCIgKyBrZXk7XG4gICAgICAgICAgYW5ub3QgPSB0aGlzLl9nZXRIVE1MUm93QW5ub3QoaSsxLCBhbm5vdGF0aW9uc1trZXldLCBzZXR0aW5ncyk7XHRcdFx0XHRcbiAgICAgICAgICBpZiAoYW5ub3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcm93ICs9ICc8YnIvPic7XG4gICAgICAgICAgICByb3cgKz0gbGVmdFNwYWNlcztcbiAgICAgICAgICAgIHJvdyArPSBhbm5vdDtcbiAgICAgICAgICAgIHJvdyArPSAnPGJyLz4nO1xuICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbnVtQ29scyA9IHNldHRpbmdzLm51bUNvbHM7XG4gICAgICAgIHZhciBjaGFyUmVtYWluaW5nID0gYS5sZW5ndGgtaTtcbiAgICAgICAgaWYoY2hhclJlbWFpbmluZyA8IG51bUNvbHMpe1xuICAgICAgICAgIG51bUNvbHNcdD0gY2hhclJlbWFpbmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggc2V0dGluZ3MubnVtUmlnaHQgKSB7XG4gICAgICAgICAgLy8gVE9ETzogc3RvcCB1c2luZyBpZHMgZm9yIGJhc2VzLlxuICAgICAgICAgIGNlbGxTZWxlY3RvciA9ICdwcmUgc3BhbiNudW1SaWdodF8nICsgdGhpcy5nZXRJZCgpICsgJ18nICsgKGkgKyBudW1Db2xzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsU2VsZWN0b3IgPSAncHJlIHNwYW4jJyArIHRoaXMuZ2V0SWQoKSArICdfJyArIChpICsgbnVtQ29scyk7XG4gICAgICAgIH1cbiAgICAgICAgalF1ZXJ5KHJvdykuaW5zZXJ0QWZ0ZXIoalF1ZXJ5KGNlbGxTZWxlY3Rvciwgc2VsZi5vcHQudGFyZ2V0KSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCB0b29sIHRpcHMgYW5kIGJhY2tncm91bmQnIGNvbG9yaW5nIGVmZmVjdFxuICAgICAgalF1ZXJ5KHRoaXMuX2NvbnRlbnREaXYpLmZpbmQoJy5hbm5vdGF0aW9uJykuZWFjaCggZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5fYWRkVG9vbFRpcCggdGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuX2dldEFubm90YXRpb25TdHJpbmcoIGpRdWVyeSh0aGlzKS5hdHRyKFwiaWRcIikgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgalF1ZXJ5KHRoaXMpLm1vdXNlb3ZlcihmdW5jdGlvbihlKSB7XG4gICAgICAgICAgalF1ZXJ5KCcuYW5ub3RhdGlvbi4nK2pRdWVyeShlLnRhcmdldCkuYXR0cihcImlkXCIpKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBqUXVlcnkodGhpcykuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBqUXVlcnkodGhpcykuYXR0cihcImNvbG9yXCIpICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLm1vdXNlb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGpRdWVyeSgnLmFubm90YXRpb24nKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIik7IFxuXG4gICAgICAgIH0pLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgaSwgbmFtZSwgaWQgPSBqUXVlcnkoZS50YXJnZXQpLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBzZWxmLl9hbm5vdGF0aW9ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihzZWxmLl9hbm5vdGF0aW9uc1tpXS5pZCA9PSBpZCl7XG4gICAgICAgICAgICAgIG5hbWUgPSBzZWxmLl9hbm5vdGF0aW9uc1tpXS5uYW1lO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi50cmlnZ2VyKEVWVF9PTl9BTk5PVEFUSU9OX0NMSUNLRUQsIHtuYW1lOiBuYW1lfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0sXG4gICAgLyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9nZXRBbm5vdGF0aW9uU3RyaW5nXG4gICAgICogUHVycG9zZTogIEdldCB0aGUgYW5ub3RhdGlvbiB0ZXh0IG1lc3NhZ2UgZm9yIHRoZSB0b29sdGlwIFxuICAgICAqIFJldHVybnM6ICB7c3RyaW5nfSBBbm5vdGF0aW9uIHRleHQgZm9yIHRoZSBhbm5vdGF0aW9uXG4gICAgICogSW5wdXRzOiAgIGlkIC0+IHtpbnR9IGluZGV4IG9mIHRoZSBpbnRlcm5hbCBhbm5vdGF0aW9uIGFycmF5XG4gICAgICovXG4gICAgX2dldEFubm90YXRpb25TdHJpbmc6IGZ1bmN0aW9uICggaWQgKSB7XG5cdFx0dmFyIGFubm90YXRpb24gPSB0aGlzLl9hbm5vdGF0aW9uc1tpZC5zdWJzdHIoaWQuaW5kZXhPZihcIl9cIikgKyAxKV07XG5cdFx0cmV0dXJuIGFubm90YXRpb24ubmFtZSArIFwiPGJyLz5cIiArICgoYW5ub3RhdGlvbi5odG1sKT8gYW5ub3RhdGlvbi5odG1sIDogJycpO1xuICAgIH0sXG4gICAgXG4gICAgLyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9nZXRIVE1MUm93QW5ub3RcbiAgICAgKiBQdXJwb3NlOiAgQnVpbGQgYW4gYW5ub3RhdGlvblxuICAgICAqIFJldHVybnM6ICBIVE1MIG9mIHRoZSBhbm5vdGF0aW9uXG4gICAgICogSW5wdXRzOiAgIGN1cnJlbnRQb3MgLT4ge2ludH1cbiAgICAgKiBcdFx0XHQgYW5ub3RhdGlvbiAtPiB7T2JqZWN0fSBcbiAgICAgKiAgXHRcdCBzZXR0aW5ncyAtPiB7T2JqZWN0fVxuICAgICAqL1xuICAgIF9nZXRIVE1MUm93QW5ub3QgOiBmdW5jdGlvbiAoY3VycmVudFBvcywgYW5ub3RhdGlvbiwgc2V0dGluZ3MpIHtcbiAgICBcdHZhciBzdHlsZUJlZ2luID0gJ2JvcmRlci1sZWZ0OjFweCBzb2xpZDsgYm9yZGVyLWJvdHRvbToxcHggc29saWQ7IGJvcmRlci1jb2xvcjonO1xuICAgIFx0dmFyIHN0eWxlT24gPSAnYm9yZGVyLWJvdHRvbToxcHggc29saWQ7IGJvcmRlci1jb2xvcjonO1xuICAgIFx0dmFyIHN0eWxlRW5kID0gJ2JvcmRlci1ib3R0b206MXB4IHNvbGlkOyBib3JkZXItcmlnaHQ6MXB4IHNvbGlkOyBib3JkZXItY29sb3I6Jztcblx0XHR2YXIgc3R5bGVCZWdpbkFuZEVuZCA9ICdib3JkZXItbGVmdDoxcHggc29saWQ7IGJvcmRlci1yaWdodDoxcHggc29saWQ7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkOyBib3JkZXItY29sb3I6JztcbiAgICBcdFxuICAgIFx0dmFyIHJvdyA9IFtdO1xuICAgIFx0dmFyIGVuZCA9IChjdXJyZW50UG9zICsgc2V0dGluZ3MubnVtQ29scyk7XG4gICAgXHR2YXIgc3BhY2VCZXR3ZWVuQ2hhcnMgPSAoc2V0dGluZ3Muc3BhY2VCZXR3ZWVuQ2hhcnMpPyAnICcgOiAnJzsgICAgXHRcbiAgICBcdHZhciBkZWZhdWx0Q29sb3IgPSBhbm5vdGF0aW9uLmNvbG9yO1xuICAgIFx0dmFyIGlkID0gYW5ub3RhdGlvbi5pZDtcbiAgICBcdGZvciAoIHZhciBwb3M9Y3VycmVudFBvczsgcG9zIDwgZW5kIDsgcG9zKysgKSB7XG5cdFx0XHQvLyByZWdpb25zXG5cdFx0XHRmb3IgKCB2YXIgciBpbiBhbm5vdGF0aW9uLnJlZ2lvbnMgKSB7XG5cdFx0XHRcdHJlZ2lvbiA9IGFubm90YXRpb24ucmVnaW9uc1tyXTtcblx0XHRcdFx0XG5cdFx0XHRcdHNwYWNlQWZ0ZXIgPSAnJztcblx0XHRcdFx0c3BhY2VBZnRlciArPSAocG9zICUgc2V0dGluZ3MubnVtQ29sc0ZvclNwYWNlID09PSAwICkgPyAnICcgOiAnJztcblx0XHRcdFx0c3BhY2VBZnRlciArPSBzcGFjZUJldHdlZW5DaGFycztcblx0XHRcdFx0XG5cdFx0XHRcdGNvbG9yID0gKChyZWdpb24uY29sb3IpPyByZWdpb24uY29sb3IgOiBkZWZhdWx0Q29sb3IpO1xuXHRcdFx0XHRkYXRhID0gJ2NsYXNzPVwiYW5ub3RhdGlvbiAnK2lkKydcIiBpZD1cIicraWQrJ1wiIGNvbG9yPVwiJytjb2xvcisnXCIgcG9zPVwiJytwb3MrJ1wiJztcblx0XHRcdFx0XG5cdFx0XHRcdGlmICggcG9zID09IHJlZ2lvbi5zdGFydCAmJiBwb3MgPT0gcmVnaW9uLmVuZCkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJzxzcGFuIHN0eWxlPVwiJytzdHlsZUJlZ2luQW5kRW5kK2NvbG9yKydcIiAnK2RhdGErJz4gJztcblx0XHRcdFx0XHRyb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9ICc8L3NwYW4+Jztcblx0XHRcdFx0fSBlbHNlIGlmICggcG9zID09IHJlZ2lvbi5zdGFydCApIHtcblx0XHRcdFx0XHRyb3dbcG9zXSA9ICc8c3BhbiBzdHlsZT1cIicrc3R5bGVCZWdpbitjb2xvcisnXCIgJytkYXRhKyc+ICc7XG5cdFx0XHRcdFx0cm93W3Bvc10gKz0gc3BhY2VBZnRlcjtcblx0XHRcdFx0XHRyb3dbcG9zXSArPSAnPC9zcGFuPic7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHBvcyA9PSByZWdpb24uZW5kICkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJzxzcGFuIHN0eWxlPVwiJytzdHlsZUVuZCtjb2xvcisnIFwiICcrZGF0YSsnPiAnO1xuXHRcdFx0XHRcdC8vcm93W3Bvc10gKz0gc3BhY2VBZnRlcjtcblx0XHRcdFx0XHRyb3dbcG9zXSArPSAnPC9zcGFuPic7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHBvcyA+IHJlZ2lvbi5zdGFydCAmJiBwb3MgPCByZWdpb24uZW5kICkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJzxzcGFuIHN0eWxlPVwiJytzdHlsZU9uK2NvbG9yKydcIiAnK2RhdGErJz4gJztcblx0XHRcdFx0XHRyb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9ICc8L3NwYW4+Jztcblx0XHRcdFx0fSBlbHNlIGlmICghcm93W3Bvc10pIHtcblx0XHRcdFx0XHRyb3dbcG9zXSA9ICcgJztcblx0XHRcdFx0XHRyb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG4gICAgICAgXHR2YXIgc3RyID0gcm93LmpvaW4oXCJcIik7XG4gICAgXHRcbiAgICBcdHJldHVybiAoIHN0ci5pbmRleE9mKFwic3BhblwiKSA9PSAtMSApPyBcIlwiIDogc3RyO1xuICAgIH0sXG4gICAgLyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3UmF3XG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UgdXNpbmcgUkFXIGZvcm1hdC4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAtXG4gICAgICovXG5cdF9kcmF3UmF3IDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBhID0gdGhpcy5vcHQuc2VxdWVuY2UudG9Mb3dlckNhc2UoKS5zcGxpdCgnJyk7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciBhcnIgPSBbXTtcblx0XHR2YXIgcHJlID0galF1ZXJ5KCc8cHJlPjwvcHJlPicpLmFwcGVuZFRvKHRoaXMuX2NvbnRlbnREaXYpO1xuXHRcdFxuXHRcdC8qIENvcnJlY3QgY29sdW1uIHNpemUgaW4gY2FzZSB0aGUgc2VxdWVuY2UgaXMgYXMgc21hbGwgcGVwdGlkZSAqL1xuXHRcdHZhciBudW1Db2xzID0gdGhpcy5vcHQuY29sdW1ucy5zaXplO1xuXHRcdGlmICggdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoIDwgdGhpcy5vcHQuY29sdW1ucy5zaXplICkge1xuXHRcdFx0bnVtQ29scyA9IHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aDtcdFxuXHRcdH1cblxuXHRcdHZhciBvcHQgPSB7XG5cdFx0XHRudW1Db2xzOiBudW1Db2xzXG5cdFx0fTtcblx0XHRcblx0XHRwcmUuaHRtbChcblx0XHRcdHRoaXMuX2RyYXdTZXF1ZW5jZShhLCBvcHQpXG5cdFx0KTtcblx0XHRcblx0XHR0aGlzLl9kcmF3QW5ub3RhdGlvbnMob3B0KTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3UHJpZGVcbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZXF1ZW5jZSB1c2luZyBQUklERSBmb3JtYXQuICBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogLVxuICAgICAqL1xuXHRfZHJhd1ByaWRlIDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBhID0gdGhpcy5vcHQuc2VxdWVuY2UudG9VcHBlckNhc2UoKS5zcGxpdCgnJyk7XG5cdFx0dmFyIHByZSA9IGpRdWVyeSgnPHByZT48L3ByZT4nKS5hcHBlbmRUbyh0aGlzLl9jb250ZW50RGl2KTtcblx0XHRcblx0XHQvKiBDb3JyZWN0IGNvbHVtbiBzaXplIGluIGNhc2UgdGhlIHNlcXVlbmNlIGlzIGFzIHNtYWxsIHBlcHRpZGUgKi9cblx0XHR2YXIgbnVtQ29scyA9IHRoaXMub3B0LmNvbHVtbnMuc2l6ZTtcblx0XHRpZiAoIHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aCA8IHRoaXMub3B0LmNvbHVtbnMuc2l6ZSApIHtcblx0XHRcdG51bUNvbHMgPSB0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGg7XHRcblx0XHR9XG5cdFxuXHRcdG9wdCA9IHtcblx0XHRcdG51bUxlZnQ6IHRydWUsXG5cdFx0XHRudW1MZWZ0U2l6ZTogNSxcblx0XHRcdG51bUxlZnRQYWQ6JzAnLFxuXHRcdFx0bnVtUmlnaHQ6IHRydWUsXG5cdFx0XHRudW1SaWdodFNpemU6IDUsXG5cdFx0XHRudW1SaWdodFBhZDogJzAnLFxuXHRcdFx0bnVtQ29sczogbnVtQ29scyxcblx0XHQgICAgbnVtQ29sc0ZvclNwYWNlOiBzZWxmLm9wdC5jb2x1bW5zLnNwYWNlZEVhY2hcblx0XHR9O1xuXHRcdFxuXHRcdHByZS5odG1sKFxuXHRcdFx0dGhpcy5fZHJhd1NlcXVlbmNlKGEsIG9wdClcblx0XHQpO1xuXHRcdFxuXHRcdHRoaXMuX2RyYXdBbm5vdGF0aW9ucyhvcHQpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2RyYXdTZXF1ZW5jZVxuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBjdXJyZW50IHNlcXVlbmNlIHVzaW5nIENVU1RPTSBmb3JtYXQuICBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogICBhIC0+IHtjaGFyW119IGEgVGhlIHNlcXVlbmNlIHN0cmFuZC5cbiAgICAgKiBcdFx0XHQgb3B0IC0+IHtPYmplY3R9IG9wdCBUaGUgQ1VTVE9NIGZvcm1hdC5cbiAgICAgKi9cblx0X2RyYXdTZXF1ZW5jZSA6IGZ1bmN0aW9uKGEsIG9wdCkge1xuXHRcdHZhciBidWZmID0gW107XG5cblx0XHR2YXIgc3BhY2VTdHlsZSA9ICBcIndoaXRlLXNwYWNlOiBwcmU7XCI7XG5cdFx0XG5cdFx0Ly8gSW5kZXggYXQgdG9wP1xuXHRcdGlmKCBvcHQubnVtVG9wIClcblx0XHR7XG4gICAgICBidWZmLnB1c2goJzxzcGFuIHN0eWxlPVwiJywgc3BhY2VTdHlsZSwgJ1wiIGNsYXNzPVwibnVtVG9wXCI+Jyk7XG5cdFx0XHR2YXIgc2l6ZSA9IChvcHQuc3BhY2VCZXR3ZWVuQ2hhcnMpPyBvcHQubnVtVG9wRWFjaCoyOiBvcHQubnVtVG9wRWFjaDtcblx0XHRcdFxuXHRcdFx0aWYgKG9wdC5udW1MZWZ0KSB7XG5cdFx0XHRcdGJ1ZmYucHVzaCh0aGlzLl9mb3JtYXRJbmRleCgnICcsIG9wdC5udW1MZWZ0U2l6ZSwgJyAnKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGJ1ZmYucHVzaCh0aGlzLl9mb3JtYXRJbmRleCgnICcsIHNpemUsICcgJykpO1xuXHRcdFx0XG5cdFx0XHRmb3IodmFyIHggPSBvcHQubnVtVG9wRWFjaDsgeCA8IG9wdC5udW1Db2xzOyB4ICs9IG9wdC5udW1Ub3BFYWNoKSB7XG5cdFx0XHRcdGJ1ZmYucHVzaCh0aGlzLl9mb3JtYXRJbmRleCh4LCBzaXplLCAnICcsIHRydWUpKTtcblx0XHRcdH1cblx0XHRcdGJ1ZmYucHVzaCgnPC9zcGFuPjxici8+Jyk7XG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdC8vIEluZGV4IGF0IHRoZSBsZWZ0P1xuXHRcdGlmIChvcHQubnVtTGVmdCkge1xuXHRcdFx0YnVmZi5wdXNoKHRoaXMuX2Zvcm1hdEluZGV4KDEsIG9wdC5udW1MZWZ0U2l6ZSwgb3B0Lm51bUxlZnRQYWQpLCAnICAnKTtcblx0XHR9XG5cblx0XHR2YXIgaj0xO1xuXHRcdGZvciAodmFyIGk9MTsgaSA8PSBhLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGlmKCBpICUgb3B0Lm51bUNvbHMgPT09IDApIHtcdFxuXHRcdFx0XHRidWZmLnB1c2goJzxzcGFuIGNsYXNzPVwic2VxdWVuY2VcIiBpZD1cIicsIHRoaXMuZ2V0SWQoKSwgJ18nLCBpLCAnXCI+JywgYVtpLTFdLCAnPC9zcGFuPicpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKG9wdC5udW1SaWdodCkge1xuXHRcdFx0XHRcdGJ1ZmYucHVzaCgnPHNwYW4gc3R5bGU9XCInLCBzcGFjZVN0eWxlLCAnXCIgaWQ9XCJudW1SaWdodF8nLCB0aGlzLmdldElkKCksICdfJywgaSwgJ1wiPicpO1xuICAgICAgICAgIGJ1ZmYucHVzaCgnICAnKTtcblx0XHRcdFx0XHRidWZmLnB1c2godGhpcy5fZm9ybWF0SW5kZXgoaSwgb3B0Lm51bVJpZ2h0U2l6ZSwgb3B0Lm51bVJpZ2h0UGFkKSk7XG4gICAgICAgICAgYnVmZi5wdXNoKCc8L3NwYW4+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGJ1ZmYucHVzaCgnPGJyLz4nKTtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBhYVJlbWFpbmluZyA9IGEubGVuZ3RoIC0gaTtcblx0XHRcdFx0aWYgKG9wdC5udW1MZWZ0ICYmIGFhUmVtYWluaW5nID4gMCkge1xuXHRcdFx0XHRcdGJ1ZmYucHVzaCgnPHNwYW4gaWQ9XCJudW1MZWZ0XycsIHRoaXMuZ2V0SWQoKSwgJ18nLCBpLCAnXCI+Jyk7XG5cdFx0XHRcdFx0YnVmZi5wdXNoKHRoaXMuX2Zvcm1hdEluZGV4KGkrMSwgb3B0Lm51bUxlZnRTaXplLCBvcHQubnVtTGVmdFBhZCkpO1xuXHRcdFx0XHRcdGJ1ZmYucHVzaCgnICA8L3NwYW4+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGogPSAxO1xuXHRcdFx0XHRcblx0XHRcdH0gZWxzZSB7XG4gICAgICAgIGJ1ZmYucHVzaCgnPHNwYW4gY2xhc3M9XCJzZXF1ZW5jZVwiJyk7XG4gICAgICAgIGJ1ZmYucHVzaCgnIHN0eWxlPVwiJywgc3BhY2VTdHlsZSwgJ1wiJyk7XG4gICAgICAgIGJ1ZmYucHVzaCgnIGlkPVwiJywgdGhpcy5nZXRJZCgpLCAnXycsIGksICdcIj4nLCBhW2ktMV0pO1xuICAgICAgICBidWZmLnB1c2goaiAlIG9wdC5udW1Db2xzRm9yU3BhY2UgPT09IDAgPyAnICcgOiAnJyk7XG4gICAgICAgIGJ1ZmYucHVzaChvcHQuc3BhY2VCZXR3ZWVuQ2hhcnMgPyAnICcgOiAnJyk7XG4gICAgICAgIGJ1ZmYucHVzaCgnPC9zcGFuPicpO1xuICAgICAgICBqKys7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGJ1ZmYucHVzaCgnPGJyLz4nKTtcblx0XHRcdFxuXHRcdGlmIChqUXVlcnkuYnJvd3Nlci5tc2llKSB7XG4gICAgICByZXR1cm4gXCI8cHJlPlwiICsgYnVmZi5qb2luKCcnKSArIFwiPC9wcmU+XCI7XG5cdFx0fVx0ZWxzZSB7XG4gICAgICByZXR1cm4gYnVmZi5qb2luKCcnKTtcbiAgICB9XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fZm9ybWF0SW5kZXhcbiAgICAgKiBQdXJwb3NlOiAgQnVpbGQgdGhlIEhUTUwgY29ycmVzcG9uZGluZyB0byBjb3VudGluZyBudW1iZXJzICh0b3AsIGxlZnQsIHJpZ2h0KSBpbiB0aGUgc3RyYW5kLlxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAgIG51bWJlciAtPiB7aW50fSBUaGUgbnVtYmVyIFxuICAgICAqIFx0XHRcdCBzaXplIC0+IHtpbnR9IE51bWJlciBvZiBiaW5zIHRvIHN1aXQgdGhlIG51bWJlci5cbiAgICAgKiBcdFx0XHQgZmlsbGluZ0NoYXIgLT4ge2NoYXJ9IENoYXJhY3RlciB0byBiZSB1c2VkIGZvciBmaWxsaW5nIG91dCBibGFuayBiaW5zLlxuICAgICAqIFx0XHRcdCBhbGlnbkxlZnQgLT4ge2Jvb2x9IFRlbGwgaWYgYWxpZ25lZCB0byB0aGUgbGVmdC5cbiAgICAgKi9cblx0X2Zvcm1hdEluZGV4IDogZnVuY3Rpb24oIG51bWJlciwgc2l6ZSwgZmlsbGluZ0NoYXIsIGFsaWduTGVmdCkge1xuXHRcdHZhciBzdHIgPSBudW1iZXIudG9TdHJpbmcoKTtcblx0XHR2YXIgZmlsbGluZyA9ICcnO1xuXHRcdHZhciBwYWRkaW5nID0gc2l6ZSAtIHN0ci5sZW5ndGg7XHRcblx0XHRpZiAoIHBhZGRpbmcgPiAwICkge1xuXHRcdFx0d2hpbGUgKCBwYWRkaW5nLS0gPiAwICkge1xuXHRcdFx0XHRmaWxsaW5nICs9IChcIjxzcGFuPlwiK2ZpbGxpbmdDaGFyK1wiPC9zcGFuPlwiKTtcblx0XHRcdH1cblx0XHRcdGlmIChhbGlnbkxlZnQpe1xuXHRcdFx0XHRzdHIgPSBudW1iZXIrZmlsbGluZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0ciA9IGZpbGxpbmcrbnVtYmVyO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RyO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2FkZFNwYW5FdmVudHNcbiAgICAgKiBQdXJwb3NlOiAgQWRkIHRoZSBldmVudCBoYW5kbGVycyB0byB0aGUgc3RyYW5kLlxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAgIC1cbiAgICAgKi9cblx0X2FkZFNwYW5FdmVudHMgOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIGlzTW91c2VEb3duID0gZmFsc2U7XG5cdFx0dmFyIGN1cnJlbnRQb3M7XG5cblx0XHRzZWxmLl9jb250ZW50RGl2LmZpbmQoJy5zZXF1ZW5jZScpLmVhY2goIGZ1bmN0aW9uICgpIHtcdFxuXHRcdFx0XG5cdFx0XHQvLyBSZWdpc3RlciB0aGUgc3RhcnRpbmcgcG9zaXRpb25cblx0XHRcdGpRdWVyeSh0aGlzKS5tb3VzZWRvd24oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpZCA9IGpRdWVyeSh0aGlzKS5hdHRyKCdpZCcpO1xuXHRcdFx0XHRjdXJyZW50UG9zID0gcGFyc2VJbnQoaWQuc3Vic3RyKGlkLmluZGV4T2YoXCJfXCIpICsgMSkpO1xuXHRcdFx0XHRjbGlja1BvcyA9IGN1cnJlbnRQb3M7XG5cdFx0XHRcdHNlbGYuX3NldFNlbGVjdGlvbihjbGlja1BvcyxjdXJyZW50UG9zKTtcblx0XHRcdFx0aXNNb3VzZURvd24gPSB0cnVlO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gU2VsZWN0aW9uIGlzIGhhcHBlbmluZywgcmFpc2UgYW4gZXZlbnRcblx0XHRcdFx0c2VsZi50cmlnZ2VyKFxuXHRcdFx0XHRcdEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFLCBcblx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0XCJzdGFydFwiIDogc2VsZi5vcHQuc2VsZWN0aW9uLnN0YXJ0LCBcblx0XHRcdFx0XHRcdFwiZW5kXCIgOiBzZWxmLm9wdC5zZWxlY3Rpb24uZW5kIFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdFxuXHRcdFx0fSkubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBVcGRhdGUgc2VsZWN0aW9uXG5cdFx0XHRcdC8vIFNob3cgdG9vbHRpcCBjb250YWluaW5nIHRoZSBwb3NpdGlvblxuXHRcdFx0XHR2YXIgaWQgPSBqUXVlcnkodGhpcykuYXR0cignaWQnKTtcblx0XHRcdFx0Y3VycmVudFBvcyA9IHBhcnNlSW50KGlkLnN1YnN0cihpZC5pbmRleE9mKFwiX1wiKSArIDEpKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKGlzTW91c2VEb3duKSB7XG5cdFx0XHRcdFx0aWYoIGN1cnJlbnRQb3MgPiBjbGlja1BvcyApIHtcblx0XHRcdFx0XHRcdHNlbGYuX3NldFNlbGVjdGlvbihjbGlja1BvcywgY3VycmVudFBvcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGYuX3NldFNlbGVjdGlvbihjdXJyZW50UG9zLCBjbGlja1Bvcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIFNlbGVjdGlvbiBpcyBoYXBwZW5pbmcsIHJhaXNlIGFuIGV2ZW50XG5cdFx0XHRcdFx0c2VsZi50cmlnZ2VyKCBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSwgeyBcblx0XHRcdFx0XHRcdFwic3RhcnRcIiA6IHNlbGYub3B0LnNlbGVjdGlvbi5zdGFydCwgXG5cdFx0XHRcdFx0XHRcImVuZFwiIDogc2VsZi5vcHQuc2VsZWN0aW9uLmVuZCBcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBcblx0XHRcdFx0XG5cdFx0XHR9KS5tb3VzZXVwKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpc01vdXNlRG93biA9IGZhbHNlO1xuXHRcdFx0XHQvLyBTZWxlY3Rpb24gaXMgZG9uZSwgcmFpc2UgYW4gZXZlbnRcblx0XHRcdFx0c2VsZi50cmlnZ2VyKCBFVlRfT05fU0VMRUNUSU9OX0NIQU5HRUQsIHsgXG5cdFx0XHRcdFx0XCJzdGFydFwiIDogc2VsZi5vcHQuc2VsZWN0aW9uLnN0YXJ0LCBcblx0XHRcdFx0XHRcImVuZFwiIDogc2VsZi5vcHQuc2VsZWN0aW9uLmVuZCBcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly8gQWRkIGEgdG9vbHRpcCBmb3IgdGhpcyBzZXF1ZW5jZSBiYXNlLlxuXHRcdFx0c2VsZi5fYWRkVG9vbFRpcC5jYWxsKCBzZWxmLCB0aGlzLCBmdW5jdGlvbiggKSB7XG5cdFx0XHRcdGlmIChpc01vdXNlRG93bikge1xuXHQgICAgIFx0XHRcdHJldHVybiBcIltcIiArIHNlbGYub3B0LnNlbGVjdGlvbi5zdGFydCArXCIsIFwiICsgc2VsZi5vcHQuc2VsZWN0aW9uLmVuZCArIFwiXVwiO1xuXHQgICAgIFx0XHR9IGVsc2Uge1xuXHQgICAgIFx0XHRcdHJldHVybiBjdXJyZW50UG9zO1xuXHQgICAgIFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdH0pXG5cdFx0LmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9hZGRUb29sdGlwXG4gICAgICogUHVycG9zZTogIEFkZCBhIHRvb2x0aXAgYXJvdW5kIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQgcHJvdmlkZWQgYXMgYXJndW1lbnRcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogICB0YXJnZXQgLT4ge0VsZW1lbnR9IERPTSBlbGVtZW50IHdpY2ggaXMgdGhlIHRhcmdldGVkIGZvY3VzIGZvciB0aGUgdG9vbHRpcC5cbiAgICAgKiBcdFx0XHQgY2JHZXRNZXNzYWdlRnVuY3Rpb24gLT4ge2Z1bmN0aW9ufSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpY2ggcmV0dXJucyB0aGUgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRpcC5cbiAgICAgKi9cblx0X2FkZFRvb2xUaXAgOiBmdW5jdGlvbiAoIHRhcmdldCwgY2JHZXRNZXNzYWdlRnVuY3Rpb24gKSB7XG5cdFx0XG4gXHRcdHZhciB0aXBJZCA9ICcjc2VxdWVuY2VUaXAnICsgdGhpcy5nZXRJZCgpO1xuXHRcdFxuXHRcdGpRdWVyeSh0YXJnZXQpLm1vdXNlb3ZlcihmdW5jdGlvbihlKSB7XG5cdFx0XHRcblx0IFx0XHR2YXIgb2Zmc2V0ID0galF1ZXJ5KGUudGFyZ2V0KS5vZmZzZXQoKTtcblxuXHRcdFx0aWYgKCAhIGpRdWVyeSggdGlwSWQgKS5pcygnOnZpc2libGUnKSApIHtcblx0XHQgICAgICAgIGpRdWVyeSggdGlwSWQgKSBcblx0XHQgICAgICAgIFx0LmNzcyh7XG5cdFx0ICAgICAgICBcdFx0J2JhY2tncm91bmQtY29sb3InOiBcIiMwMDBcIixcblx0XHQgICAgICAgIFx0XHQncGFkZGluZyc6IFwiM3B4IDEwcHggM3B4IDEwcHhcIixcblx0XHQgICAgICAgIFx0XHQndG9wJzogb2Zmc2V0LnRvcCArIGpRdWVyeShlLnRhcmdldCkuaGVpZ2h0KCkgKyBcInB4XCIsXG5cdFx0ICAgICAgICBcdFx0J2xlZnQnOiBvZmZzZXQubGVmdCArIGpRdWVyeShlLnRhcmdldCkud2lkdGgoKSArIFwicHhcIlxuXHRcdCAgICAgICAgXHR9KVxuXHRcdFx0ICAgICAgICAuYW5pbWF0ZSgge29wYWNpdHk6ICcwLjg1J30sIDEwKVxuXHRcdFx0ICAgICAgICAuaHRtbCggY2JHZXRNZXNzYWdlRnVuY3Rpb24uY2FsbCggdGFyZ2V0ICkgKVxuXHRcdFx0ICAgICAgICAuc2hvdygpO1xuXHRcdFx0fVxuXG5cdCAgICB9KS5tb3VzZW91dChmdW5jdGlvbigpIHtcblx0ICAgICAgICAvL1JlbW92ZSB0aGUgYXBwZW5kZWQgdG9vbHRpcCB0ZW1wbGF0ZVxuXHQgICAgICAgIGpRdWVyeSggdGlwSWQgKS5oaWRlKCk7XHQgICAgICAgICBcblx0ICAgIH0pO1xuXHR9LFxuXHRcbiAgIC8qKlxuICAgICogQW5ub3RhdGUgYSBzZXQgb2YgaW50ZXJ2YWxzIHByb3ZpZGVkIGluIHRoZSBhcmd1bWVudC5cblx0KiBcblx0KiBAZGVwcmVjYXRlZCBVc2UgYWRkQW5ub3RhdGlvbigpIGluc3RlYWQuXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbm5vdGF0aW9uIFRoZSBpbnRlcnZhbHMgYmVsb25naW5nIHRvIHRoZSBzYW1lIGFubm90YXRpb24uIFxuICAgICogU3ludGF4OiB7IG5hbWU6ICZsdDt2YWx1ZSZndDssIGNvbG9yOiAmbHQ7SFRNTENvbG9yQ29kZSZndDssIGh0bWw6ICZsdDtIVE1MU3RyaW5nJmd0OywgcmVnaW9uczogW3sgc3RhcnQ6ICZsdDtzdGFydFZhbDEmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWwxJmd0O30sIC4uLiwgIHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0O31dIH1cbiAgICAqL1xuXHRzZXRBbm5vdGF0aW9uOiBmdW5jdGlvbiAoIGFubm90YXRpb24gKSB7XG5cdFx0dGhpcy5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBBbm5vdGF0ZSBhIHNldCBvZiBpbnRlcnZhbHMgcHJvdmlkZWQgaW4gdGhlIGFyZ3VtZW50LlxuICAgICogXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gQW5ub3RhdGlvbnMgdXNpbmcgcmVnaW9ucyB3aXRoIGRpZmZlcmVudCBjb2xvcnMuXG4gICAgKiBteVNlcXVlbmNlLmFkZEFubm90YXRpb24oe1xuXHQqICAgIG5hbWU6XCJVTklQUk9UXCIsIFxuXHQqICAgIGh0bWw6XCImbHQ7YnImZ3Q7IEV4YW1wbGUgb2YgJmx0O2ImZ3Q7SFRNTCZsdDsvYiZndDtcIiwgXG5cdCogICAgY29sb3I6XCJncmVlblwiLCBcblx0KiAgICByZWdpb25zOiBbXG5cdCogICAgICAge3N0YXJ0OiA1NDAsIGVuZDogNTYwfSxcblx0KiAgICAgICB7c3RhcnQ6IDU2MSwgZW5kOjU4MCwgY29sb3I6IFwiI0ZGQTAxMFwifSwgXG5cdCogICAgICAge3N0YXJ0OiA1ODEsIGVuZDo1OTAsIGNvbG9yOiBcInJlZFwifSwgXG5cdCogICAgICAge3N0YXJ0OiA2OTAsIGVuZDo3MTB9XVxuXHQqIH0pO1xuXHQqIFxuICAgICogXG4gICAgKiBAcGFyYW0ge09iamVjdH0gYW5ub3RhdGlvbiBUaGUgaW50ZXJ2YWxzIGJlbG9uZ2luZyB0byB0aGUgc2FtZSBhbm5vdGF0aW9uLiBcbiAgICAqIFN5bnRheDogeyBuYW1lOiAmbHQ7dmFsdWUmZ3Q7LCBjb2xvcjogJmx0O0hUTUxDb2xvckNvZGUmZ3Q7LCBodG1sOiAmbHQ7SFRNTFN0cmluZyZndDssIHJlZ2lvbnM6IFt7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDt9LCAuLi4sICB7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDt9XSB9XG4gICAgKi9cblx0YWRkQW5ub3RhdGlvbjogZnVuY3Rpb24gKCBhbm5vdGF0aW9uICkge1xuXHRcdHRoaXMuX2Fubm90YXRpb25zLnB1c2goYW5ub3RhdGlvbik7XG5cdFx0dGhpcy5fcmVkcmF3KCk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIFJlbW92ZXMgYW4gYW5ub3RhdGlvbiBieSBtZWFucyBvZiBpdHMgbmFtZS5cbiAgICAqIFxuICAgICogQGV4YW1wbGUgXG4gICAgKiAvLyBSZW1vdmUgdGhlIFVOSVBST1QgYW5ub3RhdGlvbi5cbiAgICAqIG15U2VxdWVuY2UucmVtb3ZlQW5ub3RhdGlvbignVU5JUFJPVCcpOyBcbiAgICAqIFxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGFubm90YXRpb24gdG8gYmUgcmVtb3ZlZC5cbiAgICAqIFxuICAgICovXG5cdHJlbW92ZUFubm90YXRpb246IGZ1bmN0aW9uICggbmFtZSApIHtcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLl9hbm5vdGF0aW9ucy5sZW5ndGggOyBpKysgKXtcblx0XHRcdGlmKG5hbWUgIT0gdGhpcy5fYW5ub3RhdGlvbnNbaV0ubmFtZSl7XG5cdFx0XHRcdHRoaXMuX2Fubm90YXRpb25zLnNwbGljZShpLDEpO1xuXHRcdFx0XHR0aGlzLl9yZWRyYXcoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHQvKipcbiAgICAqIFJlbW92ZXMgYWxsIHRoZSBjdXJyZW50IGFubm90YXRpb25zLlxuICAgICogXG4gICAgKiBAZXhhbXBsZSBcbiAgICAqIG15U2VxdWVuY2UucmVtb3ZlQWxsQW5ub3RhdGlvbnMoKTsgXG4gICAgKiBcbiAgICAqL1xuXHRyZW1vdmVBbGxBbm5vdGF0aW9uczogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2Fubm90YXRpb25zID0gW107XG5cdFx0dGhpcy5fcmVkcmF3KCk7XG5cdH0sXG5cblx0XG59KTtcblxucmVxdWlyZShcImJpb2pzLWV2ZW50c1wiKS5taXhpbihTZXF1ZW5jZS5wcm90b3R5cGUpO1xubW9kdWxlLmV4cG9ydHMgPSBTZXF1ZW5jZTtcbiIsInZhciBldmVudHMgPSByZXF1aXJlKFwiYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmVcIik7XG5cbmV2ZW50cy5vbkFsbCA9IGZ1bmN0aW9uKGNhbGxiYWNrLGNvbnRleHQpe1xuICB0aGlzLm9uKFwiYWxsXCIsIGNhbGxiYWNrLGNvbnRleHQpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIE1peGluIHV0aWxpdHlcbmV2ZW50cy5vbGRNaXhpbiA9IGV2ZW50cy5taXhpbjtcbmV2ZW50cy5taXhpbiA9IGZ1bmN0aW9uKHByb3RvKSB7XG4gIGV2ZW50cy5vbGRNaXhpbihwcm90byk7XG4gIC8vIGFkZCBjdXN0b20gb25BbGxcbiAgdmFyIGV4cG9ydHMgPSBbJ29uQWxsJ107XG4gIGZvcih2YXIgaT0wOyBpIDwgZXhwb3J0cy5sZW5ndGg7aSsrKXtcbiAgICB2YXIgbmFtZSA9IGV4cG9ydHNbaV07XG4gICAgcHJvdG9bbmFtZV0gPSB0aGlzW25hbWVdO1xuICB9XG4gIHJldHVybiBwcm90bztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRzO1xuIiwiLyoqXG4gKiBTdGFuZGFsb25lIGV4dHJhY3Rpb24gb2YgQmFja2JvbmUuRXZlbnRzLCBubyBleHRlcm5hbCBkZXBlbmRlbmN5IHJlcXVpcmVkLlxuICogRGVncmFkZXMgbmljZWx5IHdoZW4gQmFja29uZS91bmRlcnNjb3JlIGFyZSBhbHJlYWR5IGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudFxuICogZ2xvYmFsIGNvbnRleHQuXG4gKlxuICogTm90ZSB0aGF0IGRvY3Mgc3VnZ2VzdCB0byB1c2UgdW5kZXJzY29yZSdzIGBfLmV4dGVuZCgpYCBtZXRob2QgdG8gYWRkIEV2ZW50c1xuICogc3VwcG9ydCB0byBzb21lIGdpdmVuIG9iamVjdC4gQSBgbWl4aW4oKWAgbWV0aG9kIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBFdmVudHNcbiAqIHByb3RvdHlwZSB0byBhdm9pZCB1c2luZyB1bmRlcnNjb3JlIGZvciB0aGF0IHNvbGUgcHVycG9zZTpcbiAqXG4gKiAgICAgdmFyIG15RXZlbnRFbWl0dGVyID0gQmFja2JvbmVFdmVudHMubWl4aW4oe30pO1xuICpcbiAqIE9yIGZvciBhIGZ1bmN0aW9uIGNvbnN0cnVjdG9yOlxuICpcbiAqICAgICBmdW5jdGlvbiBNeUNvbnN0cnVjdG9yKCl7fVxuICogICAgIE15Q29uc3RydWN0b3IucHJvdG90eXBlLmZvbyA9IGZ1bmN0aW9uKCl7fVxuICogICAgIEJhY2tib25lRXZlbnRzLm1peGluKE15Q29uc3RydWN0b3IucHJvdG90eXBlKTtcbiAqXG4gKiAoYykgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBJbmMuXG4gKiAoYykgMjAxMyBOaWNvbGFzIFBlcnJpYXVsdFxuICovXG4vKiBnbG9iYWwgZXhwb3J0czp0cnVlLCBkZWZpbmUsIG1vZHVsZSAqL1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgcm9vdCA9IHRoaXMsXG4gICAgICBicmVha2VyID0ge30sXG4gICAgICBuYXRpdmVGb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2gsXG4gICAgICBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgIGlkQ291bnRlciA9IDA7XG5cbiAgLy8gUmV0dXJucyBhIHBhcnRpYWwgaW1wbGVtZW50YXRpb24gbWF0Y2hpbmcgdGhlIG1pbmltYWwgQVBJIHN1YnNldCByZXF1aXJlZFxuICAvLyBieSBCYWNrYm9uZS5FdmVudHNcbiAgZnVuY3Rpb24gbWluaXNjb3JlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBrZXlzOiBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIiB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwia2V5cygpIGNhbGxlZCBvbiBhIG5vbi1vYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSwga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGtleXNba2V5cy5sZW5ndGhdID0ga2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgIH0sXG5cbiAgICAgIHVuaXF1ZUlkOiBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICAgICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gICAgICB9LFxuXG4gICAgICBoYXM6IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgICAgIH0sXG5cbiAgICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG4gICAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopID09PSBicmVha2VyKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBvbmNlOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHZhciByYW4gPSBmYWxzZSwgbWVtbztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChyYW4pIHJldHVybiBtZW1vO1xuICAgICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICBmdW5jID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIF8gPSBtaW5pc2NvcmUoKSwgRXZlbnRzO1xuXG4gIC8vIEJhY2tib25lLkV2ZW50c1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBBIG1vZHVsZSB0aGF0IGNhbiBiZSBtaXhlZCBpbiB0byAqYW55IG9iamVjdCogaW4gb3JkZXIgdG8gcHJvdmlkZSBpdCB3aXRoXG4gIC8vIGN1c3RvbSBldmVudHMuIFlvdSBtYXkgYmluZCB3aXRoIGBvbmAgb3IgcmVtb3ZlIHdpdGggYG9mZmAgY2FsbGJhY2tcbiAgLy8gZnVuY3Rpb25zIHRvIGFuIGV2ZW50OyBgdHJpZ2dlcmAtaW5nIGFuIGV2ZW50IGZpcmVzIGFsbCBjYWxsYmFja3MgaW5cbiAgLy8gc3VjY2Vzc2lvbi5cbiAgLy9cbiAgLy8gICAgIHZhciBvYmplY3QgPSB7fTtcbiAgLy8gICAgIF8uZXh0ZW5kKG9iamVjdCwgQmFja2JvbmUuRXZlbnRzKTtcbiAgLy8gICAgIG9iamVjdC5vbignZXhwYW5kJywgZnVuY3Rpb24oKXsgYWxlcnQoJ2V4cGFuZGVkJyk7IH0pO1xuICAvLyAgICAgb2JqZWN0LnRyaWdnZXIoJ2V4cGFuZCcpO1xuICAvL1xuICBFdmVudHMgPSB7XG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi4gUGFzc2luZyBgXCJhbGxcImAgd2lsbCBiaW5kXG4gICAgLy8gdGhlIGNhbGxiYWNrIHRvIGFsbCBldmVudHMgZmlyZWQuXG4gICAgb246IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb24nLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdIHx8ICh0aGlzLl9ldmVudHNbbmFtZV0gPSBbXSk7XG4gICAgICBldmVudHMucHVzaCh7Y2FsbGJhY2s6IGNhbGxiYWNrLCBjb250ZXh0OiBjb250ZXh0LCBjdHg6IGNvbnRleHQgfHwgdGhpc30pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gb25seSBiZSB0cmlnZ2VyZWQgYSBzaW5nbGUgdGltZS4gQWZ0ZXIgdGhlIGZpcnN0IHRpbWVcbiAgICAvLyB0aGUgY2FsbGJhY2sgaXMgaW52b2tlZCwgaXQgd2lsbCBiZSByZW1vdmVkLlxuICAgIG9uY2U6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb25jZScsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgb25jZSA9IF8ub25jZShmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5vZmYobmFtZSwgb25jZSk7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICAgIG9uY2UuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBvbmNlLCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIG9uZSBvciBtYW55IGNhbGxiYWNrcy4gSWYgYGNvbnRleHRgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIHdpdGggdGhhdCBmdW5jdGlvbi4gSWYgYGNhbGxiYWNrYCBpcyBudWxsLCByZW1vdmVzIGFsbFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgdGhlIGV2ZW50LiBJZiBgbmFtZWAgaXMgbnVsbCwgcmVtb3ZlcyBhbGwgYm91bmRcbiAgICAvLyBjYWxsYmFja3MgZm9yIGFsbCBldmVudHMuXG4gICAgb2ZmOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgdmFyIHJldGFpbiwgZXYsIGV2ZW50cywgbmFtZXMsIGksIGwsIGosIGs7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhZXZlbnRzQXBpKHRoaXMsICdvZmYnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSkgcmV0dXJuIHRoaXM7XG4gICAgICBpZiAoIW5hbWUgJiYgIWNhbGxiYWNrICYmICFjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogXy5rZXlzKHRoaXMuX2V2ZW50cyk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgaWYgKGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdO1xuICAgICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICBldiA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrLl9jYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVHJpZ2dlciBvbmUgb3IgbWFueSBldmVudHMsIGZpcmluZyBhbGwgYm91bmQgY2FsbGJhY2tzLiBDYWxsYmFja3MgYXJlXG4gICAgLy8gcGFzc2VkIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBgdHJpZ2dlcmAgaXMsIGFwYXJ0IGZyb20gdGhlIGV2ZW50IG5hbWVcbiAgICAvLyAodW5sZXNzIHlvdSdyZSBsaXN0ZW5pbmcgb24gYFwiYWxsXCJgLCB3aGljaCB3aWxsIGNhdXNlIHlvdXIgY2FsbGJhY2sgdG9cbiAgICAvLyByZWNlaXZlIHRoZSB0cnVlIG5hbWUgb2YgdGhlIGV2ZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCkuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAndHJpZ2dlcicsIG5hbWUsIGFyZ3MpKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICB2YXIgYWxsRXZlbnRzID0gdGhpcy5fZXZlbnRzLmFsbDtcbiAgICAgIGlmIChldmVudHMpIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzKTtcbiAgICAgIGlmIChhbGxFdmVudHMpIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFRlbGwgdGhpcyBvYmplY3QgdG8gc3RvcCBsaXN0ZW5pbmcgdG8gZWl0aGVyIHNwZWNpZmljIGV2ZW50cyAuLi4gb3JcbiAgICAvLyB0byBldmVyeSBvYmplY3QgaXQncyBjdXJyZW50bHkgbGlzdGVuaW5nIHRvLlxuICAgIHN0b3BMaXN0ZW5pbmc6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgZGVsZXRlTGlzdGVuZXIgPSAhbmFtZSAmJiAhY2FsbGJhY2s7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICBpZiAob2JqKSAobGlzdGVuZXJzID0ge30pW29iai5fbGlzdGVuZXJJZF0gPSBvYmo7XG4gICAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgbGlzdGVuZXJzW2lkXS5vZmYobmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICBpZiAoZGVsZXRlTGlzdGVuZXIpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbaWRdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gc3BsaXQgZXZlbnQgc3RyaW5ncy5cbiAgdmFyIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy87XG5cbiAgLy8gSW1wbGVtZW50IGZhbmN5IGZlYXR1cmVzIG9mIHRoZSBFdmVudHMgQVBJIHN1Y2ggYXMgbXVsdGlwbGUgZXZlbnRcbiAgLy8gbmFtZXMgYFwiY2hhbmdlIGJsdXJcImAgYW5kIGpRdWVyeS1zdHlsZSBldmVudCBtYXBzIGB7Y2hhbmdlOiBhY3Rpb259YFxuICAvLyBpbiB0ZXJtcyBvZiB0aGUgZXhpc3RpbmcgQVBJLlxuICB2YXIgZXZlbnRzQXBpID0gZnVuY3Rpb24ob2JqLCBhY3Rpb24sIG5hbWUsIHJlc3QpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNwYWNlIHNlcGFyYXRlZCBldmVudCBuYW1lcy5cbiAgICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBbbmFtZXNbaV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gQSBkaWZmaWN1bHQtdG8tYmVsaWV2ZSwgYnV0IG9wdGltaXplZCBpbnRlcm5hbCBkaXNwYXRjaCBmdW5jdGlvbiBmb3JcbiAgLy8gdHJpZ2dlcmluZyBldmVudHMuIFRyaWVzIHRvIGtlZXAgdGhlIHVzdWFsIGNhc2VzIHNwZWVkeSAobW9zdCBpbnRlcm5hbFxuICAvLyBCYWNrYm9uZSBldmVudHMgaGF2ZSAzIGFyZ3VtZW50cykuXG4gIHZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gICAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgpOyByZXR1cm47XG4gICAgICBjYXNlIDE6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7IHJldHVybjtcbiAgICAgIGNhc2UgMjogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7IHJldHVybjtcbiAgICAgIGNhc2UgMzogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpOyByZXR1cm47XG4gICAgICBkZWZhdWx0OiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbGlzdGVuTWV0aG9kcyA9IHtsaXN0ZW5UbzogJ29uJywgbGlzdGVuVG9PbmNlOiAnb25jZSd9O1xuXG4gIC8vIEludmVyc2lvbi1vZi1jb250cm9sIHZlcnNpb25zIG9mIGBvbmAgYW5kIGBvbmNlYC4gVGVsbCAqdGhpcyogb2JqZWN0IHRvXG4gIC8vIGxpc3RlbiB0byBhbiBldmVudCBpbiBhbm90aGVyIG9iamVjdCAuLi4ga2VlcGluZyB0cmFjayBvZiB3aGF0IGl0J3NcbiAgLy8gbGlzdGVuaW5nIHRvLlxuICBfLmVhY2gobGlzdGVuTWV0aG9kcywgZnVuY3Rpb24oaW1wbGVtZW50YXRpb24sIG1ldGhvZCkge1xuICAgIEV2ZW50c1ttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCAodGhpcy5fbGlzdGVuZXJzID0ge30pO1xuICAgICAgdmFyIGlkID0gb2JqLl9saXN0ZW5lcklkIHx8IChvYmouX2xpc3RlbmVySWQgPSBfLnVuaXF1ZUlkKCdsJykpO1xuICAgICAgbGlzdGVuZXJzW2lkXSA9IG9iajtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIG9ialtpbXBsZW1lbnRhdGlvbl0obmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWxpYXNlcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIEV2ZW50cy5iaW5kICAgPSBFdmVudHMub247XG4gIEV2ZW50cy51bmJpbmQgPSBFdmVudHMub2ZmO1xuXG4gIC8vIE1peGluIHV0aWxpdHlcbiAgRXZlbnRzLm1peGluID0gZnVuY3Rpb24ocHJvdG8pIHtcbiAgICB2YXIgZXhwb3J0cyA9IFsnb24nLCAnb25jZScsICdvZmYnLCAndHJpZ2dlcicsICdzdG9wTGlzdGVuaW5nJywgJ2xpc3RlblRvJyxcbiAgICAgICAgICAgICAgICAgICAnbGlzdGVuVG9PbmNlJywgJ2JpbmQnLCAndW5iaW5kJ107XG4gICAgXy5lYWNoKGV4cG9ydHMsIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHByb3RvW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gcHJvdG87XG4gIH07XG5cbiAgLy8gRXhwb3J0IEV2ZW50cyBhcyBCYWNrYm9uZUV2ZW50cyBkZXBlbmRpbmcgb24gY3VycmVudCBjb250ZXh0XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRXZlbnRzO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gRXZlbnRzO1xuICAgIH1cbiAgICBleHBvcnRzLkJhY2tib25lRXZlbnRzID0gRXZlbnRzO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuQmFja2JvbmVFdmVudHMgPSBFdmVudHM7XG4gIH1cbn0pKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vanF1ZXJ5LmJyb3dzZXInKTtcbiIsIi8qIVxuICogalF1ZXJ5IEJyb3dzZXIgUGx1Z2luIHYwLjAuNlxuICogaHR0cHM6Ly9naXRodWIuY29tL2dhYmNlYi9qcXVlcnktYnJvd3Nlci1wbHVnaW5cbiAqXG4gKiBPcmlnaW5hbCBqcXVlcnktYnJvd3NlciBjb2RlIENvcHlyaWdodCAyMDA1LCAyMDEzIGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBNb2RpZmljYXRpb25zIENvcHlyaWdodCAyMDEzIEdhYnJpZWwgQ2VicmlhblxuICogaHR0cHM6Ly9naXRodWIuY29tL2dhYmNlYlxuICpcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTMtMDctMjlUMTc6MjM6MjctMDc6MDBcbiAqL1xuXG5cbnZhciBtYXRjaGVkLCBicm93c2VyO1xuXG52YXIgdWFNYXRjaCA9IGZ1bmN0aW9uKCB1YSApIHtcbiAgdWEgPSB1YS50b0xvd2VyQ2FzZSgpO1xuXG4gIHZhciBtYXRjaCA9IC8ob3ByKVtcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgLyhjaHJvbWUpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgLyh2ZXJzaW9uKVsgXFwvXShbXFx3Ll0rKS4qKHNhZmFyaSlbIFxcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAvKHdlYmtpdClbIFxcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAvKG9wZXJhKSg/Oi4qdmVyc2lvbnwpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgLyhtc2llKSAoW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICB1YS5pbmRleE9mKFwidHJpZGVudFwiKSA+PSAwICYmIC8ocnYpKD86OnwgKShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgIHVhLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCAmJiAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKCB1YSApIHx8XG4gICAgW107XG5cbiAgdmFyIHBsYXRmb3JtX21hdGNoID0gLyhpcGFkKS8uZXhlYyggdWEgKSB8fFxuICAgIC8oaXBob25lKS8uZXhlYyggdWEgKSB8fFxuICAgIC8oYW5kcm9pZCkvLmV4ZWMoIHVhICkgfHxcbiAgICAvKHdpbmRvd3MgcGhvbmUpLy5leGVjKCB1YSApIHx8XG4gICAgLyh3aW4pLy5leGVjKCB1YSApIHx8XG4gICAgLyhtYWMpLy5leGVjKCB1YSApIHx8XG4gICAgLyhsaW51eCkvLmV4ZWMoIHVhICkgfHxcbiAgICAvKGNyb3MpL2kuZXhlYyggdWEgKSB8fFxuICAgIFtdO1xuXG4gIHJldHVybiB7XG4gICAgYnJvd3NlcjogbWF0Y2hbIDMgXSB8fCBtYXRjaFsgMSBdIHx8IFwiXCIsXG4gICAgdmVyc2lvbjogbWF0Y2hbIDIgXSB8fCBcIjBcIixcbiAgICBwbGF0Zm9ybTogcGxhdGZvcm1fbWF0Y2hbIDAgXSB8fCBcIlwiXG4gIH07XG59O1xuXG5tYXRjaGVkID0gdWFNYXRjaCggd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgKTtcbmJyb3dzZXIgPSB7fTtcbmJyb3dzZXIudWFNYXRjaCA9IHVhTWF0Y2g7XG5cbmlmICggbWF0Y2hlZC5icm93c2VyICkge1xuICBicm93c2VyWyBtYXRjaGVkLmJyb3dzZXIgXSA9IHRydWU7XG4gIGJyb3dzZXIudmVyc2lvbiA9IG1hdGNoZWQudmVyc2lvbjtcbiAgYnJvd3Nlci52ZXJzaW9uTnVtYmVyID0gcGFyc2VJbnQobWF0Y2hlZC52ZXJzaW9uKTtcbn1cblxuaWYgKCBtYXRjaGVkLnBsYXRmb3JtICkge1xuICBicm93c2VyWyBtYXRjaGVkLnBsYXRmb3JtIF0gPSB0cnVlO1xufVxuXG4vLyBUaGVzZSBhcmUgYWxsIGNvbnNpZGVyZWQgbW9iaWxlIHBsYXRmb3JtcywgbWVhbmluZyB0aGV5IHJ1biBhIG1vYmlsZSBicm93c2VyXG5pZiAoIGJyb3dzZXIuYW5kcm9pZCB8fCBicm93c2VyLmlwYWQgfHwgYnJvd3Nlci5pcGhvbmUgfHwgYnJvd3NlclsgXCJ3aW5kb3dzIHBob25lXCIgXSApIHtcbiAgYnJvd3Nlci5tb2JpbGUgPSB0cnVlO1xufVxuXG4vLyBUaGVzZSBhcmUgYWxsIGNvbnNpZGVyZWQgZGVza3RvcCBwbGF0Zm9ybXMsIG1lYW5pbmcgdGhleSBydW4gYSBkZXNrdG9wIGJyb3dzZXJcbmlmICggYnJvd3Nlci5jcm9zIHx8IGJyb3dzZXIubWFjIHx8IGJyb3dzZXIubGludXggfHwgYnJvd3Nlci53aW4gKSB7XG4gIGJyb3dzZXIuZGVza3RvcCA9IHRydWU7XG59XG5cbi8vIENocm9tZSwgT3BlcmEgMTUrIGFuZCBTYWZhcmkgYXJlIHdlYmtpdCBiYXNlZCBicm93c2Vyc1xuaWYgKCBicm93c2VyLmNocm9tZSB8fCBicm93c2VyLm9wciB8fCBicm93c2VyLnNhZmFyaSApIHtcbiAgYnJvd3Nlci53ZWJraXQgPSB0cnVlO1xufVxuXG4vLyBJRTExIGhhcyBhIG5ldyB0b2tlbiBzbyB3ZSB3aWxsIGFzc2lnbiBpdCBtc2llIHRvIGF2b2lkIGJyZWFraW5nIGNoYW5nZXNcbmlmICggYnJvd3Nlci5ydiApXG57XG4gIHZhciBpZSA9IFwibXNpZVwiO1xuXG4gIG1hdGNoZWQuYnJvd3NlciA9IGllO1xuICBicm93c2VyW2llXSA9IHRydWU7XG59XG5cbi8vIE9wZXJhIDE1KyBhcmUgaWRlbnRpZmllZCBhcyBvcHJcbmlmICggYnJvd3Nlci5vcHIgKVxue1xuICB2YXIgb3BlcmEgPSBcIm9wZXJhXCI7XG5cbiAgbWF0Y2hlZC5icm93c2VyID0gb3BlcmE7XG4gIGJyb3dzZXJbb3BlcmFdID0gdHJ1ZTtcbn1cblxuLy8gU3RvY2sgQW5kcm9pZCBicm93c2VycyBhcmUgbWFya2VkIGFzIFNhZmFyaSBvbiBBbmRyb2lkLlxuaWYgKCBicm93c2VyLnNhZmFyaSAmJiBicm93c2VyLmFuZHJvaWQgKVxue1xuICB2YXIgYW5kcm9pZCA9IFwiYW5kcm9pZFwiO1xuXG4gIG1hdGNoZWQuYnJvd3NlciA9IGFuZHJvaWQ7XG4gIGJyb3dzZXJbYW5kcm9pZF0gPSB0cnVlO1xufVxuXG4vLyBBc3NpZ24gdGhlIG5hbWUgYW5kIHBsYXRmb3JtIHZhcmlhYmxlXG5icm93c2VyLm5hbWUgPSBtYXRjaGVkLmJyb3dzZXI7XG5icm93c2VyLnBsYXRmb3JtID0gbWF0Y2hlZC5wbGF0Zm9ybTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGJyb3dzZXI7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4vKiogQHByZXNlcnZlIGh0dHA6Ly9naXRodWIuY29tL2Vhc2V3YXkvanMtY2xhc3MgKi9cblxuLy8gQ2xhc3MgRGVmaW5pdGlvbiB1c2luZyBFQ01BNSBwcm90b3R5cGUgY2hhaW5cblxuZnVuY3Rpb24gaW5oZXJpdChkZXN0LCBzcmMsIG5vUGFyZW50KSB7XG4gICAgd2hpbGUgKHNyYyAmJiBzcmMgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3JjKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAobmFtZSAhPSAnLmNsYXNzJyAmJiAhZGVzdC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzcmMsIG5hbWUpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBuYW1lLCBkZXNjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChub1BhcmVudCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3JjID0gc3JjLl9fcHJvdG9fXztcbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG59XG5cbnZhciBDbGFzcyA9IGZ1bmN0aW9uIChiYXNlLCBwcm90bywgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YoYmFzZSkgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zID0gcHJvdG87XG4gICAgICAgIHByb3RvID0gYmFzZTtcbiAgICAgICAgYmFzZSA9IE9iamVjdDtcbiAgICB9XG4gICAgaWYgKCFwcm90bykge1xuICAgICAgICBwcm90byA9IHt9O1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBcbiAgICB2YXIgbWV0YSA9IHtcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBiYXNlOiBiYXNlLFxuICAgICAgICBpbXBsZW1lbnRzOiBbXVxuICAgIH1cbiAgICB2YXIgY2xhc3NQcm90byA9IENsYXNzLmNsb25lKHByb3RvKTtcbiAgICBpZiAob3B0aW9ucy5pbXBsZW1lbnRzKSB7XG4gICAgICAgIChBcnJheS5pc0FycmF5KG9wdGlvbnMuaW1wbGVtZW50cykgPyBvcHRpb25zLmltcGxlbWVudHMgOiBbb3B0aW9ucy5pbXBsZW1lbnRzXSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChpbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGltcGxlbWVudGVkVHlwZSkgPT0gJ2Z1bmN0aW9uJyAmJiBpbXBsZW1lbnRlZFR5cGUucHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGEuaW1wbGVtZW50cy5wdXNoKGltcGxlbWVudGVkVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIENsYXNzLmV4dGVuZChjbGFzc1Byb3RvLCBpbXBsZW1lbnRlZFR5cGUucHJvdG90eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xhc3NQcm90by5fX3Byb3RvX18gPSBiYXNlLnByb3RvdHlwZTtcbiAgICB2YXIgdGhlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YodGhpcy5jb25zdHJ1Y3RvcikgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBtZXRhLnR5cGUgPSB0aGVDbGFzcztcbiAgICB0aGVDbGFzcy5wcm90b3R5cGUgPSBjbGFzc1Byb3RvO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGVDbGFzcywgJy5jbGFzcy5tZXRhJywgeyB2YWx1ZTogbWV0YSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NQcm90bywgJy5jbGFzcycsIHsgdmFsdWU6IHRoZUNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuICAgIGlmIChvcHRpb25zLnN0YXRpY3MpIHtcbiAgICAgICAgQ2xhc3MuZXh0ZW5kKHRoZUNsYXNzLCBvcHRpb25zLnN0YXRpY3MpO1xuICAgIH1cbiAgICByZXR1cm4gdGhlQ2xhc3M7XG59O1xuXG5DbGFzcy5leHRlbmQgPSBpbmhlcml0O1xuXG5DbGFzcy5jbG9uZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gaW5oZXJpdCh7fSwgb2JqZWN0KTtcbn07XG5cbmZ1bmN0aW9uIGZpbmRUeXBlKG1ldGEsIHR5cGUpIHtcbiAgICB3aGlsZSAobWV0YSkge1xuICAgICAgICBpZiAobWV0YS50eXBlLnByb3RvdHlwZSA9PT0gdHlwZS5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgaW4gbWV0YS5pbXBsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgaW1wbFR5cGUgPSBtZXRhLmltcGxlbWVudHNbaV07XG4gICAgICAgICAgICB2YXIgaW1wbE1ldGEgPSBpbXBsVHlwZVsnLmNsYXNzLm1ldGEnXTtcbiAgICAgICAgICAgIGlmIChpbXBsTWV0YSkge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kVHlwZShpbXBsTWV0YSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm90byA9IGltcGxUeXBlLnByb3RvdHlwZTsgcHJvdG87IHByb3RvID0gcHJvdG8uX19wcm90b19fKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm90byA9PT0gdHlwZS5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1ldGEgPSBtZXRhLmJhc2UgPyBtZXRhLmJhc2VbJy5jbGFzcy5tZXRhJ10gOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIENoZWNrZXIgPSBDbGFzcyh7XG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgfSxcbiAgICBcbiAgICB0eXBlT2Y6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtZXRhID0gQ2xhc3MudHlwZUluZm8odGhpcy5vYmplY3QpO1xuICAgICAgICByZXR1cm4gbWV0YSAmJiBmaW5kVHlwZShtZXRhLCB0eXBlKTtcbiAgICB9XG59KTtcblxuLy8gYWxpYXNlc1xuQ2hlY2tlci5wcm90b3R5cGUuYSA9IENoZWNrZXIucHJvdG90eXBlLnR5cGVPZjtcbkNoZWNrZXIucHJvdG90eXBlLmFuID0gQ2hlY2tlci5wcm90b3R5cGUudHlwZU9mO1xuXG5DbGFzcy5pcyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IENoZWNrZXIob2JqZWN0KTtcbn07XG5cbkNsYXNzLnR5cGVJbmZvID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciB0aGVDbGFzcyA9IG9iamVjdC5fX3Byb3RvX19bJy5jbGFzcyddO1xuICAgIHJldHVybiB0aGVDbGFzcyA/IHRoZUNsYXNzWycuY2xhc3MubWV0YSddIDogdW5kZWZpbmVkO1xufTtcblxuQ2xhc3MuVkVSU0lPTiA9IFswLCAwLCAyXTtcblxuaWYgKG1vZHVsZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQ2xhc3M7XG59IGVsc2Uge1xuICAgIGdsb2JhbC5DbGFzcyA9IENsYXNzOyAgIC8vIGZvciBicm93c2VyXG59XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9pbmRleFwiKTtcbiJdfQ==
