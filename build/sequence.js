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

var EVT_ON_SELECTION_CHANGE= "onSelectionChange";
var EVT_ON_SELECTION_CHANGED= "onSelectionChanged";
var EVT_ON_ANNOTATION_CLICKED= "onAnnotationClicked";

Sequence = Class(
/** @lends Sequence# */
{	
	constructor: function (options) {
		var self = this;

    this.opt = jQuery.extend(this.opt,options);

		this._container = jQuery( "#" + this.opt.target );
		
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
    	
    	var message = undefined;
    		
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
		
		if ( h instanceof Object && h.start <= h.end ) {
			
			color = ( "string" == typeof h.color )? h.color : this.opt.highlightFontColor;
			background = ( "string" == typeof h.background )? h.background : this.opt.highlightBackgroundColor;
			id = ( "string" == typeof h.id )? h.id : (new Number(this._highlightsCount++)).toString();
			
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
		var h = this._highlights;
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

		if ( change.start != undefined ) {
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
		
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre style="white-space:pre"></pre>').appendTo(this._contentDiv);

		var i = 0;
		var str = 'ENTRY           ' + this.opt.id + '<br/>';
		str += 'SEQUENCE<br/>';
		if ( this.opt.formatOptions !== undefined ){
			if(this.opt.formatOptions.title !== undefined ){
				if (this.opt.formatOptions.title == false) {
					str = '';
				}			
			}
		} 
		
		/* Correct column size in case the sequence is as small peptide */
		var numCols = this.opt.columns.size;
		if ( this.opt.sequence.length < this.opt.columns.size ) {
			numCols = this.opt.sequence.length;	
		}
		
		var opt = {
				numLeft: true,
				numLeftSize: 7,
				numLeftPad:' ',
				numTop: true,
				numTopEach: 5,
				numCols: numCols,
			    numColsForSpace: 0,
			    spaceBetweenChars: true
		};
		
		str += this._drawSequence(a, opt);
		
		var footer = '<br/>///';
		if (this.opt.formatOptions !== undefined) {
			if (this.opt.formatOptions.footer !== undefined) {
				if (this.opt.formatOptions.footer == false) {
					footer = '';
				}
			}
		}
		str += footer;
		pre.html(str);
		
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
				jQuery(row).insertAfter('div#'+self.opt.target+' div pre span#numRight_' + this.getId() + '_' + (i + numCols) );
			} else {
				jQuery(row).insertAfter('div#'+self.opt.target+' div pre span#'+ this.getId() + '_' + (i + numCols) );
			}
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
		    		var name = undefined;
		    		var id = jQuery(e.target).attr("id");
		    		for(var i =0; i < self._annotations.length;i++){
              if(self._annotations[i].id == id){
                name = self._annotations[i].name;
                continue;
              }
            }
		    	self.trigger( EVT_ON_ANNOTATION_CLICKED, {
	    		"name": name,
		    		//"pos": parseInt( jQuery(e.target).attr("pos") )
		    	});
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
				spaceAfter += (pos % settings.numColsForSpace == 0 )? ' ' : '';
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
		var str = '';

		var spaceStyle =  "white-space: pre;";
		
		// Index at top?
		if( opt.numTop )
		{
			str += '<span style="'+spaceStyle+'" class="numTop">'
			var size = (opt.spaceBetweenChars)? opt.numTopEach*2: opt.numTopEach;
			
			if (opt.numLeft) {
				str += this._formatIndex(' ', opt.numLeftSize, ' ');
			}
			
			str += this._formatIndex(' ', size, ' ');
			
			for(var x = opt.numTopEach; x < opt.numCols; x += opt.numTopEach) {
				str += this._formatIndex(x, size, ' ', true);
			}
			str += '</span><br/>'
		}
		
		
		// Index at the left?
		if (opt.numLeft) {
			str += this._formatIndex(1, opt.numLeftSize, opt.numLeftPad);
			str += '  ';
		}

		var j=1;
		for (var i=1; i <= a.length; i++) {

			if( i % opt.numCols == 0) {	
				str += '<span class="sequence" id="' + this.getId() + '_' + i + '">' + a[i-1] + '</span>';
				
				if (opt.numRight) {
					str += '<span style="'+spaceStyle+'" id="numRight_' + this.getId() + '_' + i + '">';
					str += '  ';
					str += this._formatIndex(i, opt.numRightSize, opt.numRightPad);	
					str += '</span>';
				}
				
				str += '<br/>';
				
				var aaRemaining = a.length - i;
				if (opt.numLeft && aaRemaining > 0) {
					str += '<span id="numLeft_' + this.getId() + '_' + i + '">';
					str += this._formatIndex(i+1, opt.numLeftSize, opt.numLeftPad);
					str += '  ';
					str += '</span>';
				}
				
				j = 1;
				
			} else {
                str += '<span class="sequence" style="'+spaceStyle+'" id="' + this.getId() + '_' + i + '">' + a[i-1];
				str += ( j % opt.numColsForSpace == 0)? ' ' : '';
				str += (opt.spaceBetweenChars)? ' ' : '';
				str += '</span>';
				j++;
			}
		}
		
		str += '<br/>'	
			
		if (jQuery.browser.msie) {
			str = "<pre>" + str + "</pre>";
		}	
			
		return str;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL2xpYi9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9pbmRleC5qcyIsIi9ob21lL2FsZXgvcHJvamVjdHMvamF2YXNjcmlwdC9iaW9qcy12aXMtc2VxdWVuY2Uvbm9kZV9tb2R1bGVzL2Jpb2pzLWV2ZW50cy9ub2RlX21vZHVsZXMvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUvYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUuanMiLCIvaG9tZS9hbGV4L3Byb2plY3RzL2phdmFzY3JpcHQvYmlvanMtdmlzLXNlcXVlbmNlL25vZGVfbW9kdWxlcy9iaW9qcy1ldmVudHMvbm9kZV9tb2R1bGVzL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanF1ZXJ5LWJyb3dzZXItcGx1Z2luL2luZGV4LmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanF1ZXJ5LWJyb3dzZXItcGx1Z2luL2pxdWVyeS5icm93c2VyLmpzIiwiL2hvbWUvYWxleC9wcm9qZWN0cy9qYXZhc2NyaXB0L2Jpb2pzLXZpcy1zZXF1ZW5jZS9ub2RlX21vZHVsZXMvanMtY2xhc3MvY2xhc3MuanMiLCIuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvNENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JSQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGxlZ2FjeSEhXG4kLmJyb3dzZXIgPSByZXF1aXJlKFwianF1ZXJ5LWJyb3dzZXItcGx1Z2luXCIpO1xuXG4vKiogXG4gKiBTZXF1ZW5jZSBjb21wb25lbnQgXG4gKiBcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQmlvanNcbiAqIFxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmpvaG5jYXJAZ21haWwuY29tXCI+Sm9obiBHb21lejwvYT4sIDxhIGhyZWY9XCJtYWlsdG86c2VjZXZhbGxpdkBnbWFpbC5jb21cIj5Kb3NlIFZpbGxhdmVjZXM8L2E+XG4gKiBAdmVyc2lvbiAxLjAuMFxuICogQGNhdGVnb3J5IDNcbiAqIFxuICogQHJlcXVpcmVzIDxhIGhyZWY9J2h0dHA6Ly9ibG9nLmpxdWVyeS5jb20vMjAxMS8wOS8xMi9qcXVlcnktMS02LTQtcmVsZWFzZWQvJz5qUXVlcnkgQ29yZSAxLjYuNDwvYT5cbiAqIEBkZXBlbmRlbmN5IDxzY3JpcHQgbGFuZ3VhZ2U9XCJKYXZhU2NyaXB0XCIgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIi4uL2Jpb2pzL2RlcGVuZGVuY2llcy9qcXVlcnkvanF1ZXJ5LTEuNC4yLm1pbi5qc1wiPjwvc2NyaXB0PlxuICogXG4gKiBAcmVxdWlyZXMgPGEgaHJlZj0naHR0cDovL2pxdWVyeXVpLmNvbS9kb3dubG9hZCc+alF1ZXJ5IFVJIDEuOC4xNjwvYT5cbiAqIEBkZXBlbmRlbmN5IDxzY3JpcHQgbGFuZ3VhZ2U9XCJKYXZhU2NyaXB0XCIgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIi4uL2Jpb2pzL2RlcGVuZGVuY2llcy9qcXVlcnkvanF1ZXJ5LXVpLTEuOC4yLmN1c3RvbS5taW4uanNcIj48L3NjcmlwdD5cbiAqXG4gKiBAcmVxdWlyZXMgPGEgaHJlZj0nQmlvanMuVG9vbHRpcC5jc3MnPkJpb2pzLlRvb2x0aXA8L2E+XG4gKiBAZGVwZW5kZW5jeSA8c2NyaXB0IGxhbmd1YWdlPVwiSmF2YVNjcmlwdFwiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCJzcmMvQmlvanMuVG9vbHRpcC5qc1wiPjwvc2NyaXB0PlxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBBbiBvYmplY3Qgd2l0aCB0aGUgb3B0aW9ucyBmb3IgU2VxdWVuY2UgY29tcG9uZW50LlxuICogICAgXG4gKiBAb3B0aW9uIHtzdHJpbmd9IHRhcmdldCBcbiAqICAgIElkZW50aWZpZXIgb2YgdGhlIERJViB0YWcgd2hlcmUgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzcGxheWVkLlxuICogICAgXG4gKiBAb3B0aW9uIHtzdHJpbmd9IHNlcXVlbmNlIFxuICogICAgVGhlIHNlcXVlbmNlIHRvIGJlIGRpc3BsYXllZC5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSBbaWRdIFxuICogICAgU2VxdWVuY2UgaWRlbnRpZmllciBpZiBhcHBseS5cbiAqICAgIFxuICogQG9wdGlvbiB7c3RyaW5nfSBbZm9ybWF0PVwiRkFTVEFcIl0gXG4gKiAgICBUaGUgZGlzcGxheSBmb3JtYXQgZm9yIHRoZSBzZXF1ZW5jZSByZXByZXNlbnRhdGlvbi5cbiAqICAgIFxuICogQG9wdGlvbiB7T2JqZWN0W119IFtoaWdobGlnaHRzXSBcbiAqIFx0ICBGb3IgaGlnaGxpZ2h0aW5nIG11bHRpcGxlIHJlZ2lvbnMuIFxuICogICAgPHByZSBjbGFzcz1cImJydXNoOiBqc1wiIHRpdGxlPVwiU3ludGF4OlwiPiBcbiAqICAgIFtcbiAqICAgIFx0Ly8gSGlnaGxpZ2h0IGFtaW5vYWNpZHMgZnJvbSAnc3RhcnQnIHRvICdlbmQnIG9mIHRoZSBjdXJyZW50IHN0cmFuZCB1c2luZyB0aGUgc3BlY2lmaWVkICdjb2xvcicgKG9wdGlvbmFsKSBhbmQgJ2JhY2tncm91bmQnIChvcHRpb25hbCkuXG4gKiAgICBcdHsgc3RhcnQ6ICZsdDtzdGFydFZhbDEmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWwxJmd0OyBbLCBpZDombHQ7aWRWYWwxJmd0O10gWywgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7XSBbLCBiYWNrZ3JvdW5kOiAmbHQ7SFRNTENvbG9yJmd0O119LCBcbiAqICAgIFx0Ly9cbiAqICAgIFx0Ly8gQW55IG90aGVycyBoaWdobGlnaHRzXG4gKiAgICBcdC4uLiwgIFxuICogICAgXHQvLyBcbiAqICAgIFx0eyBzdGFydDogJmx0O3N0YXJ0VmFsTiZndDssIGVuZDogJmx0O2VuZFZhbE4mZ3Q7IFssIGlkOiZsdDtpZFZhbE4mZ3Q7XSBbLCBjb2xvcjogJmx0O0hUTUxDb2xvciZndDtdIFssIGJhY2tncm91bmQ6ICZsdDtIVE1MQ29sb3ImZ3Q7XX1cbiAqICAgIF08L3ByZT5cbiAqIFxuICogPHByZSBjbGFzcz1cImJydXNoOiBqc1wiIHRpdGxlPVwiRXhhbXBsZTpcIj4gXG4gKiBoaWdobGlnaHRzIDogW1xuICogXHRcdHsgc3RhcnQ6MzAsIGVuZDo0MiwgY29sb3I6XCJ3aGl0ZVwiLCBiYWNrZ3JvdW5kOlwiZ3JlZW5cIiwgaWQ6XCJzcGluMVwiIH0sXG4gKlx0XHR7IHN0YXJ0OjEzOSwgZW5kOjE0MCB9LCBcbiAqXHRcdHsgc3RhcnQ6NjMxLCBlbmQ6NjMzLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJibHVlXCIgfVxuICpcdF1cbiAqIDwvcHJlPlxuICogXG4gKiBAb3B0aW9uIHtPYmplY3R9IFtjb2x1bW5zPXtzaXplOjQwLHNwYWNlZEVhY2g6MTB9XSBcbiAqIFx0ICBPcHRpb25zIGZvciBkaXNwbGF5aW5nIHRoZSBjb2x1bW5zLiBTeW50YXg6IHsgc2l6ZTogJmx0O251bUNvbHMmZ3Q7LCBzcGFjZWRFYWNoOiAmbHQ7bnVtQ29scyZndDt9XG4gKiBcbiAqIEBvcHRpb24ge09iamVjdH0gW3NlbGVjdGlvbl0gXG4gKiBcdCAgUG9zaXRpb25zIGZvciB0aGUgY3VycmVudCBzZWxlY3RlZCByZWdpb24uIFN5bnRheDogeyBzdGFydDogJmx0O3N0YXJ0VmFsdWUmZ3Q7LCBlbmQ6ICZsdDtlbmRWYWx1ZSZndDt9XG4gKiBcbiAqIEBvcHRpb24ge09iamVjdFtdfSBbYW5ub3RhdGlvbnNdIFxuICogICAgU2V0IG9mIG92ZXJsYXBwaW5nIGFubm90YXRpb25zLiBNdXN0IGJlIGFuIGFycmF5IG9mIG9iamVjdHMgZm9sbG93aW5nIHRoZSBzeW50YXg6XG4gKiAgICAgXHRcdDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIlN5bnRheDpcIj5cbiAqICAgICAgICAgICAgWyBcbiAqICAgICAgICAgICAgICAvLyBBbiBhbm5vdGF0aW9uOlxuICogICAgICAgICAgICAgIHsgbmFtZTogJmx0O25hbWUmZ3Q7LCBcbiAqICAgICAgICAgICAgICAgIGh0bWw6ICZsdDttZXNzYWdlJmd0OywgXG4gKiAgICAgICAgICAgICAgICBjb2xvcjogJmx0O2NvbG9yX2NvZGUmZ3Q7LCBcbiAqICAgICAgICAgICAgICAgIHJlZ2lvbnM6IFt7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDsgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7fSwgLi4uLHsgc3RhcnQ6ICZsdDtzdGFydFZhbE4mZ3Q7LCBlbmQ6ICZsdDtlbmRWYWxOJmd0OywgY29sb3I6ICZsdDtIVE1MQ29sb3ImZ3Q7fV0gXG4gKiAgICAgICAgICAgICAgfSwgXG4gKiAgICAgICAgICAgICAgXG4gKiAgICAgICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICAgICAgLy8gbW9yZSBhbm5vdGF0aW9ucyBoZXJlIFxuICogICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICBdXG4gKiAgICBcdFx0IDwvcHJlPlxuICogICAgd2hlcmU6XG4gKiAgICAgIDx1bD5cbiAqICAgICAgICA8bGk+PGI+bmFtZTwvYj4gaXMgdGhlIHVuaXF1ZSBuYW1lIGZvciB0aGUgYW5ub3RhdGlvbjwvbGk+XG4gKiAgICAgICAgPGxpPjxiPmh0bWw8L2I+IGlzIHRoZSBtZXNzYWdlIChjYW4gYmUgSFRNTCkgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB0b29sIHRpcC48L2xpPlxuICogICAgICAgIDxsaT48Yj5jb2xvcjwvYj4gaXMgdGhlIGRlZmF1bHQgSFRNTCBjb2xvciBjb2RlIGZvciBhbGwgdGhlIHJlZ2lvbnMuPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uczwvYj4gYXJyYXkgb2Ygb2JqZWN0cyBkZWZpbmluZyB0aGUgaW50ZXJ2YWxzIHdoaWNoIGJlbG9uZ3MgdG8gdGhlIGFubm90YXRpb24uPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uc1tpXS5zdGFydDwvYj4gaXMgdGhlIHN0YXJ0aW5nIGNoYXJhY3RlciBmb3IgdGhlIGktdGggaW50ZXJ2YWwuPC9saT5cbiAqICAgICAgICA8bGk+PGI+cmVnaW9uc1tpXS5lbmQ8L2I+IGlzIHRoZSBlbmRpbmcgY2hhcmFjdGVyIGZvciB0aGUgaS10aCBpbnRlcnZhbC48L2xpPlxuICogICAgICAgIDxsaT48Yj5yZWdpb25zW2ldLmNvbG9yPC9iPiBpcyBhbiBvcHRpb25hbCBjb2xvciBmb3IgdGhlIGktdGggaW50ZXJ2YWwuICAgXG4gKiAgICAgIDwvdWw+IFxuICogICAgICBcbiAqIEBvcHRpb24ge09iamVjdH0gW2Zvcm1hdE9wdGlvbnM9e3RpdGxlOnRydWUsIGZvb3Rlcjp0cnVlfV0gXG4gKiBcdCAgT3B0aW9ucyBmb3IgZGlzcGxheWluZyB0aGUgdGl0bGUuIGJ5IG5vdyBqdXN0IGFmZmVjdGluZyB0aGUgQ09EQVRBIGZvcm1hdC5cbiAqICAgIDxwcmUgY2xhc3M9XCJicnVzaDoganNcIiB0aXRsZT1cIlN5bnRheDpcIj4gXG4gKiBcdFx0Zm9ybWF0T3B0aW9ucyA6IHtcbiAqIFx0XHRcdHRpdGxlOmZhbHNlLFxuICogXHRcdFx0Zm9vdGVyOmZhbHNlXG4gKiBcdFx0fVxuICogICAgPC9wcmU+XG4gKiAgICBcbiAqIEBleGFtcGxlIFxuICogdmFyIHRoZVNlcXVlbmNlID0gXCJNRVRMQ1FSTE5WQ1FES0lMVEhZRU5EU1RETFJESElEWVdLSE1STEVDQUlZWUtBUkVNR0ZLSElOSFFWVlBUTEFWU0tOS0FMUUFJRUxRTFRMRVRJWU5TUVlTTkVLV1RMUURWU0xFVllMVEFQVEdDSUtLSEdZVFZFVlFGREdESUNOVE1IWVROV1RISVlJQ0VFQW9qcyBTVlRWVkVHUVZEWVlHTFlZVkhFR0lSVFlGVlFGS0REQUVLWVNLTktWV0VWSEFHR1FWSUxDUFRTVkZTU05FVlNTUEVJSVJRSExBTkhQQUFUSFRLQVZBTEdURUVUUVRUSVFSUFJTRVBEVEdOUENIVFRLTExIUkRTVkRTQVBJTFRBRk5TU0hLR1JJTkNOU05UVFBJVkhMS0dEQU5UTEtDTFJZUkZLS0hDVExZVEFWU1NUV0hXVEdITlZLSEtTQUlWVExUWURTRVdRUkRRRkxTUVZLSVBLVElUVlNUR0ZNU0lcIjtcbiAqIHZhciBteVNlcXVlbmNlID0gbmV3IFNlcXVlbmNlKHtcbiAqIFx0XHRzZXF1ZW5jZSA6IHRoZVNlcXVlbmNlLFxuICogXHRcdHRhcmdldCA6IFwiWW91ck93bkRpdklkXCIsXG4gKiBcdFx0Zm9ybWF0IDogJ0NPREFUQScsXG4gKiBcdFx0aWQgOiAnUDkxODI4MycsXG4gKiBcdFx0YW5ub3RhdGlvbnM6IFtcbiAqICAgICAgICB7IG5hbWU6XCJDQVRIXCIsIFxuICogXHQgIFx0XHRjb2xvcjpcIiNGMEYwMjBcIiwgXG4gKiBcdCAgXHRcdGh0bWw6IFwiVXNpbmcgY29sb3IgY29kZSAjRjBGMDIwIFwiLCBcbiAqIFx0ICBcdFx0cmVnaW9uczogW3tzdGFydDogMTIyLCBlbmQ6IDEzNX1dXG4gKiBcdFx0ICB9LFxuICogICAgICAgIHsgbmFtZTpcIlRFU1RcIiwgXG4gKiAgICAgICAgICBodG1sOlwiJmx0O2JyJmd0OyBFeGFtcGxlIG9mICZsdDtiJmd0O0hUTUwmbHQ7L2ImZ3Q7XCIsIFxuICogICAgICAgICAgY29sb3I6XCJncmVlblwiLCBcbiAqICAgICAgICAgIHJlZ2lvbnM6IFtcbiAqICAgICAgICAgICAge3N0YXJ0OiAyODUsIGVuZDogMjkyfSxcbiAqICAgICAgICAgICAge3N0YXJ0OiAyOTMsIGVuZDogMzE0LCBjb2xvcjogXCIjMkU0OTg4XCJ9XVxuICogICAgICAgIH1cbiAqICAgICAgXSxcbiAqICAgICAgaGlnaGxpZ2h0cyA6IFtcbiAqICAgICAgXHR7IHN0YXJ0OjMwLCBlbmQ6NDIsIGNvbG9yOlwid2hpdGVcIiwgYmFja2dyb3VuZDpcImdyZWVuXCIsIGlkOlwic3BpbjFcIiB9LFxuICogICAgICBcdHsgc3RhcnQ6MTM5LCBlbmQ6MTQwIH0sIFxuICogICAgICBcdHsgc3RhcnQ6NjMxLCBlbmQ6NjMzLCBjb2xvcjpcIndoaXRlXCIsIGJhY2tncm91bmQ6XCJibHVlXCIgfVxuICogICAgICBdXG4gKiB9KTtcdFxuICogXG4gKi9cblxudmFyIENsYXNzID0gcmVxdWlyZSgnanMtY2xhc3MnKTtcblxudmFyIEVWVF9PTl9TRUxFQ1RJT05fQ0hBTkdFPSBcIm9uU2VsZWN0aW9uQ2hhbmdlXCI7XG52YXIgRVZUX09OX1NFTEVDVElPTl9DSEFOR0VEPSBcIm9uU2VsZWN0aW9uQ2hhbmdlZFwiO1xudmFyIEVWVF9PTl9BTk5PVEFUSU9OX0NMSUNLRUQ9IFwib25Bbm5vdGF0aW9uQ2xpY2tlZFwiO1xuXG5TZXF1ZW5jZSA9IENsYXNzKFxuLyoqIEBsZW5kcyBTZXF1ZW5jZSMgKi9cbntcdFxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLm9wdCA9IGpRdWVyeS5leHRlbmQodGhpcy5vcHQsb3B0aW9ucyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIgPSBqUXVlcnkoIFwiI1wiICsgdGhpcy5vcHQudGFyZ2V0ICk7XG5cdFx0XG5cdFx0Ly8gTGF6eSBpbml0aWFsaXphdGlvbiBcblx0XHR0aGlzLl9jb250YWluZXIucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLl9pbml0aWFsaXplKCk7XG5cdFx0fSk7XG5cdH0sXG5cdFxuXHQvKipcblx0ICogRGVmYXVsdCB2YWx1ZXMgZm9yIHRoZSBvcHRpb25zXG5cdCAqIEBuYW1lIFNlcXVlbmNlLW9wdFxuXHQgKi9cblx0b3B0IDoge1xuXHRcdFxuXHRcdHNlcXVlbmNlIDogXCJcIixcblx0XHRpZCA6IFwiXCIsXG5cdFx0dGFyZ2V0IDogXCJcIixcblx0XHRmb3JtYXQgOiBcIkZBU1RBXCIsXG5cdFx0c2VsZWN0aW9uOiB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSxcblx0XHRjb2x1bW5zOiB7IHNpemU6IDM1LCBzcGFjZWRFYWNoOiAxMCB9LFxuXHRcdGhpZ2hsaWdodHMgOiBbXSxcblx0XHRhbm5vdGF0aW9uczogW10sXG5cdFx0c2VxdWVuY2VVcmw6ICdodHRwOi8vd3d3LmViaS5hYy51ay9kYXMtc3J2L3VuaXByb3QvZGFzL3VuaXByb3Qvc2VxdWVuY2UnLFxuXHRcdFxuXHRcdC8vIFN0eWxlcyBcblx0XHRzZWxlY3Rpb25Db2xvciA6ICdZZWxsb3cnLFxuXHRcdHNlbGVjdGlvbkZvbnRDb2xvciA6ICdibGFjaycsXG5cdFx0aGlnaGxpZ2h0Rm9udENvbG9yIDogJ3JlZCcsXG5cdFx0aGlnaGxpZ2h0QmFja2dyb3VuZENvbG9yIDogJ3doaXRlJyxcblx0XHRmb250RmFtaWx5OiAnXCJBbmRhbGUgbW9ub1wiLCBjb3VyaWVyLCBtb25vc3BhY2UnLFxuXHRcdGZvbnRTaXplOiAnMTJweCcsXG5cdFx0Zm9udENvbG9yIDogJ2luaGVyaXQnLFxuXHRcdGJhY2tncm91bmRDb2xvciA6ICdpbmhlcml0Jyxcblx0XHR3aWR0aDogdW5kZWZpbmVkLFxuXHRcdGhlaWdodDogdW5kZWZpbmVkLFxuXHRcdGZvcm1hdFNlbGVjdG9yVmlzaWJsZTogdHJ1ZVxuXHR9LFxuXHRcblx0LyoqXG5cdCAqIEFycmF5IGNvbnRhaW5pbmcgdGhlIHN1cHBvcnRlZCBldmVudCBuYW1lc1xuXHQgKiBAbmFtZSBTZXF1ZW5jZS1ldmVudFR5cGVzXG5cdCAqL1xuXHRldmVudFR5cGVzIDogW1xuXHRcdC8qKlxuXHRcdCAqIEBuYW1lIFNlcXVlbmNlI29uU2VsZWN0aW9uQ2hhbmdlZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuXHRcdCAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7aW50fSBzdGFydCBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBzdGFydCBvZiB0aGUgc2VsZWN0aW9uLlxuXHRcdCAqIEBldmVudERhdGEge2ludH0gZW5kIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIGVuZGluZyBvZiBzZWxlY3Rpb24uXG5cdFx0ICogQGV4YW1wbGUgXG5cdFx0ICogbXlTZXF1ZW5jZS5vblNlbGVjdGlvbkNoYW5nZWQoXG5cdFx0ICogICAgZnVuY3Rpb24oIG9iakV2ZW50ICkge1xuXHRcdCAqICAgICAgIGFsZXJ0KFwiU2VsZWN0ZWQ6IFwiICsgb2JqRXZlbnQuc3RhcnQgKyBcIiwgXCIgKyBvYmpFdmVudC5lbmQgKTtcblx0XHQgKiAgICB9XG5cdFx0ICogKTsgXG5cdFx0ICogXG5cdFx0ICogKi9cblx0XHRcIm9uU2VsZWN0aW9uQ2hhbmdlZFwiLFxuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lIFNlcXVlbmNlI29uU2VsZWN0aW9uQ2hhbmdlXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uUGVyZm9ybWVkIEFuIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGFuIHtAbGluayBCaW9qcy5FdmVudH0gb2JqZWN0IGFzIGFyZ3VtZW50LlxuXHRcdCAqIEBldmVudERhdGEge09iamVjdH0gc291cmNlIFRoZSBjb21wb25lbnQgd2hpY2ggZGlkIHRyaWdnZXJlZCB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7c3RyaW5nfSB0eXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtpbnR9IHN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBzZWxlY3Rpb24uXG5cdFx0ICogQGV2ZW50RGF0YSB7aW50fSBlbmQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgZW5kaW5nIG9mIHNlbGVjdGlvbi5cblx0XHQgKiBAZXhhbXBsZSBcblx0XHQgKiBteVNlcXVlbmNlLm9uU2VsZWN0aW9uQ2hhbmdlKFxuXHRcdCAqICAgIGZ1bmN0aW9uKCBvYmpFdmVudCApIHtcblx0XHQgKiAgICAgICBhbGVydChcIlNlbGVjdGlvbiBpbiBwcm9ncmVzczogXCIgKyBvYmpFdmVudC5zdGFydCArIFwiLCBcIiArIG9iakV2ZW50LmVuZCApO1xuXHRcdCAqICAgIH1cblx0XHQgKiApOyAgXG5cdFx0ICogXG5cdFx0ICogXG5cdFx0ICogKi9cblx0XHRcIm9uU2VsZWN0aW9uQ2hhbmdlXCIsXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogQG5hbWUgU2VxdWVuY2Ujb25Bbm5vdGF0aW9uQ2xpY2tlZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvblBlcmZvcm1lZCBBbiBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiB7QGxpbmsgQmlvanMuRXZlbnR9IG9iamVjdCBhcyBhcmd1bWVudC5cblx0XHQgKiBAZXZlbnREYXRhIHtPYmplY3R9IHNvdXJjZSBUaGUgY29tcG9uZW50IHdoaWNoIGRpZCB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxuXHRcdCAqIEBldmVudERhdGEge3N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG5cdFx0ICogQGV2ZW50RGF0YSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZWxlY3RlZCBhbm5vdGF0aW9uLlxuXHRcdCAqIEBldmVudERhdGEge2ludH0gcG9zIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBzZWxlY3RlZCBhbWlubyBhY2lkLlxuXHRcdCAqIEBleGFtcGxlIFxuXHRcdCAqIG15U2VxdWVuY2Uub25Bbm5vdGF0aW9uQ2xpY2tlZChcblx0XHQgKiAgICBmdW5jdGlvbiggb2JqRXZlbnQgKSB7XG5cdFx0ICogICAgICAgYWxlcnQoXCJDbGlja2VkIFwiICsgb2JqRXZlbnQubmFtZSArIFwiIG9uIHBvc2l0aW9uIFwiICsgb2JqRXZlbnQucG9zICk7XG5cdFx0ICogICAgfVxuXHRcdCAqICk7ICBcblx0XHQgKiBcblx0XHQgKiAqL1xuXHRcdFwib25Bbm5vdGF0aW9uQ2xpY2tlZFwiXG5cdF0sXG5cbiAgZ2V0SWQgOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0LmlkO1xuICB9LFxuXG5cdC8vIGludGVybmFsIG1lbWJlcnNcblx0X2hlYWRlckRpdiA6IG51bGwsXG5cdF9jb250ZW50RGl2IDogbnVsbCxcblx0XG5cdC8vIE1ldGhvZHNcblxuXHRfaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuXHRcdFxuXHRcdGlmICggdGhpcy5vcHQud2lkdGggIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lci53aWR0aCggdGhpcy5vcHQud2lkdGggKTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKCB0aGlzLm9wdC5oZWlnaHQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5oZWlnaHQoIHRoaXMub3B0LmhlaWdodCApO1xuXHRcdH1cblx0XHRcblx0XHQvLyBEaXNhYmxlIHRleHQgc2VsZWN0aW9uXG5cdFx0XG5cdFx0dGhpcy5fY29udGFpbmVyLmNzcyh7XG5cdFx0XHQnLW1vei11c2VyLXNlbGVjdCc6J25vbmUnLFxuXHRcdFx0Jy13ZWJraXQtdXNlci1zZWxlY3QnOidub25lJyxcblx0XHRcdCd1c2VyLXNlbGVjdCc6J25vbmUnXG4gICAgICAgIH0pO1xuXHRcdFxuXHRcdC8vIERJViBmb3IgdGhlIGZvcm1hdCBzZWxlY3RvclxuXHRcdHRoaXMuX2J1aWxkRm9ybWF0U2VsZWN0b3IoKTtcblx0XHRcblx0XHQvLyBESVYgZm9yIHRoZSBzZXF1ZW5jZVxuXHRcdHRoaXMuX2NvbnRlbnREaXYgPSBqUXVlcnkoJzxkaXY+PC9kaXY+JykuYXBwZW5kVG8odGhpcy5fY29udGFpbmVyKTtcblx0XHR0aGlzLl9jb250ZW50RGl2LmNzcyh7XG5cdFx0XHRcdCdmb250LWZhbWlseSc6IHRoaXMub3B0LmZvbnRGYW1pbHksXG5cdFx0XHRcdCdmb250LXNpemUnOiB0aGlzLm9wdC5mb250U2l6ZSxcblx0XHRcdFx0J3RleHQtYWxpZ24nOiAnbGVmdCdcblx0XHRcdH0pO1xuXHRcdFxuXHRcdC8vIEluaXRpYWxpemUgaGlnaGxpZ2h0aW5nIFxuXHRcdHRoaXMuX2hpZ2hsaWdodHMgPSB0aGlzLm9wdC5oaWdobGlnaHRzO1xuXHRcdFxuXHRcdC8vIEluaXRpYWxpemUgYW5ub3RhdGlvbnNcblx0XHR0aGlzLl9hbm5vdGF0aW9ucyA9IHRoaXMub3B0LmFubm90YXRpb25zO1xuXHRcdFxuXHRcdC8vSW5pdGlhbGl6ZSB0b29sdGlwXG5cdFx0alF1ZXJ5KCc8ZGl2IGlkPVwic2VxdWVuY2VUaXAnICsgdGhpcy5vcHQudGFyZ2V0LmlkICsgJ1wiPjwvZGl2PicpIFxuXHQgICAgICAgIC5jc3Moe1x0XG5cdCAgICAgICAgXHQncG9zaXRpb24nOiBcImFic29sdXRlXCIsXG5cdCAgICAgICAgXHQnei1pbmRleCc6IFwiOTk5OTk5XCIsXG5cdCAgICAgICAgXHQnY29sb3InOiBcIiNmZmZcIixcblx0ICAgICAgICBcdCdmb250LXNpemUnOiBcIjEycHhcIixcblx0ICAgICAgICBcdCd3aWR0aCc6IFwiYXV0b1wiLFxuXHQgICAgICAgIFx0J2Rpc3BsYXknOiAnbm9uZSdcblx0ICAgICAgICB9KVxuXHQgICAgICAgIC5hZGRDbGFzcyhcInRvb2x0aXBcIilcblx0ICAgICAgICAuYXBwZW5kVG8oXCJib2R5XCIpXG5cdCAgICAgICAgLmhpZGUoKTtcblxuXHRcdGlmICggKHRoaXMub3B0LnNlcXVlbmNlKSApIHtcblx0XHRcdHRoaXMuX3JlZHJhdygpO1xuXHRcdFx0XG5cdFx0fSBlbHNlIGlmICggICh0aGlzLm9wdC5pZCkgKSB7XG5cdFx0XHR0aGlzLl9yZXF1ZXN0U2VxdWVuY2UoIHRoaXMub3B0LmlkICk7XG5cdFx0XHRcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jbGVhclNlcXVlbmNlKFwiTm8gc2VxdWVuY2UgYXZhaWxhYmxlXCIsIFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCIpO1xuXHRcdH1cblx0XHRcblx0fSxcblx0XG5cdFxuXHQvKipcblx0ICogU2hvd3MgdGhlIGNvbHVtbnMgaW5kaWNhdGVkIGJ5IHRoZSBpbmRleGVzIGFycmF5LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2VxIFRoZSBzZXF1ZW5jZSBzdHJhbmQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbaWRlbnRpZmllcl0gU2VxdWVuY2UgaWRlbnRpZmllci5cblx0ICogXG5cdCAqIEBleGFtcGxlIFxuXHQgKiBteVNlcXVlbmNlLnNldFNlcXVlbmNlKFwiUDk5OTk5XCIpO1xuXHQgKiBcblx0ICovXG4gICAgc2V0U2VxdWVuY2U6IGZ1bmN0aW9uICggc2VxLCBpZGVudGlmaWVyICkge1xuXG4gICAgXHRpZiAoIHNlcS5tYXRjaCgvXihbQS1OLFItWl1bMC05XVtBLVpdW0EtWiwgMC05XVtBLVosIDAtOV1bMC05XSl8KFtPLFAsUV1bMC05XVtBLVosIDAtOV1bQS1aLCAwLTldW0EtWiwgMC05XVswLTldKShcXC5cXGQrKT8kL2kpICkge1xuICAgIFx0XHR0aGlzLl9yZXF1ZXN0U2VxdWVuY2UoIGFyZ3VtZW50c1swXSApO1xuICAgIFx0XHRcbiAgICBcdH0gZWxzZSB7XG4gICAgXHRcdHRoaXMub3B0LnNlcXVlbmNlID0gc2VxO1xuICAgICAgICBcdHRoaXMub3B0LmlkID0gaWRlbnRpZmllcjsgXG4gICAgICAgIFx0dGhpcy5faGlnaGxpZ2h0cyA9IFtdO1xuICAgIFx0XHR0aGlzLl9oaWdobGlnaHRzQ291bnQgPSAwO1xuICAgIFx0XHR0aGlzLm9wdC5zZWxlY3Rpb24gPSB7IHN0YXJ0OiAwLCBlbmQ6IDAgfTtcbiAgICBcdFx0dGhpcy5fYW5ub3RhdGlvbnMgPSBbXTtcbiAgICBcdFx0XG4gICAgXHRcdHRoaXMuX2NvbnRlbnREaXYuY2hpbGRyZW4oKS5yZW1vdmUoKTtcbiAgICBcdFx0dGhpcy5fcmVkcmF3KCk7XG4gICAgXHR9XG4gICAgfSxcbiAgICBcbiAgICBfcmVxdWVzdFNlcXVlbmNlOiBmdW5jdGlvbiAoIGFjY2Vzc2lvbiApIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG4gICAgXHRcbiAgICBcdGNvbnNvbGUubG9nKFwiUmVxdWVzdGluZyBzZXF1ZW5jZSBmb3I6IFwiICsgYWNjZXNzaW9uICk7XG5cblx0XHRqUXVlcnkuYWpheCh7IFxuXHRcdFx0dXJsOiBzZWxmLm9wdC5zZXF1ZW5jZVVybCxcblx0XHRcdGRhdGFUeXBlOiBcInhtbFwiLFxuXHRcdFx0ZGF0YTogeyBzZWdtZW50OiBhY2Nlc3Npb24gfSxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICggeG1sICApIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgc2VxdWVuY2VOb2RlID0galF1ZXJ5KHhtbCkuZmluZCgnU0VRVUVOQ0U6Zmlyc3QnKTtcblx0XHRcdFx0XHRzZWxmLnNldFNlcXVlbmNlKCBzZXF1ZW5jZU5vZGUudGV4dCgpLCBzZXF1ZW5jZU5vZGUuYXR0cihcImlkXCIpLCBzZXF1ZW5jZU5vZGUuYXR0cihcImxhYmVsXCIpICk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGRlY29kaW5nIHJlc3BvbnNlIGRhdGE6IFwiICsgZS5tZXNzYWdlICk7XG5cdFx0XHRcdFx0c2VsZi5jbGVhclNlcXVlbmNlKFwiTm8gc2VxdWVuY2UgYXZhaWxhYmxlXCIsIFwiLi4vYmlvanMvY3NzL2ltYWdlcy93YXJuaW5nX2ljb24ucG5nXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGRlY29kaW5nIHJlc3BvbnNlIGRhdGE6IFwiICsgdGV4dFN0YXR1cyApO1xuXHRcdFx0XHRzZWxmLmNsZWFyU2VxdWVuY2UoXCJFcnJvciByZXF1ZXN0aW5nIHRoZSBzZXF1ZW5jZSB0byB0aGUgc2VydmVyIFwiICsgdGhpcy51cmwgLCBcIi4uL2Jpb2pzL2Nzcy9pbWFnZXMvd2FybmluZ19pY29uLnBuZ1wiKTtcblx0XHRcdH1cblx0XHR9KTtcbiAgICB9LFxuXHRcbiAgICAvKipcblx0ICogU2hvd3MgdGhlIGNvbHVtbnMgaW5kaWNhdGVkIGJ5IHRoZSBpbmRleGVzIGFycmF5LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW3Nob3dNZXNzYWdlXSBNZXNzYWdlIHRvIGJlIHNob3dlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IFtpY29uXSBJY29uIHRvIGJlIHNob3dlZCBhIHNpZGUgb2YgdGhlIG1lc3NhZ2Vcblx0ICogXG5cdCAqIEBleGFtcGxlIFxuXHQgKiBteVNlcXVlbmNlLmNsZWFyU2VxdWVuY2UoXCJObyBzZXF1ZW5jZSBhdmFpbGFibGVcIiwgXCIuLi9iaW9qcy9jc3MvaW1hZ2VzL3dhcm5pbmdfaWNvbi5wbmdcIik7XG5cdCAqIFxuXHQgKi9cbiAgICBjbGVhclNlcXVlbmNlOiBmdW5jdGlvbiAoIHNob3dNZXNzYWdlLCBpY29uICkge1xuICAgIFx0XG4gICAgXHR2YXIgbWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgICBcdFx0XG4gICAgXHR0aGlzLm9wdC5zZXF1ZW5jZSA9IFwiXCI7XG4gICAgXHR0aGlzLm9wdC5pZCA9IFwiXCI7IFxuICAgIFx0dGhpcy5faGlnaGxpZ2h0cyA9IFtdO1xuXHRcdHRoaXMuX2hpZ2hsaWdodHNDb3VudCA9IDA7XG5cdFx0dGhpcy5vcHQuc2VsZWN0aW9uID0geyBzdGFydDogMCwgZW5kOiAwIH07XG5cdFx0dGhpcy5fYW5ub3RhdGlvbnMgPSBbXTtcblx0XHR0aGlzLl9jb250ZW50RGl2LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG5cdFx0XG5cdFx0dGhpcy5faGVhZGVyRGl2LmhpZGUoKTtcblx0XHRcblx0XHRpZiAoIHVuZGVmaW5lZCAhPT0gc2hvd01lc3NhZ2UgKSB7XG5cdFx0XHRtZXNzYWdlID0galF1ZXJ5KCc8ZGl2PicgKyBzaG93TWVzc2FnZSArICc8L2Rpdj4nKVxuXHRcdFx0XHQuYXBwZW5kVG8odGhpcy5fY29udGVudERpdilcblx0XHRcdFx0LmFkZENsYXNzKFwibWVzc2FnZVwiKTtcblx0XHRcdFxuXHRcdFx0aWYgKCB1bmRlZmluZWQgIT09IGljb24gKSB7XG5cdFx0XHRcdG1lc3NhZ2UuY3NzKHtcblx0XHRcdFx0XHQnYmFja2dyb3VuZCc6ICd0cmFuc3BhcmVudCB1cmwoXCInICsgaWNvbiArICdcIikgbm8tcmVwZWF0IGNlbnRlciBsZWZ0Jyxcblx0XHRcdFx0XHQncGFkZGluZy1sZWZ0JzogJzIwcHgnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cbiAgICB9LFxuXHRcblx0LyoqXG4gICAgKiBTZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGluIHRoZSBzZXF1ZW5jZSBjYXVzaW5nIHRoZSBldmVudCB7QGxpbmsgU2VxdWVuY2Ujb25TZWxlY3Rpb25DaGFuZ2VkfVxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBzZXQgc2VsZWN0aW9uIGZyb20gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAgXG4gICAgKiBteVNlcXVlbmNlLnNldFNlbGVjdGlvbigxMDAsIDE1MCk7XG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBzdGFydCBUaGUgc3RhcnRpbmcgY2hhcmFjdGVyIG9mIHRoZSBzZWxlY3Rpb24uXG4gICAgKiBAcGFyYW0ge2ludH0gZW5kIFRoZSBlbmRpbmcgY2hhcmFjdGVyIG9mIHRoZSBzZWxlY3Rpb25cbiAgICAqL1xuXHRzZXRTZWxlY3Rpb24gOiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG5cdFx0aWYoc3RhcnQgPiBlbmQpIHtcblx0XHRcdHZhciBhdXggPSBlbmQ7XG5cdFx0XHRlbmQgPSBzdGFydDtcblx0XHRcdHN0YXJ0ID0gYXV4O1xuXG5cdFx0fVxuXG5cdFx0aWYoc3RhcnQgIT0gdGhpcy5vcHQuc2VsZWN0aW9uLnN0YXJ0IHx8IGVuZCAhPSB0aGlzLm9wdC5zZWxlY3Rpb24uZW5kKSB7XG5cdFx0XHR0aGlzLl9zZXRTZWxlY3Rpb24oc3RhcnQsIGVuZCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXG5cdFx0XHRcdFx0RVZUX09OX1NFTEVDVElPTl9DSEFOR0VELCBcblx0XHRcdFx0XHR7IFwic3RhcnRcIiA6IHN0YXJ0LCBcImVuZFwiIDogZW5kIH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXHRcblx0X2J1aWxkRm9ybWF0U2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XG5cdFx0dGhpcy5faGVhZGVyRGl2ID0galF1ZXJ5KCc8ZGl2PjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuX2NvbnRhaW5lcik7XG5cdFx0dGhpcy5faGVhZGVyRGl2LmNzcyh7XG5cdFx0XHQnZm9udC1mYW1pbHknOiAnXCJIZXZlbHRpY2EgTmV1ZVwiLCBBcmlhbCwgXCJzYW5zIHNlcmlmXCInLFxuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcxNHB4J1x0XG5cdFx0fSkuYXBwZW5kKCdGb3JtYXQ6ICcpO1xuXHRcdFxuXHRcdHRoaXMuX2Zvcm1hdFNlbGVjdG9yID0galF1ZXJ5KCc8c2VsZWN0PiAnK1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkZBU1RBXCI+RkFTVEE8L29wdGlvbj4nK1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkNPREFUQVwiPkNPREFUQTwvb3B0aW9uPicrXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiUFJJREVcIj5QUklERTwvb3B0aW9uPicrXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiUkFXXCI+UkFXPC9vcHRpb24+PC9zZWxlY3Q+JykuYXBwZW5kVG8oc2VsZi5faGVhZGVyRGl2KTtcblxuXHRcdHRoaXMuX2Zvcm1hdFNlbGVjdG9yLmNoYW5nZShmdW5jdGlvbihlKSB7XG5cdFx0XHRzZWxmLm9wdC5mb3JtYXQgPSBqUXVlcnkodGhpcykudmFsKCk7XG5cdFx0XHRzZWxmLl9yZWRyYXcoKTtcblx0XHR9KTtcblx0XHRcblx0XHR0aGlzLl9mb3JtYXRTZWxlY3Rvci52YWwoc2VsZi5vcHQuZm9ybWF0KTtcdFxuXHRcdFxuXHRcdHRoaXMuZm9ybWF0U2VsZWN0b3JWaXNpYmxlKCB0aGlzLm9wdC5mb3JtYXRTZWxlY3RvclZpc2libGUgKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogSGlnaGxpZ2h0cyBhIHJlZ2lvbiB1c2luZyB0aGUgZm9udCBjb2xvciBkZWZpbmVkIGluIHtCaW9qcy5Qcm90ZWluM0QjaGlnaGxpZ2h0Rm9udENvbG9yfSBieSBkZWZhdWx0IGlzIHJlZC5cbiAgICAqXG4gICAgKiBAZGVwcmVjYXRlZCB1c2UgYWRkSGlnaGxpZ2h0IGluc3RlYWQuXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7aW50fSBzdGFydCBUaGUgc3RhcnRpbmcgY2hhcmFjdGVyIG9mIHRoZSBoaWdobGlnaHRpbmcuXG4gICAgKiBAcGFyYW0ge2ludH0gZW5kIFRoZSBlbmRpbmcgY2hhcmFjdGVyIG9mIHRoZSBoaWdobGlnaHRpbmcuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbG9yXSBIVE1MIGNvbG9yIGNvZGUuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2JhY2tncm91bmRdIEhUTUwgY29sb3IgY29kZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdIEN1c3RvbSBpZGVudGlmaWVyLlxuICAgICogXG4gICAgKiBAcmV0dXJuIHtpbnR9IHJlcHJlc2VudGluZyB0aGUgaWQgb2YgdGhlIGhpZ2hsaWdodCBvbiB0aGUgaW50ZXJuYWwgYXJyYXkuIFJldHVybnMgLTEgb24gZmFpbHVyZSAgXG4gICAgKi9cblx0aGlnaGxpZ2h0IDogZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGNvbG9yLCBiYWNrZ3JvdW5kLCBpZCApIHtcblx0XHRyZXR1cm4gdGhpcy5hZGRIaWdobGlnaHQoeyBcInN0YXJ0XCI6IHN0YXJ0LCBcImVuZFwiOiBlbmQsIFwiY29sb3JcIjogY29sb3IsIFwiYmFja2dyb3VuZFwiOiBiYWNrZ3JvdW5kLCBcImlkXCI6IGlkIH0pO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBIaWdobGlnaHRzIGEgcmVnaW9uIHVzaW5nIHRoZSBmb250IGNvbG9yIGRlZmluZWQgaW4ge1NlcXVlbmNlI2hpZ2hsaWdodEZvbnRDb2xvcn0gYnkgZGVmYXVsdCBpcyByZWQuXG4gICAgKlxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIGhpZ2hsaWdodCB0aGUgY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAsIGluY2x1ZGVkLlxuICAgICogbXlTZXF1ZW5jZS5hZGRIaWdobGlnaHQoIHsgXCJzdGFydFwiOiAxMDAsIFwiZW5kXCI6IDE1MCwgXCJjb2xvclwiOiBcIndoaXRlXCIsIFwiYmFja2dyb3VuZFwiOiBcInJlZFwiLCBcImlkXCI6IFwiYWFhXCIgfSApO1xuICAgICogXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaCBUaGUgaGlnaGxpZ2h0IGRlZmluZWQgYXMgZm9sbG93czpcbiAgICAqIFx0XG4gICAgKiBcbiAgICAqIEByZXR1cm4ge2ludH0gcmVwcmVzZW50aW5nIHRoZSBpZCBvZiB0aGUgaGlnaGxpZ2h0IG9uIHRoZSBpbnRlcm5hbCBhcnJheS4gUmV0dXJucyAtMSBvbiBmYWlsdXJlICBcbiAgICAqL1xuXHRhZGRIaWdobGlnaHQgOiBmdW5jdGlvbiAoIGggKSB7XG5cdFx0dmFyIGlkID0gJy0xJztcblx0XHR2YXIgY29sb3IgPSBcIlwiO1xuXHRcdHZhciBiYWNrZ3JvdW5kID0gXCJcIjtcblx0XHR2YXIgaGlnaGxpZ2h0ID0ge307XG5cdFx0XG5cdFx0aWYgKCBoIGluc3RhbmNlb2YgT2JqZWN0ICYmIGguc3RhcnQgPD0gaC5lbmQgKSB7XG5cdFx0XHRcblx0XHRcdGNvbG9yID0gKCBcInN0cmluZ1wiID09IHR5cGVvZiBoLmNvbG9yICk/IGguY29sb3IgOiB0aGlzLm9wdC5oaWdobGlnaHRGb250Q29sb3I7XG5cdFx0XHRiYWNrZ3JvdW5kID0gKCBcInN0cmluZ1wiID09IHR5cGVvZiBoLmJhY2tncm91bmQgKT8gaC5iYWNrZ3JvdW5kIDogdGhpcy5vcHQuaGlnaGxpZ2h0QmFja2dyb3VuZENvbG9yO1xuXHRcdFx0aWQgPSAoIFwic3RyaW5nXCIgPT0gdHlwZW9mIGguaWQgKT8gaC5pZCA6IChuZXcgTnVtYmVyKHRoaXMuX2hpZ2hsaWdodHNDb3VudCsrKSkudG9TdHJpbmcoKTtcblx0XHRcdFxuXHRcdFx0aGlnaGxpZ2h0ID0geyBcInN0YXJ0XCI6IGguc3RhcnQsIFwiZW5kXCI6IGguZW5kLCBcImNvbG9yXCI6IGNvbG9yLCBcImJhY2tncm91bmRcIjogYmFja2dyb3VuZCwgXCJpZFwiOiBpZCB9O1xuXHRcdFx0XG5cdFx0XHR0aGlzLl9oaWdobGlnaHRzLnB1c2goaGlnaGxpZ2h0KTtcblx0XHRcdHRoaXMuX2FwcGx5SGlnaGxpZ2h0KGhpZ2hsaWdodCk7XG5cdFx0XHR0aGlzLl9yZXN0b3JlU2VsZWN0aW9uKGguc3RhcnQsaC5lbmQpO1xuXHRcdH0gXG5cdFx0XG5cdFx0cmV0dXJuIGlkO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2FwcGx5SGlnaGxpZ2h0XG4gICAgICogUHVycG9zZTogIEFwcGx5IHRoZSBzcGVjaWZpZWQgY29sb3IgYW5kIGJhY2tncm91bmQgdG8gYSByZWdpb24gYmV0d2VlbiAnc3RhcnQnIGFuZCAnZW5kJy5cbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogaGlnaGxpZ2h0IC0+IHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmaWVsZHMgc3RhcnQgKGludCksIGVuZCAoaW50KSwgXG4gICAgICogXHRcdFx0XHRcdFx0Y29sb3IgKEhUTUwgY29sb3Igc3RyaW5nKSBhbmQgYmFja2dyb3VuZCAoSFRNTCBjb2xvciBzdHJpbmcpLlxuICAgICAqL1xuXHRfYXBwbHlIaWdobGlnaHQ6IGZ1bmN0aW9uICggaGlnaGxpZ2h0ICkge1x0XHRcblx0XHR2YXIgc2VxID0gdGhpcy5fY29udGVudERpdi5maW5kKCcuc2VxdWVuY2UnKTtcblx0XHRmb3IgKCB2YXIgaSA9IGhpZ2hsaWdodC5zdGFydCAtIDE7IGkgPCBoaWdobGlnaHQuZW5kOyBpKysgKXtcblx0XHRcdHppbmRleCA9IGpRdWVyeShzZXFbaV0pLmNzcyhcInotaW5kZXhcIik7XG5cdFx0XHRpZiAoemluZGV4PT1cImF1dG9cIil7XG5cdFx0XHRcdCB6ID0gMTtcblx0XHRcdFx0IG8gPSAxO1xuXHRcdFx0IH1cblx0XHRcdCBlbHNle1xuXHRcdFx0XHQgeiA9IDA7XG5cdFx0XHRcdCBvID0gMC41O1xuXHRcdFx0IH1cblx0XHRcdGpRdWVyeShzZXFbaV0pXG5cdFx0XHRcdC5jc3MoeyBcblx0XHRcdFx0XHRcImNvbG9yXCI6IGhpZ2hsaWdodC5jb2xvcixcblx0XHRcdFx0XHRcImJhY2tncm91bmQtY29sb3JcIjogaGlnaGxpZ2h0LmJhY2tncm91bmQsXG5cdFx0XHRcdFx0XCJ6LWluZGV4XCI6IHosXG5cdFx0XHRcdFx0XCJvcGFjaXR5XCI6IG9cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQuYWRkQ2xhc3MoXCJoaWdobGlnaHRlZFwiKTtcblx0XHR9XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fYXBwbHlIaWdobGlnaHRzXG4gICAgICogUHVycG9zZTogIEFwcGx5IHRoZSBzcGVjaWZpZWQgaGlnaGxpZ2h0cy5cbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogaGlnaGxpZ2h0cyAtPiB7T2JqZWN0W119IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGhpZ2hsaWdodHMgdG8gYmUgYXBwbGllZC5cbiAgICAgKi9cblx0X2FwcGx5SGlnaGxpZ2h0czogZnVuY3Rpb24gKCBoaWdobGlnaHRzICkge1xuXHRcdGZvciAoIHZhciBpIGluIGhpZ2hsaWdodHMgKSB7XG5cdFx0XHR0aGlzLl9hcHBseUhpZ2hsaWdodChoaWdobGlnaHRzW2ldKTtcblx0XHR9XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fcmVzdG9yZUhpZ2hsaWdodHNcbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgaGlnaGxpZ2h0cyBpbiB0aGUgc3BlY2lmaWVkIHJlZ2lvbi5cbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogc3RhcnQgLT4ge2ludH0gU3RhcnQgb2YgdGhlIHJlZ2lvbiB0byBiZSByZXN0b3JlZC5cbiAgICAgKiBcdFx0ICAgZW5kIC0+IHtpbnR9IEVuZCBvZiB0aGUgcmVnaW9uIHRvIGJlIHJlc3RvcmVkLlxuICAgICAqL1xuXHRfcmVzdG9yZUhpZ2hsaWdodHM6IGZ1bmN0aW9uICggc3RhcnQsIGVuZCApIHtcblx0XHR2YXIgaCA9IHRoaXMuX2hpZ2hsaWdodHM7XG5cdFx0Ly8gcGFpbnQgdGhlIHJlZ2lvbiB1c2luZyBkZWZhdWx0IGJsYW5rIHNldHRpbmdzXG5cdFx0dGhpcy5fYXBwbHlIaWdobGlnaHQoe1xuXHRcdFx0XCJzdGFydFwiOiBzdGFydCwgXG5cdFx0XHRcImVuZFwiOiBlbmQsIFxuXHRcdFx0XCJjb2xvclwiOiB0aGlzLm9wdC5mb250Q29sb3IsIFxuXHRcdFx0XCJiYWNrZ3JvdW5kXCI6IHRoaXMub3B0LmJhY2tncm91bmRDb2xvciBcblx0XHR9KTtcblx0XHQvLyByZXN0b3JlIGhpZ2hsaWdodHMgaW4gdGhhdCByZWdpb25cblx0XHRmb3IgKCB2YXIgaSBpbiBoICkge1xuXHRcdFx0Ly8gaW50ZXJ2YWwgaW50ZXJzZWN0cyB3aXRoIGhpZ2hsaWdodCBpID9cblx0XHRcdGlmICggISggaFtpXS5zdGFydCA+IGVuZCB8fCBoW2ldLmVuZCA8IHN0YXJ0ICkgKSB7XG5cdFx0XHRcdGEgPSAoIGhbaV0uc3RhcnQgPCBzdGFydCApID8gc3RhcnQgOiBoW2ldLnN0YXJ0O1xuXHRcdFx0XHRiID0gKCBoW2ldLmVuZCA+IGVuZCApID8gZW5kIDogaFtpXS5lbmQ7XG5cdFx0XHRcdHRoaXMuX2FwcGx5SGlnaGxpZ2h0KHtcblx0XHRcdFx0XHRcInN0YXJ0XCI6IGEsIFxuXHRcdFx0XHRcdFwiZW5kXCI6IGIsIFxuXHRcdFx0XHRcdFwiY29sb3JcIjogaFtpXS5jb2xvciwgXG5cdFx0XHRcdFx0XCJiYWNrZ3JvdW5kXCI6IGhbaV0uYmFja2dyb3VuZCBcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX3Jlc3RvcmVTZWxlY3Rpb25cbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZWxlY3Rpb24gaW4gdGhlIHNwZWNpZmllZCByZWdpb24uIFxuICAgICAqIFx0XHRcdCBJdCBpcyB1c2VkIGluIHRoZSBjYXNlIG9mIGFueSBoaWdobGlnaHQgZG8gb3ZlcnJpZGluZyBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24uIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiBzdGFydCAtPiB7aW50fSBTdGFydCBvZiB0aGUgcmVnaW9uIHRvIGJlIHJlc3RvcmVkLlxuICAgICAqIFx0XHQgICBlbmQgLT4ge2ludH0gRW5kIG9mIHRoZSByZWdpb24gdG8gYmUgcmVzdG9yZWQuXG4gICAgICovXG5cdF9yZXN0b3JlU2VsZWN0aW9uOiBmdW5jdGlvbiAoIHN0YXJ0LCBlbmQgKSB7XG5cdFx0dmFyIHNlbCA9IHRoaXMub3B0LnNlbGVjdGlvbjtcblx0XHQvLyBpbnRlcnZhbCBpbnRlcnNlY3RzIHdpdGggY3VycmVudCBzZWxlY3Rpb24gP1xuXHRcdC8vIHJlc3RvcmUgc2VsZWN0aW9uXG5cdFx0aWYgKCAhKCBzdGFydCA+IHNlbC5lbmQgfHwgZW5kIDwgc2VsLnN0YXJ0ICkgKSB7XG5cdFx0XHRhID0gKCBzdGFydCA8IHNlbC5zdGFydCApID8gc2VsLnN0YXJ0IDogc3RhcnQ7XG5cdFx0XHRiID0gKCBlbmQgPiBzZWwuZW5kICkgPyBzZWwuZW5kIDogZW5kO1xuXHRcdFx0XG5cdFx0XHR0aGlzLl9hcHBseUhpZ2hsaWdodCh7XG5cdFx0XHRcdFwic3RhcnRcIjogYSwgXG5cdFx0XHRcdFwiZW5kXCI6IGIsIFxuXHRcdFx0XHRcImNvbG9yXCI6IHRoaXMub3B0LnNlbGVjdGlvbkZvbnRDb2xvciwgXG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiOiB0aGlzLm9wdC5zZWxlY3Rpb25Db2xvcixcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblx0XG5cdC8qKlxuICAgICogQ2xlYXIgYSBoaWdobGlnaHRlZCByZWdpb24gdXNpbmcuXG4gICAgKlxuICAgICogQGRlcHJlY2F0ZWQgdXNlIHJlbW92ZUhpZ2hsaWdodCBpbnN0ZWFkLlxuICAgICogXG4gICAgKiBAcGFyYW0ge2ludH0gaWQgVGhlIGlkIG9mIHRoZSBoaWdobGlnaHQgb24gdGhlIGludGVybmFsIGFycmF5LiBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGJ5IG1ldGhvZCBoaWdobGlnaHQuXG4gICAgKi9cblx0dW5IaWdobGlnaHQgOiBmdW5jdGlvbiAoaWQpIHtcdFxuXHRcdHRoaXMucmVtb3ZlSGlnaGxpZ2h0KGlkKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogUmVtb3ZlIGEgaGlnaGxpZ2h0LlxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBDbGVhciB0aGUgaGlnaGxpZ2h0ZWQgY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBvc2l0aW9uIDEwMCB0byAxNTAsIGluY2x1ZGVkLlxuICAgICogbXlTZXF1ZW5jZS5yZW1vdmVIaWdobGlnaHQoXCJzcGluMVwiKTtcbiAgICAqIFxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgaGlnaGxpZ2h0IG9uIHRoZSBpbnRlcm5hbCBhcnJheS4gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBieSBtZXRob2QgaGlnaGxpZ2h0LlxuICAgICovXG5cdHJlbW92ZUhpZ2hsaWdodCA6IGZ1bmN0aW9uIChpZCkge1x0XG5cdFx0dmFyIGggPSB0aGlzLl9oaWdobGlnaHRzO1xuXHRcdGZvciAoIGkgaW4gaCApIHtcblx0XHRcdGlmICggaFtpXS5pZCA9PSBpZCApIHtcblx0XHRcdFx0c3RhcnQgPSBoW2ldLnN0YXJ0O1xuXHRcdFx0XHRlbmQgPSBoW2ldLmVuZDtcblx0XHRcdFx0aC5zcGxpY2UoaSwxKTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMuX3Jlc3RvcmVIaWdobGlnaHRzKHN0YXJ0LGVuZCk7XG5cdFx0XHRcdHRoaXMuX3Jlc3RvcmVTZWxlY3Rpb24oc3RhcnQsZW5kKTtcblx0XHRcdFx0XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XG5cdC8qKlxuICAgICogQ2xlYXIgdGhlIGhpZ2hsaWdodHMgb2Ygd2hvbGUgc2VxdWVuY2UuXG4gICAgKiBAZGVwcmVjYXRlZCB1c2UgcmVtb3ZlQWxsSGlnaGxpZ2h0cyBpbnN0ZWFkLlxuICAgICovXG5cdHVuSGlnaGxpZ2h0QWxsIDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMucmVtb3ZlQWxsSGlnaGxpZ2h0cygpO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBSZW1vdmUgYWxsIHRoZSBoaWdobGlnaHRzIG9mIHdob2xlIHNlcXVlbmNlLlxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiBteVNlcXVlbmNlLnJlbW92ZUFsbEhpZ2hsaWdodHMoKTtcbiAgICAqL1xuXHRyZW1vdmVBbGxIaWdobGlnaHRzIDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2hpZ2hsaWdodHMgPSBbXTtcblx0XHR0aGlzLl9yZXN0b3JlSGlnaGxpZ2h0cygxLHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aCk7XG5cdFx0dGhpcy5fcmVzdG9yZVNlbGVjdGlvbigxLHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aCk7XG5cdH0sXG5cdFxuXHQvKipcbiAgICAqIENoYW5nZXMgdGhlIGN1cnJlbnQgZGlzcGxheWluZyBmb3JtYXQgb2YgdGhlIHNlcXVlbmNlLlxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBTZXQgZm9ybWF0IHRvICdGQVNUQScuXG4gICAgKiBteVNlcXVlbmNlLnNldEZvcm1hdCgnRkFTVEEnKTtcbiAgICAqIFxuICAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdCBUaGUgZm9ybWF0IGZvciB0aGUgc2VxdWVuY2UgdG8gYmUgZGlzcGxheWVkLlxuICAgICovXG5cdHNldEZvcm1hdCA6IGZ1bmN0aW9uKGZvcm1hdCkge1xuXHRcdGlmICggdGhpcy5vcHQuZm9ybWF0ICE9IGZvcm1hdC50b1VwcGVyQ2FzZSgpICkge1xuXHRcdFx0dGhpcy5vcHQuZm9ybWF0ID0gZm9ybWF0LnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR0aGlzLl9yZWRyYXcoKTtcblx0XHR9XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0Ly8gQ2hhbmdlcyB0aGUgb3B0aW9uIGluIHRoZSBjb21ibyBib3hcblx0XHR0aGlzLl9oZWFkZXJEaXYuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGlmKGpRdWVyeSh0aGlzKS52YWwoKSA9PSBzZWxmLm9wdC5mb3JtYXQudG9VcHBlckNhc2UoKSkge1xuXHRcdFx0XHRqUXVlcnkodGhpcykuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogQ2hhbmdlcyB0aGUgY3VycmVudCBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgZGlzcGxheWVkIHNlcXVlbmNlLlxuICAgICpcbiAgICAqIEBleGFtcGxlXG4gICAgKiAvLyBTZXQgdGhlIG51bWJlciBvZiBjb2x1bW5zIHRvIDcwLlxuICAgICogbXlTZXF1ZW5jZS5zZXROdW1Db2xzKDcwKTtcbiAgICAqIFxuICAgICogQHBhcmFtIHtpbnR9IG51bUNvbHMgVGhlIG51bWJlciBvZiBjb2x1bW5zLlxuICAgICovXG5cdHNldE51bUNvbHMgOiBmdW5jdGlvbihudW1Db2xzKSB7XG5cdFx0dGhpcy5vcHQuY29sdW1ucy5zaXplID0gbnVtQ29scztcblx0XHR0aGlzLl9yZWRyYXcoKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogU2V0IHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBkcm9wLWRvd24gbGlzdCBvZiBmb3JtYXRzLlxuICAgICogXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGUgdHJ1ZTogc2hvdzsgZmFsc2U6IGhpZGUuXG4gICAgKi9cblx0Zm9ybWF0U2VsZWN0b3JWaXNpYmxlIDogZnVuY3Rpb24gKHZpc2libGUpe1xuXHRcdGlmICh2aXNpYmxlKSB7XG5cdFx0XHR0aGlzLl9oZWFkZXJEaXYuc2hvdygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9oZWFkZXJEaXYuaGlkZSgpO1xuXHRcdH1cblx0fSxcblx0XG5cdC8qKlxuICAgICogVGhpcyBpcyBzaW1pbGFyIHRvIGEge0Jpb2pzLlByb3RlaW4zRCNmb3JtYXRTZWxlY3RvclZpc2libGV9IHdpdGggdGhlICd0cnVlJyBhcmd1bWVudC5cbiAgICAqXG4gICAgKiBAZXhhbXBsZVxuICAgICogLy8gU2hvd3MgdGhlIGZvcm1hdCBzZWxlY3Rvci5cbiAgICAqIG15U2VxdWVuY2Uuc2hvd0Zvcm1hdFNlbGVjdG9yKCk7XG4gICAgKiBcbiAgICAqL1xuXHRzaG93Rm9ybWF0U2VsZWN0b3IgOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLl9oZWFkZXJEaXYuc2hvdygpO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gYSB7QmlvanMuUHJvdGVpbjNEI2Zvcm1hdFNlbGVjdG9yVmlzaWJsZX0gd2l0aCB0aGUgJ2ZhbHNlJyBhcmd1bWVudC5cbiAgICAqIFxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIEhpZGVzIHRoZSBmb3JtYXQgc2VsZWN0b3IuXG4gICAgKiBteVNlcXVlbmNlLmhpZGVGb3JtYXRTZWxlY3RvcigpO1xuICAgICogXG4gICAgKi9cblx0aGlkZUZvcm1hdFNlbGVjdG9yIDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5faGVhZGVyRGl2LmhpZGUoKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogSGlkZXMgdGhlIHdob2xlIGNvbXBvbmVudC5cbiAgICAqIFxuICAgICovXG5cdGhpZGUgOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5faGVhZGVyRGl2LmhpZGUoKTtcblx0XHR0aGlzLl9jb250ZW50RGl2LmhpZGUoKTtcblx0fSxcblxuXHQvKipcbiAgICAqIFNob3dzIHRoZSB3aG9sZSBjb21wb25lbnQuXG4gICAgKiBcbiAgICAqL1xuXHRzaG93IDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2hlYWRlckRpdi5zaG93KCk7XG5cdFx0dGhpcy5fY29udGVudERpdi5zaG93KCk7XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fc2V0U2VsZWN0aW9uXG4gICAgICogUHVycG9zZTogIFVwZGF0ZSB0aGUgY3VycmVudCBzZWxlY3Rpb24uIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiBzdGFydCAtPiB7aW50fSBTdGFydCBvZiB0aGUgcmVnaW9uIHRvIGJlIHNlbGVjdGVkLlxuICAgICAqIFx0XHQgICBlbmQgLT4ge2ludH0gRW5kIG9mIHRoZSByZWdpb24gdG8gYmUgc2VsZWN0ZWQuXG4gICAgICovXG5cdF9zZXRTZWxlY3Rpb24gOiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG5cdFx0Ly9hbGVydChcImFkc2FzXCIpO1xuXHRcdFxuXHRcdHZhciBjdXJyZW50ID0gdGhpcy5vcHQuc2VsZWN0aW9uO1xuXHRcdHZhciBjaGFuZ2UgPSB7fTtcblx0XHRcblx0XHQvLyBXaGljaCBpcyB0aGUgY2hhbmdlIG9uIHNlbGVjdGlvbj9cblx0XHRpZiAoIGN1cnJlbnQuc3RhcnQgPT0gc3RhcnQgKSB7XG5cdFx0XHQvLyBmb3J3YXJkP1xuXHRcdFx0aWYgKCBjdXJyZW50LmVuZCA8IGVuZCApIHtcblx0XHRcdFx0Y2hhbmdlLnN0YXJ0ID0gY3VycmVudC5lbmQ7XG5cdFx0XHRcdGNoYW5nZS5lbmQgPSBlbmQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9yZXN0b3JlSGlnaGxpZ2h0cyhlbmQrMSwgY3VycmVudC5lbmQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIGN1cnJlbnQuZW5kID09IGVuZCApIHtcblx0XHRcdC8vIGZvcndhcmQ/XG5cdFx0XHRpZiAoIGN1cnJlbnQuc3RhcnQgPiBzdGFydCApIHtcblx0XHRcdFx0Y2hhbmdlLnN0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRcdGNoYW5nZS5lbmQgPSBjdXJyZW50LnN0YXJ0O1x0XHRcdFx0XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9yZXN0b3JlSGlnaGxpZ2h0cyhjdXJyZW50LnN0YXJ0LCBzdGFydC0xKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcmVzdG9yZUhpZ2hsaWdodHMoY3VycmVudC5zdGFydCwgY3VycmVudC5lbmQpO1xuXHRcdFx0Y2hhbmdlLnN0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRjaGFuZ2UuZW5kID0gZW5kO1xuXHRcdH1cblxuXHRcdGN1cnJlbnQuc3RhcnQgPSBzdGFydDtcblx0XHRjdXJyZW50LmVuZCA9IGVuZDtcblxuXHRcdGlmICggY2hhbmdlLnN0YXJ0ICE9IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuX2FwcGx5SGlnaGxpZ2h0KHtcblx0XHRcdFx0XCJzdGFydFwiOiBjaGFuZ2Uuc3RhcnQsIFxuXHRcdFx0XHRcImVuZFwiOiBjaGFuZ2UuZW5kLCBcblx0XHRcdFx0XCJjb2xvclwiOiB0aGlzLm9wdC5zZWxlY3Rpb25Gb250Q29sb3IsIFxuXHRcdFx0XHRcImJhY2tncm91bmRcIjogdGhpcy5vcHQuc2VsZWN0aW9uQ29sb3IgXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0XG5cdH0sXG5cdFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX3JlcGFpbnRTZWxlY3Rpb25cbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgd2hvbGUgY3VycmVudCBzZWxlY3Rpb24uIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAtXG4gICAgICovXG5cdF9yZXBhaW50U2VsZWN0aW9uOiBmdW5jdGlvbigpe1xuXHRcdHZhciBzID0gdGhpcy5vcHQuc2VsZWN0aW9uO1xuXHRcdHRoaXMuX3NldFNlbGVjdGlvbigwLDApO1xuXHRcdHRoaXMuX3NldFNlbGVjdGlvbihzLnN0YXJ0LHMuZW5kKTtcblx0fSxcblx0XG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fcmVkcmF3XG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UuIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAtXG4gICAgICovXG5cdF9yZWRyYXcgOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaSA9IDA7XHRcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XG5cdFx0Ly8gUmVzZXQgdGhlIGNvbnRlbnRcblx0XHQvL3RoaXMuX2NvbnRlbnREaXYudGV4dCgnJyk7XG5cdFx0dGhpcy5fY29udGVudERpdi5jaGlsZHJlbigpLnJlbW92ZSgpO1xuXHRcdFxuXHRcdC8vIFJlYnVpbGQgdGhlIHNwYW5zIG9mIHRoZSBzZXF1ZW5jZSBcblx0XHQvLyBhY2NvcmRpbmcgdG8gZm9ybWF0XG5cdFx0aWYodGhpcy5vcHQuZm9ybWF0ID09ICdSQVcnKSB7XG5cdFx0XHR0aGlzLl9kcmF3UmF3KCk7XG5cdFx0fSBlbHNlIGlmKHRoaXMub3B0LmZvcm1hdCA9PSAnQ09EQVRBJykge1xuXHRcdFx0dGhpcy5fZHJhd0NvZGF0YSgpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5vcHQuZm9ybWF0ID09ICdGQVNUQScpe1xuXHRcdFx0dGhpcy5fZHJhd0Zhc3RhKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3B0LmZvcm1hdCA9ICdQUklERSc7XG5cdFx0XHR0aGlzLl9kcmF3UHJpZGUoKTtcblx0XHR9XG5cdFx0XG5cdFx0Ly8gUmVzdG9yZSB0aGUgaGlnaGxpZ2h0ZWQgcmVnaW9uc1xuXHRcdHRoaXMuX2FwcGx5SGlnaGxpZ2h0cyh0aGlzLl9oaWdobGlnaHRzKTtcblx0XHR0aGlzLl9yZXBhaW50U2VsZWN0aW9uKCk7XG5cdFx0dGhpcy5fYWRkU3BhbkV2ZW50cygpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2RyYXdGYXN0YVxuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBjdXJyZW50IHNlcXVlbmNlIHVzaW5nIEZBU1RBIGZvcm1hdC4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAtXG4gICAgICovXG5cdF9kcmF3RmFzdGEgOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIGEgPSB0aGlzLm9wdC5zZXF1ZW5jZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTtcblx0XHR2YXIgcHJlID0galF1ZXJ5KCc8cHJlPjwvcHJlPicpLmFwcGVuZFRvKHRoaXMuX2NvbnRlbnREaXYpO1xuXG5cdFx0dmFyIGkgPSAxO1xuXHRcdHZhciBhcnIgPSBbXTtcblx0ICAgIHZhciBzdHIgPSAnPicgKyB0aGlzLm9wdC5pZCArICcgJyArIGEubGVuZ3RoICsgJyBicDxici8+Jztcblx0XHRcblx0XHQvKiBDb3JyZWN0IGNvbHVtbiBzaXplIGluIGNhc2UgdGhlIHNlcXVlbmNlIGlzIGFzIHNtYWxsIHBlcHRpZGUgKi9cblx0XHR2YXIgbnVtQ29scyA9IHRoaXMub3B0LmNvbHVtbnMuc2l6ZTtcblx0XHRpZiAoIHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aCA8IHRoaXMub3B0LmNvbHVtbnMuc2l6ZSApIHtcblx0XHRcdG51bUNvbHMgPSB0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGg7XHRcblx0XHR9XG5cdFx0XG5cdCAgICB2YXIgb3B0ID0ge1xuXHRcdFx0bnVtQ29sczogbnVtQ29scyxcblx0XHQgICAgbnVtQ29sc0ZvclNwYWNlOiAwXG5cdFx0fTtcblxuXHRcdHN0ciArPSB0aGlzLl9kcmF3U2VxdWVuY2UoYSwgb3B0KTtcblx0XHRwcmUuaHRtbChzdHIpO1xuXHRcdFxuXHRcdHRoaXMuX2RyYXdBbm5vdGF0aW9ucyhvcHQpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2RyYXdDb2RhdGFcbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZXF1ZW5jZSB1c2luZyBDT0RBVEEgZm9ybWF0LiAgXG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6IC1cbiAgICAgKi9cblx0X2RyYXdDb2RhdGEgOiBmdW5jdGlvbigpIHtcblx0XHRcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIGEgPSB0aGlzLm9wdC5zZXF1ZW5jZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTtcblx0XHR2YXIgcHJlID0galF1ZXJ5KCc8cHJlIHN0eWxlPVwid2hpdGUtc3BhY2U6cHJlXCI+PC9wcmU+JykuYXBwZW5kVG8odGhpcy5fY29udGVudERpdik7XG5cblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIHN0ciA9ICdFTlRSWSAgICAgICAgICAgJyArIHRoaXMub3B0LmlkICsgJzxici8+Jztcblx0XHRzdHIgKz0gJ1NFUVVFTkNFPGJyLz4nO1xuXHRcdGlmICggdGhpcy5vcHQuZm9ybWF0T3B0aW9ucyAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRpZih0aGlzLm9wdC5mb3JtYXRPcHRpb25zLnRpdGxlICE9PSB1bmRlZmluZWQgKXtcblx0XHRcdFx0aWYgKHRoaXMub3B0LmZvcm1hdE9wdGlvbnMudGl0bGUgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRzdHIgPSAnJztcblx0XHRcdFx0fVx0XHRcdFxuXHRcdFx0fVxuXHRcdH0gXG5cdFx0XG5cdFx0LyogQ29ycmVjdCBjb2x1bW4gc2l6ZSBpbiBjYXNlIHRoZSBzZXF1ZW5jZSBpcyBhcyBzbWFsbCBwZXB0aWRlICovXG5cdFx0dmFyIG51bUNvbHMgPSB0aGlzLm9wdC5jb2x1bW5zLnNpemU7XG5cdFx0aWYgKCB0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGggPCB0aGlzLm9wdC5jb2x1bW5zLnNpemUgKSB7XG5cdFx0XHRudW1Db2xzID0gdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoO1x0XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBvcHQgPSB7XG5cdFx0XHRcdG51bUxlZnQ6IHRydWUsXG5cdFx0XHRcdG51bUxlZnRTaXplOiA3LFxuXHRcdFx0XHRudW1MZWZ0UGFkOicgJyxcblx0XHRcdFx0bnVtVG9wOiB0cnVlLFxuXHRcdFx0XHRudW1Ub3BFYWNoOiA1LFxuXHRcdFx0XHRudW1Db2xzOiBudW1Db2xzLFxuXHRcdFx0ICAgIG51bUNvbHNGb3JTcGFjZTogMCxcblx0XHRcdCAgICBzcGFjZUJldHdlZW5DaGFyczogdHJ1ZVxuXHRcdH07XG5cdFx0XG5cdFx0c3RyICs9IHRoaXMuX2RyYXdTZXF1ZW5jZShhLCBvcHQpO1xuXHRcdFxuXHRcdHZhciBmb290ZXIgPSAnPGJyLz4vLy8nO1xuXHRcdGlmICh0aGlzLm9wdC5mb3JtYXRPcHRpb25zICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGlmICh0aGlzLm9wdC5mb3JtYXRPcHRpb25zLmZvb3RlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdC5mb3JtYXRPcHRpb25zLmZvb3RlciA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdGZvb3RlciA9ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHN0ciArPSBmb290ZXI7XG5cdFx0cHJlLmh0bWwoc3RyKTtcblx0XHRcblx0XHR0aGlzLl9kcmF3QW5ub3RhdGlvbnMob3B0KTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3QW5ub3RhdGlvbnNcbiAgICAgKiBQdXJwb3NlOiAgUGFpbnQgdGhlIGFubm90YXRpb25zIG9uIHRoZSBzZXF1ZW5jZS4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiBzZXR0aW5ncyAtPiB7b2JqZWN0fSBcbiAgICAgKi9cbiAgICBfZHJhd0Fubm90YXRpb25zOiBmdW5jdGlvbiAoIHNldHRpbmdzICl7IFxuICAgIFx0XG4gICAgXHR2YXIgc2VsZiA9IHRoaXM7XG4gICAgXHR2YXIgYSA9IHRoaXMub3B0LnNlcXVlbmNlLnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpOyAgICBcdFxuICAgIFx0dmFyIGFubm90YXRpb25zID0gdGhpcy5fYW5ub3RhdGlvbnM7XG4gICAgXHR2YXIgbGVmdFNwYWNlcyA9ICcnO1xuICAgIFx0dmFyIHJvdyA9ICcnO1xuICAgIFx0dmFyIGFubm90ID0gJyc7XG4gICAgXHRcbiAgICBcdC8vIEluZGV4IGF0IHRoZSBsZWZ0P1xuXHRcdGlmICggc2V0dGluZ3MubnVtTGVmdCApIHtcblx0XHRcdGxlZnRTcGFjZXMgKz0gdGhpcy5fZm9ybWF0SW5kZXgoJyAnLCBzZXR0aW5ncy5udW1MZWZ0U2l6ZSsyLCAnICcpO1xuXHRcdH1cblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICs9IHNldHRpbmdzLm51bUNvbHMgKXtcblx0XHRcdHJvdyA9ICcnO1xuXHRcdFx0Zm9yICggdmFyIGtleSBpbiBhbm5vdGF0aW9ucyApe1xuXHRcdFx0XHRhbm5vdGF0aW9uc1trZXldLmlkID0gdGhpcy5nZXRJZCgpICsgXCJfXCIgKyBrZXk7XG5cdFx0XHRcdGFubm90ID0gdGhpcy5fZ2V0SFRNTFJvd0Fubm90KGkrMSwgYW5ub3RhdGlvbnNba2V5XSwgc2V0dGluZ3MpO1x0XHRcdFx0XG5cdFx0XHRcdGlmIChhbm5vdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cm93ICs9ICc8YnIvPic7XG5cdFx0XHRcdFx0cm93ICs9IGxlZnRTcGFjZXM7XG5cdFx0XHRcdFx0cm93ICs9IGFubm90O1xuXHRcdFx0XHRcdHJvdyArPSAnPGJyLz4nO1xuXHRcdFx0XHR9IFxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR2YXIgbnVtQ29scyA9IHNldHRpbmdzLm51bUNvbHM7XG5cdFx0XHR2YXIgY2hhclJlbWFpbmluZyA9IGEubGVuZ3RoLWk7XG5cdFx0XHRpZihjaGFyUmVtYWluaW5nIDwgbnVtQ29scyl7XG5cdFx0XHRcdG51bUNvbHNcdD0gY2hhclJlbWFpbmluZztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKCBzZXR0aW5ncy5udW1SaWdodCApIHtcblx0XHRcdFx0alF1ZXJ5KHJvdykuaW5zZXJ0QWZ0ZXIoJ2RpdiMnK3NlbGYub3B0LnRhcmdldCsnIGRpdiBwcmUgc3BhbiNudW1SaWdodF8nICsgdGhpcy5nZXRJZCgpICsgJ18nICsgKGkgKyBudW1Db2xzKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KHJvdykuaW5zZXJ0QWZ0ZXIoJ2RpdiMnK3NlbGYub3B0LnRhcmdldCsnIGRpdiBwcmUgc3BhbiMnKyB0aGlzLmdldElkKCkgKyAnXycgKyAoaSArIG51bUNvbHMpICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdC8vIGFkZCB0b29sIHRpcHMgYW5kIGJhY2tncm91bmQnIGNvbG9yaW5nIGVmZmVjdFxuXHRcdGpRdWVyeSh0aGlzLl9jb250ZW50RGl2KS5maW5kKCcuYW5ub3RhdGlvbicpLmVhY2goIGZ1bmN0aW9uKCl7XG5cdFx0XHRzZWxmLl9hZGRUb29sVGlwKCB0aGlzLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHNlbGYuX2dldEFubm90YXRpb25TdHJpbmcoIGpRdWVyeSh0aGlzKS5hdHRyKFwiaWRcIikgKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRqUXVlcnkodGhpcykubW91c2VvdmVyKGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0alF1ZXJ5KCcuYW5ub3RhdGlvbi4nK2pRdWVyeShlLnRhcmdldCkuYXR0cihcImlkXCIpKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0alF1ZXJ5KHRoaXMpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgalF1ZXJ5KHRoaXMpLmF0dHIoXCJjb2xvclwiKSApO1xuXHRcdFx0XHR9KTtcblx0XHQgICAgfSkubW91c2VvdXQoZnVuY3Rpb24oKSB7XG5cdFx0ICAgIFx0alF1ZXJ5KCcuYW5ub3RhdGlvbicpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKTsgXG5cdFx0ICAgIFx0XG5cdFx0ICAgIH0pLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHQgICAgXHRcdHZhciBuYW1lID0gdW5kZWZpbmVkO1xuXHRcdCAgICBcdFx0dmFyIGlkID0galF1ZXJ5KGUudGFyZ2V0KS5hdHRyKFwiaWRcIik7XG5cdFx0ICAgIFx0XHRmb3IodmFyIGkgPTA7IGkgPCBzZWxmLl9hbm5vdGF0aW9ucy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgaWYoc2VsZi5fYW5ub3RhdGlvbnNbaV0uaWQgPT0gaWQpe1xuICAgICAgICAgICAgICAgIG5hbWUgPSBzZWxmLl9hbm5vdGF0aW9uc1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cdFx0ICAgIFx0c2VsZi50cmlnZ2VyKCBFVlRfT05fQU5OT1RBVElPTl9DTElDS0VELCB7XG5cdCAgICBcdFx0XCJuYW1lXCI6IG5hbWUsXG5cdFx0ICAgIFx0XHQvL1wicG9zXCI6IHBhcnNlSW50KCBqUXVlcnkoZS50YXJnZXQpLmF0dHIoXCJwb3NcIikgKVxuXHRcdCAgICBcdH0pO1xuXHRcdCAgICB9KTtcblx0XHRcdFxuXHRcdH0pO1xuXG4gICAgfSxcbiAgICAvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2dldEFubm90YXRpb25TdHJpbmdcbiAgICAgKiBQdXJwb3NlOiAgR2V0IHRoZSBhbm5vdGF0aW9uIHRleHQgbWVzc2FnZSBmb3IgdGhlIHRvb2x0aXAgXG4gICAgICogUmV0dXJuczogIHtzdHJpbmd9IEFubm90YXRpb24gdGV4dCBmb3IgdGhlIGFubm90YXRpb25cbiAgICAgKiBJbnB1dHM6ICAgaWQgLT4ge2ludH0gaW5kZXggb2YgdGhlIGludGVybmFsIGFubm90YXRpb24gYXJyYXlcbiAgICAgKi9cbiAgICBfZ2V0QW5ub3RhdGlvblN0cmluZzogZnVuY3Rpb24gKCBpZCApIHtcblx0XHR2YXIgYW5ub3RhdGlvbiA9IHRoaXMuX2Fubm90YXRpb25zW2lkLnN1YnN0cihpZC5pbmRleE9mKFwiX1wiKSArIDEpXTtcblx0XHRyZXR1cm4gYW5ub3RhdGlvbi5uYW1lICsgXCI8YnIvPlwiICsgKChhbm5vdGF0aW9uLmh0bWwpPyBhbm5vdGF0aW9uLmh0bWwgOiAnJyk7XG4gICAgfSxcbiAgICBcbiAgICAvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2dldEhUTUxSb3dBbm5vdFxuICAgICAqIFB1cnBvc2U6ICBCdWlsZCBhbiBhbm5vdGF0aW9uXG4gICAgICogUmV0dXJuczogIEhUTUwgb2YgdGhlIGFubm90YXRpb25cbiAgICAgKiBJbnB1dHM6ICAgY3VycmVudFBvcyAtPiB7aW50fVxuICAgICAqIFx0XHRcdCBhbm5vdGF0aW9uIC0+IHtPYmplY3R9IFxuICAgICAqICBcdFx0IHNldHRpbmdzIC0+IHtPYmplY3R9XG4gICAgICovXG4gICAgX2dldEhUTUxSb3dBbm5vdCA6IGZ1bmN0aW9uIChjdXJyZW50UG9zLCBhbm5vdGF0aW9uLCBzZXR0aW5ncykge1xuICAgIFx0dmFyIHN0eWxlQmVnaW4gPSAnYm9yZGVyLWxlZnQ6MXB4IHNvbGlkOyBib3JkZXItYm90dG9tOjFweCBzb2xpZDsgYm9yZGVyLWNvbG9yOic7XG4gICAgXHR2YXIgc3R5bGVPbiA9ICdib3JkZXItYm90dG9tOjFweCBzb2xpZDsgYm9yZGVyLWNvbG9yOic7XG4gICAgXHR2YXIgc3R5bGVFbmQgPSAnYm9yZGVyLWJvdHRvbToxcHggc29saWQ7IGJvcmRlci1yaWdodDoxcHggc29saWQ7IGJvcmRlci1jb2xvcjonO1xuXHRcdHZhciBzdHlsZUJlZ2luQW5kRW5kID0gJ2JvcmRlci1sZWZ0OjFweCBzb2xpZDsgYm9yZGVyLXJpZ2h0OjFweCBzb2xpZDsgYm9yZGVyLWJvdHRvbToxcHggc29saWQ7IGJvcmRlci1jb2xvcjonO1xuICAgIFx0XG4gICAgXHR2YXIgcm93ID0gW107XG4gICAgXHR2YXIgZW5kID0gKGN1cnJlbnRQb3MgKyBzZXR0aW5ncy5udW1Db2xzKTtcbiAgICBcdHZhciBzcGFjZUJldHdlZW5DaGFycyA9IChzZXR0aW5ncy5zcGFjZUJldHdlZW5DaGFycyk/ICcgJyA6ICcnOyAgICBcdFxuICAgIFx0dmFyIGRlZmF1bHRDb2xvciA9IGFubm90YXRpb24uY29sb3I7XG4gICAgXHR2YXIgaWQgPSBhbm5vdGF0aW9uLmlkO1xuICAgIFx0Zm9yICggdmFyIHBvcz1jdXJyZW50UG9zOyBwb3MgPCBlbmQgOyBwb3MrKyApIHtcblx0XHRcdC8vIHJlZ2lvbnNcblx0XHRcdGZvciAoIHZhciByIGluIGFubm90YXRpb24ucmVnaW9ucyApIHtcblx0XHRcdFx0cmVnaW9uID0gYW5ub3RhdGlvbi5yZWdpb25zW3JdO1xuXHRcdFx0XHRcblx0XHRcdFx0c3BhY2VBZnRlciA9ICcnO1xuXHRcdFx0XHRzcGFjZUFmdGVyICs9IChwb3MgJSBzZXR0aW5ncy5udW1Db2xzRm9yU3BhY2UgPT0gMCApPyAnICcgOiAnJztcblx0XHRcdFx0c3BhY2VBZnRlciArPSBzcGFjZUJldHdlZW5DaGFycztcblx0XHRcdFx0XG5cdFx0XHRcdGNvbG9yID0gKChyZWdpb24uY29sb3IpPyByZWdpb24uY29sb3IgOiBkZWZhdWx0Q29sb3IpO1xuXHRcdFx0XHRkYXRhID0gJ2NsYXNzPVwiYW5ub3RhdGlvbiAnK2lkKydcIiBpZD1cIicraWQrJ1wiIGNvbG9yPVwiJytjb2xvcisnXCIgcG9zPVwiJytwb3MrJ1wiJztcblx0XHRcdFx0XG5cdFx0XHRcdGlmICggcG9zID09IHJlZ2lvbi5zdGFydCAmJiBwb3MgPT0gcmVnaW9uLmVuZCkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJzxzcGFuIHN0eWxlPVwiJytzdHlsZUJlZ2luQW5kRW5kK2NvbG9yKydcIiAnK2RhdGErJz4gJztcblx0XHRcdFx0XHRyb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9ICc8L3NwYW4+Jztcblx0XHRcdFx0fSBlbHNlIGlmICggcG9zID09IHJlZ2lvbi5zdGFydCApIHtcblx0XHRcdFx0XHRyb3dbcG9zXSA9ICc8c3BhbiBzdHlsZT1cIicrc3R5bGVCZWdpbitjb2xvcisnXCIgJytkYXRhKyc+ICc7XG5cdFx0XHRcdFx0cm93W3Bvc10gKz0gc3BhY2VBZnRlcjtcblx0XHRcdFx0XHRyb3dbcG9zXSArPSAnPC9zcGFuPic7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHBvcyA9PSByZWdpb24uZW5kICkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJzxzcGFuIHN0eWxlPVwiJytzdHlsZUVuZCtjb2xvcisnIFwiICcrZGF0YSsnPiAnO1xuXHRcdFx0XHRcdC8vcm93W3Bvc10gKz0gc3BhY2VBZnRlcjtcblx0XHRcdFx0XHRyb3dbcG9zXSArPSAnPC9zcGFuPic7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHBvcyA+IHJlZ2lvbi5zdGFydCAmJiBwb3MgPCByZWdpb24uZW5kICkge1xuXHRcdFx0XHRcdHJvd1twb3NdID0gJzxzcGFuIHN0eWxlPVwiJytzdHlsZU9uK2NvbG9yKydcIiAnK2RhdGErJz4gJztcblx0XHRcdFx0XHRyb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHRcdHJvd1twb3NdICs9ICc8L3NwYW4+Jztcblx0XHRcdFx0fSBlbHNlIGlmICghcm93W3Bvc10pIHtcblx0XHRcdFx0XHRyb3dbcG9zXSA9ICcgJztcblx0XHRcdFx0XHRyb3dbcG9zXSArPSBzcGFjZUFmdGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG4gICAgICAgXHR2YXIgc3RyID0gcm93LmpvaW4oXCJcIik7XG4gICAgXHRcbiAgICBcdHJldHVybiAoIHN0ci5pbmRleE9mKFwic3BhblwiKSA9PSAtMSApPyBcIlwiIDogc3RyO1xuICAgIH0sXG4gICAgLyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3UmF3XG4gICAgICogUHVycG9zZTogIFJlcGFpbnQgdGhlIGN1cnJlbnQgc2VxdWVuY2UgdXNpbmcgUkFXIGZvcm1hdC4gIFxuICAgICAqIFJldHVybnM6ICAtXG4gICAgICogSW5wdXRzOiAtXG4gICAgICovXG5cdF9kcmF3UmF3IDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBhID0gdGhpcy5vcHQuc2VxdWVuY2UudG9Mb3dlckNhc2UoKS5zcGxpdCgnJyk7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciBhcnIgPSBbXTtcblx0XHR2YXIgcHJlID0galF1ZXJ5KCc8cHJlPjwvcHJlPicpLmFwcGVuZFRvKHRoaXMuX2NvbnRlbnREaXYpO1xuXHRcdFxuXHRcdC8qIENvcnJlY3QgY29sdW1uIHNpemUgaW4gY2FzZSB0aGUgc2VxdWVuY2UgaXMgYXMgc21hbGwgcGVwdGlkZSAqL1xuXHRcdHZhciBudW1Db2xzID0gdGhpcy5vcHQuY29sdW1ucy5zaXplO1xuXHRcdGlmICggdGhpcy5vcHQuc2VxdWVuY2UubGVuZ3RoIDwgdGhpcy5vcHQuY29sdW1ucy5zaXplICkge1xuXHRcdFx0bnVtQ29scyA9IHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aDtcdFxuXHRcdH1cblxuXHRcdHZhciBvcHQgPSB7XG5cdFx0XHRudW1Db2xzOiBudW1Db2xzXG5cdFx0fTtcblx0XHRcblx0XHRwcmUuaHRtbChcblx0XHRcdHRoaXMuX2RyYXdTZXF1ZW5jZShhLCBvcHQpXG5cdFx0KTtcblx0XHRcblx0XHR0aGlzLl9kcmF3QW5ub3RhdGlvbnMob3B0KTtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9kcmF3UHJpZGVcbiAgICAgKiBQdXJwb3NlOiAgUmVwYWludCB0aGUgY3VycmVudCBzZXF1ZW5jZSB1c2luZyBQUklERSBmb3JtYXQuICBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogLVxuICAgICAqL1xuXHRfZHJhd1ByaWRlIDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBhID0gdGhpcy5vcHQuc2VxdWVuY2UudG9VcHBlckNhc2UoKS5zcGxpdCgnJyk7XG5cdFx0dmFyIHByZSA9IGpRdWVyeSgnPHByZT48L3ByZT4nKS5hcHBlbmRUbyh0aGlzLl9jb250ZW50RGl2KTtcblx0XHRcblx0XHQvKiBDb3JyZWN0IGNvbHVtbiBzaXplIGluIGNhc2UgdGhlIHNlcXVlbmNlIGlzIGFzIHNtYWxsIHBlcHRpZGUgKi9cblx0XHR2YXIgbnVtQ29scyA9IHRoaXMub3B0LmNvbHVtbnMuc2l6ZTtcblx0XHRpZiAoIHRoaXMub3B0LnNlcXVlbmNlLmxlbmd0aCA8IHRoaXMub3B0LmNvbHVtbnMuc2l6ZSApIHtcblx0XHRcdG51bUNvbHMgPSB0aGlzLm9wdC5zZXF1ZW5jZS5sZW5ndGg7XHRcblx0XHR9XG5cdFxuXHRcdG9wdCA9IHtcblx0XHRcdG51bUxlZnQ6IHRydWUsXG5cdFx0XHRudW1MZWZ0U2l6ZTogNSxcblx0XHRcdG51bUxlZnRQYWQ6JzAnLFxuXHRcdFx0bnVtUmlnaHQ6IHRydWUsXG5cdFx0XHRudW1SaWdodFNpemU6IDUsXG5cdFx0XHRudW1SaWdodFBhZDogJzAnLFxuXHRcdFx0bnVtQ29sczogbnVtQ29scyxcblx0XHQgICAgbnVtQ29sc0ZvclNwYWNlOiBzZWxmLm9wdC5jb2x1bW5zLnNwYWNlZEVhY2hcblx0XHR9O1xuXHRcdFxuXHRcdHByZS5odG1sKFxuXHRcdFx0dGhpcy5fZHJhd1NlcXVlbmNlKGEsIG9wdClcblx0XHQpO1xuXHRcdFxuXHRcdHRoaXMuX2RyYXdBbm5vdGF0aW9ucyhvcHQpO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2RyYXdTZXF1ZW5jZVxuICAgICAqIFB1cnBvc2U6ICBSZXBhaW50IHRoZSBjdXJyZW50IHNlcXVlbmNlIHVzaW5nIENVU1RPTSBmb3JtYXQuICBcbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogICBhIC0+IHtjaGFyW119IGEgVGhlIHNlcXVlbmNlIHN0cmFuZC5cbiAgICAgKiBcdFx0XHQgb3B0IC0+IHtPYmplY3R9IG9wdCBUaGUgQ1VTVE9NIGZvcm1hdC5cbiAgICAgKi9cblx0X2RyYXdTZXF1ZW5jZSA6IGZ1bmN0aW9uKGEsIG9wdCkge1xuXHRcdHZhciBzdHIgPSAnJztcblxuXHRcdHZhciBzcGFjZVN0eWxlID0gIFwid2hpdGUtc3BhY2U6IHByZTtcIjtcblx0XHRcblx0XHQvLyBJbmRleCBhdCB0b3A/XG5cdFx0aWYoIG9wdC5udW1Ub3AgKVxuXHRcdHtcblx0XHRcdHN0ciArPSAnPHNwYW4gc3R5bGU9XCInK3NwYWNlU3R5bGUrJ1wiIGNsYXNzPVwibnVtVG9wXCI+J1xuXHRcdFx0dmFyIHNpemUgPSAob3B0LnNwYWNlQmV0d2VlbkNoYXJzKT8gb3B0Lm51bVRvcEVhY2gqMjogb3B0Lm51bVRvcEVhY2g7XG5cdFx0XHRcblx0XHRcdGlmIChvcHQubnVtTGVmdCkge1xuXHRcdFx0XHRzdHIgKz0gdGhpcy5fZm9ybWF0SW5kZXgoJyAnLCBvcHQubnVtTGVmdFNpemUsICcgJyk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHN0ciArPSB0aGlzLl9mb3JtYXRJbmRleCgnICcsIHNpemUsICcgJyk7XG5cdFx0XHRcblx0XHRcdGZvcih2YXIgeCA9IG9wdC5udW1Ub3BFYWNoOyB4IDwgb3B0Lm51bUNvbHM7IHggKz0gb3B0Lm51bVRvcEVhY2gpIHtcblx0XHRcdFx0c3RyICs9IHRoaXMuX2Zvcm1hdEluZGV4KHgsIHNpemUsICcgJywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRzdHIgKz0gJzwvc3Bhbj48YnIvPidcblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0Ly8gSW5kZXggYXQgdGhlIGxlZnQ/XG5cdFx0aWYgKG9wdC5udW1MZWZ0KSB7XG5cdFx0XHRzdHIgKz0gdGhpcy5fZm9ybWF0SW5kZXgoMSwgb3B0Lm51bUxlZnRTaXplLCBvcHQubnVtTGVmdFBhZCk7XG5cdFx0XHRzdHIgKz0gJyAgJztcblx0XHR9XG5cblx0XHR2YXIgaj0xO1xuXHRcdGZvciAodmFyIGk9MTsgaSA8PSBhLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGlmKCBpICUgb3B0Lm51bUNvbHMgPT0gMCkge1x0XG5cdFx0XHRcdHN0ciArPSAnPHNwYW4gY2xhc3M9XCJzZXF1ZW5jZVwiIGlkPVwiJyArIHRoaXMuZ2V0SWQoKSArICdfJyArIGkgKyAnXCI+JyArIGFbaS0xXSArICc8L3NwYW4+Jztcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChvcHQubnVtUmlnaHQpIHtcblx0XHRcdFx0XHRzdHIgKz0gJzxzcGFuIHN0eWxlPVwiJytzcGFjZVN0eWxlKydcIiBpZD1cIm51bVJpZ2h0XycgKyB0aGlzLmdldElkKCkgKyAnXycgKyBpICsgJ1wiPic7XG5cdFx0XHRcdFx0c3RyICs9ICcgICc7XG5cdFx0XHRcdFx0c3RyICs9IHRoaXMuX2Zvcm1hdEluZGV4KGksIG9wdC5udW1SaWdodFNpemUsIG9wdC5udW1SaWdodFBhZCk7XHRcblx0XHRcdFx0XHRzdHIgKz0gJzwvc3Bhbj4nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRzdHIgKz0gJzxici8+Jztcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBhYVJlbWFpbmluZyA9IGEubGVuZ3RoIC0gaTtcblx0XHRcdFx0aWYgKG9wdC5udW1MZWZ0ICYmIGFhUmVtYWluaW5nID4gMCkge1xuXHRcdFx0XHRcdHN0ciArPSAnPHNwYW4gaWQ9XCJudW1MZWZ0XycgKyB0aGlzLmdldElkKCkgKyAnXycgKyBpICsgJ1wiPic7XG5cdFx0XHRcdFx0c3RyICs9IHRoaXMuX2Zvcm1hdEluZGV4KGkrMSwgb3B0Lm51bUxlZnRTaXplLCBvcHQubnVtTGVmdFBhZCk7XG5cdFx0XHRcdFx0c3RyICs9ICcgICc7XG5cdFx0XHRcdFx0c3RyICs9ICc8L3NwYW4+Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aiA9IDE7XG5cdFx0XHRcdFxuXHRcdFx0fSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzxzcGFuIGNsYXNzPVwic2VxdWVuY2VcIiBzdHlsZT1cIicrc3BhY2VTdHlsZSsnXCIgaWQ9XCInICsgdGhpcy5nZXRJZCgpICsgJ18nICsgaSArICdcIj4nICsgYVtpLTFdO1xuXHRcdFx0XHRzdHIgKz0gKCBqICUgb3B0Lm51bUNvbHNGb3JTcGFjZSA9PSAwKT8gJyAnIDogJyc7XG5cdFx0XHRcdHN0ciArPSAob3B0LnNwYWNlQmV0d2VlbkNoYXJzKT8gJyAnIDogJyc7XG5cdFx0XHRcdHN0ciArPSAnPC9zcGFuPic7XG5cdFx0XHRcdGorKztcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0c3RyICs9ICc8YnIvPidcdFxuXHRcdFx0XG5cdFx0aWYgKGpRdWVyeS5icm93c2VyLm1zaWUpIHtcblx0XHRcdHN0ciA9IFwiPHByZT5cIiArIHN0ciArIFwiPC9wcmU+XCI7XG5cdFx0fVx0XG5cdFx0XHRcblx0XHRyZXR1cm4gc3RyO1xuXHR9LFxuXHQvKiBcbiAgICAgKiBGdW5jdGlvbjogU2VxdWVuY2UuX2Zvcm1hdEluZGV4XG4gICAgICogUHVycG9zZTogIEJ1aWxkIHRoZSBIVE1MIGNvcnJlc3BvbmRpbmcgdG8gY291bnRpbmcgbnVtYmVycyAodG9wLCBsZWZ0LCByaWdodCkgaW4gdGhlIHN0cmFuZC5cbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogICBudW1iZXIgLT4ge2ludH0gVGhlIG51bWJlciBcbiAgICAgKiBcdFx0XHQgc2l6ZSAtPiB7aW50fSBOdW1iZXIgb2YgYmlucyB0byBzdWl0IHRoZSBudW1iZXIuXG4gICAgICogXHRcdFx0IGZpbGxpbmdDaGFyIC0+IHtjaGFyfSBDaGFyYWN0ZXIgdG8gYmUgdXNlZCBmb3IgZmlsbGluZyBvdXQgYmxhbmsgYmlucy5cbiAgICAgKiBcdFx0XHQgYWxpZ25MZWZ0IC0+IHtib29sfSBUZWxsIGlmIGFsaWduZWQgdG8gdGhlIGxlZnQuXG4gICAgICovXG5cdF9mb3JtYXRJbmRleCA6IGZ1bmN0aW9uKCBudW1iZXIsIHNpemUsIGZpbGxpbmdDaGFyLCBhbGlnbkxlZnQpIHtcblx0XHR2YXIgc3RyID0gbnVtYmVyLnRvU3RyaW5nKCk7XG5cdFx0dmFyIGZpbGxpbmcgPSAnJztcblx0XHR2YXIgcGFkZGluZyA9IHNpemUgLSBzdHIubGVuZ3RoO1x0XG5cdFx0aWYgKCBwYWRkaW5nID4gMCApIHtcblx0XHRcdHdoaWxlICggcGFkZGluZy0tID4gMCApIHtcblx0XHRcdFx0ZmlsbGluZyArPSAoXCI8c3Bhbj5cIitmaWxsaW5nQ2hhcitcIjwvc3Bhbj5cIik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWxpZ25MZWZ0KXtcblx0XHRcdFx0c3RyID0gbnVtYmVyK2ZpbGxpbmc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdHIgPSBmaWxsaW5nK251bWJlcjtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0cjtcblx0fSxcblx0LyogXG4gICAgICogRnVuY3Rpb246IFNlcXVlbmNlLl9hZGRTcGFuRXZlbnRzXG4gICAgICogUHVycG9zZTogIEFkZCB0aGUgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIHN0cmFuZC5cbiAgICAgKiBSZXR1cm5zOiAgLVxuICAgICAqIElucHV0czogICAtXG4gICAgICovXG5cdF9hZGRTcGFuRXZlbnRzIDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBpc01vdXNlRG93biA9IGZhbHNlO1xuXHRcdHZhciBjdXJyZW50UG9zO1xuXG5cdFx0c2VsZi5fY29udGVudERpdi5maW5kKCcuc2VxdWVuY2UnKS5lYWNoKCBmdW5jdGlvbiAoKSB7XHRcblx0XHRcdFxuXHRcdFx0Ly8gUmVnaXN0ZXIgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uXG5cdFx0XHRqUXVlcnkodGhpcykubW91c2Vkb3duKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgaWQgPSBqUXVlcnkodGhpcykuYXR0cignaWQnKTtcblx0XHRcdFx0Y3VycmVudFBvcyA9IHBhcnNlSW50KGlkLnN1YnN0cihpZC5pbmRleE9mKFwiX1wiKSArIDEpKTtcblx0XHRcdFx0Y2xpY2tQb3MgPSBjdXJyZW50UG9zO1xuXHRcdFx0XHRzZWxmLl9zZXRTZWxlY3Rpb24oY2xpY2tQb3MsY3VycmVudFBvcyk7XG5cdFx0XHRcdGlzTW91c2VEb3duID0gdHJ1ZTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIFNlbGVjdGlvbiBpcyBoYXBwZW5pbmcsIHJhaXNlIGFuIGV2ZW50XG5cdFx0XHRcdHNlbGYudHJpZ2dlcihcblx0XHRcdFx0XHRFVlRfT05fU0VMRUNUSU9OX0NIQU5HRSwgXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdFwic3RhcnRcIiA6IHNlbGYub3B0LnNlbGVjdGlvbi5zdGFydCwgXG5cdFx0XHRcdFx0XHRcImVuZFwiIDogc2VsZi5vcHQuc2VsZWN0aW9uLmVuZCBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHRcblx0XHRcdH0pLm1vdXNlb3ZlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gVXBkYXRlIHNlbGVjdGlvblxuXHRcdFx0XHQvLyBTaG93IHRvb2x0aXAgY29udGFpbmluZyB0aGUgcG9zaXRpb25cblx0XHRcdFx0dmFyIGlkID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJyk7XG5cdFx0XHRcdGN1cnJlbnRQb3MgPSBwYXJzZUludChpZC5zdWJzdHIoaWQuaW5kZXhPZihcIl9cIikgKyAxKSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihpc01vdXNlRG93bikge1xuXHRcdFx0XHRcdGlmKCBjdXJyZW50UG9zID4gY2xpY2tQb3MgKSB7XG5cdFx0XHRcdFx0XHRzZWxmLl9zZXRTZWxlY3Rpb24oY2xpY2tQb3MsIGN1cnJlbnRQb3MpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLl9zZXRTZWxlY3Rpb24oY3VycmVudFBvcywgY2xpY2tQb3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBTZWxlY3Rpb24gaXMgaGFwcGVuaW5nLCByYWlzZSBhbiBldmVudFxuXHRcdFx0XHRcdHNlbGYudHJpZ2dlciggRVZUX09OX1NFTEVDVElPTl9DSEFOR0UsIHsgXG5cdFx0XHRcdFx0XHRcInN0YXJ0XCIgOiBzZWxmLm9wdC5zZWxlY3Rpb24uc3RhcnQsIFxuXHRcdFx0XHRcdFx0XCJlbmRcIiA6IHNlbGYub3B0LnNlbGVjdGlvbi5lbmQgXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gXG5cdFx0XHRcdFxuXHRcdFx0fSkubW91c2V1cChmdW5jdGlvbigpIHtcblx0XHRcdFx0aXNNb3VzZURvd24gPSBmYWxzZTtcblx0XHRcdFx0Ly8gU2VsZWN0aW9uIGlzIGRvbmUsIHJhaXNlIGFuIGV2ZW50XG5cdFx0XHRcdHNlbGYudHJpZ2dlciggRVZUX09OX1NFTEVDVElPTl9DSEFOR0VELCB7IFxuXHRcdFx0XHRcdFwic3RhcnRcIiA6IHNlbGYub3B0LnNlbGVjdGlvbi5zdGFydCwgXG5cdFx0XHRcdFx0XCJlbmRcIiA6IHNlbGYub3B0LnNlbGVjdGlvbi5lbmQgXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vIEFkZCBhIHRvb2x0aXAgZm9yIHRoaXMgc2VxdWVuY2UgYmFzZS5cblx0XHRcdHNlbGYuX2FkZFRvb2xUaXAuY2FsbCggc2VsZiwgdGhpcywgZnVuY3Rpb24oICkge1xuXHRcdFx0XHRpZiAoaXNNb3VzZURvd24pIHtcblx0ICAgICBcdFx0XHRyZXR1cm4gXCJbXCIgKyBzZWxmLm9wdC5zZWxlY3Rpb24uc3RhcnQgK1wiLCBcIiArIHNlbGYub3B0LnNlbGVjdGlvbi5lbmQgKyBcIl1cIjtcblx0ICAgICBcdFx0fSBlbHNlIHtcblx0ICAgICBcdFx0XHRyZXR1cm4gY3VycmVudFBvcztcblx0ICAgICBcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHR9KVxuXHRcdC5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG5cdH0sXG5cdC8qIFxuICAgICAqIEZ1bmN0aW9uOiBTZXF1ZW5jZS5fYWRkVG9vbHRpcFxuICAgICAqIFB1cnBvc2U6ICBBZGQgYSB0b29sdGlwIGFyb3VuZCB0aGUgdGFyZ2V0IERPTSBlbGVtZW50IHByb3ZpZGVkIGFzIGFyZ3VtZW50XG4gICAgICogUmV0dXJuczogIC1cbiAgICAgKiBJbnB1dHM6ICAgdGFyZ2V0IC0+IHtFbGVtZW50fSBET00gZWxlbWVudCB3aWNoIGlzIHRoZSB0YXJnZXRlZCBmb2N1cyBmb3IgdGhlIHRvb2x0aXAuXG4gICAgICogXHRcdFx0IGNiR2V0TWVzc2FnZUZ1bmN0aW9uIC0+IHtmdW5jdGlvbn0gQSBjYWxsYmFjayBmdW5jdGlvbiB3aWNoIHJldHVybnMgdGhlIG1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB0aXAuXG4gICAgICovXG5cdF9hZGRUb29sVGlwIDogZnVuY3Rpb24gKCB0YXJnZXQsIGNiR2V0TWVzc2FnZUZ1bmN0aW9uICkge1xuXHRcdFxuIFx0XHR2YXIgdGlwSWQgPSAnI3NlcXVlbmNlVGlwJyArIHRoaXMuZ2V0SWQoKTtcblx0XHRcblx0XHRqUXVlcnkodGFyZ2V0KS5tb3VzZW92ZXIoZnVuY3Rpb24oZSkge1xuXHRcdFx0XG5cdCBcdFx0dmFyIG9mZnNldCA9IGpRdWVyeShlLnRhcmdldCkub2Zmc2V0KCk7XG5cblx0XHRcdGlmICggISBqUXVlcnkoIHRpcElkICkuaXMoJzp2aXNpYmxlJykgKSB7XG5cdFx0ICAgICAgICBqUXVlcnkoIHRpcElkICkgXG5cdFx0ICAgICAgICBcdC5jc3Moe1xuXHRcdCAgICAgICAgXHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogXCIjMDAwXCIsXG5cdFx0ICAgICAgICBcdFx0J3BhZGRpbmcnOiBcIjNweCAxMHB4IDNweCAxMHB4XCIsXG5cdFx0ICAgICAgICBcdFx0J3RvcCc6IG9mZnNldC50b3AgKyBqUXVlcnkoZS50YXJnZXQpLmhlaWdodCgpICsgXCJweFwiLFxuXHRcdCAgICAgICAgXHRcdCdsZWZ0Jzogb2Zmc2V0LmxlZnQgKyBqUXVlcnkoZS50YXJnZXQpLndpZHRoKCkgKyBcInB4XCJcblx0XHQgICAgICAgIFx0fSlcblx0XHRcdCAgICAgICAgLmFuaW1hdGUoIHtvcGFjaXR5OiAnMC44NSd9LCAxMClcblx0XHRcdCAgICAgICAgLmh0bWwoIGNiR2V0TWVzc2FnZUZ1bmN0aW9uLmNhbGwoIHRhcmdldCApIClcblx0XHRcdCAgICAgICAgLnNob3coKTtcblx0XHRcdH1cblxuXHQgICAgfSkubW91c2VvdXQoZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgLy9SZW1vdmUgdGhlIGFwcGVuZGVkIHRvb2x0aXAgdGVtcGxhdGVcblx0ICAgICAgICBqUXVlcnkoIHRpcElkICkuaGlkZSgpO1x0ICAgICAgICAgXG5cdCAgICB9KTtcblx0fSxcblx0XG4gICAvKipcbiAgICAqIEFubm90YXRlIGEgc2V0IG9mIGludGVydmFscyBwcm92aWRlZCBpbiB0aGUgYXJndW1lbnQuXG5cdCogXG5cdCogQGRlcHJlY2F0ZWQgVXNlIGFkZEFubm90YXRpb24oKSBpbnN0ZWFkLlxuICAgICogXG4gICAgKiBAcGFyYW0ge09iamVjdH0gYW5ub3RhdGlvbiBUaGUgaW50ZXJ2YWxzIGJlbG9uZ2luZyB0byB0aGUgc2FtZSBhbm5vdGF0aW9uLiBcbiAgICAqIFN5bnRheDogeyBuYW1lOiAmbHQ7dmFsdWUmZ3Q7LCBjb2xvcjogJmx0O0hUTUxDb2xvckNvZGUmZ3Q7LCBodG1sOiAmbHQ7SFRNTFN0cmluZyZndDssIHJlZ2lvbnM6IFt7IHN0YXJ0OiAmbHQ7c3RhcnRWYWwxJmd0OywgZW5kOiAmbHQ7ZW5kVmFsMSZndDt9LCAuLi4sICB7IHN0YXJ0OiAmbHQ7c3RhcnRWYWxOJmd0OywgZW5kOiAmbHQ7ZW5kVmFsTiZndDt9XSB9XG4gICAgKi9cblx0c2V0QW5ub3RhdGlvbjogZnVuY3Rpb24gKCBhbm5vdGF0aW9uICkge1xuXHRcdHRoaXMuYWRkQW5ub3RhdGlvbihhbm5vdGF0aW9uKTtcblx0fSxcblx0XG5cdC8qKlxuICAgICogQW5ub3RhdGUgYSBzZXQgb2YgaW50ZXJ2YWxzIHByb3ZpZGVkIGluIHRoZSBhcmd1bWVudC5cbiAgICAqIFxuICAgICogQGV4YW1wbGVcbiAgICAqIC8vIEFubm90YXRpb25zIHVzaW5nIHJlZ2lvbnMgd2l0aCBkaWZmZXJlbnQgY29sb3JzLlxuICAgICogbXlTZXF1ZW5jZS5hZGRBbm5vdGF0aW9uKHtcblx0KiAgICBuYW1lOlwiVU5JUFJPVFwiLCBcblx0KiAgICBodG1sOlwiJmx0O2JyJmd0OyBFeGFtcGxlIG9mICZsdDtiJmd0O0hUTUwmbHQ7L2ImZ3Q7XCIsIFxuXHQqICAgIGNvbG9yOlwiZ3JlZW5cIiwgXG5cdCogICAgcmVnaW9uczogW1xuXHQqICAgICAgIHtzdGFydDogNTQwLCBlbmQ6IDU2MH0sXG5cdCogICAgICAge3N0YXJ0OiA1NjEsIGVuZDo1ODAsIGNvbG9yOiBcIiNGRkEwMTBcIn0sIFxuXHQqICAgICAgIHtzdGFydDogNTgxLCBlbmQ6NTkwLCBjb2xvcjogXCJyZWRcIn0sIFxuXHQqICAgICAgIHtzdGFydDogNjkwLCBlbmQ6NzEwfV1cblx0KiB9KTtcblx0KiBcbiAgICAqIFxuICAgICogQHBhcmFtIHtPYmplY3R9IGFubm90YXRpb24gVGhlIGludGVydmFscyBiZWxvbmdpbmcgdG8gdGhlIHNhbWUgYW5ub3RhdGlvbi4gXG4gICAgKiBTeW50YXg6IHsgbmFtZTogJmx0O3ZhbHVlJmd0OywgY29sb3I6ICZsdDtIVE1MQ29sb3JDb2RlJmd0OywgaHRtbDogJmx0O0hUTUxTdHJpbmcmZ3Q7LCByZWdpb25zOiBbeyBzdGFydDogJmx0O3N0YXJ0VmFsMSZndDssIGVuZDogJmx0O2VuZFZhbDEmZ3Q7fSwgLi4uLCAgeyBzdGFydDogJmx0O3N0YXJ0VmFsTiZndDssIGVuZDogJmx0O2VuZFZhbE4mZ3Q7fV0gfVxuICAgICovXG5cdGFkZEFubm90YXRpb246IGZ1bmN0aW9uICggYW5ub3RhdGlvbiApIHtcblx0XHR0aGlzLl9hbm5vdGF0aW9ucy5wdXNoKGFubm90YXRpb24pO1xuXHRcdHRoaXMuX3JlZHJhdygpO1xuXHR9LFxuXHRcblx0LyoqXG4gICAgKiBSZW1vdmVzIGFuIGFubm90YXRpb24gYnkgbWVhbnMgb2YgaXRzIG5hbWUuXG4gICAgKiBcbiAgICAqIEBleGFtcGxlIFxuICAgICogLy8gUmVtb3ZlIHRoZSBVTklQUk9UIGFubm90YXRpb24uXG4gICAgKiBteVNlcXVlbmNlLnJlbW92ZUFubm90YXRpb24oJ1VOSVBST1QnKTsgXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhbm5vdGF0aW9uIHRvIGJlIHJlbW92ZWQuXG4gICAgKiBcbiAgICAqL1xuXHRyZW1vdmVBbm5vdGF0aW9uOiBmdW5jdGlvbiAoIG5hbWUgKSB7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5fYW5ub3RhdGlvbnMubGVuZ3RoIDsgaSsrICl7XG5cdFx0XHRpZihuYW1lICE9IHRoaXMuX2Fubm90YXRpb25zW2ldLm5hbWUpe1xuXHRcdFx0XHR0aGlzLl9hbm5vdGF0aW9ucy5zcGxpY2UoaSwxKTtcblx0XHRcdFx0dGhpcy5fcmVkcmF3KCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0LyoqXG4gICAgKiBSZW1vdmVzIGFsbCB0aGUgY3VycmVudCBhbm5vdGF0aW9ucy5cbiAgICAqIFxuICAgICogQGV4YW1wbGUgXG4gICAgKiBteVNlcXVlbmNlLnJlbW92ZUFsbEFubm90YXRpb25zKCk7IFxuICAgICogXG4gICAgKi9cblx0cmVtb3ZlQWxsQW5ub3RhdGlvbnM6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9hbm5vdGF0aW9ucyA9IFtdO1xuXHRcdHRoaXMuX3JlZHJhdygpO1xuXHR9LFxuXG5cdFxufSk7XG5cbnJlcXVpcmUoXCJiaW9qcy1ldmVudHNcIikubWl4aW4oU2VxdWVuY2UucHJvdG90eXBlKTtcbm1vZHVsZS5leHBvcnRzID0gU2VxdWVuY2U7XG4iLCJ2YXIgZXZlbnRzID0gcmVxdWlyZShcImJhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lXCIpO1xuXG5ldmVudHMub25BbGwgPSBmdW5jdGlvbihjYWxsYmFjayxjb250ZXh0KXtcbiAgdGhpcy5vbihcImFsbFwiLCBjYWxsYmFjayxjb250ZXh0KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBNaXhpbiB1dGlsaXR5XG5ldmVudHMub2xkTWl4aW4gPSBldmVudHMubWl4aW47XG5ldmVudHMubWl4aW4gPSBmdW5jdGlvbihwcm90bykge1xuICBldmVudHMub2xkTWl4aW4ocHJvdG8pO1xuICAvLyBhZGQgY3VzdG9tIG9uQWxsXG4gIHZhciBleHBvcnRzID0gWydvbkFsbCddO1xuICBmb3IodmFyIGk9MDsgaSA8IGV4cG9ydHMubGVuZ3RoO2krKyl7XG4gICAgdmFyIG5hbWUgPSBleHBvcnRzW2ldO1xuICAgIHByb3RvW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgfVxuICByZXR1cm4gcHJvdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50cztcbiIsIi8qKlxuICogU3RhbmRhbG9uZSBleHRyYWN0aW9uIG9mIEJhY2tib25lLkV2ZW50cywgbm8gZXh0ZXJuYWwgZGVwZW5kZW5jeSByZXF1aXJlZC5cbiAqIERlZ3JhZGVzIG5pY2VseSB3aGVuIEJhY2tvbmUvdW5kZXJzY29yZSBhcmUgYWxyZWFkeSBhdmFpbGFibGUgaW4gdGhlIGN1cnJlbnRcbiAqIGdsb2JhbCBjb250ZXh0LlxuICpcbiAqIE5vdGUgdGhhdCBkb2NzIHN1Z2dlc3QgdG8gdXNlIHVuZGVyc2NvcmUncyBgXy5leHRlbmQoKWAgbWV0aG9kIHRvIGFkZCBFdmVudHNcbiAqIHN1cHBvcnQgdG8gc29tZSBnaXZlbiBvYmplY3QuIEEgYG1peGluKClgIG1ldGhvZCBoYXMgYmVlbiBhZGRlZCB0byB0aGUgRXZlbnRzXG4gKiBwcm90b3R5cGUgdG8gYXZvaWQgdXNpbmcgdW5kZXJzY29yZSBmb3IgdGhhdCBzb2xlIHB1cnBvc2U6XG4gKlxuICogICAgIHZhciBteUV2ZW50RW1pdHRlciA9IEJhY2tib25lRXZlbnRzLm1peGluKHt9KTtcbiAqXG4gKiBPciBmb3IgYSBmdW5jdGlvbiBjb25zdHJ1Y3RvcjpcbiAqXG4gKiAgICAgZnVuY3Rpb24gTXlDb25zdHJ1Y3Rvcigpe31cbiAqICAgICBNeUNvbnN0cnVjdG9yLnByb3RvdHlwZS5mb28gPSBmdW5jdGlvbigpe31cbiAqICAgICBCYWNrYm9uZUV2ZW50cy5taXhpbihNeUNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gKlxuICogKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgSW5jLlxuICogKGMpIDIwMTMgTmljb2xhcyBQZXJyaWF1bHRcbiAqL1xuLyogZ2xvYmFsIGV4cG9ydHM6dHJ1ZSwgZGVmaW5lLCBtb2R1bGUgKi9cbihmdW5jdGlvbigpIHtcbiAgdmFyIHJvb3QgPSB0aGlzLFxuICAgICAgYnJlYWtlciA9IHt9LFxuICAgICAgbmF0aXZlRm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLFxuICAgICAgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICBpZENvdW50ZXIgPSAwO1xuXG4gIC8vIFJldHVybnMgYSBwYXJ0aWFsIGltcGxlbWVudGF0aW9uIG1hdGNoaW5nIHRoZSBtaW5pbWFsIEFQSSBzdWJzZXQgcmVxdWlyZWRcbiAgLy8gYnkgQmFja2JvbmUuRXZlbnRzXG4gIGZ1bmN0aW9uIG1pbmlzY29yZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5czogT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImtleXMoKSBjYWxsZWQgb24gYSBub24tb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXksIGtleXMgPSBbXTtcbiAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBrZXlzW2tleXMubGVuZ3RoXSA9IGtleTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICB9LFxuXG4gICAgICB1bmlxdWVJZDogZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgICAgIHZhciBpZCA9ICsraWRDb3VudGVyICsgJyc7XG4gICAgICAgIHJldHVybiBwcmVmaXggPyBwcmVmaXggKyBpZCA6IGlkO1xuICAgICAgfSxcblxuICAgICAgaGFzOiBmdW5jdGlvbihvYmosIGtleSkge1xuICAgICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gICAgICB9LFxuXG4gICAgICBlYWNoOiBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBpZiAobmF0aXZlRm9yRWFjaCAmJiBvYmouZm9yRWFjaCA9PT0gbmF0aXZlRm9yRWFjaCkge1xuICAgICAgICAgIG9iai5mb3JFYWNoKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopID09PSBicmVha2VyKSByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhcyhvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKSA9PT0gYnJlYWtlcikgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgb25jZTogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICB2YXIgcmFuID0gZmFsc2UsIG1lbW87XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAocmFuKSByZXR1cm4gbWVtbztcbiAgICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgZnVuYyA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHZhciBfID0gbWluaXNjb3JlKCksIEV2ZW50cztcblxuICAvLyBCYWNrYm9uZS5FdmVudHNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gQSBtb2R1bGUgdGhhdCBjYW4gYmUgbWl4ZWQgaW4gdG8gKmFueSBvYmplY3QqIGluIG9yZGVyIHRvIHByb3ZpZGUgaXQgd2l0aFxuICAvLyBjdXN0b20gZXZlbnRzLiBZb3UgbWF5IGJpbmQgd2l0aCBgb25gIG9yIHJlbW92ZSB3aXRoIGBvZmZgIGNhbGxiYWNrXG4gIC8vIGZ1bmN0aW9ucyB0byBhbiBldmVudDsgYHRyaWdnZXJgLWluZyBhbiBldmVudCBmaXJlcyBhbGwgY2FsbGJhY2tzIGluXG4gIC8vIHN1Y2Nlc3Npb24uXG4gIC8vXG4gIC8vICAgICB2YXIgb2JqZWN0ID0ge307XG4gIC8vICAgICBfLmV4dGVuZChvYmplY3QsIEJhY2tib25lLkV2ZW50cyk7XG4gIC8vICAgICBvYmplY3Qub24oJ2V4cGFuZCcsIGZ1bmN0aW9uKCl7IGFsZXJ0KCdleHBhbmRlZCcpOyB9KTtcbiAgLy8gICAgIG9iamVjdC50cmlnZ2VyKCdleHBhbmQnKTtcbiAgLy9cbiAgRXZlbnRzID0ge1xuXG4gICAgLy8gQmluZCBhbiBldmVudCB0byBhIGBjYWxsYmFja2AgZnVuY3Rpb24uIFBhc3NpbmcgYFwiYWxsXCJgIHdpbGwgYmluZFxuICAgIC8vIHRoZSBjYWxsYmFjayB0byBhbGwgZXZlbnRzIGZpcmVkLlxuICAgIG9uOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCAodGhpcy5fZXZlbnRzW25hbWVdID0gW10pO1xuICAgICAgZXZlbnRzLnB1c2goe2NhbGxiYWNrOiBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCwgY3R4OiBjb250ZXh0IHx8IHRoaXN9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIG9ubHkgYmUgdHJpZ2dlcmVkIGEgc2luZ2xlIHRpbWUuIEFmdGVyIHRoZSBmaXJzdCB0aW1lXG4gICAgLy8gdGhlIGNhbGxiYWNrIGlzIGludm9rZWQsIGl0IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICBvbmNlOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uY2UnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIG9uY2UgPSBfLm9uY2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYub2ZmKG5hbWUsIG9uY2UpO1xuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgICBvbmNlLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgcmV0dXJuIHRoaXMub24obmFtZSwgb25jZSwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSBvbmUgb3IgbWFueSBjYWxsYmFja3MuIElmIGBjb250ZXh0YCBpcyBudWxsLCByZW1vdmVzIGFsbFxuICAgIC8vIGNhbGxiYWNrcyB3aXRoIHRoYXQgZnVuY3Rpb24uIElmIGBjYWxsYmFja2AgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3MgZm9yIHRoZSBldmVudC4gSWYgYG5hbWVgIGlzIG51bGwsIHJlbW92ZXMgYWxsIGJvdW5kXG4gICAgLy8gY2FsbGJhY2tzIGZvciBhbGwgZXZlbnRzLlxuICAgIG9mZjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIHZhciByZXRhaW4sIGV2LCBldmVudHMsIG5hbWVzLCBpLCBsLCBqLCBrO1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIWV2ZW50c0FwaSh0aGlzLCAnb2ZmJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkpIHJldHVybiB0aGlzO1xuICAgICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IF8ua2V5cyh0aGlzLl9ldmVudHMpO1xuICAgICAgZm9yIChpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgIGlmIChldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0pIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbbmFtZV0gPSByZXRhaW4gPSBbXTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2sgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgZm9yIChqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgZXYgPSBldmVudHNbal07XG4gICAgICAgICAgICAgIGlmICgoY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjay5fY2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgICAgICAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldi5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIGRlbGV0ZSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFRyaWdnZXIgb25lIG9yIG1hbnkgZXZlbnRzLCBmaXJpbmcgYWxsIGJvdW5kIGNhbGxiYWNrcy4gQ2FsbGJhY2tzIGFyZVxuICAgIC8vIHBhc3NlZCB0aGUgc2FtZSBhcmd1bWVudHMgYXMgYHRyaWdnZXJgIGlzLCBhcGFydCBmcm9tIHRoZSBldmVudCBuYW1lXG4gICAgLy8gKHVubGVzcyB5b3UncmUgbGlzdGVuaW5nIG9uIGBcImFsbFwiYCwgd2hpY2ggd2lsbCBjYXVzZSB5b3VyIGNhbGxiYWNrIHRvXG4gICAgLy8gcmVjZWl2ZSB0aGUgdHJ1ZSBuYW1lIG9mIHRoZSBldmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQpLlxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgaWYgKCFldmVudHNBcGkodGhpcywgJ3RyaWdnZXInLCBuYW1lLCBhcmdzKSkgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdO1xuICAgICAgdmFyIGFsbEV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hbGw7XG4gICAgICBpZiAoZXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncyk7XG4gICAgICBpZiAoYWxsRXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBUZWxsIHRoaXMgb2JqZWN0IHRvIHN0b3AgbGlzdGVuaW5nIHRvIGVpdGhlciBzcGVjaWZpYyBldmVudHMgLi4uIG9yXG4gICAgLy8gdG8gZXZlcnkgb2JqZWN0IGl0J3MgY3VycmVudGx5IGxpc3RlbmluZyB0by5cbiAgICBzdG9wTGlzdGVuaW5nOiBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGRlbGV0ZUxpc3RlbmVyID0gIW5hbWUgJiYgIWNhbGxiYWNrO1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzO1xuICAgICAgaWYgKG9iaikgKGxpc3RlbmVycyA9IHt9KVtvYmouX2xpc3RlbmVySWRdID0gb2JqO1xuICAgICAgZm9yICh2YXIgaWQgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgIGxpc3RlbmVyc1tpZF0ub2ZmKG5hbWUsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgaWYgKGRlbGV0ZUxpc3RlbmVyKSBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2lkXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHNwbGl0IGV2ZW50IHN0cmluZ3MuXG4gIHZhciBldmVudFNwbGl0dGVyID0gL1xccysvO1xuXG4gIC8vIEltcGxlbWVudCBmYW5jeSBmZWF0dXJlcyBvZiB0aGUgRXZlbnRzIEFQSSBzdWNoIGFzIG11bHRpcGxlIGV2ZW50XG4gIC8vIG5hbWVzIGBcImNoYW5nZSBibHVyXCJgIGFuZCBqUXVlcnktc3R5bGUgZXZlbnQgbWFwcyBge2NoYW5nZTogYWN0aW9ufWBcbiAgLy8gaW4gdGVybXMgb2YgdGhlIGV4aXN0aW5nIEFQSS5cbiAgdmFyIGV2ZW50c0FwaSA9IGZ1bmN0aW9uKG9iaiwgYWN0aW9uLCBuYW1lLCByZXN0KSB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIEhhbmRsZSBldmVudCBtYXBzLlxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW2tleSwgbmFtZVtrZXldXS5jb25jYXQocmVzdCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzcGFjZSBzZXBhcmF0ZWQgZXZlbnQgbmFtZXMuXG4gICAgaWYgKGV2ZW50U3BsaXR0ZXIudGVzdChuYW1lKSkge1xuICAgICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdChldmVudFNwbGl0dGVyKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW25hbWVzW2ldXS5jb25jYXQocmVzdCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIEEgZGlmZmljdWx0LXRvLWJlbGlldmUsIGJ1dCBvcHRpbWl6ZWQgaW50ZXJuYWwgZGlzcGF0Y2ggZnVuY3Rpb24gZm9yXG4gIC8vIHRyaWdnZXJpbmcgZXZlbnRzLiBUcmllcyB0byBrZWVwIHRoZSB1c3VhbCBjYXNlcyBzcGVlZHkgKG1vc3QgaW50ZXJuYWxcbiAgLy8gQmFja2JvbmUgZXZlbnRzIGhhdmUgMyBhcmd1bWVudHMpLlxuICB2YXIgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncykge1xuICAgIHZhciBldiwgaSA9IC0xLCBsID0gZXZlbnRzLmxlbmd0aCwgYTEgPSBhcmdzWzBdLCBhMiA9IGFyZ3NbMV0sIGEzID0gYXJnc1syXTtcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTsgcmV0dXJuO1xuICAgICAgY2FzZSAxOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpOyByZXR1cm47XG4gICAgICBjYXNlIDI6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpOyByZXR1cm47XG4gICAgICBjYXNlIDM6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTsgcmV0dXJuO1xuICAgICAgZGVmYXVsdDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGxpc3Rlbk1ldGhvZHMgPSB7bGlzdGVuVG86ICdvbicsIGxpc3RlblRvT25jZTogJ29uY2UnfTtcblxuICAvLyBJbnZlcnNpb24tb2YtY29udHJvbCB2ZXJzaW9ucyBvZiBgb25gIGFuZCBgb25jZWAuIFRlbGwgKnRoaXMqIG9iamVjdCB0b1xuICAvLyBsaXN0ZW4gdG8gYW4gZXZlbnQgaW4gYW5vdGhlciBvYmplY3QgLi4uIGtlZXBpbmcgdHJhY2sgb2Ygd2hhdCBpdCdzXG4gIC8vIGxpc3RlbmluZyB0by5cbiAgXy5lYWNoKGxpc3Rlbk1ldGhvZHMsIGZ1bmN0aW9uKGltcGxlbWVudGF0aW9uLCBtZXRob2QpIHtcbiAgICBFdmVudHNbbWV0aG9kXSA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMgfHwgKHRoaXMuX2xpc3RlbmVycyA9IHt9KTtcbiAgICAgIHZhciBpZCA9IG9iai5fbGlzdGVuZXJJZCB8fCAob2JqLl9saXN0ZW5lcklkID0gXy51bmlxdWVJZCgnbCcpKTtcbiAgICAgIGxpc3RlbmVyc1tpZF0gPSBvYmo7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICBvYmpbaW1wbGVtZW50YXRpb25dKG5hbWUsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEFsaWFzZXMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICBFdmVudHMuYmluZCAgID0gRXZlbnRzLm9uO1xuICBFdmVudHMudW5iaW5kID0gRXZlbnRzLm9mZjtcblxuICAvLyBNaXhpbiB1dGlsaXR5XG4gIEV2ZW50cy5taXhpbiA9IGZ1bmN0aW9uKHByb3RvKSB7XG4gICAgdmFyIGV4cG9ydHMgPSBbJ29uJywgJ29uY2UnLCAnb2ZmJywgJ3RyaWdnZXInLCAnc3RvcExpc3RlbmluZycsICdsaXN0ZW5UbycsXG4gICAgICAgICAgICAgICAgICAgJ2xpc3RlblRvT25jZScsICdiaW5kJywgJ3VuYmluZCddO1xuICAgIF8uZWFjaChleHBvcnRzLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBwcm90b1tuYW1lXSA9IHRoaXNbbmFtZV07XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHByb3RvO1xuICB9O1xuXG4gIC8vIEV4cG9ydCBFdmVudHMgYXMgQmFja2JvbmVFdmVudHMgZGVwZW5kaW5nIG9uIGN1cnJlbnQgY29udGV4dFxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEV2ZW50cztcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50cztcbiAgICB9XG4gICAgZXhwb3J0cy5CYWNrYm9uZUV2ZW50cyA9IEV2ZW50cztcbiAgfSBlbHNlIHtcbiAgICByb290LkJhY2tib25lRXZlbnRzID0gRXZlbnRzO1xuICB9XG59KSh0aGlzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZScpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2pxdWVyeS5icm93c2VyJyk7XG4iLCIvKiFcbiAqIGpRdWVyeSBCcm93c2VyIFBsdWdpbiB2MC4wLjZcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWJjZWIvanF1ZXJ5LWJyb3dzZXItcGx1Z2luXG4gKlxuICogT3JpZ2luYWwganF1ZXJ5LWJyb3dzZXIgY29kZSBDb3B5cmlnaHQgMjAwNSwgMjAxMyBqUXVlcnkgRm91bmRhdGlvbiwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogTW9kaWZpY2F0aW9ucyBDb3B5cmlnaHQgMjAxMyBHYWJyaWVsIENlYnJpYW5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWJjZWJcbiAqXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDEzLTA3LTI5VDE3OjIzOjI3LTA3OjAwXG4gKi9cblxuXG52YXIgbWF0Y2hlZCwgYnJvd3NlcjtcblxudmFyIHVhTWF0Y2ggPSBmdW5jdGlvbiggdWEgKSB7XG4gIHVhID0gdWEudG9Mb3dlckNhc2UoKTtcblxuICB2YXIgbWF0Y2ggPSAvKG9wcilbXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgIC8oY2hyb21lKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgIC8odmVyc2lvbilbIFxcL10oW1xcdy5dKykuKihzYWZhcmkpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgLyh3ZWJraXQpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgLyhvcGVyYSkoPzouKnZlcnNpb258KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgIC8obXNpZSkgKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgdWEuaW5kZXhPZihcInRyaWRlbnRcIikgPj0gMCAmJiAvKHJ2KSg/Ojp8ICkoW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICB1YS5pbmRleE9mKFwiY29tcGF0aWJsZVwiKSA8IDAgJiYgLyhtb3ppbGxhKSg/Oi4qPyBydjooW1xcdy5dKyl8KS8uZXhlYyggdWEgKSB8fFxuICAgIFtdO1xuXG4gIHZhciBwbGF0Zm9ybV9tYXRjaCA9IC8oaXBhZCkvLmV4ZWMoIHVhICkgfHxcbiAgICAvKGlwaG9uZSkvLmV4ZWMoIHVhICkgfHxcbiAgICAvKGFuZHJvaWQpLy5leGVjKCB1YSApIHx8XG4gICAgLyh3aW5kb3dzIHBob25lKS8uZXhlYyggdWEgKSB8fFxuICAgIC8od2luKS8uZXhlYyggdWEgKSB8fFxuICAgIC8obWFjKS8uZXhlYyggdWEgKSB8fFxuICAgIC8obGludXgpLy5leGVjKCB1YSApIHx8XG4gICAgLyhjcm9zKS9pLmV4ZWMoIHVhICkgfHxcbiAgICBbXTtcblxuICByZXR1cm4ge1xuICAgIGJyb3dzZXI6IG1hdGNoWyAzIF0gfHwgbWF0Y2hbIDEgXSB8fCBcIlwiLFxuICAgIHZlcnNpb246IG1hdGNoWyAyIF0gfHwgXCIwXCIsXG4gICAgcGxhdGZvcm06IHBsYXRmb3JtX21hdGNoWyAwIF0gfHwgXCJcIlxuICB9O1xufTtcblxubWF0Y2hlZCA9IHVhTWF0Y2goIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICk7XG5icm93c2VyID0ge307XG5icm93c2VyLnVhTWF0Y2ggPSB1YU1hdGNoO1xuXG5pZiAoIG1hdGNoZWQuYnJvd3NlciApIHtcbiAgYnJvd3NlclsgbWF0Y2hlZC5icm93c2VyIF0gPSB0cnVlO1xuICBicm93c2VyLnZlcnNpb24gPSBtYXRjaGVkLnZlcnNpb247XG4gIGJyb3dzZXIudmVyc2lvbk51bWJlciA9IHBhcnNlSW50KG1hdGNoZWQudmVyc2lvbik7XG59XG5cbmlmICggbWF0Y2hlZC5wbGF0Zm9ybSApIHtcbiAgYnJvd3NlclsgbWF0Y2hlZC5wbGF0Zm9ybSBdID0gdHJ1ZTtcbn1cblxuLy8gVGhlc2UgYXJlIGFsbCBjb25zaWRlcmVkIG1vYmlsZSBwbGF0Zm9ybXMsIG1lYW5pbmcgdGhleSBydW4gYSBtb2JpbGUgYnJvd3NlclxuaWYgKCBicm93c2VyLmFuZHJvaWQgfHwgYnJvd3Nlci5pcGFkIHx8IGJyb3dzZXIuaXBob25lIHx8IGJyb3dzZXJbIFwid2luZG93cyBwaG9uZVwiIF0gKSB7XG4gIGJyb3dzZXIubW9iaWxlID0gdHJ1ZTtcbn1cblxuLy8gVGhlc2UgYXJlIGFsbCBjb25zaWRlcmVkIGRlc2t0b3AgcGxhdGZvcm1zLCBtZWFuaW5nIHRoZXkgcnVuIGEgZGVza3RvcCBicm93c2VyXG5pZiAoIGJyb3dzZXIuY3JvcyB8fCBicm93c2VyLm1hYyB8fCBicm93c2VyLmxpbnV4IHx8IGJyb3dzZXIud2luICkge1xuICBicm93c2VyLmRlc2t0b3AgPSB0cnVlO1xufVxuXG4vLyBDaHJvbWUsIE9wZXJhIDE1KyBhbmQgU2FmYXJpIGFyZSB3ZWJraXQgYmFzZWQgYnJvd3NlcnNcbmlmICggYnJvd3Nlci5jaHJvbWUgfHwgYnJvd3Nlci5vcHIgfHwgYnJvd3Nlci5zYWZhcmkgKSB7XG4gIGJyb3dzZXIud2Via2l0ID0gdHJ1ZTtcbn1cblxuLy8gSUUxMSBoYXMgYSBuZXcgdG9rZW4gc28gd2Ugd2lsbCBhc3NpZ24gaXQgbXNpZSB0byBhdm9pZCBicmVha2luZyBjaGFuZ2VzXG5pZiAoIGJyb3dzZXIucnYgKVxue1xuICB2YXIgaWUgPSBcIm1zaWVcIjtcblxuICBtYXRjaGVkLmJyb3dzZXIgPSBpZTtcbiAgYnJvd3NlcltpZV0gPSB0cnVlO1xufVxuXG4vLyBPcGVyYSAxNSsgYXJlIGlkZW50aWZpZWQgYXMgb3ByXG5pZiAoIGJyb3dzZXIub3ByIClcbntcbiAgdmFyIG9wZXJhID0gXCJvcGVyYVwiO1xuXG4gIG1hdGNoZWQuYnJvd3NlciA9IG9wZXJhO1xuICBicm93c2VyW29wZXJhXSA9IHRydWU7XG59XG5cbi8vIFN0b2NrIEFuZHJvaWQgYnJvd3NlcnMgYXJlIG1hcmtlZCBhcyBTYWZhcmkgb24gQW5kcm9pZC5cbmlmICggYnJvd3Nlci5zYWZhcmkgJiYgYnJvd3Nlci5hbmRyb2lkIClcbntcbiAgdmFyIGFuZHJvaWQgPSBcImFuZHJvaWRcIjtcblxuICBtYXRjaGVkLmJyb3dzZXIgPSBhbmRyb2lkO1xuICBicm93c2VyW2FuZHJvaWRdID0gdHJ1ZTtcbn1cblxuLy8gQXNzaWduIHRoZSBuYW1lIGFuZCBwbGF0Zm9ybSB2YXJpYWJsZVxuYnJvd3Nlci5uYW1lID0gbWF0Y2hlZC5icm93c2VyO1xuYnJvd3Nlci5wbGF0Zm9ybSA9IG1hdGNoZWQucGxhdGZvcm07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBicm93c2VyO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLyoqIEBwcmVzZXJ2ZSBodHRwOi8vZ2l0aHViLmNvbS9lYXNld2F5L2pzLWNsYXNzICovXG5cbi8vIENsYXNzIERlZmluaXRpb24gdXNpbmcgRUNNQTUgcHJvdG90eXBlIGNoYWluXG5cbmZ1bmN0aW9uIGluaGVyaXQoZGVzdCwgc3JjLCBub1BhcmVudCkge1xuICAgIHdoaWxlIChzcmMgJiYgc3JjICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNyYykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgIT0gJy5jbGFzcycgJiYgIWRlc3QuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc3JjLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgbmFtZSwgZGVzYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobm9QYXJlbnQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHNyYyA9IHNyYy5fX3Byb3RvX187XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xufVxuXG52YXIgQ2xhc3MgPSBmdW5jdGlvbiAoYmFzZSwgcHJvdG8sIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mKGJhc2UpICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3B0aW9ucyA9IHByb3RvO1xuICAgICAgICBwcm90byA9IGJhc2U7XG4gICAgICAgIGJhc2UgPSBPYmplY3Q7XG4gICAgfVxuICAgIGlmICghcHJvdG8pIHtcbiAgICAgICAgcHJvdG8gPSB7fTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgYmFzZTogYmFzZSxcbiAgICAgICAgaW1wbGVtZW50czogW11cbiAgICB9XG4gICAgdmFyIGNsYXNzUHJvdG8gPSBDbGFzcy5jbG9uZShwcm90byk7XG4gICAgaWYgKG9wdGlvbnMuaW1wbGVtZW50cykge1xuICAgICAgICAoQXJyYXkuaXNBcnJheShvcHRpb25zLmltcGxlbWVudHMpID8gb3B0aW9ucy5pbXBsZW1lbnRzIDogW29wdGlvbnMuaW1wbGVtZW50c10pXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoaW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihpbXBsZW1lbnRlZFR5cGUpID09ICdmdW5jdGlvbicgJiYgaW1wbGVtZW50ZWRUeXBlLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBtZXRhLmltcGxlbWVudHMucHVzaChpbXBsZW1lbnRlZFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBDbGFzcy5leHRlbmQoY2xhc3NQcm90bywgaW1wbGVtZW50ZWRUeXBlLnByb3RvdHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsYXNzUHJvdG8uX19wcm90b19fID0gYmFzZS5wcm90b3R5cGU7XG4gICAgdmFyIHRoZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mKHRoaXMuY29uc3RydWN0b3IpID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbWV0YS50eXBlID0gdGhlQ2xhc3M7XG4gICAgdGhlQ2xhc3MucHJvdG90eXBlID0gY2xhc3NQcm90bztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhlQ2xhc3MsICcuY2xhc3MubWV0YScsIHsgdmFsdWU6IG1ldGEsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzUHJvdG8sICcuY2xhc3MnLCB7IHZhbHVlOiB0aGVDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgICBpZiAob3B0aW9ucy5zdGF0aWNzKSB7XG4gICAgICAgIENsYXNzLmV4dGVuZCh0aGVDbGFzcywgb3B0aW9ucy5zdGF0aWNzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoZUNsYXNzO1xufTtcblxuQ2xhc3MuZXh0ZW5kID0gaW5oZXJpdDtcblxuQ2xhc3MuY2xvbmUgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIGluaGVyaXQoe30sIG9iamVjdCk7XG59O1xuXG5mdW5jdGlvbiBmaW5kVHlwZShtZXRhLCB0eXBlKSB7XG4gICAgd2hpbGUgKG1ldGEpIHtcbiAgICAgICAgaWYgKG1ldGEudHlwZS5wcm90b3R5cGUgPT09IHR5cGUucHJvdG90eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpIGluIG1ldGEuaW1wbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIGltcGxUeXBlID0gbWV0YS5pbXBsZW1lbnRzW2ldO1xuICAgICAgICAgICAgdmFyIGltcGxNZXRhID0gaW1wbFR5cGVbJy5jbGFzcy5tZXRhJ107XG4gICAgICAgICAgICBpZiAoaW1wbE1ldGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZFR5cGUoaW1wbE1ldGEsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvdG8gPSBpbXBsVHlwZS5wcm90b3R5cGU7IHByb3RvOyBwcm90byA9IHByb3RvLl9fcHJvdG9fXykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG8gPT09IHR5cGUucHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtZXRhID0gbWV0YS5iYXNlID8gbWV0YS5iYXNlWycuY2xhc3MubWV0YSddIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBDaGVja2VyID0gQ2xhc3Moe1xuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH0sXG4gICAgXG4gICAgdHlwZU9mOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiB0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWV0YSA9IENsYXNzLnR5cGVJbmZvKHRoaXMub2JqZWN0KTtcbiAgICAgICAgcmV0dXJuIG1ldGEgJiYgZmluZFR5cGUobWV0YSwgdHlwZSk7XG4gICAgfVxufSk7XG5cbi8vIGFsaWFzZXNcbkNoZWNrZXIucHJvdG90eXBlLmEgPSBDaGVja2VyLnByb3RvdHlwZS50eXBlT2Y7XG5DaGVja2VyLnByb3RvdHlwZS5hbiA9IENoZWNrZXIucHJvdG90eXBlLnR5cGVPZjtcblxuQ2xhc3MuaXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBDaGVja2VyKG9iamVjdCk7XG59O1xuXG5DbGFzcy50eXBlSW5mbyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIgdGhlQ2xhc3MgPSBvYmplY3QuX19wcm90b19fWycuY2xhc3MnXTtcbiAgICByZXR1cm4gdGhlQ2xhc3MgPyB0aGVDbGFzc1snLmNsYXNzLm1ldGEnXSA6IHVuZGVmaW5lZDtcbn07XG5cbkNsYXNzLlZFUlNJT04gPSBbMCwgMCwgMl07XG5cbmlmIChtb2R1bGUpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IENsYXNzO1xufSBlbHNlIHtcbiAgICBnbG9iYWwuQ2xhc3MgPSBDbGFzczsgICAvLyBmb3IgYnJvd3NlclxufVxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9saWIvaW5kZXhcIik7XG4iXX0=
