var mySequence;
var seq1080 = '1111111111' +
              '2222222222' +
              '3333333333' + 
              '4444444444' +
              '5555555555' +
              '6666666666' +
              '7777777777' +
              'gattacagatgattacagatgattacagat' + 
              'acactcgagctgtgaccgccgcacagtcaacaact' +
              'aactgccttcgttaatatcctctgaataagccaac' +
              'tttgaatcacaagacgcataccaaacatgcacgga' +
              'taccgaacctacaacatggagagccaccatgccca' +
              'tcacgacgccagtcccgtggaccagaagcccctgg' +
              'ttgtggacctcttggccacccagtacggcaagccc' +
              'cagacaccgcctccctcgccaaatggtaagtttaa' +
              'agataaagccgagcaaacgtgacgagttacttaca' +
              'cccaatctttcctctgtccaaaacagaatgcctat' +
              'ccagtccggataactccttgaacggcagccgcggc' +
              'tcggagattcccgccgacccgtcggtacgccgcta' +
              'tcgcaccgccttcacccgtgaccagctgggtcgct' +
              'tggagaaggagttctacaaggagaactacgtgtcc' +
              'cgtccccgtcgctgcgaactggccgcccagctgaa' +
              'cctcccggagagcacgatcaaggtgtggttccaga' +
              'accgccgcatgaaggacaagcgtcagaggatcgcc' +
              'gtcgcctggccctacgcagccgtctactccgatcc' +
              'cgccttcgccgcctccatcctccaggccgccgcca' +
              'acagcgtgggcatgccctatccgccctacgccccc' +
              'gctgctgccgccgctgctgccgccgccgctgccgt' +
              'ggccaccaatccgatgatggccaccggaatgcccc' +
              'cgatgggcatgccccagatgcccacaatgcagatg' +
              'cccggacactcgggacatgccggccatccatcgcc' +
              'ctacggacagtaccgctacacgccctaccacatcc' +
              'ccgcccgcccggcgccgccacatcccgctggtcct' +
              'catatgcatcatccgcacatgatgggatccagcgc' +
              'aacgggatcgtcgtactccgccggtgccgccggcc' +
              'ttttgggcgctctgccctccgccacctgctatacc';

window.onload = function() {		 

	mySequence = new Sequence({
		sequence : seq1080,
		target : "#holder",
		format : 'CODATA',
		formatOptions : {
			title:false,
			footer:false
		},
		id : 'dummy'
	});

  // DEMO of events - 
  var evt = Sequence.EVT_ON_SELECTION_CHANGED;
  mySequence.on(evt, console.log.bind(console, evt));

	mySequence.setSelection(81, 87); // Should read GATTACA

	mySequence.addAnnotation({
		name:"track1",
		html:"<br> Example of <b>HTML</b>",
		color:"green",
		regions: [
		{start: 2, end: 2},
		{start: 20, end: 30},
		{start: 31, end: 43},
			{start: 44, end: 44},
			{start: 50, end: 90}]
	});

	mySequence.addAnnotation({
		name:"track2",
		html:"<br> Example of <b>HTML</b>",
		color:"green",
		regions: [
		{start: 7, end: 40},
		{start: 45, end: 45},
		{start: 47, end: 48},
			{start: 49, end: 55},
			{start: 80, end: 91}]
	});

	//mySequence.setSequence("P");

	mySequence.addHighlight( { "start": 1, "end": 15, id: 'aaa'} );
	mySequence.addHighlight( { "start": 7, "end": 21, kind: "bbb" } );
	mySequence.addHighlight( { "start": 12, "end": 26, "kind": "ccc" } );
};	    
