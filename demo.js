var mySequence;
window.onload = function() {		 
	var theSequence = '1111111111' +
                      '2222222222' +
                      '3333333333' + 
                      '4444444444' +
                      '5555555555' +
                      '6666666666' +
                      '7777777777' +
                      'gattacagat' +
                      'gattacagat' +
                      'gattacagat' + 
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

	mySequence = new Sequence({
		sequence : theSequence,
		target : "#holder",
		format : 'CODATA',
		formatOptions : {
			title:false,
			footer:false
		},
		id : 'P918283'
	});

    mySequence.on('selection-changed', console.log.bind(console, 'SELECTION'));

	//mySequence.setSelection(1,4);
	mySequence.setSelection(100,150);

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
