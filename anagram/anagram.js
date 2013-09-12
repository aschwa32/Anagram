function gram_function(){

//declare some variables
	var dict = [];
	var dict_scores = [];
	var max_score = 0;
	var letters = new Array(26)

//read file and split words
	var fs = require('fs')
	var data = fs.readFileSync('/usr/share/dict/words','utf-8');
	var lines = data.split("\n");

//main loop
//reorganizes each word alphabetically
//files each word into dict by alpha-ordering
//keeps track of size of each set in dict_scores as well as the max_score
	for (var word in lines){

	//reordered word
		for(var i=0;i<26;i++){
			letters[i] = 0;
		}
		for(var i=0;i<lines[word].length;i++){
			letters[lines[word].toLowerCase().charAt(i).charCodeAt(0)-97]++;
		}
		var str = "";
		for(var i=0;i<26;i++){
			while(letters[i]>0){
				str += String.fromCharCode(i+97);
				letters[i]+=-1;
			}
		}
		if(str=="") continue;
	
	//files words in dict and updates scores
		if(dict[str]==undefined){
			dict[str] = new Array();
			dict_scores[str] = 0;
		}
		dict[str].push(lines[word]);
		dict_scores[str]++;
	
		if(dict_scores[str]>max_score){
			max_score = dict_scores[str];
		}
	
	}

//new hash table for reordering sets by length
	var grams_by_length = new Array(max_score-2);

	for (var key in dict){
		if(dict_scores[key] >1){
			if(grams_by_length[max_score-dict_scores[key]] ==  undefined){
				grams_by_length[max_score-dict_scores[key]] = new Array();
			}
			grams_by_length[max_score-dict_scores[key]].push(key);
		}
	}

//output sets
	var first;
	var write_stream = fs.createWriteStream('out.txt');
	for (var score in grams_by_length){
		for (var key in grams_by_length[score]){
			first = 0;
			for(var word in dict[grams_by_length[score][key]]){
				if(first != 0){
					write_stream.write(', ');
				}
				write_stream.write(dict[grams_by_length[score][key]][word]);
				first = 1;
			}
			write_stream.write('\n');
		}
	}

}

gram_function();